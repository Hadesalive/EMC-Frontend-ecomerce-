'use client'

import { useState, useEffect, useCallback } from 'react'
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

interface BioSection {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

interface TeamMember {
  name: string
  title: string
  tagline?: string
  shortBio: string
  sections: BioSection[]
  credentials?: string[]
  specialisms?: string[]
  image?: string
  color: 'brand-blue' | 'brand-orange'
}

const team: TeamMember[] = [
  {
    name: 'Abu Bakarr Turay',
    title: 'Founder & CEO',
    shortBio: 'Founder with 15+ years in executive contracts and project management, delivering end-to-end solutions for clients across Sierra Leone and beyond.',
    sections: [
      {
        paragraphs: [
          'Abu Bakarr has a vision to create a business that could offer an end-to-end service to clients, delivered by local experts on a global scale. Through this vision, Express Management aims to deliver a unique single-source solution to asset managers, allocators, family offices, mining companies and financial institutions that support the entire value chain across the financial services ecosystem.',
          'As a project manager and Supply Chain Management professional with a combined experience of over 15 years in executive Contracts and project management, Abu Bakarr has an outstanding ability to manage and provide solutions to complex, technical, financial and quality control issues within the private and public sectors, combined with a highly developed communication and negotiation skills to delegate tasks and lead employees effectively.',
          'Abu Bakarr\'s desire to drive positive change extends beyond asset servicing. His intention is to harness leading innovative and transformative technology that would benefit from cross-jurisdictional expertise delivered by a highly integrated team across the country.',
        ],
      },
    ],
    credentials: [
      'Master of Laws (LLM) — International Trade and Commercial Law, University of Essex, United Kingdom',
      'Master of Science in Economics — University of Sierra Leone',
      'Bachelor of Science in Economics — University of Sierra Leone',
    ],
    specialisms: ['Executive Search', 'Supply Chain Recruitment', 'Organisational Strategy', 'Project Management'],
    image: '/images/team/abu-bakarr-turay.jpg',
    color: 'brand-blue',
  },

  {
    name: 'Dauda A. Kawa',
    title: 'Co-Founder & Managing Director',
    tagline: 'Mining Operations Support & Human Capital Advisory Specialist',
    shortBio: 'Co-Founder with over a decade of experience in large-scale mining operations, workforce management, and human capital advisory across Sierra Leone.',
    sections: [
      {
        heading: 'Professional Overview',
        paragraphs: [
          'Dauda is an accomplished operations and human resources professional with extensive experience in facilities administration, workforce management, and operational support systems within the mining industry — one of the most demanding and operationally complex sectors in the global economy.',
          'Throughout his career, Dauda has played a pivotal role in supporting large-scale mining operations by ensuring that the essential infrastructure, workforce systems, and administrative frameworks required to sustain productivity operate efficiently and reliably.',
          'His professional expertise spans a broad portfolio of operational support services including:',
        ],
        bullets: [
          'Facilities and infrastructure management',
          'Camp and workforce accommodation administration',
          'Workforce logistics and travel coordination',
          'Fleet and transport management',
          'Administrative systems and employee support services',
        ],
      },
      {
        heading: 'Human Capital & Organisational Expertise',
        paragraphs: [
          'In addition to his operational leadership experience, Dauda brings a strong background in Human Resource Management, enabling him to bridge the critical link between workforce management and operational efficiency.',
          'Working in a remote and logistically challenging mining environment has required Dauda to lead multidisciplinary teams while managing complex operational systems that underpin day-to-day mine productivity.',
        ],
        bullets: [
          'Workforce planning and deployment',
          'Recruitment and talent acquisition',
          'Employee administration and HR advisory',
          'Workforce outsourcing models',
          'Organisational support systems',
        ],
      },
      {
        heading: 'Entrepreneurial Leadership',
        paragraphs: [
          'Recognising the growing demand for professional workforce solutions in Sierra Leone\'s evolving business environment, Dauda co-founded Express Management Consultancy (SL) Limited.',
          'The firm provides organisations with reliable workforce services that allow them to focus on their core operations while outsourcing recruitment, payroll administration, and HR management.',
        ],
        bullets: [
          'Recruitment and staffing solutions',
          'Workforce outsourcing and talent pooling',
          'Payroll administration services',
          'HR advisory and organisational development support',
        ],
      },
      {
        heading: 'Leadership Philosophy',
        paragraphs: [
          'Dauda believes that sustainable business success depends on the effective alignment of people, systems, and operational infrastructure. His approach emphasises practical solutions, operational discipline, and service excellence to ensure that organisations can operate efficiently even in challenging environments.',
          'Through both his operational and consultancy work, he remains committed to helping organisations build reliable workforce systems that support productivity, resilience, and long-term growth.',
        ],
      },
    ],
    credentials: [
      'MA Managing Human Resources (CIPD) — University of West London',
      'Graduate Certificate in Management — Birkbeck College, University of London',
      'BA (Hons) Business Information Management — University of Westminster',
    ],
    specialisms: ['Mining Operations', 'Facilities Management', 'Workforce Logistics', 'HR Advisory', 'Workforce Outsourcing'],
    color: 'brand-orange',
  },

  {
    name: 'Alpha Amadu Bah',
    title: 'HR Consulting Manager',
    shortBio: 'Certified HR practitioner specialising in policy design, organisational development, and performance management.',
    sections: [
      {
        paragraphs: [
          'Alpha leads EMC\'s HR consulting practice, working directly with clients to design people strategies that are practical, compliant, and built for growth. His background spans both large enterprise and SME environments, giving him a versatile perspective on what works at different organisational scales.',
          'He specialises in helping organisations professionalise their HR functions — from building compliant employment frameworks to embedding performance cultures that retain top talent. He has led policy overhauls, compensation reviews, and HR transformation projects across multiple sectors.',
          'Alpha also advises on employment law compliance, particularly for international organisations entering the Sierra Leone market who need to establish locally aligned HR structures quickly.',
        ],
      },
    ],
    credentials: [
      'Certified HR Professional (CIPD-aligned)',
    ],
    specialisms: ['HR Policy Design', 'Performance Management', 'Organisational Development', 'Employment Compliance', 'HR Transformation'],
    color: 'brand-blue',
  },

  {
    name: 'Fatmata Conteh',
    title: 'Client Relations Manager',
    shortBio: 'Dedicated to building long-term client partnerships and ensuring every engagement delivers measurable results.',
    sections: [
      {
        paragraphs: [
          'Fatmata is the bridge between EMC\'s clients and its delivery teams. She manages onboarding, ongoing relationships, and client satisfaction — ensuring that every engagement stays aligned with what clients actually need, not just what was originally scoped.',
          'Her calm, structured approach to communication means clients always know where they stand. She conducts regular check-ins, manages expectations proactively, and acts as the first point of escalation when any issues arise — resolving them quickly and professionally.',
          'She is the reason many of EMC\'s clients return for successive hires. Her focus on long-term partnership over transactional delivery is central to how EMC retains and grows its client base.',
        ],
      },
    ],
    specialisms: ['Client Success', 'Account Management', 'Stakeholder Communication', 'Recruitment Coordination'],
    color: 'brand-orange',
  },
]

function Avatar({ member, size = 'sm' }: { member: TeamMember; size?: 'sm' | 'lg' }) {
  const isBlue = member.color === 'brand-blue'
  const initials = member.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2)

