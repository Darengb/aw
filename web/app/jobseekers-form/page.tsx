'use client'

import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const situationOptions = [
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
  'Other',
];

export default function JobseekersFormPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailUpdates, setEmailUpdates] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Collect checked situations into a single string
    const situations = situationOptions.filter((_, i) => data.get(`situation_${i}`) === 'on');
    data.delete('_situations'); // placeholder
    situationOptions.forEach((_, i) => data.delete(`situation_${i}`));
    data.append('situation', situations.join(', '));
    data.append('email_updates', emailUpdates ? 'Yes' : 'No');

    try {
      const res = await fetch('https://formspree.io/f/xeelalar', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
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
                Zip Code
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                placeholder="e.g. 10001"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="text"
                placeholder="e.g. 28"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
            </div>
          </div>

          {/* Situation Checkboxes */}
          <fieldset>
            <legend className="block text-sm font-semibold text-gray-700 mb-3">
              Does any of the following apply to you?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {situationOptions.map((option, i) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name={`situation_${i}`}
                    className="w-4 h-4 rounded border-gray-300 text-aw-red focus:ring-aw-red/20 cursor-pointer"
                  />
                  <span className="text-base text-gray-700 group-hover:text-black transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Email Updates */}
          <label className="flex items-center gap-3 cursor-pointer group pt-2">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(e) => setEmailUpdates(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-aw-red focus:ring-aw-red/20 cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-black transition-colors">Sign up to receive email updates</span>
          </label>

          {/* Error Message */}
          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
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
