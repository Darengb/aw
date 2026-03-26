import { getAccessToken, getServiceAccountUserId } from './auth'
import { htmlToText, escapeHtml } from './utils'
import type { ChatMemory, ChatMessage } from '@/app/api/chat/types'

const TEAM_ID = process.env.TEAMS_TEAM_ID!
const CHANNEL_ID = process.env.TEAMS_CHANNEL_ID!
const BASE = `https://graph.microsoft.com/v1.0/teams/${TEAM_ID}/channels/${CHANNEL_ID}/messages`

export interface TeamsReply {
  id: string
  text: string
  from: string
  createdDateTime: string
}

async function graphFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken()
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Graph API error (${res.status}): ${text}`)
  }
  return res
}

function buildTranscript(messages: ChatMessage[]): string {
  return messages
    .slice(-20)
    .map((m) => `<b>${m.role === 'user' ? 'User' : 'Bot'}:</b> ${escapeHtml(m.text)}`)
    .join('<br/>')
}

/**
 * Create a new thread (root message) in the support channel.
 * Returns the rootMessageId.
 */
export async function createThread(
  conversationId: string,
  messages: ChatMessage[],
  memory: ChatMemory
): Promise<string> {
  const meta = [
    `<b>Conversation ID:</b> ${conversationId}`,
    memory.fullName ? `<b>Name:</b> ${escapeHtml(memory.fullName)}` : null,
    memory.phone ? `<b>Phone:</b> ${escapeHtml(memory.phone)}` : null,
    memory.program ? `<b>Program:</b> ${escapeHtml(memory.program)}` : null,
    memory.state ? `<b>State:</b> ${escapeHtml(memory.state)}` : null,
  ]
    .filter(Boolean)
    .join('<br/>')

  const transcript = buildTranscript(messages)
  const content = `<b>New Live Chat Handoff</b><br/><br/>${meta}<br/><br/><b>Transcript:</b><br/>${transcript}`

  const res = await graphFetch(BASE, {
    method: 'POST',
    body: JSON.stringify({
      body: { contentType: 'html', content },
    }),
  })

  const data = await res.json()
  return data.id as string
}

/**
 * Post a reply to an existing thread.
 */
export async function postReply(
  rootMessageId: string,
  senderLabel: string,
  text: string
): Promise<void> {
  await graphFetch(`${BASE}/${rootMessageId}/replies`, {
    method: 'POST',
    body: JSON.stringify({
      body: {
        contentType: 'html',
        content: `<b>${escapeHtml(senderLabel)}:</b> ${escapeHtml(text)}`,
      },
    }),
  })
}

/**
 * Get replies to a thread, optionally filtering to those after a timestamp.
 * Filters out messages sent by the service account.
 */
export async function getReplies(
  rootMessageId: string,
  since?: string
): Promise<TeamsReply[]> {
  const url = `${BASE}/${rootMessageId}/replies?$top=50`
  const res = await graphFetch(url)
  const data = await res.json()

  // Get the service account's user ID to filter out forwarded messages
  const serviceUserId = await getServiceAccountUserId()

  const replies: TeamsReply[] = []
  for (const msg of data.value ?? []) {
    // Skip messages from the service account (these are forwarded user messages)
    const senderId: string = msg.from?.user?.id ?? ''
    if (serviceUserId && senderId === serviceUserId) {
      continue
    }

    // Skip messages before the since timestamp
    if (since && msg.createdDateTime <= since) {
      continue
    }

    replies.push({
      id: msg.id,
      text: htmlToText(msg.body?.content ?? ''),
      from: (msg.from?.user?.displayName as string) || 'Support Agent',
      createdDateTime: msg.createdDateTime,
    })
  }

  return replies
}
