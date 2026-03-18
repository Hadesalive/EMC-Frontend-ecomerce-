-- EMC Jobs Schema
-- Run this in the Supabase SQL editor BEFORE running seeds.sql

CREATE TABLE IF NOT EXISTS jobs (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT        NOT NULL,
  sector          TEXT        NOT NULL,
  type            TEXT        NOT NULL CHECK (type IN ('Permanent', 'Contract', 'Temporary')),
  location        TEXT        NOT NULL,
  description     TEXT        NOT NULL DEFAULT '',
  responsibilities TEXT[]     NOT NULL DEFAULT '{}',
  requirements    TEXT[]      NOT NULL DEFAULT '{}',
  nice_to_have    TEXT[]      NOT NULL DEFAULT '{}',
  salary_range    TEXT,
  urgent          BOOLEAN     NOT NULL DEFAULT false,
  is_active       BOOLEAN     NOT NULL DEFAULT true,
  image_url       TEXT,                          -- Cloudinary URL (optional company/role image)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS jobs_updated_at ON jobs;
CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: public can read active jobs; service role can do everything
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active jobs" ON jobs;
CREATE POLICY "Public read active jobs"
  ON jobs FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Service role full access" ON jobs;
CREATE POLICY "Service role full access"
  ON jobs FOR ALL
  USING (auth.role() = 'service_role');

-- ─── Talent Profiles (the roster) ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS talent_profiles (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name          TEXT        NOT NULL,
  email              TEXT        NOT NULL UNIQUE,
  phone              TEXT,
  location           TEXT,
  linkedin_url       TEXT,
  -- professional background
  "current_role"     TEXT,
  years_experience   TEXT,
  qualification      TEXT,
  summary            TEXT,
  cv_url             TEXT,       -- Cloudinary URL (PDF/doc)
  -- preferences
  preferred_sector   TEXT,
  employment_type    TEXT,
  preferred_location TEXT,
  -- EMC internal
  status   TEXT  NOT NULL DEFAULT 'active'
           CHECK (status IN ('active', 'contacted', 'placed', 'inactive')),
  notes    TEXT,
  source   TEXT  NOT NULL DEFAULT 'general_cv'
           CHECK (source IN ('general_cv', 'job_application')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS talent_profiles_updated_at ON talent_profiles;
CREATE TRIGGER talent_profiles_updated_at
  BEFORE UPDATE ON talent_profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on profiles" ON talent_profiles;
CREATE POLICY "Service role full access on profiles"
  ON talent_profiles FOR ALL USING (auth.role() = 'service_role');

-- ─── Applications ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id             UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id         UUID  REFERENCES jobs(id) ON DELETE SET NULL,
  profile_id     UUID  NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  status         TEXT  NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'interview', 'placed', 'rejected')),
  applicant_notes TEXT,
  internal_notes  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS applications_updated_at ON applications;
CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Prevent duplicate applications for the same job (allows multiple general CV submissions)
CREATE UNIQUE INDEX IF NOT EXISTS applications_profile_job_unique
  ON applications (profile_id, job_id)
  WHERE job_id IS NOT NULL;

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on applications" ON applications;
CREATE POLICY "Service role full access on applications"
  ON applications FOR ALL USING (auth.role() = 'service_role');

-- ─── Placement Requests (employer-side enquiries) ────────────────────────────
CREATE TABLE IF NOT EXISTS placement_requests (
  id               UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name     TEXT  NOT NULL,
  sector           TEXT  NOT NULL,
  contact_name     TEXT  NOT NULL,
  contact_title    TEXT,
  email            TEXT  NOT NULL,
  phone            TEXT  NOT NULL,
  role_title       TEXT  NOT NULL,
  num_positions    INT   NOT NULL DEFAULT 1,
  employment_type  TEXT  NOT NULL,
  start_date       DATE,
  location         TEXT,
  salary_range     TEXT,
  description      TEXT  NOT NULL,
  status           TEXT  NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
  internal_notes   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS placement_requests_updated_at ON placement_requests;
CREATE TRIGGER placement_requests_updated_at
  BEFORE UPDATE ON placement_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE placement_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on placement requests" ON placement_requests;
CREATE POLICY "Service role full access on placement requests"
  ON placement_requests FOR ALL USING (auth.role() = 'service_role');
