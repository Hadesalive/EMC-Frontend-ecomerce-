import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import type { ApplicationRow, TalentProfile, JobRow } from '@/lib/supabase/types'
import PipelineBoard from './PipelineBoard'

export const metadata: Metadata = { title: 'Pipeline — EMC' }
export const dynamic = 'force-dynamic'

export type PipelineApplication = Pick<ApplicationRow, 'id' | 'status' | 'created_at'> & {
  talent_profiles: Pick<TalentProfile, 'full_name' | 'current_role'> | null
  jobs: Pick<JobRow, 'title' | 'sector'> | null
}

export default async function PipelinePage() {
  const supabase = createAdminClient()
  const { data: raw, error } = await supabase
    .from('applications')
    .select('id, status, created_at, talent_profiles(full_name, current_role), jobs(title, sector)')
    .not('status', 'eq', 'rejected')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const applications = (raw ?? []) as unknown as PipelineApplication[]

  return <PipelineBoard initialApplications={applications} />
}
