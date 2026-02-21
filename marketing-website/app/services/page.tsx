import type { Metadata } from 'next'
import {
  UserGroupIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive talent management services including recruitment, client relationship management, employee self-service, and automated workflow solutions.',
  openGraph: {
    title: 'Our Services | Express Management Consultancy',
    description: 'Comprehensive talent management and recruitment services.',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero — left-aligned, dark */}
      <section className="bg-black pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-6">What We Do</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
              Services built<br />
              <span className="text-brand-orange">around your</span>{' '}
              <span className="text-brand-blue">needs.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              From sourcing a single specialist to restructuring an entire HR function, we have the expertise and network to deliver.
            </p>
          </div>
        </div>
      </section>

      {/* Category 1 — Recruitment & Staffing */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">01</span>
            <div className="h-px flex-1 bg-brand-blue/20" />
            <h2 className="font-display text-2xl font-bold text-black">Recruitment &amp; Staffing</h2>
            <div className="h-px flex-1 bg-brand-blue/20" />
          </div>

          {/* Featured — horizontal card */}
          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-black/5 shadow-sm mb-8 group hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&q=80"
                alt="Permanent recruitment"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />
            </div>
            <div className="p-10 lg:p-12 flex flex-col justify-start">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6">
                <UserGroupIcon className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="font-display text-3xl font-bold text-black mb-4">Permanent Recruitment</h3>
              <p className="text-black/60 leading-relaxed mb-6 text-lg">
                End-to-end placement for permanent roles at all levels — from entry positions to senior leadership. We manage sourcing, screening, and final placement.
              </p>
              <ul className="space-y-2.5 mb-8">
                {['Job profiling & role scoping', 'Multi-channel candidate sourcing', 'Competency-based screening', 'Post-placement follow-up'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-black/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/contact" className="inline-flex items-center text-sm font-semibold text-brand-blue hover:gap-3 gap-2 transition-all duration-200 no-underline">
                Enquire about this service
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>

          {/* 3-col row */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ArrowPathIcon,
                color: 'brand-orange',
                title: 'Temporary & Contract Staffing',
                desc: 'Flexible workforce solutions for short-term projects, seasonal demand, or interim cover. Pre-vetted candidates ready to deploy quickly.',
              },
              {
                icon: MagnifyingGlassIcon,
                color: 'brand-blue',
                title: 'Executive Search',
                desc: 'Discreet, targeted search for C-suite and specialist roles. Access passive talent not found on open job boards.',
              },
              {
                icon: ClipboardDocumentCheckIcon,
                color: 'brand-orange',
                title: 'Mass Recruitment',
                desc: 'Large-scale hiring drives coordinated efficiently — from assessment centres to documentation and compliance.',
              },
            ].map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="p-8 border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-md transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                    <Icon className={`w-6 h-6 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-black mb-2">{s.title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category 2 — HR & Management Consulting — dark bg, list style */}
      <section className="bg-black py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-xs font-bold text-brand-orange tracking-widest uppercase">02</span>
            <div className="h-px flex-1 bg-brand-orange/20" />
            <h2 className="font-display text-2xl font-bold text-white">HR &amp; Management Consulting</h2>
            <div className="h-px flex-1 bg-brand-orange/20" />
          </div>

          <div className="divide-y divide-white/10">
            {[
              {
                icon: BriefcaseIcon,
                color: 'brand-orange',
                title: 'HR Management Consulting',
                desc: 'Expert guidance on HR policies, procedures, and best practices. We help you build scalable HR functions that attract and retain top talent.',
                tags: ['Policy development', 'Performance management', 'Compensation design'],
              },
              {
                icon: BuildingOfficeIcon,
                color: 'brand-blue',
                title: 'Business Consulting',
                desc: 'Strategic advice on business operations, growth strategies, and organisational development to drive long-term performance.',
                tags: ['Process optimisation', 'Strategic planning', 'Change management'],
              },
              {
                icon: Cog6ToothIcon,
                color: 'brand-orange',
                title: 'Change & Culture Management',
                desc: 'Guiding organisations through transitions, restructuring, and cultural transformation to build resilient, high-performing teams.',
                tags: ['Restructuring', 'Culture assessment', 'Leadership alignment'],
              },
            ].map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="py-10 grid md:grid-cols-3 gap-6 group">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-brand-blue/20' : 'bg-brand-orange/20'}`}>
                      <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mt-2">{s.title}</h3>
                  </div>
                  <p className="text-white/50 leading-relaxed md:col-span-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 items-start">
                    {s.tags.map((tag, ti) => (
                      <span key={ti} className={`text-xs font-medium px-3 py-1.5 rounded-full ${isBlue ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-orange/10 text-brand-orange'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category 3 — Outsourcing — light, clean minimal */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">03</span>
            <div className="h-px flex-1 bg-brand-blue/20" />
            <h2 className="font-display text-2xl font-bold text-black">Outsourcing Services</h2>
            <div className="h-px flex-1 bg-brand-blue/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: DocumentTextIcon,
                color: 'brand-blue',
                title: 'HR Outsourcing',
                desc: 'Outsource your entire HR function to us. We manage recruitment, onboarding, compliance, and day-to-day HR administration so you can focus on your core business.',
              },
              {
                icon: CurrencyDollarIcon,
                color: 'brand-orange',
                title: 'Payroll Management',
                desc: 'Accurate, on-time payroll processing with full compliance to Sierra Leone labour regulations. We handle calculations, disbursements, and reporting.',
              },
              {
                icon: ChartBarIcon,
                color: 'brand-orange',
                title: 'HR Technology & Data Analytics',
                desc: 'Implementing HRIS systems and providing data-driven insights to help you make smarter workforce decisions and track performance effectively.',
              },
              {
                icon: UserGroupIcon,
                color: 'brand-blue',
                title: 'Background Verification',
                desc: 'Thorough background screening — employment history, qualifications, references, and criminal record checks — for every candidate before placement.',
              },
            ].map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="flex gap-6 p-7 border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-md transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 self-start ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                    <Icon className={`w-6 h-6 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-black mb-2">{s.title}</h3>
                    <p className="text-black/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 to-orange-50/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-black mb-6">
              {"Not sure which service you need?"}
            </h2>
            <p className="text-lg text-black/60 mb-8">
              {"Talk to us. We'll listen to your situation and recommend the right approach for your organisation."}
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
