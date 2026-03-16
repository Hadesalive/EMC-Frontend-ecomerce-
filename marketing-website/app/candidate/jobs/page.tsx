import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSessionClient } from '@/lib/supabase/server'
import { calculateMatchScore, bandLabel, bandColor } from '@/lib/matching'
import type { TalentProfile, JobRow } from '@/lib/supabase/types'
import SaveJobButton from './SaveJobButton'

export default async function CandidateJobsPage() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('talent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single() as { data: TalentProfile | null }

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false }) as { data: JobRow[] | null }

  const { data: savedRows } = await supabase
    .from('saved_jobs')
    .select('job_id')
    .eq('profile_id', profile?.id ?? '')

  const savedIds = new Set((savedRows ?? []).map(r => r.job_id))

  const scored = (jobs ?? []).map(job => ({
    job,
    match: profile ? calculateMatchScore(profile, job) : null,
  })).sort((a, b) => (b.match?.score ?? 0) - (a.match?.score ?? 0))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-black">Browse Jobs</h1>
        <p className="text-black/50 text-sm mt-0.5">
          {profile ? 'Jobs ranked by your match score.' : 'Complete your profile to see match scores.'}
        </p>
      </div>

      {!profile?.profile_complete && (
        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-brand-orange font-medium">Complete your profile to unlock personalised match scores.</p>
          <Link href="/candidate/profile/setup" className="shrink-0 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-lg hover:bg-brand-orange/90 transition-all">
            Complete profile
          </Link>
        </div>
      )}

      {scored.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/5 p-12 text-center">
          <p className="text-black/40 text-sm">No active jobs at the moment. Check back soon.</p>
        </div>
      ) : (
        <ul role="list" className="space-y-4">
          {scored.map(({ job, match }) => (
            <li key={job.id} role="listitem" className="bg-white rounded-2xl border border-black/5 p-6 hover:border-black/10 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="text-base font-semibold text-black">{job.title}</h2>
                    {job.urgent && (
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100">Urgent</span>
                    )}
                  </div>
                  <p className="text-sm text-black/50">{job.sector} · {job.location} · {job.type}</p>
                  {job.salary_range && <p className="text-sm text-black/40 mt-0.5">{job.salary_range}</p>}
                  {job.description && (
                    <p className="text-sm text-black/60 mt-3 line-clamp-2 leading-relaxed">{job.description}</p>
                  )}
                  {match && match.reasons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {match.reasons.map(r => (
                        <span key={r} className="px-2 py-0.5 bg-gray-50 text-black/50 text-xs rounded-md border border-black/5">{r}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="shrink-0 flex flex-col items-end gap-3">
                  {match && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${bandColor(match.band)}`}>
                      {bandLabel(match.band)}
                    </span>
                  )}
                  <SaveJobButton jobId={job.id} profileId={profile?.id ?? ''} isSaved={savedIds.has(job.id)} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/5">
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-4 py-2 border border-black/15 text-black text-xs font-medium rounded-lg hover:bg-black/5 transition-all"
                >
                  View details
                </Link>
                <Link
                  href={`/jobs/${job.id}#apply`}
                  className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/80 transition-all"
                >
                  Apply now
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
