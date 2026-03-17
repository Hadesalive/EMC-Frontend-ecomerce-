import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/cms'
import { DEFAULT_CONTACT } from '@/lib/cms-types'
import type { ContactContent } from '@/lib/cms-types'
import { ContactContentEditor } from './ContactContentEditor'

export default async function ContactContentPage() {
  const info = await getContent<ContactContent>('contact', 'info')

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">Contact Page</h1>
          <p className="text-xs text-black/40 mt-0.5">Address · Phone · Email · Hours · Social links</p>
        </div>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors no-underline"
        >
          View live
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      <ContactContentEditor initial={{ ...DEFAULT_CONTACT, ...info }} />
    </div>
  )
}
