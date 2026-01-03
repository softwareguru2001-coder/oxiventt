/*
  # Enable Public Access to Products

  1. Changes
    - Enable RLS on products table
    - Drop any existing conflicting policies
    - Create single policy allowing all anonymous users to read products
  
  2. Security
    - Allows anon and public roles to SELECT all products
    - This is required for public product listing pages
*/

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read products" ON products;
DROP POLICY IF EXISTS "public read" ON products;
DROP POLICY IF EXISTS "enable read for auth" ON products;

CREATE POLICY "public can read products"
ON products
FOR SELECT
TO anon, public
USING (true);
