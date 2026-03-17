'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { createCandidateProfile } from './actions'

type UserType = 'jobseeker' | 'employer'

export default function RegisterPage() {
  const [userType, setUserType]       = useState<UserType>('jobseeker')
  const [firstName, setFirstName]     = useState('')
  const [lastName, setLastName]       = useState('')
  const [company, setCompany]         = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [password, setPassword]       = useState('')
  const [confirm, setConfirm]         = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [isPending, startTransition]  = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return }

    startTransition(async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: userType === 'jobseeker' ? 'candidate' : 'employer',
          },
        },
      })

      if (signUpError) { setError(signUpError.message); return }

      if (userType === 'jobseeker' && data.user) {
        try {
          await createCandidateProfile({ userId: data.user.id, fullName, email, phone: phone.trim() })
        } catch {
          setError('Account created but profile setup failed. Please contact support.')
          return
        }
        router.push('/candidate/profile/setup')
      } else {
        router.push('/auth/login?registered=1')
      }
    })
  }

  const leftHeading = userType === 'jobseeker'
    ? <>Your next<br />opportunity<br />starts here.</>
    : <>Find the right<br />people,<br />faster.</>

  const leftSub = userType === 'jobseeker'
    ? 'Create your profile, apply for roles across Sierra Leone, and get matched with opportunities that suit your skills.'
    : "Register as an employer to submit placement requests and access EMC's network of pre-screened candidates."

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
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              Back to site
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">Join EMC</p>
            <h2 className="font-display text-4xl font-bold text-white leading-[1.15] tracking-tight transition-all duration-300">
              {leftHeading}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-[300px] transition-all duration-300">
              {leftSub}
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col bg-[#f7f7f8] overflow-y-auto">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center px-6 h-14 bg-white border-b border-black/5 shrink-0">
          <Link href="/">
            <Image src="/images/Emc Logo header.png" alt="EMC" width={100} height={30} className="h-7 w-auto object-contain" />
          </Link>
        </div>

        <div className="flex items-start justify-center px-6 py-10 min-h-full">
          <div className="w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-[1.6rem] font-bold text-black tracking-tight mb-1">Create an account</h1>
              <p className="text-sm text-black/40">Choose your account type to get started</p>
            </div>

            {/* Type toggle */}
            <div className="grid grid-cols-2 gap-1.5 mb-7 p-1.5 bg-black/[0.05] rounded-2xl">
              {([
                { id: 'jobseeker' as UserType, label: 'Job Seeker', sub: 'Looking for work' },
                { id: 'employer'  as UserType, label: 'Employer',   sub: 'Hiring talent'   },
              ]).map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setUserType(t.id)}
                  className={`py-2.5 px-4 rounded-xl text-center transition-all ${
                    userType === t.id
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-black/[0.03]'
                  }`}
                >
                  <div className={`text-sm font-semibold transition-colors ${userType === t.id ? 'text-black' : 'text-black/40'}`}>{t.label}</div>
                  <div className="text-xs text-black/30 mt-0.5">{t.sub}</div>
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">First Name</label>
                  <input
                    type="text" required value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Last Name</label>
                  <input
                    type="text" required value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Company (employer only) */}
              {userType === 'employer' && (
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Company Name</label>
                  <input
                    type="text" required={userType === 'employer'} value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                    placeholder="Your Company Ltd"
                  />
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Email</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                  placeholder="you@email.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Phone <span className="normal-case font-normal text-black/25">(optional)</span></label>
                <input
                  type="tel" value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                  placeholder="+232 76 000 000"
                />
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      required value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pr-10 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                      placeholder="Min. 8 chars"
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)} tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50 transition-colors">
                      {showPass ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">Confirm</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      required value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pr-10 bg-white border border-black/[0.09] rounded-xl text-sm text-black placeholder:text-black/20 focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all"
                      placeholder="Repeat"
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50 transition-colors">
                      {showConfirm ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input type="checkbox" id="terms" required className="mt-0.5 accent-brand-blue" />
                <label htmlFor="terms" className="text-xs text-black/40 leading-relaxed">
                  I agree to EMC&apos;s{' '}
                  <a href="#" className="text-brand-blue hover:underline underline-offset-2">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-brand-blue hover:underline underline-offset-2">Privacy Policy</a>.
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <p className="text-sm text-red-600 leading-snug">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/85 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <p className="text-center text-[13px] text-black/40 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-brand-blue font-semibold hover:underline underline-offset-2">
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
