'use client'
import { useState, useMemo, useTransition } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { updateProfileStatus, updateProfileNotes, updateProfile, deleteProfile } from './actions'
import { cvViewerUrl } from '@/lib/cloudinary'
import type { TalentProfile } from '@/lib/supabase/types'

type ProfileStatus = TalentProfile['status']

const statusStyles: Record<ProfileStatus, string> = {
  active:    'bg-green-50 text-green-700',
  contacted: 'bg-blue-50 text-blue-700',
  placed:    'bg-purple-50 text-purple-700',
  inactive:  'bg-gray-100 text-gray-500',
}

const STATUS_OPTIONS: ProfileStatus[] = ['active', 'contacted', 'placed', 'inactive']

const SECTORS = ['Agriculture','Construction','Government','Healthcare','Hospitality','IT & Telecom','Logistics','Manufacturing','Mining','Retail & FMCG','Security']

function relativeDate(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d < 7)  return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

type EditForm = {
  full_name: string; email: string; phone: string
  location: string; current_role: string
  years_experience: string; qualification: string
  preferred_sector: string; employment_type: string
}

function profileToForm(p: TalentProfile): EditForm {
  return {
    full_name:        p.full_name,
    email:            p.email,
    phone:            p.phone ?? '',
    location:         p.location ?? '',
    current_role:     p.current_role ?? '',
    years_experience: p.years_experience ?? '',
    qualification:    p.qualification ?? '',
    preferred_sector: p.preferred_sector ?? '',
    employment_type:  p.employment_type ?? '',
  }
}

