'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { saveHero, saveFeatures, saveCTA } from './actions'
import type { HeroContent, FeaturesContent, CTAContent, Advantage } from '@/lib/cms-types'

// ─── Shared primitives ────────────────────────────────────────────────────────

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

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-black/40 uppercase tracking-widest pt-1">{children}</p>
  )
}

function ButtonPair({
  labelValue, labelOnChange, hrefValue, hrefOnChange,
  primary,
}: {
  labelValue: string; labelOnChange: (v: string) => void
  hrefValue: string; hrefOnChange: (v: string) => void
  primary?: boolean
}) {
  return (
    <div className={`flex rounded-xl overflow-hidden border ${primary ? 'border-brand-blue/20' : 'border-black/10'}`}>
      <input
        type="text"
        value={labelValue}
        onChange={e => labelOnChange(e.target.value)}
        placeholder="Button label"
        className={`flex-1 px-3.5 py-2.5 text-sm text-black bg-white border-r border-black/10 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-brand-blue/20 ${primary ? 'font-medium' : ''}`}
      />
      <div className="flex items-center px-2 bg-black/[0.02] text-black/25 select-none text-xs">→</div>
      <input
        type="text"
        value={hrefValue}
        onChange={e => hrefOnChange(e.target.value)}
        placeholder="/path"
        className="w-28 px-3 py-2.5 text-sm text-black/60 font-mono bg-white focus:outline-none focus:ring-inset focus:ring-2 focus:ring-brand-blue/20"
      />
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

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = 'hero' | 'features' | 'cta'

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'hero',     label: 'Hero',     desc: 'Headline area and call-to-action buttons' },
  { id: 'features', label: 'Features', desc: '"Why EMC" section with the 4 advantage cards' },
  { id: 'cta',      label: 'CTA',      desc: 'Bottom banner that prompts visitors to get in touch' },
]

// ─── Hero panel ───────────────────────────────────────────────────────────────

