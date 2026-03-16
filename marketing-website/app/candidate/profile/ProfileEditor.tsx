'use client'
import { useState, useTransition } from 'react'
import type { TalentProfile, WorkExperience, Education } from '@/lib/supabase/types'
import { updateProfile, addWorkExperience, deleteWorkExperience, addEducation, deleteEducation } from './actions'
import { SECTORS } from '@/lib/matching'

const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years']
const QUALIFICATIONS = [
  'No formal qualification', 'Secondary School (BECE/WASSCE)', 'Vocational/Technical Certificate',
  'Higher National Diploma (HND)', "Bachelor's Degree", "Master's Degree", 'PhD / Doctorate',
  'Professional Certification',
]
const EMPLOYMENT_TYPES = ['Permanent', 'Contract', 'Temporary', 'Open to any']
const LOCATIONS = ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu', 'Bonthe', 'Port Loko', 'Nationwide', 'Open to relocation']
const LANGUAGES  = ['English', 'Krio', 'Temne', 'Mende', 'Limba', 'French', 'Arabic', 'Other']
const AVAILABILITY_OPTIONS = ['Immediately', 'Within 2 weeks', 'Within 1 month', '1–3 months', 'Currently employed — open to offers']

type Tab = 'overview' | 'experience' | 'education' | 'preferences'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'overview', label: 'Overview',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    id: 'experience', label: 'Experience',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    id: 'education', label: 'Education',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
  },
  {
    id: 'preferences', label: 'Preferences',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  },
]

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-black">{title}</h3>
      {description && <p className="text-xs text-black/40 mt-0.5">{description}</p>}
    </div>
  )
}

function Divider() {
  return <div className="border-t border-black/5 my-6" aria-hidden="true" />
}

