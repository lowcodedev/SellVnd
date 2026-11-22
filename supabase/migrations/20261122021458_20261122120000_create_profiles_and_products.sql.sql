/*
# Create profiles and products tables for the SellVnd merchant dashboard

## Overview
This migration sets up the core data model for the main product: a merchant
dashboard where signed-in users manage their products and inventory.

## New Tables

### profiles
- `id` (uuid, primary key, references auth.users on delete cascade)
- `business_name` (text, the merchant's business display name)
- `full_name` (text, the merchant's personal name)
- `created_at` (timestamptz, set automatically)

### products
- `id` (uuid, primary key, auto-generated)
- `user_id` (uuid, owner, defaults to the authenticated user via auth.uid(),
  references auth.users on delete cascade)
- `name` (text, required, 1-200 characters)
- `description` (text, optional, product description)
- `sku` (text, optional, max 100 chars, unique per user when set)
- `price` (numeric(10,2), required, >= 0, selling price)
- `cost` (numeric(10,2), >= 0, cost of goods for margin calculations)
- `stock_quantity` (integer, >= 0, default 0, current inventory count)
- `low_stock_threshold` (integer, >= 0, default 10, alert threshold)
- `category` (text, optional, max 100 chars)
- `status` (text, 'active' | 'draft' | 'archived', default 'active')
- `image_url` (text, optional, URL to product image)
- `created_at` (timestamptz, set automatically)
- `updated_at` (timestamptz, set automatically, auto-updated on change)

## Automation

1. New user profile creation: a trigger on auth.users automatically creates
   a matching profile row when a user signs up, pulling business_name and
   full_name from the sign-up metadata.
2. Auto-updated timestamp: a trigger on products automatically updates
   updated_at whenever a product row is modified.

## Security

- Row level security enabled on both tables.
- profiles: each authenticated user can read and update only their own profile
  (matched by id = auth.uid()). No inserts or deletes (profiles auto-created).
- products: each authenticated user can CRUD only their own products
  (user_id = auth.uid()). user_id defaults to auth.uid() so inserts that omit
  it still satisfy the INSERT policy.
- Grants restricted to the authenticated role (dashboard requires sign-in).
- handle_new_user trigger function is SECURITY DEFINER; EXECUTE revoked from
  PUBLIC and anon to prevent direct calls.

## Indexes

- products_user_id_idx: fast filtering by owner.
- products_sku_user_idx: unique SKU per user (partial, only when SKU set).
- products_status_idx: filter by status.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL DEFAULT '',
  full_name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE ON profiles TO authenticated;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  description text,
  sku text CHECK (char_length(sku) <= 100),
  price numeric(10,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  cost numeric(10,2) NOT NULL DEFAULT 0 CHECK (cost >= 0),
  stock_quantity integer NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold integer NOT NULL DEFAULT 10 CHECK (low_stock_threshold >= 0),
  category text CHECK (char_length(category) <= 100),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON products TO authenticated;

DROP POLICY IF EXISTS "select_own_products" ON products;
CREATE POLICY "select_own_products"
  ON products FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_products" ON products;
CREATE POLICY "insert_own_products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_products" ON products;
CREATE POLICY "update_own_products"
  ON products FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_products" ON products;
CREATE POLICY "delete_own_products"
  ON products FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS products_user_id_idx ON products (user_id);
CREATE INDEX IF NOT EXISTS products_status_idx ON products (status);
CREATE UNIQUE INDEX IF NOT EXISTS products_sku_user_idx
  ON products (user_id, lower(sku))
  WHERE sku IS NOT NULL AND sku != '';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, business_name, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_set_updated_at ON products;
CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();