import React from 'react'
import Link from 'next/link'
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export default function ServicesSection() {
  const services = [
    {
      title: 'Recruitment Management',
      description: 'Automated candidate matching and screening to streamline your recruitment process.',
      detailedDescription: 'Our intelligent recruitment platform uses advanced algorithms to match the right candidates with the right opportunities. From initial screening to final placement, we automate the entire process, reducing time-to-hire by up to 60% while ensuring quality matches.',
      icon: UserGroupIcon,
      color: 'brand-blue',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      benefits: ['AI-powered matching', 'Automated screening', 'Pipeline tracking'],
      link: '/services',
    },
    {
      title: 'Client Portal',
      description: 'Secure, real-time portal for clients to track recruitment progress and access records.',
      detailedDescription: 'Give your clients complete visibility into their recruitment pipeline with our secure, intuitive portal. Real-time updates, document management, and comprehensive reporting all in one place, accessible 24/7 from any device.',
      icon: BuildingOfficeIcon,
      color: 'brand-orange',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      benefits: ['Real-time updates', 'Secure access', 'Custom dashboards'],
      link: '/services',
    },
    {
      title: 'Employee Self-Service',
      description: 'Comprehensive mobile-first portal for employees to manage profiles and compliance.',
      detailedDescription: 'Empower your workforce with a mobile-first self-service portal. Employees can update profiles, view schedules, access pay stubs, and manage compliance documents—all from their smartphone. Reduce administrative overhead while improving employee satisfaction.',
      icon: UserCircleIcon,
      color: 'brand-blue',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      benefits: ['Mobile-first design', 'Profile management', 'Document access'],
      link: '/services',
    },
    {
      title: 'Financial Management',
      description: 'Automated invoicing and financial tracking integrated with your recruitment workflows.',
      detailedDescription: 'Streamline your financial operations with automated invoicing, payment tracking, and comprehensive reporting. Integrated seamlessly with your recruitment workflows, ensuring accurate billing and timely payments while reducing manual data entry.',
      icon: CurrencyDollarIcon,
      color: 'brand-orange',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      benefits: ['Auto invoicing', 'Payment tracking', 'Financial reports'],
      link: '/services',
    },
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50/20 to-orange-50/10 dark:from-black dark:via-gray-900 dark:to-black overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23539fea' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1975e' fill-opacity='1'%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='35' cy='35' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: '30px 30px',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-black dark:text-white mb-4 tracking-tight">
            <span className="text-brand-orange">Complete</span> solutions,{' '}
            <span className="font-normal text-brand-blue">one platform</span>
          </h2>
          <p className="text-base sm:text-lg text-black/50 dark:text-white/50 max-w-2xl mx-auto font-light">
            Everything you need to manage your staffing operations efficiently and effectively
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon
            const isBlue = service.color === 'brand-blue'
            
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                {/* Image Header Section */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-6 right-6 w-14 h-14 flex items-center justify-center rounded-xl backdrop-blur-md ${
                    isBlue 
                      ? 'bg-brand-blue/90 text-white' 
                      : 'bg-brand-orange/90 text-white'
                  } shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-10 flex flex-col flex-grow">
                  {/* Service Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-xs font-bold tracking-wider ${
                      isBlue ? 'text-brand-blue' : 'text-brand-orange'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`h-px flex-1 ${
                      isBlue ? 'bg-brand-blue/20' : 'bg-brand-orange/20'
                    }`} />
                  </div>

                  <h3 className="font-display text-2xl lg:text-3xl font-medium text-black dark:text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-base text-black/60 dark:text-white/60 font-light leading-relaxed mb-6">
                    {service.detailedDescription}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-2.5 mb-8">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          isBlue ? 'bg-brand-blue' : 'bg-brand-orange'
                        }`} />
                        <span className="text-sm text-black/70 dark:text-white/70 font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link - Aligned to bottom */}
                  <div className="mt-auto">
                    <Link
                      href={service.link}
                      className={`inline-flex items-center gap-2 text-base font-medium transition-all group/link ${
                        isBlue 
                          ? 'text-brand-blue hover:text-brand-blue-dark' 
                          : 'text-brand-orange hover:text-brand-orange-dark'
                      }`}
                    >
                      Learn more
                      <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
