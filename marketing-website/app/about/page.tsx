import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Express Management Consultancy - Our mission, values, and commitment to providing exceptional talent management and recruitment solutions.',
  openGraph: {
    title: 'About Us | Express Management Consultancy',
    description: 'Learn about Express Management Consultancy and our commitment to excellence.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6 tracking-tight">
              About Express Management Consultancy
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl mx-auto">
              Delivering exceptional talent management and HR services to help businesses build high-performing teams and achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 to-orange-50/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-black mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-black/70 leading-relaxed text-center mb-12">
              To transform the way businesses find, hire, and manage talent by providing innovative staffing solutions and expert HR services that drive growth and success.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue mb-3">2.5K+</div>
                <div className="text-sm text-black/60 font-medium">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-orange mb-3">500+</div>
                <div className="text-sm text-black/60 font-medium">Trusted Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue mb-3">98%</div>
                <div className="text-sm text-black/60 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-black mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-black/5 rounded-2xl hover:border-brand-blue/20 transition-colors">
                <h3 className="font-display text-xl font-bold text-black mb-3">Quality First</h3>
                <p className="text-black/60 leading-relaxed">We ensure every candidate meets the highest standards of skill and cultural fit.</p>
              </div>
              <div className="p-6 border border-black/5 rounded-2xl hover:border-brand-orange/20 transition-colors">
                <h3 className="font-display text-xl font-bold text-black mb-3">Client Focus</h3>
                <p className="text-black/60 leading-relaxed">Understanding your unique needs and delivering tailored solutions.</p>
              </div>
              <div className="p-6 border border-black/5 rounded-2xl hover:border-brand-blue/20 transition-colors">
                <h3 className="font-display text-xl font-bold text-black mb-3">Innovation</h3>
                <p className="text-black/60 leading-relaxed">Leveraging technology and best practices to streamline processes.</p>
              </div>
              <div className="p-6 border border-black/5 rounded-2xl hover:border-brand-orange/20 transition-colors">
                <h3 className="font-display text-xl font-bold text-black mb-3">Integrity</h3>
                <p className="text-black/60 leading-relaxed">Transparent, ethical practices in everything we do.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
