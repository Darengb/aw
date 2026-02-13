import { NextResponse } from 'next/server'
import type { ChatRequest } from './types'
import { handleMessage } from './handleMessage'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest
    const { state, memory, userText } = body

    if (!state || typeof userText !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: state and userText required' },
        { status: 400 }
      )
    }

    const response = await handleMessage(state, memory ?? {}, userText)
    return NextResponse.json(response)
  } catch (error) {
    // OpenAI or other API errors — return friendly message instead of 500
    const isOpenAIError =
      error instanceof Error &&
      (error.message.includes('OpenAI') ||
        error.message.includes('API') ||
        error.message.includes('fetch'))

    if (isOpenAIError) {
      return NextResponse.json({
        state: 'DONE',
        memory: {},
        reply: "I'm having trouble right now. Please try again, or contact us directly at (212) 252-6900.",
        inputType: 'buttons',
        buttons: [{ label: 'Start over', value: 'start_over' }],
      })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
