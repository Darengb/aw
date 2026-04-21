import type { ChatState, ChatMemory, ChatMessage, ChatResponse, ButtonOption, FormField } from './types'
import { SIGNUP_FORM_URL } from './types'
import { isBusinessHoursET, isFullServiceState, isValidPhone, isValidEmail, nextBusinessDayPhrase } from './utils'
import { parseState, classifyCaseSpecific, webSearchAnswer, smartIntakeChat, webSearchResources } from './llm'

const YES_NO_NOTSURE: ButtonOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not sure', value: 'not_sure' },
]

const YES_NO: ButtonOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const NAME_PHONE_FIELDS: FormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
]

const RESOURCE_OPTIONS: ButtonOption[] = [
  { label: 'Job search & career help', value: 'Job search & career help' },
  { label: 'Housing & shelter', value: 'Housing & shelter' },
  { label: 'Food & nutrition assistance', value: 'Food & nutrition assistance' },
  { label: 'Benefits & disability (SSA/SSI)', value: 'Benefits & disability (SSA/SSI)' },
  { label: 'Mental health & crisis support', value: 'Mental health & crisis support' },
  { label: 'Other', value: 'Other' },
]

const OUT_OF_AREA_BUTTONS: ButtonOption[] = [
  { label: 'Find resources near me', value: 'find_resources' },
  { label: 'Try a different state', value: 'try_different' },
]

const AFTER_HOURS_CONTACT_BUTTONS: ButtonOption[] = [
  { label: '📱 Text me', value: 'phone' },
  { label: '✉️ Email me', value: 'email' },
]

// Routes a support handoff: live-connect during business hours, else start
// the after-hours contact collection flow so the team can follow up.
function handoffReply(memory: ChatMemory): ChatResponse {
  if (isBusinessHoursET()) {
    return reply('LIVE_SUPPORT', memory, "I'm connecting you with a team member now. You'll see their responses here shortly.", 'text')
  }
  const when = nextBusinessDayPhrase()
  return reply(
    'AFTER_HOURS_CONTACT_METHOD',
    memory,
    `Our team is off right now. They'll be back ${when}.\n\nIf you leave your info, someone will get back to you. How should we reach you?`,
    'buttons',
    { buttons: AFTER_HOURS_CONTACT_BUTTONS }
  )
}

function reply(
  state: ChatState,
  memory: ChatMemory,
  text: string,
  inputType: ChatResponse['inputType'],
  options?: { buttons?: ButtonOption[]; formFields?: FormField[]; offerConnect?: boolean }
): ChatResponse {
  return {
    state,
    memory,
    reply: text,
    inputType,
    buttons: options?.buttons,
    formFields: options?.formFields,
    offerConnect: options?.offerConnect,
  }
}

