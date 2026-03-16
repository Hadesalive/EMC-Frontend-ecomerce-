'use client'
import { useState, useTransition } from 'react'
import { moveApplication } from './actions'
import type { PipelineApplication } from './page'
import type { ApplicationRow } from '@/lib/supabase/types'

type Stage = {
  id: ApplicationRow['status']
  label: string
  dot: string
  header: string
  card: string
}

const STAGES: Stage[] = [
  { id: 'pending',     label: 'Pending',     dot: 'bg-gray-400',   header: 'text-gray-600',   card: 'border-gray-100'   },
  { id: 'reviewing',   label: 'Reviewing',   dot: 'bg-blue-400',   header: 'text-blue-600',   card: 'border-blue-100'   },
  { id: 'shortlisted', label: 'Shortlisted', dot: 'bg-amber-400',  header: 'text-amber-600',  card: 'border-amber-100'  },
  { id: 'interview',   label: 'Interview',   dot: 'bg-purple-400', header: 'text-purple-600', card: 'border-purple-100' },
  { id: 'placed',      label: 'Placed',      dot: 'bg-green-400',  header: 'text-green-600',  card: 'border-green-100'  },
]

function daysAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return '1d'
  return `${d}d`
}

export default function PipelineBoard({ initialApplications }: { initialApplications: PipelineApplication[] }) {
  const [applications, setApplications] = useState(initialApplications)
  const [, startTransition] = useTransition()

  function move(id: string, newStatus: ApplicationRow['status']) {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
    startTransition(async () => { await moveApplication(id, newStatus) })
  }

  const byStage = (stageId: ApplicationRow['status']) =>
    applications.filter(a => a.status === stageId)

  const total = applications.length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Candidate Pipeline</h1>
          <p className="text-black/50 text-sm mt-1">{total} active candidate{total !== 1 ? 's' : ''} across all stages</p>
        </div>
      </div>

      {/* Stage summary */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {STAGES.map(s => {
          const count = byStage(s.id).length
          return (
            <div key={s.id} className="bg-white rounded-xl border border-black/5 p-3 text-center">
              <p className={`text-2xl font-bold font-display ${s.header}`}>{count}</p>
              <p className="text-xs text-black/50 font-medium mt-0.5">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const cards = byStage(stage.id)
          return (
            <div key={stage.id} className="flex-shrink-0 w-64">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                <span className="text-sm font-semibold text-black">{stage.label}</span>
                <span className="ml-auto text-xs text-black/40 font-medium bg-black/5 px-1.5 py-0.5 rounded-full">
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {cards.map(a => {
                  const profile = a.talent_profiles
                  const job     = a.jobs
                  const initial = profile?.full_name?.charAt(0).toUpperCase() ?? '?'

                  // Next / prev stages for move buttons
                  const stageIndex = STAGES.findIndex(s => s.id === stage.id)
                  const nextStage  = STAGES[stageIndex + 1]
                  const prevStage  = STAGES[stageIndex - 1]

                  return (
                    <div key={a.id}
                      className={`bg-white rounded-xl border ${stage.card} hover:shadow-md transition-shadow p-4 group`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-blue text-xs font-bold">{initial}</span>
                        </div>
                        <span className="text-xs text-black/30">{daysAgo(a.created_at)}</span>
                      </div>

                      <p className="text-sm font-semibold text-black leading-tight mb-0.5">
                        {profile?.full_name ?? '—'}
                      </p>
                      <p className="text-xs text-black/50 mb-1">
                        {profile?.current_role ?? job?.title ?? 'General CV'}
                      </p>
                      {job && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                          <span className="text-xs text-black/40 truncate">{job.sector}</span>
                        </div>
                      )}

                      {/* Move buttons — appear on hover */}
                      <div className="flex gap-1.5 mt-3 pt-3 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  <div className="py-8 text-center text-xs text-black/25 border border-dashed border-black/10 rounded-xl">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
