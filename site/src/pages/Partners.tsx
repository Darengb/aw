import type { TrustItem, ListItem, FeatureItem, ProcessStep, FAQItem, TestimonialProps, NavLink } from '../lib/types'
import { PageHero } from '../components/heroes/PageHero'
import { SecondaryNav } from '../components/layout/SecondaryNav'
import { TrustStrip } from '../components/grids/TrustStrip'
import { ListGrid } from '../components/grids/ListGrid'
import { FeatureGrid } from '../components/grids/FeatureGrid'
import {
  SplitSection,
  SplitLabel,
  SplitHeadline,
  SplitDescription,
} from '../components/sections/SplitSection'
import { SectionHeader } from '../components/sections/SectionHeader'
import { ProcessGrid } from '../components/sections/ProcessGrid'
import { TestimonialCard } from '../components/cards/TestimonialCard'
import { FAQAccordion } from '../components/interactive/FAQAccordion'
import { CTASection } from '../components/sections/CTASection'
import { Button } from '../components/ui/Button'

// Trust strip stats
const trustStats: TrustItem[] = [
  {
    number: '40+',
    label: 'Years in workforce solutions and welfare-to-work',
  },
  {
    number: '~2M',
    label: 'Individuals helped increase self-sufficiency through employment',
  },
  {
    number: '100s',
    label: 'Partnerships with local, state & federal agencies',
  },
  {
    number: 'Multi-state',
    label: 'Hybrid performance-based contracts active in major cities',
  },
]

// Partnership types
const partnershipTypes: ListItem[] = [
  {
    icon: 'briefcase',
    text: 'TANF and SNAP Employment & Training programs',
  },
  {
    icon: 'users',
    text: 'Workforce programs funded under WIOA',
  },
  {
    icon: 'shield',
    text: 'Corrections and reentry services',
  },
  {
    icon: 'accessibility',
    text: 'Disability employment programs (Ticket to Work)',
  },
  {
    icon: 'graduation-cap',
    text: 'Youth and young-adult workforce initiatives',
  },
  {
    icon: 'building',
    text: 'Local economic and workforce development agencies',
  },
]

// Service model features
const serviceModelFeatures: FeatureItem[] = [
  {
    icon: 'check-circle',
    title: 'Work readiness',
    description: 'Hard + soft skills training',
  },
  {
    icon: 'book-open',
    title: 'Training',
    description: 'Aligned to local labor demand',
  },
  {
    icon: 'briefcase',
    title: 'Job development',
    description: 'Placement and matching services',
  },
  {
    icon: 'trending-up',
    title: 'Ongoing support',
    description: 'Advancement services and retention',
  },
]

// Work-first model process steps
const workFirstSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Work readiness',
    description:
      'We build both hard and soft skills that employers need—communication, customer service, computer literacy, workplace expectations and more—so participants are prepared to succeed, not just to interview.',
  },
  {
    number: '02',
    title: 'Training & education',
    description:
      'We connect participants to certificate programs, ESL, high school equivalency, and other training aligned with local labor market demand, so every hour invested supports a viable career goal.',
  },
  {
    number: '03',
    title: 'Employment & placement',
    description:
      'As soon as participants are ready, we match their goals and work history to open opportunities using our employer network. We fast-track them to interviews and help agencies meet placement targets.',
  },
  {
    number: '04',
    title: 'Support & advancement',
    description:
      'Once participants enter employment, we provide transition support, problem-solving, and additional training and certifications, helping them retain their jobs, increase their earnings, and reduce returns to public assistance.',
  },
]

// Why agencies choose us
const whyPartnerFeatures: FeatureItem[] = [
  {
    icon: 'target',
    title: 'Specialists in workforce solutions',
    description:
      'Our sole focus is workforce and welfare-to-work programming, with a long history of helping people who face multiple barriers to employment.',
  },
  {
    icon: 'award',
    title: 'Deep experience',
    description:
      "Our leadership has been involved in workforce solutions since the 1960s, and America Works has been helping launch careers since 1984.",
  },
  {
    icon: 'heart',
    title: 'Mission-driven staff',
    description:
      'We hire people who care about their communities and are committed to helping individuals and families in need move toward self-sufficiency.',
  },
  {
    icon: 'zap',
    title: 'Rapid implementation',
    description:
      "We have opened new offices with as little as a month's notice, allowing agencies to stand up new programs quickly.",
  },
  {
    icon: 'bar-chart-3',
    title: 'Top-performing vendor',
    description:
      'America Works consistently ranks among the top vendors wherever we operate, based on performance metrics and contract outcomes.',
  },
  {
    icon: 'sliders',
    title: 'Versatile and adaptable',
    description:
      'We can align program design and data reporting to your requirements while maintaining strong results.',
  },
]

