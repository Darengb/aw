import PageHero from '../components/shared/PageHero';
import SplitSection from '../components/shared/SplitSection';
import CaseStudiesTabs from '../components/jobseekers/CaseStudiesTabs';
import ProcessGrid from '../components/shared/ProcessGrid';
import GoogleReviewCard from '../components/home/GoogleReviewCard';
import TestimonialCard from '../components/home/TestimonialCard';

// Google Reviews Data
const googleReviews1 = [
  {
    quote: <>When I was in foster care America Works helped me not just <strong>get on my feet</strong>, but also help me find a better person in me.</>,
    author: "Taino"
  },
  {
    quote: <>I tried to get a job on my own for months without any luck, and they had me <strong>going on interviews by my second day</strong>!</>,
    author: "Joshua"
  },
  {
    quote: <>This place has been an <strong>absolute help</strong> to me and my family. From my case workers to the Director. Nice people and great services.</>,
    author: "Shanita"
  }
];

const googleReviews2 = [
  {
    quote: <>From Homeless to Formerly Homeless. From Unemployed to Employed. From feeling alone to now having a team of support. I now <strong>proudly work at Yankee Stadium</strong>.</>,
    author: "Clark"
  },
  {
    quote: <>I can't thank them enough for helping me at my lowest. Broke, homeless, unemployed. The employees are <strong>genuinely helpful</strong>. They want everyone to become a success story.</>,
    author: "Troy"
  },
  {
    quote: <>Coming from a domestic violence situation where I lost everything, America Works has been <strong>very supportive</strong>. I am grateful to have them in my life.</>,
    author: "Sherbay"
  }
];

// Process Steps
const processSteps = [
  {
    number: "01",
    title: "Reach out",
    description: "Contact us directly or get referred by a caseworker. We'll discuss your situation, goals, and available programs in a judgment-free conversation."
  },
  {
    number: "02",
    title: "Meet your specialist",
    description: "Your career specialist listens to your story, understands your barriers, and creates a realistic plan tailored to your life and ambitions."
  },
  {
    number: "03",
    title: "Prepare & apply",
    description: "Build your resume, practice interviews, explore training, and apply for jobs. We connect you with employers actively hiring in your area."
  },
  {
    number: "04",
    title: "Start working",
    description: "Get hired and begin your new role with our support. We stay in touch, help troubleshoot, and ensure you're set up for long-term success."
  }
];

// Testimonials
const testimonials = [
  {
    quote: "When I came to America Works, I had been out of work for months and didn't know where to start. They helped me rewrite my resume, practice interviews, and connected me with a company that was willing to give me a chance. Now I'm working full time and finally feel like I'm moving forward again.",
    author: "Maria R., New York",
    role: ""
  },
  {
    quote: "I was nervous about my background and wasn't sure anyone would hire me. My career specialist at America Works never judged me. They helped me explain my story, prepare for interviews, and stay focused. I'm grateful to have a job and a fresh start.",
    author: "James T., Maryland",
    role: ""
  },
  {
    quote: "This was my first real job. America Works helped me figure out what kind of work would fit me, taught me how to interview, and checked in after I started. Having someone in my corner made all the difference.",
    author: "DeShawn W., Indiana",
    role: ""
  }
];

// Experience Cards
const experienceCards = [
  {
    icon: "user-check",
    title: "Personal attention from day one",
    description: "You'll work one-on-one with a dedicated specialist who takes the time to learn your story, understand your goals, and support you through every challenge along the way."
  },
  {
    icon: "hand-helping",
    title: "We roll up our sleeves",
    description: "Our team works alongside you on everything that matters: building your resume, preparing for interviews, solving transportation and childcare challenges. We're in it together."
  },
  {
    icon: "building",
    title: "A professional environment",
    description: "Our offices are comfortable, welcoming spaces designed to feel like a professional workplace. When you're preparing for a career, the environment matters. You'll feel ready before you even walk into your first interview."
  },
  {
    icon: "message-circle",
    title: "Real conversations",
    description: "Every conversation starts with listening. We want to understand where you are and where you want to go, so we can help you get there."
  }
];