export async function handleMessage(
  state: ChatState,
  memory: ChatMemory,
  userText: string,
  messages: ChatMessage[] = []
): Promise<ChatResponse> {
  const val = userText.trim().toLowerCase()

  switch (state) {
    // ── ASK_SERVED_BEFORE ───────────────────────────────────────────
    case 'ASK_SERVED_BEFORE': {
      if (val === 'yes') {
        return reply('ASK_CURRENTLY_SERVED', memory, 'Are you currently being served by America Works?', 'buttons', { buttons: YES_NO })
      }
      // No or Not sure → enrollment path
      if (val === 'no' || val === 'not_sure') {
        return reply('ASK_ENROLL', memory, 'Are you looking to enroll in our services?', 'buttons', { buttons: YES_NO_NOTSURE })
      }
      return reply('ASK_SERVED_BEFORE', memory, 'Hi! I am here to help you. Before we start, I have a quick question: **Have you ever received services from America Works?**', 'buttons', { buttons: YES_NO_NOTSURE })
    }

    // ── ASK_CURRENTLY_SERVED ────────────────────────────────────────
    case 'ASK_CURRENTLY_SERVED': {
      if (val === 'yes') {
        return reply('COLLECT_NAME_PHONE', memory, 'Please provide your full name and phone number.', 'form', { formFields: NAME_PHONE_FIELDS })
      }
      if (val === 'no') {
        return reply('ASK_HELP', memory, 'What can I help you with today?', 'text')
      }
      return reply('ASK_CURRENTLY_SERVED', memory, 'Are you currently being served by America Works?', 'buttons', { buttons: YES_NO })
    }

    // ── COLLECT_NAME_PHONE ──────────────────────────────────────────
    case 'COLLECT_NAME_PHONE': {
      // Expect "fullName|phone" from the form
      const parts = userText.split('|')
      const fullName = parts[0]?.trim()
      const phone = parts[1]?.trim()

      if (fullName && phone && isValidPhone(phone)) {
        memory.fullName = fullName
        memory.phone = phone
        return reply('ASK_PROGRAM', memory, `Thanks, ${fullName}. What America Works program are you currently enrolled in?`, 'text')
      }
      return reply('COLLECT_NAME_PHONE', memory, 'Please share your full name and a phone number we can reach you at.', 'form', { formFields: NAME_PHONE_FIELDS })
    }

    // ── ASK_PROGRAM ───────────────────────────────────────────────
    case 'ASK_PROGRAM': {
      if (!userText.trim()) {
        return reply('ASK_PROGRAM', memory, 'What America Works program are you currently enrolled in?', 'text')
      }
      memory.program = userText.trim()
      return reply('ASK_HELP', memory, 'Got it. What can I help you with today?', 'text')
    }

    // ── ASK_ENROLL ──────────────────────────────────────────────────
    case 'ASK_ENROLL': {
      if (val === 'yes') {
        return reply('ASK_STATE', memory, 'What state do you live in?', 'text')
      }
      if (val === 'no') {
        return reply('ASK_HELP', memory, 'What can I help you with today?', 'text')
      }
      if (val === 'not_sure') {
        return reply('SMART_INTAKE', memory, 'No problem! Tell me a bit about your situation and what kind of help you\'re looking for, and I\'ll point you in the right direction.', 'text')
      }
      return reply('ASK_ENROLL', memory, 'Are you looking to enroll in our services?', 'buttons', { buttons: YES_NO_NOTSURE })
    }

    // ── ASK_STATE ───────────────────────────────────────────────────
    case 'ASK_STATE': {
      const stateCode = await parseState(userText)

      if (!stateCode) {
        return reply('ASK_STATE', memory, 'I didn\'t recognize that state. Please enter your US state (e.g. "New York" or "NY").', 'text')
      }

      memory.state = stateCode

      if (isFullServiceState(stateCode)) {
        return reply(
          'DONE',
          memory,
          `Great — you can enroll here: [Sign Up for Services](${SIGNUP_FORM_URL})`,
          'none'
        )
      }

      return reply('ASK_SSI_SSDI', memory, 'Do you currently receive SSI and/or SSDI?', 'buttons', { buttons: YES_NO_NOTSURE })
    }

    // ── ASK_SSI_SSDI ────────────────────────────────────────────────
    case 'ASK_SSI_SSDI': {
      if (val === 'yes') {
        return reply(
          'DONE',
          memory,
          `You may still qualify — please enroll here: [Sign Up for Services](${SIGNUP_FORM_URL})`,
          'none'
        )
      }
      if (val === 'no') {
        return reply(
          'OUT_OF_AREA',
          memory,
          'Unfortunately, we do not currently offer services in your area. We can help you find resources nearby.',
          'buttons',
          { buttons: OUT_OF_AREA_BUTTONS }
        )
      }
      if (val === 'not_sure') {
        return reply(
          'ASK_SSI_SSDI',
          memory,
          'SSI/SSDI are federal disability benefits paid to people with qualifying disabilities. If you\'re not sure whether you receive them, you can check with your local Social Security office or visit ssa.gov.\n\nDo you currently receive SSI and/or SSDI?',
          'buttons',
          { buttons: YES_NO }
        )
      }
      return reply('ASK_SSI_SSDI', memory, 'Do you currently receive SSI and/or SSDI?', 'buttons', { buttons: YES_NO_NOTSURE })
    }

    // ── OUT_OF_AREA ─────────────────────────────────────────────────
    case 'OUT_OF_AREA': {
      if (val === 'find_resources') {
        return reply('ASK_RESOURCE_NEEDS', memory, 'What kind of help are you looking for?', 'multi-select', { buttons: RESOURCE_OPTIONS })
      }
      if (val === 'try_different') {
        memory.state = undefined
        return reply('ASK_STATE', memory, 'What state do you live in?', 'text')
      }
      return reply('OUT_OF_AREA', memory, 'Unfortunately, we do not currently offer services in your area. We can help you find resources nearby.', 'buttons', { buttons: OUT_OF_AREA_BUTTONS })
    }

    // ── ASK_RESOURCE_NEEDS ──────────────────────────────────────────
    case 'ASK_RESOURCE_NEEDS': {
      // userText is comma-joined selected categories (e.g. "Housing & shelter,Food & nutrition assistance")
      const categories = userText
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)

      if (categories.length === 0) {
        return reply('ASK_RESOURCE_NEEDS', memory, 'Please select at least one option.', 'multi-select', { buttons: RESOURCE_OPTIONS })
      }

      memory.resourceNeeds = categories
      memory.webSearchActive = true
      const resources = await webSearchResources(memory.state ?? 'unknown', categories, messages)
      return reply('ASK_HELP', memory, resources, 'text')
    }

    // ── ASK_HELP ────────────────────────────────────────────────────
    case 'ASK_HELP': {
      if (!userText.trim()) {
        return reply('ASK_HELP', memory, 'What can I help you with today?', 'text')
      }

      // Handle connect-to-support trigger from inline button
      if (val === '__connect_to_support') {
        return handoffReply(memory)
      }

      memory.helpText = userText

      // Once GPT-5.2 is engaged, skip the Nano classifier — GPT-5.2 handles
      // reclassification via [HARD_HANDOFF] (immediate) or [OFFER_CONNECT] (soft)
      if (memory.webSearchActive) {
        const { text: answer, offerConnect, hardHandoff } = await webSearchAnswer(userText, messages, { program: memory.program })
        if (hardHandoff) {
          return handoffReply(memory)
        }
        return reply('ASK_HELP', memory, answer, 'text', { offerConnect })
      }

      // First message in ASK_HELP — use Nano classifier
      const isAW = await classifyCaseSpecific(userText)

      if (isAW) {
        return handoffReply(memory)
      }

      // Not case-specific → web search; activate web search mode for subsequent messages
      memory.webSearchActive = true
      const { text: answer, offerConnect, hardHandoff } = await webSearchAnswer(userText, messages, { program: memory.program })
      if (hardHandoff) {
        return handoffReply(memory)
      }
      return reply('ASK_HELP', memory, answer, 'text', { offerConnect })
    }

    // ── SMART_INTAKE ──────────────────────────────────────────────
    case 'SMART_INTAKE': {
      if (!userText.trim()) {
        return reply('SMART_INTAKE', memory, 'What can I help you with?', 'text')
      }

      // Handle connect-to-support trigger from inline button
      if (val === '__connect_to_support') {
        return handoffReply(memory)
      }

      const { text: intakeAnswer, offerConnect: intakeOffer, hardHandoff: intakeHardHandoff } = await smartIntakeChat(userText, messages)
      if (intakeHardHandoff) {
        return handoffReply(memory)
      }
      return reply('SMART_INTAKE', memory, intakeAnswer, 'text', { offerConnect: intakeOffer })
    }

    // ── AFTER_HOURS_CONTACT_METHOD ──────────────────────────────────
    case 'AFTER_HOURS_CONTACT_METHOD': {
      if (val === 'phone') {
        memory.contactMethod = 'phone'
        return reply(
          'AFTER_HOURS_CONTACT_VALUE',
          memory,
          "What's the best phone number to reach you? We'll send you a text.",
          'text'
        )
      }
      if (val === 'email') {
        memory.contactMethod = 'email'
        return reply(
          'AFTER_HOURS_CONTACT_VALUE',
          memory,
          "What's your email address?",
          'text'
        )
      }
      return reply(
        'AFTER_HOURS_CONTACT_METHOD',
        memory,
        'How should we reach you?',
        'buttons',
        { buttons: AFTER_HOURS_CONTACT_BUTTONS }
      )
    }

    // ── AFTER_HOURS_CONTACT_VALUE ───────────────────────────────────
    case 'AFTER_HOURS_CONTACT_VALUE': {
      if (memory.contactMethod === 'phone') {
        if (!isValidPhone(userText)) {
          return reply(
            'AFTER_HOURS_CONTACT_VALUE',
            memory,
            "That doesn't look like a phone number. Please enter 10 digits, like (555) 555-5555.",
            'text'
          )
        }
        memory.phone = userText.trim()
      } else {
        if (!isValidEmail(userText)) {
          return reply(
            'AFTER_HOURS_CONTACT_VALUE',
            memory,
            "That doesn't look like an email. Please try again, like name@example.com.",
            'text'
          )
        }
        memory.email = userText.trim()
      }
      return reply('AFTER_HOURS_NAME', memory, "Got it. What's your name?", 'text')
    }

    // ── AFTER_HOURS_NAME ────────────────────────────────────────────
    case 'AFTER_HOURS_NAME': {
      if (!userText.trim()) {
        return reply('AFTER_HOURS_NAME', memory, "What's your name?", 'text')
      }
      memory.fullName = userText.trim()
      return reply(
        'AFTER_HOURS_QUESTION',
        memory,
        "Last thing — what's your question? We'll get back to you with an answer.",
        'text'
      )
    }

    // ── AFTER_HOURS_QUESTION ────────────────────────────────────────
    case 'AFTER_HOURS_QUESTION': {
      if (!userText.trim()) {
        return reply(
          'AFTER_HOURS_QUESTION',
          memory,
          'Please tell us your question so we can help.',
          'text'
        )
      }
      memory.afterHoursQuestion = userText.trim()
      const when = nextBusinessDayPhrase()
      const verb = memory.contactMethod === 'phone' ? 'text you' : 'email you'
      const contact = memory.contactMethod === 'phone' ? memory.phone : memory.email
      return reply(
        'LIVE_SUPPORT',
        memory,
        `Thanks, ${memory.fullName}. We'll ${verb} at ${contact} ${when}.`,
        'text'
      )
    }

    // ── LIVE_SUPPORT ─────────────────────────────────────────────────
    case 'LIVE_SUPPORT': {
      if (val === 'start_over') {
        return reply('ASK_SERVED_BEFORE', {}, 'Hi! I am here to help you. Before we start, I have a quick question: **Have you ever received services from America Works?**', 'buttons', { buttons: YES_NO_NOTSURE })
      }
      // User text is forwarded to Teams by the API route; return empty reply
      return reply('LIVE_SUPPORT', memory, '', 'text')
    }

    // ── DONE ────────────────────────────────────────────────────────
    case 'DONE': {
      if (val === 'start_over') {
        return reply('ASK_SERVED_BEFORE', {}, 'Hi! I am here to help you. Before we start, I have a quick question: **Have you ever received services from America Works?**', 'buttons', { buttons: YES_NO_NOTSURE })
      }
      return reply('DONE', memory, 'Is there anything else I can help with?', 'buttons', {
        buttons: [{ label: 'Start over', value: 'start_over' }],
      })
    }

    default:
      return reply('ASK_SERVED_BEFORE', {}, 'Hi! I am here to help you. Before we start, I have a quick question: **Have you ever received services from America Works?**', 'buttons', { buttons: YES_NO_NOTSURE })
  }
}
