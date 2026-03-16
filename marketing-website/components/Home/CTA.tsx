import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function CTA() {
  return (
    <section className="relative py-20 lg:py-32 bg-brand-blue overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            <p className="text-white/70 text-xs font-medium tracking-widest uppercase mb-5">Work With Us</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to build<br />your best team?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-md">
              Get in touch with EMC today. Tell us what you need and we will handle the rest — from search to placement.
            </p>
          </div>

          {/* Right — actions */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-black text-base font-semibold rounded-lg hover:bg-white/90 transition-all duration-200 no-underline inline-flex items-center justify-center gap-2"
              >
                Contact Us Today
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-4 bg-transparent text-white text-base font-medium rounded-lg hover:bg-white/10 border border-white/30 hover:border-white/50 transition-all duration-200 no-underline inline-flex items-center justify-center"
              >
                View Solutions
              </Link>
            </div>

            {/* Quick trust points */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Free initial consultation', 'No placement, no fee', 'Confidential search'].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
