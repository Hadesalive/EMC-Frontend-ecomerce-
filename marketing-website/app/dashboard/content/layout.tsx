'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/dashboard/content/home',      label: 'Home' },
  { href: '/dashboard/content/about',     label: 'About' },
  { href: '/dashboard/content/services',  label: 'Services' },
  { href: '/dashboard/content/solutions', label: 'Solutions' },
  { href: '/dashboard/content/resources', label: 'Resources' },
  { href: '/dashboard/content/contact',   label: 'Contact' },
  { href: '/dashboard/content/team',      label: 'Team' },
  { href: '/dashboard/content/global',    label: 'Global' },
]

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col -mt-5 lg:-mt-8 min-h-[calc(100vh-64px)]">

      {/* Tab strip — negative horizontal margins cancel the parent's padding so it runs edge-to-edge */}
      <div className="shrink-0 bg-white sticky top-16 z-20 -mx-5 lg:-mx-8 border-b border-black/5">
        {/* Section label */}
        <div className="px-5 lg:px-8 pt-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-black/30 uppercase tracking-widest">Page content</p>
        </div>
        {/* Scrollable tabs with right-edge fade on mobile */}
        <div className="relative">
          <nav className="flex overflow-x-auto px-5 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map(({ href, label }) => {
              const active = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap no-underline transition-all -mb-px ${
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
          {/* Gradient fade — hints at horizontal scroll on narrow screens */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent lg:hidden" />
        </div>
      </div>

      {/* Page content — no extra horizontal padding; the parent main already provides it */}
      <div className="flex-1 pt-5 lg:pt-8">
        {children}
      </div>
    </div>
  )
}
