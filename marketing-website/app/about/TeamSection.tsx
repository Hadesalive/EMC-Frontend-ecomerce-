'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ArrowRight } from '@phosphor-icons/react'
import type { TeamMember, BioSection } from '@/lib/cms-types'

function Avatar({ member, size = 'sm' }: { member: TeamMember; size?: 'sm' | 'lg' }) {
  const isBlue = member.color === 'brand-blue'
  const initials = member.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2)

  if (member.image_url) {
    return (
      <Image
        src={member.image_url}
        alt={member.name}
        fill
        sizes={size === 'sm' ? '(max-width: 640px) 100vw, 25vw' : '42vw'}
        className={`object-cover ${size === 'sm' ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
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

export default function TeamSection({ team }: { team: TeamMember[] }) {
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

  if (team.length === 0) {
    return (
      <p className="text-black/40 text-sm">No team members have been added yet.</p>
    )
  }

  return (
    <>
      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {team.map((member) => (
          <button
            key={member.id}
            onClick={() => setSelected(member)}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-2xl"
            aria-label={`View profile for ${member.name}`}
          >
            {/* Photo */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl mb-4">
              <Avatar member={member} size="sm" />
              {/* Gradient name overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <ArrowRight size={16} weight="bold" className="text-white" aria-hidden="true" />
              </div>
            </div>

            {/* Info */}
            <div className="px-1">
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-1 ${isBlueFor(member) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                {member.title}
              </p>
              <h3 className="font-display text-base font-bold text-black leading-snug">
                {member.name}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} — profile`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel — split layout */}
          <div className="relative w-full sm:max-w-3xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row rounded-t-2xl max-h-[92dvh] sm:max-h-[82dvh]">

            {/* Left — dark photo column */}
            <div className="relative sm:w-[42%] flex-shrink-0 bg-gray-950 flex flex-col">
              {/* Photo */}
              <div className="relative flex-1 min-h-[220px] sm:min-h-0 overflow-hidden">
                <Avatar member={selected} size="lg" />
                {/* Bottom gradient for name overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/10 to-transparent" />
              </div>

              {/* Name / title block */}
              <div className="relative px-6 pb-6 pt-4 flex-shrink-0">
                <p className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-2 ${isBlueFor(selected) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                  {selected.title}
                </p>
                <h2 className="font-display text-xl font-bold text-white leading-snug mb-2">
                  {selected.name}
                </h2>
                {selected.tagline && (
                  <p className="text-white/40 text-xs leading-relaxed">{selected.tagline}</p>
                )}
              </div>
            </div>

            {/* Right — scrollable content */}
            <div className="relative flex-1 bg-white overflow-y-auto overscroll-contain">

              {/* Close button */}
              <button
                onClick={close}
                aria-label="Close profile"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/6 hover:bg-black/12 flex items-center justify-center transition-colors"
              >
                <X size={16} weight="bold" className="text-black" aria-hidden="true" />
              </button>

              <div className="px-6 pt-7 pb-8 space-y-7">

                {/* Tagline as pull-quote on mobile (hidden on desktop where it shows in left col) */}
                {selected.tagline && (
                  <p className={`sm:hidden text-sm font-medium leading-relaxed border-l-2 pl-4 ${isBlueFor(selected) ? 'border-brand-blue text-brand-blue/80' : 'border-brand-orange text-brand-orange/80'}`}>
                    {selected.tagline}
                  </p>
                )}

                {/* Bio sections */}
                <div className="space-y-6">
                  {(selected.sections as BioSection[]).map((section, si) => (
                    <div key={si}>
                      {section.heading && (
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-3">
                          {section.heading}
                        </p>
                      )}
                      {section.paragraphs && (
                        <div className="space-y-3">
                          {section.paragraphs.map((para, pi) => (
                            <p key={pi} className="text-[15px] text-black/65 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      )}
                      {section.bullets && (
                        <ul className="space-y-2 mt-2">
                          {section.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-[14px] text-black/60">
                              <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-[7px] ${isBlueFor(selected) ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Specialisms */}
                {selected.specialisms && selected.specialisms.length > 0 && (
                  <div className="pt-5 border-t border-black/6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-3">Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.specialisms.map((s, i) => (
                        <span
                          key={i}
                          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                            isBlueFor(selected)
                              ? 'bg-brand-blue/8 text-brand-blue'
                              : 'bg-brand-orange/8 text-brand-orange'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Credentials */}
                {selected.credentials && selected.credentials.length > 0 && (
                  <div className="pt-5 border-t border-black/6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-3">Qualifications</p>
                    <ul className="space-y-2">
                      {selected.credentials.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-black/60">
                          <span className={`text-[10px] font-bold mt-0.5 flex-shrink-0 ${isBlueFor(selected) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
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
