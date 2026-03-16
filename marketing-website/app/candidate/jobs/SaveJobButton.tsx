'use client'
import { useTransition } from 'react'
import { saveJob, unsaveJob } from '../saved/actions'

export default function SaveJobButton({
  jobId,
  profileId,
  isSaved,
}: {
  jobId: string
  profileId: string
  isSaved: boolean
}) {
  const [isPending, start] = useTransition()

  function toggle() {
    if (!profileId) return
    start(() => (isSaved ? unsaveJob(jobId) : saveJob(jobId)))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending || !profileId}
      aria-label={isSaved ? 'Remove from saved jobs' : 'Save this job'}
      className={`p-2 rounded-lg border transition-all disabled:opacity-40 ${
        isSaved
          ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
          : 'border-black/10 text-black/40 hover:border-brand-blue hover:text-brand-blue'
      }`}
    >
      <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  )
}
