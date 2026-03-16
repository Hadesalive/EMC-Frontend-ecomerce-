import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 100px',
        }}
      >
        {/* Overline */}
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#f97316',
            marginBottom: 28,
            display: 'flex',
          }}
        >
          Express Management Consultancy
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 28,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          Talent. Expertise. Workforce Solutions.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 22,
            color: '#6b7280',
            display: 'flex',
          }}
        >
          Recruitment &amp; HR Consultancy · Sierra Leone
        </div>
      </div>

      {/* Bottom dark bar */}
      <div style={{ width: '100%', height: 6, background: '#1f2937', display: 'flex' }} />
    </div>,
    { width: 1200, height: 630 }
  )
}
