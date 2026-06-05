import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SMS Policy - America Works',
  description: 'America Works SMS terms and conditions, opt-in, opt-out, support, and message rate information.',
}

const messageExamples = [
  'Appointment reminders',
  'Job fair and employer announcements',
  'Wage reporting reminders',
  'Office closures',
  'Holiday greetings',
  'Other relevant program information',
]

export default function SmsPolicyPage() {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8">
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
          {'// SMS Policy'}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
          SMS Policy
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-12">
          America Works SMS Terms and Conditions
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">1. Service Description</h2>
            <p className="mb-4">
              America Works sends clients periodic SMS reminders and updates about various programs and services.
              These messages may include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              {messageExamples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">
              These messages are intended to keep clients informed and engaged with the services and opportunities
              provided by America Works.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">2. Opt-In</h2>
            <p className="mb-4">
              To subscribe to our SMS notification service, text the keyword <strong>START</strong> to{' '}
              <strong>347-752-5830</strong> or complete the{' '}
              <Link href="/opt-in" className="text-aw-blue font-semibold underline underline-offset-4">
                America Works SMS opt-in form
              </Link>
              .
            </p>
            <p className="mb-4">
              By opting in, you consent to receive automated text messages from America Works. Your consent to
              receive these messages is not required as a condition of purchasing any property, goods, or services.
            </p>
            <p>
              Information will not be shared with any third party for affiliate marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">3. Opt-Out</h2>
            <p className="mb-4">
              You can unsubscribe from our SMS service at any time. To cancel, reply with <strong>STOP</strong> to
              any message you receive from us or text <strong>STOP</strong> to <strong>347-752-5830</strong>.
            </p>
            <p>
              Upon receiving your opt-out request, we will send you a confirmation message to verify that you have
              unsubscribed. After this confirmation, you will no longer receive SMS messages from America Works. If
              you wish to rejoin the service, text <strong>START</strong> to <strong>347-752-5830</strong> or complete
              the opt-in form to resume receiving messages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">4. Support and Assistance</h2>
            <p className="mb-4">
              If you encounter any issues with our SMS messaging service, you can seek assistance in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reply with the keyword <strong>HELP</strong> to any message you receive from us.</li>
              <li>Email our support team at <a href="mailto:info@americaworks.com" className="text-aw-blue font-semibold underline underline-offset-4">info@americaworks.com</a>.</li>
              <li>Call our support hotline at <a href="tel:18552681935" className="text-aw-blue font-semibold underline underline-offset-4">(855) 268-1935</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">5. Carrier Liability</h2>
            <p>
              Wireless carriers are not responsible or liable for delayed or undelivered messages. Delivery times and
              availability may vary based on your mobile carrier&apos;s network and other factors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">6. Message and Data Rates</h2>
            <p className="mb-4">
              Standard message and data rates may apply for any messages sent to you from America Works and any
              messages you send to us. These charges depend on your wireless carrier and your specific text or data plan.
              If you have questions regarding your text or data plan, please contact your wireless provider.
            </p>
            <p>
              You may receive a minimum of one message per month, not including any conversational messages exchanged
              between you and a staff member. By subscribing to our SMS service, you acknowledge and accept any
              applicable charges from your wireless carrier.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
