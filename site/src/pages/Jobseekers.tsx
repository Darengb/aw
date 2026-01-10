import { PageHero } from '../components/heroes/PageHero'
import {
  SplitSection,
  SplitLabel,
  SplitHeadline,
  SplitDescription,
} from '../components/sections/SplitSection'
import { SectionHeader } from '../components/sections/SectionHeader'
import { ProcessGrid } from '../components/sections/ProcessGrid'
import { CaseStudiesTabs } from '../components/interactive/CaseStudiesTabs'
import { TestimonialCard } from '../components/cards/TestimonialCard'
import { CTASection } from '../components/sections/CTASection'
import { SecondaryNav } from '../components/layout/SecondaryNav'
import { FeatureList } from '../components/ui/FeatureList'
import { Button } from '../components/ui/Button'
import { UserCheck, HandHelping, Building, MessageCircle } from 'lucide-react'
import type { CaseStudy, NavLink, ProcessStep, TestimonialProps } from '../lib/types'

// Secondary navigation links for this page
const secondaryNavLinks: NavLink[] = [
  { label: 'Services', href: '#how-we-help' },
  { label: 'Process', href: '#process' },
  { label: 'Stories', href: '#stories' },
]

// Process steps data
const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Reach out',
    description:
      "Contact us directly or get referred by a caseworker. We'll discuss your situation, goals, and available programs in a judgment-free conversation.",
  },
  {
    number: '02',
    title: 'Meet your specialist',
    description:
      'Your career specialist listens to your story, understands your barriers, and creates a realistic plan tailored to your life and ambitions.',
  },
  {
    number: '03',
    title: 'Prepare & apply',
    description:
      'Build your resume, practice interviews, explore training, and apply for jobs. We connect you with employers actively hiring in your area.',
  },
  {
    number: '04',
    title: 'Start working',
    description:
      "Get hired and begin your new role with our support. We stay in touch, help troubleshoot, and ensure you're set up for long-term success.",
  },
]

