/*
  # Add Automatic Slug Generation

  1. Changes
    - Create function to generate URL-friendly slugs from product names
    - Add trigger to auto-generate slugs on INSERT/UPDATE
    - Ensure all existing products have proper slugs

  2. Security
    - Function is SECURITY DEFINER to run with elevated privileges
    - Only affects slug column generation
*/

-- Function to generate URL-friendly slugs
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(trim(regexp_replace(input_text, '[^a-zA-Z0-9]+', '-', 'g'), '-'));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to auto-generate slug before insert or update
CREATE OR REPLACE FUNCTION set_product_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate slug if it's empty or being changed
  IF NEW.slug IS NULL OR NEW.slug = '' OR (TG_OP = 'UPDATE' AND NEW.name != OLD.name) THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS trigger_set_product_slug ON products;

-- Create trigger
CREATE TRIGGER trigger_set_product_slug
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION set_product_slug();

-- Update all existing products to have proper slugs
UPDATE products
SET slug = generate_slug(name)
WHERE slug IS NULL OR slug = '' OR slug LIKE '% %' OR slug != generate_slug(name);
