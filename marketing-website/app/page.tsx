import type { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Features from '@/components/Home/Features'
import JobsPreview from '@/components/Home/JobsPreview'
import ServicesSection from '@/components/Home/ServicesSection'
import CTA from '@/components/Home/CTA'
import { createAdminClient } from '@/lib/supabase/server'
import type { JobRow } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Recruitment Agency & HR Consultancy | Sierra Leone',
  description: 'Express Management Consultancy — Sierra Leone\'s leading recruitment agency. We place top talent in mining, construction, healthcare, hospitality, logistics and more across Freetown and beyond.',
  alternates: { canonical: 'https://expresssl.com' },
  openGraph: {
    title: 'Express Management Consultancy | Recruitment & HR Consultancy Sierra Leone',
    description: 'Sierra Leone\'s leading recruitment agency. Top talent placement across mining, construction, healthcare, hospitality, logistics and more.',
    url: 'https://expresssl.com',
  },
}

export default async function HomePage() {
  const supabase = createAdminClient()
  const { data: raw } = await supabase
    .from('jobs')
    .select('id, title, sector, type, location, urgent, created_at')
    .eq('is_active', true)
    .order('urgent', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(3)

  const jobs = (raw ?? []) as unknown as Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'urgent' | 'created_at'>[]

  return (
    <>
      <Hero />
      <Features />
      <JobsPreview jobs={jobs} />
      <ServicesSection />
      <CTA />
    </>
  )
}

