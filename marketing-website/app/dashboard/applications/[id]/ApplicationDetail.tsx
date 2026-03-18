'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  EnvelopeSimple, Phone, MapPin, Briefcase, CalendarBlank,
  CurrencyDollar, FilePdf, Eye, PencilSimple, Check, X,
} from '@phosphor-icons/react'
import { updateApplicationStatus, updateApplicationNotes, notifyCandidate } from '../actions'
import { DEFAULT_STATUS_MESSAGES } from '@/lib/status-messages'
import CvViewer from '@/components/dashboard/CvViewer'
import type { ApplicationRow, TalentProfile, JobRow } from '@/lib/supabase/types'

type Status = ApplicationRow['status']
type NotifiableStatus = Exclude<Status, 'pending'>

const statusStyles: Record<Status, string> = {
  pending:     'bg-gray-100 text-gray-600',
  reviewing:   'bg-blue-50 text-blue-700',
  shortlisted: 'bg-orange-50 text-orange-700',
  interview:   'bg-purple-50 text-purple-700',
  placed:      'bg-green-50 text-green-700',
  rejected:    'bg-red-50 text-red-600',
}

const STATUS_OPTIONS: Status[] = ['pending', 'reviewing', 'shortlisted', 'interview', 'placed', 'rejected']
const statusLabel = (s: Status) => s.charAt(0).toUpperCase() + s.slice(1)

type Props = {
  application: ApplicationRow & {
    talent_profiles: TalentProfile
    jobs: Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'salary_range' | 'deadline'> | null
  }
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-black/5 last:border-0">
      <span className="text-xs font-semibold text-black/40 uppercase tracking-wide w-32 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-black/80 flex-1">{value}</span>
    </div>
  )
}

