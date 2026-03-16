import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import DashboardShell from './DashboardShell'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return <DashboardShell userEmail={user.email ?? ''}>{children}</DashboardShell>
}
