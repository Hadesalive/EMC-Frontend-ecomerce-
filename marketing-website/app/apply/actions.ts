'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { sendApplicationNotification } from '@/lib/email'

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
}) {
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

  if (profileErr) throw new Error(profileErr.message)

  // Insert application record
  const { error: appErr } = await supabase.from('applications').insert({
    job_id:          data.jobId || null,
    profile_id:      profile.id,
    applicant_notes: data.notes || null,
    status:          'pending',
  })

  if (appErr) throw new Error(appErr.message)

  // Resolve job title for the email (best-effort)
  let jobTitle: string | null = null
  if (data.jobId) {
    const { data: job } = await supabase.from('jobs').select('title').eq('id', data.jobId).single()
    jobTitle = (job as unknown as { title: string } | null)?.title ?? null
  }

  // Fire notification email — non-blocking, don't fail submission if email errors
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
  }).catch(console.error)

  revalidatePath('/dashboard/applications')
  revalidatePath('/dashboard/talent')
}
