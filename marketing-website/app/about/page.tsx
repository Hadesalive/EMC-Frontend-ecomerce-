import type { Metadata } from 'next'

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

const team = [
  {
    name: 'Abu Bakarr Turay',
    title: 'Founder & CEO',
    bio: 'Abu Bakarr has a vision to create a business that offers an end-to-end service to clients, delivered by local experts on a global scale. A project manager and Supply Chain Management professional with over 15 years of experience in executive contracts and project management, he holds an LLM in International Trade & Commercial Law from the University of Essex and an MSc in Economics from the University of Sierra Leone.',
    image: '/images/team/abu-bakarr-turay.jpg',
    color: 'brand-blue',
  },
  {
    name: 'Aminata Sesay',
    title: 'Head of Recruitment',
    bio: 'Specialist in executive search and sector-specific talent acquisition with a track record across mining, healthcare, and FMCG.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    color: 'brand-orange',
  },
  {
    name: 'Mohamed Koroma',
    title: 'HR Consulting Manager',
    bio: 'Certified HR practitioner focused on policy design, organisational development, and performance management systems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    color: 'brand-blue',
  },
  {
    name: 'Fatmata Conteh',
    title: 'Client Relations Manager',
    bio: 'Dedicated to building long-term client partnerships and ensuring every engagement delivers measurable, lasting outcomes.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    color: 'brand-orange',
  },
]

const values = [
  { num: '01', name: 'Integrity', desc: 'Upholding transparency and professional ethics in all engagements.' },
  { num: '02', name: 'Excellence', desc: 'Delivering superior solutions with attention to quality and detail.' },
  { num: '03', name: 'Confidentiality', desc: 'Ensuring secure and discreet handling of all client and candidate information.' },
  { num: '04', name: 'Innovation', desc: 'Leveraging technology and modern methods to continuously improve our results.' },
  { num: '05', name: 'Partnership', desc: 'Building long-term, mutually beneficial relationships with every client and candidate.' },
]

export default function AboutPage() {
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
                    <p className="text-xs text-white/40 leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">
                Who we are
              </h2>
              <p className="text-lg text-black/70 leading-relaxed mb-5">
                Express Management Consultancy is a team of veteran business leaders, analysts, and researchers united in the mission to use data and experience to improve our clients&rsquo; businesses. We do not work like traditional consultants — we roll up our sleeves and work alongside our clients&rsquo; teams to fix problems.
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-8">
                Our inputs don&rsquo;t stop at a report. We are relentless in our pursuit of measurable results — whether that means increased revenue, a more efficient employee structure, higher customer satisfaction, or improved profitability. EMC helps businesses achieve aggressive, profitable and sustainable growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
                  <div className="w-1 h-16 bg-brand-blue rounded-full flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-1">Our Vision</p>
                    <p className="text-black/70 leading-relaxed">We are motivated by people and product. We intend to provide a single-source solution with the highest standards of quality, supported with innovative technology, at a fair price point, and delivered by a team of exceptional people who believe in our values.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-brand-orange/5 rounded-xl border border-brand-orange/10">
                  <div className="w-1 h-16 bg-brand-orange rounded-full flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-1">Our Mission</p>
                    <p className="text-black/70 leading-relaxed">To make a positive impact every day by breaking boundaries and building a better business that inspires others. We listen to our clients and evolve our offering to put our people at the heart of our journey, sharing in business success by rewarding high performers who work with energy and agility.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 rounded-2xl blur-2xl scale-105" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80"
                  alt="EMC team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="mb-14">
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-3">Our People</p>
            <h2 className="font-display text-4xl font-bold text-black tracking-tight">Meet the team</h2>
            <p className="text-black/60 text-lg mt-4 max-w-2xl leading-relaxed">
              We foster a culture of leading by example, inspiring and engaging others to empower our people to reach their full potential. Our Executive Committee comprises experienced individuals from all walks of life — we recruit the best talent and put the right people in the right positions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => {
              const isBlue = member.color === 'brand-blue'
              return (
                <div key={i} className="group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-5 shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className={`text-xs font-semibold mb-1 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>
                    {member.title}
                  </div>
                  <h3 className="font-display text-lg font-bold text-black mb-2">{member.name}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">{member.bio}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values — dark, editorial */}
      <section className="bg-black py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-2">Our Values</h2>
            <p className="text-white/40 text-lg mb-14">The principles that guide every engagement we take on.</p>

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
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=80"
                  alt="Community engagement"
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
