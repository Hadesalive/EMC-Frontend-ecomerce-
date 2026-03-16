import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import UsersClient from './UsersClient'

export const metadata: Metadata = { title: 'Users — EMC' }
export const dynamic = 'force-dynamic'

export type AdminUser = {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
}

export default async function UsersPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.auth.admin.listUsers()
  if (error) throw new Error(error.message)

  const users: AdminUser[] = (data.users ?? []).map(u => ({
    id:              u.id,
    email:           u.email ?? '',
    created_at:      u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
  }))

  return <UsersClient initialUsers={users} />
}
