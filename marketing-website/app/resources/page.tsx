import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { getContent } from '@/lib/cms'
import { DEFAULT_RESOURCES } from '@/lib/cms-types'
import type { ResourcesContent } from '@/lib/cms-types'

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

export default async function ResourcesPage() {
  const data = await getContent<ResourcesContent>('resources', 'main')
  const content: ResourcesContent = { ...DEFAULT_RESOURCES, ...data }

  return (
    <div className="min-h-screen bg-black flex flex-col">

      <section className="flex-1 flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">

            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-8">Knowledge Hub</p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              {content.heading}
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-md mx-auto">
              {content.subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all no-underline group"
              >
                Get in touch
                <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white text-sm font-semibold rounded-lg hover:border-white/30 hover:bg-white/5 transition-all no-underline"
              >
                Browse open roles
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
