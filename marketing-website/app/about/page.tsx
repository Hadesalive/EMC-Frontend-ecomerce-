import type { Metadata } from 'next'
import Image from 'next/image'
import TeamSection from './TeamSection'
import { getContent, getTeamMembers } from '@/lib/cms'
import {
  DEFAULT_ABOUT_INTRO,
  DEFAULT_ABOUT_PURPOSE,
  DEFAULT_ABOUT_HERO,
  DEFAULT_ABOUT_VALUES,
  DEFAULT_ABOUT_CSR,
} from '@/lib/cms-types'
import type {
  AboutIntroContent,
  AboutPurposeContent,
  AboutHeroContent,
  AboutValuesContent,
  AboutCSRContent,
} from '@/lib/cms-types'

export const metadata: Metadata = {
  title: 'About Us | Recruitment Consultancy Sierra Leone',
  description: 'Learn about Express Management Consultancy — founded by Abu Bakarr Turay. A team of veteran business leaders driving talent management and HR solutions across Sierra Leone.',
  alternates: { canonical: 'https://expresssl.com/about' },
  openGraph: {
    title: 'About Express Management Consultancy | Sierra Leone',
    description: 'Founded by Abu Bakarr Turay. A veteran team of business leaders and analysts dedicated to recruitment and HR excellence in Sierra Leone.',
    url: 'https://expresssl.com/about',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Express Management Consultancy | Sierra Leone',
    description: 'Founded by Abu Bakarr Turay. A veteran team of business leaders and analysts dedicated to recruitment and HR excellence in Sierra Leone.',
  },
}

const STAT_COLORS = ['text-brand-blue', 'text-brand-orange', 'text-brand-blue', 'text-brand-orange']

