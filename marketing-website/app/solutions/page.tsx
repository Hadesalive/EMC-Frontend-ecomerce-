import type { Metadata } from 'next'
import {
  UsersThree,
  MagnifyingGlass,
  ArrowsClockwise,
  ChartBar,
  Buildings,
  ClipboardText,
  GraduationCap,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr'
import { getContent } from '@/lib/cms'
import { DEFAULT_SOLUTIONS_HERO, DEFAULT_SOLUTIONS_LIST } from '@/lib/cms-types'
import type { SolutionsHeroContent, SolutionsListContent } from '@/lib/cms-types'

export const metadata: Metadata = {
  title: 'HR Solutions & Management Consulting Sierra Leone',
  description: 'Tailored HR solutions and management consulting for businesses in Sierra Leone. EMC delivers workforce planning, organisational design, policy development and performance management.',
  alternates: { canonical: 'https://expresssl.com/solutions' },
  openGraph: {
    title: 'HR Solutions & Management Consulting Sierra Leone | EMC',
    description: 'Tailored HR solutions and management consulting — workforce planning, organisational design, policy development and performance management.',
    url: 'https://expresssl.com/solutions',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HR Solutions & Management Consulting Sierra Leone | EMC',
    description: 'Tailored HR solutions and management consulting — workforce planning, organisational design, policy development and performance management.',
  },
}

// Icons are UI concerns — kept hardcoded, text comes from CMS
const SOLUTION_ICONS = [UsersThree, ArrowsClockwise, ChartBar, Buildings, ClipboardText, GraduationCap]
const SOLUTION_COLORS = ['brand-blue', 'brand-orange', 'brand-blue', 'brand-orange', 'brand-blue', 'brand-orange'] as const

const process = [
  { step: '01', title: 'Understand Workforce Requirements', description: 'In-depth consultation to understand your organisation, role requirements, culture, and timeline.' },
  { step: '02', title: 'Source & Screen Candidates', description: 'We tap our local talent networks and conduct rigorous screening to identify the strongest candidates.' },
  { step: '03', title: 'Structured Interviews & Evaluation', description: 'Competency-based interviews and structured evaluations to assess fit, skills, and readiness.' },
  { step: '04', title: 'Deploy & Manage Personnel', description: 'We handle deployment logistics and ongoing management of outsourced or placed personnel.' },
  { step: '05', title: 'Ongoing HR Support & Monitoring', description: 'Continued HR support and performance monitoring to ensure a successful, long-term outcome.' },
]

const industries = [
  { name: 'Mining & Extractive Industry',       color: 'orange' },
  { name: 'Construction & Infrastructure',      color: 'blue' },
  { name: 'Logistics & Transportation',         color: 'blue' },
  { name: 'Financial Institutions',             color: 'orange' },
  { name: 'Manufacturing',                      color: 'blue' },
  { name: 'NGOs & Development Organisations',   color: 'orange' },
  { name: 'Healthcare',                         color: 'blue' },
  { name: 'Hospitality',                        color: 'orange' },
  { name: 'Agriculture & Fisheries',            color: 'blue' },
  { name: 'Retail & FMCG',                      color: 'orange' },
  { name: 'IT & Telecommunications',            color: 'blue' },
  { name: 'Government & Public Sector',         color: 'orange' },
]

export default async function SolutionsPage() {
  const [heroData, listData] = await Promise.all([
    getContent<SolutionsHeroContent>('solutions', 'hero'),
    getContent<SolutionsListContent>('solutions', 'list'),
  ])

  const hero: SolutionsHeroContent = { ...DEFAULT_SOLUTIONS_HERO, ...heroData }
  const solutions = (listData as SolutionsListContent | null)?.solutions ?? DEFAULT_SOLUTIONS_LIST.solutions

  return (
    <div className="min-h-screen bg-white">

      {/* Hero — 2-col: text left, solution names grid right */}
      <section className="bg-black pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-6">Workforce &amp; HR Solutions</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
                Every hire.<br />
                <span className="text-brand-orange">Every level.</span>{' '}
                <span className="text-brand-blue">Every sector.</span>
              </h1>
              <p className="text-xl text-white/60 leading-relaxed mb-10">
                {hero.subtext}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all duration-200 no-underline group/btn"
                >
                  Get in Touch
                  <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200 no-underline"
                >
                  View All Services
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 self-end lg:pb-2">
              <p className="text-xs font-medium text-white/60 tracking-widest uppercase mb-4">{solutions.length} solutions</p>
              <div className="grid grid-cols-2 gap-2">
                {solutions.map((s, i) => (
                  <div key={i} className="px-3 py-2.5 rounded-lg bg-white/[0.06] text-white/50 text-xs font-medium leading-snug">
                    {s.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions list */}
      <section className="py-10 lg:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8 pb-5 border-b border-black/5">
            <h2 className="font-display text-3xl font-bold text-black">What we do</h2>
            <span className="text-sm text-black/40">{solutions.length} services</span>
          </div>

          <div className="divide-y divide-black/5">
            {solutions.map((s, i) => {
              const Icon = SOLUTION_ICONS[i] ?? UsersThree
              const color = SOLUTION_COLORS[i] ?? 'brand-blue'
              const isBlue = color === 'brand-blue'
              return (
                <div key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 hover:bg-black/[0.015] -mx-6 px-6 rounded-xl transition-colors cursor-default">
                  {/* Number + Icon */}
                  <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-3">
                    <span className={`text-xs font-bold tracking-widest ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>{s.num}</span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'}`}>
                      <Icon size={20} weight="regular" className={isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-3">
                    <h3 className="font-display text-lg font-bold text-black leading-snug group-hover:text-brand-blue transition-colors duration-200">
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="text-black/60 leading-relaxed text-sm">{s.description}</p>
                  </div>

                  {/* Features */}
                  <div className="md:col-span-3">
                    <ul className="space-y-1.5">
                      {s.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-xs text-black/50">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isBlue ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process — dark, horizontal steps */}
      <section className="bg-black py-10 lg:py-16">
        <div className="container">
          <div className="mb-14">
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-3">How it works</p>
            <h2 className="font-display text-4xl font-bold text-white">Our recruitment process</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {process.map((p, i) => (
              <div key={i} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-12 right-0 h-px bg-white/10" />
                )}
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-5 relative z-10 bg-black">
                  <span className={`text-xs font-bold ${
                    i === 0 ? 'text-brand-orange' : i === 5 ? 'text-brand-blue' : 'text-white/60'
                  }`}>{p.step}</span>
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-10 lg:py-16 border-t border-black/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">Where we operate</p>
              <h2 className="font-display text-4xl font-bold text-black mb-6">Industries we serve</h2>
              <p className="text-black/60 leading-relaxed mb-8">
                We maintain a strong local talent pool across all major industries in Sierra Leone. Our structured recruitment processes and deep sector knowledge mean we ask the right questions — and find candidates who actually fit, not just candidates who look right on paper.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline">
                Talk to a specialist
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {industries.map((industry, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border ${
                    industry.color === 'blue'
                      ? 'border-brand-blue/15 text-brand-blue bg-brand-blue/5'
                      : 'border-brand-orange/15 text-brand-orange bg-brand-orange/5'
                  }`}
                >
                  {industry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14 bg-gray-50 border-t border-black/5">
        <div className="container">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/8">
            {/* Employers */}
            <div className="pb-10 md:pb-0 md:pr-14 lg:pr-20">
              <p className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-4">For Employers</p>
              <h2 className="font-display text-3xl font-bold text-black mb-4">
                Ready to find the right talent?
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                Tell us about your hiring needs and we&apos;ll design a solution that works for your organisation.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-block px-7 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
                >
                  Get in Touch
                </a>
                <a
                  href="/services"
                  className="inline-block px-7 py-3.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
                >
                  View All Services
                </a>
              </div>
            </div>
            {/* Job Seekers */}
            <div className="pt-10 md:pt-0 md:pl-14 lg:pl-20">
              <p className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4">For Job Seekers</p>
              <h2 className="font-display text-3xl font-bold text-black mb-4">
                Find your next opportunity.
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                We connect talented professionals with top employers across Sierra Leone. Browse our latest openings or add your CV to our talent pool.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/jobs"
                  className="inline-block px-7 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
                >
                  Browse Open Roles
                </a>
                <a
                  href="/apply"
                  className="inline-block px-7 py-3.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
                >
                  Submit Your CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
