'use client'
import { useState, useTransition, useRef } from 'react'
import Image from 'next/image'
import {
  PlusIcon, TrashIcon, EyeIcon, EyeSlashIcon, MapPinIcon, PhotoIcon, PencilIcon,
} from '@heroicons/react/24/outline'
import type { JobRow } from '@/lib/supabase/types'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { createJob, updateJob, toggleJobActive, deleteJob } from './actions'

type JobForm = {
  title: string; sector: string; type: string; location: string
  description: string; salary_range: string; urgent: boolean
  responsibilities: string; requirements: string; nice_to_have: string
  image_url: string | null
}

const emptyForm: JobForm = {
  title: '', sector: '', type: 'Permanent', location: 'Freetown',
  description: '', salary_range: '', urgent: false,
  responsibilities: '', requirements: '', nice_to_have: '',
  image_url: null,
}

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

function jobToForm(job: JobRow): JobForm {
  return {
    title:           job.title,
    sector:          job.sector,
    type:            job.type,
    location:        job.location,
    description:     job.description,
    salary_range:    job.salary_range ?? '',
    urgent:          job.urgent,
    responsibilities: job.responsibilities.join('\n'),
    requirements:     job.requirements.join('\n'),
    nice_to_have:     job.nice_to_have.join('\n'),
    image_url:        job.image_url,
  }
}

