import type { Metadata } from 'next'
import { 
  UserGroupIcon, 
  BriefcaseIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive talent management services including recruitment, client relationship management, employee self-service, and automated workflow solutions.',
  openGraph: {
    title: 'Our Services | Express Management Consultancy',
    description: 'Comprehensive talent management and recruitment services.',
  },
}

const services = [
  {
    icon: UserGroupIcon,
    title: 'Temporary & Semi-Permanent Staffing',
    description: 'Quick access to qualified candidates for short-term or extended positions. We match the right talent to your needs.',
    color: 'brand-blue'
  },
  {
    icon: BriefcaseIcon,
    title: 'HR Management Consulting',
    description: 'Expert guidance on HR policies, procedures, and best practices to optimize your workforce management.',
    color: 'brand-orange'
  },
  {
    icon: DocumentTextIcon,
    title: 'Payroll & Benefits Administration',
    description: 'Accurate payroll processing, benefits administration, and tax filing services.',
    color: 'brand-blue'
  },
  {
    icon: ChartBarIcon,
    title: 'HR Technology & Data Analytics',
    description: 'Implementing HRIS systems and providing data-driven insights to inform strategic decisions.',
    color: 'brand-orange'
  },
  {
    icon: Cog6ToothIcon,
    title: 'Change & Culture Management',
    description: 'Guiding organizations through transitions and fostering positive workplace cultures.',
    color: 'brand-blue'
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Business Consulting',
    description: 'Strategic advice on business operations, growth strategies, and organizational development.',
    color: 'brand-orange'
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6 tracking-tight">
              Our Services
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl mx-auto">
              Comprehensive staffing solutions and HR services tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const isBlue = service.color === 'brand-blue'
              return (
                <div 
                  key={index}
                  className="p-8 border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center ${
                    isBlue 
                      ? 'bg-brand-blue/10 group-hover:bg-brand-blue/20' 
                      : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'
                  } transition-colors`}>
                    <Icon className={`w-7 h-7 ${
                      isBlue ? 'text-brand-blue' : 'text-brand-orange'
                    }`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 to-orange-50/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-black/60 mb-8">
              Let's discuss how we can help transform your workforce management.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-black/90 transition-all duration-200 no-underline"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
