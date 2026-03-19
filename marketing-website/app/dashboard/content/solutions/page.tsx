import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/cms'
import { DEFAULT_SOLUTIONS_HERO, DEFAULT_SOLUTIONS_LIST } from '@/lib/cms-types'
import type { SolutionsHeroContent, SolutionsListContent } from '@/lib/cms-types'
import { SolutionsContentEditor } from './SolutionsContentEditor'

export default async function SolutionsContentPage() {
  const [hero, list] = await Promise.all([
    getContent<SolutionsHeroContent>('solutions', 'hero'),
    getContent<SolutionsListContent>('solutions', 'list'),
  ])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">Solutions Page</h1>
          <p className="text-xs text-black/40 mt-0.5">Hero · Six solution cards</p>
        </div>
        <a
          href="/solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors no-underline"
        >
          View live
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      <SolutionsContentEditor
        hero={{ ...DEFAULT_SOLUTIONS_HERO, ...hero }}
        list={{
          solutions: (list as SolutionsListContent | null)?.solutions ?? DEFAULT_SOLUTIONS_LIST.solutions,
        }}
      />
    </div>
  )
}
