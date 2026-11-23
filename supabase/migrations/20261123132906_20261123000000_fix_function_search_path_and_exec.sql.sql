/*
# Fix function search_path and SECURITY DEFINER execution warnings

## Overview
The database advisor flagged three warnings on the functions created in the
profiles/products migration:

1. `handle_new_user()` — mutable search_path (no explicit search_path set)
2. `set_updated_at()` — mutable search_path (no explicit search_path set)
3. `handle_new_user()` — SECURITY DEFINER function callable by `authenticated`
   role via the Data API (REST RPC). This function should only ever be called
   by the database trigger on auth.users, never by any client.

## Changes

### Functions recreated with explicit search_path
Both `handle_new_user` and `set_updated_at` are recreated with
`SET search_path = public, pg_temp` so they resolve tables unambiguously
and are not vulnerable to search_path hijacking.

### handle_new_user execution revoked from authenticated
The previous migration revoked EXECUTE from PUBLIC and anon but granted it
to `authenticated`. That was wrong — authenticated users should never call
this trigger function directly. EXECUTE is now revoked from `authenticated`
as well, so only the postgres/owner role (which runs triggers) can execute it.

## No data changes
No tables, columns, rows, or policies are modified. Only function definitions
and EXECUTE grants change.
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
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

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;