/*
  # Storage Policies for Product Images and Brochures

  ## Overview
  Configure RLS policies for Supabase Storage buckets to allow:
  - Public read access to product-images and brochures
  - Admin-only write access to both buckets

  ## Buckets
  1. `product-images` - Product image gallery (max 5MB per file)
  2. `brochures` - PDF brochures (max 10MB per file)

  ## Security
  - Public can view/download all files
  - Only admins can upload, update, or delete files
*/

-- Product images bucket policies
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Brochures bucket policies
CREATE POLICY "Public can view brochures"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'brochures');

CREATE POLICY "Admins can upload brochures"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'brochures' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update brochures"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'brochures' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete brochures"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'brochures' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );