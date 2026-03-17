'use client'

import { useRef, useState } from 'react'
import { PhotoIcon, ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { uploadCmsImage } from '@/lib/cloudinary'

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm text-black bg-white placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition'

interface Props {
  value: string
  onChange: (url: string) => void
  alt?: string
  onAltChange?: (alt: string) => void
  aspect?: 'square' | 'video' | 'portrait'
  label?: string
}

export function ImageUpload({
  value,
  onChange,
  alt,
  onAltChange,
  aspect = 'square',
  label = 'Photo',
}: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  const aspectCls: Record<string, string> = {
    square:   'aspect-square',
    video:    'aspect-video',
    portrait: 'aspect-[3/4]',
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const url = await uploadCmsImage(file)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4 items-start">
        {/* Preview box */}
        <div className={`relative rounded-xl overflow-hidden border border-black/10 bg-black/[0.025] flex-shrink-0 w-28 ${aspectCls[aspect]}`}>
          {value ? (
            <>
              <img src={value} alt={alt ?? label} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-black/20">
              <PhotoIcon className="w-7 h-7" />
              <span className="text-[10px] font-medium">No image</span>
            </div>
          )}

          {/* Upload spinner overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Right column: upload button + URL input */}
        <div className="flex-1 space-y-2.5 pt-0.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-semibold rounded-xl hover:bg-black/80 disabled:opacity-50 transition-all"
          >
            <ArrowUpTrayIcon className="w-3.5 h-3.5" />
            {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFile}
          />

          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="or paste an image URL…"
            className="w-full px-3 py-2 text-xs border border-black/10 rounded-xl focus:outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 text-black placeholder:text-black/25 transition-all bg-white"
          />

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Alt text */}
      {onAltChange !== undefined && (
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-black/40 uppercase tracking-widest">
            Alt text <span className="normal-case font-normal text-black/25">(screen readers)</span>
          </label>
          <input
            type="text"
            value={alt ?? ''}
            onChange={e => onAltChange(e.target.value)}
            placeholder="Describe the image…"
            className={inputCls}
          />
        </div>
      )}
    </div>
  )
}
