'use server'
import { createAdminClient } from '@/lib/supabase/server'

export async function createUser(email: string, password: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (error) throw new Error(error.message)
}

export async function updateUserEmail(id: string, email: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.updateUserById(id, { email })
  if (error) throw new Error(error.message)
}

export async function updateUserPassword(id: string, password: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.updateUserById(id, { password })
  if (error) throw new Error(error.message)
}

export async function deleteUser(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error) throw new Error(error.message)
}
