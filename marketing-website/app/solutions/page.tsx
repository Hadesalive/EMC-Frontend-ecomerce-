import type { Metadata } from 'next'
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Comprehensive talent management solutions designed to streamline your hiring process and optimize workforce performance.',
  openGraph: {
    title: 'Solutions | Express Management Consultancy',
    description: 'Comprehensive talent management solutions.',
  },
}

const solutions = [
  {
    icon: UserGroupIcon,
    color: 'brand-blue',
    num: '01',
    title: 'Permanent Recruitment',
    description: 'End-to-end recruitment for permanent roles across all levels — from entry-level positions to senior leadership. We handle sourcing, screening, and final placement so you can focus on your core business.',
    features: ['Job profiling & role scoping', 'Multi-channel sourcing', 'Competency-based screening', 'Post-placement follow-up'],
  },
  {
    icon: ArrowPathIcon,
    color: 'brand-orange',
    num: '02',
    title: 'Temporary & Contract Staffing',
    description: 'Flexible workforce solutions for short-term projects, seasonal demand, or interim cover. Pre-vetted candidates ready to deploy with minimal lead time.',
    features: ['Rapid deployment', 'Pre-screened talent pool', 'Contract management', 'Seamless extensions or conversions'],
  },
  {
    icon: MagnifyingGlassIcon,
    color: 'brand-blue',
    num: '03',
    title: 'Executive Search & Headhunting',
    description: 'Discreet, targeted search for C-suite, director, and specialist roles. Our network across Sierra Leone and the region gives you access to passive talent not found on job boards.',
    features: ['Confidential search process', 'Leadership profiling', 'Candidate benchmarking', 'Negotiation & onboarding support'],
  },
  {
    icon: ClipboardDocumentCheckIcon,
    color: 'brand-orange',
    num: '04',
    title: 'Mass Recruitment & Bulk Hiring',
    description: "Designed for large-scale hiring drives — whether you're launching a new project, expanding operations, or staffing a major contract. We coordinate the entire process at volume.",
    features: ['Structured assessment centres', 'High-volume screening', 'Coordinated interview scheduling', 'Compliance documentation'],
  },
  {
    icon: ShieldCheckIcon,
    color: 'brand-blue',
    num: '05',
    title: 'Background Verification',
    description: 'Protect your organisation with thorough background checks. We verify employment history, qualifications, references, and conduct criminal record screenings on all candidates.',
    features: ['Employment & education verification', 'Reference checks', 'Criminal record screening', 'Detailed verification reports'],
  },
  {
    icon: BuildingOfficeIcon,
    color: 'brand-blue',
    num: '06',
    title: 'HR Outsourcing',
    description: 'Outsource your HR operations to us and benefit from professional management without the overhead. From payroll to onboarding to compliance, we handle it all.',
    features: ['Payroll processing', 'Employee onboarding', 'Regulatory compliance', 'HR administration & reporting'],
  },
  {
    icon: ChartBarIcon,
    color: 'brand-orange',
    num: '07',
    title: 'Workforce Planning & Strategy',
    description: 'Data-driven workforce planning that aligns your talent strategy with your business objectives. We help you forecast needs, identify gaps, and build resilient teams.',
    features: ['Headcount planning', 'Skills gap analysis', 'Succession planning', 'Organisational design advisory'],
  },
  {
    icon: AcademicCapIcon,
    color: 'brand-orange',
    num: '08',
    title: 'Training & Capacity Building',
    description: 'Invest in your people with targeted training programmes and leadership development. We design and deliver bespoke initiatives aligned to your sector and strategic goals.',
    features: ['Leadership development', 'Technical skills training', 'Team effectiveness programmes', 'Training needs assessment'],
  },
]

const process = [
  { step: '01', title: 'Understand Your Needs', description: 'In-depth consultation to understand your organisation, culture, and exact requirements.' },
  { step: '02', title: 'Source & Screen', description: 'We tap our network and conduct rigorous screening to identify the strongest candidates.' },
  { step: '03', title: 'Shortlist & Present', description: 'A curated shortlist of qualified candidates with detailed profiles and our assessment.' },
  { step: '04', title: 'Interviews & Assessment', description: 'We coordinate interviews and provide guidance throughout the evaluation process.' },
  { step: '05', title: 'Selection & Placement', description: 'We support offer negotiation and manage all placement logistics for a smooth transition.' },
  { step: '06', title: 'Post-Placement Follow-Up', description: 'We stay engaged after placement to ensure a successful long-term fit for both parties.' },
]

const industries = [
  { name: 'Construction',                  color: 'blue' },
  { name: 'Natural Resources & Mining',    color: 'orange' },
  { name: 'Hospitality',                   color: 'orange' },
  { name: 'Healthcare',                    color: 'blue' },
  { name: 'Agriculture & Fisheries',       color: 'orange' },
  { name: 'Manufacturing',                 color: 'blue' },
  { name: 'Retail & FMCG',                 color: 'orange' },
  { name: 'Logistics & Transport',         color: 'blue' },
  { name: 'IT & Telecommunications',       color: 'blue' },
  { name: 'Government & Public Sector',    color: 'blue' },
  { name: 'Security Services',             color: 'orange' },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero — 2-col: text left, solution names grid right */}
      <section className="bg-black pt-32 pb-20 lg:pt-40 lg:pb-24">
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
                Purpose-built for Sierra Leone&rsquo;s job market. Whether you need one specialist or a full workforce programme, we bring the same rigour to every brief.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all duration-200 no-underline group/btn"
                >
                  Get in Touch
                  <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
              <p className="text-xs font-medium text-white/30 tracking-widest uppercase mb-4">{solutions.length} solutions</p>
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
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-12 pb-6 border-b border-black/5">
            <h2 className="font-display text-3xl font-bold text-black">What we do</h2>
            <span className="text-sm text-black/40">{solutions.length} services</span>
          </div>

          <div className="divide-y divide-black/5">
            {solutions.map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 hover:bg-black/[0.015] -mx-6 px-6 rounded-xl transition-colors cursor-default">
                  {/* Number + Icon */}
                  <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-3">
                    <span className={`text-xs font-bold tracking-widest ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>{s.num}</span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'}`}>
                      <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
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
      <section className="bg-black py-24">
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
                    i === 0 ? 'text-brand-orange' : i === 5 ? 'text-brand-blue' : 'text-white/30'
                  }`}>{p.step}</span>
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 border-t border-black/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">Where we operate</p>
              <h2 className="font-display text-4xl font-bold text-black mb-6">Industries we serve</h2>
              <p className="text-black/60 leading-relaxed mb-8">
                Our team has worked directly inside many of the sectors we recruit for. That gives us the context to ask the right questions — and find candidates who actually fit, not just candidates who look right on paper.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline">
                Talk to a specialist
                <ArrowRightIcon className="w-4 h-4" />
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
      <section className="py-20 bg-gray-50 border-t border-black/5">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold text-black mb-4">
              Ready to find the right talent?
            </h2>
            <p className="text-lg text-black/60 mb-8">
              Tell us about your hiring needs and we'll design a solution that works for your organisation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
              >
                Get in Touch
              </a>
              <a
                href="/services"
                className="inline-block px-8 py-4 border border-black/15 text-black text-base font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
              >
                View All Services
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
