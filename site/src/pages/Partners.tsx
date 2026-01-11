import PageHero from '../components/shared/PageHero';
import TrustStrip from '../components/shared/TrustStrip';
import ListGrid from '../components/shared/ListGrid';
import FeatureGrid from '../components/shared/FeatureGrid';
import StepsGrid from '../components/shared/StepsGrid';
import FAQAccordion from '../components/shared/FAQAccordion';

// Trust Strip Data
const trustItems = [
  { number: "40+", label: "Years in workforce solutions and welfare-to-work" },
  { number: "~2M", label: "Individuals helped increase self-sufficiency through employment" },
  { number: "100s", label: "Partnerships with local, state & federal agencies" },
  { number: "Multi-state", label: "Hybrid performance-based contracts active in major cities" }
];

// Who We Partner With Data
const partnerTypes = [
  { icon: "briefcase", text: "TANF and SNAP Employment & Training programs" },
  { icon: "users", text: "Workforce programs funded under WIOA" },
  { icon: "shield", text: "Corrections and reentry services" },
  { icon: "accessibility", text: "Disability employment programs (Ticket to Work)" },
  { icon: "graduation-cap", text: "Youth and young-adult workforce initiatives" },
  { icon: "building", text: "Local economic and workforce development agencies" }
];

// Service Model Features
const serviceModelFeatures = [
  { icon: "check-circle", description: "Work readiness (hard + soft skills)" },
  { icon: "book-open", description: "Training aligned to local labor demand" },
  { icon: "briefcase", description: "Job development and placement" },
  { icon: "trending-up", description: "Ongoing support and advancement services" }
];

// Work-First Model Steps
const workFirstSteps = [
  {
    number: "01",
    title: "Work readiness",
    description: "We build both hard and soft skills that employers need—communication, customer service, computer literacy, workplace expectations and more—so participants are prepared to succeed, not just to interview."
  },
  {
    number: "02",
    title: "Training & education",
    description: "We connect participants to certificate programs, ESL, high school equivalency, and other training aligned with local labor market demand, so every hour invested supports a viable career goal."
  },
  {
    number: "03",
    title: "Employment & placement",
    description: "As soon as participants are ready, we match their goals and work history to open opportunities using our employer network. We fast-track them to interviews and help agencies meet placement targets."
  },
  {
    number: "04",
    title: "Support & advancement",
    description: "Once participants enter employment, we provide transition support, problem-solving, and additional training and certifications, helping them retain their jobs, increase their earnings, and reduce returns to public assistance."
  }
];

// Why Agencies Choose Us Features
const whyAgenciesFeatures = [
  { icon: "target", title: "Specialists in workforce solutions", description: "Our sole focus is workforce and welfare-to-work programming, with a long history of helping people who face multiple barriers to employment." },
  { icon: "award", title: "Deep experience", description: "Our leadership has been involved in workforce solutions since the 1960s, and America Works has been helping launch careers since 1984." },
  { icon: "heart", title: "Mission-driven staff", description: "We hire people who care about their communities and are committed to helping individuals and families in need move toward self-sufficiency." },
  { icon: "zap", title: "Rapid implementation", description: "We have opened new offices with as little as a month's notice, allowing agencies to stand up new programs quickly." },
  { icon: "bar-chart-3", title: "Top-performing vendor", description: "America Works consistently ranks among the top vendors wherever we operate, based on performance metrics and contract outcomes." },
  { icon: "sliders", title: "Versatile and adaptable", description: "We can align program design and data reporting to your requirements while maintaining strong results." },
  { icon: "briefcase", title: "Jobs ready on day one", description: "Our national partnerships with major employers mean real job openings are already waiting. Your participants can start interviewing immediately." }
];

// Performance-based Features
const performanceFeatures = [
  { icon: "dollar-sign", title: "Outcome-focused fees", description: "Our contracts are typically structured around outcomes such as employment, retention, and earnings, not just activities or participation." },
  { icon: "trending-up", title: "Evidence of cost-effectiveness", description: "Evaluations have found that performance-based models like ours, while sometimes higher-cost upfront, can be more cost-effective over time as clients stay employed longer and rely less on public benefits." },
  { icon: "file-text", title: "Transparent data and reporting", description: "We support robust tracking and reporting to meet monitoring, audit, and evaluation requirements, including participation, placement, retention, and earnings." }
];

