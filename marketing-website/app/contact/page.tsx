import type { Metadata } from 'next'
import { MapPin, EnvelopeSimple, Phone, Clock } from '@phosphor-icons/react/dist/ssr'
import ContactForm from './ContactForm'
import { getContent } from '@/lib/cms'
import { DEFAULT_CONTACT } from '@/lib/cms-types'
import type { ContactContent } from '@/lib/cms-types'

export const metadata: Metadata = {
  title: 'Contact Us | Express Management Consultancy Sierra Leone',
  description: 'Get in touch with Express Management Consultancy. Reach our team in Freetown, Sierra Leone for recruitment, HR consulting and staffing enquiries.',
  alternates: { canonical: 'https://expresssl.com/contact' },
  openGraph: {
    title: 'Contact Us | Express Management Consultancy Sierra Leone',
    description: 'Reach our team in Freetown, Sierra Leone for recruitment, HR consulting and staffing enquiries.',
    url: 'https://expresssl.com/contact',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Express Management Consultancy Sierra Leone',
    description: 'Reach our team in Freetown, Sierra Leone for recruitment, HR consulting and staffing enquiries.',
  },
}

export default async function ContactPage() {
  const data = await getContent<ContactContent>('contact', 'info')
  const c: ContactContent = { ...DEFAULT_CONTACT, ...data }

  return (
    <div className="min-h-screen bg-white">

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Form */}
            <div className="lg:col-span-3">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Contact Us</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-black leading-tight mb-3 tracking-tight">
                {"Let's start a conversation"}
              </h1>
              <p className="text-black/60 text-base lg:text-lg mb-6 lg:mb-10 leading-relaxed">
                Tell us about your organisation and hiring needs. We will get back to you within one business day.
              </p>
              <ContactForm />
            </div>

            {/* Dark Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-2xl p-6 sm:p-8 lg:p-10 sticky top-32">
                <h2 className="font-display text-2xl font-bold text-white mb-1">Contact Information</h2>
                <p className="text-white/60 text-sm mb-6 lg:mb-10">Reach us directly or visit our office.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                  <div className="bg-black p-4 lg:p-5 flex gap-3">
                    <MapPin size={16} weight="duotone" className="text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1.5">Address</p>
                      <p className="text-white text-sm font-medium leading-snug">{c.address_line1}</p>
                      <p className="text-white/50 text-xs mt-0.5">{c.address_line2}</p>
                      <p className="text-white/50 text-xs">{c.address_line3}</p>
                    </div>
                  </div>

                  <div className="bg-black p-4 lg:p-5 flex gap-3">
                    <EnvelopeSimple size={16} weight="duotone" className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1.5">Email</p>
                      <a href={`mailto:${c.email}`} className="text-white text-sm font-medium hover:text-brand-orange transition-colors no-underline break-all leading-snug">
                        {c.email}
                      </a>
                    </div>
                  </div>

                  <div className="bg-black p-4 lg:p-5 flex gap-3">
                    <Phone size={16} weight="duotone" className="text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1.5">Phone</p>
                      <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="text-white text-sm font-medium hover:text-brand-blue transition-colors no-underline">
                        {c.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-black p-4 lg:p-5 flex gap-3">
                    <Clock size={16} weight="duotone" className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1.5">Hours</p>
                      <p className="text-white text-sm font-medium leading-snug">{c.hours_weekday}</p>
                      <p className="text-white/50 text-xs mt-0.5">{c.hours_weekend}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 lg:mt-10 pt-6 lg:pt-8 border-t border-white/10">
                  <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-4">Follow Us</p>
                  <div className="flex gap-2">
                    {[
                      { label: 'LinkedIn', href: c.social_linkedin },
                      { label: 'Facebook', href: c.social_facebook },
                      { label: 'Instagram', href: c.social_instagram },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-medium transition-all no-underline"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
