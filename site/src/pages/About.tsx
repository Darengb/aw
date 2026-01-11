import PageHero from '../components/shared/PageHero';
import GlanceGrid from '../components/shared/GlanceGrid';
import EvidenceGrid from '../components/shared/EvidenceGrid';
import MatrixGrid from '../components/shared/MatrixGrid';
import ScorecardGrid from '../components/shared/ScorecardGrid';
import AboutTimeline from '../components/shared/AboutTimeline';

// At A Glance Data
const glanceItems = [
  { icon: "award", boldText: "Independently evaluated", regularText: "by third-party organizations" },
  { icon: "building-2", boldText: "Proven performance in federal, state, city and county workforce programs", regularText: "" },
  { icon: "users", boldText: "Specializes in hardest-to-serve populations", regularText: "(welfare/SNAP, disability, justice-involved, homeless veterans)" },
  { icon: "target", boldText: "Operates under performance-based contracts", regularText: ", paid on outcomes" },
  { icon: "map", boldText: "Multi-state, multi-year", regularText: "contract experience with complex public systems" },
  { icon: "landmark", boldText: "Regularly advise the White House and Congress", regularText: "on welfare reform and TANF improvements" }
];

// Innovation Items
const innovationItems = [
  { icon: "scale", title: "Pre-trial bail reform", description: "Diverting newly arrested individuals from incarceration to employment" },
  { icon: "users", title: "Community intervention", description: "Multi-tiered programs working directly with gang-involved individuals" },
  { icon: "heart-pulse", title: "Mental health integration", description: "Employment services embedded directly within mental health facilities" },
  { icon: "monitor", title: "Digital & financial literacy", description: "Computer skills and personal finance training integrated into job prep" },
  { icon: "church", title: "Faith-based partnerships", description: "Collaborative programs leveraging community and religious organizations" }
];

// Client Experience Items
const clientExperienceItems = [
  { icon: "heart-handshake", title: "Client-centered service model", description: "We use the term \"client\" intentionally. The people we serve aren't here to serve us. We're here to serve them with the same attentiveness and respect they'll experience in the workplace." },
  { icon: "users", title: "Small caseloads, real relationships", description: "Career specialists maintain manageable caseloads so they can provide individualized attention, track progress, and respond quickly when challenges arise." },
  { icon: "building", title: "Professional environment, professional outcomes", description: "Our offices model workplace standards. Participants engage in a setting that reinforces the expectations and norms of professional employment." },
  { icon: "hand-helping", title: "Hands-on support", description: "Our staff work alongside participants on practical barriers: transportation, childcare, documentation, interview preparation, and workplace navigation." }
];

