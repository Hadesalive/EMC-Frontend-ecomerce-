'use client'

import { useState, useTransition } from 'react'
import { saveContactInfo } from './actions'
import type { ContactContent } from '@/lib/cms-types'
import { MapPinIcon, EnvelopeIcon, PhoneIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const cx = {
  input: 'w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm text-black bg-white placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition',
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="block text-sm font-medium text-black/70">{label}</label>
        {hint && <span className="text-xs text-black/30">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function Group({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-black/40" />
      </div>
      <div className="flex-1 space-y-3">
        <p className="text-xs font-semibold text-black/40 uppercase tracking-widest pt-2">{label}</p>
        {children}
      </div>
    </div>
  )
}

export function ContactContentEditor({ initial }: { initial: ContactContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof ContactContent, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveContactInfo(data)
      setSaved(true)
    })
  }

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-clip">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 bg-black/[0.015]">
          <p className="text-xs text-black/40">
            These details appear in the sidebar on the Contact page and in the footer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Address */}
          <Group icon={MapPinIcon} label="Office address">
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Street">
                <input type="text" className={cx.input} value={data.address_line1} onChange={e => set('address_line1', e.target.value)} placeholder="10 Waterside Road" />
              </Field>
              <Field label="Area / City">
                <input type="text" className={cx.input} value={data.address_line2} onChange={e => set('address_line2', e.target.value)} placeholder="Wilberforce, Freetown" />
              </Field>
              <Field label="Country">
                <input type="text" className={cx.input} value={data.address_line3} onChange={e => set('address_line3', e.target.value)} placeholder="Sierra Leone" />
              </Field>
            </div>
          </Group>

          <div className="border-t border-black/5" />

          {/* Contact details */}
          <Group icon={EnvelopeIcon} label="Contact details">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Email address">
                <input type="email" className={cx.input} value={data.email} onChange={e => set('email', e.target.value)} />
              </Field>
              <Field label="Phone number">
                <input type="text" className={cx.input} value={data.phone} onChange={e => set('phone', e.target.value)} />
              </Field>
            </div>
          </Group>

          <div className="border-t border-black/5" />

          {/* Hours */}
          <Group icon={ClockIcon} label="Office hours">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Weekdays">
                <input type="text" className={cx.input} value={data.hours_weekday} onChange={e => set('hours_weekday', e.target.value)} placeholder="Mon – Fri: 8:30am – 5:00pm" />
              </Field>
              <Field label="Weekends / other">
                <input type="text" className={cx.input} value={data.hours_weekend} onChange={e => set('hours_weekend', e.target.value)} placeholder="Saturday by appointment" />
              </Field>
            </div>
          </Group>

          <div className="border-t border-black/5" />

          {/* Social */}
          <Group icon={GlobeAltIcon} label="Social media">
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="LinkedIn">
                <input type="text" className={cx.input} value={data.social_linkedin} onChange={e => set('social_linkedin', e.target.value)} placeholder="https://linkedin.com/..." />
              </Field>
              <Field label="Facebook">
                <input type="text" className={cx.input} value={data.social_facebook} onChange={e => set('social_facebook', e.target.value)} placeholder="https://facebook.com/..." />
              </Field>
              <Field label="Instagram">
                <input type="text" className={cx.input} value={data.social_instagram} onChange={e => set('social_instagram', e.target.value)} placeholder="https://instagram.com/..." />
              </Field>
            </div>
          </Group>

          {/* Save bar */}
          {(dirty || saved || isPending) && (
            <div className="sticky bottom-0 -mx-6 -mb-6 px-6 py-4 bg-white/90 backdrop-blur border-t border-black/5 flex items-center justify-between">
              <span className="text-sm text-black/40">
                {saved ? '✓ Saved' : isPending ? 'Saving…' : 'You have unsaved changes'}
              </span>
              <button
                type="submit"
                disabled={isPending || !dirty}
                className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 disabled:opacity-40 transition-all"
              >
                {isPending ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          )}
        </form>
      </div>
  )
}
