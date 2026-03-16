'use client'
import { useTransition } from 'react'
import type { CandidateNotification } from '@/lib/supabase/types'
import { markNotificationRead, markAllRead } from './actions'

const TYPE_ICONS: Record<CandidateNotification['type'], React.ReactNode> = {
  application_status: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  new_match: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  message: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  system: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function NotificationList({
  notifications,
  profileId,
}: {
  notifications: CandidateNotification[]
  profileId: string
}) {
  const [isPending, start] = useTransition()
  const unreadCount = notifications.filter(n => !n.is_read).length

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-12 text-center">
        <svg className="w-10 h-10 text-black/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p className="text-black/40 text-sm">No notifications yet.</p>
      </div>
    )
  }

  return (
    <div>
      {unreadCount > 0 && (
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={() => start(() => markAllRead(profileId))}
            disabled={isPending}
            className="text-xs text-brand-blue hover:underline disabled:opacity-50"
          >
            Mark all as read
          </button>
        </div>
      )}
      <ul role="list" className="space-y-3">
        {notifications.map(n => (
          <li
            key={n.id}
            role="listitem"
            className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
              n.is_read ? 'bg-white border-black/5' : 'bg-brand-blue/5 border-brand-blue/10'
            }`}
          >
            <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${n.is_read ? 'bg-gray-100 text-black/40' : 'bg-brand-blue/10 text-brand-blue'}`}>
              {TYPE_ICONS[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${n.is_read ? 'text-black/70' : 'text-black'}`}>{n.title}</p>
              <p className="text-sm text-black/50 mt-0.5 leading-relaxed">{n.message}</p>
              <p className="text-xs text-black/30 mt-1.5">
                {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {!n.is_read && (
              <button
                type="button"
                onClick={() => start(() => markNotificationRead(n.id))}
                disabled={isPending}
                aria-label="Mark as read"
                className="shrink-0 mt-1 text-black/30 hover:text-brand-blue transition-colors disabled:opacity-40"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
