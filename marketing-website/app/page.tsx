import type { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Features from '@/components/Home/Features'
import ServicesSection from '@/components/Home/ServicesSection'
import CTA from '@/components/Home/CTA'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Express Management Consultancy - Leading talent management and recruitment solutions. Modern, efficient, and scalable platform for your business.',
  openGraph: {
    title: 'Express Management Consultancy - Talent Management Platform',
    description: 'Leading talent management and recruitment solutions.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ServicesSection />
      <CTA />
    </>
  )
}

