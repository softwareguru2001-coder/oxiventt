/*
  # Fix Products RLS for Public Access

  1. Changes
    - Enable RLS on products table
    - Drop existing restrictive policy if exists
    - Create new policy allowing public read access to all products
  
  2. Security
    - Allows anonymous (anon) and public roles to SELECT all products
    - This enables product listing on public pages without authentication
*/

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read products" ON products;

CREATE POLICY "public can read products"
ON products
FOR SELECT
TO anon, public
USING (true);
