'use client'
import { Suspense, useState, useRef, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { uploadCvToCloudinary } from '@/lib/cloudinary'
import { submitApplication } from './actions'

const steps = ['Personal Info', 'Experience', 'Preferences']

interface FormData {
  firstName: string; lastName: string; email: string; phone: string
  location: string; linkedin: string
  yearsExperience: string; qualification: string; currentRole: string
  cvFile: File | null; summary: string
  preferredSector: string; employmentType: string; preferredLocation: string
  notes: string; consent: boolean
}

const empty: FormData = {
  firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '',
  yearsExperience: '', qualification: '', currentRole: '', cvFile: null, summary: '',
  preferredSector: '', employmentType: 'Open to any', preferredLocation: '', notes: '', consent: false,
}

function ApplyForm() {
  const searchParams = useSearchParams()
  const jobId    = searchParams.get('job')   ?? ''
  const jobTitle = searchParams.get('title') ?? ''

  const [step, setStep]         = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm]         = useState<FormData>(empty)
  const [cvUrl, setCvUrl]       = useState<string | null>(null)
  const [cvUploading, setCvUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const set = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const canAdvance = () => {
    if (step === 0) return !!(form.firstName && form.lastName && form.email && form.phone)
    if (step === 1) return !!(form.yearsExperience && form.qualification)
    if (step === 2) return !!(form.preferredSector && form.consent)
    return true
  }

  async function handleCvPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    set('cvFile', file)
    setCvUploading(true)
    try {
      const url = await uploadCvToCloudinary(file)
      setCvUrl(url)
    } catch {
      alert('CV upload failed — please try again.')
      set('cvFile', null)
    } finally {
      setCvUploading(false)
    }
  }

  const handleSubmit = () => {
    if (!canAdvance() || isPending) return
    startTransition(async () => {
      await submitApplication({
        firstName:         form.firstName,
        lastName:          form.lastName,
        email:             form.email,
        phone:             form.phone,
        location:          form.location,
        linkedin:          form.linkedin,
        yearsExperience:   form.yearsExperience,
        qualification:     form.qualification,
        currentRole:       form.currentRole,
        summary:           form.summary,
        cvUrl:             cvUrl,
        preferredSector:   form.preferredSector,
        employmentType:    form.employmentType,
        preferredLocation: form.preferredLocation,
        notes:             form.notes,
        jobId:             jobId || null,
      })
      setSubmitted(true)
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-black/5 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-black mb-3">Application Submitted</h2>
          <p className="text-black/60 leading-relaxed mb-6">
            Thank you{form.firstName ? `, ${form.firstName}` : ''}. Our team will review your application and be in touch within 2–3 business days.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/jobs" className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all no-underline">
              Browse More Jobs
            </Link>
            <Link href="/" className="px-6 py-3 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-all no-underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black pt-20">
        <div className="container py-12">
          <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-3">Job Application</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            {jobTitle ? `Apply — ${jobTitle}` : 'Apply for a Position'}
          </h1>
          <p className="text-white/60">Fill in your details and we will get back to you within 2–3 business days.</p>
        </div>
      </div>

      <div className="container py-10 max-w-2xl">
        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  i < step ? 'bg-green-500 text-white' : i === step ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? <CheckCircleIcon className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-black' : 'text-black/40'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < step ? 'bg-green-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-8">

          {/* Step 0 — Personal Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-black mb-6">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">First Name *</label>
                  <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Last Name *</label>
                  <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Email Address *</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="john@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Phone Number *</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="+232 76 000 000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Current Location</label>
                <input type="text" value={form.location} onChange={e => set('location', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="Freetown, Sierra Leone" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">LinkedIn Profile</label>
                <input type="url" value={form.linkedin} onChange={e => set('linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          )}

          {/* Step 1 — Experience & CV */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-black mb-6">Experience & CV</h2>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Years of Experience *</label>
                <select value={form.yearsExperience} onChange={e => set('yearsExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                  <option value="">Select...</option>
                  <option>Less than 1 year</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Highest Qualification *</label>
                <select value={form.qualification} onChange={e => set('qualification', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                  <option value="">Select...</option>
                  <option>WASSCE / O-Level</option>
                  <option>A-Level / Higher Secondary</option>
                  <option>Diploma / HND</option>
                  <option>Bachelor Degree</option>
                  <option>Master Degree</option>
                  <option>PhD / Doctorate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Current or Most Recent Role</label>
                <input type="text" value={form.currentRole} onChange={e => set('currentRole', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" placeholder="e.g. Site Engineer at Rokel Construction" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Upload CV</label>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleCvPick} className="hidden" />
                {form.cvFile ? (
                  <div className="flex items-center gap-3 px-4 py-3.5 border border-brand-blue/20 bg-brand-blue/5 rounded-xl">
                    <PaperClipIcon className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span className="text-sm text-black/70 font-medium flex-1 truncate">{form.cvFile.name}</span>
                    {cvUploading
                      ? <span className="text-xs text-black/40 flex-shrink-0">Uploading…</span>
                      : <span className="text-xs text-green-600 flex-shrink-0">Uploaded ✓</span>
                    }
                    <button type="button" onClick={() => { set('cvFile', null); setCvUrl(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                      className="p-1 rounded hover:bg-black/10 transition-colors flex-shrink-0">
                      <XMarkIcon className="w-3.5 h-3.5 text-black/40" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-black/10 rounded-xl p-8 text-center hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-all cursor-pointer">
                    <p className="text-sm text-black/50 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-black/30">PDF or Word document, max 5MB</p>
                    <button type="button" className="mt-4 px-5 py-2 border border-black/10 rounded-lg text-sm text-black/60 hover:bg-gray-50 transition-colors">
                      Choose File
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Brief Professional Summary</label>
                <textarea rows={4} value={form.summary} onChange={e => set('summary', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm resize-none" placeholder="Briefly describe your background and key skills..." />
              </div>
            </div>
          )}

          {/* Step 2 — Preferences */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-black mb-6">Preferences & Submit</h2>
              {jobTitle && (
                <div className="flex items-center gap-2 px-4 py-3 bg-brand-blue/5 border border-brand-blue/10 rounded-xl text-sm">
                  <span className="text-brand-blue font-medium">Applying for:</span>
                  <span className="text-black/70">{jobTitle}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Preferred Sector *</label>
                <select value={form.preferredSector} onChange={e => set('preferredSector', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                  <option value="">Select sector...</option>
                  <option>Construction</option>
                  <option>Healthcare</option>
                  <option>Mining & Natural Resources</option>
                  <option>Hospitality</option>
                  <option>Logistics & Transport</option>
                  <option>Agriculture & Fisheries</option>
                  <option>IT & Telecommunications</option>
                  <option>Government & Public Sector</option>
                  <option>Retail & FMCG</option>
                  <option>Manufacturing</option>
                  <option>Open to any sector</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Employment Type Preference</label>
                <select value={form.employmentType} onChange={e => set('employmentType', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                  <option>Permanent only</option>
                  <option>Contract / Temporary</option>
                  <option>Open to any</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Preferred Location</label>
                <input type="text" value={form.preferredLocation} onChange={e => set('preferredLocation', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" placeholder="e.g. Freetown or anywhere in SL" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Additional Notes</label>
                <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm resize-none" placeholder="Anything else you want us to know..." />
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" id="consent" checked={form.consent} onChange={e => set('consent', e.target.checked)} className="mt-0.5 accent-brand-blue" />
                <label htmlFor="consent" className="text-sm text-black/60 leading-relaxed cursor-pointer">
                  I consent to EMC storing and processing my data for recruitment purposes in line with their privacy policy.
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-black/5">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              className={`px-6 py-3 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-all ${step === 0 ? 'invisible' : ''}`}>
              Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => { if (canAdvance()) setStep(s => s + 1) }} disabled={!canAdvance()}
                className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Continue
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!canAdvance() || isPending || cvUploading}
                className="px-8 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {isPending ? 'Submitting…' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-black/30 text-sm">Loading…</div>
      </div>
    }>
      <ApplyForm />
    </Suspense>
  )
}
