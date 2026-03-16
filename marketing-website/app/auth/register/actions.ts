'use server'
import { createAdminClient } from '@/lib/supabase/server'

export async function createCandidateProfile(data: {
  userId: string
  fullName: string
  email: string
  phone: string
}) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('talent_profiles').insert({
    user_id:   data.userId,
    full_name: data.fullName,
    email:     data.email,
    phone:     data.phone || null,
    source:    'general_cv',
    status:    'active',
  })
  if (error) throw new Error(error.message)
}
