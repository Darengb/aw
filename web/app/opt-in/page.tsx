'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { HoneypotField, useHoneypot } from '@/components/forms/Honeypot'
import { TurnstileWidget } from '@/components/forms/TurnstileWidget'

export default function SmsOptInPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const { trapRef, isLikelyBot } = useHoneypot()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    if (isLikelyBot()) {
      setStatus('success')
      form.reset()
      return
    }

    if (!turnstileToken) {
      setErrorMsg('Please complete the verification before submitting.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    data.delete('website')
    data.append('form', 'sms_opt_in')
    data.append('_subject', 'SMS opt-in consent')
    data.append('consent_timestamp', new Date().toISOString())
    data.append('consent_source', '/opt-in')
    data.append('sms_terms_url', '/smspolicy')
    data.append('cf-turnstile-response', turnstileToken)

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg(json?.errors?.[0]?.message || 'Something went wrong. Please try again.')
        setStatus('error')
        turnstileRef.current?.reset()
        setTurnstileToken(null)
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  const inputClass = 'w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-blue focus:ring-2 focus:ring-aw-blue/20 transition-all'

  if (status === 'success') {
    return (
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-xl mx-auto px-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            Thank you!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your SMS opt-in has been submitted.
          </p>
          <Link
            href="/smspolicy"
            className="inline-flex items-center gap-2 px-8 py-4 bg-aw-blue text-white font-semibold rounded transition-all hover:bg-aw-blue-dark no-underline"
          >
            <span>View SMS Policy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-8">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
            {'// SMS Opt-In'}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            SMS Opt-In & Consent Form
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            America Works offers the opportunity to send text messages to you as a participant, to provide important
            information, upcoming training opportunities, job leads, employer-related events, appointment reminders,
            and check-ins.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <HoneypotField inputRef={trapRef} />

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-aw-blue">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Full name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-aw-blue">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(555) 555-5555"
              className={inputClass}
            />
          </div>

          <section className="p-6 bg-gray-50 border border-gray-200 rounded space-y-4 text-sm text-gray-700 leading-relaxed">
            <h2 className="font-body text-base font-semibold text-black">Terms and conditions</h2>
            <p>
              Message and data rates may apply. Message frequency varies. You can opt out at any time by replying{' '}
              <strong>STOP</strong>. For help or more information, reply <strong>HELP</strong> or contact our customer
              service at <a href="tel:18552681935" className="text-aw-blue font-semibold underline underline-offset-4">1-855-268-1935</a>.
            </p>
            <p>
              For more information on how we handle your personal data, please refer to our{' '}
              <Link href="/smspolicy" className="text-aw-blue font-semibold underline underline-offset-4">
                SMS Policy
              </Link>
              .
            </p>
            <p>
              By providing your phone number, you consent to receiving SMS communications from America Works. You can
              opt out at any time by replying <strong>STOP</strong> to any of our messages.
            </p>
          </section>

          <div className="flex items-start gap-3 p-4 border border-gray-300 rounded bg-white">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              value="I consent to receive SMS communications from America Works"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-aw-blue focus:ring-aw-blue"
            />
            <label htmlFor="consent" className="text-sm font-semibold text-gray-800 leading-relaxed">
              I consent to receive SMS communications from America Works <span className="text-aw-blue">*</span>
            </label>
          </div>

          <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />

          {status === 'error' && (
            <p className="text-sm text-aw-red" role="alert">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-aw-blue text-white font-semibold rounded transition-all hover:bg-aw-blue-dark disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
