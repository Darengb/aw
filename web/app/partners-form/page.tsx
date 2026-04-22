'use client'

import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowRight, CheckCircle, Loader2, MessageSquare, FileText } from 'lucide-react';
import Link from 'next/link';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { HoneypotField, useHoneypot } from '@/components/forms/Honeypot';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

const programTypes = [
  'TANF Employment & Training',
  'SNAP Employment & Training',
  'WIOA Adult / Dislocated Worker',
  'Corrections & Reentry Services',
  'Disability Employment (Ticket to Work)',
  'Youth & Young Adult Workforce',
  'Veterans Services',
  'Other',
];

function PartnersFormContent() {
  const searchParams = useSearchParams();
  const isRfp = searchParams.get('type') === 'rfp';

  const [mode, setMode] = useState<'discuss' | 'rfp'>(isRfp ? 'rfp' : 'discuss');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const { trapRef, isLikelyBot } = useHoneypot();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    if (isLikelyBot()) {
      setStatus('success');
      form.reset();
      return;
    }

    if (!turnstileToken) {
      setErrorMsg('Please complete the verification before submitting.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    data.delete('website');
    data.append('_form_type', mode === 'rfp' ? 'partner_rfp' : 'partner_inquiry');
    data.append('cf-turnstile-response', turnstileToken);

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus('error');
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-blue focus:ring-2 focus:ring-aw-blue/20 transition-all";

  if (status === 'success') {
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-xl mx-auto px-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            Thank you!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your inquiry has been received. A member of our partnerships team will be in touch shortly.
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 px-8 py-4 bg-aw-blue text-white font-semibold rounded transition-all hover:bg-aw-blue-dark no-underline"
          >
            <span>Back to Partners</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// Government Partnerships</div>
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            {mode === 'rfp' ? (
              <>Share your <span className="italic">program details.</span></>
            ) : (
              <>Let&rsquo;s start a <span className="italic">conversation.</span></>
            )}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {mode === 'rfp'
              ? 'Tell us about your program or RFP and we\u2019ll follow up with how America Works can help.'
              : 'Reach out to our partnerships team. We\u2019ll connect you with the right person to discuss your workforce needs.'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-3 mb-10">
          <button
            type="button"
            onClick={() => setMode('discuss')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              mode === 'discuss'
                ? 'bg-aw-blue text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            General Inquiry
          </button>
          <button
            type="button"
            onClick={() => setMode('rfp')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              mode === 'rfp'
                ? 'bg-aw-blue text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Program / RFP Details
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <HoneypotField inputRef={trapRef} />

          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name <span className="text-aw-blue">*</span>
              </label>
              <input id="firstName" name="firstName" type="text" required placeholder="First name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name <span className="text-aw-blue">*</span>
              </label>
              <input id="lastName" name="lastName" type="text" required placeholder="Last name" className={inputClass} />
            </div>
          </div>

          {/* Organization & Title Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                Organization <span className="text-aw-blue">*</span>
              </label>
              <input id="organization" name="organization" type="text" required placeholder="Agency or organization name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Title / Role
              </label>
              <input id="title" name="title" type="text" placeholder="Your role" className={inputClass} />
            </div>
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-aw-blue">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder="you@agency.gov" className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" className={inputClass} />
            </div>
          </div>

          {/* RFP-specific fields */}
          {mode === 'rfp' && (
            <>
              {/* Program Type & Geographic Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="programType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Program Type
                  </label>
                  <select id="programType" name="programType" className={inputClass}>
                    <option value="">Select program area...</option>
                    {programTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="geography" className="block text-sm font-semibold text-gray-700 mb-2">
                    Geographic Area
                  </label>
                  <input id="geography" name="geography" type="text" placeholder="e.g. New York City, State of Maryland" className={inputClass} />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeline / RFP Deadline
                </label>
                <input id="timeline" name="timeline" type="text" placeholder="e.g. RFP due March 2026, or exploring options" className={inputClass} />
              </div>
            </>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              {mode === 'rfp' ? 'Program Details' : 'Message'} <span className="text-aw-blue">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={mode === 'rfp' ? 5 : 4}
              required
              placeholder={mode === 'rfp'
                ? 'Describe your program needs, target population, funding source, or any details that will help us understand how we can help...'
                : 'How can we help? Tell us a bit about what you\u2019re looking for...'}
              className={inputClass}
            />
          </div>

          {/* Verification */}
          <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />

          {/* Error Message */}
          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting' || !turnstileToken}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-aw-blue text-white font-semibold rounded transition-all hover:bg-aw-blue-dark hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>{mode === 'rfp' ? 'Submit Program Details' : 'Send Inquiry'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PartnersFormPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 bg-white min-h-screen" />}>
      <PartnersFormContent />
    </Suspense>
  );
}
