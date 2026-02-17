/*
  # Add CRM fields to leads table

  1. Changes
    - Adds `status` column: tracks lead pipeline stage (new, contacted, qualified, sale_done, pending, lost)
    - Adds `notes` column: free-text internal notes for the lead
    - Adds `next_call_date` column: scheduled follow-up date
    - Adds `assigned_to` column: admin note for who owns the lead

  2. Security
    - No RLS changes needed; existing policies cover the new columns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'status'
  ) THEN
    ALTER TABLE leads ADD COLUMN status text NOT NULL DEFAULT 'new'
      CHECK (status IN ('new', 'contacted', 'qualified', 'sale_done', 'pending', 'lost'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'notes'
  ) THEN
    ALTER TABLE leads ADD COLUMN notes text DEFAULT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'next_call_date'
  ) THEN
    ALTER TABLE leads ADD COLUMN next_call_date date DEFAULT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'assigned_to'
  ) THEN
    ALTER TABLE leads ADD COLUMN assigned_to text DEFAULT NULL;
  END IF;
END $$;
