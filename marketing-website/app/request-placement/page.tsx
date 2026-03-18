'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { CheckCircle } from '@phosphor-icons/react'
import { submitPlacementRequest } from './actions'

const SECTORS = [
  'Construction', 'Healthcare', 'Mining & Natural Resources', 'Hospitality',
  'Logistics & Transport', 'Agriculture & Fisheries', 'IT & Telecommunications',
  'Government & Public Sector', 'Retail & FMCG', 'Manufacturing', 'Security', 'Other',
]

type Form = {
  company_name: string; sector: string; contact_name: string; contact_title: string
  email: string; phone: string; role_title: string; num_positions: string
  employment_type: string; start_date: string; location: string
  salary_range: string; description: string
}

const empty: Form = {
  company_name: '', sector: '', contact_name: '', contact_title: '',
  email: '', phone: '', role_title: '', num_positions: '1',
  employment_type: '', start_date: '', location: '', salary_range: '', description: '',
}

export default function RequestPlacementPage() {
  const [form, setForm]       = useState<Form>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [isPending, start]    = useTransition()

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm(p => ({ ...p, [k]: v }))

  const canSubmit = !!(
    form.company_name && form.sector && form.contact_name &&
    form.email && form.phone && form.role_title && form.employment_type && form.description
  )

  function handleSubmit() {
    if (!canSubmit) return
    setError(null)
    start(async () => {
      try {
        await submitPlacementRequest({
          ...form,
          num_positions: parseInt(form.num_positions) || 1,
        })
        setSubmitted(true)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      }
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-black/5 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} weight="fill" className="text-green-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-black mb-3">Request Received</h2>
          <p className="text-black/60 leading-relaxed mb-6">
            Thank you, {form.contact_name}. A member of our team will contact you within one business day to discuss your requirements.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/" className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all no-underline">
              Back to Home
            </Link>
            <Link href="/solutions" className="px-6 py-3 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-all no-underline">
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black pt-20">
        <div className="container py-12">
          <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-3">For Employers</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Request a Placement</h1>
          <p className="text-white/60 max-w-xl">Tell us who you are looking for. We will handle the search, screening, and shortlisting.</p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-black/5 p-8">
              <h2 className="font-display text-lg font-bold text-black mb-6">Company &amp; Contact Details</h2>
              <div className="space-y-5 mb-8">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Company Name *</label>
                    <input type="text" value={form.company_name} onChange={e => set('company_name', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="Your Company Ltd" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Industry / Sector *</label>
                    <select value={form.sector} onChange={e => set('sector', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm bg-white text-black/70">
                      <option value="">Select sector...</option>
                      {SECTORS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Contact Person *</label>
                    <input type="text" value={form.contact_name} onChange={e => set('contact_name', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Job Title</label>
                    <input type="text" value={form.contact_title} onChange={e => set('contact_title', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="e.g. HR Director" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="contact@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="+232 76 000 000" />
                  </div>
                </div>
              </div>

              <div className="border-t border-black/5 pt-8 mb-8">
                <h2 className="font-display text-lg font-bold text-black mb-6">Role Requirements</h2>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Role / Job Title *</label>
                      <input type="text" value={form.role_title} onChange={e => set('role_title', e.target.value)}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="e.g. Site Engineer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Number of Positions *</label>
                      <input type="number" min="1" value={form.num_positions} onChange={e => set('num_positions', e.target.value)}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Employment Type *</label>
                      <select value={form.employment_type} onChange={e => set('employment_type', e.target.value)}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm bg-white text-black/70">
                        <option value="">Select type...</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Temporary</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Preferred Start Date</label>
                      <input type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm text-black/70" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Location</label>
                    <input type="text" value={form.location} onChange={e => set('location', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="Where will this role be based?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Salary Range / Budget</label>
                    <input type="text" value={form.salary_range} onChange={e => set('salary_range', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm" placeholder="e.g. NLe 5,000 – 8,000 / month" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Role Description &amp; Requirements *</label>
                    <textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none text-sm"
                      placeholder="Describe the role, required qualifications, experience, and any specific skills..." />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isPending}
                className="w-full px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-black rounded-2xl p-6">
              <h3 className="font-display text-base font-bold text-white mb-4">What happens next?</h3>
              <div className="space-y-4">
                {[
                  { step: '01', text: 'We review your request within 24 hours' },
                  { step: '02', text: 'A consultant contacts you to clarify requirements' },
                  { step: '03', text: 'We begin sourcing and screening candidates' },
                  { step: '04', text: 'You receive a curated shortlist within 5–10 days' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-brand-orange flex-shrink-0 mt-0.5">{s.step}</span>
                    <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h3 className="font-display text-base font-bold text-black mb-2">Need to talk first?</h3>
              <p className="text-black/60 text-sm mb-4">Prefer to discuss your requirements before submitting? We are happy to speak with you directly.</p>
              <Link href="/contact" className="block text-center px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-all no-underline">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