// Case studies data
const caseStudies: CaseStudy[] = [
  {
    id: 'khadijah',
    name: 'Khadijah',
    content: (
      <div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Khadijah</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Khadijah had not worked in over 10 years, had been living in a shelter, and was dealing
          with symptoms of depression, deepened by the loss of her father. Working closely with the
          trainers at America Works, Khadijah was exposed to many industries.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Finally settling on security guard training, she completed the course and was immediately
          hired by a partner of America Works. Khadijah came into the office with happy tears in her
          eyes once she realized that she would finally be back working after a long absence away
          from the workforce.
        </p>
        <blockquote className="border-l-[3px] border-aw-red pl-4 italic text-gray-700 mt-6">
          "It was all thanks to you guys, you gave me hope...and for that I'm extremely grateful!"
        </blockquote>
      </div>
    ),
  },
  {
    id: 'valerie',
    name: 'Valerie',
    content: (
      <div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Valerie</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Valerie was receiving disability from Social Security and wanted desperately to improve
          her situation. When Valerie started with America Works, she was nearly homeless and had
          very little relationship with her daughter.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          It took some adjusting, but after starting her second job she was on her path to stability
          and independence. She has now been working for over six years. During that time, America
          Works helped her find a stable apartment and Valerie has been able to rebuild her
          relationship with her daughter.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Valerie credits America Works with turning her life around and continues to share her
          accomplishments.
        </p>
      </div>
    ),
  },
  {
    id: 'johnnie',
    name: 'Johnnie',
    content: (
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-2">
          Never Too Late: A Veteran's Story
        </div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Johnnie</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          After many years of being homeless, unemployed and battling addiction, Johnnie proved that
          it's never too late to start over and was honored by President Barack Obama at the White
          House.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Johnnie served his country in the Army overseas. Ten years after his return, substance
          abuse took over his life. He lost his job, and lived on the streets without work for more
          than 19-years until he connected with Chicago's Veterans Affairs.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          The VA referred him to America Works, where the staff gave him a much needed support
          system. They helped him prepare a resume, coached him on using a computer, email and the
          Internet. The team recognized his potential and knew he was ready to step into the
          workforce again.
        </p>
        <p className="text-gray-600 leading-relaxed">
          They encouraged him to test for a position at the United States Postal Service. He passed
          the exam and accepted a position with the USPS. Johnnie now lives in his own apartment and
          is proudly employed.
        </p>
      </div>
    ),
  },
  {
    id: 'akeem',
    name: 'Akeem',
    content: (
      <div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Akeem</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Akeem was laid off from a Digital Marketing Coordinator position and began searching for
          something that would fulfill him and be relevant to his qualifications. However, after
          some difficult circumstances with family issues at home, he realized he needed additional
          help.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Akeem was referred to America Works where his representative used all their available
          resources to assist him.
        </p>
        <blockquote className="border-l-[3px] border-aw-red pl-4 italic text-gray-700 my-6">
          "The training here was on a different level. The people here...genuinely want to help."
        </blockquote>
        <p className="text-gray-600 leading-relaxed">
          Akeem was referred to an interview by America Works and he accepted the position as a Web
          Designer for $50,000 per year plus benefits.
        </p>
      </div>
    ),
  },
  {
    id: 'lamont',
    name: 'Lamont',
    content: (
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-2">
          No Barriers, Only Opportunity
        </div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Lamont</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Lamont was unable to read and write when he came to America Works. He also didn't have any
          prior work experience. However, the team did not see any of these circumstances as
          barriers. Instead, they focused on his potential and strengths - his work ethic,
          willingness to learn and dedication to improving himself.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          With the help of the staff filling out applications, Lamont applied for local jobs. On
          occasion, he would get lost on his way to job interviews because he was unable to read
          street signs. Our team would immediately find him and drop him off at the right location.
        </p>
        <p className="text-gray-600 leading-relaxed">
          They coached him on attire and interview skills so that he felt confident and prepared.
          And it worked. Lamont works for a national restaurant chain.
        </p>
      </div>
    ),
  },
  {
    id: 'owen',
    name: 'Owen',
    content: (
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-2">
          A Fresh Start
        </div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Owen</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Owen was newly out of prison after serving more than 24-years when he first came to
          America Works. He had never used a computer, the Internet or a mobile phone. However, he
          had his life back and was eager to catch up on everything he had missed.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our team coached him through the basics of operating a computer, setting up email,
          applying for jobs, inquiring about certifications and various courses. While he lacked
          work experience and a resume, Owen came in each day with drive and determination to become
          self-sufficient.
        </p>
        <p className="text-gray-600 leading-relaxed">
          His hard work paid off. He landed a job after his first interview. Not long after, he
          obtained his permit and now has his driver's license. Owen is well on his way to being
          self-sufficient and has never looked back.
        </p>
      </div>
    ),
  },
]

// Testimonials data - main section
const testimonials: TestimonialProps[] = [
  {
    quote:
      "When I came to America Works, I had been out of work for months and didn't know where to start. They helped me rewrite my resume, practice interviews, and connected me with a company that was willing to give me a chance. Now I'm working full time and finally feel like I'm moving forward again.",
    author: 'Maria R.',
    source: 'New York',
  },
  {
    quote:
      "I was nervous about my background and wasn't sure anyone would hire me. My career specialist at America Works never judged me. They helped me explain my story, prepare for interviews, and stay focused. I'm grateful to have a job and a fresh start.",
    author: 'James T.',
    source: 'Maryland',
  },
  {
    quote:
      'This was my first real job. America Works helped me figure out what kind of work would fit me, taught me how to interview, and checked in after I started. Having someone in my corner made all the difference.',
    author: 'DeShawn W.',
    source: 'Indiana',
  },
]

// Google Reviews data - Section 1
const googleReviews1 = [
  {
    quote:
      'When I was in foster care America Works helped me not just get on my feet, but also help me find a better person in me.',
    author: 'Taino',
  },
  {
    quote:
      'I tried to get a job on my own for months without any luck, and they had me going on interviews by my second day!',
    author: 'Joshua',
  },
  {
    quote:
      'This place has been an absolute help to me and my family. From my case workers to the Director. Nice people and great services.',
    author: 'Shanita',
  },
]

