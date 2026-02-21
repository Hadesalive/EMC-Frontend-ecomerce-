import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPinIcon, ClockIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = { title: 'Job Listings' }

const jobs = [
  { id: '001', title: 'Site Engineer', company: 'Rokel Construction Ltd', sector: 'Construction', type: 'Permanent', location: 'Freetown', posted: '2d ago', urgent: true },
  { id: '002', title: 'Registered Nurse', company: 'MedPro Healthcare', sector: 'Healthcare', type: 'Permanent', location: 'Freetown', posted: '3d ago', urgent: true },
  { id: '003', title: 'Safety Officer', company: 'Sierra Leone Mining Co.', sector: 'Mining', type: 'Contract', location: 'Kono District', posted: '4d ago', urgent: false },
  { id: '004', title: 'Hotel Operations Manager', company: 'Freetown Hotel Group', sector: 'Hospitality', type: 'Permanent', location: 'Freetown', posted: '5d ago', urgent: false },
  { id: '005', title: 'Logistics Coordinator', company: 'National Port Authority', sector: 'Logistics', type: 'Permanent', location: 'Freetown', posted: '6d ago', urgent: false },
  { id: '006', title: 'Field Supervisor', company: 'AgriGrow SL', sector: 'Agriculture', type: 'Contract', location: 'Bo District', posted: '1w ago', urgent: false },
  { id: '007', title: 'Network Engineer', company: 'TeleSL Communications', sector: 'IT & Telecom', type: 'Permanent', location: 'Freetown', posted: '1w ago', urgent: false },
  { id: '008', title: 'Finance Analyst', company: 'Government Ministry', sector: 'Government', type: 'Permanent', location: 'Freetown', posted: '2w ago', urgent: false },
]

const typeColor: Record<string, string> = {
  Permanent: 'bg-brand-blue/10 text-brand-blue',
  Contract: 'bg-brand-orange/10 text-brand-orange',
  Temporary: 'bg-gray-100 text-gray-600',
}

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black pt-20">
        <div className="container py-16">
          <p className="text-brand-blue text-xs font-medium tracking-widest uppercase mb-4">Open Positions</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Find your next role
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Browse current opportunities sourced by EMC across Sierra Leone. New roles added regularly.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-black/5 p-4 mb-8 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search roles, skills, keywords..."
            className="flex-1 min-w-56 px-4 py-2.5 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
          />
          <select className="px-4 py-2.5 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
            <option value="">All Sectors</option>
            <option>Construction</option>
            <option>Healthcare</option>
            <option>Mining</option>
            <option>Hospitality</option>
            <option>Logistics</option>
            <option>Agriculture</option>
            <option>IT & Telecom</option>
            <option>Government</option>
          </select>
          <select className="px-4 py-2.5 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
            <option value="">All Types</option>
            <option>Permanent</option>
            <option>Contract</option>
            <option>Temporary</option>
          </select>
          <select className="px-4 py-2.5 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
            <option value="">All Locations</option>
            <option>Freetown</option>
            <option>Kono District</option>
            <option>Bo District</option>
            <option>Kenema</option>
          </select>
        </div>

        <p className="text-sm text-black/50 mb-5">{jobs.length} positions available</p>

        {/* Job list */}
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-black/5 hover:border-black/10 hover:shadow-md transition-all duration-200 p-6 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {job.urgent && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">Urgent</span>
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor[job.type]}`}>{job.type}</span>
                    <span className="text-xs text-black/40">{job.sector}</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-black group-hover:text-brand-blue transition-colors mb-1">
                    {job.title}
                  </h2>
                  <p className="text-black/60 text-sm mb-3">{job.company}</p>
                  <div className="flex items-center gap-4 text-xs text-black/40">
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BriefcaseIcon className="w-3.5 h-3.5" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {job.posted}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/apply?job=${job.id}&title=${encodeURIComponent(job.title)}`}
                  className="flex-shrink-0 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-all no-underline whitespace-nowrap"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-black rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white mb-2">{"Don't see the right role?"}</h3>
          <p className="text-white/60 text-sm mb-5">Submit your CV and we will match you with suitable opportunities as they arise.</p>
          <Link href="/apply" className="inline-block px-6 py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-all no-underline">
            Submit Your CV
          </Link>
        </div>
      </div>
    </div>
  )
}
