import OpenAI from 'openai'

const openai = new OpenAI()

export async function parseState(userText: string): Promise<string | null> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-nano',
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'The user is telling you what US state they live in. Extract the 2-letter US state abbreviation from their message. Return JSON only: { "state": "XX" } where XX is the uppercase 2-letter code (e.g. "NY", "CA", "DC"), or { "state": null } if you cannot determine a valid US state or DC from their message.',
      },
      { role: 'user', content: userText },
    ],
  })

  const text = response.choices[0]?.message?.content ?? '{}'
  try {
    const parsed = JSON.parse(text)
    return typeof parsed.state === 'string' && parsed.state.length === 2
      ? parsed.state.toUpperCase()
      : null
  } catch {
    return null
  }
}

export async function classifyAmericaWorksRelated(
  userText: string
): Promise<boolean> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-nano',
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are a classifier for America Works, a workforce development company that helps people find jobs. Determine if the user\'s message is related to America Works services (employment programs, job placement, workforce development, their existing case, staff, appointments, benefits through AW, etc.) or is a general question not specifically about America Works. Return JSON only: { "isAmericaWorksRelated": true } or { "isAmericaWorksRelated": false }',
      },
      { role: 'user', content: userText },
    ],
  })

  const text = response.choices[0]?.message?.content ?? '{}'
  try {
    const parsed = JSON.parse(text)
    return parsed.isAmericaWorksRelated === true
  } catch {
    return false
  }
}

export async function webSearchAnswer(userText: string): Promise<string> {
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    tools: [{ type: 'web_search_preview' }],
    input: [
      {
        role: 'system',
        content:
          'You are a helpful assistant on the America Works website. The user has asked a question that is not directly related to America Works services. Answer with empathy and clarity — the user may be in a difficult situation (unemployed, homeless, in danger, in crisis). Prefer authoritative sources (government sites, major nonprofits). Include links where helpful. If uncertain, say so. Keep your response concise and actionable.',
      },
      { role: 'user', content: userText },
    ],
  })

  return extractResponseText(response)
}

export async function webSearchResources(
  state: string,
  categories: string[]
): Promise<string> {
  const categoryList = categories.join(', ')
  const hasMentalHealth = categories.some((c) =>
    c.toLowerCase().includes('mental health')
  )

  const crisisPrefix = hasMentalHealth
    ? `If the user needs 'Mental health & crisis support', ALWAYS lead your response with these crisis resources before any others:
- 988 Suicide & Crisis Lifeline — call or text 988
- Crisis Text Line — text HOME to 741741
- SAMHSA National Helpline — 1-800-662-4357

`
    : ''

  const response = await openai.responses.create({
    model: 'gpt-4.1',
    tools: [{ type: 'web_search_preview' }],
    input: [
      {
        role: 'system',
        content: `You are a resource finder for people who need help. The user lives in ${state} and is looking for help with: ${categoryList}. Find 3–6 relevant resources for their location. For each resource provide: the organization name, what they help with, how to contact them (phone and/or website). ${crisisPrefix}Keep your response concise and well-formatted.`,
      },
      {
        role: 'user',
        content: `I live in ${state} and need help with: ${categoryList}`,
      },
    ],
  })

  return extractResponseText(response)
}

function extractResponseText(response: OpenAI.Responses.Response): string {
  for (const item of response.output) {
    if (item.type === 'message') {
      for (const content of item.content) {
        if (content.type === 'output_text') {
          return content.text
        }
      }
    }
  }
  return 'I was unable to find relevant information. Please try again or contact us directly at (212) 252-6900.'
}
