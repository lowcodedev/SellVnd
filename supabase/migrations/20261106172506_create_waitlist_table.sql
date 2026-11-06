/*
# Create waitlist table for SellVnd early access

1. New Tables
- `waitlist`
  - `id` (uuid, primary key)
  - `full_name` (text, required)
  - `business_name` (text, required)
  - `email` (text, required, stored case-insensitively unique)
  - `whatsapp_phone` (text, required)
  - `business_category` (text, required)
  - `sales_channels` (text array, optional selections)
  - `created_at` (timestamptz, set automatically)

2. Security
- Row level security enabled on `waitlist`.
- Anonymous and signed-in visitors may only INSERT rows. They cannot read, update or delete entries, so other people's emails are never exposed.
- Duplicate emails are rejected by a unique index on the lowercased email.

3. Notes
- Length checks guard against oversized input at the database level.
- Only the insert verb is granted to the public roles.
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 200),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  whatsapp_phone text NOT NULL CHECK (char_length(whatsapp_phone) BETWEEN 7 AND 30),
  business_category text NOT NULL CHECK (char_length(business_category) BETWEEN 1 AND 100),
  sales_channels text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON waitlist (lower(email));

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON waitlist TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_waitlist" ON waitlist;
CREATE POLICY "anon_insert_waitlist" ON waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
