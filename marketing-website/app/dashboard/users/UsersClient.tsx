'use client'
import { useState, useTransition } from 'react'
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { createUser, updateUserEmail, updateUserPassword, deleteUser } from './actions'
import type { AdminUser } from './page'

function relativeDate(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  if (d < 7)  return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

type Modal =
  | { type: 'create' }
  | { type: 'edit_email';    user: AdminUser }
  | { type: 'edit_password'; user: AdminUser }
  | { type: 'delete';        user: AdminUser }

export default function UsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers]       = useState(initialUsers)
  const [modal, setModal]       = useState<Modal | null>(null)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [isPending, start]      = useTransition()

  function openCreate() {
    setEmail(''); setPassword(''); setError(null); setShowPw(false)
    setModal({ type: 'create' })
  }

  function openEditEmail(user: AdminUser) {
    setEmail(user.email); setError(null)
    setModal({ type: 'edit_email', user })
  }

  function openEditPassword(user: AdminUser) {
    setPassword(''); setError(null); setShowPw(false)
    setModal({ type: 'edit_password', user })
  }

  function closeModal() { setModal(null); setError(null) }

  function handleCreate() {
    if (!email.trim() || !password.trim()) return
    setError(null)
    start(async () => {
      try {
        await createUser(email.trim().toLowerCase(), password)
        // Reload page to get fresh user list from Supabase
        window.location.reload()
      } catch (e) { setError(e instanceof Error ? e.message : 'Failed to create user') }
    })
  }

  function handleUpdateEmail() {
    if (modal?.type !== 'edit_email' || !email.trim()) return
    setError(null)
    start(async () => {
      try {
        await updateUserEmail(modal.user.id, email.trim().toLowerCase())
        setUsers(prev => prev.map(u => u.id === modal.user.id ? { ...u, email: email.trim().toLowerCase() } : u))
        closeModal()
      } catch (e) { setError(e instanceof Error ? e.message : 'Failed to update email') }
    })
  }

  function handleUpdatePassword() {
    if (modal?.type !== 'edit_password' || !password.trim()) return
    setError(null)
    start(async () => {
      try {
        await updateUserPassword(modal.user.id, password)
        closeModal()
      } catch (e) { setError(e instanceof Error ? e.message : 'Failed to update password') }
    })
  }

  function handleDelete() {
    if (modal?.type !== 'delete') return
    setError(null)
    start(async () => {
      try {
        await deleteUser(modal.user.id)
        setUsers(prev => prev.filter(u => u.id !== modal.user.id))
        closeModal()
      } catch (e) { setError(e instanceof Error ? e.message : 'Failed to delete user') }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Users</h1>
          <p className="text-black/50 text-sm mt-1">{users.length} admin account{users.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-colors">
          <PlusIcon className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 bg-gray-50">
              {['User', 'Created', 'Last sign-in', ''].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50/70 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{u.email.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-black">{u.email}</p>
                      <p className="text-xs text-black/30 font-mono">{u.id.slice(0, 8)}…</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-black/50">{relativeDate(u.created_at)}</td>
                <td className="px-5 py-4 text-xs text-black/50">
                  {u.last_sign_in_at ? relativeDate(u.last_sign_in_at) : <span className="text-black/25">Never</span>}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditEmail(u)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-black/40 hover:text-black" title="Change email">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => openEditPassword(u)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-black/40 hover:text-black" title="Change password">
                      <EyeSlashIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setError(null); setModal({ type: 'delete', user: u }) }}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-black/40 hover:text-red-500" title="Delete user">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-sm text-black/40">No users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Create user modal ── */}
      {modal?.type === 'create' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-black">Add User</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-black/50">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm"
                  placeholder="admin@emcsl.com" autoFocus />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm pr-11"
                    placeholder="Min. 8 characters" />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black">
                    {showPw ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="flex gap-3 mt-6 pt-5 border-t border-black/5">
              <button onClick={closeModal}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5">Cancel</button>
              <button onClick={handleCreate} disabled={!email.trim() || !password.trim() || isPending}
                className="flex-1 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 disabled:opacity-40">
                {isPending ? 'Creating…' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit email modal ── */}
      {modal?.type === 'edit_email' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-black">Change Email</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-black/50">✕</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">New Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm"
                autoFocus />
            </div>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
            <div className="flex gap-3 mt-6 pt-5 border-t border-black/5">
              <button onClick={closeModal}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5">Cancel</button>
              <button onClick={handleUpdateEmail} disabled={!email.trim() || isPending}
                className="flex-1 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 disabled:opacity-40">
                {isPending ? 'Saving…' : 'Save Email'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit password modal ── */}
      {modal?.type === 'edit_password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-black">Change Password</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-black/50">✕</button>
            </div>
            <p className="text-sm text-black/50 mb-4">{modal.user.email}</p>
            <div>
              <label className="block text-sm font-medium text-black mb-2">New Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm pr-11"
                  placeholder="Min. 8 characters" autoFocus />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black">
                  {showPw ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
            <div className="flex gap-3 mt-6 pt-5 border-t border-black/5">
              <button onClick={closeModal}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5">Cancel</button>
              <button onClick={handleUpdatePassword} disabled={password.length < 8 || isPending}
                className="flex-1 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 disabled:opacity-40">
                {isPending ? 'Saving…' : 'Save Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm modal ── */}
      {modal?.type === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl">
            <h3 className="font-display text-lg font-bold text-black mb-2">Delete this user?</h3>
            <p className="text-sm text-black/60 mb-1">
              <span className="font-semibold text-black">{modal.user.email}</span> will lose all access immediately.
            </p>
            <p className="text-sm text-red-500 mb-6">This cannot be undone.</p>
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
            <div className="flex gap-3">
              <button onClick={closeModal}
                className="flex-1 px-5 py-2.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5">Cancel</button>
              <button onClick={handleDelete} disabled={isPending}
                className="flex-1 px-5 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 disabled:opacity-40">
                {isPending ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
