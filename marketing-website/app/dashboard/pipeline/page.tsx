import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Candidate Pipeline' }

const columns = [
  {
    id: 'new',
    label: 'New',
    color: 'bg-gray-100 text-gray-600',
    dot: 'bg-gray-400',
    candidates: [
      { name: 'James Koroma', role: 'Site Engineer', company: 'Client TBD', days: '0d' },
      { name: 'Kadiatu Bah', role: 'Finance Analyst', company: 'Gov. Agency', days: '1d' },
      { name: 'Ernest Mansaray', role: 'Driver', company: 'Client TBD', days: '1d' },
    ],
  },
  {
    id: 'screening',
    label: 'Screening',
    color: 'bg-blue-50 text-blue-600',
    dot: 'bg-blue-400',
    candidates: [
      { name: 'Mariama Bangura', role: 'HR Manager', company: 'MedPro Healthcare', days: '3d' },
      { name: 'Fatmata Jalloh', role: 'Accounts Exec.', company: 'Freetown Retail', days: '4d' },
      { name: 'Sorie Kamara', role: 'IT Support', company: 'TeleSL', days: '5d' },
    ],
  },
  {
    id: 'shortlisted',
    label: 'Shortlisted',
    color: 'bg-orange-50 text-orange-600',
    dot: 'bg-orange-400',
    candidates: [
      { name: 'Abu Sesay', role: 'Logistics Officer', company: 'NPA', days: '6d' },
      { name: 'Hawa Dumbuya', role: 'Hotel Manager', company: 'Freetown Hotel', days: '7d' },
    ],
  },
  {
    id: 'interview',
    label: 'Interview',
    color: 'bg-purple-50 text-purple-600',
    dot: 'bg-purple-400',
    candidates: [
      { name: 'Isatu Kamara', role: 'Nurse', company: 'MedPro Healthcare', days: '9d' },
      { name: 'Joseph Conteh', role: 'Civil Engineer', company: 'Rokel Construction', days: '10d' },
    ],
  },
  {
    id: 'placed',
    label: 'Placed',
    color: 'bg-green-50 text-green-600',
    dot: 'bg-green-400',
    candidates: [
      { name: 'Mohamed Conteh', role: 'Safety Officer', company: 'SL Mining Co.', days: '14d' },
      { name: 'Emmanuel Turay', role: 'Field Officer', company: 'AgriGrow SL', days: '16d' },
      { name: 'Adama Koroma', role: 'Store Manager', company: 'Freetown Retail', days: '18d' },
    ],
  },
]

export default function PipelinePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-black">Candidate Pipeline</h1>
        <p className="text-black/50 text-sm mt-1">Track candidates through each stage of the recruitment process.</p>
      </div>

      {/* Stage summary */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {columns.map((col) => (
          <div key={col.id} className="bg-white rounded-xl border border-black/5 p-3 text-center">
            <div className={`text-lg font-bold ${col.color.includes('gray') ? 'text-gray-700' : col.color.includes('blue') ? 'text-blue-600' : col.color.includes('orange') ? 'text-orange-600' : col.color.includes('purple') ? 'text-purple-600' : 'text-green-600'}`}>
              {col.candidates.length}
            </div>
            <div className="text-xs text-black/50 font-medium">{col.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-64">
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className={`w-2 h-2 rounded-full ${col.dot}`} />
              <span className="text-sm font-semibold text-black">{col.label}</span>
              <span className="ml-auto text-xs text-black/40 font-medium">{col.candidates.length}</span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {col.candidates.map((c, i) => (
                <div key={i} className="bg-white rounded-xl border border-black/5 p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                      <span className="text-brand-blue text-xs font-bold">{c.name.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-black/30">{c.days}</span>
                  </div>
                  <p className="text-sm font-semibold text-black mb-0.5">{c.name}</p>
                  <p className="text-xs text-black/50 mb-1">{c.role}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                    <span className="text-xs text-black/40 truncate">{c.company}</span>
                  </div>
                </div>
              ))}

              {/* Add card placeholder */}
              <button className="w-full py-3 border border-dashed border-black/10 rounded-xl text-xs text-black/30 hover:border-black/20 hover:text-black/50 transition-colors">
                + Add candidate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
