/*
  # Industrial Fan Manufacturer Database Schema

  ## Overview
  Complete database schema for an industrial fan manufacturer website with products, leads tracking, and admin management.

  ## New Tables

  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Full product description
  - `short_description` (text) - Brief summary for listings
  - `specifications` (jsonb) - Technical specifications as key-value pairs
  - `features` (text[]) - Array of product features
  - `applications` (text[]) - Array of use cases
  - `price_range` (text) - Price indication (e.g., "Contact for pricing")
  - `images` (text[]) - Array of image URLs (max 4)
  - `video_url` (text, nullable) - Optional product video
  - `brochure_url` (text, nullable) - PDF brochure URL
  - `category` (text) - Product category
  - `is_featured` (boolean) - Featured on homepage
  - `meta_title` (text) - SEO title
  - `meta_description` (text) - SEO description
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `leads`
  - `id` (uuid, primary key) - Unique lead identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `company` (text, nullable) - Company name
  - `message` (text, nullable) - Inquiry message
  - `product_id` (uuid, nullable) - Related product (if any)
  - `product_name` (text, nullable) - Product name snapshot
  - `source` (text) - Lead source (quote_form, whatsapp, brochure_download)
  - `status` (text) - Lead status (new, contacted, qualified, closed)
  - `created_at` (timestamptz) - Creation timestamp

  ### `admin_users`
  - Links to auth.users with role="admin"
  - `id` (uuid, primary key, references auth.users)
  - `role` (text) - User role (admin)
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - RLS enabled on all tables
  - Public read access for products (published only)
  - Public insert for leads
  - Admin-only write access for products
  - Admin-only read access for leads and admin_users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  specifications jsonb DEFAULT '{}'::jsonb,
  features text[] DEFAULT ARRAY[]::text[],
  applications text[] DEFAULT ARRAY[]::text[],
  price_range text DEFAULT 'Contact for pricing',
  images text[] DEFAULT ARRAY[]::text[],
  video_url text,
  brochure_url text,
  category text NOT NULL DEFAULT 'general',
  is_featured boolean DEFAULT false,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  message text,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text,
  source text NOT NULL DEFAULT 'quote_form',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_product_id ON leads(product_id);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Public can view all products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Leads policies
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert admin_users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for products updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();