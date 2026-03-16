import { createAdminClient } from '@/lib/supabase/server'
import DashboardJobsClient from './DashboardJobsClient'

export const dynamic = 'force-dynamic'

export default async function DashboardJobsPage() {
  const supabase = createAdminClient()
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return <DashboardJobsClient initialJobs={(jobs ?? []) as import('@/lib/supabase/types').JobRow[]} />
}
