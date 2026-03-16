import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSessionClient } from '@/lib/supabase/server'
import { calculateMatchScore, bandLabel, bandColor } from '@/lib/matching'
import type { TalentProfile, JobRow } from '@/lib/supabase/types'
import SaveJobButton from '../jobs/SaveJobButton'

export default async function SavedJobsPage() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('talent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single() as { data: TalentProfile | null }

  if (!profile) redirect('/candidate/profile/setup')

  const { data: savedRows } = await supabase
    .from('saved_jobs')
    .select('job_id, jobs(*)')
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false })

  const savedJobs = (savedRows ?? [])
    .map(r => r.jobs as unknown as JobRow)
    .filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-black">Saved Jobs</h1>
        <p className="text-black/50 text-sm mt-0.5">{savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/5 p-12 text-center">
          <svg className="w-10 h-10 text-black/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <p className="text-black/40 text-sm">No saved jobs yet.</p>
          <Link href="/candidate/jobs" className="text-brand-blue text-sm hover:underline mt-2 block">Browse jobs →</Link>
        </div>
      ) : (
        <ul role="list" className="space-y-4">
          {savedJobs.map(job => {
            const match = calculateMatchScore(profile, job)
            return (
              <li key={job.id} role="listitem" className="bg-white rounded-2xl border border-black/5 p-6 hover:border-black/10 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-black">{job.title}</h2>
                      {job.urgent && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100">Urgent</span>}
                    </div>
                    <p className="text-sm text-black/50">{job.sector} · {job.location} · {job.type}</p>
                    {job.salary_range && <p className="text-sm text-black/40 mt-0.5">{job.salary_range}</p>}
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${bandColor(match.band)}`}>
                      {bandLabel(match.band)}
                    </span>
                    <SaveJobButton jobId={job.id} profileId={profile.id} isSaved={true} />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/5">
                  <Link href={`/jobs/${job.id}`} className="px-4 py-2 border border-black/15 text-black text-xs font-medium rounded-lg hover:bg-black/5 transition-all">
                    View details
                  </Link>
                  <Link href={`/jobs/${job.id}#apply`} className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/80 transition-all">
                    Apply now
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
