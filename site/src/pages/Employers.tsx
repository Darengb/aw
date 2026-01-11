import PageHero from '../components/shared/PageHero';
import SplitSection from '../components/shared/SplitSection';
import ValueCard from '../components/shared/ValueCard';
import RoleItem from '../components/shared/RoleItem';
import FAQAccordion from '../components/shared/FAQAccordion';

// Value Props Data
const valueProps = [
  {
    number: "01",
    title: "No-fee staffing",
    description: "Our services are funded through public and partner programs, so employers aren't charged for placements or support."
  },
  {
    number: "02",
    title: "Pre-screened, job-ready candidates",
    description: "We assess skills, motivation, and fit before we send candidates your way, helping you spend time only on serious applicants."
  },
  {
    number: "03",
    title: "Retention-focused support",
    description: "Many candidates complete job-readiness training and receive months of mentoring after hire, helping them make a smooth transition and stay on the job."
  },
  {
    number: "04",
    title: "Tax credit & compliance opportunities",
    description: "A large share of our candidates qualify for federal incentives like the Work Opportunity Tax Credit and can help you meet federal contractor diversity and disability hiring goals."
  }
];

// Process Steps
const processSteps = [
  {
    number: "01",
    title: "Tell us what you're hiring for",
    description: "Start by submitting a job order or talking with our team about your open roles, locations, and requirements—skills, schedule, experience level, and workplace environment."
  },
  {
    number: "02",
    title: "We source and screen candidates",
    description: "Our staff recruits from our talent pool and partner programs, then pre-screens candidates to confirm interest, availability, and fit. Only motivated, qualified candidates are forwarded to you."
  },
  {
    number: "03",
    title: "You choose who to hire",
    description: "We coordinate interviews—at your site or virtually. You make the final hiring decision. Many employers work with us repeatedly to fill ongoing staffing needs."
  },
  {
    number: "04",
    title: "We stay involved after hire",
    description: "After a candidate starts, our team checks in regularly, offers coaching, and helps them navigate challenges. This extra layer of support helps your new employee settle in and stay productive."
  }
];

// Roles Data
const roles = [
  { icon: "briefcase", label: "Administrative & clerical" },
  { icon: "headphones", label: "Customer service & call centers" },
  { icon: "shopping-bag", label: "Retail & sales" },
  { icon: "utensils", label: "Food service & hospitality" },
  { icon: "shield", label: "Security and building services" },
  { icon: "truck", label: "Drivers and delivery" },
  { icon: "wrench", label: "Maintenance and facilities roles" },
  { icon: "heart", label: "Healthcare support roles" },
  { icon: "user", label: "Receptionist / front-desk" }
];

// FAQ Data
const faqItems = [
  {
    question: "What does it cost to use America Works for staffing?",
    answer: "There is no fee to employers for candidate referrals or support services. Our work is funded through government programs and partner organizations, so you can use America Works alongside your existing hiring channels at no extra cost."
  },
  {
    question: "What types of positions can you help fill?",
    answer: "We commonly staff for administrative, customer service, retail, food service, security, maintenance, driving, healthcare support, and similar entry-level to mid-level roles. If you have a specific position in mind, our local team can tell you whether we have candidates in that area."
  },
  {
    question: "How do you screen candidates?",
    answer: "Our staff reviews each candidate's experience, availability, and interest, and often works with them through job-readiness training before we refer them. We focus on sending candidates who are genuinely motivated and appropriately matched to your job requirements."
  },
  {
    question: "Are we obligated to hire candidates you send us?",
    answer: "No. You decide who to interview and who to hire. Our role is to bring you qualified candidates and support them once they join your team."
  },
  {
    question: "Do you only work with large companies?",
    answer: "No. We work with employers of all sizes—from small local businesses to national brands—with both one-time and ongoing staffing needs."
  },
  {
    question: "How quickly can you help fill a position?",
    answer: "Timelines depend on your location, role, and current candidate pool. In many cases we can present candidates quickly, especially for common roles. Your local America Works office can give you realistic expectations for your area."
  }
];