// Performance-based contracting features
const performanceFeatures: FeatureItem[] = [
  {
    icon: 'dollar-sign',
    title: 'Outcome-focused fees',
    description:
      'Our contracts are typically structured around outcomes such as employment, retention, and earnings, not just activities or participation.',
  },
  {
    icon: 'trending-up',
    title: 'Evidence of cost-effectiveness',
    description:
      'Evaluations have found that performance-based models like ours, while sometimes higher-cost upfront, can be more cost-effective over time as clients stay employed longer and rely less on public benefits.',
  },
  {
    icon: 'file-text',
    title: 'Transparent data and reporting',
    description:
      'We support robust tracking and reporting to meet monitoring, audit, and evaluation requirements, including participation, placement, retention, and earnings.',
  },
]

// Implementation process steps
const implementationSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Co-design & planning',
    description:
      'We start by understanding your policy goals, funding streams, and performance requirements. Together, we define target populations, service flows, and outcome metrics that align with your strategy and federal guidelines.',
  },
  {
    number: '02',
    title: 'Rapid stand-up of operations',
    description:
      "We recruit and train staff, secure and equip office locations where needed, and connect with local employer and community networks. Our history includes standing up new locations within about a month of contract award when necessary.",
  },
  {
    number: '03',
    title: 'Service delivery & continuous improvement',
    description:
      'We deliver the full blend of services—outreach, assessment, work readiness, training, placement, and retention—while using data to monitor progress and continuously refine strategies.',
  },
  {
    number: '04',
    title: 'Reporting, evaluation & scaling',
    description:
      'We provide regular performance reports and collaborate on evaluations to support accountability and inform future policy. Successful pilots can be scaled to additional sites or populations.',
  },
]

// Testimonials
const testimonials: TestimonialProps[] = [
  {
    quote:
      'America Works is a program that has the best staff. They helped me close my TANF case and move into steady employment.',
    author: 'Congressional Testimony',
  },
  {
    quote:
      'I remember when I was a member of America Works, the reps really helped me through rough times and helped me find employment—really nice people.',
    author: 'Former Client',
  },
  {
    quote:
      "After decades in the welfare-to-work field, America Works' leadership has been at the forefront of advocating for performance-based contracts that tie funding to results.",
    author: 'Policy Research Analysis',
  },
]

// FAQ items
const faqItems: FAQItem[] = [
  {
    question: 'What kinds of contracts does America Works typically operate under?',
    answer:
      'We work under a range of contract structures, including hybrid and fully performance-based models, cost reimbursement with performance incentives, and braided funding arrangements across TANF, SNAP E&T, WIOA, and local funds. We tailor contract structures to your regulatory environment and reporting needs.',
  },
  {
    question: 'How do you ensure accountability and data quality?',
    answer:
      'We build data and reporting requirements into program design from the start, aligning with federal and state rules. Our teams track participation, services, placements, retention, and earnings, and we regularly participate in third-party evaluations and audits.',
  },
  {
    question: 'Can you work in both urban and rural areas?',
    answer:
      'Yes. We have operated programs in large metro areas and smaller communities, adapting services and staffing models to local labor markets and transportation realities.',
  },
  {
    question: 'How quickly can you launch a new program?',
    answer:
      'Timelines depend on scope and procurement requirements, but we have a track record of establishing new offices and operations within short timeframes—sometimes within a month of award—when needed.',
  },
  {
    question: 'What populations do you have experience serving?',
    answer:
      'We have extensive experience with TANF and SNAP participants, young adults, military veterans, individuals who have experienced homelessness, justice-involved individuals, non-custodial parents, and people receiving disability benefits.',
  },
  {
    question: 'Do you only serve one state or region?',
    answer:
      'No. We operate in multiple states and the District of Columbia through a network of legally separate but coordinated entities, offering both in-person and virtual services.',
  },
]

