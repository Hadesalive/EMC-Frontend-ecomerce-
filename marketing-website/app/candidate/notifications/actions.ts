'use server'
import { revalidatePath } from 'next/cache'
import { createSessionClient } from '@/lib/supabase/server'

export async function markNotificationRead(id: string) {
  const supabase = await createSessionClient()
  await supabase.from('candidate_notifications').update({ is_read: true }).eq('id', id)
  revalidatePath('/candidate/notifications')
  revalidatePath('/candidate/dashboard')
}

export async function markAllRead(profileId: string) {
  const supabase = await createSessionClient()
  await supabase.from('candidate_notifications').update({ is_read: true }).eq('profile_id', profileId).eq('is_read', false)
  revalidatePath('/candidate/notifications')
  revalidatePath('/candidate/dashboard')
}
