-- Run in Supabase SQL Editor (or as a migration) before using /api/send-report lead storage.
-- Table for optional email capture from /resultaat.

CREATE TABLE IF NOT EXISTS taaldna_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  profile_name TEXT,
  x_score DOUBLE PRECISION,
  y_score DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Optional: index for analytics
CREATE INDEX IF NOT EXISTS taaldna_leads_created_at_idx ON taaldna_leads (created_at DESC);

-- RLS: service role bypasses RLS. If you ever use anon key, add a strict INSERT policy instead.
