'use client'
import { useState, useMemo, useTransition } from 'react'
import { MagnifyingGlassIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { moveApplication } from './actions'
import type { PipelineApplication } from './page'
import type { ApplicationRow } from '@/lib/supabase/types'

type Stage = {
  id: ApplicationRow['status']
  label: string
  dot: string
  card: string
  count_bg: string
  header_bg: string
}

const STAGES: Stage[] = [
  { id: 'pending',     label: 'Pending',     dot: 'bg-gray-400',   card: 'border-black/[0.07]', count_bg: 'bg-gray-100 text-gray-600',     header_bg: 'bg-gray-50'    },
  { id: 'reviewing',   label: 'Reviewing',   dot: 'bg-blue-400',   card: 'border-blue-100',     count_bg: 'bg-blue-50 text-blue-600',      header_bg: 'bg-blue-50/50'   },
  { id: 'shortlisted', label: 'Shortlisted', dot: 'bg-amber-400',  card: 'border-amber-100',    count_bg: 'bg-amber-50 text-amber-600',    header_bg: 'bg-amber-50/50'  },
  { id: 'interview',   label: 'Interview',   dot: 'bg-purple-400', card: 'border-purple-100',   count_bg: 'bg-purple-50 text-purple-600',  header_bg: 'bg-purple-50/50' },
  { id: 'placed',      label: 'Placed',      dot: 'bg-green-400',  card: 'border-green-100',    count_bg: 'bg-green-50 text-green-600',    header_bg: 'bg-green-50/50'  },
]

const SECTORS = ['Agriculture','Construction','Government','Healthcare','Hospitality','IT & Telecom','Logistics','Mining']
const ZOOM_MIN = 0.5
const ZOOM_MAX = 1.2
const ZOOM_STEP = 0.1

function daysAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return '1d ago'
  return `${d}d ago`
}

