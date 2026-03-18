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
    Contract:  '#ea580c',
    Temporary: '#6b7280',
  }
  const badgeColor = typeColor[type] ?? '#ea580c'

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
      {/* Orange top stripe */}
      <div style={{ width: '100%', height: 14, background: '#f97316', display: 'flex', flexShrink: 0 }} />

      {/* Main content — everything centered so mobile square crop always hits the logo */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 80px',
        }}
      >
        {/* Logo — centered, large */}
        {logoSrc ? (
          <img
            src={logoSrc}
            width={420}
            height={140}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 900,
            color: '#f97316',
            letterSpacing: '0.08em',
          }}>
            EMC
          </div>
        )}

        {/* Orange divider */}
        <div style={{
          display: 'flex',
          width: 64,
          height: 5,
          background: '#f97316',
          borderRadius: 3,
          margin: '24px 0',
          flexShrink: 0,
        }} />

        {/* Job title — centered */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 45 ? 40 : title.length > 32 ? 48 : 56,
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.15,
            marginBottom: 24,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Badges row — centered */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'nowrap' }}>
          <div style={{
            padding: '10px 22px',
            background: badgeColor,
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.06em',
            borderRadius: 8,
            display: 'flex',
            textTransform: 'uppercase',
          }}>
            {type}
          </div>
          <div style={{
            padding: '10px 22px',
            background: '#f3f4f6',
            color: '#374151',
            fontSize: 17,
            fontWeight: 700,
            borderRadius: 8,
            display: 'flex',
          }}>
            {sector}
          </div>
          <div style={{
            padding: '10px 22px',
            background: '#f3f4f6',
            color: '#374151',
            fontSize: 17,
            fontWeight: 700,
            borderRadius: 8,
            display: 'flex',
          }}>
            📍 {location}
          </div>
          {salary ? (
            <div style={{
              padding: '10px 22px',
              background: '#eff6ff',
              color: '#1d4ed8',
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 8,
              display: 'flex',
            }}>
              {salary}
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div style={{ width: '100%', height: 14, background: 'linear-gradient(to right, #f97316, #1d4ed8)', display: 'flex', flexShrink: 0 }} />
    </div>,
    { width: 1200, height: 630 }
  )
}
