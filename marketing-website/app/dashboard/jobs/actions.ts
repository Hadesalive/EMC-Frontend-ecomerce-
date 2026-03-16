'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

export async function createJob(data: {
  title: string
  sector: string
  type: string
  location: string
  description: string
  salary_range: string
  urgent: boolean
  image_url: string | null
  responsibilities: string[]
  requirements: string[]
  nice_to_have: string[]
}) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('jobs').insert({
    ...data,
    type: data.type as 'Permanent' | 'Contract' | 'Temporary',
    is_active: true,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/jobs')
  revalidatePath('/jobs')
}

export async function toggleJobActive(id: string, is_active: boolean) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('jobs').update({ is_active }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/jobs')
  revalidatePath('/jobs')
}

export async function updateJob(id: string, data: {
  title: string; sector: string; type: string; location: string
  description: string; salary_range: string; urgent: boolean
  image_url: string | null
  responsibilities: string[]; requirements: string[]; nice_to_have: string[]
}) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('jobs').update({
    ...data,
    type: data.type as 'Permanent' | 'Contract' | 'Temporary',
  }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/jobs')
  revalidatePath('/jobs')
}

export async function deleteJob(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/jobs')
  revalidatePath('/jobs')
}
