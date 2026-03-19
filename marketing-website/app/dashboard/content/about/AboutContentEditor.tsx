'use client'

import { useState, useTransition } from 'react'
import { saveAboutIntro, saveAboutPurpose, saveAboutHero, saveAboutValues, saveAboutCSR } from './actions'
import type { AboutIntroContent, AboutPurposeContent, AboutHeroContent, AboutValuesContent, AboutCSRContent } from '@/lib/cms-types'
import { ImageUpload } from '@/components/dashboard/ImageUpload'

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
  return <p className="text-xs font-semibold text-black/40 uppercase tracking-widest pt-1">{children}</p>
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

type Tab = 'intro' | 'purpose' | 'hero' | 'values' | 'csr'

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'intro',   label: 'Who We Are',               desc: 'The three paragraphs describing the company, plus the sidebar photo' },
  { id: 'purpose', label: 'Purpose / Vision / Mission', desc: 'The three panels shown on the dark background section' },
  { id: 'hero',    label: 'Hero Stats',                desc: 'Subtext and four stat boxes shown in the page hero' },
  { id: 'values',  label: 'Values',                   desc: 'Heading, subtext, and the five company values' },
  { id: 'csr',     label: 'Community & CSR',           desc: 'Label, heading, paragraphs, and image for the CSR section' },
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

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveAboutIntro(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
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
        <GroupLabel>Sidebar image</GroupLabel>
        <ImageUpload
          value={data.image_url}
          onChange={url => set('image_url', url)}
          alt={data.image_alt}
          onAltChange={alt => set('image_alt', alt)}
          aspect="video"
        />
      </div>

      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Purpose panel ────────────────────────────────────────────────────────────

const PVM_PANELS = [
  { key: 'purpose' as const, label: '01 — Purpose', color: 'border-black/8 bg-black/[0.015]',           accent: 'text-black/40' },
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

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveAboutPurpose(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
      {PVM_PANELS.map(({ key, label, color, accent }) => (
        <div key={key} className={`border rounded-xl p-5 space-y-4 ${color}`}>
          <p className={`text-xs font-bold uppercase tracking-widest ${accent}`}>{label}</p>
          <Field label="Heading">
            <input type="text" className={cx.input} value={data[`${key}_heading` as keyof AboutPurposeContent]} onChange={e => set(`${key}_heading` as keyof AboutPurposeContent, e.target.value)} />
          </Field>
          <Field label="Body text">
            <textarea rows={4} className={cx.textarea} value={data[`${key}_body` as keyof AboutPurposeContent]} onChange={e => set(`${key}_body` as keyof AboutPurposeContent, e.target.value)} />
          </Field>
        </div>
      ))}
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Hero stats panel ─────────────────────────────────────────────────────────

function HeroPanel({ initial }: { initial: AboutHeroContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function setStat(i: number, key: 'label' | 'sub', value: string) {
    setData(prev => { const stats = [...prev.stats]; stats[i] = { ...stats[i], [key]: value }; return { ...prev, stats } }); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveAboutHero(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
      <Field label="Subtext">
        <textarea rows={3} className={cx.textarea} value={data.subtext} onChange={e => { setData(prev => ({ ...prev, subtext: e.target.value })); setSaved(false) }} />
      </Field>
      <div className="space-y-3">
        <GroupLabel>Stat boxes</GroupLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="border border-black/8 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-black/40">Stat {i + 1}</p>
              <Field label="Label">
                <input type="text" className={cx.input} value={stat.label} onChange={e => setStat(i, 'label', e.target.value)} />
              </Field>
              <Field label="Sub-label">
                <input type="text" className={cx.input} value={stat.sub} onChange={e => setStat(i, 'sub', e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Values panel ─────────────────────────────────────────────────────────────

function ValuesPanel({ initial }: { initial: AboutValuesContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function setVal(i: number, key: 'name' | 'desc', value: string) {
    setData(prev => { const values = [...prev.values]; values[i] = { ...values[i], [key]: value }; return { ...prev, values } }); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveAboutValues(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
      <Field label="Heading">
        <input type="text" className={cx.input} value={data.heading} onChange={e => { setData(prev => ({ ...prev, heading: e.target.value })); setSaved(false) }} />
      </Field>
      <Field label="Subtext">
        <textarea rows={2} className={cx.textarea} value={data.subtext} onChange={e => { setData(prev => ({ ...prev, subtext: e.target.value })); setSaved(false) }} />
      </Field>
      <div className="space-y-3">
        <GroupLabel>Values</GroupLabel>
        {data.values.map((v, i) => (
          <div key={i} className="border border-black/8 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-black/40">{v.num} — Value {i + 1}</p>
            <Field label="Name">
              <input type="text" className={cx.input} value={v.name} onChange={e => setVal(i, 'name', e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea rows={2} className={cx.textarea} value={v.desc} onChange={e => setVal(i, 'desc', e.target.value)} />
            </Field>
          </div>
        ))}
      </div>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── CSR panel ────────────────────────────────────────────────────────────────

function CSRPanel({ initial }: { initial: AboutCSRContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof AboutCSRContent, value: string) {
    setData(prev => ({ ...prev, [key]: value })); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveAboutCSR(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
      <Field label="Label" hint="e.g. Community & CSR">
        <input type="text" className={cx.input} value={data.label} onChange={e => set('label', e.target.value)} />
      </Field>
      <Field label="Heading">
        <input type="text" className={cx.input} value={data.heading} onChange={e => set('heading', e.target.value)} />
      </Field>
      <Field label="Paragraph 1">
        <textarea rows={4} className={cx.textarea} value={data.paragraph_1} onChange={e => set('paragraph_1', e.target.value)} />
      </Field>
      <Field label="Paragraph 2">
        <textarea rows={4} className={cx.textarea} value={data.paragraph_2} onChange={e => set('paragraph_2', e.target.value)} />
      </Field>
      <div className="pt-2 border-t border-black/5 space-y-4">
        <GroupLabel>Section image</GroupLabel>
        <ImageUpload
          value={data.image_url}
          onChange={url => set('image_url', url)}
          alt={data.image_alt}
          onAltChange={alt => set('image_alt', alt)}
          aspect="video"
        />
      </div>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Main tabbed editor ───────────────────────────────────────────────────────

export function AboutContentEditor({
  intro,
  purpose,
  hero,
  values,
  csr,
}: {
  intro: AboutIntroContent
  purpose: AboutPurposeContent
  hero: AboutHeroContent
  values: AboutValuesContent
  csr: AboutCSRContent
}) {
  const [active, setActive] = useState<Tab>('intro')

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
      <div className="border-b border-black/5 px-6 pt-5">
        <div className="flex gap-1 flex-wrap">
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
        <p className="text-xs text-black/40">{TABS.find(t => t.id === active)?.desc}</p>
      </div>

      <div className="pt-6">
        {active === 'intro'   && <IntroPanel   initial={intro} />}
        {active === 'purpose' && <PurposePanel initial={purpose} />}
        {active === 'hero'    && <HeroPanel    initial={hero} />}
        {active === 'values'  && <ValuesPanel  initial={values} />}
        {active === 'csr'     && <CSRPanel     initial={csr} />}
      </div>
    </div>
  )
}
