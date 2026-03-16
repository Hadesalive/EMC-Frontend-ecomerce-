import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import type { CandidateNotification } from '@/lib/supabase/types'
import NotificationList from './NotificationList'

export default async function NotificationsPage() {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('talent_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) redirect('/candidate/profile/setup')

  const { data: notifications } = await supabase
    .from('candidate_notifications')
    .select('*')
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false }) as { data: CandidateNotification[] | null }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Notifications</h1>
          <p className="text-black/50 text-sm mt-0.5">
            {(notifications ?? []).filter(n => !n.is_read).length} unread
          </p>
        </div>
      </div>

      <NotificationList notifications={notifications ?? []} profileId={profile.id} />
    </div>
  )
}
