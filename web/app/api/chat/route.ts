import { NextResponse } from 'next/server'
import type { ChatRequest } from './types'
import { handleMessage } from './handleMessage'
import { createThread, postReply } from '@/lib/teams/graph'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest
    const { state, memory, userText, messages } = body

    if (!state || typeof userText !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: state and userText required' },
        { status: 400 }
      )
    }

    // If already in LIVE_SUPPORT and user is typing (not starting over),
    // forward the message to Teams and return immediately
    if (state === 'LIVE_SUPPORT' && userText.trim().toLowerCase() !== 'start_over' && userText.trim()) {
      try {
        if (memory?.rootMessageId) {
          await postReply(memory.rootMessageId, 'User', userText)
        }
      } catch (err) {
        console.error('[Teams postReply error]', err)
      }
      return NextResponse.json({
        state: 'LIVE_SUPPORT',
        memory,
        reply: '',
        inputType: 'text',
        isLiveSupport: true,
      })
    }

    const response = await handleMessage(state, memory ?? {}, userText, messages ?? [])

    // If we just transitioned into LIVE_SUPPORT, create the Teams thread
    if (response.state === 'LIVE_SUPPORT' && state !== 'LIVE_SUPPORT') {
      try {
        const conversationId = crypto.randomUUID()
        // Include the triggering message in the transcript (skip internal triggers)
        const fullMessages = userText === '__connect_to_support'
          ? (messages ?? [])
          : [...(messages ?? []), { role: 'user' as const, text: userText }]
        const rootMessageId = await createThread(conversationId, fullMessages, response.memory)
        response.memory.conversationId = conversationId
        response.memory.rootMessageId = rootMessageId
        response.isLiveSupport = true
      } catch (err) {
        console.error('[Teams createThread error]', err)
        // Fallback: show contact info instead of crashing
        response.reply = "I wasn't able to connect you to live support right now. Please call us directly at (212) 252-6900 or email CPINFO@AMERICAWORKS.COM."
        response.state = 'DONE'
        response.inputType = 'none'
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[chat API error]', error)

    return NextResponse.json({
      state: 'DONE',
      memory: {},
      reply: "I'm having trouble right now. Please try again, or contact us directly at (212) 252-6900.",
      inputType: 'buttons',
      buttons: [{ label: 'Start over', value: 'start_over' }],
    })
  }
}
