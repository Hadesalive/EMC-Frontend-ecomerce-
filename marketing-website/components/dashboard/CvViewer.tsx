'use client'
import { useState } from 'react'
import { X, ArrowSquareOut, FileDoc, FilePdf, Spinner, WarningCircle } from '@phosphor-icons/react'

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

function buildViewUrl(url: string, type: 'pdf' | 'word' | 'other'): string {
  if (type === 'pdf') {
    // Route through server proxy — handles both Supabase private storage (auth)
    // and Cloudinary raw files (Content-Disposition: attachment), serving inline.
    return `/api/cv-proxy?url=${encodeURIComponent(url)}`
  }
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
}

export default function CvViewer({ url, candidateName, onClose }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const type = fileType(url)
  const viewUrl = buildViewUrl(url, type)

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
            {type === 'pdf' ? 'PDF Document' : 'Word Document — via Google Docs'}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Download original"
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
        {/* Loading */}
        {!loaded && !failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-3 z-10">
            <Spinner size={28} className="animate-spin text-brand-blue" />
            <p className="text-sm text-black/40">Loading document…</p>
          </div>
        )}

        {/* Error fallback */}
        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-4 z-10">
            <WarningCircle size={36} weight="fill" className="text-amber-400" />
            <div className="text-center">
              <p className="text-sm font-semibold text-black mb-1">Preview unavailable</p>
              <p className="text-xs text-black/40 max-w-xs">
                The document couldn't be loaded in the viewer.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 transition-colors no-underline"
            >
              <ArrowSquareOut size={16} weight="bold" />
              Download CV
            </a>
          </div>
        )}

        <iframe
          key={viewUrl}
          src={viewUrl}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setFailed(true) }}
          className={`w-full h-full border-0 ${failed ? 'invisible' : ''}`}
          title={candidateName ? `${candidateName} CV` : 'CV'}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