export default function Employers() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="Staffing with America Works"
        headline="Fill your open roles with motivated, pre-screened talent—at no cost."
        subheadline="America Works connects you with job-ready candidates and supports them for months after hire, helping you save time, reduce turnover, and build a more reliable workforce."
        image="/images/team-of-workers-celebrating-success-at-a-shipping.jpg"
        imageAlt="Successful team at work"
        primaryCta={{ href: "#contact", label: "Submit a job order" }}
        secondaryCta={{ href: "#contact", label: "Talk to our staffing team" }}
      />

      {/* Why Partner */}
      <section className="value-props-section py-32 bg-gray-50" id="why-partner">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Partnership</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Why partner with America Works for staffing?</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hiring shouldn't mean sorting through hundreds of resumes or paying high agency fees. America Works offers a simple alternative: we recruit, screen, and support candidates—so you can focus on running your business.
            </p>
          </header>

          <div className="value-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {valueProps.map((prop, index) => (
              <ValueCard key={index} number={prop.number} title={prop.title} description={prop.description} blue={true} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section py-32 bg-white" id="how-it-works">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Process</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">How our staffing process works.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We keep the process straightforward for you and supportive for your new hires.
            </p>
          </header>

          <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {processSteps.map((step, index) => (
              <div key={index} className="process-card bg-gray-50 p-10 rounded border border-gray-200 relative">
                <div className="process-number font-mono text-4xl font-bold text-aw-blue opacity-30 mb-4 leading-none">{step.number}</div>
                <h3 className="font-body text-lg font-semibold text-gray-900 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidates Different */}
      <section className="split-section grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[75vh] relative">
        <div className="split-image relative overflow-hidden bg-gray-100 h-full min-h-[400px] lg:min-h-full">
          <img src="/images/resume-coaching.jpg" alt="Job readiness training" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
        <div className="split-content">
          <div className="split-content-inner">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Preparation</div>
            <h2 className="split-headline font-display text-4xl font-normal leading-tight tracking-tight text-gray-900 mb-6">Candidates prepared to succeed—not just to show up.</h2>
            <p className="split-description text-lg text-gray-600 leading-relaxed mb-6">
              Many candidates participate in a structured job-readiness program that covers communication, customer service, workplace expectations, and basic computer and soft skills before they ever meet with you. That means they arrive at interviews with a clearer understanding of what it takes to be successful on the job.
            </p>
            <p className="split-description text-lg text-gray-600 leading-relaxed mb-8">
              After hire, we stay in touch with your new employee for a period of time—offering mentoring, guidance, and problem-solving support during and outside of work hours. This reduces early turnover and helps employees stay engaged and dependable.
            </p>
          </div>
        </div>
      </section>

      {/* Roles & Industries */}
      <section className="roles-section py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Industries</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Roles and industries we commonly support.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We staff a wide range of entry-level to mid-level positions across industries. Typical roles include:
            </p>
          </header>

          <div className="roles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {roles.map((role, index) => (
              <RoleItem key={index} icon={role.icon} label={role.label} />
            ))}
          </div>

          <p className="note-text text-center text-sm text-gray-500 mt-12">
            Specific roles vary by location. Your local America Works team can advise you on candidate availability in your area.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <SplitSection
        label="Value"
        headline="Business benefits for employers."
        description="Working with America Works isn't just the right thing to do—it's good for your bottom line."
        features={[
          "Employers are not charged for candidate referrals or ongoing support",
          "Many candidates meet eligibility requirements for the federal Work Opportunity Tax Credit (WOTC)",
          "We help federal contractors broaden their talent pipeline and support Section 503 and diversity-related workforce goals",
          "Reduced time-to-hire with pre-screened, motivated candidates"
        ]}
        image="/images/business-career-and-placement.jpg"
        imageAlt="Business partnership"
        linkHref="#contact"
        linkLabel="Explore employer partnership"
        reversed={true}
        blue={true}
      />

      {/* Testimonials */}
      <section className="testimonials-section py-32 bg-white relative">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Testimonials</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">What employers say about working with us.</h2>
          </header>

          <div className="testimonials-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            <div className="testimonial-card bg-gray-50 p-12 rounded relative">
              <p className="testimonial-text relative z-[1] text-base leading-relaxed text-gray-800 mb-6 italic">
                The candidates we've received through America Works have been well-prepared and motivated. The follow-up support after hiring has made a real difference in retention.
              </p>
              <p className="testimonial-author text-sm text-gray-600 font-semibold not-italic">— HR Manager, Retail Chain</p>
            </div>

            <div className="testimonial-card bg-gray-50 p-12 rounded relative">
              <p className="testimonial-text relative z-[1] text-base leading-relaxed text-gray-800 mb-6 italic">
                We've used America Works to fill multiple positions and have been impressed by how quickly they respond and how thoroughly they screen candidates.
              </p>
              <p className="testimonial-author text-sm text-gray-600 font-semibold not-italic">— Operations Director, Logistics Company</p>
            </div>

            <div className="testimonial-card bg-gray-50 p-12 rounded relative">
              <p className="testimonial-text relative z-[1] text-base leading-relaxed text-gray-800 mb-6 italic">
                We've found motivated employees who are eager to grow with our company. The post-placement support helps new hires settle in and stay with us longer.
              </p>
              <p className="testimonial-author text-sm text-gray-600 font-semibold not-italic">— Franchise Owner, Food Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        label="FAQ"
        headline="Questions employers often ask."
        items={faqItems}
        id="faq"
      />

      {/* CTA */}
      <section className="cta-section py-32 bg-gray-950 text-white text-center relative overflow-hidden" id="contact">
        <div className="container max-w-container mx-auto px-8">
          <div className="cta-content relative z-[2]">
            <h2 className="font-display text-display-md font-normal mb-6 tracking-tight">Ready to meet your next great hire?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Whether you need to fill a single role or manage ongoing hiring across multiple sites, America Works can help you find motivated, supported candidates at no cost.
            </p>
            <div className="cta-buttons flex gap-5 justify-center flex-wrap">
              <a href="#" className="btn-white inline-flex items-center gap-2 py-5 px-12 bg-white text-gray-950 rounded-md font-body text-sm font-semibold no-underline shadow-lg">
                <span>Submit a job order</span>
                <i data-lucide="arrow-right" style={{ width: '18px', height: '18px' }}></i>
              </a>
              <a href="#" className="btn-outline-white inline-flex items-center gap-2 py-5 px-12 bg-transparent text-white border-2 border-white/50 rounded-md font-body text-sm font-semibold no-underline">
                <span>Talk to our staffing team</span>
                <i data-lucide="phone" style={{ width: '18px', height: '18px' }}></i>
              </a>
              <a href="#" className="btn-outline-white inline-flex items-center gap-2 py-5 px-12 bg-transparent text-white border-2 border-white/50 rounded-md font-body text-sm font-semibold no-underline">
                <span>Find your nearest office</span>
                <i data-lucide="map-pin" style={{ width: '18px', height: '18px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
