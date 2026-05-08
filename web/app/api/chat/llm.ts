import OpenAI from 'openai'
import type { ChatMessage } from './types'
import { getOffices } from '@/utils/content'

let _openai: OpenAI | null = null
function getClient() {
  if (!_openai) _openai = new OpenAI()
  return _openai
}

let _officesBlock: string | null = null
function getOfficesBlock(): string {
  if (_officesBlock) return _officesBlock
  const lines = getOffices().map((o) => {
    const hours = (o.hours || '').replace(/\n/g, '; ')
    const fax = o.fax ? ` | Fax: ${o.fax}` : ''
    const notes = o.notes ? ` | Notes: ${o.notes}` : ''
    return `- ${o.title} — ${o.address}, ${o.city}, ${o.stateCode} ${o.zip} | Phone: ${o.phone}${fax} | Hours: ${hours} | Email: ${o.email}${notes}`
  })
  _officesBlock = lines.join('\n')
  return _officesBlock
}

// Convert recent chat history to OpenAI message format (last 10 messages max)
function buildHistory(messages: ChatMessage[]): { role: 'user' | 'assistant'; content: string }[] {
  return messages.slice(-10).map((m) => ({
    role: m.role === 'user' ? 'user' as const : 'assistant' as const,
    content: m.text,
  }))
}