export default function PipelineBoard({ initialApplications }: { initialApplications: PipelineApplication[] }) {
  const [applications, setApplications] = useState(initialApplications)
  const [search, setSearch]             = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [zoom, setZoom]                 = useState(1)
  const [, startTransition]             = useTransition()

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return applications.filter(a => {
      const name  = a.talent_profiles?.full_name?.toLowerCase() ?? ''
      const role  = a.talent_profiles?.current_role?.toLowerCase() ?? ''
      const title = a.jobs?.title?.toLowerCase() ?? ''
      return (
        (!search       || name.includes(q) || role.includes(q) || title.includes(q)) &&
        (!sectorFilter || a.jobs?.sector === sectorFilter)
      )
    })
  }, [applications, search, sectorFilter])

  function move(id: string, newStatus: ApplicationRow['status']) {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
    startTransition(async () => { await moveApplication(id, newStatus) })
  }

  const zoomIn  = () => setZoom(z => Math.min(ZOOM_MAX, parseFloat((z + ZOOM_STEP).toFixed(1))))
  const zoomOut = () => setZoom(z => Math.max(ZOOM_MIN, parseFloat((z - ZOOM_STEP).toFixed(1))))

  const isFiltered = !!(search || sectorFilter)
  const total      = applications.length

  return (
    // Break out of dashboard padding — fills viewport below the 64px top header
    <div className="-m-5 lg:-m-8 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>

      {/* ── Sticky top bar ── */}
      <div className="shrink-0 bg-white border-b border-black/5 sticky top-16 z-20 overflow-x-auto">
        <div className="px-5 lg:px-8 py-3 flex items-center gap-3 min-w-max">

          {/* Title */}
          <div className="shrink-0 mr-1">
            <h1 className="text-base font-bold text-black leading-tight">Candidate Pipeline</h1>
            <p className="text-[11px] text-black/40">
              {isFiltered ? `${filtered.length} of ${total}` : `${total} active`}
            </p>
          </div>

          {/* Stage pills */}
          <div className="hidden xl:flex items-center gap-1.5 flex-1">
            {STAGES.map(s => {
              const count = (isFiltered ? filtered : applications).filter(a => a.status === s.id).length
              return (
                <div key={s.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/5 bg-gray-50">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
                  <span className="text-[11px] text-black/50 font-medium">{s.label}</span>
                  <span className={`text-[11px] font-bold px-1 rounded-full ${s.count_bg}`}>{count}</span>
                </div>
              )
            })}
          </div>

          <div className="flex-1 xl:flex-none" />

          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none" />
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search candidates…"
              className="pl-8 pr-8 py-2 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 bg-white transition-all w-48"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60">
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sector filter */}
          <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}
            className="py-2 px-3 text-sm border border-black/10 rounded-xl focus:outline-none bg-white text-black/60 cursor-pointer">
            <option value="">All sectors</option>
            {SECTORS.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Zoom controls */}
          <div className="flex items-center gap-0 border border-black/10 rounded-xl overflow-hidden shrink-0">
            <button
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              className="px-2.5 py-2 hover:bg-gray-50 disabled:opacity-30 transition-colors border-r border-black/10"
            >
              <MinusIcon className="w-3.5 h-3.5 text-black/60" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-3 py-2 text-xs font-semibold text-black/60 hover:bg-gray-50 transition-colors tabular-nums min-w-[3.5rem] text-center"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              className="px-2.5 py-2 hover:bg-gray-50 disabled:opacity-30 transition-colors border-l border-black/10"
            >
              <PlusIcon className="w-3.5 h-3.5 text-black/60" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Board — scrolls in both directions ── */}
      {/* minHeight:0 is required — flex children default to min-height:auto which prevents shrinking and breaks overflow */}
      <div className="flex-1 overflow-auto bg-[#f7f7f8]" style={{ minHeight: 0 }}>
        {/* zoom wrapper — CSS zoom affects layout so scroll container calculates correct dimensions */}
        <div style={{ zoom }} className="p-5 lg:p-8">
          <div className="flex gap-4 w-max min-h-full">
            {STAGES.map(stage => {
              const cards    = filtered.filter(a => a.status === stage.id)
              const allCards = applications.filter(a => a.status === stage.id)

              return (
                <div key={stage.id} className="w-64 flex flex-col gap-2">

                  {/* Column header */}
                  <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${stage.header_bg} border border-black/[0.06] sticky top-0`}>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stage.dot}`} />
                    <span className="text-sm font-semibold text-black">{stage.label}</span>
                    <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${stage.count_bg}`}>
                      {isFiltered ? `${cards.length}/${allCards.length}` : cards.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-2">
                    {cards.map(a => {
                      const profile    = a.talent_profiles
                      const job        = a.jobs
                      const initial    = profile?.full_name?.charAt(0).toUpperCase() ?? '?'
                      const stageIndex = STAGES.findIndex(s => s.id === stage.id)
                      const nextStage  = STAGES[stageIndex + 1]
                      const prevStage  = STAGES[stageIndex - 1]

                      return (
                        <div key={a.id} className={`bg-white rounded-xl border ${stage.card} hover:shadow-sm transition-all p-3.5 group`}>
                          <div className="flex items-center gap-2.5 mb-2.5">
                            <div className="w-7 h-7 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-brand-blue text-[11px] font-bold">{initial}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-black leading-tight truncate">
                                {profile?.full_name ?? '—'}
                              </p>
                              <p className="text-[11px] text-black/40 truncate">
                                {profile?.current_role ?? job?.title ?? 'General CV'}
                              </p>
                            </div>
                          </div>

                          {(job?.sector || true) && (
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${stage.dot}`} />
                              <span className="text-[11px] text-black/40 truncate flex-1">{job?.sector ?? '—'}</span>
                              <span className="text-[11px] text-black/25 flex-shrink-0">{daysAgo(a.created_at)}</span>
                            </div>
                          )}

                          {/* Move buttons */}
                          <div className="flex gap-1.5 mt-2.5 pt-2.5 border-t border-black/[0.05] opacity-0 group-hover:opacity-100 transition-opacity">
                            {prevStage && (
                              <button onClick={() => move(a.id, prevStage.id)}
                                className="flex-1 text-[10px] font-semibold text-black/40 hover:text-black px-2 py-1 rounded-lg border border-black/10 hover:border-black/20 transition-colors truncate">
                                ← {prevStage.label}
                              </button>
                            )}
                            {nextStage && (
                              <button onClick={() => move(a.id, nextStage.id)}
                                className="flex-1 text-[10px] font-semibold text-white bg-black hover:bg-black/80 px-2 py-1 rounded-lg transition-colors truncate">
                                {nextStage.label} →
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    {cards.length === 0 && (
                      <div className="py-10 text-center text-xs text-black/20 border border-dashed border-black/[0.07] rounded-xl">
                        {isFiltered ? 'No matches' : 'Empty'}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
