import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { createAdminClient } from '@/lib/supabase/server'
import type { ApplicationRow, TalentProfile, JobRow } from '@/lib/supabase/types'
import ApplicationDetail from './ApplicationDetail'

export const dynamic = 'force-dynamic'

type FullApplication = ApplicationRow & {
  talent_profiles: TalentProfile
  jobs: Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'salary_range' | 'deadline'> | null
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      talent_profiles (*),
      jobs (id, title, sector, type, location, salary_range, deadline)
    `)
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const application = data as unknown as FullApplication

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/dashboard/applications"
        className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors no-underline mb-6 group"
      >
        <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Applications
      </Link>

      <ApplicationDetail application={application} />
    </div>
  )
}
