'use client'

import { Suspense, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { HoneypotField, useHoneypot } from '@/components/forms/Honeypot';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import { findNearestOfficeInState, zipToState } from '@/lib/zipToState';

export type OfficeRef = { title: string; state: string; zip: string };

const situationOptions = [
  'None of these',
  'Receiving Unemployment',
  'Veteran',
  'Receiving SSI/SSDI',
  'Referred by an Agency',
  'Receiving Public Assistance/SNAP',
  'Aging Out of Foster Care',
  'Living in a Shelter',
  'At Risk of Becoming Homeless',
  'Non Custodial Parent',
  'Justice Involved',
  'Have received services from America Works',
  'Other',
];

function JobseekersFormContent({ offices }: { offices: OfficeRef[] }) {
  const searchParams = useSearchParams();
  const source = searchParams.get('from');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [situationError, setSituationError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const { trapRef, isLikelyBot } = useHoneypot();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Collect checked situations into a single string
    const situations = situationOptions.filter((_, i) => data.get(`situation_${i}`) === 'on');
    if (situations.length === 0) {
      setSituationError(true);
      return;
    }
    setSituationError(false);

    // Silent bot trap — fake success without hitting the server
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
    situationOptions.forEach((_, i) => data.delete(`situation_${i}`));
    const zip = data.get('zip')?.toString();
    const state = zipToState(zip);
    const nearestOffice = findNearestOfficeInState(zip, offices);

    // Rebuild FormData so "closest office" appears first in the submission
    const ordered = new FormData();
    ordered.append('closest office', nearestOffice ? nearestOffice.title : 'None');
    for (const [key, value] of data.entries()) {
      ordered.append(key, value);
    }
    ordered.append('situation', situations.join(', '));
    if (state) ordered.append('state', state);
    ordered.append('form', 'jobseeker_inquiry');
    ordered.append('_subject', `Jobseeker inquiry — ${state || 'Unknown state'}`);
    if (source) ordered.append('source', source);
    ordered.append('cf-turnstile-response', turnstileToken);

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        body: ordered,
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

  if (status === 'success') {
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-xl mx-auto px-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            Thank you!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your information has been submitted. A member of our team will reach out to you shortly.
          </p>
          <Link
            href="/jobseekers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-aw-red text-white font-semibold rounded transition-all hover:bg-aw-red-dark no-underline"
          >
            <span>Back to Jobseekers</span>
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
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// Get Started</div>
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            Start your <span className="italic">journey.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Fill out the form below and a career specialist will contact you to discuss your goals and how we can help, at no cost to you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <HoneypotField inputRef={trapRef} />

          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name <span className="text-aw-red">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name <span className="text-aw-red">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-aw-red">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone <span className="text-aw-red">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(555) 555-5555"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
            />
          </div>

          {/* Zip & Age Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="zip" className="block text-sm font-semibold text-gray-700 mb-2">
                Zip Code <span className="text-aw-red">*</span>
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                required
                placeholder="e.g. 10001"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                Age <span className="text-aw-red">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="text"
                required
                placeholder="e.g. 28"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
            </div>
          </div>

          {/* Situation Checkboxes */}
          <fieldset>
            <legend className="block text-sm font-semibold text-gray-700 mb-3">
              Does any of the following apply to you? <span className="text-aw-red">*</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {situationOptions.map((option, i) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name={`situation_${i}`}
                    onChange={() => setSituationError(false)}
                    className="w-4 h-4 rounded border-gray-300 text-aw-red focus:ring-aw-red/20 cursor-pointer"
                  />
                  <span className="text-base text-gray-700 group-hover:text-black transition-colors">{option}</span>
                </label>
              ))}
            </div>
            {situationError && (
              <p className="mt-3 text-sm text-aw-red">Please select at least one option.</p>
            )}
          </fieldset>

          {/* About You */}
          <div>
            <label htmlFor="about" className="block text-sm font-semibold text-gray-700 mb-2">
              Tell us about yourself <span className="text-aw-red">*</span>
            </label>
            <textarea
              id="about"
              name="about"
              required
              rows={5}
              placeholder="Share a bit about your background, goals, or what kind of help you're looking for."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all resize-y"
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-aw-red text-white font-semibold rounded transition-all hover:bg-aw-red-dark hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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
    </div>
  );
}

export default function JobseekersFormClient({ offices }: { offices: OfficeRef[] }) {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 bg-white min-h-screen" />}>
      <JobseekersFormContent offices={offices} />
    </Suspense>
  );
}
