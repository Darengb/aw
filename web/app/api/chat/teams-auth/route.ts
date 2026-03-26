import { NextResponse } from 'next/server'

const TENANT_ID = process.env.TEAMS_TENANT_ID!
const CLIENT_ID = process.env.TEAMS_CLIENT_ID!

function getRedirectUri(request: Request): string {
  const url = new URL(request.url)
  return `${url.origin}/api/chat/teams-auth/callback`
}

export async function GET(request: Request) {
  const redirectUri = getRedirectUri(request)
  const state = crypto.randomUUID()

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'ChannelMessage.Send ChannelMessage.Read.All offline_access',
    state,
    response_mode: 'query',
  })

  const authUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?${params}`

  return NextResponse.redirect(authUrl)
}
