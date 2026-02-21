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
    description: 'Extensive connections across every major sector in Sierra Leone, built through years of active recruitment and trusted industry partnerships.',
    stat: '11',
    statLabel: 'sectors covered',
  },
  {
    icon: BoltIcon,
    color: 'brand-orange',
    title: 'Fast Turnaround',
    description: 'Most shortlists delivered within 5–10 business days. We move quickly without ever compromising on candidate quality or cultural fit.',
    stat: '48h',
    statLabel: 'avg. first response',
  },
  {
    icon: ShieldCheckIcon,
    color: 'brand-blue',
    title: 'Compliance First',
    description: 'Full adherence to Sierra Leone labour laws, ethical recruitment standards, and regulatory requirements on every single engagement.',
    stat: '100%',
    statLabel: 'compliance rate',
  },
  {
    icon: AdjustmentsHorizontalIcon,
    color: 'brand-orange',
    title: 'Tailored to You',
    description: 'No templates, no generic approaches. Every solution is built specifically around your organisation, your sector, and your goals.',
    stat: '500+',
    statLabel: 'clients served',
  },
]

export default function Features() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-black">
      <div className="container">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Why EMC</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight">
              Trusted expertise,<br />real results.
            </h2>
          </div>
          <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-sm lg:text-right">
            We combine deep local market knowledge with professional rigour to deliver workforce solutions that actually work.
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
                className="group relative p-7 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col gap-5"
              >
                {/* Top row: icon + stat */}
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                    <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold leading-none ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>{a.stat}</div>
                    <div className="text-xs text-black/40 dark:text-white/40 mt-0.5">{a.statLabel}</div>
                  </div>
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