// Evidence Items
const evidenceItems = [
  {
    title: "Ernst & Young – Welfare-to-Work Study",
    bullets: [
      "Reviewed early America Works welfare-to-work programs.",
      "Found <strong class=\"text-black font-semibold\">85–90% of clients still employed one year after placement</strong>.",
      "Highlighted performance-based contracts as improving outcomes and value for municipalities."
    ],
    whyMatters: "Long-term retention for welfare populations, verified by a major global firm."
  },
  {
    title: "Manhattan Institute – Ticket to Work Case Study",
    bullets: [
      "Profiled America Works as a leading <strong class=\"text-black font-semibold\">Ticket to Work Employment Network</strong>.",
      "In one year: <strong class=\"text-black font-semibold\">1,295</strong> disability beneficiaries enrolled; <strong class=\"text-black font-semibold\">626</strong> placed into gainful employment.",
      "In New York, <strong class=\"text-black font-semibold\">75% of successfully hired clients reached at least 12 months of employment</strong>."
    ],
    whyMatters: "Proven sustained employment for disability beneficiaries under a federal, performance-based program."
  },
  {
    title: "Fraser Institute, NYS Dept. of Labor & Others",
    bullets: [
      "New York State data showed <strong class=\"text-black font-semibold\">88% of people placed by America Works remained off welfare three years later</strong>.",
      "Analyses by the <strong class=\"text-black font-semibold\">Fraser Institute</strong>, <strong class=\"text-black font-semibold\">Social Market Foundation</strong>, and <strong class=\"text-black font-semibold\">National Center for Policy Analysis</strong> highlighted America Works as <strong class=\"text-black font-semibold\">both effective and lower-cost</strong> than comparable government programs."
    ],
    whyMatters: "Independent confirmation of <strong class=\"text-black font-semibold\">durable welfare exits</strong> and strong value for money."
  },
  {
    title: "Urban Institute – Criminal Justice Employment Model",
    bullets: [
      "The <strong class=\"text-black font-semibold\">Urban Institute</strong> profiled America Works' <strong class=\"text-black font-semibold\">Criminal Justice Program</strong> as a national example of employment-focused reentry.",
      "Early evaluation results: hundreds of people leaving incarceration placed into jobs, with strong 90-day and 6-month retention."
    ],
    whyMatters: "Shows impact with <strong class=\"text-black font-semibold\">justice-involved individuals</strong>, a high-priority, high-risk population."
  },
  {
    title: "Manhattan Institute – \"Making Welfare-to-Work Fly\"",
    bullets: [
      "Published an issue brief by founder Peter Cove on <strong class=\"text-black font-semibold\">performance-based social service contracts</strong>.",
      "Highlighted America Works' model as delivering <strong class=\"text-black font-semibold\">better results and better value</strong> than traditional training programs."
    ],
    whyMatters: "Positions the model itself as a <strong class=\"text-black font-semibold\">reference point in welfare reform</strong>, not just another vendor."
  },
  {
    title: "USDA / Mathematica – SNAP E&T Rapid-Cycle Evaluation (DC)",
    bullets: [
      "America Works selected as one of the providers in a <strong class=\"text-black font-semibold\">USDA-funded SNAP E&T innovation pilot</strong> in D.C.",
      "Implemented an enhanced, goal-based case management model tested by <strong class=\"text-black font-semibold\">Mathematica</strong> using rapid-cycle evaluation methods."
    ],
    whyMatters: "Trusted to deliver in a <strong class=\"text-black font-semibold\">federally sponsored, data-driven pilot</strong> focused on engagement and outcomes."
  },
  {
    title: "U.S. HHS / OPRE – TANF Job Search Evaluation (NYC)",
    bullets: [
      "Included as one of the vendors in the <strong class=\"text-black font-semibold\">Job Search Assistance Strategies Evaluation</strong>, alongside Goodwill.",
      "Operated job-search assistance sites in Brooklyn and Queens as part of a <strong class=\"text-black font-semibold\">federal evaluation of alternative TANF models</strong>."
    ],
    whyMatters: "Demonstrates the ability to operate within <strong class=\"text-black font-semibold\">rigorous federal evaluation frameworks</strong>."
  },
  {
    title: "HHS / ASPE – Federal Review of Welfare Privatization",
    bullets: [
      "The U.S. Department of Health and Human Services (HHS), through its Office of the Assistant Secretary for Planning and Evaluation (ASPE), commissioned \"Privatization of Welfare Services: A Review of the Literature.\"",
      "That review identifies America Works as a key example of a for-profit, performance-based employment services provider working with welfare recipients across multiple states."
    ],
    whyMatters: "America Works is singled out in a federal research overview as a notable case of performance-based private welfare service delivery."
  }
];

