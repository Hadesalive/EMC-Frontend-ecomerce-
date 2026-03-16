import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import { calculateMatchScore, bandLabel, bandColor } from '@/lib/matching'
import type { TalentProfile, JobRow, ApplicationWithJob, CandidateNotification } from '@/lib/supabase/types'

const STATUS_LABELS: Record<string, string> = {
  pending:     'Pending Review',
  reviewing:   'Under Review',
  shortlisted: 'Shortlisted',
  interview:   'Interview',
  placed:      'Placed',
  rejected:    'Not Progressed',
}
const STATUS_COLORS: Record<string, string> = {
  pending:     'bg-gray-100 text-black/50',
  reviewing:   'bg-brand-blue/10 text-brand-blue',
  shortlisted: 'bg-brand-orange/10 text-brand-orange',
  interview:   'bg-purple-50 text-purple-700',
  placed:      'bg-green-50 text-green-700',
  rejected:    'bg-red-50 text-red-500',
}

export default async function CandidateDashboardPage() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Fetch profile
  const { data: profile } = await supabase
    .from('talent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single() as { data: TalentProfile | null }

  if (!profile) redirect('/candidate/profile/setup')

  // Prompt setup if not complete
  const needsSetup = !profile.profile_complete

  // Fetch recent applications (last 5)
  const { data: applications } = await supabase
    .from('applications')
    .select('*, jobs(id, title, sector, type, location, urgent)')
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(5) as { data: ApplicationWithJob[] | null }

  // Fetch active jobs for match scoring (top 20)
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(20) as { data: JobRow[] | null }

  // Fetch unread notifications
  const { data: notifications } = await supabase
    .from('candidate_notifications')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false })
    .limit(5) as { data: CandidateNotification[] | null }

  // Compute top matches
  const topMatches = (jobs ?? [])
    .map(job => ({ job, match: calculateMatchScore(profile, job) }))
    .filter(m => m.match.band !== 'low')
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 3)

  const firstName = profile.full_name.split(' ')[0]
  const completenessFields = [
    profile.headline, profile.location, profile.years_experience,
    profile.qualification, profile.summary, profile.skills?.length,
    profile.preferred_sectors?.length,
  ]
  const completeness = Math.round((completenessFields.filter(Boolean).length / completenessFields.length) * 100)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Welcome back, {firstName}</h1>
          <p className="text-black/50 text-sm mt-0.5">Here&apos;s an overview of your job search activity.</p>
        </div>
        {needsSetup && (
          <Link
            href="/candidate/profile/setup"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-lg hover:bg-brand-orange/90 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Complete your profile
          </Link>
        )}
      </div>

      {/* Profile completeness */}
      <div className="bg-white rounded-2xl border border-black/5 p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-black">Profile Completeness</p>
          <span className="text-sm font-bold text-brand-blue">{completeness}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-blue rounded-full transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
        {completeness < 100 && (
          <p className="text-xs text-black/40 mt-2">
            Complete your profile to improve job matches.{' '}
            <Link href="/candidate/profile" className="text-brand-blue hover:underline">Update now →</Link>
          </p>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: (applications?.length ?? 0).toString() },
          { label: 'Shortlisted',         value: (applications?.filter(a => a.status === 'shortlisted' || a.status === 'interview').length ?? 0).toString() },
          { label: 'Top Matches',          value: topMatches.length.toString() },
          { label: 'Notifications',        value: (notifications?.length ?? 0).toString() },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-2xl font-bold text-black">{stat.value}</p>
            <p className="text-xs text-black/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top job matches */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-black">Top Job Matches</h2>
            <Link href="/candidate/jobs" className="text-xs text-brand-blue hover:underline">View all →</Link>
          </div>
          {topMatches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-black/40 text-sm">No strong matches yet.</p>
              <Link href="/candidate/profile" className="text-brand-blue text-sm hover:underline mt-1 block">
                Complete your profile to get matched
              </Link>
            </div>
          ) : (
            <ul role="list" className="space-y-3">
              {topMatches.map(({ job, match }) => (
                <li key={job.id} role="listitem">
                  <Link
                    href={`/candidate/jobs?highlight=${job.id}`}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black truncate group-hover:text-brand-blue transition-colors">{job.title}</p>
                      <p className="text-xs text-black/40 mt-0.5">{job.sector} · {job.location}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${bandColor(match.band)}`}>
                      {bandLabel(match.band)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent applications */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-black">Recent Applications</h2>
            <Link href="/candidate/applications" className="text-xs text-brand-blue hover:underline">View all →</Link>
          </div>
          {!applications?.length ? (
            <div className="text-center py-8">
              <p className="text-black/40 text-sm">No applications yet.</p>
              <Link href="/candidate/jobs" className="text-brand-blue text-sm hover:underline mt-1 block">
                Browse open jobs →
              </Link>
            </div>
          ) : (
            <ul role="list" className="space-y-3">
              {applications.map(app => (
                <li key={app.id} role="listitem" className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-black truncate">{app.jobs?.title ?? 'General Application'}</p>
                    <p className="text-xs text-black/40 mt-0.5">{app.jobs?.sector ?? ''}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[app.status] ?? STATUS_COLORS.pending}`}>
                    {STATUS_LABELS[app.status] ?? app.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Notifications */}
      {(notifications?.length ?? 0) > 0 && (
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-black">Notifications</h2>
            <Link href="/candidate/notifications" className="text-xs text-brand-blue hover:underline">View all →</Link>
          </div>
          <ul role="list" className="space-y-3">
            {notifications!.map(n => (
              <li key={n.id} role="listitem" className="flex items-start gap-3 p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-brand-blue shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-black">{n.title}</p>
                  <p className="text-xs text-black/50 mt-0.5">{n.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
