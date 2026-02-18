/*
  # Add SEO Fields to Products and Categories

  ## Overview
  Adds dedicated SEO metadata fields to both the products and categories tables,
  enabling admins to set custom meta titles, descriptions, and keywords directly
  from the admin panel.

  ## Changes

  ### products table - new columns:
  - `meta_title` (text, nullable) - Custom meta title (max 60 chars recommended)
  - `meta_description` (text, nullable) - Custom meta description (150-160 chars)
  - `meta_keywords` (text[], nullable) - Array of SEO keywords/tags

  ### categories table - new columns:
  - `meta_title` (text, nullable) - Custom meta title (max 60 chars recommended)
  - `meta_description` (text, nullable) - Custom meta description (150-160 chars)
  - `meta_keywords` (text[], nullable) - Array of SEO keywords/tags

  ### seo_settings table (new):
  - `id` (uuid, primary key)
  - `key` (text, unique) - Setting key identifier
  - `value` (text) - Setting value
  - `created_at` / `updated_at` timestamps

  ## Security
  - seo_settings: public read, admin-only write
  - No RLS changes needed for products/categories (inherit existing policies)
*/

-- Add SEO columns to products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE products ADD COLUMN meta_title text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE products ADD COLUMN meta_description text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'meta_keywords'
  ) THEN
    ALTER TABLE products ADD COLUMN meta_keywords text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;

-- Add SEO columns to categories
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE categories ADD COLUMN meta_title text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE categories ADD COLUMN meta_description text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'meta_keywords'
  ) THEN
    ALTER TABLE categories ADD COLUMN meta_keywords text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;

-- Create seo_settings table for site-wide SEO configuration
CREATE TABLE IF NOT EXISTS seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Public can read SEO settings
CREATE POLICY "Anyone can read seo settings"
  ON seo_settings
  FOR SELECT
  USING (true);

-- Only admins can insert seo settings
CREATE POLICY "Admins can insert seo settings"
  ON seo_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Only admins can update seo settings
CREATE POLICY "Admins can update seo settings"
  ON seo_settings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Only admins can delete seo settings
CREATE POLICY "Admins can delete seo settings"
  ON seo_settings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_seo_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER seo_settings_updated_at
  BEFORE UPDATE ON seo_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_seo_settings_updated_at();

-- Seed default SEO settings
INSERT INTO seo_settings (key, value) VALUES
  ('robots_disallow', '/admin/,/api/'),
  ('sitemap_include_categories', 'true'),
  ('default_meta_title_suffix', ' | Oxiventt'),
  ('site_name', 'Oxiventt')
ON CONFLICT (key) DO NOTHING;
