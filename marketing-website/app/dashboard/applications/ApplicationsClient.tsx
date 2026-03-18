'use client'
import { useState, useMemo, useTransition } from 'react'
import Link from 'next/link'
import { EnvelopeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { updateApplicationStatus, updateApplicationNotes, notifyCandidate, deleteApplication } from './actions'
import { cvViewerUrl } from '@/lib/cloudinary'
import { DEFAULT_STATUS_MESSAGES } from '@/lib/status-messages'
import type { ApplicationWithRelations, ApplicationRow } from '@/lib/supabase/types'

type Status = ApplicationRow['status']
type NotifiableStatus = Exclude<Status, 'pending'>

const statusStyles: Record<Status, string> = {
  pending:     'bg-gray-100 text-gray-600',
  reviewing:   'bg-blue-50 text-blue-600',
  shortlisted: 'bg-orange-50 text-orange-600',
  interview:   'bg-purple-50 text-purple-600',
  placed:      'bg-green-50 text-green-600',
  rejected:    'bg-red-50 text-red-500',
}

const STATUS_OPTIONS: Status[] = ['pending', 'reviewing', 'shortlisted', 'interview', 'placed', 'rejected']
const PAGE_SIZE = 25

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
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

type NotifyModal = {
  applicationId: string
  candidateName: string
  candidateEmail: string
  jobTitle: string | null
  status: NotifiableStatus
  message: string
}

export default function ApplicationsClient({ initialApplications }: { initialApplications: ApplicationWithRelations[] }) {
  const [applications, setApplications] = useState(initialApplications)
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [sort, setSort]                 = useState<'desc' | 'asc'>('desc')
  const [page, setPage]                 = useState(1)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue]     = useState('')
  const [notifyModal, setNotifyModal]   = useState<NotifyModal | null>(null)
  const [notifySent, setNotifySent]     = useState(false)
  const [notifyError, setNotifyError]   = useState<string | null>(null)
  const [, startTransition]             = useTransition()
  const [notifyPending, startNotify]    = useTransition()
  const [deletePending, startDelete]    = useTransition()

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return applications
      .filter(a => {
        const name = a.talent_profiles?.full_name?.toLowerCase() ?? ''
        const role = a.jobs?.title?.toLowerCase() ?? ''
        return (
          (!search       || name.includes(q) || role.includes(q)) &&
          (!statusFilter || a.status === statusFilter) &&
          (!sectorFilter || a.jobs?.sector === sectorFilter)
        )
      })
      .sort((a, b) => {
        const ta = new Date(a.created_at).getTime()
        const tb = new Date(b.created_at).getTime()
        return sort === 'desc' ? tb - ta : ta - tb
      })
  }, [applications, search, statusFilter, sectorFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function resetFilters() {
    setSearch(''); setStatusFilter(''); setSectorFilter(''); setSort('desc'); setPage(1)
  }
  function changeFilter(fn: () => void) { fn(); setPage(1) }

  function handleStatusChange(id: string, status: Status) {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    startTransition(async () => { await updateApplicationStatus(id, status) })
  }

  function openNotes(a: ApplicationWithRelations) {
    setEditingNotes(a.id)
    setNotesValue(a.internal_notes ?? '')
  }

  function saveNotes(id: string) {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, internal_notes: notesValue } : a))
    setEditingNotes(null)
    startTransition(async () => { await updateApplicationNotes(id, notesValue) })
  }

  function handleDelete(id: string) {
    startDelete(async () => {
      await deleteApplication(id)
      setApplications(prev => prev.filter(a => a.id !== id))
      setConfirmDelete(null)
    })
  }

  function openNotify(a: ApplicationWithRelations) {
    if (a.status === 'pending') return
    const status = a.status as NotifiableStatus
    const name   = a.talent_profiles?.full_name ?? 'Candidate'
    const role   = a.jobs?.title ?? null
    setNotifySent(false)
    setNotifyError(null)
    setNotifyModal({
      applicationId:  a.id,
      candidateName:  name,
      candidateEmail: a.talent_profiles?.email ?? '',
      jobTitle:       role,
      status,
      message:        DEFAULT_STATUS_MESSAGES[status](name, role),
    })
  }

  function handleSendNotification() {
    if (!notifyModal) return
    setNotifyError(null)
    startNotify(async () => {
      try {
        await notifyCandidate({
          candidateName:  notifyModal.candidateName,
          candidateEmail: notifyModal.candidateEmail,
          jobTitle:       notifyModal.jobTitle,
          status:         notifyModal.status,
          message:        notifyModal.message,
        })
        setNotifySent(true)
      } catch (e) {
        setNotifyError(e instanceof Error ? e.message : 'Failed to send email')
      }
    })
  }

  const statusLabel = (s: Status) => s.charAt(0).toUpperCase() + s.slice(1)
  const isFiltered = !!(search || statusFilter || sectorFilter || sort !== 'desc')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Applications</h1>
          <p className="text-black/50 text-sm mt-0.5">{applications.length} total</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-black/5 p-3.5 mb-4 flex flex-wrap gap-2.5 items-center">
        <input
          type="text" value={search}
          onChange={e => changeFilter(() => setSearch(e.target.value))}
          placeholder="Search name or role…"
          className="flex-1 min-w-44 px-3.5 py-2 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
        />
        <select value={statusFilter} onChange={e => changeFilter(() => setStatusFilter(e.target.value))}
          className="px-3.5 py-2 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue/40 bg-white text-black/70 cursor-pointer">
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
        </select>
        <select value={sectorFilter} onChange={e => changeFilter(() => setSectorFilter(e.target.value))}
          className="px-3.5 py-2 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue/40 bg-white text-black/70 cursor-pointer">
          <option value="">All sectors</option>
          {['Agriculture','Construction','Government','Healthcare','Hospitality','IT & Telecom','Logistics','Mining'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={sort} onChange={e => changeFilter(() => setSort(e.target.value as 'desc' | 'asc'))}
          className="px-3.5 py-2 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue/40 bg-white text-black/70 cursor-pointer">
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
        {isFiltered && (
          <button onClick={resetFilters} className="px-3 py-2 text-xs font-semibold text-black/50 hover:text-black border border-black/10 rounded-xl hover:border-black/20 transition-colors">
            Clear
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <p className="text-xs text-black/40">
          {isFiltered
            ? `Showing ${Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length} results`
            : `Showing ${Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`
          }
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 text-xs font-semibold border border-black/10 rounded-lg disabled:opacity-30 hover:bg-black/5 transition-colors"
            >← Prev</button>
            <span className="text-xs text-black/40 px-2">{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 text-xs font-semibold border border-black/10 rounded-lg disabled:opacity-30 hover:bg-black/5 transition-colors"
            >Next →</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50/80">
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">Applicant</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">CV</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-bold text-black/40 uppercase tracking-wider">Notes</th>
                <th className="px-5 py-3.5 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {paginated.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-blue text-xs font-bold">
                          {a.talent_profiles?.full_name?.charAt(0) ?? '?'}
                        </span>
                      </div>
                      <div>
                        <Link href={`/dashboard/applications/${a.id}`} className="font-semibold text-black hover:text-brand-blue transition-colors no-underline">
                          {a.talent_profiles?.full_name ?? '—'}
                        </Link>
                        <p className="text-xs text-black/40">{a.talent_profiles?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-black/70">{a.jobs?.title ?? <span className="text-black/30 italic">General CV</span>}</p>
                    <p className="text-xs text-black/40">{a.jobs?.sector ?? '—'}</p>
                  </td>
                  <td className="px-5 py-4">
                    {a.jobs?.type
                      ? <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeStyles[a.jobs.type] ?? 'bg-gray-100 text-gray-600'}`}>{a.jobs.type}</span>
                      : <span className="text-xs text-black/30">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    {a.talent_profiles?.cv_url
                      ? <a href={cvViewerUrl(a.talent_profiles.cv_url)} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-brand-blue hover:underline">View CV</a>
                      : <span className="text-xs text-black/30">No CV</span>}
                  </td>
                  <td className="px-5 py-4 text-xs text-black/50">{relativeDate(a.created_at)}</td>
                  <td className="px-5 py-4">
                    <select value={a.status} onChange={e => handleStatusChange(a.id, e.target.value as Status)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none capitalize ${statusStyles[a.status]}`}>
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="bg-white text-black capitalize">{statusLabel(s)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    {editingNotes === a.id ? (
                      <div className="flex gap-1.5 items-start">
                        <textarea value={notesValue} onChange={e => setNotesValue(e.target.value)}
                          rows={2} className="text-xs border border-black/10 rounded-lg px-2 py-1.5 resize-none w-40 focus:outline-none focus:border-brand-blue" />
                        <div className="flex flex-col gap-1">
                          <button onClick={() => saveNotes(a.id)} className="text-[10px] font-semibold text-white bg-black px-2 py-1 rounded hover:bg-black/80">Save</button>
                          <button onClick={() => setEditingNotes(null)} className="text-[10px] font-medium text-black/50 hover:text-black">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => openNotes(a)} className="text-xs text-black/40 hover:text-brand-blue transition-colors text-left max-w-[140px] truncate block">
                        {a.internal_notes ? a.internal_notes : <span className="italic">Add note…</span>}
                      </button>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4">
                    {confirmDelete === a.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-black/50 whitespace-nowrap">Delete?</span>
                        <button
                          onClick={() => handleDelete(a.id)}
                          disabled={deletePending}
                          className="text-[11px] font-semibold text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                        >Yes</button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="text-[11px] font-medium text-black/40 hover:text-black px-1 py-1 rounded-lg transition-colors"
                        >No</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {a.status !== 'pending' && (
                          <button
                            onClick={() => openNotify(a)}
                            title="Notify candidate"
                            className="p-1.5 rounded-lg hover:bg-brand-blue/10 text-black/30 hover:text-brand-blue transition-colors"
                          >
                            <EnvelopeIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setConfirmDelete(a.id)}
                          title="Delete application"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-black/30 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-sm text-black/30">
                    No applications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-black/5 bg-gray-50/50">
            <p className="text-xs text-black/40">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1.5">
              <button disabled={currentPage === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 text-xs font-semibold border border-black/10 rounded-lg disabled:opacity-30 hover:bg-white transition-colors">
                ← Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const p = totalPages <= 7 ? i + 1 : i < 3 ? i + 1 : i === 3 ? currentPage : i === 4 ? currentPage + 1 : totalPages - (6 - i)
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${currentPage === p ? 'bg-black text-white' : 'hover:bg-black/5 text-black/50'}`}>
                    {p}
                  </button>
                )
              })}
              <button disabled={currentPage === totalPages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 text-xs font-semibold border border-black/10 rounded-lg disabled:opacity-30 hover:bg-white transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notify candidate modal — unchanged */}
      {notifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-black/5">
              <div>
                <h2 className="font-display text-lg font-bold text-black">Notify Candidate</h2>
                <p className="text-xs text-black/40 mt-0.5">Email will be sent to {notifyModal.candidateEmail}</p>
              </div>
              <button onClick={() => setNotifyModal(null)} className="p-2 rounded-lg hover:bg-gray-100 text-black/40">✕</button>
            </div>

            {notifySent ? (
              <div className="px-7 py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <EnvelopeIcon className="w-6 h-6 text-green-500" />
                </div>
                <p className="font-semibold text-black mb-1">Email sent</p>
                <p className="text-sm text-black/50 mb-6">
                  {notifyModal.candidateName} has been notified at {notifyModal.candidateEmail}
                </p>
                <button onClick={() => setNotifyModal(null)}
                  className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90">
                  Done
                </button>
              </div>
            ) : (
              <div className="px-7 py-6">
                <div className="flex items-center gap-3 mb-5 p-3.5 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-blue text-xs font-bold">{notifyModal.candidateName.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black">{notifyModal.candidateName}</p>
                    <p className="text-xs text-black/40 truncate">{notifyModal.candidateEmail}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyles[notifyModal.status]}`}>
                    {statusLabel(notifyModal.status)}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Sending as</label>
                  <select
                    value={notifyModal.status}
                    onChange={e => {
                      const s = e.target.value as NotifiableStatus
                      setNotifyModal(m => m ? { ...m, status: s, message: DEFAULT_STATUS_MESSAGES[s](m.candidateName, m.jobTitle) } : null)
                    }}
                    className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white">
                    {(STATUS_OPTIONS.filter(s => s !== 'pending') as NotifiableStatus[]).map(s => (
                      <option key={s} value={s}>{statusLabel(s)}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Message</label>
                  <textarea rows={8} value={notifyModal.message}
                    onChange={e => setNotifyModal(m => m ? { ...m, message: e.target.value } : null)}
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue resize-none leading-relaxed" />
                  <p className="text-xs text-black/30 mt-1">You can edit this message before sending.</p>
                </div>
                {notifyError && <p className="text-sm text-red-500 mb-4">{notifyError}</p>}
                <div className="flex gap-3 pt-4 border-t border-black/5">
                  <button onClick={() => setNotifyModal(null)}
                    className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5">
                    Cancel
                  </button>
                  <button onClick={handleSendNotification} disabled={!notifyModal.message.trim() || notifyPending}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 disabled:opacity-40">
                    <EnvelopeIcon className="w-4 h-4" />
                    {notifyPending ? 'Sending…' : 'Send Email'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
