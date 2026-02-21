import type { Metadata } from 'next'
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Express Management Consultancy. We are here to help with your talent management and recruitment needs in Sierra Leone.',
  openGraph: {
    title: 'Contact Us | Express Management Consultancy',
    description: 'Get in touch with Express Management Consultancy.',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Main — 2 col form + dark info sidebar */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Form */}
            <div className="lg:col-span-3">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Contact Us</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-black leading-tight mb-3 tracking-tight">
                {"Let's start a conversation"}
              </h1>
              <p className="text-black/60 text-lg mb-10 leading-relaxed">
                Tell us about your organisation and hiring needs. We will get back to you within one business day.
              </p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-black mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-black mb-2">What are you looking for?</label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white text-black/70 appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option>Permanent Recruitment</option>
                    <option>Temporary / Contract Staffing</option>
                    <option>Executive Search</option>
                    <option>HR Consulting</option>
                    <option>HR Outsourcing</option>
                    <option>Management Consulting</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Dark Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-2xl p-8 lg:p-10 sticky top-32">
                <h2 className="font-display text-2xl font-bold text-white mb-1">Contact Information</h2>
                <p className="text-white/40 text-sm mb-10">Reach us directly or visit our office.</p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1.5">Address</p>
                      <p className="text-white font-medium">10 Waterside Road</p>
                      <p className="text-white/60">Wilberforce, Freetown</p>
                      <p className="text-white/60">Sierra Leone</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1.5">Email</p>
                      <a href="mailto:info@emc-sl.com" className="text-white font-medium hover:text-brand-orange transition-colors no-underline">
                        info@emc-sl.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1.5">Phone</p>
                      <a href="tel:+232000000" className="text-white font-medium hover:text-brand-blue transition-colors no-underline">
                        +232 [number]
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1.5">Office Hours</p>
                      <p className="text-white font-medium">Mon – Fri: 8:30am – 5:00pm</p>
                      <p className="text-white/50 text-sm mt-0.5">Saturday by appointment</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-4">Follow Us</p>
                  <div className="flex gap-2">
                    {['LinkedIn', 'Facebook', 'Instagram'].map((platform, i) => (
                      <a
                        key={i}
                        href="#"
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-medium transition-all no-underline"
                      >
                        {platform}
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
