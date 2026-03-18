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
      title    = job.title    ?? title
      sector   = job.sector   ?? sector
      type     = job.type     ?? type
      location = job.location ?? location
      salary   = job.salary_range ?? ''
    }
  } catch {
    // fallback values used
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
        background: '#0a0a0a',
      }}
    >
      {/* Top orange bar */}
      <div style={{ width: '100%', height: 8, background: '#f97316', display: 'flex' }} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 90px',
        }}
      >
        {/* Badges */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '8px 22px',
              background: badgeColor,
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.12em',
              borderRadius: 6,
              display: 'flex',
              textTransform: 'uppercase',
            }}
          >
            {type}
          </div>
          <div
            style={{
              padding: '8px 22px',
              background: '#1f2937',
              color: '#9ca3af',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 6,
              display: 'flex',
            }}
          >
            {sector}
          </div>
          <div
            style={{
              padding: '8px 22px',
              background: '#1f2937',
              color: '#9ca3af',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 6,
              display: 'flex',
            }}
          >
            📍 {location}
          </div>
          {salary ? (
            <div
              style={{
                padding: '8px 22px',
                background: 'rgba(59,130,246,0.2)',
                color: '#93c5fd',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 6,
                display: 'flex',
              }}
            >
              {salary}
            </div>
          ) : null}
        </div>

        {/* Job title */}
        <div
          style={{
            fontSize: title.length > 45 ? 46 : title.length > 30 ? 56 : 68,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 48,
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Brand footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#f97316',
              display: 'flex',
            }}
          >
            Express Management Consultancy
          </div>
          <div style={{ fontSize: 15, color: '#4b5563', display: 'flex' }}>
            expresssl.com · Freetown, Sierra Leone
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ width: '100%', height: 6, background: '#1f2937', display: 'flex' }} />
    </div>,
    { width: 1200, height: 630 }
  )
}
