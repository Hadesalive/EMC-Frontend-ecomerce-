import React from 'react'
import Image from 'next/image'
import {
  ClockIcon,
  ChartBarIcon,
  BoltIcon,
  CloudIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

export default function Features() {
  const features = [
    {
      title: '24/7 Accessibility',
      description: 'Talent can manage profiles and apply for jobs anytime, anywhere via our mobile-first platform.',
      detailedDescription: 'Whether it\'s midnight or midday, your candidates can update their profiles, browse opportunities, and submit applications seamlessly. Our responsive design ensures a perfect experience on any device, empowering talent to take control of their career journey on their own schedule.',
      icon: ClockIcon,
      color: 'brand-blue',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      benefits: ['Mobile-first design', 'Real-time updates', 'Global accessibility'],
    },
    {
      title: 'Real-Time Insights',
      description: 'Immediate access to key performance indicators and pipeline status via comprehensive dashboards.',
      detailedDescription: 'Make data-driven decisions with live analytics that track every aspect of your recruitment pipeline. From candidate engagement rates to time-to-fill metrics, our intuitive dashboards transform complex data into actionable insights, helping you optimize your hiring strategy in real-time.',
      icon: ChartBarIcon,
      color: 'brand-orange',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      benefits: ['Live dashboards', 'Customizable reports', 'Predictive analytics'],
    },
    {
      title: 'Automated Workflows',
      description: 'Streamline recruitment, invoicing, and onboarding processes with intelligent automation.',
      detailedDescription: 'Eliminate repetitive tasks and human error with smart automation that handles everything from candidate screening to invoice generation. Our AI-powered workflows learn from your patterns, continuously improving efficiency and freeing your team to focus on what matters most—building relationships.',
      icon: BoltIcon,
      color: 'brand-blue',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      benefits: ['Smart matching', 'Auto-scheduling', 'Instant notifications'],
    },
    {
      title: 'Scalable Architecture',
      description: 'Cloud-native infrastructure that grows seamlessly with your business needs.',
      detailedDescription: 'Start small and scale effortlessly. Our cloud infrastructure adapts to your growth, handling everything from a handful of placements to thousands without skipping a beat. Built on enterprise-grade technology, you get the reliability and performance of industry leaders without the complexity.',
      icon: CloudIcon,
      color: 'brand-orange',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      benefits: ['99.9% uptime', 'Unlimited scaling', 'Enterprise security'],
    },
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-white dark:bg-black overflow-hidden">
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
            <span className="text-brand-blue">Staffing</span> solutions,{' '}
            <span className="font-normal text-brand-orange">simplified</span>
          </h2>
          <p className="text-base sm:text-lg text-black/50 dark:text-white/50 max-w-2xl mx-auto font-light">
            Powerful features designed to streamline your recruitment and talent management process
          </p>
        </div>

        {/* Features - Clean Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isBlue = feature.color === 'brand-blue'
            
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon Badge - Top Right */}
                <div className={`absolute top-6 right-6 w-14 h-14 flex items-center justify-center rounded-xl backdrop-blur-md z-20 ${
                  isBlue 
                    ? 'bg-brand-blue/90 text-white' 
                    : 'bg-brand-orange/90 text-white'
                } shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  {/* Feature Number */}
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
                    {feature.title}
                  </h3>
                  
                  <p className="text-base text-black/60 dark:text-white/60 font-light leading-relaxed mb-6">
                    {feature.detailedDescription}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-2.5 mb-8">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          isBlue ? 'bg-brand-blue' : 'bg-brand-orange'
                        }`} />
                        <span className="text-sm text-black/70 dark:text-white/70 font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 text-base font-medium transition-all group/link ${
                      isBlue 
                        ? 'text-brand-blue hover:text-brand-blue-dark' 
                        : 'text-brand-orange hover:text-brand-orange-dark'
                    }`}
                  >
                    Learn more
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
