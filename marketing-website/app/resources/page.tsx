import type { Metadata } from 'next'
import {
  DocumentTextIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  NewspaperIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Access valuable resources, guides, and insights to help you make informed decisions about talent management and recruitment.',
  openGraph: {
    title: 'Resources | Express Management Consultancy',
    description: 'Valuable resources and insights for talent management.',
  },
}

const featured = {
  tag: 'Guide',
  title: "The Employer's Guide to Hiring in Sierra Leone",
  description: 'A practical overview of labour laws, employment contracts, and compliance requirements for businesses operating in Sierra Leone. Everything you need before making your first hire.',
  readTime: '8 min read',
}

const articles = [
  {
    icon: ClipboardDocumentListIcon,
    color: 'brand-orange',
    tag: 'Checklist',
    title: 'Recruitment Readiness Checklist',
    description: 'Ensure your organisation is fully prepared before starting a recruitment drive — from job design to onboarding plans.',
    readTime: '4 min read',
  },
  {
    icon: LightBulbIcon,
    color: 'brand-blue',
    tag: 'Insight',
    title: 'How to Write a Job Description That Attracts Top Talent',
    description: 'Learn how to craft compelling job descriptions that clearly communicate expectations and draw in the right candidates.',
    readTime: '5 min read',
  },
  {
    icon: NewspaperIcon,
    color: 'brand-orange',
    tag: 'Article',
    title: 'HR Trends Shaping Workplaces in West Africa',
    description: 'An overview of the evolving HR landscape — from flexible work models to digital HRIS adoption — and what it means for your business.',
    readTime: '6 min read',
  },
  {
    icon: AcademicCapIcon,
    color: 'brand-blue',
    tag: 'Guide',
    title: 'Building a High-Performing Team from the Ground Up',
    description: 'Practical strategies for recruiting, onboarding, and retaining talent that drives long-term business performance.',
    readTime: '7 min read',
  },
  {
    icon: DocumentTextIcon,
    color: 'brand-orange',
    tag: 'Template',
    title: 'Employee Onboarding Plan Template',
    description: 'A ready-to-use onboarding framework to help new hires integrate quickly and feel confident from day one.',
    readTime: '3 min read',
  },
]

const faqs = [
  {
    q: 'How long does the recruitment process typically take?',
    a: 'For most roles, we aim to deliver a qualified shortlist within 5–10 business days. Executive search and specialist roles may take longer. We keep you updated at every stage.',
  },
  {
    q: 'Do you work with both local and international organisations?',
    a: 'Yes. We serve organisations based in Sierra Leone as well as international companies looking to hire locally. Our team understands both the local market and international standards.',
  },
  {
    q: 'What industries do you specialise in?',
    a: 'We have experience across a wide range of sectors including construction, mining, healthcare, hospitality, FMCG, logistics, IT, government, and more.',
  },
  {
    q: 'Can you handle high-volume or bulk recruitment?',
    a: 'Absolutely. We offer dedicated mass recruitment solutions for large-scale hiring drives, including structured assessment centres and coordinated scheduling.',
  },
  {
    q: "What happens if a placed candidate doesn't work out?",
    a: "We offer a replacement guarantee for permanent placements. If a candidate leaves or doesn't meet expectations within the agreed period, we will re-recruit at no additional charge.",
  },
  {
    q: 'Do you offer HR consulting as a standalone service?',
    a: 'Yes. Our HR consulting services — including policy development, performance management, and compensation design — can be engaged independently of recruitment.',
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-black pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-6">Knowledge Hub</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
              Resources
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              Guides, insights, and tools to help you hire smarter, manage better, and build stronger organisations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-20 border-b border-black/5">
        <div className="container">
          <p className="text-xs font-medium text-black/40 tracking-widest uppercase mb-8">Featured</p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue mb-5">
                {featured.tag}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-black leading-snug mb-5">
                {featured.title}
              </h2>
              <p className="text-black/60 leading-relaxed mb-6 text-lg">
                {featured.description}
              </p>
              <div className="flex items-center gap-5">
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all no-underline group/btn">
                  Read Guide
                  <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <span className="text-sm text-black/40">{featured.readTime}</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 rounded-2xl blur-2xl scale-105" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&q=80"
                  alt="Hiring guide"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles — editorial list */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-10 pb-6 border-b border-black/5">
            <h2 className="font-display text-3xl font-bold text-black">More Resources</h2>
            <span className="text-sm text-black/40">{articles.length} articles</span>
          </div>

          <div className="divide-y divide-black/5">
            {articles.map((a, i) => {
              const Icon = a.icon
              const isBlue = a.color === 'brand-blue'
              return (
                <div key={i} className="group flex items-start gap-6 py-8 hover:bg-black/[0.015] -mx-6 px-6 rounded-xl transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'}`}>
                    <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`text-xs font-semibold ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>{a.tag}</span>
                      <span className="text-xs text-black/30">{a.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-black mb-1.5 group-hover:text-brand-blue transition-colors duration-200">
                      {a.title}
                    </h3>
                    <p className="text-black/55 text-sm leading-relaxed">{a.description}</p>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-black/20 group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1.5" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ — dark, 2-col */}
      <section className="bg-black py-24">
        <div className="container">
          <div className="mb-14">
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-display text-4xl font-bold text-white">Common questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-white/10 pt-8">
                <h3 className="font-display text-base font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold text-black mb-4">
              Have a specific question?
            </h2>
            <p className="text-lg text-black/60 mb-8">
              Our team is happy to answer any queries about our services, process, or how we can support your organisation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
              >
                Contact Our Team
              </a>
              <a
                href="/solutions"
                className="inline-block px-8 py-4 border border-black/15 text-black text-base font-semibold rounded-lg hover:border-black/30 hover:bg-black/5 transition-all duration-200 no-underline"
              >
                Explore Our Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