export async function parseState(userText: string): Promise<string | null> {
  const response = await getClient().chat.completions.create({
    model: 'gpt-5-nano',
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

export async function classifyCaseSpecific(
  userText: string
): Promise<boolean> {
  const response = await getClient().chat.completions.create({
    model: 'gpt-5-nano',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are a classifier for America Works, a job placement agency that works with people on public assistance and welfare programs to help them find employment. Determine if the user\'s message is specifically about their personal case or account with America Works — meaning they are referencing a specific caseworker, appointment, enrollment status, program they are already in, paperwork they submitted, or a named staff member. Return { "isCaseSpecific": true } ONLY for these cases. Everything else — including general requests for help with housing, food, jobs, benefits, resources, or any question that could be answered with information or a web search — should return { "isCaseSpecific": false }. Return JSON only.',
      },
      { role: 'user', content: userText },
    ],
  })

  const text = response.choices[0]?.message?.content ?? '{}'
  try {
    const parsed = JSON.parse(text)
    return parsed.isCaseSpecific === true
  } catch {
    return false
  }
}

export interface WebSearchResult {
  text: string
  offerConnect: boolean
  hardHandoff: boolean
}

export async function webSearchAnswer(userText: string, messages: ChatMessage[] = [], context?: { program?: string }): Promise<WebSearchResult> {
  const history = buildHistory(messages)
  const programContext = context?.program
    ? `\n\nUSER CONTEXT: This user is currently enrolled in the "${context.program}" program at America Works. Use this information to give them accurate, program-specific answers.`
    : ''
  const officesContext = `\n\nOFFICES (authoritative list — use this for any office, contact, address, hours, or location question):\n${getOfficesBlock()}`
  const response = await getClient().responses.create({
    model: 'gpt-5.2',
    tools: [{ type: 'web_search_preview' }],
    input: [
      {
        role: 'system',
        content:
          `You are a helpful assistant on the America Works website. America Works is a job placement agency that works with people on public assistance and welfare programs to help them find employment. Their main website is americaworks.com. The user is chatting on this website and may ask questions about America Works or general questions about jobs, benefits, housing, etc. Answer with empathy and clarity — the user may be in a difficult situation (unemployed, homeless, in danger, in crisis). Prefer authoritative sources (government sites, major nonprofits). Include links where helpful.

SEARCH BEHAVIOR: When the user asks a factual question (address, phone number, location, directions, hours, how to apply, etc.), use web search to find the answer rather than guessing. If the user's location is needed but unknown, ask ONE short question to narrow it down (e.g. "What city or state are you in?") — never ask more than one clarifying question at a time. Do NOT infer the user's location from their phone number or area code. If the user asks a question specifically related to America Works: If the question is about an office, location, contact info, hours, address, or similar, use the OFFICES list below as the authoritative source — do not search the web if the answer is in the data provided below. For any other questions about America Works, search the americaworks.com website first, then search google or the wider web if additional information is needed. For all other questions that require specific knowledge, conduct a general or targeted web search.

STYLE: The user is often from a less educated population. Write at a 6th-grade reading level. Use short sentences, simple words, and avoid jargon. Be direct and actionable — tell the person exactly what to do next, or ask necessary questions. Never lead with generic advice such as "call 911". Always ask questions to narrow down location or specific issue so that a list of targeted resources can be provided. Keep answers concise, short and clear. Users are reading on a small phone screen.

HANDOFF SIGNALS (use at most one, on its own line at the end of your response):
- [OFFER_CONNECT] — The user might benefit from speaking with America Works staff (e.g. their situation is complex, they are in crisis, or their question touches on AW services). This shows them a button to connect. Only include when genuinely appropriate — not for simple factual questions.
- [HARD_HANDOFF] — The user is asking about their specific case, account, caseworker, appointment, or enrollment with America Works — something only an AW staff member can answer — OR the user is explicitly asking to speak with a person / talk to someone / get live support. This ends your conversation and immediately routes them to staff.` + programContext + officesContext,
      },
      ...history,
      { role: 'user', content: userText },
    ],
  })

  const raw = extractResponseText(response)
  const hardHandoff = raw.includes('[HARD_HANDOFF]')
  const offerConnect = !hardHandoff && raw.includes('[OFFER_CONNECT]')
  const text = raw.replace(/\n?\[HARD_HANDOFF\]\n?/g, '').replace(/\n?\[OFFER_CONNECT\]\n?/g, '').trim()
  return { text, offerConnect, hardHandoff }
}

export async function webSearchResources(
  state: string,
  categories: string[],
  messages: ChatMessage[] = []
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

  const history = buildHistory(messages)
  const response = await getClient().responses.create({
    model: 'gpt-5.2',
    tools: [{ type: 'web_search_preview' }],
    input: [
      {
        role: 'system',
        content: `You are a resource finder for people who need help. The user lives in ${state} and is looking for help with: ${categoryList}. Find 3–6 relevant resources for their location. For each resource provide: the organization name, what they help with, how to contact them (phone and/or website). ${crisisPrefix}\n\nSTYLE: The user is often from a less educated population. Write at a 6th-grade reading level. Use short sentences, simple words, and avoid jargon. Be direct and actionable — tell the person exactly what to do next, or ask necessary questions. Never lead with generic advice such as "call 911". Always ask questions to narrow down location or specific issue so that a list of targeted resources can be provided. Keep answers concise, short and clear. Users are reading on a small phone screen.`,
      },
      ...history,
      {
        role: 'user',
        content: `I live in ${state} and need help with: ${categoryList}`,
      },
    ],
  })

  return extractResponseText(response)
}

export async function smartIntakeChat(userText: string, messages: ChatMessage[] = []): Promise<WebSearchResult> {
  const history = buildHistory(messages)
  const response = await getClient().responses.create({
    model: 'gpt-5.2',
    tools: [{ type: 'web_search_preview' }],
    input: [
      {
        role: 'system',
        content:
          `You are a helpful intake assistant on the America Works website. America Works is a job placement agency that works with people on public assistance and welfare programs to help them find employment.

ENROLLMENT CRITERIA:
- America Works provides full services in these states: CA, DC, GA, LA, MD, NJ, NY, PA, TN, VT, WI
- People in those states can enroll directly at the signup form
- People outside those states who receive SSI or SSDI (federal disability benefits) may also qualify
- People outside those states who do NOT receive SSI/SSDI are not eligible for AW services, but you can help them find local resources

YOUR JOB:
- Have a natural conversation to understand the user's situation and needs
- Help answer any questions they have (use web search for resource questions)
- Through the conversation, try to learn what state they live in and whether they might qualify
- When you have enough info to determine eligibility:
  - If they qualify: let them know and mention they can sign up for services
  - If they don't qualify: help them find relevant local resources instead
- Be warm, empathetic, and helpful throughout — these users may be in difficult situations
- Always bias towards providing information that helps the person immediately — if you can answer their question, give them useful resources, or point them to a phone number or address right now, do so

SEARCH BEHAVIOR: When the user asks a factual question (address, phone number, location, directions, hours, how to apply, etc.), use web search to find the answer rather than guessing. If the user's location is needed but unknown, ask ONE short question to narrow it down — never ask more than one clarifying question at a time. Do NOT infer the user's location from their phone number or area code.

STYLE: The user is often from a less educated population. Write at a 6th-grade reading level. Use short sentences, simple words, and avoid jargon. Be direct and actionable — tell the person exactly what to do next, or ask necessary questions.

HANDOFF SIGNALS (use at most one, on its own line at the end of your response):
- [OFFER_CONNECT] — The user might benefit from speaking with America Works staff (e.g. their situation is complex, they are in crisis, or their question touches on AW services). This shows them a button to connect.
- [HARD_HANDOFF] — The user is asking about their specific case, account, caseworker, appointment, or enrollment with America Works — something only an AW staff member can answer — OR the user is explicitly asking to speak with a person / talk to someone / get live support. This immediately routes them to staff.`,
      },
      ...history,
      { role: 'user', content: userText },
    ],
  })

  const raw = extractResponseText(response)
  const hardHandoff = raw.includes('[HARD_HANDOFF]')
  const offerConnect = !hardHandoff && raw.includes('[OFFER_CONNECT]')
  const text = raw.replace(/\n?\[HARD_HANDOFF\]\n?/g, '').replace(/\n?\[OFFER_CONNECT\]\n?/g, '').trim()
  return { text, offerConnect, hardHandoff }
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
