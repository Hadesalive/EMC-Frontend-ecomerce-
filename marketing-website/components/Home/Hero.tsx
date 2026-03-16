import React from 'react'
import Link from 'next/link'
import {
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid'

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-black pt-20 pb-12 sm:pt-24 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 z-0 opacity-[0.035]"
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
                <span className="text-brand-blue relative inline-block">
                  Smarter
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue opacity-30 hidden sm:block"
                    viewBox="0 0 150 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5C20 2 40 1 75 3C110 5 130 2 149 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 mb-7 sm:mb-8 leading-relaxed max-w-xl font-light">
              Sierra Leone&rsquo;s specialist recruitment and HR practice. We help growing businesses hire the right people, build stronger teams, and put the HR structures in place to scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-7">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black dark:bg-white text-white dark:text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-black/90 hover:shadow-lg transition-all duration-200 no-underline group/btn"
              >
                Get in Touch
                <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-black/15 dark:border-white/20 text-black dark:text-white text-sm sm:text-base font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
              >
                Our Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-blue" />
                </div>
                <span className="text-black/60 dark:text-white/60 font-medium">Free initial consultation</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-orange" />
                </div>
                <span className="text-black/60 dark:text-white/60 font-medium">No placement, no fee</span>
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
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
                alt="EMC team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
