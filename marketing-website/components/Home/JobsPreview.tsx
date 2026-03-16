import React from 'react'
import Link from 'next/link'
import { MapPinIcon, ArrowRightIcon, BriefcaseIcon, ClockIcon } from '@heroicons/react/24/outline'
import type { JobRow } from '@/lib/supabase/types'

type JobPreview = Pick<JobRow, 'id' | 'title' | 'sector' | 'type' | 'location' | 'urgent' | 'created_at'>

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
    <section className="py-20 lg:py-28 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
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
            <ArrowRightIcon className="w-4 h-4" />
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
                {/* Top */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {job.urgent && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">Urgent</span>
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor[job.type] ?? 'bg-gray-100 text-gray-600'}`}>
                      {job.type}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-black dark:text-white group-hover:text-brand-blue transition-colors duration-200 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-black/40 dark:text-white/40 mb-4">{job.sector}</p>
                  <div className="flex items-center gap-4 text-xs text-black/40 dark:text-white/40">
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {relativeDate(job.created_at)}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                  className="block text-center px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-all no-underline"
                >
                  Apply Now
                </Link>
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8 border-t border-black/5 dark:border-white/5">
          {/* Candidate CTA */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <p className="text-sm text-black/50 dark:text-white/50">
              No matching role yet?
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/15 dark:border-white/15 text-black dark:text-white text-sm font-semibold rounded-lg hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5 transition-all no-underline"
            >
              <BriefcaseIcon className="w-4 h-4" />
              Submit your CV
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-black/10 dark:bg-white/10" />

          {/* Employer CTA */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 sm:justify-end">
            <p className="text-sm text-black/50 dark:text-white/50">
              Looking to hire?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-4 transition-all duration-200 no-underline"
            >
              Talk to our team
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
