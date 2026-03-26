# Microsoft Teams Live Support Integration

## Context

The website chatbot has 12 `[Placeholder]` handoff messages (6 during-hours + 6 after-hours) that currently just show text telling the user someone will be in touch. The goal is to replace these with real two-way live support: create a Teams thread per escalation, forward user messages to Teams, and push agent replies back to the website chatbox. The spec lives at `/aw/credentials/chatbot.md`.

## Architecture

- **Teams channel threads** via Microsoft Graph API (one thread per escalation)
- **Delegated OAuth** with a service account — one-time interactive sign-in (authorization code flow), then refresh token for ongoing access
- **Upstash Redis** — stores refresh token, access token cache, and service account user ID. Required because delegated permissions need a signed-in user context and refresh tokens must persist across serverless cold starts.
- **Client-side state** — conversation mapping (`conversationId`, `rootMessageId`) lives in `ChatMemory` on the client, sent with each request
- **Client-side polling** (3s interval) for agent replies — polls Graph API directly via our API route

> **Future: Webhooks.** If we need to reduce Graph API calls, add webhook-driven reply delivery by subscribing to channel message notifications and buffering replies in Redis. This also enables an admin dashboard for monitoring active sessions.

## Implementation Order

### Phase 1: Infrastructure

- [x] **1.1 Environment variables** (`web/.env.local` + Vercel dashboard)
```
TEAMS_TENANT_ID=9b2fe9f2-3bf0-46bb-ab42-2256d42b7ec0
TEAMS_CLIENT_ID=18a17fe4-129b-4682-9868-40de8b6f8d3d
TEAMS_CLIENT_SECRET=LQL8Q~AscD-iwtCPBUxTNJN6Tc43rtRtJnGs9cCX
TEAMS_TEAM_ID=54d47795-95e8-445f-88f6-1cb99d94dc48
TEAMS_CHANNEL_ID=19:996302bd8583470c987421d50b56eb60@thread.tacv2
TEAMS_USERNAME=websitechatbot@americaworks.com
TEAMS_PASSWORD=Yub@u886!021
```

No external dependencies to install. No KV store to provision.

---

### Phase 2: Teams Graph Client (new files)

- [x] **2.1 `web/lib/teams/auth.ts`** — OAuth token management
  - `getAccessToken(): Promise<string>`
  - ROPC flow: POST to `login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` with `grant_type=password`, username, password, client_id, client_secret, scope=`https://graph.microsoft.com/.default`
  - Module-level in-memory cache: `{ accessToken, expiresAt }`. If token is valid (with 5-min buffer), return cached. Otherwise re-authenticate.
  - On serverless cold start, token is re-fetched on first request — acceptable for low volume.

- [x] **2.2 `web/lib/teams/graph.ts`** — Graph API calls
  - `createThread(conversationId, summary, memory): Promise<string>` — POST `/teams/{teamId}/channels/{channelId}/messages`, returns rootMessageId. Body: HTML with conversation ID, user name/phone, program, state, transcript.
  - `postReply(rootMessageId, senderLabel, text): Promise<void>` — POST `.../messages/{rootMessageId}/replies`
  - `getReplies(rootMessageId, since?): Promise<TeamsReply[]>` — GET `.../messages/{rootMessageId}/replies`, filter by timestamp. Returns `{ id, text, from, createdDateTime }`.

- [x] **2.3 `web/lib/teams/utils.ts`** — HTML-to-text for Teams messages
  - Strip HTML tags, decode entities (`&amp;`, `&lt;`, `&gt;`, `&nbsp;`)

---

### Phase 3: State Machine Changes (modify existing files)

- [x] **3.1 `web/app/api/chat/types.ts`**
  - Add `'LIVE_SUPPORT'` to `ChatState` union
  - Add to `ChatMemory`: `conversationId?: string`, `rootMessageId?: string`
  - Add to `ChatResponse`: `isLiveSupport?: boolean`

- [x] **3.2 `web/app/api/chat/handleMessage.ts`**
  - Replace all 12 `[Placeholder]` lines (6 pairs):
    - During hours: `reply('LIVE_SUPPORT', memory, "I'm connecting you with a team member now. You'll see their responses here shortly.", 'text')`
    - After hours: `reply('LIVE_SUPPORT', memory, "Thank you for reaching out. Our office hours are 9:00 AM – 5:00 PM ET, Monday through Friday. Your message has been sent to our team and someone will respond during the next business day.", 'text')`
  - Add `LIVE_SUPPORT` case in switch:
    - `start_over` → reset to `ASK_SERVED_BEFORE`
    - User text → `reply('LIVE_SUPPORT', memory, '', 'text')` (empty reply = forwarded, no bot message)

