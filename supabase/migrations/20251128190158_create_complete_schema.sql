/*
  # Complete Industrial Fan Website Schema

  ## Overview
  This migration creates the complete database schema for the industrial fan manufacturer website,
  including products, leads, admin users, storage buckets, and comprehensive RLS policies.

  ## Tables

  ### products
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, not null) - Product name
  - `slug` (text, unique, not null) - URL-friendly identifier
  - `sku` (text, nullable) - Stock keeping unit
  - `category` (text, not null) - Product category
  - `description` (text, nullable) - Full product description
  - `specs` (jsonb) - Technical specifications as JSON
  - `sizes` (jsonb) - Available sizes as JSON
  - `price` (numeric, nullable) - Product price
  - `is_price_visible` (boolean, default true) - Show/hide price
  - `featured` (boolean, default false) - Featured on homepage
  - `images` (text[]) - Array of public image URLs
  - `brochure_path` (text, nullable) - Storage path to brochure PDF
  - `created_at` (timestamptz, default now) - Creation timestamp
  - `updated_at` (timestamptz, default now) - Last update timestamp

  ### leads
  - `id` (uuid, primary key) - Unique lead identifier
  - `type` (text, not null) - Lead type: brochure, quote, or whatsapp
  - `product_id` (uuid, nullable) - Related product reference
  - `name` (text, nullable) - Contact name
  - `company` (text, nullable) - Company name
  - `mobile` (text, not null) - Mobile phone number
  - `email` (text, nullable) - Email address
  - `city` (text, nullable) - City location
  - `message` (text, nullable) - Inquiry message
  - `utm` (jsonb, nullable) - UTM tracking parameters
  - `created_at` (timestamptz, default now) - Creation timestamp

  ### admin_users
  - `id` (uuid, primary key) - References auth.users
  - `role` (text, default 'admin') - User role

  ## Security
  - RLS enabled on all tables
  - Products: Public read, admin-only write
  - Leads: Public insert, admin-only read
  - Admin users: Self-read only
  - Storage: Public read, admin-only upload
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sku text,
  category text NOT NULL DEFAULT 'general',
  description text,
  specs jsonb DEFAULT '{}'::jsonb,
  sizes jsonb DEFAULT '{}'::jsonb,
  price numeric(10,2),
  is_price_visible boolean DEFAULT true,
  featured boolean DEFAULT false,
  images text[] DEFAULT ARRAY[]::text[],
  brochure_path text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL CHECK (type IN ('brochure', 'quote', 'whatsapp')),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  name text,
  company text,
  mobile text NOT NULL,
  email text,
  city text,
  message text,
  utm jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
CREATE INDEX IF NOT EXISTS idx_leads_product_id ON leads(product_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_mobile ON leads(mobile);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products RLS Policies
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

-- Leads RLS Policies
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
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

-- Admin Users RLS Policies
CREATE POLICY "Users can view own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can insert admin_users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on products table
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  ('brochures', 'brochures', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies for product-images bucket
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
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

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
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

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
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

-- Storage RLS Policies for brochures bucket
DROP POLICY IF EXISTS "Public can view brochures" ON storage.objects;
CREATE POLICY "Public can view brochures"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'brochures');

DROP POLICY IF EXISTS "Admins can upload brochures" ON storage.objects;
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

DROP POLICY IF EXISTS "Admins can update brochures" ON storage.objects;
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

DROP POLICY IF EXISTS "Admins can delete brochures" ON storage.objects;
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