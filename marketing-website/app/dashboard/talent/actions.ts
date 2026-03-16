'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import type { TalentProfile } from '@/lib/supabase/types'

export async function updateProfileStatus(id: string, status: TalentProfile['status']) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('talent_profiles').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/talent')
}

export async function updateProfileNotes(id: string, notes: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('talent_profiles').update({ notes }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/talent')
}

export async function updateProfile(id: string, data: {
  full_name: string; email: string; phone: string | null
  location: string | null; current_role: string | null
  years_experience: string | null; qualification: string | null
  preferred_sector: string | null; employment_type: string | null
}) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('talent_profiles').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/talent')
}

export async function deleteProfile(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('talent_profiles').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/talent')
  revalidatePath('/dashboard/applications')
}
