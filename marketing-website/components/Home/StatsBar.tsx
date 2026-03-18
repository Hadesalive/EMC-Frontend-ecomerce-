import React from 'react'

const stats = [
  { value: '10+',  label: 'Years in Sierra Leone' },
  { value: '500+', label: 'Candidates Placed' },
  { value: '11',   label: 'Industries Covered' },
  { value: '100+', label: 'Companies Partnered' },
]

export default function StatsBar() {
  return (
    <div className="bg-white dark:bg-black border-t border-b border-black/[0.07] dark:border-white/[0.07]">
      <div className="container">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/[0.07] dark:divide-white/[0.07]">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-8 px-4 gap-1 text-center">
              <dt className="font-display text-3xl lg:text-4xl font-bold text-black dark:text-white tracking-tight">
                {s.value}
              </dt>
              <dd className="text-xs text-black/40 dark:text-white/40 font-medium tracking-wide uppercase">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
