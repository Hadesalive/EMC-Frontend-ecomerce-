import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function CTA() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-orange overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

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
                className="px-8 py-4 bg-white text-brand-blue text-base font-semibold rounded-lg hover:bg-white/90 hover:scale-105 transition-all duration-200 no-underline inline-flex items-center justify-center gap-2 shadow-xl"
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
              {['Free consultation', 'Sierra Leone based', '98% success rate'].map((point, i) => (
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
