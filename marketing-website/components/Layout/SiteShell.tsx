'use client'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isApp = pathname?.startsWith('/dashboard') ||
                pathname?.startsWith('/candidate') ||
                pathname?.startsWith('/auth') ||
                pathname?.startsWith('/request-placement')

  const hideFooter = pathname?.startsWith('/jobs')

  if (isApp) return <>{children}</>

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:text-sm focus:font-semibold focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      {!hideFooter && <Footer />}
    </>
  )
}
