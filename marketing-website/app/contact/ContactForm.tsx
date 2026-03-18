'use client'
import { useState, useTransition } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { submitContactForm } from './actions'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [isPending, start]        = useTransition()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    company: '', service: '', message: '',
  })

  const set = (field: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.message) return
    setError(null)
    start(async () => {
      try {
        await submitContactForm(form)
        setSubmitted(true)
      } catch {
        setError('Something went wrong. Please try again or email us directly.')
      }
    })
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <CheckCircle size={28} weight="fill" className="text-green-500" />
        </div>
        <h2 className="font-display text-2xl font-bold text-black mb-3">Message sent</h2>
        <p className="text-black/55 leading-relaxed max-w-sm">
          Thanks for reaching out. We'll get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">First Name *</label>
          <input
            type="text" id="firstName" value={form.firstName}
            onChange={e => set('firstName', e.target.value)} required
            className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">Last Name</label>
          <input
            type="text" id="lastName" value={form.lastName}
            onChange={e => set('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email Address *</label>
        <input
          type="email" id="email" value={form.email}
          onChange={e => set('email', e.target.value)} required
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
          placeholder="john@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-black mb-2">Company Name</label>
        <input
          type="text" id="company" value={form.company}
          onChange={e => set('company', e.target.value)}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
          placeholder="Your Company"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-black mb-2">What are you looking for?</label>
        <select
          id="service" value={form.service}
          onChange={e => set('service', e.target.value)}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white text-sm text-black/70 appearance-none"
        >
          <option value="">Select a service...</option>
          <option>Permanent Recruitment</option>
          <option>Temporary / Contract Staffing</option>
          <option>Executive Search</option>
          <option>HR Consulting</option>
          <option>HR Outsourcing</option>
          <option>Management Consulting</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-black mb-2">Message *</label>
        <textarea
          id="message" rows={5} value={form.message}
          onChange={e => set('message', e.target.value)} required
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none text-sm"
          placeholder="Tell us about your needs..."
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 disabled:opacity-50"
      >
        {isPending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
