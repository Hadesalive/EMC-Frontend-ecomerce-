import type { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Features from '@/components/Home/Features'
import JobsPreview from '@/components/Home/JobsPreview'
import ServicesSection from '@/components/Home/ServicesSection'
import CTA from '@/components/Home/CTA'
import { createAdminClient } from '@/lib/supabase/server'
import { getContent } from '@/lib/cms'
import type { JobRow } from '@/lib/supabase/types'
import type { HeroContent, FeaturesContent, CTAContent, HomeServicesContent } from '@/lib/cms-types'
import { DEFAULT_HOME_SERVICES } from '@/lib/cms-types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Recruitment Agency & HR Consultancy | Sierra Leone',
  description: 'Express Management Consultancy — Sierra Leone\'s leading recruitment agency. We place top talent in mining, construction, healthcare, hospitality, logistics and more across Freetown and beyond.',
  alternates: { canonical: 'https://expresssl.com' },
  openGraph: {
    title: 'Express Management Consultancy | Recruitment & HR Consultancy Sierra Leone',
    description: 'Sierra Leone\'s leading recruitment agency. Top talent placement across mining, construction, healthcare, hospitality, logistics and more.',
    url: 'https://expresssl.com',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express Management Consultancy | Recruitment & HR Consultancy Sierra Leone',
    description: 'Sierra Leone\'s leading recruitment agency. Top talent placement across mining, construction, healthcare, hospitality, logistics and more.',
  },
}

export default async function HomePage() {
  const supabase = createAdminClient()

  const [raw, hero, features, servicesData, cta] = await Promise.all([
    supabase
      .from('jobs')
      .select('id, title, sector, type, location, urgent, created_at, deadline')
      .eq('is_active', true)
      .order('urgent', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(3)
      .then(r => r.data),
    getContent<HeroContent>('home', 'hero'),
    getContent<FeaturesContent>('home', 'features'),
    getContent<HomeServicesContent>('home', 'services'),
    getContent<CTAContent>('home', 'cta'),
  ])

  const homeServices: HomeServicesContent = {
    section_label: (servicesData as HomeServicesContent | null)?.section_label ?? DEFAULT_HOME_SERVICES.section_label,
    heading: (servicesData as HomeServicesContent | null)?.heading ?? DEFAULT_HOME_SERVICES.heading,
    services: (servicesData as HomeServicesContent | null)?.services ?? DEFAULT_HOME_SERVICES.services,
  }

  const jobs = (raw ?? []) as unknown as Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'urgent' | 'created_at' | 'deadline'>[]

  return (
    <>
      <Hero content={hero ?? undefined} />
      <Features content={features ?? undefined} />
      <JobsPreview jobs={jobs} />
      <ServicesSection content={homeServices} />
      <CTA content={cta ?? undefined} />
    </>
  )
}
