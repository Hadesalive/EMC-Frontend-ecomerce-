-- Add deadline column to jobs table
-- Run in the Supabase SQL editor

ALTER TABLE public.jobs
  ADD COLUMN IF NOT EXISTS deadline DATE;
