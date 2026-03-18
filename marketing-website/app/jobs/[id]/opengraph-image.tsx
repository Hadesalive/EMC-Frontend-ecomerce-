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
      {/* Orange top accent bar */}
      <div style={{ width: '100%', height: 10, background: '#f97316', display: 'flex' }} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 80px 40px',
        }}
      >
        {/* BIG Logo — hero element */}
        {logoSrc ? (
          <img
            src={logoSrc}
            style={{ height: 160, objectFit: 'contain', marginBottom: 36 }}
          />
        ) : (
          <div style={{
            display: 'flex',
            fontSize: 42,
            fontWeight: 900,
            color: '#f97316',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 36,
          }}>
            EMC
          </div>
        )}

        {/* Divider */}
        <div style={{
          width: 80,
          height: 4,
          background: '#f97316',
          borderRadius: 2,
          marginBottom: 32,
          display: 'flex',
        }} />

        {/* Job title */}
        <div
          style={{
            fontSize: title.length > 50 ? 38 : title.length > 35 ? 46 : 54,
            fontWeight: 800,
            color: '#0a0a0a',
            lineHeight: 1.15,
            marginBottom: 28,
            textAlign: 'center',
            maxWidth: 920,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div
            style={{
              padding: '10px 24px',
              background: badgeColor,
              color: '#fff',
              fontSize: 17,
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
              padding: '10px 24px',
              background: '#f3f4f6',
              color: '#111827',
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 8,
              display: 'flex',
            }}
          >
            {sector}
          </div>
          <div
            style={{
              padding: '10px 24px',
              background: '#f3f4f6',
              color: '#111827',
              fontSize: 17,
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
                padding: '10px 24px',
                background: '#eff6ff',
                color: '#1d4ed8',
                fontSize: 17,
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

      {/* Bottom gradient bar */}
      <div style={{ width: '100%', height: 10, background: 'linear-gradient(to right, #f97316, #1d4ed8)', display: 'flex' }} />
    </div>,
    { width: 1200, height: 630 }
  )
}
