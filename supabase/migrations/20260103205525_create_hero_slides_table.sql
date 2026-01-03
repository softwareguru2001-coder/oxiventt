/*
  # Create Hero Slides Table

  1. New Tables
    - `hero_slides`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Main title text for the slide
      - `subtitle` (text) - Subtitle/description text
      - `image_url` (text) - URL of the background image
      - `gradient` (text) - CSS gradient class for overlay
      - `display_order` (integer) - Order in which slides appear (1, 2, 3, 4)
      - `is_active` (boolean) - Whether the slide is currently active
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `hero_slides` table
    - Add policy for public read access (anyone can view active slides)
    - Add policy for authenticated admins to manage slides

  3. Initial Data
    - Seed with 4 default slides from the current hardcoded values
*/

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  image_url text NOT NULL,
  gradient text DEFAULT 'from-industrial-900/90 via-industrial-800/80 to-transparent',
  display_order integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Public can view active slides
CREATE POLICY "Anyone can view active hero slides"
  ON hero_slides FOR SELECT
  USING (is_active = true);

-- Admins can manage all slides
CREATE POLICY "Admins can insert hero slides"
  ON hero_slides FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update hero slides"
  ON hero_slides FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete hero slides"
  ON hero_slides FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON hero_slides(display_order, is_active);

-- Insert default slides
INSERT INTO hero_slides (title, subtitle, image_url, gradient, display_order, is_active)
VALUES
  (
    'Industrial Excellence in Ventilation',
    'High-performance fans engineered for demanding environments',
    'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'from-industrial-900/90 via-industrial-800/80 to-transparent',
    1,
    true
  ),
  (
    'Cutting-Edge Air Movement Technology',
    'Precision-engineered solutions for optimal airflow and energy efficiency',
    'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'from-blue-900/90 via-blue-800/80 to-transparent',
    2,
    true
  ),
  (
    'Built for Industrial Strength',
    'Robust construction meets advanced aerodynamic design',
    'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'from-slate-900/90 via-slate-800/80 to-transparent',
    3,
    true
  ),
  (
    'Trusted Across Industries',
    'Delivering reliable performance for manufacturing, warehousing, and more',
    'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'from-gray-900/90 via-gray-800/80 to-transparent',
    4,
    true
  )
ON CONFLICT DO NOTHING;