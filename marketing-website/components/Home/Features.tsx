import React from 'react'
import Link from 'next/link'
import {
  GlobeAltIcon,
  BoltIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'

const advantages = [
  {
    icon: GlobeAltIcon,
    color: 'brand-blue',
    title: 'Deep Local Network',
    description: 'Our consultants have worked directly inside the industries we recruit for — construction, mining, healthcare, hospitality, and more. We know what good looks like in each sector.',
  },
  {
    icon: BoltIcon,
    color: 'brand-orange',
    title: 'Fast Turnaround',
    description: 'We respond to every brief within 48 hours and deliver a qualified shortlist within 5–10 working days. You will never be left waiting without a clear update.',
  },
  {
    icon: ShieldCheckIcon,
    color: 'brand-blue',
    title: 'Compliance First',
    description: 'Every engagement is conducted within Sierra Leone\'s labour laws and professional recruitment ethics. We will not cut corners to make a placement faster.',
  },
  {
    icon: AdjustmentsHorizontalIcon,
    color: 'brand-orange',
    title: 'No Generic Approaches',
    description: 'We don\'t send bulk CVs and hope one fits. Every role gets a dedicated search — we take the brief seriously before we start sourcing.',
  },
]

export default function Features() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-white/5">
      <div className="container">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Why EMC</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight">
              How we work,<br />and why it matters.
            </h2>
          </div>
          <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-sm lg:text-right">
            We built EMC because Sierra Leone's job market deserves a recruitment firm that actually knows it.
          </p>
        </div>

        {/* 4-col advantage cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((a, i) => {
            const Icon = a.icon
            const isBlue = a.color === 'brand-blue'
            return (
              <div
                key={i}
                className="group relative p-7 rounded-2xl border border-black/8 dark:border-white/5 hover:border-black/15 dark:hover:border-white/10 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col gap-5"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                  <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-display text-base font-bold text-black dark:text-white mb-2">{a.title}</h3>
                  <p className="text-black/55 dark:text-white/55 text-sm leading-relaxed">{a.description}</p>
                </div>

              </div>
            )
          })}
        </div>

        {/* Link */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline"
        >
          Learn more about us
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

      </div>
    </section>
  )
}
