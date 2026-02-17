/*
  # Create slide-images storage bucket

  1. New Storage Bucket
    - `slide-images`: public bucket for hero slider images

  2. Security
    - Public read access for all
    - Authenticated admin write access
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('slide-images', 'slide-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view slide images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'slide-images');

CREATE POLICY "Authenticated users can upload slide images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'slide-images');

CREATE POLICY "Authenticated users can update slide images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'slide-images');

CREATE POLICY "Authenticated users can delete slide images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'slide-images');
