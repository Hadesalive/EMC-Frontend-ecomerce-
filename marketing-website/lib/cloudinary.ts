// Cloudinary unsigned upload — runs in the browser (dashboard only)
// Two presets:
//   emc_jobs — resource type: Image  (job images)
//   emc_cv   — resource type: Raw    (PDF / Word CVs)

async function cloudinaryUpload(
  file: File,
  resourceType: 'image' | 'raw',
  preset: string,
  folder?: string,
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName || !preset) throw new Error('Cloudinary env vars not set')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', preset)
  formData.append('folder', folder ?? (resourceType === 'raw' ? 'emc/cvs' : 'emc/jobs'))

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: 'POST', body: formData },
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message ?? 'Cloudinary upload failed')
  }
  const data = await res.json()
  return data.secure_url as string
}

const IMAGE_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
const CV_PRESET    = process.env.NEXT_PUBLIC_CLOUDINARY_CV_PRESET ?? IMAGE_PRESET

export const uploadToCloudinary   = (file: File) => cloudinaryUpload(file, 'image', IMAGE_PRESET)
export const uploadCvToCloudinary = (file: File) => cloudinaryUpload(file, 'raw',   CV_PRESET)
export const uploadCmsImage       = (file: File) => cloudinaryUpload(file, 'image', IMAGE_PRESET, 'emc/cms')

// Open a CV URL inline via Google Docs viewer.
// Cloudinary raw files are served with Content-Disposition: attachment which
// prevents iframe rendering — Google Docs viewer fetches the file server-side
// and renders it in-browser, bypassing that header for both PDF and Word files.
export const cvViewerUrl = (url: string): string => {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
}
