import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Comprehensive talent management solutions designed to streamline your hiring process and optimize workforce performance.',
  openGraph: {
    title: 'Solutions | Express Management Consultancy',
    description: 'Comprehensive talent management solutions.',
  },
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6 tracking-tight">
              Our Solutions
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl mx-auto">
              Tailored solutions to meet your unique talent management needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

