import type { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Features from '@/components/Home/Features'
import JobsPreview from '@/components/Home/JobsPreview'
import ServicesSection from '@/components/Home/ServicesSection'
import CTA from '@/components/Home/CTA'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Express Management Consultancy - Sierra Leone\'s specialist recruitment and HR consultancy. We help growing businesses hire the right people and build stronger teams.',
  openGraph: {
    title: 'Express Management Consultancy',
    description: 'Sierra Leone\'s specialist recruitment and HR consultancy.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <JobsPreview />
      <ServicesSection />
      <CTA />
    </>
  )
}