export default async function AboutPage() {
  const [introData, purposeData, heroData, valuesData, csrData, team] = await Promise.all([
    getContent<AboutIntroContent>('about', 'intro'),
    getContent<AboutPurposeContent>('about', 'purpose'),
    getContent<AboutHeroContent>('about', 'hero'),
    getContent<AboutValuesContent>('about', 'values'),
    getContent<AboutCSRContent>('about', 'csr'),
    getTeamMembers(),
  ])

  const intro: AboutIntroContent = { ...DEFAULT_ABOUT_INTRO, ...introData }
  const purpose: AboutPurposeContent = { ...DEFAULT_ABOUT_PURPOSE, ...purposeData }
  const hero: AboutHeroContent = {
    subtext: (heroData as AboutHeroContent | null)?.subtext ?? DEFAULT_ABOUT_HERO.subtext,
    stats: (heroData as AboutHeroContent | null)?.stats ?? DEFAULT_ABOUT_HERO.stats,
  }
  const values: AboutValuesContent = {
    heading: (valuesData as AboutValuesContent | null)?.heading ?? DEFAULT_ABOUT_VALUES.heading,
    subtext: (valuesData as AboutValuesContent | null)?.subtext ?? DEFAULT_ABOUT_VALUES.subtext,
    values: (valuesData as AboutValuesContent | null)?.values ?? DEFAULT_ABOUT_VALUES.values,
  }
  const csr: AboutCSRContent = { ...DEFAULT_ABOUT_CSR, ...csrData }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero — 2-col: headline left, stats grid right */}
      <section className="bg-black pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4 lg:mb-6">About EMC</p>
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5 lg:mb-8 tracking-tight">
                Built for the people<br />
                <span className="text-brand-blue">who build</span>{' '}
                <span className="text-brand-orange">businesses.</span>
              </h1>
              <p className="text-base lg:text-xl text-white/60 leading-relaxed">
                {hero.subtext}
              </p>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
                {hero.stats.map((item, i) => (
                  <div key={i} className="bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors">
                    <p className={`text-sm font-semibold mb-2 leading-snug ${STAT_COLORS[i] ?? 'text-brand-blue'}`}>{item.label}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us — prose + photo */}
      <section className="py-10 lg:py-16 border-b border-black/5">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">

            {/* Text */}
            <div className="lg:col-span-7">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-5">About Us</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-10 tracking-tight leading-tight">
                Who we are
              </h2>
              <div className="space-y-6 text-[17px] text-black/65 leading-[1.8]">
                <p>{intro.paragraph_1}</p>
                <p>{intro.paragraph_2}</p>
                <p>{intro.paragraph_3}</p>
              </div>
            </div>

            {/* Photo */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 rounded-3xl blur-2xl" aria-hidden="true" />
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
                  <Image
                    src={intro.image_url}
                    alt={intro.image_alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Purpose / Vision / Mission */}
      <section className="bg-gray-950 py-10 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

            <div className="py-8 md:py-0 md:pr-12 lg:pr-16">
              <p className="text-white/60 text-xs font-medium tracking-widest uppercase mb-6">01 &mdash; Purpose</p>
              <h3 className="font-display text-2xl font-bold text-white mb-5 leading-snug">
                {purpose.purpose_heading}
              </h3>
              <p className="text-white/60 leading-relaxed text-[15px]">
                {purpose.purpose_body}
              </p>
            </div>

            <div className="py-8 md:py-0 md:px-12 lg:px-16">
              <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-6">02 &mdash; Vision</p>
              <h3 className="font-display text-2xl font-bold text-white mb-5 leading-snug">
                {purpose.vision_heading}
              </h3>
              <p className="text-white/60 leading-relaxed text-[15px]">
                {purpose.vision_body}
              </p>
            </div>

            <div className="py-8 md:py-0 md:pl-12 lg:pl-16">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-6">03 &mdash; Mission</p>
              <h3 className="font-display text-2xl font-bold text-white mb-5 leading-snug">
                {purpose.mission_heading}
              </h3>
              <p className="text-white/60 leading-relaxed text-[15px]">
                {purpose.mission_body}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-10 lg:py-16 bg-white border-t border-black/5">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-4">
            <div>
              <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">Our Leadership</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
                The people<br />behind EMC.
              </h2>
            </div>
            <p className="text-black/50 leading-relaxed max-w-sm lg:text-right text-sm">
              The right people in the right positions — a diverse team built to deliver, not to impress on paper.
            </p>
          </div>
          <TeamSection team={team} />
        </div>
      </section>

      {/* Values — dark, editorial */}
      <section className="bg-black py-10 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-2">{values.heading}</h2>
            <p className="text-white/60 text-lg mb-14">{values.subtext}</p>

            {values.values.length > 0 && (
              <>
                {/* Featured first value */}
                <div className="py-10 border-b border-white/10">
                  <div className="flex items-start gap-6 mb-4">
                    <span className="font-display text-5xl font-bold text-brand-orange/40 leading-none">{values.values[0].num}</span>
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white mb-3">{values.values[0].name}</h3>
                      <p className="text-white/55 text-lg leading-relaxed max-w-xl">{values.values[0].desc}</p>
                    </div>
                  </div>
                </div>

                {/* Remaining values */}
                <div className="divide-y divide-white/10">
                  {values.values.slice(1).map((v, i) => (
                    <div key={i} className="flex items-start gap-4 sm:gap-8 py-5 sm:py-8 group">
                      <span className="font-display text-3xl font-bold text-white/10 group-hover:text-brand-orange transition-colors duration-300 w-12 flex-shrink-0">
                        {v.num}
                      </span>
                      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                        <h3 className="font-display text-xl font-bold text-white w-44 flex-shrink-0">{v.name}</h3>
                        <p className="text-white/50 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CSR / Community */}
      <section className="py-10 lg:py-16 border-t border-black/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 rounded-2xl blur-2xl scale-105" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src={csr.image_url}
                  alt={csr.image_alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">{csr.label}</p>
              <h2 className="font-display text-4xl font-bold text-black mb-6 tracking-tight">
                {csr.heading}
              </h2>
              <p className="text-base lg:text-lg text-black/70 leading-relaxed mb-5">
                {csr.paragraph_1}
              </p>
              <p className="text-base lg:text-lg text-black/70 leading-relaxed">
                {csr.paragraph_2}
              </p>
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
              <h2 className="font-display text-3xl font-bold text-black mb-4 tracking-tight">
                Ready to grow your team?
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                {"Let's talk about how EMC can support your organisation's growth and talent strategy."}
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
                  Our Services
                </a>
              </div>
            </div>
            {/* Job Seekers */}
            <div className="pt-10 md:pt-0 md:pl-14 lg:pl-20">
              <p className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4">For Job Seekers</p>
              <h2 className="font-display text-3xl font-bold text-black mb-4 tracking-tight">
                Looking for your next role?
              </h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">
                Browse our open positions or send us your CV. We place candidates across mining, construction, healthcare, hospitality and more.
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