// Google Reviews data - Section 2
const googleReviews2 = [
  {
    quote:
      'From Homeless to Formerly Homeless. From Unemployed to Employed. From feeling alone to now having a team of support. I now proudly work at Yankee Stadium.',
    author: 'Clark',
  },
  {
    quote:
      "I can't thank them enough for helping me at my lowest. Broke, homeless, unemployed. The employees are genuinely helpful. They want everyone to become a success story.",
    author: 'Troy',
  },
  {
    quote:
      'Coming from a domestic violence situation where I lost everything, America Works has been very supportive. I am grateful to have them in my life.',
    author: 'Sherbay',
  },
]

// Client experience features
const clientExperienceFeatures = [
  {
    icon: UserCheck,
    title: 'Personal attention from day one',
    description:
      "You'll work one-on-one with a dedicated specialist who takes the time to learn your story, understand your goals, and support you through every challenge along the way.",
  },
  {
    icon: HandHelping,
    title: 'We roll up our sleeves',
    description:
      "Our team works alongside you on everything that matters: building your resume, preparing for interviews, solving transportation and childcare challenges. We're in it together.",
  },
  {
    icon: Building,
    title: 'A professional environment',
    description:
      "Our offices are comfortable, welcoming spaces designed to feel like a professional workplace. When you're preparing for a career, the environment matters. You'll feel ready before you even walk into your first interview.",
  },
  {
    icon: MessageCircle,
    title: 'Real conversations',
    description:
      'Every conversation starts with listening. We want to understand where you are and where you want to go, so we can help you get there.',
  },
]

