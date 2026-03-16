import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSessionClient } from '@/lib/supabase/server'
import type { ApplicationWithJob } from '@/lib/supabase/types'

const STATUSES: ApplicationWithJob['status'][] = [
  'pending', 'reviewing', 'shortlisted', 'interview', 'placed', 'rejected',
]

const STATUS_META: Record<ApplicationWithJob['status'], { label: string; color: string; step: number }> = {
  pending:     { label: 'Pending Review', color: 'bg-gray-100 text-black/50',          step: 0 },
  reviewing:   { label: 'Under Review',   color: 'bg-brand-blue/10 text-brand-blue',   step: 1 },
  shortlisted: { label: 'Shortlisted',    color: 'bg-brand-orange/10 text-brand-orange', step: 2 },
  interview:   { label: 'Interview',      color: 'bg-purple-50 text-purple-700',        step: 3 },
  placed:      { label: 'Placed',         color: 'bg-green-50 text-green-700',          step: 4 },
  rejected:    { label: 'Not Progressed', color: 'bg-red-50 text-red-500',              step: -1 },
}

function StatusTimeline({ status }: { status: ApplicationWithJob['status'] }) {
  if (status === 'rejected') {
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_META.rejected.color}`}>
        Not Progressed
      </span>
    )
  }
  const steps = STATUSES.filter(s => s !== 'rejected')
  const currentStep = STATUS_META[status]?.step ?? 0

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {steps.map((s, i) => {
        const meta = STATUS_META[s]
        const active = meta.step === currentStep
        const done   = meta.step < currentStep
        return (
          <div key={s} className="flex items-center gap-1">
            <div
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                active ? meta.color + ' font-semibold' : done ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-black/30'
              }`}
            >
              {meta.label}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-3 h-px ${done || active ? 'bg-black/20' : 'bg-black/10'}`} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default async function ApplicationsPage() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('talent_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) redirect('/candidate/profile/setup')

  const { data: applications } = await supabase
    .from('applications')
    .select('*, jobs(id, title, sector, type, location, urgent)')
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false }) as { data: ApplicationWithJob[] | null }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-black">My Applications</h1>
        <p className="text-black/50 text-sm mt-0.5">{applications?.length ?? 0} application{(applications?.length ?? 0) !== 1 ? 's' : ''}</p>
      </div>

      {!applications?.length ? (
        <div className="bg-white rounded-2xl border border-black/5 p-12 text-center">
          <svg className="w-10 h-10 text-black/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-black/40 text-sm">No applications yet.</p>
          <Link href="/candidate/jobs" className="text-brand-blue text-sm hover:underline mt-2 block">Browse open jobs →</Link>
        </div>
      ) : (
        <ul role="list" className="space-y-4">
          {applications.map(app => (
            <li key={app.id} role="listitem" className="bg-white rounded-2xl border border-black/5 p-6 hover:border-black/10 transition-all">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-base font-semibold text-black">
                    {app.jobs?.title ?? 'General Application'}
                  </h2>
                  <p className="text-sm text-black/50 mt-0.5">
                    {app.jobs?.sector ?? ''}
                    {app.jobs?.location ? ` · ${app.jobs.location}` : ''}
                    {app.jobs?.type ? ` · ${app.jobs.type}` : ''}
                  </p>
                </div>
                {app.jobs?.urgent && (
                  <span className="shrink-0 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100">Urgent</span>
                )}
              </div>

              <StatusTimeline status={app.status} />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5">
                <p className="text-xs text-black/40">
                  Applied {new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {app.jobs?.id && (
                  <Link href={`/jobs/${app.jobs.id}`} className="text-xs text-brand-blue hover:underline">
                    View job →
                  </Link>
                )}
              </div>

              {app.applicant_notes && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-black/40 mb-1 font-medium">Your note</p>
                  <p className="text-sm text-black/60">{app.applicant_notes}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
