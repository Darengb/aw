import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'USDA Nondiscrimination Statement - America Works',
  description:
    'USDA nondiscrimination statement for SNAP/FDPIR and related nutrition assistance program materials. Required for SNAP audit compliance.',
}

export default function NondiscrimsnapPage() {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8">
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
          {'// USDA Nondiscrimination'}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
          USDA Nondiscrimination Statement
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          This page provides the USDA nondiscrimination statement for SNAP/FDPIR and related
          nutrition assistance program materials.
        </p>

        <a
          href="/documents/nondiscrimsnap.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-aw-blue text-white font-semibold rounded transition-all hover:bg-aw-blue-dark no-underline mb-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>View or download the PDF (3 pages, October 14, 2015)</span>
        </a>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">
              SNAP and FDPIR Nondiscrimination Statement
            </h2>
            <p className="mb-4">
              In accordance with Federal civil rights law and U.S. Department of Agriculture (USDA) civil rights
              regulations and policies, the USDA, its Agencies, offices, and employees, and institutions
              participating in or administering USDA programs are prohibited from discriminating based on race,
              color, national origin, sex, disability, age, or reprisal or retaliation for prior civil rights
              activity in any program or activity conducted or funded by USDA.
            </p>
            <p className="mb-4">
              Persons with disabilities who require alternative means of communication for program information
              (e.g. Braille, large print, audiotape, American Sign Language, etc.) should contact the Agency
              (State or local) where they applied for benefits. Individuals who are deaf, hard of hearing or
              have speech disabilities may contact USDA through the{' '}
              <strong>Federal Relay Service at (800) 877-8339</strong>. Additionally, program information may
              be made available in languages other than English.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">
              How to File a Complaint
            </h2>
            <p className="mb-4">
              To file a program complaint of discrimination, complete the{' '}
              <strong>USDA Program Discrimination Complaint Form (AD-3027)</strong>, found online at the
              USDA website, and at any USDA office, or write a letter addressed to USDA and provide in the
              letter all of the information requested in the form. To request a copy of the complaint form,
              call <strong>(866) 632-9992</strong>. Submit your completed form or letter to USDA by:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>Mail:</strong>{' '}
                U.S. Department of Agriculture, Office of the Assistant Secretary for Civil Rights,
                1400 Independence Avenue SW, Washington, D.C. 20250-9410
              </li>
              <li>
                <strong>Fax:</strong> (202) 690-7442
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:program.intake@usda.gov"
                  className="text-aw-blue font-semibold underline underline-offset-4"
                >
                  program.intake@usda.gov
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">
              Other FNS Nutrition Assistance Programs
            </h2>
            <p className="mb-4">
              For programs other than SNAP, individuals may also file a civil rights complaint with the
              appropriate USDA agency. Individuals who believe they have been discriminated against as a
              result of a program or activity receiving Federal financial assistance may also contact the
              appropriate USDA agency.
            </p>
            <p className="mb-4">
              <strong>SNAP Hotline:</strong>{' '}
              <a href="tel:18002215689" className="text-aw-blue font-semibold underline underline-offset-4">
                (800) 221-5689
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">
              HHS Office for Civil Rights
            </h2>
            <p className="mb-4">
              For programs receiving Federal financial assistance from the U.S. Department of Health and
              Human Services (HHS), complaints of discrimination may also be filed with the HHS Office for
              Civil Rights. Contact information for regional offices is available on the HHS website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-normal text-black mb-4">
              Joint Application Form
            </h2>
            <p>
              This institution is required to post the nondiscrimination statement in its offices and on
              all program materials distributed to program participants.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8">
            <p className="font-semibold text-black text-lg">
              This institution is an equal opportunity provider.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
