import { createAdminClient } from './supabase/server'
import type { TeamMember } from './cms-types'

// Fetch a single content section (returns null if not found)
export async function getContent<T>(page: string, section: string): Promise<T | null> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('site_content')
      .select('content')
      .eq('page', page)
      .eq('section', section)
      .single()
    return (data?.content as T) ?? null
  } catch {
    return null
  }
}

// Upsert a content section (admin only — uses service role)
export async function upsertContent(page: string, section: string, content: object): Promise<void> {
  const supabase = createAdminClient()
  await supabase
    .from('site_content')
    .upsert(
      { page, section, content: content as Record<string, unknown>, updated_at: new Date().toISOString() },
      { onConflict: 'page,section' },
    )
}

// Fetch active team members ordered by display_order
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    return (data ?? []) as TeamMember[]
  } catch {
    return []
  }
}

// Fetch ALL team members (including inactive) for the admin panel
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true })
    return (data ?? []) as TeamMember[]
  } catch {
    return []
  }
}
