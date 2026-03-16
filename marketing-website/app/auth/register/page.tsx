'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type UserType = 'jobseeker' | 'employer'

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>('jobseeker')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-black/5 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-black mb-3">Account Created</h2>
          <p className="text-black/60 leading-relaxed mb-6">
            {userType === 'jobseeker'
              ? 'Welcome! Browse open positions and apply for roles that match your skills.'
              : 'Welcome! You can now submit placement requests and track your hiring pipeline.'}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={userType === 'jobseeker' ? '/jobs' : '/request-placement'}
              className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all no-underline"
            >
              {userType === 'jobseeker' ? 'Browse Jobs' : 'Request a Placement'}
            </Link>
            <Link href="/auth/login" className="px-6 py-3 border border-black/15 text-black text-sm font-semibold rounded-lg hover:bg-black/5 transition-all no-underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    )
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
          <p className="text-white/50 leading-relaxed">
            {userType === 'jobseeker'
              ? 'Register to apply for roles across Sierra Leone and get matched with opportunities that suit your skills and ambitions.'
              : 'Register as an employer to submit placement requests and access EMC\'s network of pre-screened, qualified candidates.'}
          </p>
        </div>
        <div className="flex gap-6 mt-12">
          {[
            { value: '2,500+', label: 'Placements' },
            { value: '500+', label: 'Companies' },
            { value: '98%', label: 'Success Rate' },
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

          <h1 className="font-display text-2xl font-bold text-black mb-2">Create an account</h1>
          <p className="text-black/50 text-sm mb-8">Select your account type to get started</p>

          {/* Type selector */}
          <div className="grid grid-cols-2 gap-2 mb-8 p-1.5 bg-gray-100 rounded-xl">
            {([
              { id: 'jobseeker' as UserType, label: 'Job Seeker', desc: 'Looking for work' },
              { id: 'employer' as UserType, label: 'Employer', desc: 'Hiring talent' },
            ]).map((t) => (
              <button
                key={t.id}
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

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            {userType === 'employer' && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  placeholder="Your Company Ltd"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address *</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="+232 76 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Password *</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="Min. 8 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Confirm Password *</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                placeholder="Repeat password"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="terms" required className="mt-0.5 accent-brand-blue" />
              <label htmlFor="terms" className="text-sm text-black/60 leading-relaxed">
                I agree to EMC&apos;s{' '}
                <a href="#" className="text-brand-blue hover:underline no-underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-brand-blue hover:underline no-underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-black/50 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-blue font-medium hover:underline no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
