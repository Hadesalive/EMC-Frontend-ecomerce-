import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for a Job | Submit Your CV — EMC Sierra Leone',
  description: 'Apply for a job or submit your CV to Express Management Consultancy in Sierra Leone. We recruit across mining, construction, healthcare, hospitality, logistics and more.',
  alternates: { canonical: 'https://expresssl.com/apply' },
  openGraph: {
    title: 'Apply for a Job | Submit Your CV — EMC Sierra Leone',
    description: 'Apply for a job or submit your CV to Express Management Consultancy. We recruit across mining, construction, healthcare, hospitality, logistics and more.',
    url: 'https://expresssl.com/apply',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply for a Job | Submit Your CV — EMC Sierra Leone',
    description: 'Apply for a job or submit your CV to Express Management Consultancy in Sierra Leone.',
  },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
