'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import type { BioSection } from '@/lib/cms-types'

interface MemberPayload {
  name: string
  title: string
  tagline?: string
  short_bio: string
  credentials: string[]
  specialisms: string[]
  sections: BioSection[]
  image_url?: string
  color: 'brand-blue' | 'brand-orange'
  display_order: number
  is_active: boolean
}

function revalidate() {
  revalidatePath('/about')
  revalidatePath('/dashboard/content/team')
}

export async function createTeamMember(payload: MemberPayload) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('team_members').insert({
    ...payload,
    updated_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
  revalidate()
}

export async function updateTeamMember(id: string, payload: MemberPayload) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('team_members')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidate()
}

export async function deleteTeamMember(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidate()
}

export async function toggleTeamMemberActive(id: string, is_active: boolean) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('team_members')
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidate()
}
