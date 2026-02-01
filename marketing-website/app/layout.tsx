import type { Metadata } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from '@/components/Providers/ThemeProvider'

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
  title: {
    default: 'Express Management Consultancy - Talent Management Platform',
    template: '%s | Express Management Consultancy'
  },
  description: 'Leading talent management and recruitment solutions. Modern, efficient, and scalable platform for recruitment, client management, and employee self-service.',
  keywords: ['recruitment', 'talent management', 'HR solutions', 'staffing', 'consultancy'],
  authors: [{ name: 'Express Management Consultancy' }],
  creator: 'Express Management Consultancy',
  publisher: 'Express Management Consultancy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Express Management Consultancy',
    title: 'Express Management Consultancy - Talent Management Platform',
    description: 'Leading talent management and recruitment solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Express Management Consultancy',
    description: 'Leading talent management and recruitment solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

