import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Placement Requests' }

const requests = [
  { id: 'REQ-034', company: 'Sierra Leone Mining Co.', contact: 'Thomas Kamara', role: 'Safety Officers', sector: 'Mining', count: 3, type: 'Permanent', date: '18 Feb 2026', status: 'new' },
  { id: 'REQ-033', company: 'Freetown Hotel Group', contact: 'Angela Davies', role: 'Front Desk Staff', sector: 'Hospitality', count: 5, type: 'Temporary', date: '17 Feb 2026', status: 'in-progress' },
  { id: 'REQ-032', company: 'MedPro Healthcare', contact: 'Dr. Samuel Koroma', role: 'Registered Nurses', sector: 'Healthcare', count: 4, type: 'Permanent', date: '16 Feb 2026', status: 'in-progress' },
  { id: 'REQ-031', company: 'AgriGrow SL', contact: 'Ramatu Sesay', role: 'Field Supervisors', sector: 'Agriculture', count: 2, type: 'Contract', date: '14 Feb 2026', status: 'filled' },
  { id: 'REQ-030', company: 'National Port Authority', contact: 'Ibrahim Turay', role: 'Logistics Coordinators', sector: 'Government', count: 6, type: 'Permanent', date: '12 Feb 2026', status: 'in-progress' },
  { id: 'REQ-029', company: 'TeleSL Communications', contact: 'Michael Bangura', role: 'Network Engineers', sector: 'IT & Telecom', count: 2, type: 'Permanent', date: '10 Feb 2026', status: 'filled' },
  { id: 'REQ-028', company: 'Rokel Construction Ltd', contact: 'George Mansaray', role: 'Civil Engineers', sector: 'Construction', count: 4, type: 'Contract', date: '8 Feb 2026', status: 'closed' },
  { id: 'REQ-027', company: 'Freetown Retail Group', contact: 'Aminata Cole', role: 'Store Managers', sector: 'Retail & FMCG', count: 3, type: 'Permanent', date: '6 Feb 2026', status: 'filled' },
]

const statusStyles: Record<string, string> = {
  new: 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-blue-50 text-blue-600',
  filled: 'bg-green-50 text-green-600',
  closed: 'bg-gray-100 text-gray-500',
}

const typeStyles: Record<string, string> = {
  Permanent: 'bg-brand-blue/10 text-brand-blue',
  Contract: 'bg-brand-orange/10 text-brand-orange',
  Temporary: 'bg-gray-100 text-gray-600',
}

export default function RequestsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Placement Requests</h1>
          <p className="text-black/50 text-sm mt-1">34 active requests from employers</p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-colors">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 mb-5 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by company or role..."
          className="flex-1 min-w-48 px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
        />
        <select className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Statuses</option>
          <option>New</option>
          <option>In Progress</option>
          <option>Filled</option>
          <option>Closed</option>
        </select>
        <select className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Sectors</option>
          <option>Construction</option>
          <option>Healthcare</option>
          <option>Mining</option>
          <option>Hospitality</option>
          <option>Government</option>
          <option>IT & Telecom</option>
          <option>Agriculture</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">ID</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Company</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Sector</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Positions</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {requests.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="px-5 py-4 text-xs font-mono text-black/40">{r.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-orange text-xs font-bold">{r.company.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{r.company}</p>
                        <p className="text-xs text-black/40">{r.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-black/70">{r.role}</td>
                  <td className="px-5 py-4 text-black/60 text-xs">{r.sector}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-black">{r.count}</span>
                    <span className="text-black/40 text-xs ml-1">pos.</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeStyles[r.type]}`}>{r.type}</span>
                  </td>
                  <td className="px-5 py-4 text-black/50 text-xs whitespace-nowrap">{r.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs font-medium text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-black/5 flex items-center justify-between">
          <p className="text-xs text-black/40">Showing 8 of 34 requests</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium border border-black/10 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-1.5 text-xs font-medium border border-black/10 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
