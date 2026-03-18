import type { Metadata } from 'next'
import {
  UsersThree,
  Briefcase,
  MagnifyingGlass,
  ClipboardText,
  ChartBar,
  FileText,
  Gear,
  Buildings,
  CurrencyDollar,
  ArrowsClockwise,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Recruitment & HR Services | Staffing Agency Sierra Leone',
  description: 'EMC offers permanent recruitment, contract staffing, executive search, HR consulting, HR outsourcing and management consulting across Sierra Leone. Specialists in mining, construction, healthcare and more.',
  alternates: { canonical: 'https://expresssl.com/services' },
  openGraph: {
    title: 'Recruitment & HR Services Sierra Leone | EMC',
    description: 'Permanent recruitment, contract staffing, executive search, HR consulting, HR outsourcing and management consulting across Sierra Leone.',
    url: 'https://expresssl.com/services',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruitment & HR Services Sierra Leone | EMC',
    description: 'Permanent recruitment, contract staffing, executive search, HR consulting, HR outsourcing and management consulting across Sierra Leone.',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero — 2-col: headline left, service category index right */}
      <section className="bg-black pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4 lg:mb-6 tracking-tight">
                Services built<br />around your<br />
                <span className="text-brand-orange">needs.</span>
              </h1>
              <p className="text-base lg:text-xl text-white/60 leading-relaxed">
                Whether you need one specialist or want to rethink your entire HR function, we have the sector knowledge and the process to get it right.
              </p>
            </div>
            <div className="lg:border-l lg:border-white/10 lg:pl-16 lg:pb-2">
              <p className="text-xs font-medium text-white/60 tracking-widest uppercase mb-6">What we cover</p>
              <div className="space-y-5">
                {[
                  { num: '01', name: 'Recruitment & Talent Acquisition', color: 'text-brand-blue' },
                  { num: '02', name: 'Workforce Outsourcing',            color: 'text-brand-orange' },
                  { num: '03', name: 'Payroll Administration',           color: 'text-brand-blue' },
                  { num: '04', name: 'HR Advisory Services',             color: 'text-brand-orange' },
                  { num: '05', name: 'Workforce Planning',               color: 'text-brand-blue' },
                  { num: '06', name: 'Talent Pool Development',          color: 'text-brand-orange' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className={`text-xs font-bold tracking-widest ${item.color}`}>{item.num}</span>
                    <span className="text-white/70 text-base lg:text-lg font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category 1 — Recruitment & Staffing */}
      <section className="py-14 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-8 lg:mb-14">
            <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">01</span>
            <div className="h-px flex-1 bg-brand-blue/20 hidden sm:block" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-black">Recruitment &amp; Staffing</h2>
            <div className="h-px flex-1 bg-brand-blue/20 hidden sm:block" />
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
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6">
                <UsersThree size={24} weight="regular" className="text-brand-blue" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-black mb-4">Recruitment &amp; Talent Acquisition</h3>
              <p className="text-black/60 leading-relaxed mb-6 text-base lg:text-lg">
                Identification and placement of qualified professionals across Sierra Leone — from entry-level positions to senior leadership. We manage the full recruitment cycle so you can focus on your core business.
              </p>
              <ul className="space-y-2.5 mb-8">
                {['Job profiling & role scoping', 'Multi-channel candidate sourcing', 'Competency-based screening & evaluation', 'Post-placement follow-up'].map((item, i) => (
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
                icon: ArrowsClockwise,
                color: 'brand-orange',
                title: 'Talent Pool Development',
                desc: 'Development of skilled talent databases for rapid recruitment. We maintain pre-screened candidate rosters so we can respond to your workforce needs quickly.',
              },
              {
                icon: MagnifyingGlass,
                color: 'brand-blue',
                title: 'Executive Search',
                desc: 'Discreet, targeted search for C-suite and specialist roles. Our local networks give you access to passive talent not found on open job boards.',
              },
              {
                icon: ClipboardText,
                color: 'brand-orange',
                title: 'Mass & Contract Recruitment',
                desc: 'Large-scale and short-term hiring coordinated efficiently — from assessment and screening through to deployment and compliance documentation.',
              },
            ].map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="p-6 border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-md transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                    <Icon size={24} weight="regular" className={isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
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
      <section className="bg-black py-14 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-8 lg:mb-14">
            <span className="text-xs font-bold text-brand-orange tracking-widest uppercase">02</span>
            <div className="h-px flex-1 bg-brand-orange/20 hidden sm:block" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">HR Advisory &amp; Workforce Planning</h2>
            <div className="h-px flex-1 bg-brand-orange/20 hidden sm:block" />
          </div>

          <div className="divide-y divide-white/10">
            {[
              {
                icon: Briefcase,
                color: 'brand-orange',
                title: 'HR Advisory Services',
                desc: 'Professional HR consulting and workforce advisory services. We provide expert guidance on HR policies, compliance, performance management, and building scalable HR functions.',
                tags: ['Policy development', 'Performance management', 'Regulatory compliance'],
              },
              {
                icon: Buildings,
                color: 'brand-blue',
                title: 'Workforce Planning',
                desc: 'Strategic workforce planning to support business growth. We help you forecast headcount needs, identify skills gaps, and build resilient teams aligned to your operational objectives.',
                tags: ['Headcount planning', 'Skills gap analysis', 'Succession planning'],
              },
              {
                icon: Gear,
                color: 'brand-orange',
                title: 'Organisational Development',
                desc: 'Guiding organisations through restructuring, cultural transformation, and change management to improve operational efficiency and long-term performance.',
                tags: ['Restructuring support', 'Culture assessment', 'Change management'],
              },
            ].map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="py-7 md:py-10 grid md:grid-cols-3 gap-4 md:gap-6 group">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-brand-blue/20' : 'bg-brand-orange/20'}`}>
                      <Icon size={20} weight="regular" className={isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
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
      <section className="py-14 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-8 lg:mb-14">
            <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">03</span>
            <div className="h-px flex-1 bg-brand-blue/20 hidden sm:block" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-black">Workforce Outsourcing &amp; Payroll</h2>
            <div className="h-px flex-1 bg-brand-blue/20 hidden sm:block" />
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-8 mb-8 lg:mb-16">
            {[
              {
                icon: FileText,
                color: 'brand-blue',
                title: 'Workforce Outsourcing',
                desc: 'Provision and management of outsourced staff for client organisations. We supply, deploy and manage personnel on your behalf — allowing you to scale your workforce without the administrative overhead.',
              },
              {
                icon: CurrencyDollar,
                color: 'brand-orange',
                title: 'Payroll Administration',
                desc: 'Administration of employee payroll, statutory deductions and compliance. Accurate, on-time payroll processing with full compliance to Sierra Leone labour regulations.',
              },
              {
                icon: ChartBar,
                color: 'brand-orange',
                title: 'HR Operations Management',
                desc: 'End-to-end management of day-to-day HR operations including onboarding, employee records, leave administration, and compliance reporting.',
              },
              {
                icon: UsersThree,
                color: 'brand-blue',
                title: 'Background & Reference Verification',
                desc: 'Thorough background screening — employment history, qualifications, references, and criminal record checks — for every candidate before placement.',
              },
            ].map((s, i) => {
              const Icon = s.icon
              const isBlue = s.color === 'brand-blue'
              return (
                <div key={i} className="flex gap-5 p-5 sm:p-7 border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-md transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 self-start ${isBlue ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'} transition-colors`}>
                    <Icon size={24} weight="regular" className={isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
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
      <section className="py-12 lg:py-20 bg-gray-50 border-t border-black/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-black mb-4 sm:mb-6">
              {"Not sure which service you need?"}
            </h2>
            <p className="text-base lg:text-lg text-black/60 mb-6 sm:mb-8">
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
