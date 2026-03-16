'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Invalid email or password.')
      } else {
        const role = data.user?.user_metadata?.role
        router.push(role === 'candidate' ? '/candidate/dashboard' : '/dashboard')
        router.refresh()
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col p-12">
        <Link href="/">
          <Image src="/images/Emc Logo header.png" alt="EMC" width={140} height={42} className="h-9 w-auto object-contain brightness-0 invert" />
        </Link>
        <div className="mt-auto">
          <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Admin Portal</p>
          <h2 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            Sierra Leone&apos;s leading recruitment platform.
          </h2>
          <p className="text-white/50 leading-relaxed">
            Manage job listings, review applications, and track your talent roster — all in one place.
          </p>
        </div>
        <div className="flex gap-6 mt-12">
          {[
            { value: '2,500+', label: 'Placements'   },
            { value: '500+',   label: 'Companies'    },
            { value: '98%',    label: 'Success Rate' },
          ].map((s, i) => (
            <div key={i}>
              <div className={`text-xl font-bold mb-0.5 ${i % 2 === 0 ? 'text-brand-blue' : 'text-brand-orange'}`}>{s.value}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <Image src="/images/Emc Logo header.png" alt="EMC" width={120} height={36} className="h-8 w-auto object-contain" />
            </Link>
          </div>

          <h1 className="font-display text-2xl font-bold text-black mb-2">Admin sign in</h1>
          <p className="text-black/50 text-sm mb-8">Sign in to access the EMC dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="you@emc-sl.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
