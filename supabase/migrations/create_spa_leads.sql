-- =============================================
-- Supabase Table: spa_leads
-- Landing page lead capture for /spa-burn
-- =============================================

CREATE TABLE IF NOT EXISTS spa_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  website_url TEXT NOT NULL,
  whatsapp TEXT,
  note TEXT,
  source TEXT DEFAULT 'spa-burn',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE spa_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from anonymous users (public form submissions)
CREATE POLICY "Allow anonymous inserts" ON spa_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all leads
CREATE POLICY "Allow authenticated reads" ON spa_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_spa_leads_created_at ON spa_leads (created_at DESC);

-- Create an index on email for deduplication queries
CREATE INDEX IF NOT EXISTS idx_spa_leads_email ON spa_leads (email);
