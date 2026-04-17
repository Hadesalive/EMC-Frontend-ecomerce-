import type { Metadata } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/Layout/SiteShell'
import { ThemeProvider } from '@/components/Providers/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getContent } from '@/lib/cms'
import { DEFAULT_GLOBAL } from '@/lib/cms-types'
import type { GlobalContent } from '@/lib/cms-types'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://expresssl.com'),
  title: {
    default: 'Express Management Consultancy | Recruitment & HR Consultancy Sierra Leone',
    template: '%s | Express Management Consultancy',
  },
  description: 'Sierra Leone\'s leading recruitment agency and HR consultancy. EMC connects businesses in Freetown with top talent across mining, construction, healthcare, hospitality, logistics and more.',
  keywords: [
    'recruitment agency Sierra Leone',
    'HR consultancy Sierra Leone',
    'staffing agency Freetown',
    'management consultancy Sierra Leone',
    'jobs in Sierra Leone',
    'job vacancies Freetown',
    'executive search Sierra Leone',
    'HR outsourcing Sierra Leone',
    'mining recruitment Sierra Leone',
    'construction jobs Sierra Leone',
    'healthcare recruitment Sierra Leone',
    'hospitality jobs Sierra Leone',
    'logistics recruitment Freetown',
    'temporary staffing Sierra Leone',
    'contract staffing Sierra Leone',
    'Express Management Consultancy',
    'EMC Sierra Leone',
    'talent management Sierra Leone',
  ],
  authors: [{ name: 'Express Management Consultancy', url: 'https://expresssl.com' }],
  creator: 'Express Management Consultancy',
  publisher: 'Express Management Consultancy',
  icons: {
    icon: '/images/icon.png',
    apple: '/images/icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://expresssl.com',
    siteName: 'Express Management Consultancy',
    title: 'Express Management Consultancy | Recruitment & HR Consultancy Sierra Leone',
    description: 'Sierra Leone\'s leading recruitment agency and HR consultancy. Connecting businesses with top talent across all major industries.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express Management Consultancy | Recruitment & HR Consultancy Sierra Leone',
    description: 'Sierra Leone\'s leading recruitment agency and HR consultancy.',
  },
  alternates: {
    canonical: 'https://expresssl.com',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const globalData = await getContent<GlobalContent>('global', 'main')
  const global: GlobalContent = { ...DEFAULT_GLOBAL, ...globalData }

  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteShell footerDescription={global.site_description}>{children}</SiteShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness'],
              name: 'Express Management Consultancy',
              alternateName: 'EMC',
              url: 'https://expresssl.com',
              logo: 'https://expresssl.com/images/Emc%20Logo%20header.png',
              description: 'Sierra Leone\'s leading recruitment agency and HR consultancy, connecting businesses with top talent across all major industries.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '10 Waterside Road, Wilberforce',
                addressLocality: 'Freetown',
                addressCountry: 'SL',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+232-73-888888',
                contactType: 'customer service',
                email: 'recruitment@expresssl.com',
              },
              sameAs: [],
              founder: { '@type': 'Person', name: 'Abu Bakarr Turay' },
              foundingLocation: 'Freetown, Sierra Leone',
              areaServed: 'Sierra Leone',
              serviceType: ['Recruitment', 'HR Consulting', 'Management Consulting', 'Executive Search', 'HR Outsourcing', 'Contract Staffing'],
              priceRange: '$$',
            }),
          }}
        />
      </body>
    </html>
  )
}
