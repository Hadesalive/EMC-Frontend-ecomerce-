export type JobRow = {
  id: string
  title: string
  sector: string
  type: 'Permanent' | 'Contract' | 'Temporary'
  location: string
  description: string
  responsibilities: string[]
  requirements: string[]
  nice_to_have: string[]
  salary_range: string | null
  urgent: boolean
  is_active: boolean
  image_url: string | null
  created_at: string
  updated_at: string
}

export type TalentProfile = {
  id: string
  user_id: string | null
  full_name: string
  email: string
  phone: string | null
  location: string | null
  linkedin_url: string | null
  headline: string | null
  current_role: string | null
  years_experience: string | null
  qualification: string | null
  summary: string | null
  cv_url: string | null
  profile_photo_url: string | null
  // Legacy single-value (from apply form)
  preferred_sector: string | null
  employment_type: string | null
  preferred_location: string | null
  // Candidate portal arrays
  preferred_sectors: string[]
  skills: string[]
  certifications: string[]
  languages: string[]
  availability: string | null
  salary_min: number | null
  salary_max: number | null
  date_of_birth: string | null
  nationality: string | null
  profile_complete: boolean
  status: 'active' | 'contacted' | 'placed' | 'inactive'
  notes: string | null
  source: 'general_cv' | 'job_application'
  created_at: string
  updated_at: string
}

export type ApplicationRow = {
  id: string
  job_id: string | null
  profile_id: string
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'placed' | 'rejected'
  applicant_notes: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
}

export type PlacementRequest = {
  id: string
  company_name: string
  sector: string
  contact_name: string
  contact_title: string | null
  email: string
  phone: string
  role_title: string
  num_positions: number
  employment_type: string
  start_date: string | null
  location: string | null
  salary_range: string | null
  description: string
  status: 'new' | 'contacted' | 'in_progress' | 'closed'
  internal_notes: string | null
  created_at: string
  updated_at: string
}

export type WorkExperience = {
  id: string
  profile_id: string
  job_title: string
  company: string
  location: string | null
  sector: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  created_at: string
}

export type Education = {
  id: string
  profile_id: string
  institution: string
  degree: string
  field_of_study: string | null
  start_year: number | null
  end_year: number | null
  created_at: string
}

export type SavedJob = {
  id: string
  profile_id: string
  job_id: string
  created_at: string
}

export type CandidateNotification = {
  id: string
  profile_id: string
  type: 'application_status' | 'new_match' | 'message' | 'system'
  title: string
  message: string
  is_read: boolean
  link: string | null
  created_at: string
}

// Joined shapes
export type ApplicationWithRelations = ApplicationRow & {
  talent_profiles: Pick<TalentProfile, 'full_name' | 'email' | 'phone' | 'cv_url' | 'current_role' | 'years_experience'>
  jobs: Pick<JobRow, 'title' | 'sector' | 'type'> | null
}

export type ApplicationWithJob = ApplicationRow & {
  jobs: Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'urgent'> | null
}

export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: JobRow
        Insert: Omit<JobRow, 'id' | 'created_at' | 'updated_at' | 'is_active' | 'urgent' | 'salary_range' | 'image_url' | 'responsibilities' | 'requirements' | 'nice_to_have'> & {
          id?: string; created_at?: string; updated_at?: string
          is_active?: boolean; urgent?: boolean
          salary_range?: string | null; image_url?: string | null
          responsibilities?: string[]; requirements?: string[]; nice_to_have?: string[]
        }
        Update: Partial<Omit<JobRow, 'id' | 'created_at'>>
        Relationships: []
      }
      talent_profiles: {
        Row: TalentProfile
        Insert: { full_name: string; email: string } & Partial<Omit<TalentProfile, 'full_name' | 'email'>>
        Update: Partial<Omit<TalentProfile, 'id' | 'created_at'>>
        Relationships: []
      }
      applications: {
        Row: ApplicationRow
        Insert: Omit<ApplicationRow, 'id' | 'created_at' | 'updated_at' | 'status' | 'internal_notes' | 'applicant_notes' | 'job_id'> & {
          id?: string; created_at?: string; updated_at?: string
          status?: ApplicationRow['status']
          internal_notes?: string | null; applicant_notes?: string | null
          job_id?: string | null
        }
        Update: Partial<Omit<ApplicationRow, 'id' | 'created_at'>>
        Relationships: []
      }
      placement_requests: {
        Row: PlacementRequest
        Insert: Omit<PlacementRequest, 'id' | 'created_at' | 'updated_at' | 'status' | 'internal_notes' | 'contact_title' | 'start_date' | 'location' | 'salary_range'> & {
          id?: string; created_at?: string; updated_at?: string
          status?: PlacementRequest['status']; internal_notes?: string | null
          contact_title?: string | null; start_date?: string | null
          location?: string | null; salary_range?: string | null
        }
        Update: Partial<Omit<PlacementRequest, 'id' | 'created_at'>>
        Relationships: []
      }
      work_experience: {
        Row: WorkExperience
        Insert: Omit<WorkExperience, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<WorkExperience, 'id' | 'created_at'>>
        Relationships: []
      }
      education: {
        Row: Education
        Insert: Omit<Education, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Education, 'id' | 'created_at'>>
        Relationships: []
      }
      saved_jobs: {
        Row: SavedJob
        Insert: Omit<SavedJob, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<SavedJob, 'id' | 'created_at'>>
        Relationships: []
      }
      candidate_notifications: {
        Row: CandidateNotification
        Insert: Omit<CandidateNotification, 'id' | 'created_at' | 'is_read'> & { id?: string; created_at?: string; is_read?: boolean }
        Update: Partial<Omit<CandidateNotification, 'id' | 'created_at'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      get_my_candidate_profile_id: { Args: Record<string, never>; Returns: string }
    }
  }
}