// Populations Matrix
const populationsData = [
  {
    title: "Welfare & SNAP Recipients",
    programTypes: "TANF, SNAP Employment & Training, welfare-to-work",
    whatWeDo: "Work-first model with job readiness, rapid job search, employer connections, and retention support.",
    impact: "Independent evaluations document high 12-month retention and reduced long-term reliance on benefits."
  },
  {
    title: "Disability Beneficiaries",
    programTypes: "Ticket to Work (EN), benefits counseling, WIPA-related services",
    whatWeDo: "Benefits counseling, individual work plans, job readiness, placement, and long-term coaching.",
    impact: "Hundreds of beneficiaries placed each year; majority of successful hires sustaining at least 12 months of work under Ticket to Work milestones."
  },
  {
    title: "Justice-Involved Individuals",
    programTypes: "Reentry employment programs, criminal justice employment initiatives",
    whatWeDo: "Outreach in corrections settings, structured readiness training, supported job search, and follow-up after release.",
    impact: "Documented placements and multi-month retention outcomes for individuals returning from incarceration."
  },
  {
    title: "Homeless & Homeless Veterans",
    programTypes: "Homelessness and veteran-focused employment programs",
    whatWeDo: "Employment services integrated with housing and support partners; attention to practical barriers like clothing, transportation, and documentation.",
    impact: "Thousands of homeless individuals—including homeless veterans—placed into employment using a model adapted from welfare-to-work successes."
  },
  {
    title: "Youth, Young Adults & Other High-Barrier Groups",
    programTypes: "Youth employment, young adult workforce, non-custodial parent programs",
    whatWeDo: "Soft-skills training, entry-level job placement, and pathways to better-paying roles via experience and credentials.",
    impact: "Consistent application of a work-first + wraparound support model across multiple high-priority, high-barrier populations.",
    fullWidth: true
  }
];

// Scorecard Items
const scorecardItems = [
  {
    title: "Contracting & Scale",
    bullets: [
      "Multi-state operations across a range of policy and labor-market environments.",
      "Experience with multi-million-dollar, multi-year contracts in workforce and human services.",
      "Ability to stand up new operations quickly when required by contract timelines."
    ]
  },
  {
    title: "Compliance & Reporting",
    bullets: [
      "Comfortable under performance-based contracts with strict audit and monitoring requirements.",
      "Built-in tracking of participant engagement, job placements, retention milestones, earnings and benefit changes.",
      "History of successful audits and evaluations at city, state, and federal levels."
    ]
  },
  {
    title: "Prestige & Policy Involvement",
    bullets: [
      "Praised by a U.S. Vice President as a \"fantastic example\" of market-oriented solutions.",
      "Engaged as expert partners during 1996 welfare reform, working with the White House and congressional leadership.",
      "Leadership invited to testify before the U.S. House Committee on Ways and Means on improving TANF outcomes.",
      "Leadership recognized with national honors including Socially Responsible Entrepreneur of the Year."
    ]
  }
];

