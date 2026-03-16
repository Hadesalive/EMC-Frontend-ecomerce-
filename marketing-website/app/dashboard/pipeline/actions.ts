'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import type { ApplicationRow } from '@/lib/supabase/types'

export async function moveApplication(id: string, status: ApplicationRow['status']) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('applications').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/pipeline')
  revalidatePath('/dashboard/applications')
}
