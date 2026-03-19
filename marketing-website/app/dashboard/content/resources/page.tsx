import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/cms'
import { DEFAULT_RESOURCES } from '@/lib/cms-types'
import type { ResourcesContent } from '@/lib/cms-types'
import { ResourcesContentEditor } from './ResourcesContentEditor'

export default async function ResourcesContentPage() {
  const data = await getContent<ResourcesContent>('resources', 'main')

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">Resources Page</h1>
          <p className="text-xs text-black/40 mt-0.5">Heading and subtext</p>
        </div>
        <a
          href="/resources"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors no-underline"
        >
          View live
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      <ResourcesContentEditor initial={{ ...DEFAULT_RESOURCES, ...data }} />
    </div>
  )
}
