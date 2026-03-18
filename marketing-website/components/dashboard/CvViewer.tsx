'use client'
import { useState } from 'react'
import { X, ArrowSquareOut, FileDoc, FilePdf, Spinner } from '@phosphor-icons/react'
import { cvViewerUrl } from '@/lib/cloudinary'

type Props = {
  url: string
  candidateName?: string
  onClose: () => void
}

function fileType(url: string): 'pdf' | 'word' | 'other' {
  const lower = url.split('?')[0].toLowerCase()
  if (lower.endsWith('.pdf')) return 'pdf'
  if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'word'
  return 'other'
}

export default function CvViewer({ url, candidateName, onClose }: Props) {
  const [loaded, setLoaded] = useState(false)
  const type = fileType(url)
  const viewUrl = cvViewerUrl(url)

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/70 backdrop-blur-sm" onClick={onClose}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-white border-b border-black/10 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        {type === 'pdf'
          ? <FilePdf size={20} weight="fill" className="text-red-500 shrink-0" />
          : <FileDoc size={20} weight="fill" className="text-brand-blue shrink-0" />
        }
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-black truncate">
            {candidateName ? `${candidateName}'s CV` : 'CV'}
          </p>
          <p className="text-[11px] text-black/40 uppercase tracking-wide">
            {type === 'pdf' ? 'PDF Document' : type === 'word' ? 'Word Document — via Google Docs' : 'Document'}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          className="p-2 rounded-lg hover:bg-gray-100 text-black/40 hover:text-black transition-colors"
        >
          <ArrowSquareOut size={18} weight="bold" />
        </a>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 text-black/40 hover:text-black transition-colors"
        >
          <X size={18} weight="bold" />
        </button>
      </div>

      {/* Viewer */}
      <div className="flex-1 relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-3">
            <Spinner size={28} className="animate-spin text-brand-blue" />
            <p className="text-sm text-black/40">Loading document…</p>
            {type === 'word' && (
              <p className="text-xs text-black/30 max-w-xs text-center">
                Word documents load via Google Docs viewer — may take a moment.
              </p>
            )}
          </div>
        )}
        <iframe
          src={viewUrl}
          onLoad={() => setLoaded(true)}
          className="w-full h-full border-0"
          title={candidateName ? `${candidateName} CV` : 'CV'}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
