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
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
            Ready to{' '}
            <span className="font-normal">transform</span>{' '}
            your talent management?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            Get in touch with us today to learn how our platform can streamline your operations and deliver superior results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-brand-blue text-base font-semibold rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-200 no-underline inline-flex items-center gap-2 shadow-xl"
            >
              Contact Us Today
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-transparent text-white text-base font-medium rounded-full hover:bg-white/10 border-2 border-white/30 hover:border-white/50 transition-all duration-200 no-underline"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
