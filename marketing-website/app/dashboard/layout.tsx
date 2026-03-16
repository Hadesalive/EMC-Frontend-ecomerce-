import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import DashboardShell from './DashboardShell'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Candidates belong in the candidate portal, not the admin dashboard
  if (user.user_metadata?.role === 'candidate') redirect('/candidate/dashboard')

  return <DashboardShell userEmail={user.email ?? ''}>{children}</DashboardShell>
}
