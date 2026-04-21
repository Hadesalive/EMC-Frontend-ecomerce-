import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Scales,
  CurrencyDollar,
  ClipboardText,
  UserCircle,
  ChartBar,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr'
import { GUIDES, getGuideBySlug } from '../guides'
import type { Guide } from '../guides'

const ICON_MAP: Record<Guide['iconKey'], React.ElementType> = {
  FileText,
  Scales,
  CurrencyDollar,
  ClipboardText,
  UserCircle,
  ChartBar,
}

export async function generateStaticParams() {
  return GUIDES.map(guide => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}

  const title = `${guide.title} | EMC Sierra Leone`
  const description = guide.excerpt

  return {
    title,
    description,
    alternates: { canonical: `https://expresssl.com/resources/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://expresssl.com/resources/${slug}`,
      type: 'article',
      images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const Icon = ICON_MAP[guide.iconKey]
  const accentColor = guide.isBlue ? 'text-brand-blue' : 'text-brand-orange'
  const accentBg = guide.isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'
  const accentBorder = guide.isBlue ? 'border-brand-blue/20' : 'border-brand-orange/20'
  const accentFill = guide.isBlue ? 'text-brand-blue' : 'text-brand-orange'

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-black pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container">

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium transition-colors no-underline mb-8 group"
          >
            <ArrowLeft size={15} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg ${accentBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} weight="regular" className={accentColor} />
                </div>
                <span className={`text-xs font-bold tracking-widest uppercase ${accentColor}`}>
                  {guide.category}
                </span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/40 text-xs">{guide.readTime}</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                {guide.title}
              </h1>

              <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
                {guide.intro}
              </p>
            </div>

            <div className="lg:col-span-4 lg:pt-2">
              <div className={`rounded-xl border ${accentBorder} bg-white/[0.04] p-5`}>
                <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-3">In this guide</p>
                <ol className="space-y-2">
                  {guide.sections.map((section, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                      <span className={`text-xs font-bold mt-0.5 ${accentColor} flex-shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="leading-snug">{section.heading}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">

            {guide.sections.map((section, si) => (
              <div key={si} className={`${si > 0 ? 'mt-12 pt-12 border-t border-black/5' : ''}`}>

                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold tracking-widest ${accentColor}`}>
                    {String(si + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-black capitalize">
                    {section.heading}
                  </h2>
                </div>

                {section.paragraphs.map((para, pi) => (
                  <p key={pi} className="text-black/70 leading-relaxed text-base mb-4 last:mb-0">
                    {para}
                  </p>
                ))}

                {section.tips && section.tips.length > 0 && (
                  <div className={`mt-6 rounded-xl border ${accentBorder} ${accentBg} p-5`}>
                    <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accentFill}`}>
                      {section.paragraphs.length === 0 ? 'Key points' : 'Key takeaways'}
                    </p>
                    <ul className="space-y-2">
                      {section.tips.map((tip, ti) => (
                        <li key={ti} className="flex items-start gap-2.5 text-sm text-black/70">
                          <CheckCircle
                            size={16}
                            weight="fill"
                            className={`${accentFill} flex-shrink-0 mt-0.5`}
                          />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-black py-10 lg:py-16">
        <div className="container">
          <p className={`text-xs font-medium tracking-widest uppercase mb-4 ${accentColor}`}>More Resources</p>
          <h2 className="font-display text-3xl font-bold text-white mb-8">Continue reading</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES.filter(g => g.slug !== guide.slug).slice(0, 3).map((related, i) => {
              const RelatedIcon = ICON_MAP[related.iconKey]
              return (
                <Link
                  key={i}
                  href={`/resources/${related.slug}`}
                  className="group rounded-xl bg-white/[0.04] border border-white/[0.08] p-6 hover:bg-white/[0.08] transition-colors no-underline block"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${related.isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'}`}>
                    <RelatedIcon size={18} weight="regular" className={related.isBlue ? 'text-brand-blue' : 'text-brand-orange'} />
                  </div>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${related.isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>
                    {related.category}
                  </p>
                  <h3 className="font-display text-sm font-bold text-white leading-snug mb-2 group-hover:text-white/80 transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">{related.excerpt}</p>
                </Link>
              )
            })}
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
                Need personalised HR support?
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                Our team provides hands-on guidance tailored to your business — from hiring strategy to HR policy development.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline group/btn"
                >
                  Get in Touch
                  <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
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
                Ready to find your next role?
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                We connect talented professionals with top employers across Sierra Leone. Browse our latest openings today.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline group/btn"
                >
                  Browse Open Roles
                  <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
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
