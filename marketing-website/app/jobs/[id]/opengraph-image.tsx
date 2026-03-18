import { ImageResponse } from 'next/og'

export const dynamic = 'force-dynamic'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let title    = 'Open Position'
  let sector   = 'Recruitment'
  let type     = 'Contract'
  let location = 'Freetown, Sierra Leone'
  let salary   = ''

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/jobs?id=eq.${id}&select=title,sector,type,location,salary_range`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        cache: 'no-store',
      }
    )
    const [job] = await res.json()
    if (job) {
      title    = job.title        ?? title
      sector   = job.sector       ?? sector
      type     = job.type         ?? type
      location = job.location     ?? location
      salary   = job.salary_range ?? ''
    }
  } catch {
    // fallback values used
  }

  // Fetch logo as base64 for reliable rendering inside ImageResponse
  let logoSrc = ''
  try {
    const logoRes = await fetch('https://www.expresssl.com/images/Emc%20Logo%20header.png')
    const logoData = await logoRes.arrayBuffer()
    logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`
  } catch {
    // logo omitted on error
  }

  const typeColor: Record<string, string> = {
    Permanent: '#1d4ed8',
    Contract:  '#f97316',
    Temporary: '#6b7280',
  }
  const badgeColor = typeColor[type] ?? '#f97316'

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px 90px',
        }}
      >
        {/* BIG Logo */}
        {logoSrc ? (
          <img
            src={logoSrc}
            width={480}
            height={160}
            style={{ objectFit: 'contain', objectPosition: 'left', marginBottom: 40 }}
          />
        ) : (
          <div style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 900,
            color: '#f97316',
            letterSpacing: '0.08em',
            marginBottom: 40,
          }}>
            Express Management Consultancy
          </div>
        )}

        {/* Job title */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 45 ? 42 : title.length > 30 ? 50 : 58,
            fontWeight: 800,
            color: '#0a0a0a',
            lineHeight: 1.1,
            marginBottom: 36,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 14 }}>
          <div
            style={{
              padding: '12px 28px',
              background: badgeColor,
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.08em',
              borderRadius: 8,
              display: 'flex',
              textTransform: 'uppercase',
            }}
          >
            {type}
          </div>
          <div
            style={{
              padding: '12px 28px',
              background: '#f3f4f6',
              color: '#111827',
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 8,
              display: 'flex',
            }}
          >
            {sector}
          </div>
          <div
            style={{
              padding: '12px 28px',
              background: '#f3f4f6',
              color: '#111827',
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 8,
              display: 'flex',
            }}
          >
            📍 {location}
          </div>
          {salary ? (
            <div
              style={{
                padding: '12px 28px',
                background: '#eff6ff',
                color: '#1d4ed8',
                fontSize: 18,
                fontWeight: 700,
                borderRadius: 8,
                display: 'flex',
              }}
            >
              {salary}
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div style={{ width: '100%', height: 8, background: 'linear-gradient(to right, #f97316, #1d4ed8)', display: 'flex' }} />
    </div>,
    { width: 1200, height: 630 }
  )
}
