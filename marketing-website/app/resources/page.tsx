import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Buildings,
  GraduationCap,
  FileText,
  Scales,
  CurrencyDollar,
  ClipboardText,
  UserCircle,
  ChartBar,
  Lightbulb,
  UsersThree,
  BookOpen,
} from '@phosphor-icons/react/dist/ssr'
import { getContent } from '@/lib/cms'
import { DEFAULT_RESOURCES } from '@/lib/cms-types'
import type { ResourcesContent } from '@/lib/cms-types'
import { GUIDES } from './guides'
import type { Guide } from './guides'

export const metadata: Metadata = {
  title: 'HR Resources & Career Guides | Sierra Leone',
  description: 'Free HR resources, career guides, and recruitment insights for employers and job seekers in Sierra Leone from Express Management Consultancy.',
  alternates: { canonical: 'https://expresssl.com/resources' },
  openGraph: {
    title: 'HR Resources & Career Guides | EMC Sierra Leone',
    description: 'Free HR resources, career guides and recruitment insights for employers and job seekers in Sierra Leone.',
    url: 'https://expresssl.com/resources',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HR Resources & Career Guides | EMC Sierra Leone',
    description: 'Free HR resources, career guides and recruitment insights for employers and job seekers in Sierra Leone.',
  },
}

const ICON_MAP: Record<Guide['iconKey'], React.ElementType> = {
  FileText,
  Scales,
  CurrencyDollar,
  ClipboardText,
  UserCircle,
  ChartBar,
}

const EMPLOYER_RESOURCES = [
  'Writing Effective Job Descriptions',
  'Employment Law Compliance in Sierra Leone',
  'Onboarding Best Practices for New Hires',
  'Compensation & Benefits Benchmarks',
  'Managing Seasonal Workforce Demand',
]

const JOB_SEEKER_RESOURCES = [
  'Writing a CV That Gets Noticed',
  'Interview Preparation & Tips',
  'Understanding Your Employment Rights',
  'Career Paths in Key Industries',
  'Networking & Professional Development in Freetown',
]


export default async function ResourcesPage() {
  const raw = await getContent<ResourcesContent>('resources', 'main')
  const cms: ResourcesContent = { ...DEFAULT_RESOURCES, ...raw }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-black pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container">
          <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-6">Knowledge Hub</p>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                {cms.heading}
              </h1>
              <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
                {cms.subtext}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={cms.cta_primary_href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all duration-200 no-underline group/btn"
                >
                  {cms.cta_primary}
                  <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={cms.cta_secondary_href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200 no-underline"
                >
                  {cms.cta_secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience split */}
      <section className="py-10 lg:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">

            {/* For Employers */}
            <div className="rounded-2xl border border-black/8 p-8 lg:p-10">
              <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6">
                <Buildings size={22} weight="regular" className="text-brand-blue" />
              </div>
              <p className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-3">For Employers</p>
              <h2 className="font-display text-2xl font-bold text-black mb-4">{cms.employer_heading}</h2>
              <p className="text-black/60 text-sm leading-relaxed mb-6">
                {cms.employer_description}
              </p>
              <ul className="space-y-3 mb-8">
                {EMPLOYER_RESOURCES.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-black/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline"
              >
                Get in touch
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            {/* For Job Seekers */}
            <div className="rounded-2xl border border-black/8 p-8 lg:p-10">
              <div className="w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6">
                <GraduationCap size={22} weight="regular" className="text-brand-orange" />
              </div>
              <p className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-3">For Job Seekers</p>
              <h2 className="font-display text-2xl font-bold text-black mb-4">{cms.jobseeker_heading}</h2>
              <p className="text-black/60 text-sm leading-relaxed mb-6">
                {cms.jobseeker_description}
              </p>
              <ul className="space-y-3 mb-8">
                {JOB_SEEKER_RESOURCES.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-black/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-4 transition-all duration-200 no-underline"
              >
                Browse open roles
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="bg-black py-10 lg:py-16">
        <div className="container">
          <div className="mb-10">
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">Featured Guides</p>
            <h2 className="font-display text-4xl font-bold text-white">Resources to help you succeed</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES.map((guide, i) => {
              const Icon = ICON_MAP[guide.iconKey]
              return (
                <Link
                  key={i}
                  href={`/resources/${guide.slug}`}
                  className="group rounded-xl bg-white/[0.04] border border-white/[0.08] p-6 hover:bg-white/[0.07] transition-colors no-underline block"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${guide.isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'}`}>
                    <Icon size={20} weight="regular" className={guide.isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
                  </div>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${guide.isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>
                    {guide.category}
                  </p>
                  <h3 className="font-display text-sm font-bold text-white leading-snug mb-3 group-hover:text-white/80 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">{guide.excerpt}</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${guide.isBlue ? 'text-brand-blue' : 'text-brand-orange'} group-hover:gap-2.5 transition-all`}>
                    Read guide
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hiring Insights */}
      <section className="py-10 lg:py-16">
        <div className="container">
          <div className="mb-10">
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">{cms.insights_label}</p>
            <h2 className="font-display text-4xl font-bold text-black">{cms.insights_heading}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {([
              { Icon: Lightbulb, heading: cms.insight_1_heading, body: cms.insight_1_body },
              { Icon: UsersThree, heading: cms.insight_2_heading, body: cms.insight_2_body },
              { Icon: BookOpen, heading: cms.insight_3_heading, body: cms.insight_3_body },
            ] as const).map(({ Icon, heading, body }, i) => (
              <div key={i} className="border-t-2 border-brand-orange/20 pt-6">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center mb-5">
                  <Icon size={20} weight="regular" className="text-brand-orange" />
                </div>
                <h3 className="font-display text-lg font-bold text-black mb-3">{heading}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14 bg-gray-50 border-t border-black/5">
        <div className="container">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/8">
            <div className="pb-10 md:pb-0 md:pr-14 lg:pr-20">
              <p className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-4">For Employers</p>
              <h2 className="font-display text-3xl font-bold text-black mb-4">
                Ready to find the right talent?
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                Tell us about your hiring needs and we&apos;ll design a solution that works for your organisation.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/services"
                  className="inline-block px-7 py-3.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
                >
                  View All Services
                </Link>
              </div>
            </div>
            <div className="pt-10 md:pt-0 md:pl-14 lg:pl-20">
              <p className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4">For Job Seekers</p>
              <h2 className="font-display text-3xl font-bold text-black mb-4">
                Find your next opportunity.
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                We connect talented professionals with top employers across Sierra Leone. Browse our latest openings or add your CV to our talent pool.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="inline-block px-7 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
                >
                  Browse Open Roles
                </Link>
                <Link
                  href="/apply"
                  className="inline-block px-7 py-3.5 border border-black/15 text-black text-sm font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
                >
                  Submit Your CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