export default function Jobseekers() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="For Jobseekers"
        headline="Your next career starts with one conversation."
        subheadline="We've spent 40 years perfecting the path from unemployment to meaningful work. Personal coaching, direct employer access, and unwavering support—at no cost to you."
        image="/images/young-professional-working.jpg"
        imageAlt="Professional career development"
        primaryCta={{ href: "#contact", label: "Start your journey" }}
        secondaryCta={{ href: "#how-we-help", label: "Explore our services" }}
      />

      {/* Google Reviews */}
      <section className="py-6 bg-white">
        <div className="md:container md:max-w-container mx-auto md:px-8">
          <div className="testimonials-grid flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide">
            {googleReviews1.map((review, index) => (
              <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
            ))}
          </div>
        </div>
      </section>

      {/* Client Experience */}
      <section className="py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-20">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Experience</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">You're a client, not a case number.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From the moment you walk through our doors, you're given the full attention of a career specialist who's here to help you succeed.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experienceCards.map((card, index) => (
              <div key={index} className="bg-white p-10 rounded border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <i data-lucide={card.icon} className="w-6 h-6 text-aw-red"></i>
                  <h3 className="font-display text-xl text-gray-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Connections */}
      <SplitSection
        label="Connections"
        headline="Direct access to employers who are hiring."
        description="We don't send you to job boards. We connect you directly with verified employers actively seeking talent. Our 40-year track record means companies trust us to deliver candidates who succeed."
        features={[
          "Exclusive access to our employer network",
          "Job matching based on your skills and goals",
          "Direct introductions and advocacy",
          "Opportunities across multiple industries"
        ]}
        image="/images/business-career-and-placement.jpg"
        imageAlt="Professional workplace"
        linkHref="#contact"
        linkLabel="See opportunities"
        reversed={true}
        blue={true}
      />

      {/* Case Studies */}
      <CaseStudiesTabs />

      {/* Job Readiness */}
      <SplitSection
        label="Support"
        headline="Build confidence. Master the process."
        description="From your first resume draft to your final interview, we're there. Our career specialists don't just hand you a template—they sit with you, listen to your story, and help you present yourself with clarity and strength."
        features={[
          "One-on-one resume and cover letter development",
          "Interview preparation tailored to your industry",
          "Job search strategy that fits your life",
          "Skills assessment and career path planning"
        ]}
        image="/images/resume-coaching.jpg"
        imageAlt="Career coaching session"
        linkHref="#contact"
        linkLabel="Get started"
        id="how-we-help"
      />

      {/* Google Reviews 2 */}
      <section className="py-6 bg-white">
        <div className="md:container md:max-w-container mx-auto md:px-8">
          <div className="testimonials-grid flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide">
            {googleReviews2.map((review, index) => (
              <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Support */}
      <SplitSection
        label="Retention"
        headline="We stay with you after day one."
        description="Getting hired is just the beginning. We provide 90+ days of post-placement support to ensure you're thriving, not just surviving. Challenges at work? We help you navigate them."
        features={[
          "Regular check-ins during your first 90 days",
          "Problem-solving support for workplace challenges",
          "Career advancement guidance",
          "Long-term relationship and re-engagement"
        ]}
        image="/images/intern.jpg"
        imageAlt="New employee receiving support"
        linkHref="#contact"
        linkLabel="Learn more"
      />

      {/* Who We Help */}
      <SplitSection
        label="Eligibility"
        headline="If you're ready to work, we're ready to help."
        description="We work with people from all backgrounds—whether you're receiving public assistance, returning from incarceration, transitioning from military service, or simply facing a tough job market. No judgment. Just support."
        features={[
          "TANF, SNAP, and other public assistance recipients",
          "Veterans and military families",
          "Returning citizens",
          "People with disabilities",
          "Youth aging out of foster care",
          "Anyone facing barriers to employment"
        ]}
        image="/images/opportunities.jpg"
        imageAlt="Diverse professionals"
        linkHref="#contact"
        linkLabel="Check eligibility"
        reversed={true}
        blue={true}
      />

      {/* Process */}
      <ProcessGrid
        label="Process"
        headline="Four steps from here to hired."
        subhead="Every person's journey is different, but most follow this path. Simple, supportive, effective."
        steps={processSteps}
        id="process"
      />

      {/* Testimonials */}
      <section className="testimonials-section py-32 bg-white relative" id="stories">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Impact</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Real stories. Real outcomes.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every number represents a person. Here are a few of their stories.
            </p>
          </header>

          <div className="testimonials-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} quote={testimonial.quote} author={testimonial.author} role={testimonial.role} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-32 bg-gray-950 text-white text-center relative overflow-hidden" id="contact">
        <div className="container max-w-container mx-auto px-8">
          <div className="cta-content relative z-[2]">
            <h2 className="font-display text-display-md font-normal mb-6 tracking-tight">Ready to start?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              You don't have to do this alone. Whether you're looking for your first job, starting over, or trying to move into something better, we're here.
            </p>
            <div className="cta-buttons flex gap-5 justify-center flex-wrap">
              <a href="#" className="btn-white inline-flex items-center gap-2 py-5 px-12 bg-white text-gray-950 rounded-md font-body text-sm font-semibold no-underline shadow-lg">
                <span>Get started today</span>
                <i data-lucide="arrow-right" style={{ width: '18px', height: '18px' }}></i>
              </a>
              <a href="#" className="btn-outline-white inline-flex items-center gap-2 py-5 px-12 bg-transparent text-white border-2 border-white/50 rounded-md font-body text-sm font-semibold no-underline">
                <span>Find a location</span>
                <i data-lucide="map-pin" style={{ width: '18px', height: '18px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
