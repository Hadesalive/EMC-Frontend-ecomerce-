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
        flexDirection: 'row',
        fontFamily: 'sans-serif',
      }}
    >
      {/* LEFT — orange brand panel */}
      <div
        style={{
          width: 380,
          height: '100%',
          background: 'linear-gradient(160deg, #f97316 0%, #c2410c 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          flexShrink: 0,
        }}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            width={280}
            height={280}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.05em',
            }}>
              EMC
            </div>
            <div style={{
              display: 'flex',
              fontSize: 14,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: 8,
              textAlign: 'center',
            }}>
              Express Management Consultancy
            </div>
          </div>
        )}

        {/* "We're Hiring" tag */}
        <div style={{
          display: 'flex',
          marginTop: 32,
          background: 'rgba(0,0,0,0.25)',
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '8px 20px',
          borderRadius: 6,
        }}>
          We&apos;re Hiring
        </div>
      </div>

      {/* RIGHT — job details panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px 60px',
          background: '#ffffff',
        }}
      >
        {/* Sector label */}
        <div style={{
          display: 'flex',
          fontSize: 16,
          fontWeight: 700,
          color: '#f97316',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          {sector}
        </div>

        {/* Job title */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 40 ? 44 : title.length > 28 ? 52 : 60,
            fontWeight: 800,
            color: '#0a0a0a',
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          {title}
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: badgeColor,
              flexShrink: 0,
            }} />
            <div style={{ display: 'flex', fontSize: 20, fontWeight: 600, color: '#374151' }}>
              {location}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: badgeColor,
              flexShrink: 0,
            }} />
            <div style={{ display: 'flex', fontSize: 20, fontWeight: 600, color: '#374151' }}>
              {type}{salary ? ` · ${salary}` : ''}
            </div>
          </div>
        </div>

        {/* Bottom domain */}
        <div style={{
          display: 'flex',
          marginTop: 40,
          fontSize: 15,
          fontWeight: 500,
          color: '#9ca3af',
          letterSpacing: '0.05em',
        }}>
          www.expresssl.com
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
