'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'

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
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ]

  // Pages whose hero is dark (bg-black) — header should match when unscrolled
  const darkHeroPages = ['/about', '/services', '/solutions', '/resources']
  const hasDarkHero = !isScrolled && darkHeroPages.includes(pathname ?? '')

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

      return (
        <header className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 overflow-hidden ${
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg'
            : hasDarkHero
              ? 'bg-black'
              : 'bg-gradient-to-br from-white via-blue-50/20 to-orange-50/10 dark:from-black dark:via-gray-900 dark:to-black'
        }`}>
          {/* Thin Line Separator */}
          <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-300 ${
            isScrolled 
              ? 'bg-gradient-to-r from-transparent via-black/10 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent'
          }`} />
          {/* Background Pattern */}
          <div className={`absolute inset-0 z-0 overflow-hidden transition-opacity duration-300 ${isScrolled ? 'opacity-20' : 'opacity-100'}`}>
            {/* Blue Pattern */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? 'opacity-[0.02]' : 'opacity-[0.06] sm:opacity-[0.04]'}`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23539fea' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            {/* Orange Pattern - Offset */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? 'opacity-[0.015]' : 'opacity-[0.05] sm:opacity-[0.03]'}`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1975e' fill-opacity='1'%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='35' cy='35' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundPosition: '30px 30px',
              }}
            />
          </div>
          
          <div className="container relative z-20">
        <nav className="flex items-center py-4 lg:py-5 w-full">
          {/* Logo - Left aligned */}
          <Link 
            href="/" 
            className="flex items-center gap-3 flex-shrink-0 transition-opacity duration-200 hover:opacity-80 mr-auto"
          >
            <Image
              src="/images/Emc Logo header.png"
              alt="Express Management Consultancy Logo"
              width={200}
              height={60}
              className="h-auto w-auto max-h-[40px] lg:max-h-[42px] object-contain block"
              priority
            />
          </Link>
          
          {/* Desktop Navigation - Right side, vertical stack style */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            {/* Navigation Links - Horizontal but with unique styling */}
            <ul className="flex gap-8 items-center list-none m-0 p-0">
              {navLinks.map((link, index) => {
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
                    {/* Number indicator */}
                    <span className={`absolute -left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold transition-colors ${
                      active
                        ? 'text-brand-orange'
                        : hasDarkHero
                          ? 'text-white/20 group-hover:text-white/50'
                          : 'text-black/20 dark:text-white/20 group-hover:text-brand-blue dark:group-hover:text-brand-blue'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Divider */}
            <div className={`h-6 w-px ${hasDarkHero ? 'bg-white/20' : 'bg-black/10 dark:bg-white/20'}`} />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - More prominent */}
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-black/90 dark:hover:bg-white/90 hover:scale-105 transition-all duration-200 no-underline relative overflow-hidden group"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Get Started
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-orange to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 p-0 bg-transparent border-none cursor-pointer relative z-10 ${hasDarkHero ? 'text-white' : 'dark:text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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

        {/* Mobile Navigation - Minimal Apple Style */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] bg-white/95 dark:bg-black/95 backdrop-blur-xl z-[99] border-t border-black/5 dark:border-white/10 overflow-y-auto flex flex-col">
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
              
              {/* CTA Button - Bottom */}
              <div className="pt-6 mt-auto border-t border-black/5 dark:border-white/10">
                <Link
                  href="/contact"
                  className="block py-4 bg-black dark:bg-white text-white dark:text-black text-base font-medium rounded-lg text-center no-underline hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
