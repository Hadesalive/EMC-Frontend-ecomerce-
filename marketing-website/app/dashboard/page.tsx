import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/server'
import type { JobRow, ApplicationRow } from '@/lib/supabase/types'

type RecentApp = Pick<ApplicationRow, 'id' | 'status' | 'created_at'> & {
  talent_profiles: { full_name: string } | null
  jobs: { title: string; sector: string } | null
}
type JobSummary = Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'urgent' | 'created_at'>

export const metadata: Metadata = { title: 'Dashboard — EMC' }
export const dynamic = 'force-dynamic'

const statusPill: Record<string, { bg: string; text: string; label: string }> = {
  pending:     { bg: 'bg-gray-100',    text: 'text-gray-600',    label: 'Pending'     },
  reviewing:   { bg: 'bg-blue-50',     text: 'text-blue-600',    label: 'Reviewing'   },
  shortlisted: { bg: 'bg-amber-50',    text: 'text-amber-600',   label: 'Shortlisted' },
  interview:   { bg: 'bg-violet-50',   text: 'text-violet-600',  label: 'Interview'   },
  placed:      { bg: 'bg-emerald-50',  text: 'text-emerald-600', label: 'Placed'      },
  rejected:    { bg: 'bg-red-50',      text: 'text-red-500',     label: 'Rejected'    },
}

function relativeDate(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  if (d < 7)  return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default async function DashboardPage() {
  const supabase = createAdminClient()

  const [
    { count: totalApplications },
    { count: pendingReview },
    { count: activeJobs },
    { count: totalTalent },
    { count: newRequests },
    { data: rawRecentApps },
    { data: rawJobsList },
  ] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true }).in('status', ['pending', 'reviewing']),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('talent_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('placement_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('applications')
      .select('id, status, created_at, talent_profiles(full_name), jobs(title, sector)')
      .order('created_at', { ascending: false })
      .limit(7),
    supabase
      .from('jobs')
      .select('id, title, sector, type, urgent, created_at')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(7),
  ])

  const recentApps = (rawRecentApps ?? []) as unknown as RecentApp[]
  const jobsList   = (rawJobsList   ?? []) as unknown as JobSummary[]

  const dateStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  const kpis = [
    { label: 'Active Jobs',      value: activeJobs        ?? 0, href: '/dashboard/jobs',         accent: 'text-black' },
    { label: 'Applications',     value: totalApplications ?? 0, href: '/dashboard/applications', accent: 'text-black' },
    { label: 'Needs Review',     value: pendingReview     ?? 0, href: '/dashboard/applications', accent: (pendingReview ?? 0) > 0 ? 'text-amber-500' : 'text-black' },
    { label: 'Talent on Roster', value: totalTalent       ?? 0, href: '/dashboard/talent',       accent: 'text-black' },
    { label: 'New Requests',     value: newRequests       ?? 0, href: '/dashboard/requests',     accent: (newRequests ?? 0) > 0 ? 'text-amber-500' : 'text-black' },
  ]

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-black">Overview</h1>
        <span className="text-sm text-black/40">{dateStr}</span>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map(k => (
          <Link key={k.label} href={k.href}
            className="no-underline bg-white rounded-xl border border-black/[0.07] shadow-sm hover:shadow-md transition-shadow p-5 block group">
            <p className={`font-display text-4xl font-bold mb-2 leading-none transition-colors group-hover:text-brand-blue ${k.accent}`}>
              {k.value}
            </p>
            <p className="text-[13px] text-black/50 font-medium">{k.label}</p>
          </Link>
        ))}
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-5 gap-5">

        {/* Recent Applications */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-black/[0.07] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
            <h2 className="text-[13px] font-semibold text-black">Recent Applications</h2>
            <Link href="/dashboard/applications"
              className="text-[13px] text-black/40 hover:text-brand-blue transition-colors no-underline font-medium">
              View all
            </Link>
          </div>

          {(recentApps ?? []).length === 0 ? (
            <div className="px-5 py-14 text-center text-[13px] text-black/30">
              No applications yet.
            </div>
          ) : (
            <div className="divide-y divide-black/[0.05]">
              {(recentApps ?? []).map(a => {
                const profile = a.talent_profiles as { full_name: string } | null
                const job     = a.jobs           as { title: string; sector: string } | null
                const pill    = statusPill[a.status]
                const initial = profile?.full_name?.charAt(0).toUpperCase() ?? '?'
                return (
                  <div key={a.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/80 transition-colors">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-blue text-xs font-bold">{initial}</span>
                    </div>

                    {/* Name + role */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-black leading-tight">{profile?.full_name ?? '—'}</p>
                      <p className="text-[12px] text-black/40 mt-0.5 truncate">
                        {job?.title ?? 'General CV'}{job?.sector ? ` · ${job.sector}` : ''}
                      </p>
                    </div>

                    {/* Date + status */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-[12px] text-black/30 hidden sm:block">{relativeDate(a.created_at)}</span>
                      {pill && (
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${pill.bg} ${pill.text}`}>
                          {pill.label}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Open Positions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-black/[0.07] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
            <h2 className="text-[13px] font-semibold text-black">
              Open Positions
              {(activeJobs ?? 0) > 0 && (
                <span className="ml-2 text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-gray-100 text-black/40">
                  {activeJobs}
                </span>
              )}
            </h2>
            <Link href="/dashboard/jobs"
              className="text-[13px] text-black/40 hover:text-brand-blue transition-colors no-underline font-medium">
              Manage
            </Link>
          </div>

          {(jobsList ?? []).length === 0 ? (
            <div className="px-5 py-14 text-center">
              <p className="text-[13px] text-black/30 mb-3">No active positions.</p>
              <Link href="/dashboard/jobs" className="text-[13px] font-semibold text-brand-blue no-underline hover:underline">
                Post a job →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-black/[0.05]">
              {(jobsList ?? []).map(j => (
                <div key={j.id} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-gray-50/80 transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-black leading-tight truncate">{j.title}</p>
                      {j.urgent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-red-50 text-red-500 flex-shrink-0">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-black/40 mt-0.5">{j.sector}</p>
                  </div>
                  <span className="text-[11px] font-medium text-black/30 flex-shrink-0">{j.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
