import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon, MapPinIcon, ClockIcon, BriefcaseIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { createAdminClient } from '@/lib/supabase/server'
import type { JobRow } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: raw } = await supabase
    .from('jobs')
    .select('title, sector, description, location, type, salary_range')
    .eq('id', id)
    .single()

  if (!raw) return { title: 'Job Not Found' }
  const job = raw as unknown as Pick<JobRow, 'title' | 'sector' | 'description' | 'location' | 'type' | 'salary_range'>

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://expresssl.com'
  const title = `${job.title} | ${job.sector} — EMC Sierra Leone`
  const descParts = [
    job.description?.slice(0, 120),
    `📍 ${job.location}`,
    job.type,
    job.salary_range,
  ].filter(Boolean)
  const description = descParts.join(' · ')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/jobs/${id}`,
      siteName: 'Express Management Consultancy',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
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

const typeColor: Record<string, string> = {
  Permanent: 'bg-brand-blue/15 text-brand-blue',
  Contract:  'bg-brand-orange/15 text-brand-orange',
  Temporary: 'bg-white/10 text-white/70',
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = createAdminClient()

  const [{ data: rawJob }, { data: rawRelated }] = await Promise.all([
    supabase.from('jobs').select('*').eq('id', id).single(),
    supabase.from('jobs').select('*').eq('is_active', true).neq('id', id).limit(3),
  ])

  if (!rawJob) notFound()
  const job = rawJob as unknown as JobRow
  const related = (rawRelated ?? []) as unknown as JobRow[]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Dark header */}
      <div className="bg-black pt-20">
        <div className="container py-8 lg:py-16">
          <Link href="/jobs"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium no-underline transition-colors mb-8 group">
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All open positions
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {job.urgent && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/20 text-red-400">Urgent</span>
                )}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor[job.type]}`}>{job.type}</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/60">{job.sector}</span>
              </div>

              {/* optional image */}
              {job.image_url && (
                <div className="mb-5">
                  <Image src={job.image_url} alt={job.title} width={80} height={80}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                </div>
              )}

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-sm text-white/50">
                <span className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" />{job.location}</span>
                <span className="flex items-center gap-2"><BriefcaseIcon className="w-4 h-4" />{job.type}</span>
                {job.salary_range && (
                  <span className="flex items-center gap-2"><CurrencyDollarIcon className="w-4 h-4" />{job.salary_range}</span>
                )}
                <span className="flex items-center gap-2"><ClockIcon className="w-4 h-4" />Posted {relativeDate(job.created_at)}</span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <Link href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                className="px-8 py-4 bg-white text-black text-base font-semibold rounded-lg hover:bg-white/90 transition-all no-underline whitespace-nowrap">
                Apply for This Role
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Main content */}
          <div className="lg:col-span-8 space-y-10">

            <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold text-black mb-5">About this role</h2>
              <p className="text-black/65 leading-relaxed text-[15px]">{job.description}</p>
            </div>

            {job.responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-8 lg:p-10">
                <h2 className="font-display text-2xl font-bold text-black mb-6">What you'll be doing</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircleIcon className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span className="text-black/65 text-[15px] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-8 lg:p-10">
                <h2 className="font-display text-2xl font-bold text-black mb-6">Requirements</h2>
                <ul className="space-y-3 mb-8">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0 mt-2" />
                      <span className="text-black/65 text-[15px] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
                {job.nice_to_have.length > 0 && (
                  <>
                    <h3 className="font-display text-base font-bold text-black mb-4">Nice to have</h3>
                    <ul className="space-y-3">
                      {job.nice_to_have.map((r, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0 mt-2" />
                          <span className="text-black/50 text-[15px] leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            <div className="bg-black rounded-2xl p-5 sm:p-8 lg:p-10">
              <p className="text-brand-orange text-xs font-medium tracking-widest uppercase mb-3">Ready to apply?</p>
              <h2 className="font-display text-2xl font-bold text-white mb-3">Think this role is right for you?</h2>
              <p className="text-white/55 leading-relaxed mb-6 text-sm">
                Send us your application and our team will review it within 2–3 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                  className="px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all no-underline text-center">
                  Apply for This Role
                </Link>
                <Link href="/contact"
                  className="px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all no-underline text-center">
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-7">
                <h3 className="font-display text-lg font-bold text-black mb-5">Role overview</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Type',     value: job.type },
                    { label: 'Sector',   value: job.sector },
                    { label: 'Location', value: job.location },
                    ...(job.salary_range ? [{ label: 'Salary', value: job.salary_range }] : []),
                    { label: 'Posted',   value: relativeDate(job.created_at) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-black/40 font-medium">{label}</span>
                      <span className={`font-semibold ${label === 'Salary' ? 'text-brand-blue' : 'text-black'}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-black/5 space-y-3">
                  <Link href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                    className="block w-full text-center px-6 py-3.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all no-underline">
                    Apply Now
                  </Link>
                  <Link href="/apply"
                    className="block w-full text-center px-6 py-3 border border-black/10 text-black/60 text-sm font-medium rounded-lg hover:border-black/20 hover:text-black transition-all no-underline">
                    Submit General CV
                  </Link>
                </div>
              </div>

              <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-7">
                <h3 className="font-display text-sm font-bold text-black mb-4">How our process works</h3>
                <ol className="space-y-3">
                  {['Submit your application', 'We review within 2–3 days', 'Shortlisted candidates contacted', 'Interview arranged'].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black/60">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/15 text-brand-blue text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Related roles */}
        {(related ?? []).length > 0 && (
          <div className="mt-16 pt-12 border-t border-black/5">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-black">More open positions</h2>
              <Link href="/jobs" className="text-sm font-semibold text-brand-blue hover:underline no-underline">View all</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {(related ?? []).map(j => (
                <Link key={j.id} href={`/jobs/${j.id}`} className="no-underline group">
                  <div className="bg-white rounded-2xl border border-black/5 group-hover:border-black/10 group-hover:shadow-md transition-all p-6 h-full flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {j.urgent && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">Urgent</span>}
                        <span className="text-xs text-black/40">{j.sector}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-black group-hover:text-brand-blue transition-colors">{j.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-black/40 mt-auto">
                      <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5" />{j.location}</span>
                      <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" />{relativeDate(j.created_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