// Implementation Steps
const implementationSteps = [
  {
    number: "01",
    title: "Co-design & planning",
    description: "We start by understanding your policy goals, funding streams, and performance requirements. Together, we define target populations, service flows, and outcome metrics that align with your strategy and federal guidelines."
  },
  {
    number: "02",
    title: "Rapid stand-up of operations",
    description: "We recruit and train staff, secure and equip office locations where needed, and connect with local employer and community networks. Our history includes standing up new locations within about a month of contract award when necessary."
  },
  {
    number: "03",
    title: "Service delivery & continuous improvement",
    description: "We deliver the full blend of services—outreach, assessment, work readiness, training, placement, and retention—while using data to monitor progress and continuously refine strategies."
  },
  {
    number: "04",
    title: "Reporting, evaluation & scaling",
    description: "We provide regular performance reports and collaborate on evaluations to support accountability and inform future policy. Successful pilots can be scaled to additional sites or populations."
  }
];

// Testimonials
const testimonials = [
  {
    text: "America Works is a program that has the best staff. They helped me close my TANF case and move into steady employment.",
    author: "Congressional Testimony"
  },
  {
    text: "I remember when I was a member of America Works, the reps really helped me through rough times and helped me find employment—really nice people.",
    author: "Former Client"
  },
  {
    text: "After decades in the welfare-to-work field, America Works' leadership has been at the forefront of advocating for performance-based contracts that tie funding to results.",
    author: "Policy Research Analysis"
  }
];

// FAQ Data
const faqItems = [
  {
    question: "What kinds of contracts does America Works typically operate under?",
    answer: "We work under a range of contract structures, including hybrid and fully performance-based models, cost reimbursement with performance incentives, and braided funding arrangements across TANF, SNAP E&T, WIOA, and local funds. We tailor contract structures to your regulatory environment and reporting needs."
  },
  {
    question: "How do you ensure accountability and data quality?",
    answer: "We build data and reporting requirements into program design from the start, aligning with federal and state rules. Our teams track participation, services, placements, retention, and earnings, and we regularly participate in third-party evaluations and audits."
  },
  {
    question: "Can you work in both urban and rural areas?",
    answer: "Yes. We have operated programs in large metro areas and smaller communities, adapting services and staffing models to local labor markets and transportation realities."
  },
  {
    question: "How quickly can you launch a new program?",
    answer: "Timelines depend on scope and procurement requirements, but we have a track record of establishing new offices and operations within short timeframes—sometimes within a month of award—when needed."
  },
  {
    question: "What populations do you have experience serving?",
    answer: "We have extensive experience with TANF and SNAP participants, young adults, military veterans, individuals who have experienced homelessness, justice-involved individuals, non-custodial parents, and people receiving disability benefits."
  },
  {
    question: "Do you only serve one state or region?",
    answer: "No. We operate in multiple states and the District of Columbia through a network of legally separate but coordinated entities, offering both in-person and virtual services."
  }
];