export default function TalentClient({ initialProfiles }: { initialProfiles: TalentProfile[] }) {
  const [profiles, setProfiles]         = useState(initialProfiles)
  const [search, setSearch]             = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Notes inline editing
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue]     = useState('')

  // Profile edit modal
  const [editingProfile, setEditingProfile] = useState<TalentProfile | null>(null)
  const [editForm, setEditForm]             = useState<EditForm | null>(null)

  // Delete confirm
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const [, startTransition] = useTransition()

  const filtered = useMemo(() => profiles.filter(p => {
    const q = search.toLowerCase()
    return (
      (!search       || p.full_name.toLowerCase().includes(q) || (p.current_role ?? '').toLowerCase().includes(q) || p.email.toLowerCase().includes(q)) &&
      (!sectorFilter || p.preferred_sector === sectorFilter) &&
      (!statusFilter || p.status === statusFilter)
    )
  }), [profiles, search, sectorFilter, statusFilter])

  function handleStatusChange(id: string, status: ProfileStatus) {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, status } : p))
    startTransition(async () => { await updateProfileStatus(id, status) })
  }

  function openNotes(p: TalentProfile) {
    setEditingNotes(p.id)
    setNotesValue(p.notes ?? '')
  }

  function saveNotes(id: string) {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, notes: notesValue } : p))
    setEditingNotes(null)
    startTransition(async () => { await updateProfileNotes(id, notesValue) })
  }

  function openEdit(p: TalentProfile) {
    setEditingProfile(p)
    setEditForm(profileToForm(p))
  }

  function closeEdit() {
    setEditingProfile(null)
    setEditForm(null)
  }

  function setField<K extends keyof EditForm>(k: K, v: EditForm[K]) {
    setEditForm(prev => prev ? { ...prev, [k]: v } : prev)
  }

  function saveEdit() {
    if (!editingProfile || !editForm) return
    const data = {
      full_name:        editForm.full_name.trim(),
      email:            editForm.email.trim().toLowerCase(),
      phone:            editForm.phone || null,
      location:         editForm.location || null,
      current_role:     editForm.current_role || null,
      years_experience: editForm.years_experience || null,
      qualification:    editForm.qualification || null,
      preferred_sector: editForm.preferred_sector || null,
      employment_type:  editForm.employment_type || null,
    }
    setProfiles(prev => prev.map(p => p.id === editingProfile.id ? { ...p, ...data } : p))
    closeEdit()
    startTransition(async () => { await updateProfile(editingProfile.id, data) })
  }

  function handleDelete(id: string) {
    setProfiles(prev => prev.filter(p => p.id !== id))
    setConfirmDelete(null)
    startTransition(async () => { await deleteProfile(id) })
  }

  const stats = {
    total:     profiles.length,
    active:    profiles.filter(p => p.status === 'active').length,
    contacted: profiles.filter(p => p.status === 'contacted').length,
    placed:    profiles.filter(p => p.status === 'placed').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Talent Roster</h1>
          <p className="text-black/50 text-sm mt-1">{profiles.length} candidates on file</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total',     value: stats.total,     color: 'text-black'         },
          { label: 'Active',    value: stats.active,    color: 'text-green-600'     },
          { label: 'Contacted', value: stats.contacted, color: 'text-blue-600'      },
          { label: 'Placed',    value: stats.placed,    color: 'text-purple-600'    },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs text-black/40 mb-1">{s.label}</p>
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 mb-5 flex flex-wrap gap-3">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or role..."
          className="flex-1 min-w-48 px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all" />
        <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Sectors</option>
          {SECTORS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50">
                {['Candidate','Current Role','Sector','Experience','CV','Added','Status','Notes',''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-blue text-xs font-bold">{p.full_name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{p.full_name}</p>
                        <p className="text-xs text-black/40">{p.email}</p>
                        {p.phone && <p className="text-xs text-black/40">{p.phone}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-black/70 text-sm">{p.current_role ?? <span className="text-black/30">—</span>}</td>
                  <td className="px-5 py-4 text-black/60 text-xs">{p.preferred_sector ?? '—'}</td>
                  <td className="px-5 py-4 text-black/60 text-xs">{p.years_experience ?? '—'}</td>
                  <td className="px-5 py-4">
                    {p.cv_url
                      ? <a href={cvViewerUrl(p.cv_url)} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-brand-blue hover:underline">View CV</a>
                      : <span className="text-xs text-black/30">No CV</span>}
                  </td>
                  <td className="px-5 py-4 text-xs text-black/50">{relativeDate(p.created_at)}</td>
                  <td className="px-5 py-4">
                    <select value={p.status} onChange={e => handleStatusChange(p.id, e.target.value as ProfileStatus)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none capitalize ${statusStyles[p.status]}`}>
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="bg-white text-black capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    {editingNotes === p.id ? (
                      <div className="flex gap-1.5 items-start">
                        <textarea value={notesValue} onChange={e => setNotesValue(e.target.value)}
                          rows={2} className="text-xs border border-black/10 rounded-lg px-2 py-1.5 resize-none w-40 focus:outline-none focus:border-brand-blue" />
                        <div className="flex flex-col gap-1">
                          <button onClick={() => saveNotes(p.id)} className="text-[10px] font-semibold text-white bg-black px-2 py-1 rounded hover:bg-black/80">Save</button>
                          <button onClick={() => setEditingNotes(null)} className="text-[10px] font-medium text-black/50 hover:text-black">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => openNotes(p)} className="text-xs text-black/40 hover:text-brand-blue transition-colors text-left max-w-[120px] truncate block">
                        {p.notes ? p.notes : <span className="italic">Add note…</span>}
                      </button>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-black/40 hover:text-black" title="Edit profile">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => setConfirmDelete(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-black/40 hover:text-red-500" title="Delete profile">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-12 text-center text-sm text-black/40">No candidates match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit profile modal */}
      {editingProfile && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-black">Edit Profile</h2>
              <button onClick={closeEdit} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-black/50 text-lg leading-none">✕</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
                  <input type="text" value={editForm.full_name} onChange={e => setField('full_name', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email *</label>
                  <input type="email" value={editForm.email} onChange={e => setField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Phone</label>
                  <input type="tel" value={editForm.phone} onChange={e => setField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" placeholder="+232 76 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Location</label>
                  <input type="text" value={editForm.location} onChange={e => setField('location', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" placeholder="Freetown, Sierra Leone" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Current / Most Recent Role</label>
                <input type="text" value={editForm.current_role} onChange={e => setField('current_role', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm" placeholder="e.g. Site Engineer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Years of Experience</label>
                  <select value={editForm.years_experience} onChange={e => setField('years_experience', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    <option value="">Select…</option>
                    {['Less than 1 year','1–3 years','3–5 years','5–10 years','10+ years'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Qualification</label>
                  <select value={editForm.qualification} onChange={e => setField('qualification', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    <option value="">Select…</option>
                    {['WASSCE / O-Level','A-Level / Higher Secondary','Diploma / HND','Bachelor Degree','Master Degree','PhD / Doctorate'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Preferred Sector</label>
                  <select value={editForm.preferred_sector} onChange={e => setField('preferred_sector', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    <option value="">Select…</option>
                    {SECTORS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Employment Preference</label>
                  <select value={editForm.employment_type} onChange={e => setField('employment_type', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    <option value="">Select…</option>
                    {['Permanent only','Contract / Temporary','Open to any'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-5 border-t border-black/5">
              <button onClick={closeEdit}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-colors">
                Cancel
              </button>
              <button onClick={saveEdit} disabled={!editForm.full_name.trim() || !editForm.email.trim()}
                className="flex-1 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-colors disabled:opacity-40">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl">
            <h3 className="font-display text-lg font-bold text-black mb-2">Delete this profile?</h3>
            <p className="text-sm text-black/60 mb-6">This will permanently remove the candidate and all their applications.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete)}
                className="flex-1 px-5 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
