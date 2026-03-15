/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, required) - Contact's full name
      - `email` (text, required) - Contact's email address
      - `phone` (text) - Contact's phone number
      - `message` (text) - Optional message from contact
      - `created_at` (timestamptz) - When the contact was created

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for inserting contacts (public can submit)
    - Add policy for authenticated users to view contacts
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);