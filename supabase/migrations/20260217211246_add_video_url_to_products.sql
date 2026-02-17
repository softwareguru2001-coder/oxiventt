/*
  # Add video_url to products table

  1. Changes
    - Adds `video_url` column to `products` table to store YouTube video URLs
    - Column is nullable text, defaults to NULL

  2. Notes
    - This enables admin users to link a YouTube video to any product
    - The video will be shown in the product detail page gallery
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE products ADD COLUMN video_url text DEFAULT NULL;
  END IF;
END $$;
