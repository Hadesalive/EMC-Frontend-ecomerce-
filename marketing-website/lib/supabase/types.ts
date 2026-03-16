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
  full_name: string
  email: string
  phone: string | null
  location: string | null
  linkedin_url: string | null
  current_role: string | null
  years_experience: string | null
  qualification: string | null
  summary: string | null
  cv_url: string | null
  preferred_sector: string | null
  employment_type: string | null
  preferred_location: string | null
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

// Joined shape used in the dashboard applications view
export type ApplicationWithRelations = ApplicationRow & {
  talent_profiles: Pick<TalentProfile, 'full_name' | 'email' | 'phone' | 'cv_url' | 'current_role' | 'years_experience'>
  jobs: Pick<JobRow, 'title' | 'sector' | 'type'> | null
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
        Insert: Omit<TalentProfile, 'id' | 'created_at' | 'updated_at' | 'status' | 'notes' | 'phone' | 'location' | 'linkedin_url' | 'current_role' | 'years_experience' | 'qualification' | 'summary' | 'cv_url' | 'preferred_sector' | 'employment_type' | 'preferred_location' | 'source'> & {
          id?: string; created_at?: string; updated_at?: string
          status?: TalentProfile['status']; notes?: string | null; source?: TalentProfile['source']
          phone?: string | null; location?: string | null; linkedin_url?: string | null
          current_role?: string | null; years_experience?: string | null; qualification?: string | null
          summary?: string | null; cv_url?: string | null; preferred_sector?: string | null
          employment_type?: string | null; preferred_location?: string | null
        }
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
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
