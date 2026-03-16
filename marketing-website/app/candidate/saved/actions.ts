'use server'
import { revalidatePath } from 'next/cache'
import { createSessionClient } from '@/lib/supabase/server'

async function getProfileId() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const { data } = await supabase
    .from('talent_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()
  if (!data) throw new Error('Profile not found')
  return { supabase, profileId: data.id }
}

export async function saveJob(jobId: string) {
  const { supabase, profileId } = await getProfileId()
  await supabase.from('saved_jobs').upsert({ profile_id: profileId, job_id: jobId })
  revalidatePath('/candidate/saved')
  revalidatePath('/candidate/jobs')
}

export async function unsaveJob(jobId: string) {
  const { supabase, profileId } = await getProfileId()
  await supabase.from('saved_jobs').delete().eq('profile_id', profileId).eq('job_id', jobId)
  revalidatePath('/candidate/saved')
  revalidatePath('/candidate/jobs')
}
