import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = { title: 'Dashboard' }

const stats = [
  { label: 'Total Applications', value: '248', change: '+12 today', icon: UserGroupIcon, color: 'brand-blue' },
  { label: 'Placement Requests', value: '34', change: '+3 this week', icon: BuildingOfficeIcon, color: 'brand-orange' },
  { label: 'Placements This Month', value: '18', change: '+4 vs last month', icon: CheckCircleIcon, color: 'brand-blue' },
  { label: 'Avg. Response Time', value: '1.4d', change: 'down from 2.1d', icon: ClockIcon, color: 'brand-orange' },
]

const recentApplications = [
  { id: 'APP-248', name: 'James Koroma', role: 'Site Engineer', sector: 'Construction', date: 'Today', status: 'new' },
  { id: 'APP-247', name: 'Mariama Bangura', role: 'HR Manager', sector: 'Healthcare', date: 'Today', status: 'reviewing' },
  { id: 'APP-246', name: 'Abu Sesay', role: 'Logistics Officer', sector: 'Transport', date: 'Yesterday', status: 'shortlisted' },
  { id: 'APP-245', name: 'Fatmata Jalloh', role: 'Accounts Executive', sector: 'FMCG', date: 'Yesterday', status: 'reviewing' },
  { id: 'APP-244', name: 'Mohamed Conteh', role: 'Safety Officer', sector: 'Mining', date: '2d ago', status: 'placed' },
]

const recentRequests = [
  { id: 'REQ-034', company: 'Sierra Leone Mining Co.', role: 'Safety Officers', count: 3, date: 'Today', status: 'new' },
  { id: 'REQ-033', company: 'Freetown Hotel Group', role: 'Front Desk Staff', count: 5, date: 'Yesterday', status: 'in-progress' },
  { id: 'REQ-032', company: 'MedPro Healthcare', role: 'Registered Nurses', count: 4, date: '2d ago', status: 'in-progress' },
  { id: 'REQ-031', company: 'AgriGrow SL', role: 'Field Supervisors', count: 2, date: '3d ago', status: 'filled' },
]

const statusBadge: Record<string, string> = {
  new: 'bg-gray-100 text-gray-600',
  reviewing: 'bg-blue-50 text-blue-600',
  shortlisted: 'bg-orange-50 text-brand-orange',
  placed: 'bg-green-50 text-green-600',
  rejected: 'bg-red-50 text-red-500',
  'in-progress': 'bg-blue-50 text-blue-600',
  filled: 'bg-green-50 text-green-600',
  closed: 'bg-gray-100 text-gray-500',
}

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-black">Good morning, Admin</h1>
        <p className="text-black/50 text-sm mt-1">Here is what is happening at EMC today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon
          const isBlue = s.color === 'brand-blue'
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-black/5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBlue ? 'bg-brand-blue/10' : 'bg-brand-orange/10'}`}>
                  <Icon className={`w-5 h-5 ${isBlue ? 'text-brand-blue' : 'text-brand-orange'}`} />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <ArrowUpIcon className="w-3 h-3" />
                </div>
              </div>
              <div className="font-display text-2xl font-bold text-black mb-0.5">{s.value}</div>
              <div className="text-xs text-black/50 font-medium mb-1">{s.label}</div>
              <div className="text-xs text-green-600">{s.change}</div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
            <h2 className="font-display text-base font-bold text-black">Recent Applications</h2>
            <Link href="/dashboard/applications" className="text-xs font-medium text-brand-blue hover:underline no-underline">View all</Link>
          </div>
          <div className="divide-y divide-black/5">
            {recentApplications.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-blue text-xs font-bold">{a.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black truncate">{a.name}</p>
                  <p className="text-xs text-black/50 truncate">{a.role} · {a.sector}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusBadge[a.status]}`}>
                    {a.status}
                  </span>
                  <p className="text-xs text-black/40 mt-1">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
            <h2 className="font-display text-base font-bold text-black">Recent Requests</h2>
            <Link href="/dashboard/requests" className="text-xs font-medium text-brand-blue hover:underline no-underline">View all</Link>
          </div>
          <div className="divide-y divide-black/5">
            {recentRequests.map((r, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-orange text-xs font-bold">{r.company.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black truncate">{r.company}</p>
                  <p className="text-xs text-black/50 truncate">{r.role} · {r.count} position{r.count > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusBadge[r.status]}`}>
                    {r.status}
                  </span>
                  <p className="text-xs text-black/40 mt-1">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
