'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ArrowRight } from '@phosphor-icons/react'
import type { TeamMember, BioSection } from '@/lib/cms-types'

function Avatar({ member, size = 'sm' }: { member: TeamMember; size?: 'sm' | 'lg' }) {
  const isBlue = member.color === 'brand-blue'
  const initials = member.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2)

  if (member.image_url) {
    return (
      <img
        src={member.image_url}
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <button
            key={member.id}
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
                {member.short_bio}
              </p>
              <p className={`mt-3 text-xs font-semibold flex items-center gap-1 ${isBlueFor(member) ? 'text-brand-blue' : 'text-brand-orange'}`}>
                Full profile <ArrowRight size={12} weight="bold" aria-hidden="true" />
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
                <X size={20} weight="bold" className="text-black" aria-hidden="true" />
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
                  {(selected.sections as BioSection[]).map((section, si) => (
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
