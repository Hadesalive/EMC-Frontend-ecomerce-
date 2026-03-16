import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import CandidateShell from './CandidateShell'

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const role = user.user_metadata?.role
  if (role && role !== 'candidate') redirect('/dashboard')

  return <CandidateShell user={user}>{children}</CandidateShell>
}