// Secondary nav links for this page
const secondaryNavLinks: NavLink[] = [
  { label: 'Services', href: '#service-model' },
  { label: 'Why Partner', href: '#why-partner' },
  { label: 'Process', href: '#implementation' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Partners() {
  return (
    <div className="theme-blue">
      {/* Secondary Navigation */}
      <SecondaryNav links={secondaryNavLinks} />

      {/* Hero Section */}
      <PageHero
        label="Government Partnerships"
        title="Proven performance-based workforce outcomes."
        subtitle="Partnering with government agencies for 40+ years to deliver performance-based workforce programs that achieve measurable outcomes."
        backgroundImage="/images/business-career-and-placement.jpg"
        theme="blue"
        primaryCta={{
          label: 'Talk to our partnerships team',
          href: '#contact',
        }}
        secondaryCta={{
          label: 'Discuss your program or RFP',
          href: '#contact',
        }}
      />

      {/* Trust Strip */}
      <TrustStrip items={trustStats} />

      {/* Who We Partner With Section */}
      <section className="py-24 bg-gray-50" id="partnerships">
        <div className="max-w-[var(--container-xl)] mx-auto px-8">
          <SectionHeader
            label="Partnerships"
            headline="Who we partner with—and how we help."
            intro="America Works collaborates with public agencies and community-based organizations across the country to deliver employment and training services in both urban and rural settings. We tailor each program to local needs while staying true to our work-first, outcomes-driven approach."
            centered
          />

          <h3 className="font-display text-2xl text-center mb-8 font-normal tracking-tight">
            We commonly partner with agencies responsible for:
          </h3>

          <ListGrid items={partnershipTypes} columns={3} />
        </div>
      </section>

      {/* Service Model Section */}
      <SplitSection
        image="/images/resume-coaching.jpg"
        imageAlt="Blended service model"
        blue
      >
        <div id="service-model">
          <SplitLabel blue>Service Model</SplitLabel>
          <SplitHeadline>Our blended service model</SplitHeadline>
          <SplitDescription>
            Our programs typically combine work readiness, training, job placement, and
            retention services into a single integrated pathway—so participants move as
            quickly as possible into work while building skills for advancement.
          </SplitDescription>
          <FeatureGrid items={serviceModelFeatures} columns={2} />
        </div>
      </SplitSection>

      {/* Work-First Model Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[var(--container-xl)] mx-auto px-8">
          <SectionHeader
            label="Model"
            headline="A work-first model built around measurable outcomes."
            intro="Our approach is grounded in the belief that meaningful employment is the most effective path out of poverty. We design programs that prioritize rapid attachment to work, backed by training, wraparound services, and ongoing support to sustain employment."
            centered
          />

          <ProcessGrid items={workFirstSteps} variant="minimal" />
        </div>
      </section>

      {/* Why Work With Us Section */}
      <SplitSection
        image="/images/business-career-and-placement.jpg"
        imageAlt="Agency partnership"
        reverse
        altBg
        blue
      >
        <div id="why-partner">
          <SplitLabel blue>Value</SplitLabel>
          <SplitHeadline>Why agencies choose America Works as a vendor.</SplitHeadline>
          <SplitDescription>
            Agencies work with us because we combine decades of experience with the
            flexibility to meet local requirements and performance standards.
          </SplitDescription>
          <FeatureGrid items={whyPartnerFeatures} columns={2} />
        </div>
      </SplitSection>

      {/* Performance-Based Contracting Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[var(--container-xl)] mx-auto px-8">
          <SectionHeader
            label="Accountability"
            headline="Built for performance-based contracts."
            intro="America Works has been cited in independent research and policy discussions as a leading example of performance-based contracting in welfare-to-work and employment services."
            centered
          />

          <h3 className="font-display text-2xl text-center mb-12 font-normal tracking-tight text-gray-900">
            Aligning incentives with your outcomes
          </h3>

          <FeatureGrid items={performanceFeatures} columns={3} />

          {/* Quote callout */}
          <div className="max-w-3xl mx-auto mt-16 p-10 bg-white border-l-4 border-[var(--aw-blue)]">
            <p className="text-xl leading-relaxed text-gray-800 italic mb-4">
              "Providers like America Works demonstrated how individualized
              performance-based contracts could drive stronger engagement and employment
              outcomes."
            </p>
            <p className="text-sm text-gray-600 font-semibold">
              — Summary of findings from independent reviews of TANF and workforce
              contracts
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-24 bg-gray-50" id="implementation">
        <div className="max-w-[var(--container-xl)] mx-auto px-8">
          <SectionHeader
            label="Process"
            headline="How we build and run programs with you."
            intro="We know every jurisdiction is different. Our implementation approach is collaborative and structured, so you get a partner—not just a vendor."
            centered
          />

          <ProcessGrid items={implementationSteps} variant="cards" />

          <div className="text-center mt-16">
            <Button variant="primary" href="#contact" arrow>
              Discuss your program or upcoming RFP
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[var(--container-xl)] mx-auto px-8">
          <SectionHeader
            label="Testimonials"
            headline="What people say about partnering with America Works."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50" id="faq">
        <div className="max-w-[var(--container-xl)] mx-auto px-8">
          <SectionHeader
            label="FAQ"
            headline="Questions agencies often ask."
            centered
          />

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div id="contact">
        <CTASection
          headline="Let's explore what we can build together."
          description="Whether you're planning a new initiative, redesigning an existing program, or exploring performance-based contracting, America Works can be a partner in designing and delivering workforce services that move people into sustainable employment."
          primaryCta={{
            label: 'Talk to our partnerships team',
            href: '#contact',
          }}
          secondaryCta={{
            label: 'Share details about your program or RFP',
            href: '#contact',
          }}
        />
      </div>
    </div>
  )
}
