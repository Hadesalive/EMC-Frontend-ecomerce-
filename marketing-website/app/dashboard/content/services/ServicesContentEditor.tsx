'use client'

import { useState, useTransition } from 'react'
import { saveServicesHero, saveServicesRecruitment, saveServicesHR, saveServicesOutsourcing } from './actions'
import type { ServicesHeroContent, ServicesRecruitmentContent, ServicesHRContent, ServicesOutsourcingContent } from '@/lib/cms-types'

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
      <span className="text-sm text-black/40">{saved ? '✓ Saved' : isPending ? 'Saving…' : 'You have unsaved changes'}</span>
      <button type="submit" disabled={isPending || !dirty} className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 disabled:opacity-40 transition-all">
        {isPending ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  )
}

type Tab = 'hero' | 'recruitment' | 'hr' | 'outsourcing'

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'hero',        label: 'Hero',        desc: 'Page headline and introductory subtext' },
  { id: 'recruitment', label: 'Recruitment', desc: 'Recruitment & Staffing — featured card and sub-cards' },
  { id: 'hr',          label: 'HR Advisory', desc: 'HR Advisory & Workforce Planning — list items with tags' },
  { id: 'outsourcing', label: 'Outsourcing', desc: 'Workforce Outsourcing & Payroll — four service cards' },
]

// ─── Hero panel ───────────────────────────────────────────────────────────────

function HeroPanel({ initial }: { initial: ServicesHeroContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof ServicesHeroContent, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveServicesHero(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
      <Field label="Headline">
        <input type="text" className={cx.input} value={data.headline} onChange={e => set('headline', e.target.value)} />
      </Field>
      <Field label="Subtext">
        <textarea rows={3} className={cx.textarea} value={data.subtext} onChange={e => set('subtext', e.target.value)} />
      </Field>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Recruitment panel ────────────────────────────────────────────────────────

function RecruitmentPanel({ initial }: { initial: ServicesRecruitmentContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof Omit<ServicesRecruitmentContent, 'featured_bullets' | 'cards'>, value: string) {
    setData(prev => ({ ...prev, [key]: value })); setSaved(false)
  }
  function setBullet(i: number, value: string) {
    setData(prev => { const b = [...prev.featured_bullets]; b[i] = value; return { ...prev, featured_bullets: b } }); setSaved(false)
  }
  function setCard(i: number, key: 'title' | 'description', value: string) {
    setData(prev => { const c = [...prev.cards]; c[i] = { ...c[i], [key]: value }; return { ...prev, cards: c } }); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveServicesRecruitment(data); setSaved(true) }) }} className="space-y-6 px-6 pb-6">
      <div className="border border-brand-blue/15 bg-brand-blue/[0.02] rounded-xl p-5 space-y-4">
        <p className="text-xs font-bold text-brand-blue/60 uppercase tracking-widest">Featured card</p>
        <Field label="Title">
          <input type="text" className={cx.input} value={data.featured_title} onChange={e => set('featured_title', e.target.value)} />
        </Field>
        <Field label="Description">
          <textarea rows={3} className={cx.textarea} value={data.featured_description} onChange={e => set('featured_description', e.target.value)} />
        </Field>
        <div className="space-y-2">
          <GroupLabel>Bullet points</GroupLabel>
          {data.featured_bullets.map((b, i) => (
            <input key={i} type="text" className={cx.input} value={b} onChange={e => setBullet(i, e.target.value)} placeholder={`Bullet ${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <GroupLabel>Sub-cards</GroupLabel>
        {data.cards.map((card, i) => (
          <div key={i} className="border border-black/8 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-black/40">Card {i + 1}</p>
            <Field label="Title">
              <input type="text" className={cx.input} value={card.title} onChange={e => setCard(i, 'title', e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea rows={3} className={cx.textarea} value={card.description} onChange={e => setCard(i, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
      </div>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── HR Advisory panel ────────────────────────────────────────────────────────

function HRPanel({ initial }: { initial: ServicesHRContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function setItem(i: number, key: 'title' | 'description', value: string) {
    setData(prev => { const items = [...prev.items]; items[i] = { ...items[i], [key]: value }; return { ...prev, items } }); setSaved(false)
  }
  function setTag(i: number, ti: number, value: string) {
    setData(prev => { const items = [...prev.items]; const tags = [...items[i].tags]; tags[ti] = value; items[i] = { ...items[i], tags }; return { ...prev, items } }); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveServicesHR(data); setSaved(true) }) }} className="space-y-4 px-6 pb-6">
      {data.items.map((item, i) => (
        <div key={i} className="border border-brand-orange/15 bg-brand-orange/[0.02] rounded-xl p-5 space-y-3">
          <p className="text-xs font-bold text-brand-orange/60 uppercase tracking-widest">Item {i + 1}</p>
          <Field label="Title">
            <input type="text" className={cx.input} value={item.title} onChange={e => setItem(i, 'title', e.target.value)} />
          </Field>
          <Field label="Description">
            <textarea rows={3} className={cx.textarea} value={item.description} onChange={e => setItem(i, 'description', e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            {item.tags.map((tag, ti) => (
              <input key={ti} type="text" className={cx.input} value={tag} onChange={e => setTag(i, ti, e.target.value)} placeholder={`Tag ${ti + 1}`} />
            ))}
          </div>
        </div>
      ))}
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Outsourcing panel ────────────────────────────────────────────────────────

function OutsourcingPanel({ initial }: { initial: ServicesOutsourcingContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function setItem(i: number, key: 'title' | 'description', value: string) {
    setData(prev => { const items = [...prev.items]; items[i] = { ...items[i], [key]: value }; return { ...prev, items } }); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveServicesOutsourcing(data); setSaved(true) }) }} className="space-y-4 px-6 pb-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {data.items.map((item, i) => (
          <div key={i} className="border border-black/8 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-black/40">Card {i + 1}</p>
            <Field label="Title">
              <input type="text" className={cx.input} value={item.title} onChange={e => setItem(i, 'title', e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea rows={4} className={cx.textarea} value={item.description} onChange={e => setItem(i, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
      </div>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Main tabbed editor ───────────────────────────────────────────────────────

export function ServicesContentEditor({ hero, recruitment, hr, outsourcing }: {
  hero: ServicesHeroContent
  recruitment: ServicesRecruitmentContent
  hr: ServicesHRContent
  outsourcing: ServicesOutsourcingContent
}) {
  const [active, setActive] = useState<Tab>('hero')

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
      <div className="border-b border-black/5 px-6 pt-5">
        <div className="flex gap-1 flex-wrap">
          {TABS.map(tab => (
            <button key={tab.id} type="button" onClick={() => setActive(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all -mb-px border-b-2 ${active === tab.id ? 'text-black border-black bg-black/[0.02]' : 'text-black/40 border-transparent hover:text-black/70'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-6 py-3 bg-black/[0.015] border-b border-black/5">
        <p className="text-xs text-black/40">{TABS.find(t => t.id === active)?.desc}</p>
      </div>
      <div className="pt-6">
        {active === 'hero'        && <HeroPanel        initial={hero} />}
        {active === 'recruitment' && <RecruitmentPanel initial={recruitment} />}
        {active === 'hr'          && <HRPanel          initial={hr} />}
        {active === 'outsourcing' && <OutsourcingPanel initial={outsourcing} />}
      </div>
    </div>
  )
}
