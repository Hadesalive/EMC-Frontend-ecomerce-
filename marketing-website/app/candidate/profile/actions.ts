'use server'
import { revalidatePath } from 'next/cache'
import { createSessionClient, createAdminClient } from '@/lib/supabase/server'
import type { TalentProfile, WorkExperience, Education } from '@/lib/supabase/types'

// ── Helper: get the authed user's profile id ─────────────────────
async function getProfileId(): Promise<string> {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data } = await supabase
    .from('talent_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!data) throw new Error('Profile not found')
  return data.id
}

// ── Update core profile fields ────────────────────────────────────
export async function updateProfile(
  updates: Partial<Omit<TalentProfile, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'source'>>
) {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('talent_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/candidate/profile')
  revalidatePath('/candidate/dashboard')
}

// ── Work Experience ───────────────────────────────────────────────
export async function addWorkExperience(
  data: Omit<WorkExperience, 'id' | 'created_at' | 'profile_id'>
) {
  const profileId = await getProfileId()
  const supabase  = await createSessionClient()
  const { error } = await supabase.from('work_experience').insert({ ...data, profile_id: profileId })
  if (error) throw new Error(error.message)
  revalidatePath('/candidate/profile')
}

export async function deleteWorkExperience(id: string) {
  const supabase = await createSessionClient()
  const { error } = await supabase.from('work_experience').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/candidate/profile')
}

// ── Education ─────────────────────────────────────────────────────
export async function addEducation(
  data: Omit<Education, 'id' | 'created_at' | 'profile_id'>
) {
  const profileId = await getProfileId()
  const supabase  = await createSessionClient()
  const { error } = await supabase.from('education').insert({ ...data, profile_id: profileId })
  if (error) throw new Error(error.message)
  revalidatePath('/candidate/profile')
}

export async function deleteEducation(id: string) {
  const supabase = await createSessionClient()
  const { error } = await supabase.from('education').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/candidate/profile')
}

// ── Mark profile complete ─────────────────────────────────────────
export async function markProfileComplete() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('talent_profiles')
    .update({ profile_complete: true, updated_at: new Date().toISOString() })
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/candidate')
}

// ── Upload CV / profile photo (returns public URL) ────────────────
export async function uploadFile(
  bucket: 'candidate-cvs' | 'profile-photos',
  userId: string,
  formData: FormData,
  field: string
): Promise<string> {
  const file = formData.get(field) as File | null
  if (!file) throw new Error('No file provided')

  const admin = createAdminClient()
  const ext   = file.name.split('.').pop()
  const path  = `${userId}/${Date.now()}.${ext}`

  const { error } = await admin.storage.from(bucket).upload(path, file, { upsert: true })
  if (error) throw new Error(error.message)

  const { data } = admin.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
