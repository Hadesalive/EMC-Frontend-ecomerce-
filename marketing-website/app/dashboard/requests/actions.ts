'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import type { PlacementRequest } from '@/lib/supabase/types'

export async function updateRequestStatus(id: string, status: PlacementRequest['status']) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('placement_requests').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/requests')
}

export async function updateRequestNotes(id: string, internal_notes: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('placement_requests').update({ internal_notes }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/requests')
}
