'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { createCandidateProfile } from './actions'

type UserType = 'jobseeker' | 'employer'

export default function RegisterPage() {
  const [userType, setUserType]     = useState<UserType>('jobseeker')
  const [firstName, setFirstName]   = useState('')
  const [lastName, setLastName]     = useState('')
  const [company, setCompany]       = useState('')
  const [email, setEmail]           = useState('')
  const [phone, setPhone]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [error, setError]           = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

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

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (userType === 'jobseeker' && data.user) {
        try {
          await createCandidateProfile({
            userId:   data.user.id,
            fullName,
            email,
            phone: phone.trim(),
          })
        } catch (err) {
          setError('Account created but profile setup failed. Please contact support.')
          return
        }
        router.push('/candidate/profile/setup')
      } else {
        router.push('/auth/login?registered=1')
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col p-12">
        <Link href="/" className="mb-auto">
          <Image src="/images/Emc Logo header.png" alt="EMC" width={140} height={42} className="h-9 w-auto object-contain brightness-0 invert" />
        </Link>
        <div>
          <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Join EMC</p>
          <h2 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            {userType === 'jobseeker'
              ? 'Your next opportunity starts here.'
              : 'Find the right people, faster.'}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {userType === 'jobseeker'
              ? 'Create your profile, apply for roles across Sierra Leone, and get matched with opportunities that suit your skills.'
              : "Register as an employer to submit placement requests and access EMC's network of pre-screened candidates."}
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
              <div className="text-white/60 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <Image src="/images/Emc Logo header.png" alt="EMC" width={120} height={36} className="h-8 w-auto object-contain" />
            </Link>
          </div>

          <h1 className="font-display text-2xl font-bold text-black mb-2">Create an account</h1>
          <p className="text-black/50 text-sm mb-8">Select your account type to get started</p>

          {/* Type selector */}
          <div className="grid grid-cols-2 gap-2 mb-8 p-1.5 bg-gray-100 rounded-xl">
            {([
              { id: 'jobseeker' as UserType, label: 'Job Seeker', desc: 'Looking for work' },
              { id: 'employer'  as UserType, label: 'Employer',   desc: 'Hiring talent'   },
            ]).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setUserType(t.id)}
                className={`py-3 px-4 rounded-lg text-center transition-all ${
                  userType === t.id ? 'bg-white shadow-sm text-black' : 'text-black/50 hover:text-black'
                }`}
              >
                <div className="text-sm font-semibold">{t.label}</div>
                <div className="text-xs text-black/40">{t.desc}</div>
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            {userType === 'employer' && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-black mb-2">Company Name *</label>
                <input
                  id="company"
                  type="text"
                  required={userType === 'employer'}
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  placeholder="Your Company Ltd"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email Address *</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="+232 76 000 000"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">Password *</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="Min. 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-black mb-2">Confirm Password *</label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="Repeat password"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="terms" required className="mt-0.5 accent-brand-blue" />
              <label htmlFor="terms" className="text-sm text-black/60 leading-relaxed">
                I agree to EMC&apos;s{' '}
                <a href="#" className="text-brand-blue hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-brand-blue hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-black/50 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-blue font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
