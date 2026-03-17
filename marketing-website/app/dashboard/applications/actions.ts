'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import type { ApplicationRow } from '@/lib/supabase/types'
import { sendStatusNotification } from '@/lib/email'

export async function updateApplicationStatus(id: string, status: ApplicationRow['status']) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('applications').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/applications')
}

export async function updateApplicationNotes(id: string, internal_notes: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('applications').update({ internal_notes }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/applications')
}

export async function deleteApplication(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('applications').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/applications')
  revalidatePath('/dashboard/pipeline')
}

export async function notifyCandidate(data: {
  candidateName: string
  candidateEmail: string
  jobTitle: string | null
  status: Exclude<ApplicationRow['status'], 'pending'>
  message: string
}) {
  await sendStatusNotification(data)
}
