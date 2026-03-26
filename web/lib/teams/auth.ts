import { redis } from './redis'

const TENANT_ID = process.env.TEAMS_TENANT_ID!
const CLIENT_ID = process.env.TEAMS_CLIENT_ID!

const TOKEN_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`

// In-memory cache to avoid hitting Redis on every request within the same invocation
let memCache: { accessToken: string; expiresAt: number } | null = null

export async function getAccessToken(): Promise<string> {
  // Check in-memory cache first (same serverless invocation)
  if (memCache && Date.now() < memCache.expiresAt - 5 * 60 * 1000) {
    return memCache.accessToken
  }

  // Check Redis for a cached access token
  const cachedToken = await redis.get<string>('teams:access_token')
  if (cachedToken) {
    // Cache in memory for the rest of this invocation
    memCache = { accessToken: cachedToken, expiresAt: Date.now() + 30 * 60 * 1000 }
    return cachedToken
  }

  // No valid access token — refresh using the stored refresh token
  const refreshToken = await redis.get<string>('teams:refresh_token')
  if (!refreshToken) {
    throw new Error('Teams auth not configured. Visit /api/chat/teams-auth to set up.')
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    scope: 'https://graph.microsoft.com/.default offline_access',
    refresh_token: refreshToken,
  })

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token refresh failed (${res.status}): ${text}`)
  }

  const data = await res.json()

  // Store the new access token in Redis with TTL (slightly less than expires_in)
  const ttl = Math.max((data.expires_in ?? 3600) - 300, 60)
  await redis.set('teams:access_token', data.access_token, { ex: ttl })

  // Store the new refresh token (token rotation — old one is now invalid)
  if (data.refresh_token) {
    await redis.set('teams:refresh_token', data.refresh_token)
  }

  // Update in-memory cache
  memCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + ttl * 1000,
  }

  return data.access_token
}

/** Get the service account's Azure AD user ID (stored during OAuth setup). */
export async function getServiceAccountUserId(): Promise<string> {
  const userId = await redis.get<string>('teams:user_id')
  return userId ?? ''
}
