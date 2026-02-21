'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  FunnelIcon,
  ChartBarIcon,
  ArrowLeftIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline'

const navLinks = [
  { href: '/dashboard', label: 'Overview', icon: HomeIcon },
  { href: '/dashboard/applications', label: 'Applications', icon: DocumentTextIcon, badge: 12 },
  { href: '/dashboard/requests', label: 'Requests', icon: BuildingOfficeIcon, badge: 5 },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: FunnelIcon },
  { href: '/dashboard/analytics', label: 'Analytics', icon: ChartBarIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-black flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-white/10 flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Emc Logo header.png"
              alt="EMC"
              width={120}
              height={36}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-brand-orange text-white px-1.5 py-0.5 rounded-full leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-white/10 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all no-underline"
          >
            <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
            Back to site
          </Link>
        </div>

        <div className="px-3 pb-5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Admin</p>
              <p className="text-white/40 text-xs truncate">admin@emc-sl.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center px-5 gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <BellIcon className="w-5 h-5 text-black/50" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
