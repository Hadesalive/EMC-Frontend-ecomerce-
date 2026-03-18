import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Clock, Briefcase, CurrencyDollar, CheckCircle, CalendarBlank } from '@phosphor-icons/react/dist/ssr'
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
  const ogImage = `${siteUrl}/jobs/${id}/opengraph-image`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/jobs/${id}`,
      siteName: 'Express Management Consultancy',
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: job.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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

const employmentTypeMap: Record<string, string> = {
  Permanent: 'FULL_TIME',
  Contract:  'CONTRACTOR',
  Temporary: 'TEMPORARY',
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://expresssl.com'

  const jobPostingSchema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Express Management Consultancy',
      value: job.id,
    },
    datePosted: new Date(job.created_at).toISOString().split('T')[0],
    employmentType: employmentTypeMap[job.type] ?? 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Express Management Consultancy',
      sameAs: siteUrl,
      logo: `${siteUrl}/images/Emc%20Logo%20header.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'SL',
      },
    },
    ...(job.salary_range ? { baseSalary: { '@type': 'MonetaryAmount', currency: 'SLL', value: job.salary_range } } : {}),
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "linear-gradient(rgba(215,225,235,0.45), rgba(215,225,235,0.45)), url('/images/vecteezy_abstract-white-line-background-wall-vector-illustration_7696710.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* Dark header */}
      <div className="bg-black pt-20">
        <div className="container py-8 lg:py-16">
          <Link href="/jobs"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium no-underline transition-colors mb-8 group">
            <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
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
                <span className="flex items-center gap-2"><MapPin size={16} weight="bold" />{job.location}</span>
                <span className="flex items-center gap-2"><Briefcase size={16} weight="bold" />{job.type}</span>
                {job.salary_range && (
                  <span className="flex items-center gap-2"><CurrencyDollar size={16} weight="bold" />{job.salary_range}</span>
                )}
                <span className="flex items-center gap-2"><Clock size={16} weight="bold" />Posted {relativeDate(job.created_at)}</span>
                {job.deadline && (
                  <span className="flex items-center gap-2 text-brand-orange font-semibold">
                    <CalendarBlank size={16} weight="bold" />
                    Deadline: {new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end items-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${job.title} — ${job.sector} | EMC Sierra Leone\n${siteUrl}/jobs/${job.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#25D366] text-white transition-all duration-200 flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <Link href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                className="px-6 lg:px-8 py-3 lg:py-4 bg-white text-black text-sm lg:text-base font-semibold rounded-lg hover:bg-white/90 transition-all no-underline whitespace-nowrap">
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
                        <CheckCircle size={12} weight="fill" className="text-brand-blue" />
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
              <div className="flex flex-col gap-3">
                <Link href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                  className="w-full px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all no-underline text-center">
                  Apply for This Role
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/contact"
                    className="px-4 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all no-underline text-center">
                    Ask a Question
                  </Link>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${job.title} — ${job.sector} | EMC Sierra Leone\n${siteUrl}/jobs/${job.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-[#25D366] hover:border-[#25D366] transition-all no-underline text-center flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share Job
                  </a>
                </div>
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
                  {job.deadline && (
                    <div className="flex items-center justify-between text-sm pt-1">
                      <span className="text-black/40 font-medium">Deadline</span>
                      <span className="flex items-center gap-1.5 font-semibold text-brand-orange">
                        <CalendarBlank size={13} weight="bold" />
                        {new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
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
                <div key={j.id} className="bg-white rounded-2xl border border-black/5 hover:border-black/10 hover:shadow-md transition-all p-6 flex flex-col gap-4 group">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {j.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-500 uppercase tracking-wide">Urgent</span>}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide">{j.type}</span>
                    </div>
                    <span className="text-[11px] text-black/30 flex items-center gap-1">
                      <Clock size={11} weight="bold" />{relativeDate(j.created_at)}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="flex-1">
                    <Link href={`/jobs/${j.id}`} className="no-underline">
                      <h3 className="font-display text-lg font-bold text-black group-hover:text-brand-blue transition-colors leading-snug mb-1">{j.title}</h3>
                    </Link>
                    <p className="text-xs text-black/40">{j.sector}</p>
                  </div>
                  {/* Bottom row */}
                  <div className="flex items-end justify-between gap-3 pt-4 border-t border-black/5">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5 text-xs text-black/40">
                        <MapPin size={12} weight="bold" />{j.location}
                      </span>
                      {j.deadline && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                          <CalendarBlank size={12} weight="bold" />
                          {new Date(j.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/apply?job=${j.id}&title=${encodeURIComponent(j.title)}`}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-black bg-black/5 hover:bg-black hover:text-white px-3 py-2 rounded-lg transition-all no-underline"
                    >
                      Apply <ArrowLeft size={12} weight="bold" className="rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
