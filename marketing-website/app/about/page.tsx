import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Express Management Consultancy - our mission, values, and commitment to exceptional talent management and recruitment solutions in Sierra Leone.',
  openGraph: {
    title: 'About Us | Express Management Consultancy',
    description: 'Learn about Express Management Consultancy and our commitment to excellence.',
  },
}

const team = [
  {
    name: 'Ibrahim Kamara',
    title: 'Managing Director',
    bio: 'Over 15 years of experience in HR and workforce strategy across Sierra Leone and West Africa.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
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

      {/* Dark Hero */}
      <section className="bg-black pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-6">About EMC</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
              Built for the people<br />
              <span className="text-brand-blue">who build</span>{' '}
              <span className="text-brand-orange">businesses.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              Express Management Consultancy connects organisations with exceptional talent and delivers strategic HR and management solutions across Sierra Leone and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-b border-black/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2,500+', label: 'Successful Placements', color: 'text-brand-blue' },
              { value: '500+',   label: 'Trusted Companies',     color: 'text-brand-orange' },
              { value: '98%',    label: 'Success Rate',          color: 'text-brand-blue' },
              { value: '11',     label: 'Industries Served',     color: 'text-brand-orange' },
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-black/50 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story — split layout */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">
                Who we are
              </h2>
              <p className="text-lg text-black/70 leading-relaxed mb-5">
                Express Management Consultancy (EMC) is a professional recruitment and management consultancy dedicated to delivering comprehensive workforce solutions and strategic business support in Sierra Leone and beyond.
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-8">
                We specialise in connecting organisations with exceptional talent while offering expert advisory services that strengthen operational efficiency, improve organisational structures, and support business growth. Our team combines deep local market knowledge with global best practices to drive impactful results.
              </p>
              <div className="flex items-start gap-4 p-5 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
                <div className="w-1 h-16 bg-brand-blue rounded-full flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-1">Our Vision</p>
                  <p className="text-black/70 leading-relaxed">To be a leading recruitment and management consultancy recognised for excellence, integrity, and impactful business solutions across Sierra Leone and beyond.</p>
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
      <section className="py-24 bg-gradient-to-br from-blue-50/30 to-orange-50/20">
        <div className="container">
          <div className="mb-14">
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-3">Our People</p>
            <h2 className="font-display text-4xl font-bold text-black tracking-tight">Meet the team</h2>
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

      {/* Values — dark, editorial numbered list */}
      <section className="bg-black py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-2">Our Values</h2>
            <p className="text-white/40 text-lg mb-14">The principles that guide every engagement we take on.</p>
            <div className="divide-y divide-white/10">
              {values.map((v, i) => (
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

      {/* Mission Quote */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/70 text-xs font-medium tracking-widest uppercase mb-8">Our Mission</p>
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
              &ldquo;To empower organisations in Sierra Leone and beyond with high-quality talent and strategic management services that drive sustainable growth, productivity, and long-term success.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* CSR / Community */}
      <section className="py-24">
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
                At EMC, we believe that responsible business goes beyond client engagements. We actively support ethical recruitment practices, promote fair employment standards, and contribute to community workforce development initiatives.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                Through training programmes, awareness initiatives, and partnerships with local organisations, we work to foster education and create meaningful career opportunities for people across Sierra Leone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 to-orange-50/20">
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