export default function ProfileEditor({
  profile,
  workExp,
  education,
  userId,
}: {
  profile: TalentProfile
  workExp: WorkExperience[]
  education: Education[]
  userId: string
}) {
  const [tab, setTab]       = useState<Tab>('overview')
  const [isPending, start]  = useTransition()
  const [saved, setSaved]   = useState(false)
  const [error, setError]   = useState<string | null>(null)

  // Overview
  const [headline, setHeadline]       = useState(profile.headline ?? '')
  const [summary, setSummary]         = useState(profile.summary ?? '')
  const [currentRole, setCurrentRole] = useState(profile.current_role ?? '')
  const [yearsExp, setYearsExp]       = useState(profile.years_experience ?? '')
  const [qualification, setQual]     = useState(profile.qualification ?? '')
  const [location, setLocation]       = useState(profile.location ?? '')
  const [linkedin, setLinkedin]       = useState(profile.linkedin_url ?? '')

  // Skills & languages
  const [skills, setSkills]         = useState<string[]>(profile.skills ?? [])
  const [skillInput, setSkillInput] = useState('')
  const [certs, setCerts]           = useState<string[]>(profile.certifications ?? [])
  const [certInput, setCertInput]   = useState('')
  const [langs, setLangs]           = useState<string[]>(profile.languages ?? [])

  // Preferences
  const [sectors, setSectors]           = useState<string[]>(profile.preferred_sectors ?? [])
  const [empType, setEmpType]           = useState(profile.employment_type ?? '')
  const [prefLoc, setPrefLoc]           = useState(profile.preferred_location ?? '')
  const [availability, setAvailability] = useState(profile.availability ?? '')
  const [salMin, setSalMin]             = useState(profile.salary_min?.toString() ?? '')
  const [salMax, setSalMax]             = useState(profile.salary_max?.toString() ?? '')

  // Work exp form
  const [weForm, setWeForm] = useState(false)
  const [weData, setWeData] = useState({ job_title: '', company: '', location: '', sector: '', start_date: '', end_date: '', is_current: false, description: '' })

  // Education form
  const [eduForm, setEduForm] = useState(false)
  const [eduData, setEduData] = useState({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '' })

  const inputCls = 'w-full px-3.5 py-2.5 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 text-sm bg-white transition-all placeholder:text-black/25'

  function addTag(val: string, list: string[], setList: (v: string[]) => void, setInput: (v: string) => void) {
    const t = val.trim()
    if (t && !list.includes(t)) setList([...list, t])
    setInput('')
  }
  function removeTag(t: string, list: string[], setList: (v: string[]) => void) {
    setList(list.filter(x => x !== t))
  }
  function toggle(item: string, list: string[], setList: (v: string[]) => void) {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item])
  }
  function flashSaved() { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  function save() {
    setError(null)
    start(async () => {
      try {
        if (tab === 'overview') {
          await updateProfile({ headline, summary, current_role: currentRole, years_experience: yearsExp, qualification, location, linkedin_url: linkedin, skills, certifications: certs, languages: langs })
        } else if (tab === 'preferences') {
          await updateProfile({ preferred_sectors: sectors, employment_type: empType, preferred_location: prefLoc, availability, salary_min: salMin ? parseInt(salMin) : null, salary_max: salMax ? parseInt(salMax) : null })
        }
        flashSaved()
      } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed.') }
    })
  }

  async function submitWorkExp() {
    setError(null)
    start(async () => {
      try {
        await addWorkExperience({ job_title: weData.job_title, company: weData.company, location: weData.location || null, sector: weData.sector || null, start_date: weData.start_date, end_date: weData.is_current ? null : (weData.end_date || null), is_current: weData.is_current, description: weData.description || null })
        setWeForm(false)
        setWeData({ job_title: '', company: '', location: '', sector: '', start_date: '', end_date: '', is_current: false, description: '' })
        flashSaved()
      } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Failed to save.') }
    })
  }

  async function submitEducation() {
    setError(null)
    start(async () => {
      try {
        await addEducation({ institution: eduData.institution, degree: eduData.degree, field_of_study: eduData.field_of_study || null, start_year: eduData.start_year ? parseInt(eduData.start_year) : null, end_year: eduData.end_year ? parseInt(eduData.end_year) : null })
        setEduForm(false)
        setEduData({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '' })
        flashSaved()
      } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Failed to save.') }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-black/5">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => { setTab(t.id); setError(null) }}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${
              tab === t.id
                ? 'border-black text-black'
                : 'border-transparent text-black/40 hover:text-black/70 hover:border-black/20'
            }`}
          >
            <span className={tab === t.id ? 'text-black' : 'text-black/30'}>{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 lg:p-8">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <SectionHeader title="Basic Information" description="How you appear to recruiters" />

            <div>
              <label htmlFor="pe-headline" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Professional Headline</label>
              <input id="pe-headline" type="text" value={headline} onChange={e => setHeadline(e.target.value)} className={inputCls} placeholder="e.g. Civil Engineer · 5 years in Mining & Construction" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pe-currentRole" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Current / Most Recent Role</label>
                <input id="pe-currentRole" type="text" value={currentRole} onChange={e => setCurrentRole(e.target.value)} className={inputCls} placeholder="e.g. Site Safety Officer" />
              </div>
              <div>
                <label htmlFor="pe-location" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Location</label>
                <select id="pe-location" value={location} onChange={e => setLocation(e.target.value)} className={inputCls}>
                  <option value="">Select location</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pe-yearsExp" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Years of Experience</label>
                <select id="pe-yearsExp" value={yearsExp} onChange={e => setYearsExp(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {EXPERIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="pe-qual" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Highest Qualification</label>
                <select id="pe-qual" value={qualification} onChange={e => setQual(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {QUALIFICATIONS.map(q => <option key={q}>{q}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="pe-linkedin" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">LinkedIn URL</label>
              <input id="pe-linkedin" type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} className={inputCls} placeholder="https://linkedin.com/in/yourprofile" />
            </div>

            <div>
              <label htmlFor="pe-summary" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Professional Summary</label>
              <textarea id="pe-summary" value={summary} onChange={e => setSummary(e.target.value)} rows={4} className={`${inputCls} resize-none leading-relaxed`} placeholder="Describe your background, key strengths, and what you're looking for..." />
              <p className="text-xs text-black/30 mt-1.5 text-right">{summary.length} / 500</p>
            </div>

            <Divider />
            <SectionHeader title="Skills" description="Add skills that appear in job requirements" />

            <div className="flex gap-2">
              <input
                id="pe-skillInput"
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(skillInput, skills, setSkills, setSkillInput) } }}
                placeholder="Type a skill and press Enter"
                className={`flex-1 ${inputCls}`}
                aria-label="Add a skill"
              />
              <button type="button" onClick={() => addTag(skillInput, skills, setSkills, setSkillInput)}
                className="px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition-all shrink-0">
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-brand-blue/8 text-brand-blue text-sm rounded-lg border border-brand-blue/15 font-medium">
                    {s}
                    <button type="button" onClick={() => removeTag(s, skills, setSkills)} aria-label={`Remove ${s}`}
                      className="w-4 h-4 rounded flex items-center justify-center hover:bg-brand-blue/20 transition-colors">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
              </div>
            )}

            <Divider />
            <SectionHeader title="Certifications" description="Professional certifications and licences" />

            <div className="flex gap-2">
              <input id="pe-certInput" type="text" value={certInput} onChange={e => setCertInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(certInput, certs, setCerts, setCertInput) } }}
                placeholder="e.g. NEBOSH, IOSH, PMP" className={`flex-1 ${inputCls}`} aria-label="Add a certification" />
              <button type="button" onClick={() => addTag(certInput, certs, setCerts, setCertInput)}
                className="px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition-all shrink-0">Add</button>
            </div>
            {certs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {certs.map(c => (
                  <span key={c} className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-gray-100 text-black/70 text-sm rounded-lg border border-black/5 font-medium">
                    {c}
                    <button type="button" onClick={() => removeTag(c, certs, setCerts)} aria-label={`Remove ${c}`}
                      className="w-4 h-4 rounded flex items-center justify-center hover:bg-black/10 transition-colors">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
              </div>
            )}

            <Divider />
            <SectionHeader title="Languages" description="Select all languages you can work in" />
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => (
                <button key={lang} type="button" onClick={() => toggle(lang, langs, setLangs)}
                  className={`px-4 py-2 rounded-lg text-sm border font-medium transition-all ${
                    langs.includes(lang)
                      ? 'bg-black text-white border-black'
                      : 'border-black/10 text-black/60 hover:border-black/30 hover:text-black'
                  }`}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── EXPERIENCE ── */}
        {tab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionHeader title="Work Experience" description="Add positions in reverse chronological order" />
              <button type="button" onClick={() => setWeForm(v => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition-all shrink-0 mb-5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Add position
              </button>
            </div>

            {weForm && (
              <div className="border border-brand-blue/20 bg-brand-blue/5 rounded-xl p-5 space-y-4">
                <p className="text-sm font-semibold text-black">New Position</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="we-title" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Job Title *</label>
                    <input id="we-title" type="text" value={weData.job_title} onChange={e => setWeData(p => ({ ...p, job_title: e.target.value }))} className={inputCls} required />
                  </div>
                  <div>
                    <label htmlFor="we-company" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Company *</label>
                    <input id="we-company" type="text" value={weData.company} onChange={e => setWeData(p => ({ ...p, company: e.target.value }))} className={inputCls} required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="we-location" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Location</label>
                    <input id="we-location" type="text" value={weData.location} onChange={e => setWeData(p => ({ ...p, location: e.target.value }))} className={inputCls} placeholder="e.g. Freetown" />
                  </div>
                  <div>
                    <label htmlFor="we-sector" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Sector</label>
                    <select id="we-sector" value={weData.sector} onChange={e => setWeData(p => ({ ...p, sector: e.target.value }))} className={inputCls}>
                      <option value="">Select</option>
                      {SECTORS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="we-start" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Start Date *</label>
                    <input id="we-start" type="date" value={weData.start_date} onChange={e => setWeData(p => ({ ...p, start_date: e.target.value }))} className={inputCls} required />
                  </div>
                  <div>
                    <label htmlFor="we-end" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">End Date</label>
                    <input id="we-end" type="date" value={weData.end_date} onChange={e => setWeData(p => ({ ...p, end_date: e.target.value }))} disabled={weData.is_current} className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed`} />
                  </div>
                </div>
                <label className="flex items-center gap-2.5 text-sm text-black/70 cursor-pointer">
                  <input type="checkbox" checked={weData.is_current} onChange={e => setWeData(p => ({ ...p, is_current: e.target.checked }))} className="w-4 h-4 accent-brand-blue rounded" />
                  I currently work here
                </label>
                <div>
                  <label htmlFor="we-desc" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Description</label>
                  <textarea id="we-desc" value={weData.description} onChange={e => setWeData(p => ({ ...p, description: e.target.value }))} rows={3} className={`${inputCls} resize-none`} placeholder="Key responsibilities and achievements..." />
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={submitWorkExp} disabled={isPending || !weData.job_title || !weData.company || !weData.start_date}
                    className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-all disabled:opacity-50">
                    {isPending ? 'Saving…' : 'Save position'}
                  </button>
                  <button type="button" onClick={() => setWeForm(false)} className="px-5 py-2 text-black/60 text-sm hover:text-black transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {workExp.length === 0 && !weForm ? (
              <div className="text-center py-12 border-2 border-dashed border-black/5 rounded-xl">
                <svg className="w-8 h-8 text-black/20 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-black/40">No work experience added yet.</p>
                <button type="button" onClick={() => setWeForm(true)} className="text-brand-blue text-sm hover:underline mt-1">Add your first position →</button>
              </div>
            ) : (
              <ul role="list" className="space-y-3">
                {workExp.map((we, i) => (
                  <li key={we.id} role="listitem"
                    className="flex items-start gap-4 p-5 rounded-xl border border-black/5 hover:border-black/10 bg-white transition-all group">
                    {/* Timeline dot */}
                    <div className="mt-1 flex flex-col items-center gap-1 shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full border-2 ${we.is_current ? 'bg-brand-blue border-brand-blue' : 'border-black/20 bg-white'}`} />
                      {i < workExp.length - 1 && <div className="w-px flex-1 bg-black/5 min-h-[32px]" aria-hidden="true" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-black">{we.job_title}</p>
                          <p className="text-sm text-black/60">{we.company}{we.location ? ` · ${we.location}` : ''}</p>
                        </div>
                        <button type="button" onClick={() => { start(() => deleteWorkExperience(we.id)) }}
                          aria-label={`Delete ${we.job_title}`}
                          className="shrink-0 p-1.5 rounded-lg text-black/20 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-black/40">
                          {new Date(we.start_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                          {' – '}
                          {we.is_current ? <span className="text-brand-blue font-medium">Present</span> : we.end_date ? new Date(we.end_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : ''}
                        </p>
                        {we.sector && <span className="px-2 py-0.5 bg-gray-50 text-black/40 text-xs rounded border border-black/5">{we.sector}</span>}
                      </div>
                      {we.description && <p className="text-xs text-black/50 mt-2 leading-relaxed">{we.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── EDUCATION ── */}
        {tab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionHeader title="Education" description="Degrees, diplomas, and academic qualifications" />
              <button type="button" onClick={() => setEduForm(v => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition-all shrink-0 mb-5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Add education
              </button>
            </div>

            {eduForm && (
              <div className="border border-brand-blue/20 bg-brand-blue/5 rounded-xl p-5 space-y-4">
                <p className="text-sm font-semibold text-black">New Education</p>
                <div>
                  <label htmlFor="edu-inst" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Institution *</label>
                  <input id="edu-inst" type="text" value={eduData.institution} onChange={e => setEduData(p => ({ ...p, institution: e.target.value }))} className={inputCls} placeholder="e.g. University of Sierra Leone" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edu-degree" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Degree / Award *</label>
                    <input id="edu-degree" type="text" value={eduData.degree} onChange={e => setEduData(p => ({ ...p, degree: e.target.value }))} className={inputCls} placeholder="e.g. BSc Engineering" required />
                  </div>
                  <div>
                    <label htmlFor="edu-field" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Field of Study</label>
                    <input id="edu-field" type="text" value={eduData.field_of_study} onChange={e => setEduData(p => ({ ...p, field_of_study: e.target.value }))} className={inputCls} placeholder="e.g. Civil Engineering" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edu-start" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Start Year</label>
                    <input id="edu-start" type="number" value={eduData.start_year} onChange={e => setEduData(p => ({ ...p, start_year: e.target.value }))} className={inputCls} placeholder="2018" min={1980} max={2030} />
                  </div>
                  <div>
                    <label htmlFor="edu-end" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">End Year</label>
                    <input id="edu-end" type="number" value={eduData.end_year} onChange={e => setEduData(p => ({ ...p, end_year: e.target.value }))} className={inputCls} placeholder="2022" min={1980} max={2030} />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={submitEducation} disabled={isPending || !eduData.institution || !eduData.degree}
                    className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-all disabled:opacity-50">
                    {isPending ? 'Saving…' : 'Save education'}
                  </button>
                  <button type="button" onClick={() => setEduForm(false)} className="px-5 py-2 text-black/60 text-sm hover:text-black transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {education.length === 0 && !eduForm ? (
              <div className="text-center py-12 border-2 border-dashed border-black/5 rounded-xl">
                <svg className="w-8 h-8 text-black/20 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <p className="text-sm text-black/40">No education added yet.</p>
                <button type="button" onClick={() => setEduForm(true)} className="text-brand-blue text-sm hover:underline mt-1">Add your first qualification →</button>
              </div>
            ) : (
              <ul role="list" className="space-y-3">
                {education.map(edu => (
                  <li key={edu.id} role="listitem"
                    className="flex items-start gap-4 p-5 rounded-xl border border-black/5 hover:border-black/10 bg-white transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 border border-black/5 flex items-center justify-center shrink-0 text-black/30">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-black">{edu.degree}{edu.field_of_study ? ` — ${edu.field_of_study}` : ''}</p>
                          <p className="text-sm text-black/60">{edu.institution}</p>
                          {(edu.start_year || edu.end_year) && (
                            <p className="text-xs text-black/40 mt-0.5">{edu.start_year ?? ''}{edu.start_year && edu.end_year ? ' – ' : ''}{edu.end_year ?? ''}</p>
                          )}
                        </div>
                        <button type="button" onClick={() => { start(() => deleteEducation(edu.id)) }}
                          aria-label={`Delete ${edu.degree}`}
                          className="shrink-0 p-1.5 rounded-lg text-black/20 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── PREFERENCES ── */}
        {tab === 'preferences' && (
          <div className="space-y-6">
            <SectionHeader title="Job Preferences" description="These power your match scores — keep them up to date" />

            <div>
              <p className="text-xs font-semibold text-black/50 uppercase tracking-wide mb-3">Preferred Sectors</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[...SECTORS, 'Open to any sector'].map(s => (
                  <button key={s} type="button" onClick={() => toggle(s, sectors, setSectors)}
                    className={`px-3 py-2.5 rounded-lg text-sm text-left border transition-all ${
                      sectors.includes(s)
                        ? 'bg-black text-white border-black font-medium'
                        : 'border-black/10 text-black/60 hover:border-black/30 hover:text-black'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pe-empType" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Employment Type</label>
                <select id="pe-empType" value={empType} onChange={e => setEmpType(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {EMPLOYMENT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="pe-prefLoc" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Preferred Location</label>
                <select id="pe-prefLoc" value={prefLoc} onChange={e => setPrefLoc(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="pe-avail" className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Availability</label>
              <select id="pe-avail" value={availability} onChange={e => setAvailability(e.target.value)} className={inputCls}>
                <option value="">Select</option>
                {AVAILABILITY_OPTIONS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <p className="text-xs font-semibold text-black/50 uppercase tracking-wide mb-3">Salary Expectations <span className="normal-case font-normal">(NLE / month)</span></p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pe-salMin" className="sr-only">Minimum salary</label>
                  <input id="pe-salMin" type="number" value={salMin} onChange={e => setSalMin(e.target.value)} placeholder="Minimum" min={0} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="pe-salMax" className="sr-only">Maximum salary</label>
                  <input id="pe-salMax" type="number" value={salMax} onChange={e => setSalMax(e.target.value)} placeholder="Maximum" min={0} className={inputCls} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Save bar ── */}
        {(tab === 'overview' || tab === 'preferences') && (
          <div className="mt-8 pt-6 border-t border-black/5 flex items-center gap-4">
            <button type="button" onClick={save} disabled={isPending}
              className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? 'Saving…' : 'Save changes'}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Saved
              </span>
            )}
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
