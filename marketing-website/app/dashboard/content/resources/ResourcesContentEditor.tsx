'use client'

import { useState, useTransition } from 'react'
import { saveResources } from './actions'
import type { ResourcesContent } from '@/lib/cms-types'

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

function ButtonPair({
  labelValue, labelOnChange, hrefValue, hrefOnChange, primary,
}: {
  labelValue: string; labelOnChange: (v: string) => void
  hrefValue: string; hrefOnChange: (v: string) => void
  primary?: boolean
}) {
  return (
    <div className={`flex rounded-xl overflow-hidden border ${primary ? 'border-brand-blue/20' : 'border-black/10'}`}>
      <input
        type="text" value={labelValue} onChange={e => labelOnChange(e.target.value)}
        placeholder="Button label"
        className={`flex-1 px-3.5 py-2.5 text-sm text-black bg-white border-r border-black/10 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-brand-blue/20 ${primary ? 'font-medium' : ''}`}
      />
      <div className="flex items-center px-2 bg-black/[0.02] text-black/25 select-none text-xs">→</div>
      <input
        type="text" value={hrefValue} onChange={e => hrefOnChange(e.target.value)}
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
      <button type="submit" disabled={isPending || !dirty}
        className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 disabled:opacity-40 transition-all">
        {isPending ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  )
}

type Tab = 'hero' | 'audience' | 'insights'

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'hero',     label: 'Hero',     desc: 'Page headline, subtext and call-to-action buttons' },
  { id: 'audience', label: 'Audience', desc: '"For Employers" and "For Job Seekers" card headings and descriptions' },
  { id: 'insights', label: 'Insights', desc: 'Quick Insights section heading and the three insight cards' },
]

export function ResourcesContentEditor({ initial }: { initial: ResourcesContent }) {
  const [data, setData]   = useState(initial)
  const [active, setActive] = useState<Tab>('hero')
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  function set(key: keyof ResourcesContent, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await saveResources(data)
      setSaved(true)
    })
  }

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-clip">
      {/* Tab bar */}
      <div className="border-b border-black/5 px-6 pt-5">
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button key={tab.id} type="button" onClick={() => setActive(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all -mb-px border-b-2 ${
                active === tab.id
                  ? 'text-black border-black bg-black/[0.02]'
                  : 'text-black/40 border-transparent hover:text-black/70'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab description */}
      <div className="px-6 py-3 bg-black/[0.015] border-b border-black/5">
        <p className="text-xs text-black/40">{TABS.find(t => t.id === active)?.desc}</p>
      </div>

      <form onSubmit={handleSubmit} className="pt-6">
        {/* ── Hero tab ── */}
        {active === 'hero' && (
          <div className="space-y-6 px-6 pb-6">
            <Field label="Heading">
              <input type="text" className={cx.input} value={data.heading} onChange={e => set('heading', e.target.value)} />
            </Field>
            <Field label="Subtext">
              <textarea rows={3} className={cx.textarea} value={data.subtext} onChange={e => set('subtext', e.target.value)} />
            </Field>
            <div className="space-y-3">
              <GroupLabel>Call-to-action buttons</GroupLabel>
              <Field label="Primary button">
                <ButtonPair primary
                  labelValue={data.cta_primary}      labelOnChange={v => set('cta_primary', v)}
                  hrefValue={data.cta_primary_href}  hrefOnChange={v => set('cta_primary_href', v)}
                />
              </Field>
              <Field label="Secondary button">
                <ButtonPair
                  labelValue={data.cta_secondary}      labelOnChange={v => set('cta_secondary', v)}
                  hrefValue={data.cta_secondary_href}  hrefOnChange={v => set('cta_secondary_href', v)}
                />
              </Field>
            </div>
            <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
          </div>
        )}

        {/* ── Audience tab ── */}
        {active === 'audience' && (
          <div className="space-y-8 px-6 pb-6">
            <div className="space-y-4">
              <GroupLabel>For Employers</GroupLabel>
              <Field label="Heading">
                <input type="text" className={cx.input} value={data.employer_heading} onChange={e => set('employer_heading', e.target.value)} />
              </Field>
              <Field label="Description">
                <textarea rows={3} className={cx.textarea} value={data.employer_description} onChange={e => set('employer_description', e.target.value)} />
              </Field>
            </div>
            <div className="space-y-4 border-t border-black/5 pt-6">
              <GroupLabel>For Job Seekers</GroupLabel>
              <Field label="Heading">
                <input type="text" className={cx.input} value={data.jobseeker_heading} onChange={e => set('jobseeker_heading', e.target.value)} />
              </Field>
              <Field label="Description">
                <textarea rows={3} className={cx.textarea} value={data.jobseeker_description} onChange={e => set('jobseeker_description', e.target.value)} />
              </Field>
            </div>
            <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
          </div>
        )}

        {/* ── Insights tab ── */}
        {active === 'insights' && (
          <div className="space-y-8 px-6 pb-6">
            <div className="space-y-4">
              <GroupLabel>Section header</GroupLabel>
              <Field label="Label" hint='Small uppercase tag e.g. "Quick Insights"'>
                <input type="text" className={cx.input} value={data.insights_label} onChange={e => set('insights_label', e.target.value)} />
              </Field>
              <Field label="Heading">
                <input type="text" className={cx.input} value={data.insights_heading} onChange={e => set('insights_heading', e.target.value)} />
              </Field>
            </div>
            {([1, 2, 3] as const).map(n => (
              <div key={n} className="space-y-4 border-t border-black/5 pt-6">
                <GroupLabel>Insight {n}</GroupLabel>
                <Field label="Heading">
                  <input type="text" className={cx.input}
                    value={data[`insight_${n}_heading`]}
                    onChange={e => set(`insight_${n}_heading`, e.target.value)} />
                </Field>
                <Field label="Body">
                  <textarea rows={3} className={cx.textarea}
                    value={data[`insight_${n}_body`]}
                    onChange={e => set(`insight_${n}_body`, e.target.value)} />
                </Field>
              </div>
            ))}
            <SaveBar isPending={isPending} dirty={dirty} saved={saved} />
          </div>
        )}
      </form>
    </div>
  )
}
