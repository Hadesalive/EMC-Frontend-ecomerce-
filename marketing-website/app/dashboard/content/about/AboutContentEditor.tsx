'use client'

import { useState, useTransition } from 'react'
import { saveAboutIntro, saveAboutPurpose } from './actions'
import type { AboutIntroContent, AboutPurposeContent } from '@/lib/cms-types'

const cx = {
  input: 'w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm text-black bg-white placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition',
  textarea: 'w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm text-black bg-white placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition resize-none',
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

function SaveBar({ isPending, dirty, saved }: { isPending: boolean; dirty: boolean; saved: boolean }) {
  if (!dirty && !saved && !isPending) return null
  return (
    <div className="sticky bottom-0 -mx-6 -mb-6 mt-6 px-6 py-4 bg-white/90 backdrop-blur border-t border-black/5 flex items-center justify-between">
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
  )
}

type Tab = 'intro' | 'purpose'

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'intro',   label: 'Who We Are',              desc: 'The three paragraphs describing the company, plus the sidebar photo' },
  { id: 'purpose', label: 'Purpose / Vision / Mission', desc: 'The three panels shown on the dark background section' },
]

// ─── Intro panel ──────────────────────────────────────────────────────────────

function IntroPanel({ initial }: { initial: AboutIntroContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof AboutIntroContent, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveAboutIntro(data)
      setSaved(true)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
      <Field label="Paragraph 1">
        <textarea rows={4} className={cx.textarea} value={data.paragraph_1} onChange={e => set('paragraph_1', e.target.value)} />
      </Field>
      <Field label="Paragraph 2">
        <textarea rows={4} className={cx.textarea} value={data.paragraph_2} onChange={e => set('paragraph_2', e.target.value)} />
      </Field>
      <Field label="Paragraph 3">
        <textarea rows={4} className={cx.textarea} value={data.paragraph_3} onChange={e => set('paragraph_3', e.target.value)} />
      </Field>

      <div className="pt-2 border-t border-black/5 space-y-4">
        <p className="text-xs font-semibold text-black/40 uppercase tracking-widest">Sidebar image</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Field label="Image URL">
              <input type="text" className={cx.input} value={data.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." />
            </Field>
          </div>
          <Field label="Alt text" hint="Screen readers">
            <input type="text" className={cx.input} value={data.image_alt} onChange={e => set('image_alt', e.target.value)} />
          </Field>
        </div>
        {data.image_url && (
          <div className="rounded-xl overflow-hidden border border-black/5 aspect-[4/3] max-w-xs">
            <img src={data.image_url} alt={data.image_alt} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Purpose panel ────────────────────────────────────────────────────────────

const PVM_PANELS = [
  { key: 'purpose' as const, label: '01 — Purpose', color: 'border-black/8 bg-black/[0.015]',      accent: 'text-black/40' },
  { key: 'vision'  as const, label: '02 — Vision',  color: 'border-brand-blue/15 bg-brand-blue/[0.02]', accent: 'text-brand-blue/60' },
  { key: 'mission' as const, label: '03 — Mission', color: 'border-brand-orange/15 bg-brand-orange/[0.02]', accent: 'text-brand-orange/60' },
]

function PurposePanel({ initial }: { initial: AboutPurposeContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof AboutPurposeContent, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveAboutPurpose(data)
      setSaved(true)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
      {PVM_PANELS.map(({ key, label, color, accent }) => (
        <div key={key} className={`border rounded-xl p-5 space-y-4 ${color}`}>
          <p className={`text-xs font-bold uppercase tracking-widest ${accent}`}>{label}</p>
          <Field label="Heading">
            <input
              type="text"
              className={cx.input}
              value={data[`${key}_heading` as keyof AboutPurposeContent]}
              onChange={e => set(`${key}_heading` as keyof AboutPurposeContent, e.target.value)}
            />
          </Field>
          <Field label="Body text">
            <textarea
              rows={4}
              className={cx.textarea}
              value={data[`${key}_body` as keyof AboutPurposeContent]}
              onChange={e => set(`${key}_body` as keyof AboutPurposeContent, e.target.value)}
            />
          </Field>
        </div>
      ))}
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Main tabbed editor ───────────────────────────────────────────────────────

export function AboutContentEditor({
  intro,
  purpose,
}: {
  intro: AboutIntroContent
  purpose: AboutPurposeContent
}) {
  const [active, setActive] = useState<Tab>('intro')

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="border-b border-black/5 px-6 pt-5">
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all -mb-px border-b-2 ${
                active === tab.id
                  ? 'text-black border-black bg-black/[0.02]'
                  : 'text-black/40 border-transparent hover:text-black/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-3 bg-black/[0.015] border-b border-black/5">
        <p className="text-xs text-black/40">
          {TABS.find(t => t.id === active)?.desc}
        </p>
      </div>

      <div className="pt-6">
        {active === 'intro'   && <IntroPanel   initial={intro} />}
        {active === 'purpose' && <PurposePanel initial={purpose} />}
      </div>
    </div>
  )
}
