'use client'
import { useState, useMemo, useTransition } from 'react'
import { updateRequestStatus, updateRequestNotes } from './actions'
import type { PlacementRequest } from '@/lib/supabase/types'

type ReqStatus = PlacementRequest['status']

const statusStyles: Record<ReqStatus, string> = {
  new:         'bg-gray-100 text-gray-600',
  contacted:   'bg-blue-50 text-blue-600',
  in_progress: 'bg-amber-50 text-amber-600',
  closed:      'bg-green-50 text-green-600',
}

const STATUS_OPTIONS: { value: ReqStatus; label: string }[] = [
  { value: 'new',         label: 'New' },
  { value: 'contacted',   label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed',      label: 'Closed' },
]

const typeStyles: Record<string, string> = {
  Permanent: 'bg-brand-blue/10 text-brand-blue',
  Contract:  'bg-brand-orange/10 text-brand-orange',
  Temporary: 'bg-gray-100 text-gray-600',
}

function relativeDate(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  if (d < 7)  return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function RequestsClient({ initialRequests }: { initialRequests: PlacementRequest[] }) {
  const [requests, setRequests]         = useState(initialRequests)
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue]     = useState('')
  const [expanded, setExpanded]         = useState<string | null>(null)
  const [, startTransition]             = useTransition()

  const filtered = useMemo(() => requests.filter(r => {
    const q = search.toLowerCase()
    return (
      (!search       || r.company_name.toLowerCase().includes(q) || r.role_title.toLowerCase().includes(q) || r.contact_name.toLowerCase().includes(q)) &&
      (!statusFilter || r.status === statusFilter)
    )
  }), [requests, search, statusFilter])

  function handleStatusChange(id: string, status: ReqStatus) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    startTransition(async () => { await updateRequestStatus(id, status) })
  }

  function openNotes(r: PlacementRequest) {
    setEditingNotes(r.id)
    setNotesValue(r.internal_notes ?? '')
  }

  function saveNotes(id: string) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, internal_notes: notesValue } : r))
    setEditingNotes(null)
    startTransition(async () => { await updateRequestNotes(id, notesValue) })
  }

  const newCount = requests.filter(r => r.status === 'new').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Placement Requests</h1>
          <p className="text-black/50 text-sm mt-1">
            {requests.length} total · {newCount > 0 && <span className="text-amber-600 font-medium">{newCount} new</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 mb-5 flex flex-wrap gap-3">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by company, role or contact..."
          className="flex-1 min-w-48 px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50">
                {['Company','Role','Sector','Positions','Type','Received','Status','Notes',''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map(r => (
                <>
                  <tr key={r.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-orange text-xs font-bold">{r.company_name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{r.company_name}</p>
                          <p className="text-xs text-black/40">{r.contact_name}{r.contact_title ? ` · ${r.contact_title}` : ''}</p>
                          <p className="text-xs text-black/30">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-black/80">{r.role_title}</p>
                      {r.salary_range && <p className="text-xs text-black/40 mt-0.5">{r.salary_range}</p>}
                    </td>
                    <td className="px-5 py-4 text-xs text-black/60">{r.sector}</td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-black">{r.num_positions}</span>
                      <span className="text-xs text-black/40 ml-1">pos.</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeStyles[r.employment_type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {r.employment_type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-black/50 whitespace-nowrap">{relativeDate(r.created_at)}</td>
                    <td className="px-5 py-4">
                      <select value={r.status} onChange={e => handleStatusChange(r.id, e.target.value as ReqStatus)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${statusStyles[r.status]}`}>
                        {STATUS_OPTIONS.map(o => (
                          <option key={o.value} value={o.value} className="bg-white text-black">{o.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      {editingNotes === r.id ? (
                        <div className="flex gap-1.5 items-start">
                          <textarea value={notesValue} onChange={e => setNotesValue(e.target.value)}
                            rows={2} className="text-xs border border-black/10 rounded-lg px-2 py-1.5 resize-none w-40 focus:outline-none focus:border-brand-blue" />
                          <div className="flex flex-col gap-1">
                            <button onClick={() => saveNotes(r.id)} className="text-[10px] font-semibold text-white bg-black px-2 py-1 rounded hover:bg-black/80">Save</button>
                            <button onClick={() => setEditingNotes(null)} className="text-[10px] font-medium text-black/50 hover:text-black">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => openNotes(r)} className="text-xs text-black/40 hover:text-brand-blue transition-colors text-left max-w-[120px] truncate block">
                          {r.internal_notes ? r.internal_notes : <span className="italic">Add note…</span>}
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                        className="text-xs font-medium text-black/40 hover:text-brand-blue transition-colors opacity-0 group-hover:opacity-100"
                      >
                        {expanded === r.id ? 'Hide' : 'Details'}
                      </button>
                    </td>
                  </tr>
                  {expanded === r.id && (
                    <tr key={`${r.id}-expanded`} className="bg-gray-50/50">
                      <td colSpan={9} className="px-5 py-5 border-t border-black/5">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-black/40 mb-2">Contact</p>
                            <p className="text-sm font-medium text-black">{r.contact_name}</p>
                            {r.contact_title && <p className="text-xs text-black/50">{r.contact_title}</p>}
                            <p className="text-xs text-brand-blue mt-1">{r.email}</p>
                            <p className="text-xs text-black/50">{r.phone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-black/40 mb-2">Role Details</p>
                            {r.location && <p className="text-xs text-black/60">Location: {r.location}</p>}
                            {r.start_date && <p className="text-xs text-black/60">Start: {new Date(r.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
                            {r.salary_range && <p className="text-xs text-black/60">Salary: {r.salary_range}</p>}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-black/40 mb-2">Description</p>
                            <p className="text-xs text-black/60 leading-relaxed line-clamp-4">{r.description}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-sm text-black/40">
                    {requests.length === 0 ? 'No placement requests yet.' : 'No requests match your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
