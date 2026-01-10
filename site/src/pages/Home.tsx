import { HomeHero } from '../components/heroes/HomeHero'
import { ValueProp } from '../components/cards/ValueProp'
import { HomeTimeline } from '../components/interactive/HomeTimeline'
import { PopulationItem } from '../components/cards/PopulationItem'
import { TestimonialCard } from '../components/cards/TestimonialCard'
import { PathCard } from '../components/cards/PathCard'
import { CTASection } from '../components/sections/CTASection'
import { SectionHeader } from '../components/sections/SectionHeader'
import type { TimelineItem, TestimonialProps, PathCardProps, PopulationItemProps } from '../lib/types'

// Timeline data for "How it works" section
const timelineItems: TimelineItem[] = [
  {
    year: '01',
    title: 'Connect',
    description: 'Meet with a career coach who listens to your goals and challenges',
  },
  {
    year: '02',
    title: 'Prepare',
    description: 'Build skills, polish your resume, and practice interviewing',
  },
  {
    year: '03',
    title: 'Succeed',
    description: 'Get matched with employers and start your new career',
  },
]

// Value propositions data
const valueProps = [
  {
    number: '01',
    title: 'Risk-free performance',
    description: 'You pay only for outcomes achieved',
  },
  {
    number: '02',
    title: 'Program expertise',
    description: 'TANF to reentry, we\'ve done it all',
  },
  {
    number: '03',
    title: 'Transparency',
    description: 'Data you can trust',
  },
  {
    number: '04',
    title: 'Scale without sacrifice',
    description: 'High volume, high touch',
  },
  {
    number: '05',
    title: 'Community connections',
    description: 'We know every local job market',
  },
  {
    number: '06',
    title: 'Federal vendor',
    description: 'NAICS 561311',
  },
]

// Populations served data
const populations: PopulationItemProps[] = [
  {
    icon: 'HandCoins',
    title: 'Public assistance recipients',
    description: 'TANF and SNAP recipients ready to work',
  },
  {
    icon: 'GraduationCap',
    title: 'Young adults',
    description: 'Young adults launching their careers',
  },
  {
    icon: 'Shield',
    title: 'Veterans',
    description: 'Veterans transitioning to civilian life',
  },
  {
    icon: 'Home',
    title: 'Housing insecure',
    description: 'People rebuilding after homelessness',
  },
  {
    icon: 'Key',
    title: 'Returning citizens',
    description: 'Returning citizens seeking second chances',
  },
  {
    icon: 'Heart',
    title: 'Non-custodial parents',
    description: 'Non-custodial parents providing for families',
  },
  {
    icon: 'Accessibility',
    title: 'People with disabilities',
    description: 'People with disabilities pursuing independence',
  },
]

// Testimonials data
const testimonials: TestimonialProps[] = [
  {
    quote: 'Six months ago, I was sleeping in my car. Today, I\'m a supervisor with benefits and a future. America Works didn\'t just find me a job. They gave me hope.',
    author: 'Marcus',
    source: 'Jobseeker, Georgia',
  },
  {
    quote: 'In 15 years of managing TANF programs, I\'ve never seen a partner deliver like this. They hit every metric while treating participants with genuine respect.',
    author: 'State TANF Director',
    source: 'Government Partner',
  },
  {
    quote: 'America Works doesn\'t just send us applicants. They send us prepared, motivated employees who stay.',
    author: 'Regional HR Manager',
    source: 'Employer',
  },
]

// Path cards for audience navigation
const pathCards: PathCardProps[] = [
  {
    title: 'Your career starts here',
    description: 'Life happens. Careers change. We meet you where you are and help you get where you\'re going. Personalized coaching, direct employer connections, and support that lasts beyond day one.',
    href: '/jobseekers',
    icon: 'Users',
  },
  {
    title: 'Performance you can measure',
    description: 'We deliver what matters: people employed, staying employed. Our performance-based model aligns our success with yours, backed by four decades of proven results.',
    href: '/employers',
    icon: 'Building2',
  },
  {
    title: 'The partner agencies trust most',
    description: 'When success is measured in human outcomes, not just compliance metrics, you need a partner who delivers both.',
    href: '/partners',
    icon: 'Handshake',
  },
]

export function Home() {
  return (
    <div className="theme-red">
      {/* Hero Section with video background and metrics dashboard */}
      <HomeHero
        title={`Workforce\ndevelopment that *works*`}
        backgroundVideo="/images/hero.mp4"
        primaryCta={{
          label: 'Find Work',
          href: '/jobseekers',
        }}
        secondaryCta={{
          label: 'Partner With Us',
          href: '/partners',
        }}
      />

      {/* How It Works - Timeline Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <SectionHeader
            label="Process"
            headline="Three steps to your next paycheck"
            intro="Most participants start working within weeks. Here's how:"
            centered
          />
          <div className="mt-16">
            <HomeTimeline items={timelineItems} />
          </div>
        </div>
      </section>

      {/* Populations We Serve */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <SectionHeader
            label="Equity & Access"
            headline="Everyone deserves a chance to work"
            intro="We specialize in helping people overcome real barriers"
            centered
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {populations.map((population, index) => (
              <PopulationItem key={index} {...population} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions - For Government Partners */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <SectionHeader
            label="Public Sector"
            headline="The partner agencies trust most"
            intro="When success is measured in human outcomes, not just compliance metrics, you need a partner who delivers both. America Works brings four decades of experience turning complex program requirements into simple results: employment that lasts."
            centered
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
            {valueProps.map((prop, index) => (
              <ValueProp key={index} {...prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <SectionHeader
            label="Social Proof"
            headline="Success speaks louder than promises"
            centered
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Audience Path Cards */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_15%_25%,rgba(236,20,12,0.06)_0%,transparent_55%),radial-gradient(circle_at_85%_75%,rgba(0,122,255,0.06)_0%,transparent_55%)]" />
        </div>

        <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="Your Path"
            headline="Choose your direction"
            intro="Whether you're seeking employment, hiring talent, or building workforce programs, we're here to help."
            centered
          />
          <div className="mt-16 space-y-24">
            {pathCards.map((card, index) => (
              <PathCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to begin?"
        description="Whether you're building a career or building a program, we're ready to deliver results."
        primaryCta={{
          label: 'Find Work',
          href: '/jobseekers',
        }}
        secondaryCta={{
          label: 'Partner With Us',
          href: '/partners',
        }}
      />
    </div>
  )
}

export default Home
