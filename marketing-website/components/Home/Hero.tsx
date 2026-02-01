import React from 'react'
import Link from 'next/link'
import { Caveat } from 'next/font/google'
import { 
  UserGroupIcon, 
  ArrowTrendingUpIcon, 
  UserPlusIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/solid'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-orange-50/20 dark:from-black dark:via-gray-900 dark:to-black pt-20 pb-12 sm:pt-24 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Blue Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.06] sm:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23539fea' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Orange Pattern - Offset */}
        <div 
          className="absolute inset-0 opacity-[0.05] sm:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1975e' fill-opacity='1'%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='35' cy='35' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: '30px 30px',
          }}
        />
      </div>
      
      <div className="container relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
          {/* Left Side - Content */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Tag - Simple */}
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium">
                <span className="text-brand-orange">#1</span>{' '}
                <span className="text-brand-blue">Staffing Solutions</span>{' '}
                <span className="text-brand-orange">Provider</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-[1.1] mb-4 sm:mb-5 tracking-tight">
              Hire{' '}
              <span 
                className={`${caveat.className} text-brand-orange relative inline-block`}
                style={{ fontSize: '1.1em', lineHeight: '1' }}
              >
                Top
              </span>{' '}
              Talent,<br />
              <span className="inline-flex items-baseline gap-2 sm:gap-3">
                Faster &{' '}
                <span 
                  className={`${caveat.className} text-brand-blue relative inline-block transform hover:scale-105 transition-transform duration-300 cursor-default`}
                  style={{ fontSize: '1.15em', lineHeight: '1' }}
                >
                  Smarter
                  <svg 
                    className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue opacity-40 hidden sm:block" 
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
            <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 mb-6 sm:mb-8 leading-relaxed max-w-xl font-light">
              Expert staffing solutions that connect you with quality candidates quickly. From temporary placements to full-time hires, we make hiring effortless.
            </p>

            {/* Email CTA Form - Enhanced */}
            <div className="relative mb-5 sm:mb-6 max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/20 to-brand-orange/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                  <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white dark:bg-gray-900 p-2 rounded-xl shadow-lg border border-black/5 dark:border-white/10">
                <input
                  type="email"
                  placeholder="Enter your email"
                      className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-transparent text-sm sm:text-base focus:outline-none placeholder:text-black/40 dark:placeholder:text-white/40 dark:text-white"
                />
                <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-black text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-black/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap group/btn">
                  <span className="inline-flex items-center gap-2">
                    Get Started
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-2.5 group/item">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-blue/10 flex items-center justify-center group-hover/item:bg-brand-blue/20 transition-colors flex-shrink-0">
                  <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-blue" />
                </div>
                <span className="text-black/60 dark:text-white/60 font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 group/item">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover/item:bg-brand-orange/20 transition-colors flex-shrink-0">
                  <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-orange" />
                </div>
                <span className="text-black/60 dark:text-white/60 font-medium">Free consultation</span>
              </div>
            </div>
          </div>

          {/* Right Side - Simple & Natural with Floating Effect */}
          <div className="relative mt-8 lg:mt-0 lg:pl-8">
            {/* Background Blur Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 rounded-2xl sm:rounded-3xl blur-3xl transform scale-110" />
            
            {/* Floating Image Container */}
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500" style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))' }}>
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80" 
                alt="Team collaboration"
                className="w-full h-full object-cover"
                style={{ filter: 'blur(0.5px)' }}
              />
              
              {/* Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats/Metrics Section - Apple Style */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-brand-blue mb-1">2.5K+</div>
              <div className="text-xs text-black/50 dark:text-white/50 font-light tracking-wide">Placements</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-brand-orange mb-1">98%</div>
              <div className="text-xs text-black/50 font-light tracking-wide">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-brand-blue mb-1">48h</div>
              <div className="text-xs text-black/50 font-light tracking-wide">Avg. Time</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-brand-orange mb-1">500+</div>
              <div className="text-xs text-black/50 font-light tracking-wide">Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
