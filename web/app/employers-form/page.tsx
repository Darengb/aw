'use client'

import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, DollarSign, ClipboardCheck, Receipt, Heart, Quote } from 'lucide-react';
import Link from 'next/link';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { HoneypotField, useHoneypot } from '@/components/forms/Honeypot';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

const scheduleOptions = [
  'Rotating',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const valueProps = [
  {
    icon: DollarSign,
    title: 'No Initial Placement Fee',
    description: "Companies are never charged fees for placements or support services. America Works' services are entirely free to employers.",
  },
  {
    icon: ClipboardCheck,
    title: 'Easy Hiring Process',
    description: 'America Works carefully pre-screens each candidate, which ensures that every one sent out is motivated and well matched to each job.',
  },
  {
    icon: Receipt,
    title: 'Tax Credits',
    description: "Most America Works' candidates qualify for the Work Opportunity Tax Credit Program, so companies can apply for federal tax credits for each one hired.",
  },
  {
    icon: Heart,
    title: 'Extra Attention',
    description: 'Extra human resources support from America Works helps candidates succeed on the job so that employers are fully satisfied.',
  },
];

// Sidebar testimonials — short, punchy
const sidebarTestimonials = [
  {
    quote: 'We have an ongoing need for dependable and skilled workers. America Works has been helpful in providing such workers.',
    author: 'H&R Block',
  },
  {
    quote: 'America Works is a dedicated and helpful organization that has been a great service to our company in helping us find new employees.',
    author: 'Fossil',
  },
  {
    quote: 'Their pre-screening helps us save time in recruitment, and their support services for jobseekers allow us to even interview on-site within our stores.',
    author: 'Burlington Coat Factory',
  },
];

// Full-width testimonials — longer, more detailed
const featuredTestimonials = [
  {
    quote: 'At two of our most precious vending locations, Citi Field "Home to the New York Mets" and Yankee Stadium, year after year America Works handles all of our staffing needs.',
    author: 'Aramark',
  },
  {
    quote: 'America Works has made my job so much easier when it comes to hiring. They know what it takes to work at Aegis Global and they do a great job in forwarding us quality employees.',
    author: 'Aegis Global',
  },
  {
    quote: 'America Works helped me focus on what I needed to do, things like time management. They taught me how to manage money and presentation.',
    author: 'Akia',
    role: 'Former Client',
  },
  {
    quote: 'I remember when I was a member of America Works, the reps really helped me through rough times and helped me find employment \u2013 really nice people.',
    author: 'Gladys',
    role: 'Former Client',
  },
  {
    quote: 'America Works played a huge role in keeping my job. Without the constant follow up, I may have left.',
    author: 'Jeff',
    role: 'Former Client',
  },
];

export default function EmployersFormPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const { trapRef, isLikelyBot } = useHoneypot();

  function toggleSchedule(day: string) {
    setSelectedSchedule(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    if (isLikelyBot()) {
      setStatus('success');
      form.reset();
      setSelectedSchedule([]);
      setEmailUpdates(false);
      return;
    }

    if (!turnstileToken) {
      setErrorMsg('Please complete the verification before submitting.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    data.delete('website');
    data.append('schedule', selectedSchedule.join(', '));
    data.append('email_updates', emailUpdates ? 'Yes' : 'No');
    data.append('_form_type', 'employer_job_order');
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
        setSelectedSchedule([]);
        setEmailUpdates(false);
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
            Your job order has been submitted. A member of our staffing team will contact you shortly.
          </p>
          <Link
            href="/employers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-aw-blue text-white font-semibold rounded transition-all hover:bg-aw-blue-dark no-underline"
          >
            <span>Back to Employers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// For Employers</div>
          <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-black mb-4">
            Submit a <span className="italic">job order.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            If you are an employer, please provide your contact information below and we will contact you shortly.
          </p>
        </div>

        {/* Two-column: Form + Marketing */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
          {/* Form Column */}
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

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-aw-blue">*</span>
                </label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" className={inputClass} />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                Company <span className="text-aw-blue">*</span>
              </label>
              <input id="company" name="company" type="text" required placeholder="Company name" className={inputClass} />
            </div>

            {/* Street */}
            <div>
              <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <input id="street" name="street" type="text" placeholder="123 Main St" className={inputClass} />
            </div>

            {/* City & State Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-aw-blue">*</span>
                </label>
                <input id="city" name="city" type="text" required placeholder="City" className={inputClass} />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State / Province <span className="text-aw-blue">*</span>
                </label>
                <input id="state" name="state" type="text" required placeholder="State" className={inputClass} />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-display text-xl font-normal text-black mb-1">Position Details</h2>
              <p className="text-sm text-gray-500 mb-6">Tell us about the role you&rsquo;re looking to fill.</p>
            </div>

            {/* Position & Type Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                  Position Title
                </label>
                <input id="position" name="position" type="text" placeholder="e.g. Warehouse Associate" className={inputClass} />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <select id="type" name="type" className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
            </div>

            {/* Positions & Hours Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="numPositions" className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Positions
                </label>
                <input id="numPositions" name="numPositions" type="text" placeholder="e.g. 5" className={inputClass} />
              </div>
              <div>
                <label htmlFor="hoursPerWeek" className="block text-sm font-semibold text-gray-700 mb-2">
                  Hours per Week
                </label>
                <input id="hoursPerWeek" name="hoursPerWeek" type="text" placeholder="e.g. 35-40" className={inputClass} />
              </div>
            </div>

            {/* Rate of Pay */}
            <div>
              <label htmlFor="rateOfPay" className="block text-sm font-semibold text-gray-700 mb-2">
                Rate of Pay
              </label>
              <input id="rateOfPay" name="rateOfPay" type="text" placeholder="e.g. $18-22/hr" className={inputClass} />
            </div>

            {/* Schedule */}
            <fieldset>
              <legend className="block text-sm font-semibold text-gray-700 mb-3">
                Schedule
              </legend>
              <div className="flex flex-wrap gap-2">
                {scheduleOptions.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleSchedule(day)}
                    className={`px-4 py-2 rounded border text-sm font-medium transition-all ${
                      selectedSchedule.includes(day)
                        ? 'bg-aw-blue text-white border-aw-blue'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-aw-blue hover:text-aw-blue'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Interview Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="interviewDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Interview Date
                </label>
                <input id="interviewDate" name="interviewDate" type="date" className={inputClass} />
              </div>
              <div>
                <label htmlFor="interviewTime" className="block text-sm font-semibold text-gray-700 mb-2">
                  Interview Time
                </label>
                <input id="interviewTime" name="interviewTime" type="time" className={inputClass} />
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={4}
                placeholder="Any additional information about the position, requirements, or your hiring timeline..."
                className={inputClass}
              />
            </div>

            {/* Email Updates */}
            <label className="flex items-center gap-3 cursor-pointer group pt-2">
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-aw-blue focus:ring-aw-blue/20 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-black transition-colors">Sign up to receive email updates</span>
            </label>

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
                  <span>Submit Job Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Marketing Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            {/* Value Props */}
            <div className="space-y-0 divide-y divide-gray-200">
              {valueProps.map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <div key={index} className="py-6 first:pt-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-aw-blue/[0.07] flex items-center justify-center">
                        <Icon className="w-[22px] h-[22px] text-aw-blue" strokeWidth={1.5} />
                      </div>
                      <div className="pt-0.5">
                        <h3 className="font-display text-lg font-normal text-gray-900 mb-1.5">{prop.title}</h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed">{prop.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Testimonials */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">Trusted by</div>
              <div className="space-y-5">
                {sidebarTestimonials.map((t, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5">
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                    <p className="font-mono text-[11px] font-semibold text-aw-blue tracking-wide uppercase">{t.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Featured Testimonials — Full Width Below */}
        <section className="mt-24 pt-20 border-t border-gray-100">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-aw-blue mb-3">What people are saying</div>
              <h2 className="font-display text-2xl md:text-3xl font-normal tracking-tight text-gray-900">
                Employers and clients <span className="italic">trust us.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTestimonials.map((t, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-lg ${
                  index === 0
                    ? 'bg-gray-950 text-white md:col-span-2 lg:col-span-1'
                    : 'bg-gray-50 text-gray-900'
                }`}
              >
                <Quote
                  className={`w-8 h-8 mb-4 ${
                    index === 0 ? 'text-white/20' : 'text-aw-blue/15'
                  }`}
                  strokeWidth={1}
                />
                <p className={`text-base leading-relaxed mb-6 ${
                  index === 0 ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-px ${index === 0 ? 'bg-white/30' : 'bg-aw-blue/30'}`} />
                  <div>
                    <p className={`font-mono text-[11px] font-semibold tracking-wide uppercase ${
                      index === 0 ? 'text-white' : 'text-aw-blue'
                    }`}>
                      {t.author}
                    </p>
                    {t.role && (
                      <p className={`text-[11px] mt-0.5 ${
                        index === 0 ? 'text-white/50' : 'text-gray-400'
                      }`}>
                        {t.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
