import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  const headers: HeadersInit = {}

  if (url.includes('.supabase.co/storage/')) {
    // Private Supabase storage — authenticate with service role key
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!key) return new NextResponse('Server misconfigured', { status: 500 })
    headers['Authorization'] = `Bearer ${key}`
    headers['apikey'] = key
  } else if (!url.startsWith('https://res.cloudinary.com/')) {
    // Block anything that isn't Supabase storage or Cloudinary
    return new NextResponse('Invalid URL', { status: 403 })
  }

  try {
    const response = await fetch(url, { cache: 'no-store', headers })

    if (!response.ok) {
      console.error('[cv-proxy] upstream error:', response.status, url)
      return new NextResponse(`Upstream error ${response.status}`, { status: 502 })
    }

    const buffer = await response.arrayBuffer()
    const isPdf = url.split('?')[0].toLowerCase().endsWith('.pdf')

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': isPdf ? 'application/pdf' : 'application/octet-stream',
        'Content-Disposition': 'inline',
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (err) {
    console.error('[cv-proxy] fetch threw:', err)
    return new NextResponse('Failed to reach document server', { status: 502 })
  }
}
