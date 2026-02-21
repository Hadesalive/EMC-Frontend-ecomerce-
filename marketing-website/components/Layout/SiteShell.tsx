'use client'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isApp = pathname?.startsWith('/dashboard') ||
                pathname?.startsWith('/auth') ||
                pathname?.startsWith('/apply') ||
                pathname?.startsWith('/request-placement') ||
                pathname?.startsWith('/jobs')

  if (isApp) return <>{children}</>

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