export default function Partners() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="Government Partnerships"
        headline="Proven performance-based workforce outcomes."
        subheadline="Partnering with government agencies for 40+ years to deliver performance-based workforce programs that achieve measurable outcomes."
        image="/images/business-career-and-placement.jpg"
        imageAlt="Government partnership success"
        primaryCta={{ href: "#contact", label: "Talk to our partnerships team" }}
        secondaryCta={{ href: "#contact", label: "Discuss your program or RFP" }}
      />

      {/* Trust Strip */}
      <TrustStrip items={trustItems} />

      {/* Who We Partner With */}
      <section className="section py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Partnerships</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Who we partner with—and how we help.</h2>
            <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              America Works collaborates with public agencies and community-based organizations across the country to deliver employment and training services in both urban and rural settings. We tailor each program to local needs while staying true to our work-first, outcomes-driven approach.
            </p>
          </header>

          <h3 className="font-display text-2xl text-center mb-8 font-normal tracking-tight">We commonly partner with agencies responsible for:</h3>

          <ListGrid items={partnerTypes} />
        </div>
      </section>

      {/* Service Model */}
      <section className="split-section grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[80vh] relative" id="service-model">
        <div className="split-image relative overflow-hidden bg-gray-100 h-full min-h-[400px] lg:min-h-full">
          <img src="/images/resume-coaching.jpg" alt="Blended service model" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
        <div className="split-content flex items-center p-12 lg:p-20 bg-white">
          <div className="split-content-inner max-w-xl">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Service Model</div>
            <h2 className="split-headline font-display text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-gray-900 mb-6">Our blended service model</h2>
            <p className="split-description text-lg text-gray-600 leading-relaxed mb-8">
              Our programs typically combine work readiness, training, job placement, and retention services into a single integrated pathway—so participants move as quickly as possible into work while building skills for advancement.
            </p>
            <FeatureGrid items={serviceModelFeatures} />
          </div>
        </div>
      </section>

      {/* Work-First Model */}
      <section className="section py-32 bg-white">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Model</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">A work-first model built around measurable outcomes.</h2>
            <p className="section-intro text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our approach is grounded in the belief that meaningful employment is the most effective path out of poverty. We design programs that prioritize rapid attachment to work, backed by training, wraparound services, and ongoing support to sustain employment.
            </p>
          </header>

          <StepsGrid items={workFirstSteps} />
        </div>
      </section>

      {/* Why Agencies Choose Us */}
      <section className="split-section grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[80vh] relative" id="why-partner">
        <div className="split-image relative overflow-hidden bg-gray-100 h-full min-h-[400px] lg:min-h-full order-2 lg:order-1">
          <img src="/images/business-career-and-placement.jpg" alt="Agency partnership" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
        <div className="split-content flex items-center p-12 lg:p-20 bg-gray-50 order-1 lg:order-2">
          <div className="split-content-inner max-w-xl">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Value</div>
            <h2 className="split-headline font-display text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-gray-900 mb-6">Why agencies choose America Works as a vendor.</h2>
            <p className="split-description text-lg text-gray-600 leading-relaxed mb-8">
              Agencies work with us because we combine decades of experience with the flexibility to meet local requirements and performance standards.
            </p>
            <FeatureGrid items={whyAgenciesFeatures} />
          </div>
        </div>
      </section>

      {/* Performance-Based Contracting */}
      <section className="section py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Accountability</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Built for performance-based contracts.</h2>
            <p className="section-intro text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              America Works has been cited in independent research and policy discussions as a leading example of performance-based contracting in welfare-to-work and employment services.
            </p>
          </header>

          <h3 className="font-display text-2xl text-center mb-12 font-normal tracking-tight text-gray-900">Aligning incentives with your outcomes</h3>

          <FeatureGrid items={performanceFeatures} columns={3} variant="card" />

          <div className="max-w-3xl mx-auto mt-16 p-10 bg-white border-l-4 border-aw-blue">
            <p className="text-xl leading-relaxed text-gray-800 italic mb-4">
              "Providers like America Works demonstrated how individualized performance-based contracts could drive stronger engagement and employment outcomes."
            </p>
            <p className="text-sm text-gray-600 font-semibold">
              — Summary of findings from independent reviews of TANF and workforce contracts
            </p>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="section py-32 bg-gray-50" id="implementation">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Process</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">How we build and run programs with you.</h2>
            <p className="section-intro text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We know every jurisdiction is different. Our implementation approach is collaborative and structured, so you get a partner—not just a vendor.
            </p>
          </header>

          <StepsGrid items={implementationSteps} />

          <div className="text-center mt-16">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 bg-aw-blue text-white px-8 py-4 rounded font-semibold hover:bg-aw-blue-dark transition-colors">
              <span>Discuss your program or upcoming RFP</span>
              <i data-lucide="arrow-right" className="w-[18px] h-[18px]"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-32 bg-white">
        <div className="container max-w-container mx-auto px-8">
          <header className="section-header text-center mb-24">
            <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">Testimonials</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">What people say about partnering with America Works.</h2>
          </header>

          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-gray-50 p-8 rounded-lg">
                <p className="testimonial-text text-lg text-gray-700 leading-relaxed mb-6 italic">
                  {testimonial.text}
                </p>
                <p className="testimonial-author text-sm font-semibold text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        label="FAQ"
        headline="Questions agencies often ask."
        items={faqItems}
        id="faq"
      />

      {/* CTA */}
      <section className="cta-section py-32 bg-gray-950 text-white text-center relative overflow-hidden" id="contact">
        <div className="container max-w-container mx-auto px-8">
          <div className="cta-content relative z-[2]">
            <h2 className="font-display text-display-md font-normal mb-6 tracking-tight">Let's explore what we can build together.</h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Whether you're planning a new initiative, redesigning an existing program, or exploring performance-based contracting, America Works can be a partner in designing and delivering workforce services that move people into sustainable employment.
            </p>
            <div className="cta-buttons flex gap-5 justify-center flex-wrap">
              <a href="#" className="btn-white inline-flex items-center gap-2 py-5 px-12 bg-white text-gray-950 rounded-md font-body text-sm font-semibold no-underline shadow-lg">
                <span>Talk to our partnerships team</span>
                <i data-lucide="arrow-right" style={{ width: '18px', height: '18px' }}></i>
              </a>
              <a href="#" className="btn-outline-white inline-flex items-center gap-2 py-5 px-12 bg-transparent text-white border-2 border-white/50 rounded-md font-body text-sm font-semibold no-underline">
                <span>Share details about your program or RFP</span>
                <i data-lucide="file-text" style={{ width: '18px', height: '18px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
