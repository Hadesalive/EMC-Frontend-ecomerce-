'use client'

import { useState, useTransition } from 'react'
import { saveSolutionsHero, saveSolutionsList } from './actions'
import type { SolutionsHeroContent, SolutionsListContent } from '@/lib/cms-types'

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

type Tab = 'hero' | 'list'

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'hero', label: 'Hero',      desc: 'Page subtext shown beneath the main headline' },
  { id: 'list', label: 'Solutions', desc: 'The six numbered solution cards' },
]

// ─── Hero panel ───────────────────────────────────────────────────────────────

function HeroPanel({ initial }: { initial: SolutionsHeroContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveSolutionsHero(data); setSaved(true) }) }} className="space-y-5 px-6 pb-6">
      <Field label="Subtext">
        <textarea rows={3} className={cx.textarea} value={data.subtext} onChange={e => { setData(prev => ({ ...prev, subtext: e.target.value })); setSaved(false) }} />
      </Field>
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Solutions list panel ─────────────────────────────────────────────────────

function ListPanel({ initial }: { initial: SolutionsListContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function setSolution(i: number, key: 'title' | 'description', value: string) {
    setData(prev => { const s = [...prev.solutions]; s[i] = { ...s[i], [key]: value }; return { ...prev, solutions: s } }); setSaved(false)
  }
  function setFeature(i: number, fi: number, value: string) {
    setData(prev => { const s = [...prev.solutions]; const f = [...s[i].features]; f[fi] = value; s[i] = { ...s[i], features: f }; return { ...prev, solutions: s } }); setSaved(false)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveSolutionsList(data); setSaved(true) }) }} className="space-y-4 px-6 pb-6">
      {data.solutions.map((sol, i) => (
        <div key={i} className="border border-black/8 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-black/15 font-display">{sol.num}</span>
            <p className="text-xs font-semibold text-black/40">Solution {i + 1}</p>
          </div>
          <Field label="Title">
            <input type="text" className={cx.input} value={sol.title} onChange={e => setSolution(i, 'title', e.target.value)} />
          </Field>
          <Field label="Description">
            <textarea rows={3} className={cx.textarea} value={sol.description} onChange={e => setSolution(i, 'description', e.target.value)} />
          </Field>
          <div className="space-y-2">
            <GroupLabel>Features</GroupLabel>
            {sol.features.map((f, fi) => (
              <input key={fi} type="text" className={cx.input} value={f} onChange={e => setFeature(i, fi, e.target.value)} placeholder={`Feature ${fi + 1}`} />
            ))}
          </div>
        </div>
      ))}
      <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
    </form>
  )
}

// ─── Main tabbed editor ───────────────────────────────────────────────────────

export function SolutionsContentEditor({ hero, list }: {
  hero: SolutionsHeroContent
  list: SolutionsListContent
}) {
  const [active, setActive] = useState<Tab>('hero')

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
      <div className="border-b border-black/5 px-6 pt-5">
        <div className="flex gap-1">
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
        {active === 'hero' && <HeroPanel initial={hero} />}
        {active === 'list' && <ListPanel initial={list} />}
      </div>
    </div>
  )
}
