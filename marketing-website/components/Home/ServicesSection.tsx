import React from 'react'
import Link from 'next/link'
import {
  UserGroupIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    num: '01',
    icon: UserGroupIcon,
    color: 'brand-blue',
    title: 'Recruitment & Staffing',
    description: 'From permanent hires to contract placements, executive search to mass recruitment — we find the right people for every level and every role across Sierra Leone.',
    features: ['Permanent recruitment', 'Temporary & contract staffing', 'Executive search & headhunting', 'Mass recruitment'],
    link: '/services',
  },
  {
    num: '02',
    icon: BriefcaseIcon,
    color: 'brand-orange',
    title: 'HR & Management Consulting',
    description: 'Strategic guidance on HR policies, organisational structure, performance management, and change — tailored to your sector and scale of operation.',
    features: ['HR policy development', 'Organisational restructuring', 'Performance management', 'Leadership development'],
    link: '/services',
  },
  {
    num: '03',
    icon: BuildingOfficeIcon,
    color: 'brand-blue',
    title: 'Outsourcing Services',
    description: 'Hand over your HR operations entirely. We manage payroll, onboarding, compliance, and day-to-day HR administration professionally on your behalf.',
    features: ['HR outsourcing', 'Payroll management', 'Employee onboarding', 'Compliance management'],
    link: '/services',
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-black py-20 lg:py-32">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">What We Do</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Core services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors no-underline group"
          >
            View all services
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-white/10">
          {services.map((s, i) => {
            const Icon = s.icon
            const isBlue = s.color === 'brand-blue'
            return (
              <div
                key={i}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-12 hover:bg-white/[0.02] -mx-6 px-6 rounded-xl transition-colors"
              >
                {/* Number + icon */}
                <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-3">
                  <span className={`text-xs font-bold tracking-widest ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}>{s.num}</span>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-brand-blue/20' : 'bg-brand-orange/20'}`}>
                    <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                  </div>
                </div>

                {/* Title */}
                <div className="lg:col-span-3">
                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-white/50 leading-relaxed text-sm">{s.description}</p>
                </div>

                {/* Features + link */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <ul className="space-y-1.5">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs text-white/40">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isBlue ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.link}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold no-underline mt-2 group-hover:gap-3 transition-all duration-200 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`}
                  >
                    Learn more
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
