import Link from 'next/link'
import Image from 'next/image'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/services', label: 'Services' },
      { href: '/solutions', label: 'Solutions' },
    ],
    resources: [
      { href: '/resources', label: 'Resources' },
      { href: '/contact', label: 'Contact' },
    ],
  }

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/Emc Logo header.png"
                  alt="Express Management Consultancy Logo"
                  width={200}
                  height={60}
                  className="h-auto w-auto max-h-[40px] object-contain"
                />
              </Link>
              <p className="text-white/60 font-light leading-relaxed max-w-md mb-6">
                Leading talent management and recruitment solutions. Empowering businesses with modern, efficient staffing platforms.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a href="mailto:info@emconsultancy.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <EnvelopeIcon className="w-5 h-5 text-white/50 group-hover:text-brand-blue transition-colors" />
                  <span className="font-light">info@emconsultancy.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <PhoneIcon className="w-5 h-5 text-white/50 group-hover:text-brand-orange transition-colors" />
                  <span className="font-light">(123) 456-7890</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPinIcon className="w-5 h-5 text-white/50" />
                  <span className="font-light">Mon - Fri: 9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-display text-sm font-semibold text-white mb-6 tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white font-light transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-display text-sm font-semibold text-white mb-6 tracking-wider uppercase">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white font-light transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm font-light">
            &copy; {currentYear} Express Management Consultancy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50 font-light">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
