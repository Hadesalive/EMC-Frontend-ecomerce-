import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import JobsList from './JobsList'
import type { JobRow } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Job Vacancies in Sierra Leone | Current Openings',
  description: 'Browse current job vacancies across Sierra Leone. EMC recruits for mining, construction, healthcare, hospitality, logistics, IT and more. Apply online today.',
  alternates: { canonical: 'https://expresssl.com/jobs' },
  openGraph: {
    title: 'Job Vacancies in Sierra Leone | Express Management Consultancy',
    description: 'Browse current job vacancies across Sierra Leone — mining, construction, healthcare, hospitality, logistics, IT and more.',
    url: 'https://expresssl.com/jobs',
    type: 'website',
    images: [{ url: 'https://www.expresssl.com/images/Emc%20Logo%20header.png', width: 800, height: 200, alt: 'Express Management Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Vacancies in Sierra Leone | Express Management Consultancy',
    description: 'Browse current job vacancies across Sierra Leone — mining, construction, healthcare, hospitality, logistics, IT and more.',
  },
}

export default async function JobsPage() {
  const supabase = createAdminClient()
  const { data: raw, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const allJobs = (raw ?? []) as unknown as JobRow[]
  const uniqueSectors = new Set(allJobs.map(j => j.sector)).size
  const urgentCount   = allJobs.filter(j => j.urgent).length

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "linear-gradient(rgba(215,225,235,0.45), rgba(215,225,235,0.45)), url('/images/vecteezy_abstract-white-line-background-wall-vector-illustration_7696710.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >

      {/* Hero */}
      <section className="bg-gray-950 pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10">
            <div>
              <p className="text-white/60 text-xs font-medium tracking-widest uppercase mb-5">
                Sierra Leone &nbsp;·&nbsp; Freetown & beyond
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-4">
                Find your<br />next role.
              </h1>
              <p className="text-white/60 text-[15px] leading-relaxed max-w-xs">
                Opportunities across construction, healthcare, mining, hospitality and more.
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:items-end gap-px md:gap-10 bg-white/[0.06] md:bg-transparent rounded-xl md:rounded-none overflow-hidden md:overflow-visible shrink-0">
              {[
                { value: allJobs.length, label: 'open positions' },
                { value: uniqueSectors,  label: 'industries'     },
                { value: urgentCount,    label: 'urgent roles'   },
              ].map(({ value, label }) => (
                <div key={label} className="bg-gray-950 md:bg-transparent px-4 py-4 md:p-0 md:text-right">
                  <p className="font-display text-3xl md:text-5xl font-bold text-white">{value}</p>
                  <p className="text-white/50 text-[11px] md:text-sm mt-0.5 md:mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JobsList jobs={allJobs} />
    </div>
  )
}
