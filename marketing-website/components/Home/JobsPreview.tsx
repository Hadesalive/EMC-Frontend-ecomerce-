import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, Briefcase, Clock, CalendarBlank } from '@phosphor-icons/react/dist/ssr'
import type { JobRow } from '@/lib/supabase/types'

type JobPreview = Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'urgent' | 'created_at' | 'deadline'>

const typeColor: Record<string, string> = {
  Permanent: 'bg-brand-blue/10 text-brand-blue',
  Contract:  'bg-brand-orange/10 text-brand-orange',
  Temporary: 'bg-gray-100 text-gray-600',
}

function relativeDate(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return '1d ago'
  if (d < 7)  return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return `${Math.floor(d / 30)}mo ago`
}

export default function JobsPreview({ jobs }: { jobs: JobPreview[] }) {
  return (
    <section className="py-14 lg:py-28 bg-white border-t border-black/8">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 lg:mb-12 gap-4 lg:gap-6">
          <div>
            <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-4">Open Positions</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight">
              Roles we're<br />filling right now.
            </h2>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline self-start lg:self-auto"
          >
            View all open positions
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        {/* Job cards */}
        {jobs.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 hover:shadow-md transition-all duration-200 p-6 group flex flex-col gap-5"
              >
                {/* Top row — type badge + date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {job.urgent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-500 uppercase tracking-wide">Urgent</span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${typeColor[job.type] ?? 'bg-gray-100 text-gray-600'}`}>
                      {job.type}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-black/30 dark:text-white/30">
                    <Clock size={11} weight="bold" />
                    {relativeDate(job.created_at)}
                  </span>
                </div>

                {/* Title + sector */}
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-black dark:text-white group-hover:text-brand-blue transition-colors duration-200 leading-snug mb-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-black/40 dark:text-white/40">{job.sector}</p>
                </div>

                {/* Bottom row — location + deadline + apply */}
                <div className="flex items-end justify-between gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs text-black/40 dark:text-white/40">
                      <MapPin size={12} weight="bold" />
                      {job.location}
                    </span>
                    {job.deadline && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                        <CalendarBlank size={12} weight="bold" />
                        {new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black px-3 py-2 rounded-lg transition-all duration-200 no-underline"
                  >
                    Apply
                    <ArrowRight size={12} weight="bold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-10 rounded-2xl border border-black/5">
            <p className="text-black/40 text-sm">No open positions at the moment.</p>
            <Link href="/apply" className="mt-3 inline-block text-brand-blue text-sm font-medium hover:underline no-underline">
              Submit your CV anyway →
            </Link>
          </div>
        )}

        {/* Dual CTA strip */}
        <div className="grid grid-cols-2 divide-x divide-black/8 dark:divide-white/8 pt-8 border-t border-black/5 dark:border-white/5">
          {/* Candidate CTA */}
          <div className="flex flex-col gap-2 pr-4 sm:pr-8">
            <p className="text-xs text-black/40 dark:text-white/40 font-medium">No matching role yet?</p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-black dark:text-white hover:text-brand-blue dark:hover:text-brand-blue transition-colors no-underline"
            >
              <Briefcase size={14} weight="regular" />
              Submit your CV
            </Link>
          </div>

          {/* Employer CTA */}
          <div className="flex flex-col gap-2 pl-4 sm:pl-8">
            <p className="text-xs text-black/40 dark:text-white/40 font-medium">Looking to hire?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-3 transition-all duration-200 no-underline"
            >
              Talk to our team
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
