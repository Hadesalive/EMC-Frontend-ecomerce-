'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeSlash, ArrowLeft } from '@phosphor-icons/react'

export default function LoginPage() {
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [isPending, startTransition]  = useTransition()
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
        setError('Invalid email or password. Please try again.')
      } else {
        const role = data.user?.user_metadata?.role
        router.push(role === 'candidate' ? '/candidate/dashboard' : '/dashboard')
        router.refresh()
      }
    })
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[46%] relative overflow-hidden shrink-0">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/images/Emc Logo header.png"
                alt="EMC"
                width={130} height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors no-underline"
            >
              <ArrowLeft size={14} weight="bold" />
              Back to site
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">Admin Portal</p>
            <h2 className="font-display text-4xl font-bold text-white leading-[1.15] tracking-tight">
              Sierra Leone&apos;s<br />leading talent<br />platform.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-[300px]">
              Manage listings, review applications, and track your talent roster — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col bg-[#f7f7f8]">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center px-6 h-14 bg-white border-b border-black/5">
          <Link href="/">
            <Image src="/images/Emc Logo header.png" alt="EMC" width={100} height={30} className="h-7 w-auto object-contain" />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[360px]">

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-[1.6rem] font-bold text-black tracking-tight mb-1">Welcome back</h1>
              <p className="text-sm text-black/40">Sign in to your EMC account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                  placeholder="you@expresssl.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-xs text-brand-blue hover:underline underline-offset-2">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50 transition-colors"
                    tabIndex={-1}
                  >
                    {showPass
                      ? <EyeSlash size={18} />
                      : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <p className="text-sm text-red-600 leading-snug">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 mt-1 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/85 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-[13px] text-black/40 mt-7">
              New to EMC?{' '}
              <Link href="/auth/register" className="text-brand-blue font-semibold hover:underline underline-offset-2">
                Create an account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