- [x] **3.3 `web/app/api/chat/route.ts`**
  - **On transition to LIVE_SUPPORT** (response.state === 'LIVE_SUPPORT' && request.state !== 'LIVE_SUPPORT'):
    - Generate `conversationId` via `crypto.randomUUID()`
    - Call `createThread()` with conversation transcript
    - Inject `conversationId` + `rootMessageId` into response memory
    - Set `isLiveSupport: true` on response
  - **When already in LIVE_SUPPORT** (request.state === 'LIVE_SUPPORT' && userText !== 'start_over'):
    - Forward user message to Teams via `postReply()`
    - Return `LIVE_SUPPORT` state with empty reply
  - Error fallback: if Teams thread creation fails, return the old text-only message with phone number `(212) 252-6900`

---

### Phase 4: Polling Endpoint (new file)

- [x] **4.1 `web/app/api/chat/poll/route.ts`**
```
GET /api/chat/poll?rootMessageId={id}&since={iso-timestamp}
Response: { replies: [{ text, from, timestamp }] }
```
  - Call `getReplies(rootMessageId, since)` on Graph API directly
  - Filter out messages from service account (don't echo forwarded user messages)
  - Return new agent replies

---

### Phase 5: Frontend Changes (modify existing)

- [x] **5.1 `web/components/chat/ChatWidget.tsx`**
  - Add polling `useEffect` when `chatState === 'LIVE_SUPPORT'`:
    - 3-second interval, fetch `/api/chat/poll?rootMessageId=...&since=...`
    - Append agent replies as bot messages
  - Update `handleSend` for LIVE_SUPPORT:
    - Show user message immediately
    - Don't show typing indicator (no bot reply expected)
    - Don't render empty bot replies
  - Add "Connected to live support" banner below chat header when in LIVE_SUPPORT
  - Persist `conversationId` and `rootMessageId` in sessionStorage (via existing PersistedChat)

---

## Files Summary

### New files (4)
| File | Purpose |
|------|---------|
| `web/lib/teams/auth.ts` | ROPC OAuth token acquisition + in-memory caching |
| `web/lib/teams/graph.ts` | Graph API: create thread, post reply, read replies |
| `web/lib/teams/utils.ts` | HTML-to-text conversion |
| `web/app/api/chat/poll/route.ts` | Frontend polling endpoint for agent replies |

### Modified files (4)
| File | Changes |
|------|---------|
| `web/app/api/chat/types.ts` | Add LIVE_SUPPORT state, memory fields |
| `web/app/api/chat/handleMessage.ts` | Replace 12 placeholder lines, add LIVE_SUPPORT handler |
| `web/app/api/chat/route.ts` | Escalation orchestration + Teams message forwarding |
| `web/components/chat/ChatWidget.tsx` | Polling loop, live support UI, session persistence |

---

## Phase 6: Fix Auth — Switch from ROPC to Authorization Code Flow

ROPC auth fails because the Azure AD tenant requires MFA for the service account. The original spec (`/aw/credentials/chatbot.md`) correctly called for a one-time interactive sign-in with refresh token storage. This phase brings the implementation in line with that spec.

### What needs to change

**Problem:** ROPC (`grant_type=password`) is blocked by MFA. We need `grant_type=authorization_code` for the initial login, then `grant_type=refresh_token` for ongoing access.

**Solution:** One-time interactive OAuth login → store refresh token in Upstash Redis → use refresh token to get access tokens silently.

### 6.1 Add Upstash Redis

- [ ] Install `@upstash/redis` in `web/package.json`
- [ ] Create an Upstash Redis database at [upstash.com](https://upstash.com) (free tier: 10K commands/day)
- [ ] Add env vars to `web/.env.local` and Vercel dashboard:
  ```
  UPSTASH_REDIS_REST_URL=<from upstash dashboard>
  UPSTASH_REDIS_REST_TOKEN=<from upstash dashboard>
  ```
- [ ] Create `web/lib/teams/redis.ts` — thin wrapper around Upstash client:
  ```typescript
  import { Redis } from '@upstash/redis'
  export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
  ```

### 6.2 One-time OAuth setup endpoint

- [ ] Create `web/app/api/chat/teams-auth/route.ts` — two handlers:

  **GET `/api/chat/teams-auth`** — Redirects to Microsoft's authorization page:
  ```
  https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize?
    client_id={clientId}
    &response_type=code
    &redirect_uri={our callback URL}
    &scope=ChannelMessage.Send ChannelMessage.Read.All offline_access
    &state={random CSRF token}
  ```
  The `offline_access` scope is required to receive a refresh token.

  **GET `/api/chat/teams-auth/callback/route.ts`** — Handles the OAuth callback:
  1. Receive `code` query parameter from Microsoft
  2. Exchange code for tokens: POST to token endpoint with `grant_type=authorization_code`
  3. Store `refresh_token` in Redis key `teams:refresh_token`
  4. Store `access_token` in Redis key `teams:access_token` with TTL matching `expires_in`
  5. Extract `oid` (user ID) from the access token JWT, store in Redis key `teams:user_id`
  6. Return a success page: "Teams auth complete. You can close this tab."

  This endpoint is only used once during setup (and again if the refresh token expires after ~90 days).

### 6.3 Rewrite `web/lib/teams/auth.ts`

- [ ] Replace ROPC flow with refresh token flow:

  **`getAccessToken(): Promise<string>`**
  1. Check Redis for `teams:access_token`. If present and not expired, return it.
  2. If expired/missing, read `teams:refresh_token` from Redis.
  3. POST to token endpoint with `grant_type=refresh_token`, the refresh token, client_id, client_secret, scope.
  4. Microsoft returns a new access token AND a new refresh token (token rotation).
  5. Store the new `access_token` in Redis with TTL.
  6. Store the new `refresh_token` in Redis (overwriting the old one).
  7. Return the access token.
  8. If no refresh token exists in Redis, throw an error with a message: "Teams auth not configured. Visit /api/chat/teams-auth to set up."

  **`getServiceAccountUserId(): Promise<string>`**
  - Read `teams:user_id` from Redis (stored during the OAuth callback).

  Remove: `TEAMS_USERNAME` and `TEAMS_PASSWORD` env vars (no longer needed).

### 6.4 Setup procedure

1. Ensure env vars are set: `TEAMS_TENANT_ID`, `TEAMS_CLIENT_ID`, `TEAMS_CLIENT_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
2. In Azure Portal, add a redirect URI to the app registration: `http://localhost:3002/api/chat/teams-auth/callback` (local) and `https://americaworks.com/api/chat/teams-auth/callback` (production)
3. Visit `http://localhost:3002/api/chat/teams-auth` in a browser
4. Sign in as `websitechatbot@americaworks.com`, complete MFA
5. Callback stores tokens in Redis
6. Live support is now operational — refresh token auto-renews on each use

### Files changed

| File | Action |
|------|--------|
| `web/package.json` | Add `@upstash/redis` |
| `web/lib/teams/redis.ts` | New — Upstash Redis client |
| `web/lib/teams/auth.ts` | Rewrite — refresh token flow instead of ROPC |
| `web/app/api/chat/teams-auth/route.ts` | New — OAuth redirect to Microsoft login |
| `web/app/api/chat/teams-auth/callback/route.ts` | New — OAuth callback, stores tokens in Redis |

### Env var changes

| Variable | Status |
|----------|--------|
| `TEAMS_USERNAME` | Remove (no longer needed) |
| `TEAMS_PASSWORD` | Remove (no longer needed) |
| `UPSTASH_REDIS_REST_URL` | Add |
| `UPSTASH_REDIS_REST_TOKEN` | Add |

---

## Verification

1. **Test auth**: Call `getAccessToken()`, verify token returned
2. **Test thread creation**: Trigger a handoff, verify a thread appears in the Teams channel with conversation summary
3. **Test message forwarding**: In LIVE_SUPPORT state, send a message — verify it appears as a reply in the Teams thread
4. **Test polling**: Reply in Teams — verify the reply appears in the website chatbox within ~3 seconds
5. **Test business hours**: Verify different messages shown during/outside hours, but both create Teams threads
6. **Test session persistence**: Refresh the page during live support — verify polling resumes
7. **Test error fallback**: Break Teams credentials — verify graceful fallback to phone number message
