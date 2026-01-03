/*
  # Fix Admin Users RLS Circular Dependency

  1. Changes
    - Allow authenticated users to read their own record in admin_users table
    - This breaks the circular dependency where you need to be admin to check if you're admin
    - Other operations still require admin role

  2. Security
    - Users can only see their own admin_users record
    - All other operations (insert, update, delete) still require admin verification
*/

-- Drop and recreate the SELECT policy for admin_users
DROP POLICY IF EXISTS "Admins can read admin_users" ON admin_users;

-- Allow authenticated users to read their own record
CREATE POLICY "Users can read own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);