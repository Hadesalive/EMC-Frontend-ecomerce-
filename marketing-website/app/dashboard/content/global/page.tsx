import { getContent } from '@/lib/cms'
import { DEFAULT_GLOBAL } from '@/lib/cms-types'
import type { GlobalContent } from '@/lib/cms-types'
import { GlobalContentEditor } from './GlobalContentEditor'

export default async function GlobalContentPage() {
  const data = await getContent<GlobalContent>('global', 'main')

  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-black">Global Settings</h1>
        <p className="text-xs text-black/40 mt-0.5">Site description · Footer copy</p>
      </div>

      <GlobalContentEditor initial={{ ...DEFAULT_GLOBAL, ...data }} />
    </div>
  )
}
