import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import type { TalentProfile, WorkExperience, Education } from '@/lib/supabase/types'
import ProfileEditor from './ProfileEditor'

export default async function CandidateProfilePage() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('talent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single() as { data: TalentProfile | null }

  if (!profile) redirect('/candidate/profile/setup')

  const { data: workExp } = await supabase
    .from('work_experience')
    .select('*')
    .eq('profile_id', profile.id)
    .order('start_date', { ascending: false }) as { data: WorkExperience[] | null }

  const { data: education } = await supabase
    .from('education')
    .select('*')
    .eq('profile_id', profile.id)
    .order('end_year', { ascending: false }) as { data: Education[] | null }

  const completenessFields = [
    profile.headline, profile.location, profile.years_experience,
    profile.qualification, profile.summary,
    profile.skills?.length, profile.preferred_sectors?.length,
  ]
  const completeness = Math.round(
    (completenessFields.filter(Boolean).length / completenessFields.length) * 100
  )

  const initials = profile.full_name
    .split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">

      {/* ── Left: Profile summary card ── */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-8 space-y-4">

        {/* Identity card */}
        <div className="bg-white rounded-2xl border border-black/5 p-6 text-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-brand-blue mx-auto flex items-center justify-center text-white text-2xl font-bold select-none mb-4">
            {initials}
          </div>

          <h1 className="font-display text-lg font-bold text-black leading-tight">{profile.full_name}</h1>

          {profile.headline
            ? <p className="text-sm text-black/50 mt-1 leading-snug">{profile.headline}</p>
            : <p className="text-sm text-black/25 mt-1 italic">Add a headline</p>
          }

          {/* Availability */}
          {profile.availability && (
            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
              <span className="text-xs font-medium text-green-700">{profile.availability}</span>
            </div>
          )}

          {/* Profile completeness */}
          <div className="mt-5 pt-5 border-t border-black/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-black/40">Profile strength</span>
              <span className="text-xs font-bold text-black">{completeness}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${completeness === 100 ? 'bg-green-500' : 'bg-brand-blue'}`}
                style={{ width: `${completeness}%` }}
              />
            </div>
            {completeness < 100 && (
              <p className="text-xs text-black/30 mt-1.5">Fill in more details to improve matches</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-3">
          {[
            profile.current_role && {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
              label: profile.current_role,
            },
            profile.location && {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
              label: profile.location,
            },
            profile.years_experience && {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
              label: profile.years_experience,
            },
            profile.qualification && {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />,
              label: profile.qualification,
            },
            profile.email && {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
              label: profile.email,
            },
          ].filter(Boolean).map((item, i) => item && (
            <div key={i} className="flex items-start gap-2.5 text-sm">
              <svg className="w-4 h-4 text-black/30 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                {item.icon}
              </svg>
              <span className="text-black/70 leading-snug">{item.label}</span>
            </div>
          ))}

          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-brand-blue hover:underline">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn profile
            </a>
          )}
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-3">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map(skill => (
                <span key={skill} className="px-2.5 py-1 bg-brand-blue/8 text-brand-blue text-xs rounded-md border border-brand-blue/15 font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {profile.languages && profile.languages.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-3">Languages</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.languages.map(lang => (
                <span key={lang} className="px-2.5 py-1 bg-gray-50 text-black/60 text-xs rounded-md border border-black/5 font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preferred sectors */}
        {profile.preferred_sectors && profile.preferred_sectors.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-3">Open to work in</p>
            <div className="space-y-1.5">
              {profile.preferred_sectors.map(s => (
                <div key={s} className="flex items-center gap-2 text-sm text-black/60">
                  <span className="w-1 h-1 rounded-full bg-brand-blue shrink-0" aria-hidden="true" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ── Right: Editor ── */}
      <div className="flex-1 min-w-0">
        <ProfileEditor
          profile={profile}
          workExp={workExp ?? []}
          education={education ?? []}
          userId={user.id}
        />
      </div>
    </div>
  )
}
