import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { HeroContent } from '@/lib/cms-types'
import { DEFAULT_HERO } from '@/lib/cms-types'

export default function Hero({ content }: { content?: Partial<HeroContent> }) {
  const c: HeroContent = { ...DEFAULT_HERO, ...content }

  return (
    <section className="relative bg-white dark:bg-black pt-20 pb-12 sm:pt-24 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, #539fea 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">

          {/* Left — Content */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Tag */}
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium">
                <span className="text-brand-orange">Sierra Leone&rsquo;s</span>{' '}
                <span className="text-brand-blue">Recruitment &amp; Management</span>{' '}
                <span className="text-brand-orange">Consultancy</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-[1.1] mb-4 sm:mb-5 tracking-tight">
              Hire{' '}
              <span className="text-brand-orange">Top</span>{' '}
              Talent,<br />
              <span className="inline-flex items-baseline gap-2 sm:gap-3">
                Faster &{' '}
                <span className="text-brand-blue">
                  Smarter
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 mb-7 sm:mb-8 leading-relaxed max-w-xl font-light">
              {c.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-7">
              <Link
                href={c.cta_primary_href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black dark:bg-white text-white dark:text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-black/90 hover:shadow-lg transition-all duration-200 no-underline group/btn"
              >
                {c.cta_primary}
                <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={c.cta_secondary_href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-black/15 dark:border-white/20 text-black dark:text-white text-sm sm:text-base font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
              >
                {c.cta_secondary}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} weight="fill" className="text-brand-blue" />
                </div>
                <span className="text-black/60 dark:text-white/60 font-medium">{c.trust_1}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} weight="fill" className="text-brand-orange" />
                </div>
                <span className="text-black/60 dark:text-white/60 font-medium">{c.trust_2}</span>
              </div>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative mt-8 lg:mt-0 lg:pl-8">
            <div className="absolute inset-0 bg-brand-blue/8 rounded-2xl sm:rounded-3xl blur-3xl transform scale-110" />
            <div
              className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))' }}
            >
              <Image
                src={c.image_url}
                alt={c.image_alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
