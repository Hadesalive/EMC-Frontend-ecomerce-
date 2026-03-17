'use client'

import { useState, useTransition } from 'react'
import { createTeamMember, updateTeamMember, deleteTeamMember, toggleTeamMemberActive } from './actions'
import type { TeamMember, BioSection } from '@/lib/cms-types'
import { PencilSquareIcon, TrashIcon, PlusIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { ImageUpload } from '@/components/dashboard/ImageUpload'

const input = 'w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm text-black bg-white placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue/40 transition'
const textarea = `${input} resize-none`

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-black/50 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

// ─── Member form (create / edit) ─────────────────────────────────────────────

const EMPTY: Omit<TeamMember, 'id' | 'is_active'> = {
  name: '',
  title: '',
  tagline: '',
  short_bio: '',
  sections: [{ paragraphs: [''] }],
  credentials: [],
  specialisms: [],
  image_url: '',
  color: 'brand-blue',
  display_order: 99,
}

function MemberForm({
  initial,
  onSave,
  onCancel,
  isPending,
}: {
  initial: Omit<TeamMember, 'id' | 'is_active'>
  onSave: (data: Omit<TeamMember, 'id' | 'is_active'>) => void
  onCancel: () => void
  isPending: boolean
}) {
  const [data, setData] = useState(initial)

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  // Bio sections helpers
  function setSectionField(si: number, key: keyof BioSection, value: string | string[]) {
    setData(prev => {
      const sections = [...prev.sections]
      sections[si] = { ...sections[si], [key]: value }
      return { ...prev, sections }
    })
  }

  function addSection() {
    setData(prev => ({ ...prev, sections: [...prev.sections, { paragraphs: [''] }] }))
  }

  function removeSection(si: number) {
    setData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== si) }))
  }

  // Parse textarea lines to array
  function parseLines(text: string): string[] {
    return text.split('\n').map(l => l.trim()).filter(Boolean)
  }

  function joinLines(arr: string[] | undefined): string {
    return (arr ?? []).join('\n')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Basic info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name">
          <input type="text" required className={input} value={data.name} onChange={e => set('name', e.target.value)} />
        </Field>
        <Field label="Job title">
          <input type="text" required className={input} value={data.title} onChange={e => set('title', e.target.value)} />
        </Field>
        <Field label="Tagline (optional)">
          <input type="text" className={input} value={data.tagline ?? ''} onChange={e => set('tagline', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Colour">
            <select
              className={input}
              value={data.color}
              onChange={e => set('color', e.target.value as 'brand-blue' | 'brand-orange')}
            >
              <option value="brand-blue">Blue</option>
              <option value="brand-orange">Orange</option>
            </select>
          </Field>
          <Field label="Display order">
            <input type="number" className={input} value={data.display_order} onChange={e => set('display_order', Number(e.target.value))} />
          </Field>
        </div>
      </div>

      <Field label="Short bio (shown on card)">
        <textarea rows={3} required className={textarea} value={data.short_bio} onChange={e => set('short_bio', e.target.value)} />
      </Field>

      <Field label="Photo">
        <ImageUpload
          value={data.image_url ?? ''}
          onChange={url => set('image_url', url)}
          alt={data.name}
          aspect="portrait"
        />
      </Field>

      {/* Credentials */}
      <Field label="Credentials (one per line)">
        <textarea
          rows={3}
          className={textarea}
          value={joinLines(data.credentials)}
          onChange={e => set('credentials', parseLines(e.target.value))}
          placeholder="Master of Laws (LLM) — University of Essex&#10;Bachelor of Science — University of Sierra Leone"
        />
      </Field>

      {/* Specialisms */}
      <Field label="Specialisms (one per line)">
        <textarea
          rows={3}
          className={textarea}
          value={joinLines(data.specialisms)}
          onChange={e => set('specialisms', parseLines(e.target.value))}
          placeholder="Executive Search&#10;HR Advisory"
        />
      </Field>

      {/* Bio sections */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-black/50 uppercase tracking-wider">Bio Sections</p>
          <button type="button" onClick={addSection} className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-blue/70 transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add section
          </button>
        </div>
        {data.sections.map((sec, si) => (
          <div key={si} className="border border-black/5 rounded-xl p-4 space-y-3 relative">
            <div className="flex items-center justify-between">
              <Field label={`Section ${si + 1} heading (optional)`}>
                <input type="text" className={input} value={sec.heading ?? ''} onChange={e => setSectionField(si, 'heading', e.target.value || undefined as unknown as string)} placeholder="Leave blank for no heading" />
              </Field>
              {data.sections.length > 1 && (
                <button type="button" onClick={() => removeSection(si)} className="ml-3 mt-5 p-1.5 rounded-lg hover:bg-red-50 text-black/30 hover:text-red-500 transition-colors flex-shrink-0">
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <Field label="Paragraphs (one per line, blank line = new paragraph)">
              <textarea
                rows={5}
                className={textarea}
                value={joinLines(sec.paragraphs)}
                onChange={e => setSectionField(si, 'paragraphs', parseLines(e.target.value))}
              />
            </Field>
            <Field label="Bullet points (one per line, leave blank for none)">
              <textarea
                rows={4}
                className={textarea}
                value={joinLines(sec.bullets)}
                onChange={e => setSectionField(si, 'bullets', parseLines(e.target.value))}
              />
            </Field>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/5">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-black/10 text-black/60 text-sm font-semibold rounded-xl hover:bg-black/5 transition-all">
          Cancel
        </button>
        <button type="submit" disabled={isPending} className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 disabled:opacity-50 transition-all">
          {isPending ? 'Saving…' : 'Save member'}
        </button>
      </div>
    </form>
  )
}

// ─── Main team editor ─────────────────────────────────────────────────────────

export function TeamEditor({ members: initial }: { members: TeamMember[] }) {
  const [members, setMembers] = useState(initial)
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const editingMember = editing && editing !== 'new'
    ? members.find(m => m.id === editing) ?? null
    : null

  function handleCreate(data: Omit<TeamMember, 'id' | 'is_active'>) {
    setError(null)
    startTransition(async () => {
      try {
        await createTeamMember({ ...data, is_active: true } as Parameters<typeof createTeamMember>[0])
        // Refresh list from server by triggering a page reload
        window.location.reload()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save')
      }
    })
  }

  function handleUpdate(id: string, data: Omit<TeamMember, 'id' | 'is_active'>) {
    setError(null)
    const member = members.find(m => m.id === id)
    startTransition(async () => {
      try {
        await updateTeamMember(id, { ...data, is_active: member?.is_active ?? true } as Parameters<typeof updateTeamMember>[1])
        window.location.reload()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save')
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this team member? This cannot be undone.')) return
    setError(null)
    startTransition(async () => {
      try {
        await deleteTeamMember(id)
        setMembers(prev => prev.filter(m => m.id !== id))
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to delete')
      }
    })
  }

  function handleToggleActive(id: string, is_active: boolean) {
    setError(null)
    startTransition(async () => {
      try {
        await toggleTeamMemberActive(id, !is_active)
        setMembers(prev => prev.map(m => m.id === id ? { ...m, is_active: !is_active } : m))
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to update')
      }
    })
  }

  if (editing === 'new') {
    return (
      <div className="bg-white border border-black/5 rounded-2xl p-7">
        <h2 className="font-display text-base font-bold text-black mb-6">Add Team Member</h2>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <MemberForm
          initial={EMPTY}
          onSave={handleCreate}
          onCancel={() => setEditing(null)}
          isPending={isPending}
        />
      </div>
    )
  }

  if (editing && editingMember) {
    const { id, is_active, ...rest } = editingMember
    return (
      <div className="bg-white border border-black/5 rounded-2xl p-7">
        <h2 className="font-display text-base font-bold text-black mb-6">Edit — {editingMember.name}</h2>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <MemberForm
          initial={rest}
          onSave={(data) => handleUpdate(id, data)}
          onCancel={() => setEditing(null)}
          isPending={isPending}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Member cards */}
      {members.map(member => {
        const isBlue = member.color === 'brand-blue'
        const initials = member.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2)
        return (
          <div
            key={member.id}
            className={`bg-white border rounded-2xl p-5 flex items-center gap-4 ${member.is_active ? 'border-black/5' : 'border-black/5 opacity-60'}`}
          >
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${isBlue ? 'bg-brand-blue' : 'bg-brand-orange'}`}>
              {member.image_url
                ? <img src={member.image_url} alt={member.name} className="w-full h-full rounded-full object-cover" />
                : initials
              }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-black text-sm">{member.name}</p>
                {!member.is_active && <span className="text-xs px-2 py-0.5 bg-black/5 text-black/40 rounded-full">Hidden</span>}
              </div>
              <p className={`text-xs font-medium ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>{member.title}</p>
              <p className="text-xs text-black/40 mt-0.5 line-clamp-1">{member.short_bio}</p>
            </div>

            {/* Order badge */}
            <span className="text-xs text-black/30 font-mono w-8 text-center flex-shrink-0">#{member.display_order}</span>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => handleToggleActive(member.id, member.is_active)}
                title={member.is_active ? 'Hide from website' : 'Show on website'}
                disabled={isPending}
                className="p-2 rounded-lg hover:bg-black/5 text-black/30 hover:text-black/60 transition-colors"
              >
                {member.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setEditing(member.id)}
                className="p-2 rounded-lg hover:bg-brand-blue/10 text-black/30 hover:text-brand-blue transition-colors"
              >
                <PencilSquareIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                disabled={isPending}
                className="p-2 rounded-lg hover:bg-red-50 text-black/30 hover:text-red-500 transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}

      {/* Add button */}
      <button
        onClick={() => setEditing('new')}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-black/10 rounded-2xl text-sm font-semibold text-black/40 hover:text-black/60 hover:border-black/20 transition-all"
      >
        <PlusIcon className="w-4 h-4" />
        Add team member
      </button>
    </div>
  )
}
