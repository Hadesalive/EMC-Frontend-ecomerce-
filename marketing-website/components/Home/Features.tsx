import React from 'react'
import Link from 'next/link'
import { UsersThree, Hourglass, Scales, Fingerprint } from '@phosphor-icons/react/dist/ssr'
import type { FeaturesContent, Advantage } from '@/lib/cms-types'
import { DEFAULT_FEATURES } from '@/lib/cms-types'

const iconMap: Record<string, React.ElementType> = {
  globe:   UsersThree,   // Deep Local Network — people, not a globe
  bolt:    Hourglass,    // Fast Turnaround — time, not a bolt
  shield:  Scales,       // Compliance First — justice/law, not a shield
  sliders: Fingerprint,  // No Generic Approaches — unique identity, not sliders
}

export default function Features({ content }: { content?: Partial<FeaturesContent> }) {
  const c: FeaturesContent = {
    ...DEFAULT_FEATURES,
    ...content,
    advantages: content?.advantages ?? DEFAULT_FEATURES.advantages,
  }

  return (
    <section className="py-14 lg:py-32 bg-black">
      <div className="container">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-16 gap-4 lg:gap-6">
          <div>
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">{c.section_label}</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {c.heading}
            </h2>
          </div>
          <p className="text-white/50 leading-relaxed max-w-sm lg:text-right">
            {c.description}
          </p>
        </div>

        {/* Stats row */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
          {[
            { value: '100%', label: 'Digital Process' },
            { value: '48hr', label: 'Average Response' },
            { value: 'Nationwide', label: 'Sierra Leone Coverage' },
            { value: 'End-to-end', label: 'HR & Recruitment' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col justify-center px-8 py-8 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300">
              <dt className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight mb-1">{s.value}</dt>
              <dd className="text-xs text-white/60 font-medium tracking-widest uppercase">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* 4-col advantage cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {c.advantages.map((a: Advantage, i: number) => {
            const Icon = iconMap[a.iconKey] ?? UsersThree
            const isBlue = a.color === 'brand-blue'
            return (
              <div
                key={i}
                className="group relative p-5 sm:p-7 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.14] transition-all duration-300 flex flex-col gap-4 sm:gap-5"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isBlue ? 'bg-brand-blue/20 group-hover:bg-brand-blue/30' : 'bg-brand-orange/20 group-hover:bg-brand-orange/30'} transition-colors`}>
                  <Icon size={22} weight="light" className={isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{a.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Link */}
        <Link
          href={c.link_href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline"
        >
          {c.link_text}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

      </div>
    </section>
  )
}
