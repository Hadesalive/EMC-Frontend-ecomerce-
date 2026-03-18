'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { MagnifyingGlass, X, Faders, CaretLeft, CaretRight, CalendarBlank } from '@phosphor-icons/react'
import type { JobRow } from '@/lib/supabase/types'

const PAGE_SIZE = 10

const TYPES     = ['Contract', 'Permanent', 'Temporary'] as const
const SECTORS   = ['Agriculture', 'Construction', 'Government', 'Healthcare', 'Hospitality', 'IT & Telecom', 'Logistics', 'Mining'] as const
const LOCATIONS = ['Bo District', 'Freetown', 'Kenema', 'Kono District'] as const

function FilterGroup({
  label, options, selected, counts, onToggle,
}: {
  label: string
  options: readonly string[]
  selected: string[]
  counts: Record<string, number>
  onToggle: (v: string) => void
}) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2.5">{label}</p>
      <div className="space-y-px">
        {options.map(opt => {
          const on = selected.includes(opt)
          return (
            <label key={opt} className="flex items-center gap-2.5 px-1.5 py-1.5 rounded cursor-pointer group hover:bg-gray-50 transition-colors">
              <span className={`w-[15px] h-[15px] rounded-[3px] flex items-center justify-center flex-shrink-0 transition-all ${
                on ? 'bg-gray-900 ring-1 ring-gray-900' : 'ring-1 ring-gray-300 group-hover:ring-gray-400'
              }`}>
                {on && (
                  <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <input type="checkbox" checked={on} onChange={() => onToggle(opt)} className="sr-only" />
              <span className={`text-[13px] flex-1 transition-colors ${on ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-800'}`}>
                {opt}
              </span>
              <span className="text-[11px] text-gray-400 tabular-nums">{counts[opt] ?? 0}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return '1 day ago'
  if (d < 7)  return `${d} days ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return `${Math.floor(d / 30)}mo ago`
}

export default function JobsList({ jobs }: { jobs: JobRow[] }) {
  const [search,     setSearch]     = useState('')
  const [types,      setTypes]      = useState<string[]>([])
  const [sectors,    setSectors]    = useState<string[]>([])
  const [locations,  setLocations]  = useState<string[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [page,       setPage]       = useState(0)

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return jobs.filter(j =>
      (!search          || j.title.toLowerCase().includes(q) || j.sector.toLowerCase().includes(q)) &&
      (!types.length    || types.includes(j.type))      &&
      (!sectors.length  || sectors.includes(j.sector))  &&
      (!locations.length|| locations.includes(j.location))
    )
  }, [search, types, sectors, locations, jobs])

  // Reset to page 0 whenever filters change
  useEffect(() => { setPage(0) }, [search, types, sectors, locations])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const hasFilters  = !!(search || types.length || sectors.length || locations.length)
  const clearAll    = () => { setSearch(''); setTypes([]); setSectors([]); setLocations([]) }
  const filterCount = types.length + sectors.length + locations.length

  const typeCounts     = Object.fromEntries(TYPES.map(t     => [t, jobs.filter(j => j.type     === t).length]))
  const sectorCounts   = Object.fromEntries(SECTORS.map(s   => [s, jobs.filter(j => j.sector   === s).length]))
  const locationCounts = Object.fromEntries(LOCATIONS.map(l => [l, jobs.filter(j => j.location === l).length]))

  return (
    <div className="container py-10">
      <div className="flex gap-10 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block w-52 xl:w-56 shrink-0 sticky top-28">
          <div className="relative mb-7">
            <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search roles…"
              className="w-full pl-[2.1rem] pr-7 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue/30 placeholder:text-gray-400 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <X size={14} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <FilterGroup label="Type"     options={TYPES}     selected={types}     counts={typeCounts}     onToggle={t => toggle(types,     setTypes,     t)} />
          <FilterGroup label="Sector"   options={SECTORS}   selected={sectors}   counts={sectorCounts}   onToggle={s => toggle(sectors,   setSectors,   s)} />
          <FilterGroup label="Location" options={LOCATIONS} selected={locations} counts={locationCounts} onToggle={l => toggle(locations, setLocations, l)} />
          {hasFilters && (
            <button onClick={clearAll} className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-600 transition-colors mt-1">
              <X size={12} /> Clear filters
            </button>
          )}
        </aside>

        {/* List */}
        <main className="flex-1 min-w-0 max-w-3xl">

          {/* Mobile controls */}
          <div className="lg:hidden mb-5 flex gap-2">
            <div className="relative flex-1">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles…"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 placeholder:text-gray-400" />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                filterCount > 0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              <Faders size={16} weight="bold" />
              Filters
              {filterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">
                  {filterCount}
                </span>
              )}
            </button>
          </div>

          {mobileOpen && (
            <div className="lg:hidden bg-white border border-gray-200 rounded-2xl p-5 mb-5">
              <FilterGroup label="Type"     options={TYPES}     selected={types}     counts={typeCounts}     onToggle={t => toggle(types,     setTypes,     t)} />
              <FilterGroup label="Sector"   options={SECTORS}   selected={sectors}   counts={sectorCounts}   onToggle={s => toggle(sectors,   setSectors,   s)} />
              <FilterGroup label="Location" options={LOCATIONS} selected={locations} counts={locationCounts} onToggle={l => toggle(locations, setLocations, l)} />
              {hasFilters && <button onClick={clearAll} className="text-xs text-gray-400 hover:text-gray-600">Clear all</button>}
            </div>
          )}

          {/* Results bar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-gray-900 text-[15px]">{filtered.length}</span>
              {' '}{filtered.length === 1 ? 'position' : 'positions'} found
            </p>
            {filterCount > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 flex-wrap justify-end">
                {[...types, ...sectors, ...locations].map(chip => (
                  <button key={chip}
                    onClick={() => {
                      if (types.includes(chip))     toggle(types,     setTypes,     chip)
                      if (sectors.includes(chip))   toggle(sectors,   setSectors,   chip)
                      if (locations.includes(chip)) toggle(locations, setLocations, chip)
                    }}
                    className="flex items-center gap-1 text-[11px] font-medium bg-gray-900 text-white px-2.5 py-1 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    {chip} <X size={10} weight="bold" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {paginated.map(job => (
                <article key={job.id} className={`bg-white rounded-2xl p-5 sm:p-6 transition-all duration-150 hover:shadow-md ${
                  job.urgent
                    ? 'border-2 border-amber-400'
                    : 'border border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-4">
                    {/* Left: job info */}
                    <div className="flex-1 min-w-0">
                      {job.urgent && (
                        <p className="text-[13px] font-semibold text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full mb-3">
                          Urgently hiring
                        </p>
                      )}
                      <Link href={`/jobs/${job.id}`} className="no-underline group/title">
                        <h2 className="text-[17px] sm:text-[19px] font-bold text-gray-900 group-hover/title:text-brand-blue transition-colors duration-150 leading-snug mb-1">
                          {job.title}
                        </h2>
                      </Link>
                      <p className="text-[14px] sm:text-[15px] text-gray-500 leading-snug">Express Management Consultancy</p>
                      <p className="text-[14px] sm:text-[15px] text-gray-500 leading-snug mb-4">{job.location}, Sierra Leone</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[job.type, job.sector, job.salary_range].filter(Boolean).map(tag => (
                          <span key={tag} className="text-[12px] sm:text-[13px] font-semibold text-gray-700 bg-gray-100 px-2.5 sm:px-3 py-1 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-[12px] sm:text-[13px] text-gray-400">Posted {relativeDate(job.created_at)}</p>
                        {job.deadline && (
                          <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            <CalendarBlank size={13} weight="bold" />
                            Closes {new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: apply button (hidden on smallest screens) */}
                    <div className="hidden sm:flex items-center shrink-0">
                      <Link
                        href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                        className="no-underline px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/85 transition-all whitespace-nowrap"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>

                  {/* Mobile apply button */}
                  <div className="sm:hidden mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                      className="no-underline block w-full text-center px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/85 transition-all"
                    >
                      Apply Now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 py-16 sm:py-20 text-center px-4">
              <p className="text-gray-500 font-medium mb-1">No positions match your search</p>
              <p className="text-gray-400 text-sm mb-5">Try adjusting your filters or search terms</p>
              <button onClick={clearAll} className="text-brand-blue text-sm font-medium hover:underline">Clear all filters</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                disabled={page === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <CaretLeft size={16} weight="bold" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      i === page
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                disabled={page === totalPages - 1}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          )}

          {filtered.length > 0 && (
            <p className="text-center text-[12px] text-gray-400 mt-6">
              Don't see the right role?{' '}
              <Link href="/apply" className="text-brand-blue font-medium hover:underline no-underline">Submit your CV</Link>
              {' '}and we'll reach out when something fits.
            </p>
          )}
        </main>

        {/* Right panel — desktop only */}
        <aside className="hidden xl:block w-52 shrink-0 sticky top-28 space-y-4">

          {/* Employer CTA */}
          <div className="bg-black rounded-2xl p-5">
            <p className="text-brand-orange text-[10px] font-bold tracking-widest uppercase mb-2">For Employers</p>
            <h3 className="font-display text-sm font-bold text-white leading-snug mb-2">
              Looking to hire?
            </h3>
            <p className="text-white/55 text-[12px] leading-relaxed mb-4">
              Tell us what you need and we'll handle the search.
            </p>
            <Link
              href="/contact"
              className="no-underline block w-full text-center px-4 py-2 bg-white text-black text-[12px] font-semibold rounded-lg hover:bg-white/90 transition-all"
            >
              Get in touch
            </Link>
          </div>

          {/* Submit CV */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-brand-blue text-[10px] font-bold tracking-widest uppercase mb-2">Candidates</p>
            <h3 className="font-display text-sm font-bold text-gray-900 leading-snug mb-2">
              No match yet?
            </h3>
            <p className="text-gray-500 text-[12px] leading-relaxed mb-4">
              Submit your CV and we'll contact you when the right role comes in.
            </p>
            <Link
              href="/apply"
              className="no-underline block w-full text-center px-4 py-2 border border-gray-200 text-gray-800 text-[12px] font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Submit your CV
            </Link>
          </div>

          {/* Application tips */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Quick tips</p>
            <ul className="space-y-3">
              {[
                'Tailor your CV to each role — even small tweaks help.',
                'Include a phone number. Most placements start with a call.',
                'Note your availability and preferred start date.',
                'Be specific about your sector experience.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-gray-500 leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

        </aside>

      </div>
    </div>
  )
}
