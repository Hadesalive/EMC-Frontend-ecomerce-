import React from 'react'
import Link from 'next/link'
import {
  UsersThree,
  Briefcase,
  Buildings,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr'
import type { HomeServicesContent } from '@/lib/cms-types'

const SERVICE_ICONS = [UsersThree, Briefcase, Buildings]
const SERVICE_COLORS = ['brand-blue', 'brand-orange', 'brand-blue'] as const

export default function ServicesSection({ content }: { content: HomeServicesContent }) {
  return (
    <section className="bg-black py-10 lg:py-16">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 gap-6">
          <div>
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">{content.section_label}</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {content.heading}
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors no-underline group"
          >
            View all services
            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-white/10">
          {content.services.map((s, i) => {
            const Icon = SERVICE_ICONS[i] ?? UsersThree
            const color = SERVICE_COLORS[i] ?? 'brand-blue'
            const isBlue = color === 'brand-blue'
            return (
              <div
                key={i}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-8 hover:bg-white/[0.02] -mx-6 px-6 rounded-xl transition-colors"
              >
                {/* Number + icon */}
                <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-3">
                  <span className={`text-xs font-bold tracking-widest ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>0{i + 1}</span>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-brand-blue/20' : 'bg-brand-orange/20'}`}>
                    <Icon size={20} weight="regular" className={isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
                  </div>
                </div>

                {/* Title */}
                <div className="lg:col-span-3">
                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-white/50 leading-relaxed text-sm">{s.description}</p>
                </div>

                {/* Features + link */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <ul className="space-y-1.5">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs text-white/60">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isBlue ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold no-underline mt-2 group-hover:gap-3 transition-all duration-200 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}
                  >
                    Learn more
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
