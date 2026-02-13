export type ChatState =
  | 'ASK_SERVED_BEFORE'
  | 'ASK_CURRENTLY_SERVED'
  | 'COLLECT_NAME_PHONE'
  | 'ASK_ENROLL'
  | 'ASK_STATE'
  | 'ASK_SSI_SSDI'
  | 'OUT_OF_AREA'
  | 'ASK_RESOURCE_NEEDS'
  | 'ASK_HELP'
  | 'DONE'

export type InputType = 'buttons' | 'text' | 'form' | 'multi-select' | 'none'

export interface ChatMemory {
  fullName?: string
  phone?: string
  state?: string
  resourceNeeds?: string[]
  helpText?: string
}

export interface ChatRequest {
  state: ChatState
  memory: ChatMemory
  userText: string
}

export interface ChatResponse {
  state: ChatState
  memory: ChatMemory
  reply: string
  inputType: InputType
  buttons?: ButtonOption[]
  formFields?: FormField[]
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
