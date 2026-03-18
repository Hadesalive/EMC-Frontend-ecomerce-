import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Placement | Hire Talent in Sierra Leone — EMC',
  description: 'Submit a staffing request to Express Management Consultancy. Tell us the role, sector and requirements — we will find the right candidate for your business in Sierra Leone.',
  alternates: { canonical: 'https://expresssl.com/request-placement' },
  openGraph: {
    title: 'Request a Placement | Hire Talent in Sierra Leone — EMC',
    description: 'Submit a staffing request to Express Management Consultancy. Tell us the role, sector and requirements — we will find the right candidate for your business.',
    url: 'https://expresssl.com/request-placement',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Placement | Hire Talent in Sierra Leone — EMC',
    description: 'Submit a staffing request to Express Management Consultancy. We will find the right candidate for your business in Sierra Leone.',
  },
}

export default function RequestPlacementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
