import { SERVICE_STATES } from './types'

export function isBusinessHoursET(): boolean {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
    weekday: 'short',
  })
  const parts = formatter.formatToParts(now)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10)

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  return weekdays.includes(weekday) && hour >= 9 && hour < 17
}

export function isFullServiceState(stateCode: string): boolean {
  return SERVICE_STATES.includes(stateCode.toUpperCase())
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 11
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function nextBusinessDayPhrase(): string {
  const now = new Date()
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  })
  const parts = fmt.formatToParts(now)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10)

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  if (weekdays.includes(weekday) && hour < 9) {
    return 'later today'
  }
  if (weekday === 'Fri' || weekday === 'Sat' || weekday === 'Sun') {
    return 'Monday'
  }
  return 'tomorrow'
}
