'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile, markProfileComplete } from '../actions'
import { SECTORS } from '@/lib/matching'

const STEPS = ['Personal Info', 'Professional Background', 'Skills & Languages', 'Preferences']

const EXPERIENCE_OPTIONS = [
  'Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years',
]
const QUALIFICATIONS = [
  'No formal qualification', 'Secondary School (BECE/WASSCE)', 'Vocational/Technical Certificate',
  'Higher National Diploma (HND)', "Bachelor's Degree", "Master's Degree", 'PhD / Doctorate',
  'Professional Certification',
]
const EMPLOYMENT_TYPES = ['Permanent', 'Contract', 'Temporary', 'Open to any']
const AVAILABILITY_OPTIONS = ['Immediately', 'Within 2 weeks', 'Within 1 month', '1–3 months', 'Currently employed — open to offers']
const LANGUAGES = ['English', 'Krio', 'Temne', 'Mende', 'Limba', 'French', 'Arabic', 'Other']
const LOCATIONS = [
  'Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu', 'Bonthe', 'Port Loko', 'Nationwide', 'Open to relocation',
]

export default function ProfileSetupPage() {
  const router = useRouter()
  const [step, setStep]     = useState(0)
  const [isPending, start]  = useTransition()
  const [error, setError]   = useState<string | null>(null)

  // Step 1 — Personal Info
  const [location, setLocation]       = useState('')
  const [dob, setDob]                 = useState('')
  const [nationality, setNationality] = useState('')
  const [linkedin, setLinkedin]       = useState('')
  const [headline, setHeadline]       = useState('')

  // Step 2 — Professional Background
  const [currentRole, setCurrentRole]         = useState('')
  const [yearsExp, setYearsExp]               = useState('')
  const [qualification, setQualification]     = useState('')
  const [summary, setSummary]                 = useState('')

  // Step 3 — Skills & Languages
  const [skillInput, setSkillInput]         = useState('')
  const [skills, setSkills]                 = useState<string[]>([])
  const [certInput, setCertInput]           = useState('')
  const [certifications, setCertifications] = useState<string[]>([])
  const [selectedLangs, setSelectedLangs]   = useState<string[]>(['English'])

  // Step 4 — Preferences
  const [selectedSectors, setSelectedSectors]   = useState<string[]>([])
  const [empType, setEmpType]                   = useState('')
  const [prefLocation, setPrefLocation]         = useState('')
  const [availability, setAvailability]         = useState('')
  const [salaryMin, setSalaryMin]               = useState('')
  const [salaryMax, setSalaryMax]               = useState('')

  function addTag(value: string, list: string[], setList: (v: string[]) => void, setInput: (v: string) => void) {
    const trimmed = value.trim()
    if (trimmed && !list.includes(trimmed)) setList([...list, trimmed])
    setInput('')
  }
  function removeTag(tag: string, list: string[], setList: (v: string[]) => void) {
    setList(list.filter(t => t !== tag))
  }
  function toggleItem(item: string, list: string[], setList: (v: string[]) => void) {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item])
  }

  async function saveAndAdvance() {
    setError(null)
    start(async () => {
      try {
        if (step === 0) {
          await updateProfile({ location, date_of_birth: dob || null, nationality, linkedin_url: linkedin, headline })
        } else if (step === 1) {
          await updateProfile({ current_role: currentRole, years_experience: yearsExp, qualification, summary })
        } else if (step === 2) {
          await updateProfile({ skills, certifications, languages: selectedLangs })
        } else if (step === 3) {
          await updateProfile({
            preferred_sectors: selectedSectors,
            employment_type: empType,
            preferred_location: prefLocation,
            availability,
            salary_min: salaryMin ? parseInt(salaryMin) : null,
            salary_max: salaryMax ? parseInt(salaryMax) : null,
          })
          await markProfileComplete()
          router.push('/candidate/dashboard')
          return
        }
        setStep(s => s + 1)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-black">Complete your profile</h1>
        <p className="text-black/50 text-sm mt-1">
          A complete profile helps us match you with the right opportunities.
        </p>
      </div>

      {/* Step indicator */}
      <ol role="list" className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <li key={i} role="listitem" className="flex items-center gap-2">
            <div
              aria-current={i === step ? 'step' : undefined}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step
                  ? 'bg-green-500 text-white'
                  : i === step
                  ? 'bg-brand-blue text-white'
                  : 'bg-black/10 text-black/40'
              }`}
            >
              {i < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-black' : 'text-black/40'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-black/10 mx-1 hidden sm:block" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="bg-white rounded-2xl border border-black/5 p-6 lg:p-8">
        {/* ── Step 0: Personal Info ── */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-black text-lg">Personal Information</h2>
            <div>
              <label htmlFor="headline" className="block text-sm font-medium text-black mb-2">Professional Headline</label>
              <input
                id="headline"
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                placeholder="e.g. Civil Engineer with 5 years' mining experience"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-black mb-2">Location</label>
              <select
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white transition-all"
              >
                <option value="">Select location</option>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-black mb-2">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
                />
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-black mb-2">Nationality</label>
                <input
                  id="nationality"
                  type="text"
                  value={nationality}
                  onChange={e => setNationality(e.target.value)}
                  placeholder="e.g. Sierra Leonean"
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-black mb-2">LinkedIn URL <span className="text-black/40 font-normal">(optional)</span></label>
              <input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
              />
            </div>
          </div>
        )}

        {/* ── Step 1: Professional Background ── */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-black text-lg">Professional Background</h2>
            <div>
              <label htmlFor="currentRole" className="block text-sm font-medium text-black mb-2">Current / Most Recent Role</label>
              <input
                id="currentRole"
                type="text"
                value={currentRole}
                onChange={e => setCurrentRole(e.target.value)}
                placeholder="e.g. Site Safety Officer"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
              />
            </div>
            <div>
              <label htmlFor="yearsExp" className="block text-sm font-medium text-black mb-2">Years of Experience</label>
              <select
                id="yearsExp"
                value={yearsExp}
                onChange={e => setYearsExp(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white transition-all"
              >
                <option value="">Select experience level</option>
                {EXPERIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-black mb-2">Highest Qualification</label>
              <select
                id="qualification"
                value={qualification}
                onChange={e => setQualification(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white transition-all"
              >
                <option value="">Select qualification</option>
                {QUALIFICATIONS.map(q => <option key={q}>{q}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-black mb-2">Professional Summary</label>
              <textarea
                id="summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                rows={4}
                placeholder="Briefly describe your background, key strengths, and what you're looking for..."
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm resize-none transition-all"
              />
              <p className="text-xs text-black/40 mt-1">{summary.length} / 500 characters</p>
            </div>
          </div>
        )}

        {/* ── Step 2: Skills & Languages ── */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-semibold text-black text-lg">Skills &amp; Languages</h2>

            {/* Skills */}
            <div>
              <label htmlFor="skillInput" className="block text-sm font-medium text-black mb-2">Skills</label>
              <div className="flex gap-2">
                <input
                  id="skillInput"
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(skillInput, skills, setSkills, setSkillInput) } }}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => addTag(skillInput, skills, setSkills, setSkillInput)}
                  className="px-4 py-3 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-all"
                >
                  Add
                </button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm rounded-full">
                      {s}
                      <button
                        type="button"
                        onClick={() => removeTag(s, skills, setSkills)}
                        aria-label={`Remove ${s}`}
                        className="hover:text-brand-blue/60"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div>
              <label htmlFor="certInput" className="block text-sm font-medium text-black mb-2">Certifications <span className="text-black/40 font-normal">(optional)</span></label>
              <div className="flex gap-2">
                <input
                  id="certInput"
                  type="text"
                  value={certInput}
                  onChange={e => setCertInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(certInput, certifications, setCertifications, setCertInput) } }}
                  placeholder="e.g. NEBOSH, IOSH, PMP"
                  className="flex-1 px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => addTag(certInput, certifications, setCertifications, setCertInput)}
                  className="px-4 py-3 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-all"
                >
                  Add
                </button>
              </div>
              {certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {certifications.map(c => (
                    <span key={c} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-black/70 text-sm rounded-full">
                      {c}
                      <button
                        type="button"
                        onClick={() => removeTag(c, certifications, setCertifications)}
                        aria-label={`Remove ${c}`}
                        className="hover:text-black/40"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Languages */}
            <div>
              <p className="block text-sm font-medium text-black mb-3">Languages Spoken</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleItem(lang, selectedLangs, setSelectedLangs)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      selectedLangs.includes(lang)
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'border-black/15 text-black/60 hover:border-brand-blue hover:text-brand-blue'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Preferences ── */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-semibold text-black text-lg">Job Preferences</h2>

            {/* Sectors */}
            <div>
              <p className="block text-sm font-medium text-black mb-3">Preferred Sectors <span className="text-black/40 font-normal">(select all that apply)</span></p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[...SECTORS, 'Open to any sector'].map(sector => (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => toggleItem(sector, selectedSectors, setSelectedSectors)}
                    className={`px-3 py-2 rounded-lg text-sm text-left border transition-all ${
                      selectedSectors.includes(sector)
                        ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30 font-medium'
                        : 'border-black/10 text-black/60 hover:border-brand-blue/30 hover:text-brand-blue'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Employment type */}
            <div>
              <label htmlFor="empType" className="block text-sm font-medium text-black mb-2">Preferred Employment Type</label>
              <select
                id="empType"
                value={empType}
                onChange={e => setEmpType(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white transition-all"
              >
                <option value="">Select type</option>
                {EMPLOYMENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Preferred location */}
            <div>
              <label htmlFor="prefLocation" className="block text-sm font-medium text-black mb-2">Preferred Work Location</label>
              <select
                id="prefLocation"
                value={prefLocation}
                onChange={e => setPrefLocation(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white transition-all"
              >
                <option value="">Select location</option>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-black mb-2">Availability</label>
              <select
                id="availability"
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white transition-all"
              >
                <option value="">Select availability</option>
                {AVAILABILITY_OPTIONS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>

            {/* Salary expectations */}
            <div>
              <p className="block text-sm font-medium text-black mb-2">Salary Expectations <span className="text-black/40 font-normal">(NLE / month, optional)</span></p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="salaryMin" className="sr-only">Minimum salary</label>
                  <input
                    id="salaryMin"
                    type="number"
                    value={salaryMin}
                    onChange={e => setSalaryMin(e.target.value)}
                    placeholder="Minimum"
                    min={0}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="salaryMax" className="sr-only">Maximum salary</label>
                  <input
                    id="salaryMax"
                    type="number"
                    value={salaryMax}
                    onChange={e => setSalaryMax(e.target.value)}
                    placeholder="Maximum"
                    min={0}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              disabled={isPending}
              className="px-5 py-2.5 border border-black/15 text-black text-sm font-medium rounded-lg hover:bg-black/5 transition-all disabled:opacity-50"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={saveAndAdvance}
            disabled={isPending}
            className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? 'Saving…'
              : step === STEPS.length - 1
              ? 'Complete Profile'
              : 'Save & Continue'}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-black/40 mt-4">
        You can update these details any time from your profile page.
      </p>
    </div>
  )
}
