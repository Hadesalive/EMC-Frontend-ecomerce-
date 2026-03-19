import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/cms'
import {
  DEFAULT_SERVICES_HERO,
  DEFAULT_SERVICES_RECRUITMENT,
  DEFAULT_SERVICES_HR,
  DEFAULT_SERVICES_OUTSOURCING,
} from '@/lib/cms-types'
import type {
  ServicesHeroContent,
  ServicesRecruitmentContent,
  ServicesHRContent,
  ServicesOutsourcingContent,
} from '@/lib/cms-types'
import { ServicesContentEditor } from './ServicesContentEditor'

export default async function ServicesContentPage() {
  const [hero, recruitment, hr, outsourcing] = await Promise.all([
    getContent<ServicesHeroContent>('services', 'hero'),
    getContent<ServicesRecruitmentContent>('services', 'recruitment'),
    getContent<ServicesHRContent>('services', 'hr'),
    getContent<ServicesOutsourcingContent>('services', 'outsourcing'),
  ])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">Services Page</h1>
          <p className="text-xs text-black/40 mt-0.5">Hero · Recruitment · HR Advisory · Outsourcing</p>
        </div>
        <a
          href="/services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors no-underline"
        >
          View live
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      <ServicesContentEditor
        hero={{ ...DEFAULT_SERVICES_HERO, ...hero }}
        recruitment={{
          ...DEFAULT_SERVICES_RECRUITMENT,
          ...recruitment,
          featured_bullets: (recruitment as ServicesRecruitmentContent | null)?.featured_bullets ?? DEFAULT_SERVICES_RECRUITMENT.featured_bullets,
          cards: (recruitment as ServicesRecruitmentContent | null)?.cards ?? DEFAULT_SERVICES_RECRUITMENT.cards,
        }}
        hr={{
          items: (hr as ServicesHRContent | null)?.items ?? DEFAULT_SERVICES_HR.items,
        }}
        outsourcing={{
          items: (outsourcing as ServicesOutsourcingContent | null)?.items ?? DEFAULT_SERVICES_OUTSOURCING.items,
        }}
      />
    </div>
  )
}
