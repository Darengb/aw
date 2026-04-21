import { NextResponse } from 'next/server'
import { redis } from '@/lib/teams/redis'
import { getAccessToken } from '@/lib/teams/auth'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Force a refresh by evicting the cached access token so getAccessToken
  // exchanges the refresh token, which rotates it and resets Microsoft's
  // 90-day inactivity timer.
  await redis.del('teams:access_token')

  try {
    await getAccessToken()
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[Teams refresh cron error]', err)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
