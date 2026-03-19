'use client'

import { useState, useTransition } from 'react'
import { saveGlobal } from './actions'
import type { GlobalContent } from '@/lib/cms-types'

const cx = {
  textarea: 'w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm text-black bg-white placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition resize-none',
}

export function GlobalContentEditor({ initial }: { initial: GlobalContent }) {
  const [data, setData] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(data) !== JSON.stringify(initial)

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-black/5 bg-black/[0.015]">
        <p className="text-xs text-black/40">Site-wide settings used across all pages — metadata, footer copy</p>
      </div>
      <form
        onSubmit={e => { e.preventDefault(); startTransition(async () => { await saveGlobal(data); setSaved(true) }) }}
        className="space-y-5 p-6"
      >
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <label className="block text-sm font-medium text-black/70">Site description</label>
            <span className="text-xs text-black/30">Used in footer and meta tags</span>
          </div>
          <textarea
            rows={3}
            className={cx.textarea}
            value={data.site_description}
            onChange={e => { setData(prev => ({ ...prev, site_description: e.target.value })); setSaved(false) }}
          />
        </div>

        {(!dirty && !saved && !isPending) ? null : (
          <div className="sticky bottom-0 -mx-6 -mb-6 mt-6 px-6 py-4 bg-white/90 backdrop-blur border-t border-black/5 flex items-center justify-between">
            <span className="text-sm text-black/40">{saved ? '✓ Saved' : isPending ? 'Saving…' : 'You have unsaved changes'}</span>
            <button type="submit" disabled={isPending || !dirty} className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 disabled:opacity-40 transition-all">
              {isPending ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
