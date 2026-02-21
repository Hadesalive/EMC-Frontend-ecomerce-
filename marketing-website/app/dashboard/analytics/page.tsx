import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics' }

const monthlyData = [
  { month: 'Sep', applications: 28, placements: 12 },
  { month: 'Oct', applications: 35, placements: 16 },
  { month: 'Nov', applications: 42, placements: 19 },
  { month: 'Dec', applications: 31, placements: 14 },
  { month: 'Jan', applications: 48, placements: 22 },
  { month: 'Feb', applications: 52, placements: 18 },
]

const bySector = [
  { sector: 'Construction', count: 52, pct: 21 },
  { sector: 'Healthcare', count: 44, pct: 18 },
  { sector: 'Mining', count: 38, pct: 15 },
  { sector: 'Hospitality', count: 30, pct: 12 },
  { sector: 'Government', count: 28, pct: 11 },
  { sector: 'FMCG & Retail', count: 24, pct: 10 },
  { sector: 'IT & Telecom', count: 20, pct: 8 },
  { sector: 'Other', count: 12, pct: 5 },
]

const placementTypes = [
  { type: 'Permanent', count: 124, pct: 61, color: 'bg-brand-blue' },
  { type: 'Contract', count: 52, pct: 26, color: 'bg-brand-orange' },
  { type: 'Temporary', count: 26, pct: 13, color: 'bg-gray-300' },
]

const maxApplications = Math.max(...monthlyData.map(d => d.applications))

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-black">Analytics</h1>
        <p className="text-black/50 text-sm mt-1">Performance overview for the last 6 months.</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Applications', value: '248', sub: 'Last 6 months', color: 'text-brand-blue' },
          { label: 'Total Placements', value: '101', sub: 'Last 6 months', color: 'text-brand-orange' },
          { label: 'Conversion Rate', value: '40.7%', sub: 'Applications → Placed', color: 'text-brand-blue' },
          { label: 'Avg. Time to Place', value: '14d', sub: 'From application', color: 'text-brand-orange' },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-black/5 p-5">
            <div className={`text-3xl font-bold ${m.color} mb-1`}>{m.value}</div>
            <div className="text-sm font-semibold text-black mb-0.5">{m.label}</div>
            <div className="text-xs text-black/40">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly chart */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="font-display text-base font-bold text-black mb-6">Monthly Activity</h2>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1 justify-end" style={{ height: '120px' }}>
                  <div
                    className="w-full bg-brand-blue/20 rounded-t-md relative group"
                    style={{ height: `${(d.applications / maxApplications) * 100}%` }}
                  >
                    <div
                      className="w-full bg-brand-blue rounded-t-md absolute bottom-0"
                      style={{ height: `${(d.placements / d.applications) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-black/40 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-brand-blue/20" />
              <span className="text-xs text-black/50">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-brand-blue" />
              <span className="text-xs text-black/50">Placements</span>
            </div>
          </div>
        </div>

        {/* By sector */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="font-display text-base font-bold text-black mb-6">Applications by Sector</h2>
          <div className="space-y-3.5">
            {bySector.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-black/70">{s.sector}</span>
                  <span className="text-xs font-semibold text-black">{s.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${i % 2 === 0 ? 'bg-brand-blue' : 'bg-brand-orange'}`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placement types */}
      <div className="bg-white rounded-2xl border border-black/5 p-6">
        <h2 className="font-display text-base font-bold text-black mb-6">Placements by Type</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {placementTypes.map((t, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-black">{t.type}</span>
                  <span className="text-sm font-bold text-black">{t.pct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
                <div className="text-xs text-black/40 mt-1">{t.count} placements</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
