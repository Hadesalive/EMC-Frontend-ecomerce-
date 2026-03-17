import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getAllTeamMembers } from '@/lib/cms'
import { TeamEditor } from './TeamEditor'

export default async function TeamContentPage() {
  const members = await getAllTeamMembers()
  const activeCount = members.filter(m => m.is_active).length

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-black">Team Members</h1>
          <p className="text-xs text-black/40 mt-0.5">
            {activeCount} visible on website · {members.length} total
          </p>
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

      <TeamEditor members={members} />
    </div>
  )
}