export default function ApplicationDetail({ application: initial }: Props) {
  const [app, setApp]           = useState(initial)
  const [cvOpen, setCvOpen]     = useState(false)
  const [editNotes, setEditNotes] = useState(false)
  const [notesVal, setNotesVal] = useState(initial.internal_notes ?? '')
  const [showNotify, setShowNotify] = useState(false)
  const [notifyMsg, setNotifyMsg]   = useState('')
  const [notifyStatus, setNotifyStatus] = useState<NotifiableStatus>(
    (initial.status === 'pending' ? 'reviewing' : initial.status) as NotifiableStatus
  )
  const [notifySent, setNotifySent]   = useState(false)
  const [notifyError, setNotifyError] = useState<string | null>(null)
  const [, startTransition]     = useTransition()
  const [notifyPending, startNotify] = useTransition()

  const profile = app.talent_profiles
  const job = app.jobs

  function handleStatusChange(status: Status) {
    setApp(a => ({ ...a, status }))
    startTransition(async () => { await updateApplicationStatus(app.id, status) })
  }

  function saveNotes() {
    setApp(a => ({ ...a, internal_notes: notesVal }))
    setEditNotes(false)
    startTransition(async () => { await updateApplicationNotes(app.id, notesVal) })
  }

  function openNotify() {
    const name = profile.full_name ?? 'Candidate'
    const role = job?.title ?? null
    const s = (app.status === 'pending' ? 'reviewing' : app.status) as NotifiableStatus
    setNotifyStatus(s)
    setNotifyMsg(DEFAULT_STATUS_MESSAGES[s](name, role))
    setNotifySent(false)
    setNotifyError(null)
    setShowNotify(true)
  }

  function sendNotification() {
    setNotifyError(null)
    startNotify(async () => {
      try {
        await notifyCandidate({
          candidateName:  profile.full_name,
          candidateEmail: profile.email,
          jobTitle:       job?.title ?? null,
          status:         notifyStatus,
          message:        notifyMsg,
        })
        setNotifySent(true)
      } catch (e) {
        setNotifyError(e instanceof Error ? e.message : 'Failed to send')
      }
    })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* Left col: candidate + application info */}
      <div className="lg:col-span-2 space-y-5">

        {/* Candidate card */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0 text-2xl font-bold text-brand-blue font-display">
              {profile.full_name?.charAt(0) ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-xl font-bold text-black leading-tight">{profile.full_name}</h1>
              {profile.current_role && <p className="text-sm text-black/50 mt-0.5">{profile.current_role}</p>}
              {profile.years_experience && <p className="text-xs text-black/40 mt-0.5">{profile.years_experience} experience</p>}
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${statusStyles[app.status]}`}>
              {statusLabel(app.status)}
            </span>
          </div>

          <div>
            {profile.email && (
              <div className="flex items-center gap-2.5 py-2.5 border-b border-black/5">
                <EnvelopeSimple size={15} className="text-black/30 shrink-0" />
                <a href={`mailto:${profile.email}`} className="text-sm text-brand-blue hover:underline no-underline">{profile.email}</a>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-2.5 py-2.5 border-b border-black/5">
                <Phone size={15} className="text-black/30 shrink-0" />
                <a href={`tel:${profile.phone}`} className="text-sm text-black/70 hover:text-black no-underline">{profile.phone}</a>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2.5 py-2.5 border-b border-black/5">
                <MapPin size={15} className="text-black/30 shrink-0" />
                <span className="text-sm text-black/70">{profile.location}</span>
              </div>
            )}
            {profile.linkedin_url && (
              <div className="flex items-center gap-2.5 py-2.5">
                <span className="text-[11px] font-bold text-black/20 w-[15px] shrink-0">in</span>
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-blue hover:underline no-underline truncate">
                  {profile.linkedin_url.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Candidate background */}
        {(profile.qualification || profile.preferred_sector || profile.employment_type || profile.availability || profile.summary) && (
          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <h2 className="font-display text-sm font-bold text-black mb-4 uppercase tracking-wide">Background</h2>
            <InfoRow label="Qualification" value={profile.qualification} />
            <InfoRow label="Sector" value={profile.preferred_sector} />
            <InfoRow label="Emp. type" value={profile.employment_type} />
            <InfoRow label="Availability" value={profile.availability} />
            {profile.summary && (
              <div className="pt-3">
                <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-2">Summary</p>
                <p className="text-sm text-black/65 leading-relaxed">{profile.summary}</p>
              </div>
            )}
          </div>
        )}

        {/* Applicant's own notes */}
        {app.applicant_notes && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-6">
            <h2 className="font-display text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">
              Message from applicant
            </h2>
            <p className="text-sm text-amber-900/80 leading-relaxed">{app.applicant_notes}</p>
          </div>
        )}

        {/* Internal notes */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm font-bold text-black uppercase tracking-wide">Internal Notes</h2>
            {!editNotes && (
              <button onClick={() => setEditNotes(true)} className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors">
                <PencilSimple size={13} weight="bold" /> Edit
              </button>
            )}
          </div>
          {editNotes ? (
            <div className="space-y-2">
              <textarea
                value={notesVal}
                onChange={e => setNotesVal(e.target.value)}
                rows={4}
                className="w-full text-sm border border-black/10 rounded-xl px-3.5 py-3 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 resize-none leading-relaxed"
                placeholder="Add internal notes…"
                autoFocus
              />
              <div className="flex gap-2">
                <button onClick={saveNotes} className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/80">
                  <Check size={12} weight="bold" /> Save
                </button>
                <button onClick={() => { setEditNotes(false); setNotesVal(app.internal_notes ?? '') }} className="px-4 py-2 text-xs font-medium text-black/40 hover:text-black border border-black/10 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-black/60 leading-relaxed min-h-[2.5rem]">
              {app.internal_notes || <span className="italic text-black/30">No notes yet.</span>}
            </p>
          )}
        </div>
      </div>

      {/* Right col: job info + actions */}
      <div className="space-y-5">

        {/* Status control */}
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs font-bold text-black/40 uppercase tracking-wide mb-3">Status</p>
          <select
            value={app.status}
            onChange={e => handleStatusChange(e.target.value as Status)}
            className={`w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:border-brand-blue/40 cursor-pointer capitalize ${statusStyles[app.status]}`}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s} className="bg-white text-black font-medium">{statusLabel(s)}</option>
            ))}
          </select>
          <button
            onClick={openNotify}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-black/10 text-sm font-semibold text-black/60 rounded-xl hover:border-brand-blue/30 hover:text-brand-blue hover:bg-brand-blue/5 transition-all"
          >
            <EnvelopeSimple size={16} weight="bold" />
            Email Candidate
          </button>
        </div>

        {/* CV */}
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs font-bold text-black/40 uppercase tracking-wide mb-3">CV / Resume</p>
          {profile.cv_url ? (
            <div className="space-y-2">
              <button
                onClick={() => setCvOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left group"
              >
                <FilePdf size={22} weight="fill" className="text-red-400 shrink-0" />
                <span className="text-sm font-medium text-black/70 group-hover:text-black flex-1 min-w-0 truncate">
                  View CV
                </span>
                <Eye size={16} className="text-black/30 group-hover:text-brand-blue shrink-0" />
              </button>
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs text-black/40 hover:text-brand-blue transition-colors no-underline"
              >
                Open raw file ↗
              </a>
            </div>
          ) : (
            <p className="text-sm text-black/30 italic">No CV uploaded</p>
          )}
        </div>

        {/* Job info */}
        {job ? (
          <div className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs font-bold text-black/40 uppercase tracking-wide mb-3">Applied For</p>
            <Link href={`/dashboard/jobs?highlight=${job.id}`} className="no-underline group">
              <h3 className="text-sm font-bold text-black group-hover:text-brand-blue transition-colors mb-1">{job.title}</h3>
            </Link>
            <div className="space-y-2 mt-3">
              {job.sector && (
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <Briefcase size={13} className="shrink-0" /> {job.sector}
                </div>
              )}
              {job.location && (
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <MapPin size={13} className="shrink-0" /> {job.location}
                </div>
              )}
              {job.salary_range && (
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <CurrencyDollar size={13} className="shrink-0" /> {job.salary_range}
                </div>
              )}
              {job.deadline && (
                <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold">
                  <CalendarBlank size={13} className="shrink-0" />
                  Closes {new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs font-bold text-black/40 uppercase tracking-wide mb-1">Applied For</p>
            <p className="text-sm text-black/50 italic">General CV submission</p>
          </div>
        )}

        {/* Meta */}
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs font-bold text-black/40 uppercase tracking-wide mb-3">Submitted</p>
          <p className="text-sm text-black/70">
            {new Date(app.created_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-xs text-black/40 mt-1">
            {new Date(app.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* CV Viewer modal */}
      {cvOpen && profile.cv_url && (
        <CvViewer
          url={profile.cv_url}
          candidateName={profile.full_name}
          onClose={() => setCvOpen(false)}
        />
      )}

      {/* Notify modal */}
      {showNotify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <h2 className="font-display text-lg font-bold text-black">Notify Candidate</h2>
                <p className="text-xs text-black/40 mt-0.5">Email to {profile.email}</p>
              </div>
              <button onClick={() => setShowNotify(false)} className="p-2 rounded-lg hover:bg-gray-100 text-black/40">
                <X size={18} weight="bold" />
              </button>
            </div>

            {notifySent ? (
              <div className="px-6 py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <Check size={24} weight="bold" className="text-green-500" />
                </div>
                <p className="font-semibold text-black mb-1">Email sent</p>
                <p className="text-sm text-black/50 mb-6">{profile.full_name} has been notified.</p>
                <button onClick={() => setShowNotify(false)} className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90">
                  Done
                </button>
              </div>
            ) : (
              <div className="px-6 py-5">
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Status to notify as</label>
                  <select
                    value={notifyStatus}
                    onChange={e => {
                      const s = e.target.value as NotifiableStatus
                      setNotifyStatus(s)
                      setNotifyMsg(DEFAULT_STATUS_MESSAGES[s](profile.full_name, job?.title ?? null))
                    }}
                    className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white"
                  >
                    {(STATUS_OPTIONS.filter(s => s !== 'pending') as NotifiableStatus[]).map(s => (
                      <option key={s} value={s}>{statusLabel(s)}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-2">Message</label>
                  <textarea
                    rows={7}
                    value={notifyMsg}
                    onChange={e => setNotifyMsg(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue resize-none leading-relaxed"
                  />
                </div>
                {notifyError && <p className="text-sm text-red-500 mb-3">{notifyError}</p>}
                <div className="flex gap-3">
                  <button onClick={() => setShowNotify(false)} className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5">
                    Cancel
                  </button>
                  <button
                    onClick={sendNotification}
                    disabled={!notifyMsg.trim() || notifyPending}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 disabled:opacity-40"
                  >
                    <EnvelopeSimple size={16} weight="bold" />
                    {notifyPending ? 'Sending…' : 'Send'}
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
