/**
 * One-time Teams OAuth setup using device code flow.
 *
 * Usage:
 *   npx tsx scripts/teams-auth-setup.ts
 *
 * Prerequisites:
 *   - TEAMS_TENANT_ID and TEAMS_CLIENT_ID set in .env.local
 *   - UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN set in .env.local
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { Redis } from '@upstash/redis'

const TENANT_ID = process.env.TEAMS_TENANT_ID!
const CLIENT_ID = process.env.TEAMS_CLIENT_ID!

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const DEVICE_CODE_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/devicecode`
const TOKEN_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`
const SCOPE = 'ChannelMessage.Send ChannelMessage.Read.All offline_access'

async function main() {
  console.log('Requesting device code...\n')

  // Step 1: Request device code
  const codeRes = await fetch(DEVICE_CODE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CLIENT_ID, scope: SCOPE }).toString(),
  })

  if (!codeRes.ok) {
    const text = await codeRes.text()
    console.error('Failed to get device code:', text)
    process.exit(1)
  }

  const codeData = await codeRes.json()
  const { device_code, user_code, verification_uri, interval, expires_in, message } = codeData

  console.log('='.repeat(60))
  console.log(message)
  console.log('='.repeat(60))
  console.log()

  // Step 2: Poll for token
  const pollInterval = (interval ?? 5) * 1000
  const expiresAt = Date.now() + (expires_in ?? 900) * 1000

  const clientSecret = process.env.TEAMS_CLIENT_SECRET
  console.log(`Client secret loaded: ${clientSecret ? 'yes (' + clientSecret.length + ' chars)' : 'NO — MISSING'}`)

  while (Date.now() < expiresAt) {
    await new Promise((r) => setTimeout(r, pollInterval))

    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        client_id: CLIENT_ID,
        device_code,
      }).toString(),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error === 'authorization_pending') {
      process.stdout.write('.')
      continue
    }

    if (tokenData.error === 'slow_down') {
      await new Promise((r) => setTimeout(r, 5000))
      continue
    }

    if (tokenData.error) {
      console.error('\nAuth failed:', tokenData.error, tokenData.error_description)
      process.exit(1)
    }

    // Success — store tokens in Redis
    console.log('\n\nAuth successful! Storing tokens in Redis...')

    const ttl = Math.max((tokenData.expires_in ?? 3600) - 300, 60)
    await redis.set('teams:access_token', tokenData.access_token, { ex: ttl })

    if (tokenData.refresh_token) {
      await redis.set('teams:refresh_token', tokenData.refresh_token)
      console.log('  - Refresh token stored')
    }

    console.log(`  - Access token stored (expires in ${ttl}s)`)

    // Extract user ID from JWT
    try {
      const payload = tokenData.access_token.split('.')[1]
      const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())
      if (decoded.oid) {
        await redis.set('teams:user_id', decoded.oid)
        console.log(`  - User ID stored: ${decoded.oid}`)
      }
    } catch {
      console.log('  - Could not extract user ID from token (non-fatal)')
    }

    console.log('\nDone! Teams live support is now ready.')
    process.exit(0)
  }

  console.error('\nDevice code expired. Please try again.')
  process.exit(1)
}

main().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
