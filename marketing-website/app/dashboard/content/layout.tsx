'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/dashboard/content/home',    label: 'Home' },
  { href: '/dashboard/content/about',   label: 'About' },
  { href: '/dashboard/content/contact', label: 'Contact' },
  { href: '/dashboard/content/team',    label: 'Team' },
]

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col -mt-5 lg:-mt-8 min-h-[calc(100vh-64px)]">

      {/* Tab strip */}
      <div className="shrink-0 border-b border-black/5 bg-white sticky top-16 z-20">
        <nav className="flex overflow-x-auto px-5 lg:px-8">
          {TABS.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap no-underline transition-all -mb-px ${
                  active
                    ? 'border-black text-black'
                    : 'border-transparent text-black/40 hover:text-black/70'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Page content */}
      <div className="flex-1 p-5 lg:p-8">
        {children}
      </div>
    </div>
  )
}