// Timeline Items
const timelineItems = [
  { year: "1984", title: "Founding", description: "Peter Cove founded America Works as an experiment to prove his philosophy about helping those in poverty through work." },
  { year: "1992", title: "VP Dan Quayle Visits", description: "Vice President praised America Works as a \"fantastic example\" of market-oriented solutions to unemployment and poverty." },
  { year: "1995", title: "Entrepreneur of the Year", description: "Peter Cove awarded Socially Responsible Entrepreneur of The Year for achievements with America Works." },
  { year: "1996", title: "Clinton Partners with AW", description: "Peter Cove and Dr. Lee Bowes brought in as experts to help craft Welfare Reform in 1996." },
  { year: "2000", title: "Making Welfare-to-Work Fly", description: "Manhattan Institute publishes brief demonstrating performance-based contracts provide better results." },
  { year: "2011", title: "Stevies Awards", description: "Dr. Lee Bowes awarded the Stevie's Award for Lifetime Achievement for her successes at America Works." },
  { year: "2015", title: "House Committee Testimony", description: "Peter Cove invited to speak on Next Steps for Welfare Reform before the House Committee on Ways and Means." }
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="Impact & About"
        headline="Proven impact for the hardest-to-serve."
        subheadline="America Works delivers performance-based employment outcomes for welfare, disability, reentry, and homelessness programs across multiple states under rigorous oversight and evaluation."
        image="/images/young-professional-working.jpg"
        imageAlt="Proven impact"
        primaryCta={{ href: "#contact", label: "Request a government partnership briefing" }}
        secondaryCta={{ href: "#contact", label: "Ask for references & evaluation summaries" }}
      />

      {/* At A Glance */}
      <section className="at-a-glance pt-32 pb-0 bg-white relative">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-16">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">Overview</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900">America Works at a glance</h2>
          </header>

          <GlanceGrid items={glanceItems} />
        </div>
      </section>

      {/* Innovation */}
      <section className="py-32 bg-white">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Innovation</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">National reach. Startup agility.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We have more flexibility to innovate than any other organization in our field. We're big enough to scale, small enough to adapt, and always asking: does this actually work?
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-50 p-10 rounded">
              <div className="flex items-center gap-3 mb-4">
                <i data-lucide="settings-2" className="w-6 h-6 text-aw-blue"></i>
                <h3 className="font-display text-xl text-gray-900">Customizable by design</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">We operate nationwide but function like a nimble organization that adjusts to the specific needs of each funder. Your priorities become our program design.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded">
              <div className="flex items-center gap-3 mb-4">
                <i data-lucide="flask-conical" className="w-6 h-6 text-aw-blue"></i>
                <h3 className="font-display text-xl text-gray-900">Effectiveness-obsessed</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Our focus is always "will this work?" We test new ideas, measure outcomes rigorously, and scale what succeeds. If something isn't working, we change it.</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-16">
            <h3 className="font-display text-2xl text-gray-900 text-center mb-12">At the forefront of workforce innovation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovationItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 transition-all">
                  <i data-lucide={item.icon} className="w-5 h-5 text-aw-red flex-shrink-0 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Experience */}
      <section className="py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Approach</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">A space designed for success.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The environment where people prepare for work matters. Our offices are designed to be welcoming, professional, and focused. Staff greet participants by name. Conversations happen face-to-face. From the first visit, the message is clear: you belong here.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clientExperienceItems.map((item, index) => (
              <div key={index} className="bg-white p-10 rounded border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <i data-lucide={item.icon} className="w-6 h-6 text-aw-red"></i>
                  <h3 className="font-display text-xl text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Independent Evidence */}
      <section className="py-32 bg-white" id="evidence">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Validation</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Independent evidence & external validation</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              America Works has been studied, profiled, and selected by respected evaluators and government agencies. A sampling:
            </p>
          </header>

          <EvidenceGrid items={evidenceItems} />
        </div>
      </section>

      {/* Where We Deliver */}
      <section className="py-32 bg-white" id="populations">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Populations</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Where America Works already delivers results</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              America Works designs programs around specific populations and funding streams. Below is a snapshot of who we serve and the types of programs we operate.
            </p>
          </header>

          <MatrixGrid items={populationsData} />
        </div>
      </section>

      {/* Government Partner Scorecard */}
      <section className="py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Partnership</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Government partner scorecard</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A quick view of why America Works is a low-risk, high-impact partner for large public contracts.
            </p>
          </header>

          <ScorecardGrid items={scorecardItems} />
        </div>
      </section>

      {/* Timeline */}
      <AboutTimeline items={timelineItems} />

      {/* History */}
      <section className="py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Mission</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900">A company with a conscience</h2>
          </header>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Called "a company with a conscience", America Works was founded in 1984 by social activist and entrepreneur, Peter Cove, who wanted to put his ideals about poverty and the American dream into practice.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Joined by Dr. Lee Bowes as the CEO, America Works has helped nearly 2,000,000 individuals increase their self-sufficiency through gainful employment, including military veterans, welfare and SNAP recipients, young adults, the criminal justice involved, homeless, non-custodial parents, persons receiving disability, among others.
            </p>
            <div className="history-highlight p-8 bg-white border-l-4 border-aw-red text-base text-gray-800 leading-relaxed mt-8">
              <strong className="text-black font-semibold">America Works is a 100% Women-Owned Business.</strong> Our mission is to equip each individual who comes to our offices with the right tools so that they are able to provide for themselves and their loved ones. We believe the most effective approach in helping people out of poverty is by assisting them in finding meaningful employment. Our proven methods, services and experienced staff offer the right combination for success.
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-32 bg-white" id="founders">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Leadership</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900">Our Founders</h2>
          </header>

          <div className="founders-grid grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            {/* Peter Cove */}
            <div className="founder-card">
              <div className="founder-image mb-8 overflow-hidden rounded border border-gray-200">
                <img src="/images/PETER-COVE.jpg" alt="Peter Cove" className="w-full h-auto block transition-transform duration-400 hover:scale-102" />
              </div>
              <div className="founder-header mb-8 pb-8 border-b-2 border-gray-200">
                <h3 className="font-display text-3xl font-normal text-black mb-2 tracking-tight">Peter Cove</h3>
                <div className="font-mono text-sm uppercase tracking-wide text-aw-red font-semibold">Founder</div>
              </div>
              <div className="founder-bio text-base text-gray-700 leading-relaxed space-y-5">
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
              <div className="founder-image mb-8 overflow-hidden rounded border border-gray-200">
                <img src="/images/DR.LEE-BOWES.jpg" alt="Dr. Lee Bowes" className="w-full h-auto block transition-transform duration-400 hover:scale-102" />
              </div>
              <div className="founder-header mb-8 pb-8 border-b-2 border-gray-200">
                <h3 className="font-display text-3xl font-normal text-black mb-2 tracking-tight">Dr. Lee Bowes</h3>
                <div className="font-mono text-sm uppercase tracking-wide text-aw-red font-semibold">CEO</div>
              </div>
              <div className="founder-bio text-base text-gray-700 leading-relaxed space-y-5">
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

      {/* CTA */}
      <section className="cta-section py-32 bg-gray-950 text-white text-center relative overflow-hidden" id="contact">
        <div className="container max-w-container mx-auto px-8">
          <div className="cta-content relative z-[2]">
            <h2 className="font-display text-display-md font-normal mb-6 tracking-tight">Ready to see what this could look like in your state?</h2>
            <ul className="cta-list list-none max-w-3xl mx-auto mb-12 text-left space-y-5">
              <li className="relative pl-8 text-lg text-white/90 leading-relaxed">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-aw-red rounded-full shadow-[0_0_10px_rgba(236,20,12,0.5)]"></span>
                30–60 minute briefing on how our model would adapt to <strong className="text-white font-semibold">your TANF, SNAP E&T, disability, reentry, or youth programs</strong>
              </li>
              <li className="relative pl-8 text-lg text-white/90 leading-relaxed">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-aw-red rounded-full shadow-[0_0_10px_rgba(236,20,12,0.5)]"></span>
                Concrete examples of <strong className="text-white font-semibold">program designs and performance metrics</strong> from comparable jurisdictions
              </li>
              <li className="relative pl-8 text-lg text-white/90 leading-relaxed">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-aw-red rounded-full shadow-[0_0_10px_rgba(236,20,12,0.5)]"></span>
                Opportunity to speak directly with <strong className="text-white font-semibold">peer agencies</strong> that have contracted with America Works
              </li>
            </ul>
            <div className="cta-buttons flex gap-5 justify-center flex-wrap">
              <a href="#" className="btn-white inline-flex items-center gap-2 py-5 px-12 bg-white text-gray-950 rounded-md font-body text-sm font-semibold no-underline shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
                <span>Request a government partnership briefing</span>
                <i data-lucide="arrow-right" style={{ width: '18px', height: '18px' }}></i>
              </a>
              <a href="#" className="btn-outline-white inline-flex items-center gap-2 py-5 px-12 bg-transparent text-white border-2 border-white/50 rounded-md font-body text-sm font-semibold no-underline hover:bg-white/10 hover:border-white hover:-translate-y-0.5 transition-all duration-300">
                <span>Ask for references & evaluation summaries</span>
                <i data-lucide="file-text" style={{ width: '18px', height: '18px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
