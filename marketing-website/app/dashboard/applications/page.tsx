import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Applications' }

const applications = [
  { id: 'APP-248', name: 'James Koroma', email: 'james.k@email.com', role: 'Site Engineer', sector: 'Construction', type: 'Permanent', date: '18 Feb 2026', status: 'new' },
  { id: 'APP-247', name: 'Mariama Bangura', email: 'mariama.b@email.com', role: 'HR Manager', sector: 'Healthcare', type: 'Permanent', date: '17 Feb 2026', status: 'reviewing' },
  { id: 'APP-246', name: 'Abu Sesay', email: 'abu.s@email.com', role: 'Logistics Officer', sector: 'Transport', type: 'Contract', date: '17 Feb 2026', status: 'shortlisted' },
  { id: 'APP-245', name: 'Fatmata Jalloh', email: 'fatmata.j@email.com', role: 'Accounts Executive', sector: 'FMCG', type: 'Permanent', date: '16 Feb 2026', status: 'reviewing' },
  { id: 'APP-244', name: 'Mohamed Conteh', email: 'mohamed.c@email.com', role: 'Safety Officer', sector: 'Mining', type: 'Permanent', date: '15 Feb 2026', status: 'placed' },
  { id: 'APP-243', name: 'Isatu Kamara', email: 'isatu.k@email.com', role: 'Nurse', sector: 'Healthcare', type: 'Permanent', date: '14 Feb 2026', status: 'interview' },
  { id: 'APP-242', name: 'David Williams', email: 'david.w@email.com', role: 'IT Support', sector: 'IT & Telecom', type: 'Contract', date: '13 Feb 2026', status: 'rejected' },
  { id: 'APP-241', name: 'Hawa Dumbuya', email: 'hawa.d@email.com', role: 'Hotel Manager', sector: 'Hospitality', type: 'Permanent', date: '12 Feb 2026', status: 'shortlisted' },
  { id: 'APP-240', name: 'Emmanuel Turay', email: 'emma.t@email.com', role: 'Field Officer', sector: 'Agriculture', type: 'Temporary', date: '11 Feb 2026', status: 'placed' },
  { id: 'APP-239', name: 'Kadiatu Bah', email: 'kadiatu.b@email.com', role: 'Finance Analyst', sector: 'Government', type: 'Permanent', date: '10 Feb 2026', status: 'new' },
]

const statusStyles: Record<string, string> = {
  new: 'bg-gray-100 text-gray-600',
  reviewing: 'bg-blue-50 text-blue-600',
  shortlisted: 'bg-orange-50 text-orange-600',
  interview: 'bg-purple-50 text-purple-600',
  placed: 'bg-green-50 text-green-600',
  rejected: 'bg-red-50 text-red-500',
}

const typeStyles: Record<string, string> = {
  Permanent: 'bg-brand-blue/10 text-brand-blue',
  Contract: 'bg-brand-orange/10 text-brand-orange',
  Temporary: 'bg-gray-100 text-gray-600',
}

export default function ApplicationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Applications</h1>
          <p className="text-black/50 text-sm mt-1">248 total applications</p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/90 transition-colors">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 mb-5 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or role..."
          className="flex-1 min-w-48 px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
        />
        <select className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Statuses</option>
          <option>New</option>
          <option>Reviewing</option>
          <option>Shortlisted</option>
          <option>Interview</option>
          <option>Placed</option>
          <option>Rejected</option>
        </select>
        <select className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Sectors</option>
          <option>Construction</option>
          <option>Healthcare</option>
          <option>Mining</option>
          <option>Hospitality</option>
          <option>FMCG</option>
          <option>Transport</option>
          <option>IT & Telecom</option>
        </select>
        <select className="px-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-brand-blue bg-white text-black/70">
          <option value="">All Types</option>
          <option>Permanent</option>
          <option>Contract</option>
          <option>Temporary</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">ID</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Applicant</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Sector</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/50 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {applications.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="px-5 py-4 text-xs font-mono text-black/40">{a.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-blue text-xs font-bold">{a.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{a.name}</p>
                        <p className="text-xs text-black/40">{a.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-black/70">{a.role}</td>
                  <td className="px-5 py-4 text-black/60 text-xs">{a.sector}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeStyles[a.type]}`}>{a.type}</span>
                  </td>
                  <td className="px-5 py-4 text-black/50 text-xs whitespace-nowrap">{a.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[a.status]}`}>
                      {a.status}
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
          <p className="text-xs text-black/40">Showing 10 of 248 applications</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium border border-black/10 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-1.5 text-xs font-medium border border-black/10 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
