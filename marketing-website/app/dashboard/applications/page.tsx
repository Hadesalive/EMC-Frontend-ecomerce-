import { createAdminClient } from '@/lib/supabase/server'
import ApplicationsClient from './ApplicationsClient'

export const dynamic = 'force-dynamic'

export default async function ApplicationsPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      talent_profiles ( full_name, email, phone, cv_url, current_role, years_experience ),
      jobs ( title, sector, type )
    `)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return <ApplicationsClient initialApplications={(data ?? []) as unknown as import('@/lib/supabase/types').ApplicationWithRelations[]} />
}
