-- ============================================================
-- EMC Candidate Portal Migration
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Extend talent_profiles with candidate portal fields
ALTER TABLE talent_profiles
  ADD COLUMN IF NOT EXISTS user_id        UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS headline       TEXT,
  ADD COLUMN IF NOT EXISTS preferred_sectors TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS skills         TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS certifications TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS languages      TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS availability   TEXT DEFAULT 'immediately',
  ADD COLUMN IF NOT EXISTS salary_min     INTEGER,
  ADD COLUMN IF NOT EXISTS salary_max     INTEGER,
  ADD COLUMN IF NOT EXISTS date_of_birth  DATE,
  ADD COLUMN IF NOT EXISTS nationality    TEXT,
  ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
  ADD COLUMN IF NOT EXISTS profile_complete  BOOLEAN DEFAULT FALSE;

-- Unique index so each auth user maps to one profile
CREATE UNIQUE INDEX IF NOT EXISTS talent_profiles_user_id_idx
  ON talent_profiles(user_id) WHERE user_id IS NOT NULL;

-- ──────────────────────────────────────────────────────────────
-- 2. Work Experience
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS work_experience (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id  UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  job_title   TEXT NOT NULL,
  company     TEXT NOT NULL,
  location    TEXT,
  sector      TEXT,
  start_date  DATE NOT NULL,
  end_date    DATE,
  is_current  BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 3. Education
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS education (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id     UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  institution    TEXT NOT NULL,
  degree         TEXT NOT NULL,
  field_of_study TEXT,
  start_year     INTEGER,
  end_year       INTEGER,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 4. Saved Jobs
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_jobs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  job_id     UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

-- ──────────────────────────────────────────────────────────────
-- 5. Candidate Notifications
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidate_notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  type       TEXT NOT NULL CHECK (type IN ('application_status','new_match','message','system')),
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN DEFAULT FALSE,
  link       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 6. RLS helper — returns the authed user's profile id
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_my_candidate_profile_id()
RETURNS UUID AS $$
  SELECT id FROM talent_profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ──────────────────────────────────────────────────────────────
-- 7. RLS Policies
-- ──────────────────────────────────────────────────────────────

-- talent_profiles: candidates read/update their own row
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Candidates can view own profile"   ON talent_profiles;
DROP POLICY IF EXISTS "Candidates can update own profile" ON talent_profiles;

CREATE POLICY "Candidates can view own profile" ON talent_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Candidates can update own profile" ON talent_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- applications: candidates read their own
DROP POLICY IF EXISTS "Candidates can view own applications" ON applications;
CREATE POLICY "Candidates can view own applications" ON applications
  FOR SELECT USING (profile_id = get_my_candidate_profile_id());

-- work_experience: full CRUD for owner
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Candidates manage own work_experience" ON work_experience;
CREATE POLICY "Candidates manage own work_experience" ON work_experience
  FOR ALL USING (profile_id = get_my_candidate_profile_id());

-- education: full CRUD for owner
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Candidates manage own education" ON education;
CREATE POLICY "Candidates manage own education" ON education
  FOR ALL USING (profile_id = get_my_candidate_profile_id());

-- saved_jobs: full CRUD for owner
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Candidates manage own saved_jobs" ON saved_jobs;
CREATE POLICY "Candidates manage own saved_jobs" ON saved_jobs
  FOR ALL USING (profile_id = get_my_candidate_profile_id());

-- notifications: read + mark-as-read
ALTER TABLE candidate_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Candidates view own notifications"   ON candidate_notifications;
DROP POLICY IF EXISTS "Candidates update own notifications" ON candidate_notifications;

CREATE POLICY "Candidates view own notifications" ON candidate_notifications
  FOR SELECT USING (profile_id = get_my_candidate_profile_id());

CREATE POLICY "Candidates update own notifications" ON candidate_notifications
  FOR UPDATE USING (profile_id = get_my_candidate_profile_id());
