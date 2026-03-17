'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  HomeIcon, DocumentTextIcon, BuildingOfficeIcon, BriefcaseIcon,
  FunnelIcon, ChartBarIcon, ArrowLeftIcon, Bars3Icon, XMarkIcon,
  BellIcon, UsersIcon, ArrowRightStartOnRectangleIcon, KeyIcon,
  PencilSquareIcon, ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const navLinks = [
  { href: '/dashboard',              label: 'Overview',      icon: HomeIcon },
  { href: '/dashboard/jobs',         label: 'Jobs',          icon: BriefcaseIcon },
  { href: '/dashboard/applications', label: 'Applications',  icon: DocumentTextIcon },
  { href: '/dashboard/talent',       label: 'Talent Roster', icon: UsersIcon },
  { href: '/dashboard/requests',     label: 'Requests',      icon: BuildingOfficeIcon },
  { href: '/dashboard/pipeline',     label: 'Pipeline',      icon: FunnelIcon },
  { href: '/dashboard/analytics',    label: 'Analytics',     icon: ChartBarIcon },
  { href: '/dashboard/users',        label: 'Users',         icon: KeyIcon },
  { href: '/dashboard/content',      label: 'Content',       icon: PencilSquareIcon },
]

const SEGMENT_LABELS: Record<string, string> = {
  dashboard:    'Dashboard',
  jobs:         'Jobs',
  applications: 'Applications',
  talent:       'Talent Roster',
  requests:     'Requests',
  pipeline:     'Pipeline',
  analytics:    'Analytics',
  users:        'Users',
  content:      'Content',
  home:         'Home',
  about:        'About',
  contact:      'Contact',
  team:         'Team',
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const segments = pathname.split('/').filter(Boolean) // e.g. ['dashboard','content','home']

  // Build crumb list, skipping the root 'dashboard' segment
  const crumbs = segments.slice(1).map((seg, i) => {
    const href = '/' + segments.slice(0, i + 2).join('/')
    const label = SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1)
    const isLast = i === segments.length - 2
    return { href, label, isLast }
  })

  if (crumbs.length === 0) {
    return <span className="text-sm font-semibold text-black">Overview</span>
  }

  return (
    <nav className="flex items-center gap-1">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRightIcon className="w-3.5 h-3.5 text-black/20 flex-shrink-0" />}
          {crumb.isLast ? (
            <span className="text-sm font-semibold text-black">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-sm text-black/40 hover:text-black transition-colors no-underline"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}

export default function DashboardShell({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  const initials = userEmail.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-black flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center px-5 border-b border-white/10 flex-shrink-0">
          <Link href="/">
            <Image src="/images/Emc Logo header.png" alt="EMC" width={120} height={36} className="h-7 w-auto object-contain brightness-0 invert" />
          </Link>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                  active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-3 border-t border-white/10 space-y-0.5">
          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all no-underline">
            <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
            Back to site
          </Link>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-white/5 transition-all text-left">
            <ArrowRightStartOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            Sign out
          </button>
        </div>

        <div className="px-3 pb-5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center px-5 gap-4 sticky top-0 z-30">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>

          {/* Breadcrumbs */}
          <Breadcrumbs pathname={pathname} />

          <div className="flex-1" />

          {/* Right actions */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <BellIcon className="w-5 h-5 text-black/40" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </button>

          <div className="w-px h-5 bg-black/10" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <span className="hidden sm:block text-sm text-black/50 max-w-[160px] truncate">{userEmail}</span>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
