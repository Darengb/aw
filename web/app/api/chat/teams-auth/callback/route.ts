import { NextResponse } from 'next/server'
import { redis } from '@/lib/teams/redis'

const TENANT_ID = process.env.TEAMS_TENANT_ID!
const CLIENT_ID = process.env.TEAMS_CLIENT_ID!
const CLIENT_SECRET = process.env.TEAMS_CLIENT_SECRET!

const TOKEN_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`

function getRedirectUri(request: Request): string {
  const url = new URL(request.url)
  return `${url.origin}/api/chat/teams-auth/callback`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    return new NextResponse(
      `<html><body><h1>Auth Failed</h1><p>${error}: ${errorDescription}</p></body></html>`,
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (!code) {
    return new NextResponse(
      '<html><body><h1>Auth Failed</h1><p>No authorization code received.</p></body></html>',
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const redirectUri = getRedirectUri(request)

  // Exchange authorization code for tokens
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'ChannelMessage.Send ChannelMessage.Read.All offline_access',
    code,
    redirect_uri: redirectUri,
  })

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    return new NextResponse(
      `<html><body><h1>Token Exchange Failed</h1><pre>${text}</pre></body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const data = await res.json()

  // Store tokens in Redis
  const ttl = Math.max((data.expires_in ?? 3600) - 300, 60)
  await redis.set('teams:access_token', data.access_token, { ex: ttl })

  if (data.refresh_token) {
    await redis.set('teams:refresh_token', data.refresh_token)
  }

  // Extract user ID (oid) from JWT and store it
  try {
    const payload = data.access_token.split('.')[1]
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())
    if (decoded.oid) {
      await redis.set('teams:user_id', decoded.oid)
    }
  } catch {
    // Non-fatal — service account filtering will fall back gracefully
  }

  return new NextResponse(
    '<html><body><h1>Teams Auth Complete</h1><p>Tokens stored successfully. You can close this tab.</p></body></html>',
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  )
}
