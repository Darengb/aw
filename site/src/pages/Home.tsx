import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import HomeHero from '../components/home/HomeHero';
import SectionHeader from '../components/home/SectionHeader';
import GoogleReviewCard from '../components/home/GoogleReviewCard';
import HomeTimeline from '../components/home/HomeTimeline';
import PathCard from '../components/home/PathCard';
import PopulationItem from '../components/home/PopulationItem';
import ValueProp from '../components/home/ValueProp';
import TestimonialCard from '../components/home/TestimonialCard';
import CTASection from '../components/home/CTASection';

// Google Reviews Data
const googleReviews1 = [
  {
    quote: <>I was truly impressed with the <strong>dedication</strong> these people show their clients. Their enthusiasm is above par. The empathy shown to me was awesome.</>,
    author: "Carlos"
  },
  {
    quote: <>What an organization. I have felt like <strong>I matter</strong> there more than anywhere in a long time. The staff are professional professionals if that makes sense.</>,
    author: "John"
  },
  {
    quote: <>Great experience for people re-entering the workforce. The environment is <strong>friendly and welcoming</strong> and everyone is ready to help.</>,
    author: "Sarah"
  }
];

const googleReviews2 = [
  {
    quote: <>I am a very skeptical person when it comes to people offering assistance, but America Works was <strong>much more</strong>.</>,
    author: "Anthony"
  },
  {
    quote: <>I've learned a lot about myself working with the job trainer and developers. <strong>Highly recommended</strong> for those interested in their job search.</>,
    author: "Mecia"
  },
  {
    quote: <>America Works really <strong>takes their time</strong> with their clients and gives us more understanding on job searching.</>,
    author: "Tatyanna"
  }
];

// Path Cards Data
const pathCards = [
  {
    number: "01",
    numberLabel: "Jobseekers",
    title: "Your career starts here",
    description: "Life happens. Careers change. We meet you where you are and help you get where you're going. Personalized coaching, direct employer connections, and support that lasts beyond day one.",
    features: [
      "One-on-one career coaching and development",
      "Direct access to verified hiring employers",
      "Skills training aligned with market demand",
      "90+ days of post-placement support"
    ],
    image: "/images/young-professional-working.jpg",
    imageAlt: "Professional development",
    links: [{ href: "/jobseekers", label: "Get started" }],
    id: "jobseekers"
  },
  {
    number: "02",
    numberLabel: "Government & Partners",
    title: "Performance you can measure",
    description: "We deliver what matters: people employed, staying employed. Our performance-based model aligns our success with yours, backed by four decades of proven results.",
    features: [
      "Pay-for-performance contract structures",
      "TANF, SNAP, WIOA program expertise",
      "Real-time data and transparent reporting",
      "Local execution, national infrastructure"
    ],
    image: "/images/team-of-workers-celebrating-success-at-a-shipping.jpg",
    imageAlt: "Team success",
    links: [
      { href: "/employers", label: "For Employers" },
      { href: "/partners", label: "For Partners" }
    ],
    reversed: true,
    id: "partners"
  }
];

// Populations Data
const populations = [
  { icon: "hand-coins", description: "TANF and SNAP recipients ready to work" },
  { icon: "graduation-cap", description: "Young adults launching their careers" },
  { icon: "shield", description: "Veterans transitioning to civilian life" },
  { icon: "home", description: "People rebuilding after homelessness" },
  { icon: "key", description: "Returning citizens seeking second chances" },
  { icon: "heart", description: "Non-custodial parents providing for families" },
  { icon: "accessibility", description: "People with disabilities pursuing independence" }
];

// Value Props Data
const valueProps = [
  { icon: "zap", title: "Risk-free performance", description: "You pay only for outcomes achieved" },
  { icon: "target", title: "Program expertise", description: "TANF to reentry, we've done it all" },
  { icon: "bar-chart-3", title: "Transparency", description: "Data you can trust" },
  { icon: "scale", title: "Scale without sacrifice", description: "High volume, high touch" },
  { icon: "handshake", title: "Community connections", description: "We know every local job market" },
  { icon: "shield-check", title: "Federal vendor", description: "NAICS 561311" },
  { icon: "map", title: "Multi-state operator", description: "Coast to coast presence" },
  { icon: "award", title: "Woman-owned enterprise", description: "Certified diverse supplier" },
  { icon: "landmark", title: "Policy expertise", description: "Advised Congress and White House" }
];

