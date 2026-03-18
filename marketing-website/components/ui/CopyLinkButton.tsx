'use client'
import { useState } from 'react'
import { LinkSimple, Check } from '@phosphor-icons/react'

export default function CopyLinkButton({ jobId }: { jobId: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/jobs/${jobId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy link"
      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-black/5 text-gray-400 hover:bg-black/10 hover:text-gray-700'
      }`}
    >
      {copied
        ? <Check size={13} weight="bold" />
        : <LinkSimple size={13} weight="bold" />
      }
    </button>
  )
}
