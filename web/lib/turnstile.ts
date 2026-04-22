const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

interface SiteverifyResponse {
  success: boolean
  'error-codes'?: string[]
  hostname?: string
  action?: string
  cdata?: string
}

export async function verifyTurnstile(token: string | null | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY is not set')
    return false
  }
  if (!token) return false

  const body = new URLSearchParams()
  body.append('secret', secret)
  body.append('response', token)
  if (ip) body.append('remoteip', ip)

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    if (!res.ok) {
      console.error('[turnstile] siteverify non-2xx:', res.status)
      return false
    }
    const data = (await res.json()) as SiteverifyResponse
    if (!data.success) {
      console.warn('[turnstile] verification failed:', data['error-codes'])
    }
    return data.success === true
  } catch (err) {
    console.error('[turnstile] siteverify fetch error:', err)
    return false
  }
}
