import { NextResponse } from 'next/server'
import { getReplies } from '@/lib/teams/graph'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rootMessageId = searchParams.get('rootMessageId')
    const since = searchParams.get('since') ?? undefined

    if (!rootMessageId) {
      return NextResponse.json(
        { error: 'rootMessageId is required' },
        { status: 400 }
      )
    }

    const replies = await getReplies(rootMessageId, since)

    return NextResponse.json({
      replies: replies.map((r) => ({
        text: r.text,
        from: r.from,
        timestamp: r.createdDateTime,
      })),
    })
  } catch (error) {
    console.error('[poll error]', error)
    return NextResponse.json({ replies: [] })
  }
}
