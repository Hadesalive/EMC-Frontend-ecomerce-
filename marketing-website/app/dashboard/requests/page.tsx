import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import RequestsClient from './RequestsClient'

export const metadata: Metadata = { title: 'Placement Requests — EMC' }
export const dynamic = 'force-dynamic'

export default async function RequestsPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('placement_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return <RequestsClient initialRequests={(data ?? []) as import('@/lib/supabase/types').PlacementRequest[]} />
}
