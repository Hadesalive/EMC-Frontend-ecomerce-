import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for a Job | Submit Your CV',
  description: 'Apply for a job or submit your CV to Express Management Consultancy in Sierra Leone. We recruit across mining, construction, healthcare, hospitality, logistics and more.',
  alternates: { canonical: 'https://expresssl.com/apply' },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
