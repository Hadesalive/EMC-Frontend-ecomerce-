'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { sendApplicationNotification, sendApplicationConfirmation } from '@/lib/email'

export type SubmitResult = { success: true } | { error: string }

export type SavedProfile = {
  full_name: string
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
}

export async function lookupProfile(email: string): Promise<SavedProfile | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('talent_profiles')
    .select('full_name, phone, location, linkedin_url, current_role, years_experience, qualification, summary, cv_url, preferred_sector, employment_type, preferred_location')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle()
  return (data as SavedProfile | null)
}

export async function submitApplication(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  linkedin: string
  yearsExperience: string
  qualification: string
  currentRole: string
  summary: string
  cvUrl: string | null
  preferredSector: string
  employmentType: string
  preferredLocation: string
  notes: string
  jobId: string | null
}): Promise<SubmitResult> {
  const supabase = createAdminClient()

  // Upsert talent profile (create or update by email)
  const { data: profile, error: profileErr } = await supabase
    .from('talent_profiles')
    .upsert(
      {
        full_name:          `${data.firstName.trim()} ${data.lastName.trim()}`,
        email:              data.email.toLowerCase().trim(),
        phone:              data.phone || null,
        location:           data.location || null,
        linkedin_url:       data.linkedin || null,
        current_role:       data.currentRole || null,
        years_experience:   data.yearsExperience || null,
        qualification:      data.qualification || null,
        summary:            data.summary || null,
        cv_url:             data.cvUrl,
        preferred_sector:   data.preferredSector || null,
        employment_type:    data.employmentType || null,
        preferred_location: data.preferredLocation || null,
        source:             data.jobId ? 'job_application' : 'general_cv',
      },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    .select('id')
    .single()

  if (profileErr) return { error: profileErr.message }

  // Check for existing application for this specific job
  if (data.jobId) {
    const { data: existing } = await supabase
      .from('applications')
      .select('id')
      .eq('profile_id', profile.id)
      .eq('job_id', data.jobId)
      .maybeSingle()

    if (existing) {
      return { error: 'You have already applied for this position. Our team will be in touch if you are shortlisted.' }
    }
  }

  // Insert application record
  const { error: appErr } = await supabase.from('applications').insert({
    job_id:          data.jobId || null,
    profile_id:      profile.id,
    applicant_notes: data.notes || null,
    status:          'pending',
  })

  if (appErr) {
    // Catch the DB-level unique violation as a fallback
    if (appErr.code === '23505') {
      return { error: 'You have already applied for this position. Our team will be in touch if you are shortlisted.' }
    }
    return { error: appErr.message }
  }

  // Resolve job title for the email (best-effort)
  let jobTitle: string | null = null
  if (data.jobId) {
    const { data: job } = await supabase.from('jobs').select('title').eq('id', data.jobId).single()
    jobTitle = (job as unknown as { title: string } | null)?.title ?? null
  }

  // Fire both emails — non-blocking, don't fail submission if email errors
  Promise.all([
    sendApplicationNotification({
      applicantName:   `${data.firstName.trim()} ${data.lastName.trim()}`,
      applicantEmail:  data.email,
      applicantPhone:  data.phone,
      jobTitle,
      sector:          data.preferredSector,
      cvUrl:           data.cvUrl,
      yearsExperience: data.yearsExperience,
      qualification:   data.qualification,
      currentRole:     data.currentRole,
      summary:         data.summary,
    }),
    sendApplicationConfirmation({
      firstName:   data.firstName.trim(),
      email:       data.email,
      jobTitle,
      cvUploaded:  !!data.cvUrl,
    }),
  ]).catch(console.error)

  revalidatePath('/dashboard/applications')
  revalidatePath('/dashboard/talent')
  return { success: true as const }
}
