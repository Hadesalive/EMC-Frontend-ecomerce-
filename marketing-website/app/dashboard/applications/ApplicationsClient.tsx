'use client'
import { useState, useMemo, useTransition } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { updateApplicationStatus, updateApplicationNotes, notifyCandidate } from './actions'
import { cvViewerUrl } from '@/lib/cloudinary'
import { DEFAULT_STATUS_MESSAGES } from '@/lib/email'
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
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue]     = useState('')
  const [notifyModal, setNotifyModal]   = useState<NotifyModal | null>(null)
  const [notifySent, setNotifySent]     = useState(false)
  const [notifyError, setNotifyError]   = useState<string | null>(null)
  const [, startTransition]             = useTransition()
  const [notifyPending, startNotify]    = useTransition()

  const filtered = useMemo(() => applications.filter(a => {
    const q = search.toLowerCase()
    const name = a.talent_profiles?.full_name?.toLowerCase() ?? ''
    const role = a.jobs?.title?.toLowerCase() ?? ''
    return (
      (!search       || name.includes(q) || role.includes(q)) &&
      (!statusFilter || a.status === statusFilter) &&
      (!sectorFilter || a.jobs?.sector === sectorFilter)
    )
  }), [applications, search, statusFilter, sectorFilter])

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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Applications</h1>
          <p className="text-black/50 text-sm mt-1">{applications.length} total applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 mb-5 flex flex-wrap gap-3">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or role..."
          className="flex-1 min-w-48 px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
        </select>
        <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Sectors</option>
          {['Agriculture','Construction','Government','Healthcare','Hospitality','IT & Telecom','Logistics','Mining'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length !== applications.length && (
        <p className="text-xs text-black/40 mb-4">
          Showing {filtered.length} of {applications.length}
          <button onClick={() => { setSearch(''); setStatusFilter(''); setSectorFilter('') }} className="ml-2 text-brand-blue font-medium hover:underline">Clear</button>
        </p>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Applicant</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">CV</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Notes</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-blue text-xs font-bold">
                          {a.talent_profiles?.full_name?.charAt(0) ?? '?'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{a.talent_profiles?.full_name ?? '—'}</p>
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
                      ? <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeStyles[a.jobs.type]}`}>{a.jobs.type}</span>
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
                  {/* Notify button */}
                  <td className="px-5 py-4">
                    {a.status !== 'pending' && (
                      <button
                        onClick={() => openNotify(a)}
                        title="Send email to candidate"
                        className="p-1.5 rounded-lg hover:bg-brand-blue/10 transition-colors text-black/30 hover:text-brand-blue opacity-0 group-hover:opacity-100">
                        <EnvelopeIcon className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-black/40">No applications match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Notify candidate modal ── */}
      {notifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-black/5">
              <div>
                <h2 className="font-display text-lg font-bold text-black">Notify Candidate</h2>
                <p className="text-xs text-black/40 mt-0.5">Email will be sent to {notifyModal.candidateEmail}</p>
              </div>
              <button onClick={() => setNotifyModal(null)} className="p-2 rounded-lg hover:bg-gray-100 text-black/40">✕</button>
            </div>

            {notifySent ? (
              /* Success state */
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
                {/* Status badge + recipient */}
                <div className="flex items-center gap-3 mb-5 p-3.5 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-blue text-xs font-bold">
                      {notifyModal.candidateName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black">{notifyModal.candidateName}</p>
                    <p className="text-xs text-black/40 truncate">{notifyModal.candidateEmail}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyles[notifyModal.status]}`}>
                    {statusLabel(notifyModal.status)}
                  </span>
                </div>

                {/* Status selector for this email */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Sending as</label>
                  <select
                    value={notifyModal.status}
                    onChange={e => {
                      const s = e.target.value as NotifiableStatus
                      setNotifyModal(m => m ? {
                        ...m,
                        status:  s,
                        message: DEFAULT_STATUS_MESSAGES[s](m.candidateName, m.jobTitle),
                      } : null)
                    }}
                    className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white">
                    {(STATUS_OPTIONS.filter(s => s !== 'pending') as NotifiableStatus[]).map(s => (
                      <option key={s} value={s}>{statusLabel(s)}</option>
                    ))}
                  </select>
                </div>

                {/* Editable message */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Message</label>
                  <textarea
                    rows={8}
                    value={notifyModal.message}
                    onChange={e => setNotifyModal(m => m ? { ...m, message: e.target.value } : null)}
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue resize-none leading-relaxed"
                  />
                  <p className="text-xs text-black/30 mt-1">You can edit this message before sending.</p>
                </div>

                {notifyError && (
                  <p className="text-sm text-red-500 mb-4">{notifyError}</p>
                )}

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