export default function DashboardJobsClient({ initialJobs }: { initialJobs: JobRow[] }) {
  const [jobs, setJobs]               = useState<JobRow[]>(initialJobs)
  const [editingJob, setEditingJob]   = useState<JobRow | null>(null)   // null = creating
  const [showModal, setShowModal]     = useState(false)
  const [form, setForm]               = useState<JobForm>(emptyForm)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [uploading, setUploading]     = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition]  = useTransition()

  const set = <K extends keyof JobForm>(k: K, v: JobForm[K]) => setForm(p => ({ ...p, [k]: v }))

  function openCreate() {
    setEditingJob(null)
    setForm(emptyForm)
    setImagePreview(null)
    setShowModal(true)
  }

  function openEdit(job: JobRow) {
    setEditingJob(job)
    setForm(jobToForm(job))
    setImagePreview(job.image_url)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingJob(null)
    setForm(emptyForm)
    setImagePreview(null)
  }

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      set('image_url', url)
    } catch {
      alert('Image upload failed.')
      setImagePreview(editingJob?.image_url ?? null)
    } finally {
      setUploading(false)
    }
  }

  function buildPayload() {
    return {
      title:            form.title.trim(),
      sector:           form.sector,
      type:             form.type,
      location:         form.location,
      description:      form.description.trim(),
      salary_range:     form.salary_range.trim(),
      urgent:           form.urgent,
      image_url:        form.image_url,
      responsibilities: form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
      requirements:     form.requirements.split('\n').map(s => s.trim()).filter(Boolean),
      nice_to_have:     form.nice_to_have.split('\n').map(s => s.trim()).filter(Boolean),
    }
  }

  function handleSave() {
    if (!form.title.trim() || !form.sector) return
    const payload = buildPayload()
    if (editingJob) {
      // Update
      setJobs(prev => prev.map(j => j.id === editingJob.id ? { ...j, ...payload, type: payload.type as JobRow['type'] } : j))
      closeModal()
      startTransition(async () => { await updateJob(editingJob.id, payload) })
    } else {
      // Create
      closeModal()
      startTransition(async () => {
        await createJob(payload)
      })
    }
  }

  function handleToggle(id: string, current: boolean) {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, is_active: !current } : j))
    startTransition(async () => { await toggleJobActive(id, !current) })
  }

  function handleDelete(id: string) {
    setJobs(prev => prev.filter(j => j.id !== id))
    setConfirmDelete(null)
    startTransition(async () => { await deleteJob(id) })
  }

  const SECTORS = ['Agriculture','Construction','Government','Healthcare','Hospitality','IT & Telecom','Logistics','Manufacturing','Mining','Retail & FMCG','Security']
  const LOCATIONS = ['Freetown','Bo District','Kenema','Kono District','Makeni']

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Job Listings</h1>
          <p className="text-black/50 text-sm mt-1">{jobs.length} total positions</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-colors">
          <PlusIcon className="w-4 h-4" />
          Post a Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Posted',    value: jobs.length,                          color: 'text-black' },
          { label: 'Active Listings', value: jobs.filter(j => j.is_active).length, color: 'text-brand-blue' },
          { label: 'Urgent Roles',    value: jobs.filter(j => j.urgent).length,    color: 'text-brand-orange' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-black/5 p-5">
            <p className="text-xs text-black/40 mb-1">{s.label}</p>
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50">
                {['Title','Sector','Type','Location','Posted','Status',''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      {job.image_url && (
                        <Image src={job.image_url} alt="" width={32} height={32} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-black">{job.title}</span>
                          {job.urgent && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-500">Urgent</span>}
                        </div>
                        <p className="text-xs text-black/40 mt-0.5">{job.salary_range ?? '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-black/60 text-xs">{job.sector}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeStyles[job.type]}`}>{job.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-xs text-black/60">
                      <MapPinIcon className="w-3 h-3 flex-shrink-0" />{job.location}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-black/50">{relativeDate(job.created_at)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${job.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(job)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-black/40 hover:text-black" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggle(job.id, job.is_active)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-black/40 hover:text-black"
                        title={job.is_active ? 'Deactivate' : 'Activate'}>
                        {job.is_active ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setConfirmDelete(job.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-black/40 hover:text-red-500" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-black/40">No jobs posted yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-black">
                {editingJob ? 'Edit Job' : 'Post a New Job'}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-black/50 text-lg leading-none">✕</button>
            </div>

            <div className="space-y-4">
              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Company / Role Image</label>
                <div onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-4 p-4 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:border-brand-blue/40 transition-colors">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" width={56} height={56} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <PhotoIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-black">{uploading ? 'Uploading…' : imagePreview ? 'Change image' : 'Upload image'}</p>
                    <p className="text-xs text-black/40 mt-0.5">PNG, JPG or WEBP · optional</p>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Job Title *</label>
                <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm"
                  placeholder="e.g. Site Engineer" />
              </div>

              {/* Sector + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Sector *</label>
                  <select value={form.sector} onChange={e => set('sector', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    <option value="">Select…</option>
                    {SECTORS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Type</label>
                  <select value={form.type} onChange={e => set('type', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    {['Permanent','Contract','Temporary'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Location + Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Location</label>
                  <select value={form.location} onChange={e => set('location', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm bg-white text-black/70">
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Salary Range</label>
                  <input type="text" value={form.salary_range} onChange={e => set('salary_range', e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm"
                    placeholder="e.g. SLL 8M – 12M / month" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Description</label>
                <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm resize-none"
                  placeholder="Describe the role…" />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">Responsibilities <span className="text-black/40 font-normal text-xs">— one per line</span></label>
                <textarea rows={4} value={form.responsibilities} onChange={e => set('responsibilities', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm resize-none"
                  placeholder={"Oversee site operations\nCoordinate with contractors"} />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">Requirements <span className="text-black/40 font-normal text-xs">— one per line</span></label>
                <textarea rows={4} value={form.requirements} onChange={e => set('requirements', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm resize-none"
                  placeholder={"Bachelor's degree in Engineering\n3+ years experience"} />
              </div>

              {/* Nice to have */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">Nice to Have <span className="text-black/40 font-normal text-xs">— optional, one per line</span></label>
                <textarea rows={3} value={form.nice_to_have} onChange={e => set('nice_to_have', e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm resize-none"
                  placeholder={"Experience with NGOs\nFrench language skills"} />
              </div>

              {/* Urgent */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.urgent} onChange={e => set('urgent', e.target.checked)} className="accent-brand-orange w-4 h-4" />
                <span className="text-sm font-medium text-black">Mark as Urgent</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6 pt-5 border-t border-black/5">
              <button onClick={closeModal}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave}
                disabled={!form.title.trim() || !form.sector || uploading || isPending}
                className="flex-1 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {isPending ? 'Saving…' : editingJob ? 'Save Changes' : 'Post Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl">
            <h3 className="font-display text-lg font-bold text-black mb-2">Delete this job?</h3>
            <p className="text-sm text-black/60 mb-6">This will permanently remove the listing and cannot be undone.</p>
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
