import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/cms'
import { DEFAULT_HERO, DEFAULT_FEATURES, DEFAULT_CTA, DEFAULT_HOME_SERVICES } from '@/lib/cms-types'
import type { HeroContent, FeaturesContent, CTAContent, HomeServicesContent } from '@/lib/cms-types'
import { HomeContentEditor } from './HomeContentEditor'

export default async function HomeContentPage() {
  const [hero, features, servicesData, cta] = await Promise.all([
    getContent<HeroContent>('home', 'hero'),
    getContent<FeaturesContent>('home', 'features'),
    getContent<HomeServicesContent>('home', 'services'),
    getContent<CTAContent>('home', 'cta'),
  ])

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">Home Page</h1>
          <p className="text-xs text-black/40 mt-0.5">Hero banner · Features section · Services · Bottom CTA</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors no-underline"
        >
          View live
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      <HomeContentEditor
        hero={{ ...DEFAULT_HERO, ...hero }}
        features={{
          ...DEFAULT_FEATURES,
          ...features,
          advantages: (features as FeaturesContent | null)?.advantages ?? DEFAULT_FEATURES.advantages,
        }}
        services={{
          section_label: (servicesData as HomeServicesContent | null)?.section_label ?? DEFAULT_HOME_SERVICES.section_label,
          heading: (servicesData as HomeServicesContent | null)?.heading ?? DEFAULT_HOME_SERVICES.heading,
          services: (servicesData as HomeServicesContent | null)?.services ?? DEFAULT_HOME_SERVICES.services,
        }}
        cta={{
          ...DEFAULT_CTA,
          ...cta,
          trust_points: (cta as CTAContent | null)?.trust_points ?? DEFAULT_CTA.trust_points,
        }}
      />
    </div>
  )
}
