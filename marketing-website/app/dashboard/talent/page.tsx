import { createAdminClient } from '@/lib/supabase/server'
import TalentClient from './TalentClient'

export const dynamic = 'force-dynamic'

export default async function TalentPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('talent_profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return <TalentClient initialProfiles={(data ?? []) as import('@/lib/supabase/types').TalentProfile[]} />
}
