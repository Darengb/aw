export type ChatState =
  | 'ASK_SERVED_BEFORE'
  | 'ASK_CURRENTLY_SERVED'
  | 'COLLECT_NAME_PHONE'
  | 'ASK_PROGRAM'
  | 'ASK_ENROLL'
  | 'ASK_STATE'
  | 'ASK_SSI_SSDI'
  | 'OUT_OF_AREA'
  | 'ASK_RESOURCE_NEEDS'
  | 'ASK_HELP'
  | 'SMART_INTAKE'
  | 'AFTER_HOURS_CONTACT_METHOD'
  | 'AFTER_HOURS_CONTACT_VALUE'
  | 'AFTER_HOURS_NAME'
  | 'AFTER_HOURS_QUESTION'
  | 'LIVE_SUPPORT'
  | 'DONE'

export type InputType = 'buttons' | 'text' | 'form' | 'multi-select' | 'none'

export interface ChatMemory {
  fullName?: string
  phone?: string
  email?: string
  contactMethod?: 'phone' | 'email'
  afterHoursQuestion?: string
  program?: string
  state?: string
  resourceNeeds?: string[]
  helpText?: string
  webSearchActive?: boolean
  conversationId?: string
  rootMessageId?: string
}

export interface ChatMessage {
  role: 'bot' | 'user'
  text: string
}

export interface ChatRequest {
  state: ChatState
  memory: ChatMemory
  userText: string
  messages?: ChatMessage[]
}

export interface ChatResponse {
  state: ChatState
  memory: ChatMemory
  reply: string
  inputType: InputType
  buttons?: ButtonOption[]
  formFields?: FormField[]
  offerConnect?: boolean
  isLiveSupport?: boolean
}

export interface ButtonOption {
  label: string
  value: string
}

export interface FormField {
  name: string
  label: string
  type: string
  required: boolean
}

export const SIGNUP_FORM_URL = '/jobseekers-form'

export const SERVICE_STATES = [
  'CA', 'DC', 'GA', 'LA', 'MD', 'NJ', 'NY', 'PA', 'TN', 'VT', 'WI',
]