// Testimonials Data
const testimonials = [
  {
    quote: "Six months ago, I was sleeping in my car. Today, I'm a supervisor with benefits and a future. America Works didn't just find me a job. They gave me hope.",
    author: "Marcus, Georgia",
    role: "Jobseeker"
  },
  {
    quote: "In 15 years of managing TANF programs, I've never seen a partner deliver like this. They hit every metric while treating participants with genuine respect.",
    author: "State TANF Director",
    role: "Government Partner"
  },
  {
    quote: "America Works doesn't just send us applicants. They send us prepared, motivated employees who stay.",
    author: "Regional HR Manager",
    role: "Employer"
  }
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all elements that need scroll-triggered visibility
    const selectors = [
      '.section-header',
      '.path-card',
      '.population-item',
      '.value-prop-item',
      '.testimonial-card'
    ];

    selectors.forEach((selector) => {
      const elements = pageRef.current?.querySelectorAll(selector);
      elements?.forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <HomeHero />

      {/* Service Delivery */}
      <section className="audience-paths pt-16 pb-0 relative" id="paths">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Service Delivery"
            headline="Three paths to one powerful mission"
            subhead="Whether you're seeking employment or seeking outcomes, we deliver with precision and care."
          >
            <div className="section-nav-links flex gap-6 justify-center">
              <Link to="/jobseekers" className="font-body text-sm font-semibold text-gray-700 no-underline transition-colors duration-200 hover:text-aw-blue">Jobseekers</Link>
              <Link to="/employers" className="font-body text-sm font-semibold text-gray-700 no-underline transition-colors duration-200 hover:text-aw-blue">Employers</Link>
              <Link to="/partners" className="font-body text-sm font-semibold text-gray-700 no-underline transition-colors duration-200 hover:text-aw-blue">Partners</Link>
            </div>
          </SectionHeader>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="pt-0 pb-6 bg-white">
        <div className="md:container md:max-w-container mx-auto md:px-8">
          <div className="testimonials-grid flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide">
            {googleReviews1.map((review, index) => (
              <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <HomeTimeline />

      {/* Google Reviews: Exceeded Expectations */}
      <section className="py-6 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-0">
            {googleReviews2.map((review, index) => (
              <GoogleReviewCard key={index} quote={review.quote} author={review.author} />
            ))}
          </div>
        </div>
      </section>

      {/* Audience Path Cards */}
      <section className="audience-path-cards py-0 relative">
        <div className="container max-w-container mx-auto px-8">
          <div className="paths-grid flex flex-col gap-32">
            {pathCards.map((card, index) => (
              <PathCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="locations-section py-32 relative bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Coverage"
            headline="Help where you need it"
            subhead="Big enough to scale. Small enough to care. Find America Works in your community or connect with us virtually from anywhere."
          />

          {/* Interactive Coverage Map */}
          <div className="coverage-map-container max-w-[1000px] mx-auto my-16 relative">
            <div id="us-coverage-map">
              {/* SVG will be loaded here by JavaScript */}
            </div>

            <div className="map-legend flex gap-10 justify-center mt-8 pt-8">
              <div className="legend-item">
                <div className="legend-dot active"></div>
                <span>Local Programs + Ticket To Work</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot bg-white border-2 border-gray-400"></div>
                <span>Ticket To Work</span>
              </div>
            </div>
          </div>

          <div className="section-cta text-center">
            <a href="#contact" className="btn-link inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-gray-900 no-underline transition-all duration-200 hover:text-aw-blue">Find your local office →</a>
            <p className="cta-subtext mt-3 text-sm text-gray-600">In-person and virtual services available</p>
          </div>
        </div>
      </section>

      {/* Populations We Serve */}
      <section className="populations-served py-32 relative bg-white overflow-hidden">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Equity & Access"
            headline="Everyone deserves a chance to work"
            subhead="We specialize in helping people overcome real barriers"
          />

          <div className="populations-grid grid grid-cols-4 gap-0 mt-16 relative">
            {populations.map((pop, index) => (
              <PopulationItem key={index} icon={pop.icon} description={pop.description} />
            ))}
          </div>

          <div className="ticket-to-work-badge">
            <div className="badge-icon-large"><i data-lucide="check"></i></div>
            <div className="badge-content">
              <h3>Official Ticket to Work Provider</h3>
              <p>We're an approved Employment Network, helping Social Security beneficiaries work without losing critical benefits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partners */}
      <section className="government-partners py-32 bg-gray-50">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Public Sector"
            headline="The partner agencies trust most"
            subhead="When success is measured in human outcomes, not just compliance metrics, you need a partner who delivers both. America Works brings four decades of experience turning complex program requirements into simple results: employment that lasts."
          />

          <div className="value-props-grid grid grid-cols-3 gap-0 mt-16 mb-20">
            {valueProps.map((prop, index) => (
              <ValueProp key={index} icon={prop.icon} title={prop.title} description={prop.description} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="btn-primary"><span>Schedule a partnership call</span></a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-32 bg-white">
        <div className="container max-w-container mx-auto px-8">
          <SectionHeader
            label="Social Proof"
            headline="Success speaks louder than promises"
          />

          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} quote={testimonial.quote} author={testimonial.author} role={testimonial.role} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
