const TENANT_ID = process.env.TEAMS_TENANT_ID!
const CLIENT_ID = process.env.TEAMS_CLIENT_ID!
const CLIENT_SECRET = process.env.TEAMS_CLIENT_SECRET!
const USERNAME = process.env.TEAMS_USERNAME!
const PASSWORD = process.env.TEAMS_PASSWORD!

const TOKEN_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`
const SCOPE = 'https://graph.microsoft.com/.default'

let cached: { accessToken: string; expiresAt: number; userId: string } | null = null

export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (5-min buffer)
  if (cached && Date.now() < cached.expiresAt - 5 * 60 * 1000) {
    return cached.accessToken
  }

  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: SCOPE,
    username: USERNAME,
    password: PASSWORD,
  })

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`ROPC token request failed (${res.status}): ${text}`)
  }

  const data = await res.json()

  // Extract user ID (oid) from JWT payload
  let userId = ''
  try {
    const payload = data.access_token.split('.')[1]
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())
    userId = decoded.oid ?? ''
  } catch {
    // If JWT parsing fails, userId stays empty — filtering will be skipped
  }

  cached = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    userId,
  }

  return cached.accessToken
}

/** Get the service account's Azure AD user ID (oid from JWT). */
export async function getServiceAccountUserId(): Promise<string> {
  await getAccessToken() // Ensure token is cached
  return cached?.userId ?? ''
}
