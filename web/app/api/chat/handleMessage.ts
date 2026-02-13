import type { ChatState, ChatMemory, ChatResponse, ButtonOption, FormField } from './types'
import { SIGNUP_FORM_URL } from './types'
import { isBusinessHoursET, isFullServiceState, isValidPhone } from './utils'
import { parseState, classifyAmericaWorksRelated, webSearchAnswer, webSearchResources } from './llm'

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

function reply(
  state: ChatState,
  memory: ChatMemory,
  text: string,
  inputType: ChatResponse['inputType'],
  options?: { buttons?: ButtonOption[]; formFields?: FormField[] }
): ChatResponse {
  return {
    state,
    memory,
    reply: text,
    inputType,
    buttons: options?.buttons,
    formFields: options?.formFields,
  }
}

export async function handleMessage(
  state: ChatState,
  memory: ChatMemory,
  userText: string
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
      return reply('ASK_SERVED_BEFORE', memory, 'Have you ever been served by America Works before?', 'buttons', { buttons: YES_NO_NOTSURE })
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
        return reply('DONE', memory, `Thanks, ${fullName}. Someone will follow up with you if needed.`, 'none')
      }
      return reply('COLLECT_NAME_PHONE', memory, 'Please share your full name and a phone number we can reach you at.', 'form', { formFields: NAME_PHONE_FIELDS })
    }

    // ── ASK_ENROLL ──────────────────────────────────────────────────
    case 'ASK_ENROLL': {
      if (val === 'yes') {
        return reply('ASK_STATE', memory, 'What state do you live in?', 'text')
      }
      if (val === 'no' || val === 'not_sure') {
        return reply('ASK_HELP', memory, 'What can I help you with today?', 'text')
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
      const resources = await webSearchResources(memory.state ?? 'unknown', categories)
      return reply('DONE', memory, resources, 'none')
    }

    // ── ASK_HELP ────────────────────────────────────────────────────
    case 'ASK_HELP': {
      if (!userText.trim()) {
        return reply('ASK_HELP', memory, 'What can I help you with today?', 'text')
      }

      memory.helpText = userText
      const isAW = await classifyAmericaWorksRelated(userText)

      if (isAW) {
        if (isBusinessHoursET()) {
          return reply(
            'DONE',
            memory,
            '[Placeholder] I\'m connecting you with a team member now. A staff member will be in touch shortly.',
            'none'
          )
        }
        return reply(
          'DONE',
          memory,
          '[Placeholder] Thank you for reaching out. Our office hours are 9:00 AM – 5:00 PM ET, Monday through Friday. A team member will get in touch with you during the next business day.',
          'none'
        )
      }

      // Not AW-related → web search
      const answer = await webSearchAnswer(userText)
      return reply('DONE', memory, answer, 'none')
    }

    // ── DONE ────────────────────────────────────────────────────────
    case 'DONE': {
      if (val === 'start_over') {
        return reply('ASK_SERVED_BEFORE', {}, 'Have you ever been served by America Works before?', 'buttons', { buttons: YES_NO_NOTSURE })
      }
      return reply('DONE', memory, 'Is there anything else I can help with?', 'buttons', {
        buttons: [{ label: 'Start over', value: 'start_over' }],
      })
    }

    default:
      return reply('ASK_SERVED_BEFORE', {}, 'Have you ever been served by America Works before?', 'buttons', { buttons: YES_NO_NOTSURE })
  }
}
