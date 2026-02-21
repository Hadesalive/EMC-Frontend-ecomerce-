import type { Metadata } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/Layout/SiteShell'
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
  description: 'Leading talent management and recruitment solutions in Sierra Leone.',
  keywords: ['recruitment', 'talent management', 'HR solutions', 'staffing', 'consultancy'],
  authors: [{ name: 'Express Management Consultancy' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Express Management Consultancy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