// Google Review Card Component
function GoogleReviewCard({
  quote,
  author,
}: {
  quote: string
  author: string
}) {
  return (
    <div className="google-review-card group bg-white p-8 rounded-lg border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[75vw] flex-shrink-0 snap-start md:w-auto md:flex-shrink">
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100 group-hover:bg-aw-red transition-colors duration-300" />

      {/* Google trust badge */}
      <div className="flex items-center gap-3 mb-6">
        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {/* 5 stars */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#FBBC05">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="relative z-[1] mb-6">
        <p className="font-body text-lg leading-relaxed text-gray-700">"{quote}"</p>
      </blockquote>

      {/* Author */}
      <footer className="flex items-center justify-between">
        <span className="font-display text-base text-gray-900">{author}</span>
        <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
          Google Review
        </span>
      </footer>
    </div>
  )
}

export function Jobseekers() {
  return (
    <div className="theme-red">
      {/* Secondary Navigation */}
      <SecondaryNav links={secondaryNavLinks} />

      {/* Hero Section */}
      <PageHero
        title="Your next career starts with one conversation."
        subtitle="We've spent 40 years perfecting the path from unemployment to meaningful work. Personal coaching, direct employer access, and unwavering support—at no cost to you."
        label="For Jobseekers"
        backgroundImage="/images/young-professional-working.jpg"
        theme="red"
        primaryCta={{ label: 'Start your journey', href: '#contact' }}
        secondaryCta={{ label: 'Explore our services', href: '#how-we-help' }}
      />

      {/* Google Reviews - Section 1 */}
      <section className="py-6 bg-white">
        <div className="md:container md:max-w-container mx-auto md:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide">
            {googleReviews1.map((review, index) => (
              <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
            ))}
          </div>
        </div>
      </section>

      {/* Client Experience Section */}
      <section className="py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Experience"
            headline="You're a client, not a case number."
            intro="From the moment you walk through our doors, you're given the full attention of a career specialist who's here to help you succeed."
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {clientExperienceFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white p-10 rounded border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-aw-red" />
                    <h3 className="font-display text-xl text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Split Section 1: Employer Connections */}
      <SplitSection reverse blue image="/images/business-career-and-placement.jpg" imageAlt="Professional workplace">
        <SplitLabel blue>Connections</SplitLabel>
        <SplitHeadline>Direct access to employers who are hiring.</SplitHeadline>
        <SplitDescription>
          We don't send you to job boards. We connect you directly with verified employers actively
          seeking talent. Our 40-year track record means companies trust us to deliver candidates
          who succeed.
        </SplitDescription>
        <FeatureList
          items={[
            'Exclusive access to our employer network',
            'Job matching based on your skills and goals',
            'Direct introductions and advocacy',
            'Opportunities across multiple industries',
          ]}
        />
        <Button variant="link" href="#contact" arrow>
          See opportunities
        </Button>
      </SplitSection>

      {/* Case Studies Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden" id="stories">
        {/* Subtle diagonal accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />

        <div className="container max-w-container mx-auto px-8 relative z-10">
          <header className="mb-16">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">
              Success Stories
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-gray-900">
              Real people. Real transformations.
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Video */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-900">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/images/jobseekers-poster.jpg"
                >
                  <source src="/images/jobseekers.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-aw-red/20 rounded-lg -z-10" />
            </div>

            {/* Tabbed Content */}
            <CaseStudiesTabs studies={caseStudies} />
          </div>
        </div>
      </section>

      {/* Split Section 2: Job Readiness */}
      <SplitSection image="/images/resume-coaching.jpg" imageAlt="Career coaching session">
        <div id="how-we-help">
          <SplitLabel>Support</SplitLabel>
          <SplitHeadline>Build confidence. Master the process.</SplitHeadline>
          <SplitDescription>
            From your first resume draft to your final interview, we're there. Our career
            specialists don't just hand you a template—they sit with you, listen to your story, and
            help you present yourself with clarity and strength.
          </SplitDescription>
          <FeatureList
            items={[
              'One-on-one resume and cover letter development',
              'Interview preparation tailored to your industry',
              'Job search strategy that fits your life',
              'Skills assessment and career path planning',
            ]}
          />
          <Button variant="link" href="#contact" arrow>
            Get started
          </Button>
        </div>
      </SplitSection>

      {/* Google Reviews - Section 2 */}
      <section className="py-6 bg-white">
        <div className="md:container md:max-w-container mx-auto md:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide">
            {googleReviews2.map((review, index) => (
              <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
            ))}
          </div>
        </div>
      </section>

      {/* Split Section 3: Ongoing Support */}
      <SplitSection image="/images/intern.jpg" imageAlt="New employee receiving support">
        <SplitLabel>Retention</SplitLabel>
        <SplitHeadline>We stay with you after day one.</SplitHeadline>
        <SplitDescription>
          Getting hired is just the beginning. We provide 90+ days of post-placement support to
          ensure you're thriving, not just surviving. Challenges at work? We help you navigate them.
        </SplitDescription>
        <FeatureList
          items={[
            'Regular check-ins during your first 90 days',
            'Problem-solving support for workplace challenges',
            'Career advancement guidance',
            'Long-term relationship and re-engagement',
          ]}
        />
        <Button variant="link" href="#contact" arrow>
          Learn more
        </Button>
      </SplitSection>

      {/* Split Section 4: Who We Help */}
      <SplitSection
        reverse
        blue
        image="/images/opportunities.jpg"
        imageAlt="Diverse professionals"
      >
        <SplitLabel blue>Eligibility</SplitLabel>
        <SplitHeadline>If you're ready to work, we're ready to help.</SplitHeadline>
        <SplitDescription>
          We work with people from all backgrounds—whether you're receiving public assistance,
          returning from incarceration, transitioning from military service, or simply facing a
          tough job market. No judgment. Just support.
        </SplitDescription>
        <FeatureList
          items={[
            'TANF and SNAP recipients',
            'Justice-involved individuals',
            'Veterans and military families',
            'People with disabilities seeking employment',
            'Long-term unemployed',
            'Young adults entering the workforce',
          ]}
        />
        <Button variant="link" href="#contact" arrow>
          Check eligibility
        </Button>
      </SplitSection>

      {/* Process Section */}
      <section className="py-32 bg-gray-50" id="process">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Process"
            headline="Four steps from here to hired."
            intro="Every person's journey is different, but most follow this path. Simple, supportive, effective."
            centered
          />
          <div className="mt-16">
            <ProcessGrid items={processSteps} variant="cards" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-aw-red to-transparent" />

        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Impact"
            headline="Real stories. Real outcomes."
            intro="Every number represents a person. Here are a few of their stories."
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                source={testimonial.source}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to start?"
        description="You don't have to do this alone. Whether you're looking for your first job, starting over, or trying to move into something better, we're here."
        primaryCta={{ label: 'Get started today', href: '#' }}
        secondaryCta={{ label: 'Find a location', href: '#' }}
      />
    </div>
  )
}

export default Jobseekers
