'use server'
import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'

export async function signIn(_: unknown, formData: FormData) {
  const email    = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createSessionClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: 'Invalid email or password.' }
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createSessionClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}
