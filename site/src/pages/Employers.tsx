import { PageHero } from '../components/heroes/PageHero'
import { SecondaryNav } from '../components/layout/SecondaryNav'
import { SectionHeader } from '../components/sections/SectionHeader'
import { ValueCard } from '../components/cards/ValueCard'
import { ProcessGrid } from '../components/sections/ProcessGrid'
import { SplitSection, SplitLabel, SplitHeadline, SplitDescription } from '../components/sections/SplitSection'
import { RoleItem } from '../components/cards/RoleItem'
import { TestimonialCard } from '../components/cards/TestimonialCard'
import { FAQAccordion } from '../components/interactive/FAQAccordion'
import { CTASection } from '../components/sections/CTASection'
import { FeatureList } from '../components/ui/FeatureList'
import { Button } from '../components/ui/Button'
import type { ProcessStep, FAQItem, TestimonialProps, ValueCardProps, RoleItemProps, NavLink } from '../lib/types'

// Secondary nav links for this page
const secondaryNavLinks: NavLink[] = [
  { label: 'Why Partner', href: '#why-partner' },
  { label: 'Process', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Submit Job Order', href: '#contact' },
]

// Value cards data
const valueCards: ValueCardProps[] = [
  {
    number: '01',
    title: 'No-fee staffing',
    description: 'Our services are funded through public and partner programs, so employers aren\'t charged for placements or support.',
  },
  {
    number: '02',
    title: 'Pre-screened, job-ready candidates',
    description: 'We assess skills, motivation, and fit before we send candidates your way, helping you spend time only on serious applicants.',
  },
  {
    number: '03',
    title: 'Retention-focused support',
    description: 'Many candidates complete job-readiness training and receive months of mentoring after hire, helping them make a smooth transition and stay on the job.',
  },
  {
    number: '04',
    title: 'Tax credit & compliance opportunities',
    description: 'A large share of our candidates qualify for federal incentives like the Work Opportunity Tax Credit and can help you meet federal contractor diversity and disability hiring goals.',
  },
]

// Process steps data
const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell us what you\'re hiring for',
    description: 'Start by submitting a job order or talking with our team about your open roles, locations, and requirements—skills, schedule, experience level, and workplace environment.',
  },
  {
    number: '02',
    title: 'We source and screen candidates',
    description: 'Our staff recruits from our talent pool and partner programs, then pre-screens candidates to confirm interest, availability, and fit. Only motivated, qualified candidates are forwarded to you.',
  },
  {
    number: '03',
    title: 'You choose who to hire',
    description: 'We coordinate interviews—at your site or virtually. You make the final hiring decision. Many employers work with us repeatedly to fill ongoing staffing needs.',
  },
  {
    number: '04',
    title: 'We stay involved after hire',
    description: 'After a candidate starts, our team checks in regularly, offers coaching, and helps them navigate challenges. This extra layer of support helps your new employee settle in and stay productive.',
  },
]

// Roles we fill
const roles: RoleItemProps[] = [
  { icon: 'Briefcase', label: 'Administrative & clerical' },
  { icon: 'Headphones', label: 'Customer service & call centers' },
  { icon: 'ShoppingBag', label: 'Retail & sales' },
  { icon: 'Utensils', label: 'Food service & hospitality' },
  { icon: 'Shield', label: 'Security and building services' },
  { icon: 'Truck', label: 'Drivers and delivery' },
  { icon: 'Wrench', label: 'Maintenance and facilities roles' },
  { icon: 'Heart', label: 'Healthcare support roles' },
  { icon: 'User', label: 'Receptionist / front-desk' },
]

// Testimonials
const testimonials: TestimonialProps[] = [
  {
    quote: 'America Works understands what our roles require and consistently sends candidates who fit. They\'ve made our hiring process much easier.',
    author: 'Aegis Global',
  },
  {
    quote: 'At key venues like Citi Field and Yankee Stadium, America Works has reliably handled our seasonal and event staffing needs year after year.',
    author: 'Aramark',
  },
  {
    quote: 'Because America Works pre-screens candidates and provides support services, we can even conduct interviews on-site in our stores, which saves our managers a lot of time.',
    author: 'Burlington',
  },
  {
    quote: 'They\'re a dedicated, helpful partner and have played a real role in helping us meet our hiring needs.',
    author: 'Fossil',
  },
  {
    quote: 'We have an ongoing need for dependable, skilled workers. America Works has been a consistent source of reliable talent.',
    author: 'H&R Block',
  },
]

