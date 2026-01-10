import { PageHero } from '../components/heroes/PageHero'
import { SectionHeader } from '../components/sections/SectionHeader'
import { GlanceGrid } from '../components/grids/GlanceGrid'
import { EvidenceGrid } from '../components/grids/EvidenceGrid'
import { MatrixGrid } from '../components/grids/MatrixGrid'
import { ScorecardGrid } from '../components/grids/ScorecardGrid'
import { AboutTimeline } from '../components/interactive/AboutTimeline'
import { CTASection } from '../components/sections/CTASection'
import { SecondaryNav } from '../components/layout/SecondaryNav'
import { Button } from '../components/ui/Button'
import type { GlanceItem, EvidenceItem, MatrixItem, ScorecardItem, TimelineItem, NavLink } from '../lib/types'

// Secondary nav links for About page
const secondaryNavLinks: NavLink[] = [
  { label: 'Evidence', href: '#evidence' },
  { label: 'Populations', href: '#populations' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Founders', href: '#founders' },
]

// At A Glance items
const glanceItems: GlanceItem[] = [
  {
    icon: 'award',
    title: 'Independently evaluated',
    description: 'by third-party organizations',
  },
  {
    icon: 'building-2',
    title: 'Proven performance',
    description: 'in federal, state, city and county workforce programs',
  },
  {
    icon: 'users',
    title: 'Specializes in hardest-to-serve populations',
    description: '(welfare/SNAP, disability, justice-involved, homeless veterans)',
  },
  {
    icon: 'target',
    title: 'Operates under performance-based contracts',
    description: 'paid on outcomes',
  },
  {
    icon: 'map',
    title: 'Multi-state, multi-year',
    description: 'contract experience with complex public systems',
  },
  {
    icon: 'landmark',
    title: 'Regularly advise the White House and Congress',
    description: 'on welfare reform and TANF improvements',
  },
]

// Evidence items
const evidenceItems: EvidenceItem[] = [
  {
    title: 'Ernst & Young - Welfare-to-Work Study',
    description: 'Reviewed early America Works welfare-to-work programs. Found 85-90% of clients still employed one year after placement. Highlighted performance-based contracts as improving outcomes and value for municipalities.',
    source: 'Long-term retention for welfare populations, verified by a major global firm.',
  },
  {
    title: 'Manhattan Institute - Ticket to Work Case Study',
    description: 'Profiled America Works as a leading Ticket to Work Employment Network. In one year: 1,295 disability beneficiaries enrolled; 626 placed into gainful employment. In New York, 75% of successfully hired clients reached at least 12 months of employment.',
    source: 'Proven sustained employment for disability beneficiaries under a federal, performance-based program.',
  },
  {
    title: 'Fraser Institute, NYS Dept. of Labor & Others',
    description: 'New York State data showed 88% of people placed by America Works remained off welfare three years later. Analyses by the Fraser Institute, Social Market Foundation, and National Center for Policy Analysis highlighted America Works as both effective and lower-cost than comparable government programs.',
    source: 'Independent confirmation of durable welfare exits and strong value for money.',
  },
  {
    title: 'Urban Institute - Criminal Justice Employment Model',
    description: 'The Urban Institute profiled America Works\' Criminal Justice Program as a national example of employment-focused reentry. Early evaluation results: hundreds of people leaving incarceration placed into jobs, with strong 90-day and 6-month retention.',
    source: 'Shows impact with justice-involved individuals, a high-priority, high-risk population.',
  },
  {
    title: 'Manhattan Institute - "Making Welfare-to-Work Fly"',
    description: 'Published an issue brief by founder Peter Cove on performance-based social service contracts. Highlighted America Works\' model as delivering better results and better value than traditional training programs.',
    source: 'Positions the model itself as a reference point in welfare reform, not just another vendor.',
  },
  {
    title: 'USDA / Mathematica - SNAP E&T Rapid-Cycle Evaluation (DC)',
    description: 'America Works selected as one of the providers in a USDA-funded SNAP E&T innovation pilot in D.C. Implemented an enhanced, goal-based case management model tested by Mathematica using rapid-cycle evaluation methods.',
    source: 'Trusted to deliver in a federally sponsored, data-driven pilot focused on engagement and outcomes.',
  },
  {
    title: 'U.S. HHS / OPRE - TANF Job Search Evaluation (NYC)',
    description: 'Included as one of the vendors in the Job Search Assistance Strategies Evaluation, alongside Goodwill. Operated job-search assistance sites in Brooklyn and Queens as part of a federal evaluation of alternative TANF models.',
    source: 'Demonstrates the ability to operate within rigorous federal evaluation frameworks.',
  },
  {
    title: 'HHS / ASPE - Federal Review of Welfare Privatization',
    description: 'The U.S. Department of Health and Human Services (HHS), through its Office of the Assistant Secretary for Planning and Evaluation (ASPE), commissioned "Privatization of Welfare Services: A Review of the Literature." That review identifies America Works as a key example of a for-profit, performance-based employment services provider working with welfare recipients across multiple states.',
    source: 'America Works is singled out in a federal research overview as a notable case of performance-based private welfare service delivery.',
  },
]

// Populations Matrix items
const matrixItems: MatrixItem[] = [
  {
    title: 'Welfare & SNAP Recipients',
    description: `
      <div class="flex flex-wrap gap-8 mb-4">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-xs uppercase tracking-wide text-gray-500 font-semibold">Program Types</span>
          <span class="text-sm text-gray-800 font-medium">TANF, SNAP Employment & Training, welfare-to-work</span>
        </div>
      </div>
      <p><strong class="text-black font-semibold">What we do:</strong> Work-first model with job readiness, rapid job search, employer connections, and retention support.</p>
      <p class="mt-4"><strong class="text-black font-semibold">Impact:</strong> Independent evaluations document high 12-month retention and reduced long-term reliance on benefits.</p>
    `,
  },
  {
    title: 'Disability Beneficiaries',
    description: `
      <div class="flex flex-wrap gap-8 mb-4">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-xs uppercase tracking-wide text-gray-500 font-semibold">Program Types</span>
          <span class="text-sm text-gray-800 font-medium">Ticket to Work (EN), benefits counseling, WIPA-related services</span>
        </div>
      </div>
      <p><strong class="text-black font-semibold">What we do:</strong> Benefits counseling, individual work plans, job readiness, placement, and long-term coaching.</p>
      <p class="mt-4"><strong class="text-black font-semibold">Impact:</strong> Hundreds of beneficiaries placed each year; majority of successful hires sustaining at least 12 months of work under Ticket to Work milestones.</p>
    `,
  },
  {
    title: 'Justice-Involved Individuals',
    description: `
      <div class="flex flex-wrap gap-8 mb-4">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-xs uppercase tracking-wide text-gray-500 font-semibold">Program Types</span>
          <span class="text-sm text-gray-800 font-medium">Reentry employment programs, criminal justice employment initiatives</span>
        </div>
      </div>
      <p><strong class="text-black font-semibold">What we do:</strong> Outreach in corrections settings, structured readiness training, supported job search, and follow-up after release.</p>
      <p class="mt-4"><strong class="text-black font-semibold">Impact:</strong> Documented placements and multi-month retention outcomes for individuals returning from incarceration.</p>
    `,
  },
  {
    title: 'Homeless & Homeless Veterans',
    description: `
      <div class="flex flex-wrap gap-8 mb-4">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-xs uppercase tracking-wide text-gray-500 font-semibold">Program Types</span>
          <span class="text-sm text-gray-800 font-medium">Homelessness and veteran-focused employment programs</span>
        </div>
      </div>
      <p><strong class="text-black font-semibold">What we do:</strong> Employment services integrated with housing and support partners; attention to practical barriers like clothing, transportation, and documentation.</p>
      <p class="mt-4"><strong class="text-black font-semibold">Impact:</strong> Thousands of homeless individuals-including homeless veterans-placed into employment using a model adapted from welfare-to-work successes.</p>
    `,
  },
  {
    title: 'Youth, Young Adults & Other High-Barrier Groups',
    description: `
      <div class="flex flex-wrap gap-8 mb-4">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-xs uppercase tracking-wide text-gray-500 font-semibold">Program Types</span>
          <span class="text-sm text-gray-800 font-medium">Youth employment, young adult workforce, non-custodial parent programs</span>
        </div>
      </div>
      <p><strong class="text-black font-semibold">What we do:</strong> Soft-skills training, entry-level job placement, and pathways to better-paying roles via experience and credentials.</p>
      <p class="mt-4"><strong class="text-black font-semibold">Impact:</strong> Consistent application of a work-first + wraparound support model across multiple high-priority, high-barrier populations.</p>
    `,
  },
]

// Scorecard items
const scorecardItems: ScorecardItem[] = [
  {
    title: 'Contracting & Scale',
    items: [
      'Multi-state operations across a range of policy and labor-market environments.',
      'Experience with multi-million-dollar, multi-year contracts in workforce and human services.',
      'Ability to stand up new operations quickly when required by contract timelines.',
    ],
  },
  {
    title: 'Compliance & Reporting',
    items: [
      'Comfortable under performance-based contracts with strict audit and monitoring requirements.',
      'Built-in tracking of participant engagement, job placements, retention milestones, earnings and benefit changes.',
      'History of successful audits and evaluations at city, state, and federal levels.',
    ],
  },
  {
    title: 'Prestige & Policy Involvement',
    items: [
      'Praised by a U.S. Vice President as a "fantastic example" of market-oriented solutions.',
      'Engaged as expert partners during 1996 welfare reform, working with the White House and congressional leadership.',
      'Leadership invited to testify before the U.S. House Committee on Ways and Means on improving TANF outcomes.',
      'Leadership recognized with national honors including Socially Responsible Entrepreneur of the Year.',
    ],
  },
]

// Timeline items
const timelineItems: TimelineItem[] = [
  {
    year: '1984',
    title: 'Founding',
    description: 'Peter Cove founded America Works as an experiment to prove his philosophy about helping those in poverty through work.',
  },
  {
    year: '1992',
    title: 'VP Dan Quayle Visits',
    description: 'Vice President praised America Works as a "fantastic example" of market-oriented solutions to unemployment and poverty.',
  },
  {
    year: '1995',
    title: 'Entrepreneur of the Year',
    description: 'Peter Cove awarded Socially Responsible Entrepreneur of The Year for achievements with America Works.',
  },
  {
    year: '1996',
    title: 'Clinton Partners with AW',
    description: 'Peter Cove and Dr. Lee Bowes brought in as experts to help craft Welfare Reform in 1996.',
  },
  {
    year: '2000',
    title: 'Making Welfare-to-Work Fly',
    description: 'Manhattan Institute publishes brief demonstrating performance-based contracts provide better results.',
  },
  {
    year: '2011',
    title: 'Stevies Awards',
    description: 'Dr. Lee Bowes awarded the Stevie\'s Award for Lifetime Achievement for her successes at America Works.',
  },
  {
    year: '2015',
    title: 'House Committee Testimony',
    description: 'Peter Cove invited to speak on Next Steps for Welfare Reform before the House Committee on Ways and Means.',
  },
]

export function About() {
  return (
    <div className="theme-red">
      {/* Secondary Navigation */}
      <SecondaryNav links={secondaryNavLinks} />

      {/* Hero Section */}
      <PageHero
        label="// Impact & About"
        title="Proven impact for the hardest-to-serve."
        subtitle="America Works delivers performance-based employment outcomes for welfare, disability, reentry, and homelessness programs across multiple states under rigorous oversight and evaluation."
        backgroundImage="/images/young-professional-working.jpg"
        theme="red"
        primaryCta={{
          label: 'Request a government partnership briefing',
          href: '#contact',
        }}
        secondaryCta={{
          label: 'Ask for references & evaluation summaries',
          href: '#contact',
        }}
      />

      {/* At A Glance Section */}
      <section className="pt-32 pb-0 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-[var(--aw-red)] to-transparent" />
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Overview"
            headline="America Works at a glance"
            centered
          />
          <GlanceGrid items={glanceItems} />
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-32 bg-white">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Innovation"
            headline="National reach. Startup agility."
            intro="We have more flexibility to innovate than any other organization in our field. We're big enough to scale, small enough to adapt, and always asking: does this actually work?"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-50 p-10 rounded">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-[var(--aw-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-display text-xl text-gray-900">Customizable by design</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">We operate nationwide but function like a nimble organization that adjusts to the specific needs of each funder. Your priorities become our program design.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-[var(--aw-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="font-display text-xl text-gray-900">Effectiveness-obsessed</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Our focus is always "will this work?" We test new ideas, measure outcomes rigorously, and scale what succeeds. If something isn't working, we change it.</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-16">
            <h3 className="font-display text-2xl text-gray-900 text-center mb-12">At the forefront of workforce innovation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'scale', title: 'Pre-trial bail reform', desc: 'Diverting newly arrested individuals from incarceration to employment' },
                { icon: 'users', title: 'Community intervention', desc: 'Multi-tiered programs working directly with gang-involved individuals' },
                { icon: 'heart', title: 'Mental health integration', desc: 'Employment services embedded directly within mental health facilities' },
                { icon: 'monitor', title: 'Digital & financial literacy', desc: 'Computer skills and personal finance training integrated into job prep' },
                { icon: 'building', title: 'Faith-based partnerships', desc: 'Collaborative programs leveraging community and religious organizations' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 transition-all">
                  <div className="w-5 h-5 text-[var(--aw-red)] flex-shrink-0 mt-1">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Experience Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Approach"
            headline="A space designed for success."
            intro="The environment where people prepare for work matters. Our offices are designed to be welcoming, professional, and focused. Staff greet participants by name. Conversations happen face-to-face. From the first visit, the message is clear: you belong here."
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {[
              { icon: 'heart-handshake', title: 'Client-centered service model', desc: 'We use the term "client" intentionally. The people we serve aren\'t here to serve us. We\'re here to serve them with the same attentiveness and respect they\'ll experience in the workplace.' },
              { icon: 'users', title: 'Small caseloads, real relationships', desc: 'Career specialists maintain manageable caseloads so they can provide individualized attention, track progress, and respond quickly when challenges arise.' },
              { icon: 'building', title: 'Professional environment, professional outcomes', desc: 'Our offices model workplace standards. Participants engage in a setting that reinforces the expectations and norms of professional employment.' },
              { icon: 'hand', title: 'Hands-on support', desc: 'Our staff work alongside participants on practical barriers: transportation, childcare, documentation, interview preparation, and workplace navigation.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-10 rounded border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 text-[var(--aw-red)]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section id="evidence" className="py-32 bg-white">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Validation"
            headline="Independent evidence & external validation"
            intro="America Works has been studied, profiled, and selected by respected evaluators and government agencies. A sampling:"
            centered
          />
          <EvidenceGrid items={evidenceItems} />
        </div>
      </section>

      {/* Populations Section */}
      <section id="populations" className="py-32 bg-white">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Populations"
            headline="Where America Works already delivers results"
            intro="America Works designs programs around specific populations and funding streams. Below is a snapshot of who we serve and the types of programs we operate."
            centered
          />
          <MatrixGrid items={matrixItems} />
        </div>
      </section>

      {/* Scorecard Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Partnership"
            headline="Government partner scorecard"
            intro="A quick view of why America Works is a low-risk, high-impact partner for large public contracts."
            centered
          />
          <ScorecardGrid items={scorecardItems} />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-px bg-gradient-to-r from-transparent via-[var(--aw-red)] to-transparent" />
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="History"
            headline="40 Years of Work-First Leadership"
            centered
          />
          <div className="mt-20">
            <AboutTimeline items={timelineItems} />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Mission"
            headline="A company with a conscience"
            centered
          />

          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Called "a company with a conscience", America Works was founded in 1984 by social activist and entrepreneur, Peter Cove, who wanted to put his ideals about poverty and the American dream into practice.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Joined by Dr. Lee Bowes as the CEO, America Works has helped nearly 2,000,000 individuals increase their self-sufficiency through gainful employment, including military veterans, welfare and SNAP recipients, young adults, the criminal justice involved, homeless, non-custodial parents, persons receiving disability, among others.
            </p>
            <div className="p-8 bg-white border-l-4 border-[var(--aw-red)] text-base text-gray-800 leading-relaxed">
              <strong className="text-black font-semibold">America Works is a 100% Women-Owned Business.</strong> Our mission is to equip each individual who comes to our offices with the right tools so that they are able to provide for themselves and their loved ones. We believe the most effective approach in helping people out of poverty is by assisting them in finding meaningful employment. Our proven methods, services and experienced staff offer the right combination for success.
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-32 bg-white">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Leadership"
            headline="Our Founders"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            {/* Peter Cove */}
            <div className="founder-card">
              <div className="mb-8 overflow-hidden rounded border border-gray-200">
                <img
                  src="/images/PETER-COVE.jpg"
                  alt="Peter Cove"
                  className="w-full h-auto block transition-transform duration-400 hover:scale-[1.02]"
                />
              </div>
              <div className="mb-8 pb-8 border-b-2 border-gray-200">
                <h3 className="font-display text-3xl font-normal text-black mb-2 tracking-tight">Peter Cove</h3>
                <div className="font-mono text-sm uppercase tracking-wide text-[var(--aw-red)] font-semibold">Founder</div>
              </div>
              <div className="text-base text-gray-700 leading-relaxed space-y-5">
                <p>
                  Peter Cove, a social activist and businessmen, is one of the nation's leading advocates for private solutions to workforce development and alleviating poverty.
                </p>
                <p>
                  As the founder of America Works in 1984, Peter Cove has worked to link private-sector investment and employment with welfare reform. Peter Cove has also devoted his energy to prisoner reentry initiatives, advocating tirelessly for second chance legislation on a national level, to inform policy makers that the work first model of services is the answer for successful reintegration of ex-offenders into communities.
                </p>
                <p>
                  Peter Cove has a book published, <em>Poor No More: Rethinking Dependency and the War on Poverty</em>, as well as numerous articles in the New York Post, Real Clear Policy, the Huffington Post, and elsewhere.
                </p>
              </div>
            </div>

            {/* Dr. Lee Bowes */}
            <div className="founder-card">
              <div className="mb-8 overflow-hidden rounded border border-gray-200">
                <img
                  src="/images/DR.LEE-BOWES.jpg"
                  alt="Dr. Lee Bowes"
                  className="w-full h-auto block transition-transform duration-400 hover:scale-[1.02]"
                />
              </div>
              <div className="mb-8 pb-8 border-b-2 border-gray-200">
                <h3 className="font-display text-3xl font-normal text-black mb-2 tracking-tight">Dr. Lee Bowes</h3>
                <div className="font-mono text-sm uppercase tracking-wide text-[var(--aw-red)] font-semibold">CEO</div>
              </div>
              <div className="text-base text-gray-700 leading-relaxed space-y-5">
                <p>
                  Dr. Lee Bowes is one of the leading experts on Welfare to Work and Prison to Work Workforce Development policies. In the 1990's, Dr. Lee Bowes and her husband, Peter Cove, were instrumental in educating both political parties about the merits of implementing a national "Work First" policy.
                </p>
                <p>
                  She is a frequent guest and speaker at associations that deal with welfare to work policies. She has been a speaker at The Public Welfare Association, the Democratic Leadership Council, The Renaissance Weekend, and the Association of Community Development Corporations.
                </p>
                <p>
                  Dr. Lee Bowes has held the position of CEO since 1987. Dr. Bowes was an adjunct professor at Columbia University's School of International and Public Affairs. She lectures on Human Resource Management, Social Policy, and Innovative Management Techniques.
                </p>
                <p>
                  Dr. Lee Bowes has a book published, <em>No One Need Apply: Getting and Keeping the Best Workers</em>, as well as numerous articles in the New York Post, the Huffington Post, and elsewhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to see what this could look like in your state?"
        description=""
      >
        <ul className="list-none max-w-3xl mx-auto mb-12 text-left space-y-5">
          <li className="relative pl-8 text-lg text-white/90 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[0.5rem] before:w-1.5 before:h-1.5 before:bg-[var(--aw-red)] before:rounded-full before:shadow-[0_0_10px_rgba(236,20,12,0.5)]">
            30-60 minute briefing on how our model would adapt to <strong className="text-white font-semibold">your TANF, SNAP E&T, disability, reentry, or youth programs</strong>
          </li>
          <li className="relative pl-8 text-lg text-white/90 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[0.5rem] before:w-1.5 before:h-1.5 before:bg-[var(--aw-red)] before:rounded-full before:shadow-[0_0_10px_rgba(236,20,12,0.5)]">
            Concrete examples of <strong className="text-white font-semibold">program designs and performance metrics</strong> from comparable jurisdictions
          </li>
          <li className="relative pl-8 text-lg text-white/90 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[0.5rem] before:w-1.5 before:h-1.5 before:bg-[var(--aw-red)] before:rounded-full before:shadow-[0_0_10px_rgba(236,20,12,0.5)]">
            Opportunity to speak directly with <strong className="text-white font-semibold">peer agencies</strong> that have contracted with America Works
          </li>
        </ul>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="white" href="#contact" arrow>
            Request a government partnership briefing
          </Button>
          <Button variant="outline" href="#contact">
            Ask for references & evaluation summaries
          </Button>
        </div>
      </CTASection>
    </div>
  )
}

export default About