function HeroPanel({ initial }: { initial: HeroContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof HeroContent, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveHero(data)
      setSaved(true)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
      <Field label="Subheadline" hint="Shown below the main heading">
        <textarea rows={3} className={cx.textarea} value={data.subheadline} onChange={e => set('subheadline', e.target.value)} />
      </Field>

      <div className="space-y-3">
        <GroupLabel>Buttons</GroupLabel>
        <Field label="Primary button">
          <ButtonPair
            primary
            labelValue={data.cta_primary} labelOnChange={v => set('cta_primary', v)}
            hrefValue={data.cta_primary_href} hrefOnChange={v => set('cta_primary_href', v)}
          />
        </Field>
        <Field label="Secondary button">
          <ButtonPair
            labelValue={data.cta_secondary} labelOnChange={v => set('cta_secondary', v)}
            hrefValue={data.cta_secondary_href} hrefOnChange={v => set('cta_secondary_href', v)}
          />
        </Field>
      </div>

      <div className="space-y-3">
        <GroupLabel>Trust badges</GroupLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Badge 1">
            <input type="text" className={cx.input} value={data.trust_1} onChange={e => set('trust_1', e.target.value)} />
          </Field>
          <Field label="Badge 2">
            <input type="text" className={cx.input} value={data.trust_2} onChange={e => set('trust_2', e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="space-y-3">
        <GroupLabel>Hero image</GroupLabel>
        <Field label="Image URL">
          <input type="text" className={cx.input} value={data.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Alt text" hint="Describes the image for screen readers">
          <input type="text" className={cx.input} value={data.image_alt} onChange={e => set('image_alt', e.target.value)} />
        </Field>
        {data.image_url && (
          <div className="rounded-xl overflow-hidden border border-black/5 aspect-video max-w-sm">
            <img src={data.image_url} alt={data.image_alt} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Features panel ───────────────────────────────────────────────────────────

function FeaturesPanel({ initial }: { initial: FeaturesContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof Omit<FeaturesContent, 'advantages'>, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function setAdvantage(index: number, key: keyof Advantage, value: string) {
    setData(prev => {
      const advantages = [...prev.advantages]
      advantages[index] = { ...advantages[index], [key]: value }
      return { ...prev, advantages }
    })
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveFeatures(data)
      setSaved(true)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Section label" hint='Small uppercase text above the heading (e.g. "Why EMC")'>
          <input type="text" className={cx.input} value={data.section_label} onChange={e => set('section_label', e.target.value)} />
        </Field>
        <Field label="Section heading">
          <input type="text" className={cx.input} value={data.heading} onChange={e => set('heading', e.target.value)} />
        </Field>
      </div>

      <Field label="Description" hint="Small text shown to the right of the heading">
        <textarea rows={2} className={cx.textarea} value={data.description} onChange={e => set('description', e.target.value)} />
      </Field>

      <Field label="Bottom link">
        <ButtonPair
          labelValue={data.link_text} labelOnChange={v => set('link_text', v)}
          hrefValue={data.link_href} hrefOnChange={v => set('link_href', v)}
        />
      </Field>

      <div className="space-y-3">
        <GroupLabel>Advantage cards</GroupLabel>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.advantages.map((adv, i) => (
            <div key={i} className={`border rounded-xl p-4 space-y-3 ${adv.color === 'brand-blue' ? 'border-brand-blue/15 bg-brand-blue/[0.02]' : 'border-brand-orange/15 bg-brand-orange/[0.02]'}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${adv.color === 'brand-blue' ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                <span className="text-xs font-semibold text-black/40">Card {i + 1}</span>
              </div>
              <Field label="Title">
                <input type="text" className={cx.input} value={adv.title} onChange={e => setAdvantage(i, 'title', e.target.value)} />
              </Field>
              <Field label="Description">
                <textarea rows={3} className={cx.textarea} value={adv.description} onChange={e => setAdvantage(i, 'description', e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>

      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── CTA panel ────────────────────────────────────────────────────────────────

function CTAPanel({ initial }: { initial: CTAContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof Omit<CTAContent, 'trust_points'>, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function setTrust(index: number, value: string) {
    setData(prev => {
      const trust_points = [...prev.trust_points]
      trust_points[index] = value
      return { ...prev, trust_points }
    })
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveCTA(data)
      setSaved(true)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
      <Field label="Eyebrow label" hint='Small text above the heading (e.g. "Work With Us")'>
        <input type="text" className={cx.input} value={data.label} onChange={e => set('label', e.target.value)} />
      </Field>

      <Field label="Heading">
        <input type="text" className={cx.input} value={data.heading} onChange={e => set('heading', e.target.value)} />
      </Field>

      <Field label="Description">
        <textarea rows={2} className={cx.textarea} value={data.description} onChange={e => set('description', e.target.value)} />
      </Field>

      <div className="space-y-3">
        <GroupLabel>Buttons</GroupLabel>
        <Field label="Primary button">
          <ButtonPair
            primary
            labelValue={data.cta_primary} labelOnChange={v => set('cta_primary', v)}
            hrefValue={data.cta_primary_href} hrefOnChange={v => set('cta_primary_href', v)}
          />
        </Field>
        <Field label="Secondary button">
          <ButtonPair
            labelValue={data.cta_secondary} labelOnChange={v => set('cta_secondary', v)}
            hrefValue={data.cta_secondary_href} hrefOnChange={v => set('cta_secondary_href', v)}
          />
        </Field>
      </div>

      <div className="space-y-3">
        <GroupLabel>Trust badges</GroupLabel>
        <div className="grid sm:grid-cols-3 gap-3">
          {data.trust_points.map((point, i) => (
            <Field key={i} label={`Badge ${i + 1}`}>
              <input type="text" className={cx.input} value={point} onChange={e => setTrust(i, e.target.value)} />
            </Field>
          ))}
        </div>
      </div>

      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Main tabbed editor ───────────────────────────────────────────────────────

export function HomeContentEditor({
  hero,
  features,
  cta,
}: {
  hero: HeroContent
  features: FeaturesContent
  cta: CTAContent
}) {
  const [active, setActive] = useState<Tab>('hero')

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

      {/* Active tab description */}
      <div className="px-6 py-3 bg-black/[0.015] border-b border-black/5">
        <p className="text-xs text-black/40">
          {TABS.find(t => t.id === active)?.desc}
        </p>
      </div>

      {/* Tab panels */}
      <div className="pt-6">
        {active === 'hero'     && <HeroPanel     initial={hero} />}
        {active === 'features' && <FeaturesPanel initial={features} />}
        {active === 'cta'      && <CTAPanel      initial={cta} />}
      </div>
    </div>
  )
}