// FAQ items
const faqItems: FAQItem[] = [
  {
    question: 'What does it cost to use America Works for staffing?',
    answer: 'There is no fee to employers for candidate referrals or support services. Our work is funded through government programs and partner organizations, so you can use America Works alongside your existing hiring channels at no extra cost.',
  },
  {
    question: 'What types of positions can you help fill?',
    answer: 'We commonly staff for administrative, customer service, retail, food service, security, maintenance, driving, healthcare support, and similar entry-level to mid-level roles. If you have a specific position in mind, our local team can tell you whether we have candidates in that area.',
  },
  {
    question: 'How do you screen candidates?',
    answer: 'Our staff reviews each candidate\'s experience, availability, and interest, and often works with them through job-readiness training before we refer them. We focus on sending candidates who are genuinely motivated and appropriately matched to your job requirements.',
  },
  {
    question: 'Are we obligated to hire candidates you send us?',
    answer: 'No. You decide who to interview and who to hire. Our role is to bring you qualified candidates and support them once they join your team.',
  },
  {
    question: 'Do you only work with large companies?',
    answer: 'No. We work with employers of all sizes—from small local businesses to national brands—with both one-time and ongoing staffing needs.',
  },
  {
    question: 'How quickly can you help fill a position?',
    answer: 'Timelines depend on your location, role, and current candidate pool. In many cases we can present candidates quickly, especially for common roles. Your local America Works office can give you realistic expectations for your area.',
  },
]

// Business benefits for split section
const businessBenefits = [
  'Employers are not charged for candidate referrals or ongoing support',
  'Many candidates meet eligibility requirements for the federal Work Opportunity Tax Credit (WOTC)',
  'We help federal contractors broaden their talent pipeline and support Section 503 and diversity-related workforce goals',
  'Reduced time-to-hire with pre-screened, motivated candidates',
]

export function Employers() {
  return (
    <div className="theme-blue">
      {/* Secondary Navigation */}
      <SecondaryNav links={secondaryNavLinks} />

      {/* Hero Section */}
      <PageHero
        theme="blue"
        label="Staffing with America Works"
        title="Fill your open roles with motivated, pre-screened talent—at no cost."
        subtitle="America Works connects you with job-ready candidates and supports them for months after hire, helping you save time, reduce turnover, and build a more reliable workforce."
        backgroundImage="/images/team-of-workers-celebrating-success-at-a-shipping.jpg"
        primaryCta={{ label: 'Submit a job order', href: '#contact' }}
        secondaryCta={{ label: 'Talk to our staffing team', href: '#contact' }}
      />

      {/* Why Partner Section */}
      <section id="why-partner" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Partnership"
            headline="Why partner with America Works for staffing?"
            intro="Hiring shouldn't mean sorting through hundreds of resumes or paying high agency fees. America Works offers a simple alternative: we recruit, screen, and support candidates—so you can focus on running your business."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {valueCards.map((card) => (
              <ValueCard key={card.number} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-white">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Process"
            headline="How our staffing process works."
            intro="We keep the process straightforward for you and supportive for your new hires."
            centered
          />

          <div className="mt-16">
            <ProcessGrid items={processSteps} variant="cards" />
          </div>
        </div>
      </section>

      {/* Candidates Different - Split Section */}
      <SplitSection
        image="/images/resume-coaching.jpg"
        imageAlt="Job readiness training"
        blue
      >
        <SplitLabel blue>Preparation</SplitLabel>
        <SplitHeadline>Candidates prepared to succeed—not just to show up.</SplitHeadline>
        <SplitDescription>
          Many candidates participate in a structured job-readiness program that covers communication, customer service, workplace expectations, and basic computer and soft skills before they ever meet with you. That means they arrive at interviews with a clearer understanding of what it takes to be successful on the job.
        </SplitDescription>
        <SplitDescription>
          After hire, we stay in touch with your new employee for a period of time—offering mentoring, guidance, and problem-solving support during and outside of work hours. This reduces early turnover and helps employees stay engaged and dependable.
        </SplitDescription>
      </SplitSection>

      {/* Roles & Industries Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Industries"
            headline="Roles and industries we commonly support."
            intro="We staff a wide range of entry-level to mid-level positions across industries. Typical roles include:"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 mb-8">
            {roles.map((role) => (
              <RoleItem key={role.label} {...role} />
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 italic max-w-[700px] mx-auto">
            Specific roles vary by location. Your local America Works team can advise you on candidate availability in your area.
          </p>
        </div>
      </section>

      {/* Business Benefits - Split Section (Reversed) */}
      <SplitSection
        image="/images/business-career-and-placement.jpg"
        imageAlt="Business partnership"
        reverse
        altBg
        blue
      >
        <SplitLabel blue>Value</SplitLabel>
        <SplitHeadline>Business benefits for employers.</SplitHeadline>
        <SplitDescription>
          Working with America Works isn't just the right thing to do—it's good for your bottom line.
        </SplitDescription>
        <FeatureList items={businessBenefits} className="mb-8" />
        <Button variant="link" href="#contact" arrow>
          Learn about tax credits
        </Button>
      </SplitSection>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="Partnerships"
            headline="What employers say about working with us."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <SectionHeader
            label="FAQ"
            headline="Questions employers often ask."
            centered
          />

          <FAQAccordion items={faqItems} className="max-w-4xl mx-auto mt-16" />
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact">
        <CTASection
          headline="Ready to meet your next great hire?"
          description="Whether you need to fill a single role or manage ongoing hiring across multiple sites, America Works can help you find motivated, supported candidates at no cost."
        >
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="white" href="#" arrow>
              Submit a job order
            </Button>
            <Button variant="outline" href="#">
              Talk to our staffing team
            </Button>
            <Button variant="outline" href="#">
              Find your nearest office
            </Button>
          </div>
        </CTASection>
      </section>
    </div>
  )
}

export default Employers
