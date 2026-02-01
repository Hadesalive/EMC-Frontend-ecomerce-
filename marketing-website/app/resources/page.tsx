import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Access valuable resources, guides, and insights to help you make informed decisions about talent management and recruitment.',
  openGraph: {
    title: 'Resources | Express Management Consultancy',
    description: 'Valuable resources and insights for talent management.',
  },
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6 tracking-tight">
              Resources
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl mx-auto">
              Guides, insights, and tools to help you succeed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

