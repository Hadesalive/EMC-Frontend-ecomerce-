'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Check on mount in case page is already scrolled
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ]

  // Routes whose hero is dark (bg-black) — header should match when unscrolled
  // Uses startsWith so nested routes like /jobs/[id] are included
  const darkHeroRoutes = ['/about', '/services', '/solutions', '/jobs', '/apply']
  const hasDarkHero = !isScrolled && darkHeroRoutes.some(
    route => pathname === route || pathname?.startsWith(route + '/')
  )

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

      return (
        <>
        <header className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg'
            : hasDarkHero
              ? 'bg-black'
              : 'bg-gradient-to-br from-white via-blue-50/20 to-orange-50/10 dark:from-black dark:via-gray-900 dark:to-black'
        }`}>
          {/* Thin Line Separator */}
          <div aria-hidden="true" className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-300 ${
            isScrolled
              ? 'bg-gradient-to-r from-transparent via-black/10 to-transparent'
              : 'bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent'
          }`} />

          <div className="container">
            <nav className="flex items-center py-4 lg:py-5 w-full">
          {/* Logo - Left aligned */}
          <Link 
            href="/" 
            className="flex items-center gap-3 flex-shrink-0 transition-opacity duration-200 hover:opacity-80 mr-auto"
          >
            <Image
              src="/images/Emc Logo header.png"
              alt="Express Management Consultancy Logo"
              width={120}
              height={36}
              sizes="120px"
              className="h-auto w-auto max-h-[40px] lg:max-h-[42px] object-contain block"
              priority
            />
          </Link>
          
          {/* Desktop Navigation - Right side, vertical stack style */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            {/* Navigation Links - Horizontal but with unique styling */}
            <ul className="flex gap-8 items-center list-none m-0 p-0">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={`font-display text-sm font-medium transition-all duration-200 no-underline relative inline-block group/link ${
                        active
                          ? 'text-brand-blue'
                          : hasDarkHero
                            ? 'text-white/70 hover:text-white'
                            : 'text-black/60 dark:text-white/60 hover:text-brand-blue dark:hover:text-brand-blue'
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {active && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-orange to-brand-blue rounded-full" />
                      )}
                      {!active && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-brand-blue/0 via-brand-orange/50 to-brand-blue/0 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-200 origin-center" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Browse Jobs link */}
            <Link
              href="/jobs"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 no-underline ${
                hasDarkHero
                  ? 'text-white/70 hover:text-white'
                  : 'text-black/60 dark:text-white/60 hover:text-brand-blue dark:hover:text-brand-blue'
              }`}
            >
              Browse Jobs
            </Link>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-black/80 dark:hover:bg-white/90 transition-colors duration-200 no-underline group"
            >
              Get Started
              <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 p-0 bg-transparent border-none cursor-pointer relative z-10 ${hasDarkHero ? 'text-white' : 'dark:text-white'}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            type="button"
          >
                  <span className="relative w-6 h-5 flex flex-col justify-center">
                  <span 
                    className={`absolute left-0 w-full h-[2px] transition-all duration-300 ${hasDarkHero ? 'bg-white' : 'bg-black dark:bg-white'} ${
                      isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-[2px] transition-all duration-300 top-1/2 -translate-y-1/2 ${hasDarkHero ? 'bg-white' : 'bg-black dark:bg-white'} ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-[2px] transition-all duration-300 ${hasDarkHero ? 'bg-white' : 'bg-black dark:bg-white'} ${
                      isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                    }`}
                  />
            </span>
          </button>
        </nav>

          </div>
        </header>

        {/* Mobile Navigation — rendered outside <header> so overflow-hidden never clips it */}
        {isMenuOpen && (
          <div id="mobile-nav" className="lg:hidden fixed inset-0 top-[73px] bg-white/95 dark:bg-black/95 backdrop-blur-xl z-[99] border-t border-black/5 dark:border-white/10 overflow-y-auto flex flex-col">
            <div className="container py-6 flex-1 flex flex-col">
              <ul className="flex flex-col flex-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block py-4 font-display text-lg font-light transition-colors duration-200 no-underline ${
                          active
                            ? 'text-brand-blue dark:text-brand-blue'
                            : 'text-black/60 dark:text-white/60'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* CTA Buttons - Bottom */}
              <div className="pt-6 mt-auto border-t border-black/5 dark:border-white/10 flex flex-col gap-3">
                <Link
                  href="/jobs"
                  className="block py-3.5 border border-black/15 dark:border-white/20 text-black dark:text-white text-base font-medium rounded-lg text-center no-underline hover:border-brand-blue hover:text-brand-blue transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/contact"
                  className="block py-3.5 bg-black dark:bg-white text-white dark:text-black text-base font-medium rounded-lg text-center no-underline hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
        </>
  )
}
