import type { Metadata } from 'next'
import TeamSection from './TeamSection'
import { getContent, getTeamMembers } from '@/lib/cms'
import { DEFAULT_ABOUT_INTRO, DEFAULT_ABOUT_PURPOSE } from '@/lib/cms-types'
import type { AboutIntroContent, AboutPurposeContent } from '@/lib/cms-types'

export const metadata: Metadata = {
  title: 'About Us | Recruitment Consultancy Sierra Leone',
  description: 'Learn about Express Management Consultancy — founded by Abu Bakarr Turay. A team of veteran business leaders driving talent management and HR solutions across Sierra Leone.',
  alternates: { canonical: 'https://expresssl.com/about' },
  openGraph: {
    title: 'About Express Management Consultancy | Sierra Leone',
    description: 'Founded by Abu Bakarr Turay. A veteran team of business leaders and analysts dedicated to recruitment and HR excellence in Sierra Leone.',
    url: 'https://expresssl.com/about',
  },
}

const values = [
  { num: '01', name: 'Integrity', desc: 'Upholding transparency and professional ethics in all engagements.' },
  { num: '02', name: 'Excellence', desc: 'Delivering superior solutions with attention to quality and detail.' },
  { num: '03', name: 'Confidentiality', desc: 'Ensuring secure and discreet handling of all client and candidate information.' },
  { num: '04', name: 'Innovation', desc: 'Leveraging technology and modern methods to continuously improve our results.' },
  { num: '05', name: 'Partnership', desc: 'Building long-term, mutually beneficial relationships with every client and candidate.' },
]

export default async function AboutPage() {
  const [introData, purposeData, team] = await Promise.all([
    getContent<AboutIntroContent>('about', 'intro'),
    getContent<AboutPurposeContent>('about', 'purpose'),
    getTeamMembers(),
  ])

  const intro: AboutIntroContent = { ...DEFAULT_ABOUT_INTRO, ...introData }
  const purpose: AboutPurposeContent = { ...DEFAULT_ABOUT_PURPOSE, ...purposeData }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero — 2-col: headline left, stats grid right */}
      <section className="bg-black pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-6">About EMC</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
                Built for the people<br />
                <span className="text-brand-blue">who build</span>{' '}
                <span className="text-brand-orange">businesses.</span>
              </h1>
              <p className="text-xl text-white/60 leading-relaxed">
                A Freetown-based recruitment and HR consultancy. We help Sierra Leone&rsquo;s organisations hire better, manage smarter, and build teams that last.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
                {[
                  { label: 'Sierra Leone-focused',  sub: 'Built for this market, not adapted to it',      color: 'text-brand-blue' },
                  { label: 'Transparent process',   sub: 'Clear updates from brief to placement',          color: 'text-brand-orange' },
                  { label: 'No placement, no fee',  sub: 'Our interests are only aligned when yours are',  color: 'text-brand-blue' },
                  { label: 'Confidential search',   sub: 'Every brief and candidate handled discreetly',   color: 'text-brand-orange' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors">
                    <p className={`text-sm font-semibold mb-2 leading-snug ${item.color}`}>{item.label}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us — prose + photo */}
      <section className="py-24 border-b border-black/5">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

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
                  <img
                    src={intro.image_url}
                    alt={intro.image_alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Purpose / Vision / Mission */}
      <section className="bg-gray-950 py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

            <div className="py-10 md:py-0 md:pr-12 lg:pr-16">
              <p className="text-white/60 text-xs font-medium tracking-widest uppercase mb-6">01 &mdash; Purpose</p>
              <h3 className="font-display text-2xl font-bold text-white mb-5 leading-snug">
                {purpose.purpose_heading}
              </h3>
              <p className="text-white/60 leading-relaxed text-[15px]">
                {purpose.purpose_body}
              </p>
            </div>

            <div className="py-10 md:py-0 md:px-12 lg:px-16">
              <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-6">02 &mdash; Vision</p>
              <h3 className="font-display text-2xl font-bold text-white mb-5 leading-snug">
                {purpose.vision_heading}
              </h3>
              <p className="text-white/60 leading-relaxed text-[15px]">
                {purpose.vision_body}
              </p>
            </div>

            <div className="py-10 md:py-0 md:pl-12 lg:pl-16">
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
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="mb-14">
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-3">Our Leadership</p>
            <h2 className="font-display text-4xl font-bold text-black tracking-tight mb-5">Meet the team</h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-black/60 text-lg leading-relaxed">
                We foster a culture of leading by example, inspiring and engaging others to empower our people to reach their full potential and in turn contribute to collective goals.
              </p>
              <p className="text-black/60 text-lg leading-relaxed">
                Our Executive Committee comprises of well experienced individuals from all works of life. We don&rsquo;t add up years spent in the industry as a measurement of success or leadership qualities, we simply look to recruit the best talent and put the right people in the right positions to deliver the diverse mix of skillsets required to drive our business forward.
              </p>
            </div>
          </div>
          <TeamSection team={team} />
        </div>
      </section>

      {/* Values — dark, editorial */}
      <section className="bg-black py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-2">Our Values</h2>
            <p className="text-white/60 text-lg mb-14">The principles that guide every engagement we take on.</p>

            {/* Featured first value */}
            <div className="py-10 border-b border-white/10">
              <div className="flex items-start gap-6 mb-4">
                <span className="font-display text-5xl font-bold text-brand-orange/40 leading-none">{values[0].num}</span>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white mb-3">{values[0].name}</h3>
                  <p className="text-white/55 text-lg leading-relaxed max-w-xl">{values[0].desc}</p>
                </div>
              </div>
            </div>

            {/* Remaining values */}
            <div className="divide-y divide-white/10">
              {values.slice(1).map((v, i) => (
                <div key={i} className="flex items-start gap-8 py-8 group">
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
          </div>
        </div>
      </section>

      {/* CSR / Community */}
      <section className="py-24 border-t border-black/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 rounded-2xl blur-2xl scale-105" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=80"
                  alt="Cape Town aerial view — African coastal city"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Community &amp; CSR</p>
              <h2 className="font-display text-4xl font-bold text-black mb-6 tracking-tight">
                Giving back to<br />our community
              </h2>
              <p className="text-lg text-black/70 leading-relaxed mb-5">
                Good recruitment has a real impact on people&rsquo;s lives — not just on business outcomes. We take that responsibility seriously. Every candidate we work with is treated with honesty about the roles we&rsquo;re briefed on and the realistic chances of success.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                We are committed to fair, transparent hiring practices across Sierra Leone — and to working with employers who share those standards. Through local partnerships and training initiatives, we aim to create real opportunities, not just fill vacancies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-black/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-black mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-black/60 mb-8">
              {"Let's talk about how EMC can support your organisation's growth and talent strategy."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