  if (member.image) {
    return (
      <img
        src={member.image}
        alt={member.name}
        className={`object-cover w-full h-full ${size === 'sm' ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
      />
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-end overflow-hidden bg-gray-100">
      <div className={`${size === 'lg' ? 'w-24 h-24 text-3xl mb-3' : 'w-16 h-16 text-xl mb-2'} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${isBlue ? 'bg-brand-blue' : 'bg-brand-orange'}`}>
        {initials}
      </div>
      <svg
        className={`${size === 'lg' ? 'w-48 h-40' : 'w-36 h-28'} text-gray-300 flex-shrink-0`}
        viewBox="0 0 160 120"
        fill="currentColor"
        aria-hidden="true"
      >
        <ellipse cx="80" cy="60" rx="60" ry="70" />
      </svg>
    </div>
  )
}

export default function TeamSection() {
  const [selected, setSelected] = useState<TeamMember | null>(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected, close])

  const isBlueFor = (m: TeamMember) => m.color === 'brand-blue'

  return (
    <>
      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <button
            key={member.name}
            onClick={() => setSelected(member)}
            className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-black/5 hover:border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label={`View profile for ${member.name}`}
          >
            {/* Photo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Avatar member={member} size="sm" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                  View profile
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isBlueFor(member) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                {member.title}
              </p>
              <h3 className="font-display text-base font-bold text-black mb-2 leading-snug">
                {member.name}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed line-clamp-2">
                {member.shortBio}
              </p>
              <p className={`mt-3 text-xs font-semibold flex items-center gap-1 ${isBlueFor(member) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                Full profile <ArrowRightIcon className="w-3 h-3" aria-hidden="true" />
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} — profile`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92dvh] sm:max-h-[85dvh] flex flex-col rounded-t-2xl">

            {/* Sticky header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-black/5 flex-shrink-0 gap-4">
              <div className="min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${isBlueFor(selected) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                  {selected.title}
                </p>
                <p className="font-display text-lg font-bold text-black leading-tight">{selected.name}</p>
                {selected.tagline && (
                  <p className="text-black/50 text-xs mt-1 leading-snug">{selected.tagline}</p>
                )}
              </div>
              <button
                onClick={close}
                aria-label="Close profile"
                className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5"
              >
                <XMarkIcon className="w-5 h-5 text-black" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 overscroll-contain">

              {/* Photo strip */}
              <div className={`relative h-48 sm:h-56 flex-shrink-0 ${isBlueFor(selected) ? 'bg-brand-blue/5' : 'bg-brand-orange/5'}`}>
                <Avatar member={selected} size="lg" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="px-6 pb-8">

                {/* Bio sections */}
                <div className="space-y-7">
                  {selected.sections.map((section, si) => (
                    <div key={si}>
                      {section.heading && (
                        <h4 className="font-display text-sm font-bold text-black uppercase tracking-widest mb-3 pt-2 border-t border-black/8">
                          {section.heading}
                        </h4>
                      )}
                      {section.paragraphs && (
                        <div className="space-y-3 mb-3">
                          {section.paragraphs.map((para, pi) => (
                            <p key={pi} className="text-black/65 leading-relaxed text-[15px]">{para}</p>
                          ))}
                        </div>
                      )}
                      {section.bullets && (
                        <ul className="space-y-2 mt-3">
                          {section.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex items-start gap-2.5 text-[15px] text-black/65">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${isBlueFor(selected) ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Credentials */}
                {selected.credentials && selected.credentials.length > 0 && (
                  <div className="mt-7 pt-6 border-t border-black/8">
                    <h4 className="font-display text-sm font-bold text-black uppercase tracking-widest mb-3">
                      Academic &amp; Professional Qualifications
                    </h4>
                    <ul className="space-y-2">
                      {selected.credentials.map((c, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[15px] text-black/65">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${isBlueFor(selected) ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specialisms */}
                {selected.specialisms && selected.specialisms.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-display text-sm font-bold text-black uppercase tracking-widest mb-3">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.specialisms.map((s, i) => (
                        <span
                          key={i}
                          className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                            isBlueFor(selected)
                              ? 'bg-brand-blue/8 border-brand-blue/15 text-brand-blue'
                              : 'bg-brand-orange/8 border-brand-orange/15 text-brand-orange'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
