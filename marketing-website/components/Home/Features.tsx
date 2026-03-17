import React from 'react'
import Link from 'next/link'
import {
  GlobeAltIcon,
  BoltIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import type { FeaturesContent, Advantage } from '@/lib/cms-types'
import { DEFAULT_FEATURES } from '@/lib/cms-types'

const iconMap: Record<string, React.ElementType> = {
  globe: GlobeAltIcon,
  bolt: BoltIcon,
  shield: ShieldCheckIcon,
  sliders: AdjustmentsHorizontalIcon,
}

export default function Features({ content }: { content?: Partial<FeaturesContent> }) {
  const c: FeaturesContent = {
    ...DEFAULT_FEATURES,
    ...content,
    advantages: content?.advantages ?? DEFAULT_FEATURES.advantages,
  }

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-white/5">
      <div className="container">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">{c.section_label}</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight">
              {c.heading}
            </h2>
          </div>
          <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-sm lg:text-right">
            {c.description}
          </p>
        </div>

        {/* 4-col advantage cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {c.advantages.map((a: Advantage, i: number) => {
            const Icon = iconMap[a.iconKey] ?? GlobeAltIcon
            const isBlue = a.color === 'brand-blue'
            return (
              <div
                key={i}
                className="group relative p-7 rounded-2xl border border-black/8 dark:border-white/5 hover:border-black/15 dark:hover:border-white/10 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col gap-5"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                  <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                </div>
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
