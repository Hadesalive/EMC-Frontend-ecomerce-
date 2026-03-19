import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/cms'
import {
  DEFAULT_ABOUT_INTRO,
  DEFAULT_ABOUT_PURPOSE,
  DEFAULT_ABOUT_HERO,
  DEFAULT_ABOUT_VALUES,
  DEFAULT_ABOUT_CSR,
} from '@/lib/cms-types'
import type {
  AboutIntroContent,
  AboutPurposeContent,
  AboutHeroContent,
  AboutValuesContent,
  AboutCSRContent,
} from '@/lib/cms-types'
import { AboutContentEditor } from './AboutContentEditor'

export default async function AboutContentPage() {
  const [intro, purpose, hero, values, csr] = await Promise.all([
    getContent<AboutIntroContent>('about', 'intro'),
    getContent<AboutPurposeContent>('about', 'purpose'),
    getContent<AboutHeroContent>('about', 'hero'),
    getContent<AboutValuesContent>('about', 'values'),
    getContent<AboutCSRContent>('about', 'csr'),
  ])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">About Page</h1>
          <p className="text-xs text-black/40 mt-0.5">Who we are · Purpose / Vision / Mission · Hero · Values · CSR</p>
        </div>
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors no-underline"
        >
          View live
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      <AboutContentEditor
        intro={{ ...DEFAULT_ABOUT_INTRO, ...intro }}
        purpose={{ ...DEFAULT_ABOUT_PURPOSE, ...purpose }}
        hero={{
          subtext: (hero as AboutHeroContent | null)?.subtext ?? DEFAULT_ABOUT_HERO.subtext,
          stats: (hero as AboutHeroContent | null)?.stats ?? DEFAULT_ABOUT_HERO.stats,
        }}
        values={{
          heading: (values as AboutValuesContent | null)?.heading ?? DEFAULT_ABOUT_VALUES.heading,
          subtext: (values as AboutValuesContent | null)?.subtext ?? DEFAULT_ABOUT_VALUES.subtext,
          values: (values as AboutValuesContent | null)?.values ?? DEFAULT_ABOUT_VALUES.values,
        }}
        csr={{ ...DEFAULT_ABOUT_CSR, ...csr }}
      />
    </div>
  )
}
