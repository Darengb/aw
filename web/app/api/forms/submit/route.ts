import { NextResponse } from 'next/server'
import { verifyTurnstile } from '@/lib/turnstile'

const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeelalar'
const SMS_OPT_IN_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdelagr'

function getFormspreeEndpoint(formType: FormDataEntryValue | null) {
  return formType?.toString() === 'sms_opt_in'
    ? SMS_OPT_IN_FORMSPREE_ENDPOINT
    : DEFAULT_FORMSPREE_ENDPOINT
}

export async function POST(request: Request) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ errors: [{ message: 'Invalid form payload.' }] }, { status: 400 })
  }

  const token = form.get('cf-turnstile-response')
  const tokenStr = typeof token === 'string' ? token : null

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    undefined

  const ok = await verifyTurnstile(tokenStr, ip)
  if (!ok) {
    return NextResponse.json(
      { errors: [{ message: 'Verification failed. Please try again.' }] },
      { status: 403 }
    )
  }

  const formspreeEndpoint = getFormspreeEndpoint(form.get('form'))
  form.delete('cf-turnstile-response')

  try {
    const res = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json' },
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error('[forms/submit] formspree forward error:', err)
    return NextResponse.json(
      { errors: [{ message: 'Network error. Please try again.' }] },
      { status: 502 }
    )
  }
}
