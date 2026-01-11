/*
  # Seed Initial Categories

  ## Overview
  Populates the categories table with initial default categories for product classification.

  ## Categories Added
  1. General - For general or uncategorized products (display_order: 0)
  2. Axial Fans - For axial fan products (display_order: 1)
  3. Centrifugal Fans - For centrifugal fan products (display_order: 2)
  4. Exhaust Fans - For exhaust fan products (display_order: 3)
  5. Industrial Fans - For industrial fan products (display_order: 4)

  ## Notes
  - All categories are active by default
  - Display order is set to provide logical ordering
  - Slugs are URL-friendly versions of category names
  - Uses IF NOT EXISTS to prevent duplicate entries
*/

-- Insert default categories
INSERT INTO categories (name, slug, description, display_order, is_active)
VALUES
  ('General', 'general', 'General and uncategorized products', 0, true),
  ('Axial Fans', 'axial-fans', 'Axial flow fans for various applications', 1, true),
  ('Centrifugal Fans', 'centrifugal-fans', 'Centrifugal fans for industrial use', 2, true),
  ('Exhaust Fans', 'exhaust-fans', 'Exhaust and ventilation fans', 3, true),
  ('Industrial Fans', 'industrial-fans', 'Heavy-duty industrial fans', 4, true)
ON CONFLICT (slug) DO NOTHING;