interface TimelineStep {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const steps: TimelineStep[] = [
  {
    number: '01',
    title: 'We start with you',
    description: "Tell us your goals. Share your challenges. We'll create a personalized plan that addresses everything from childcare to confidence.",
    image: '/images/resume-coaching.jpg',
    imageAlt: 'Connect'
  },
  {
    number: '02',
    title: 'Get job-ready fast',
    description: "Polish your resume. Nail your interviews. Learn new skills. We'll connect you directly with employers who are hiring now. No endless applications.",
    image: '/images/business-career-and-placement.jpg',
    imageAlt: 'Prepare'
  },
  {
    number: '03',
    title: 'Keep growing',
    description: "Your first day isn't our last day. We stick around to help you solve problems, earn raises, and build the career you deserve.",
    image: '/images/opportunities.jpg',
    imageAlt: 'Succeed'
  }
];

export default function HomeTimeline() {
  return (
    <section className="how-it-works pt-16 pb-16 bg-gray-50 relative">
      <div className="container max-w-container mx-auto px-8">
        <header className="section-header text-center mb-24">
          <span className="label-system font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4 block">Process</span>
          <h2 className="display-md font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Three steps to your next paycheck</h2>
          <p className="display-subhead max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Most participants start working within weeks. Here's how:
          </p>
        </header>

        <div className="steps-grid relative flex flex-col gap-16">
          {/* Progressive timeline */}
          <div className="timeline-track">
            <div className="timeline-line-bg"></div>
            <div className="timeline-line-fill"></div>
            {steps.map((step, index) => (
              <div key={index} className="timeline-dot" data-step={step.number}></div>
            ))}
          </div>

          {steps.map((step, index) => (
            <article
              key={index}
              className={`step-card grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center relative ${index < steps.length - 1 ? 'mb-8 lg:mb-32' : 'mb-0'} opacity-0`}
              data-step={step.number}
            >
              <div className="step-number-large">{step.number}</div>
              <div className="step-accent"></div>

              <div className="step-content">
                <div className="step-number">Step {step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <img src={step.image} alt={step.imageAlt} loading="lazy" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <a href="#jobseekers" className="btn-primary"><span>Join millions who found their path</span></a>
        </div>
      </div>
    </section>
  );
}
