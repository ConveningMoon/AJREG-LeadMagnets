import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_ITMANO_BASE_URL ?? 'https://app.itmano.com'

type RouteParams = { params: Promise<{ channelPublicId: string }> }

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { channelPublicId } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const upstream = await fetch(
    `${BASE_URL}/api/intake/${channelPublicId}/submit`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    },
  )

  const data = await upstream.json()
  return NextResponse.json(data, { status: upstream.status })
}
