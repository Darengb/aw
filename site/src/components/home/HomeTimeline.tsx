import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [trackStyle, setTrackStyle] = useState({ top: 120, height: 0 });
  const [dotPositions, setDotPositions] = useState<number[]>([0, 50, 100]);

  // Intersection observer for step cards visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const items = containerRef.current?.querySelectorAll('.step-card');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Position timeline and dots based on step card positions
  useEffect(() => {
    const positionTimeline = () => {
      const stepCards = containerRef.current?.querySelectorAll('.step-card');
      if (!stepCards || stepCards.length === 0) return;

      const firstCard = stepCards[0] as HTMLElement;
      const lastCard = stepCards[stepCards.length - 1] as HTMLElement;

      const firstCardCenter = firstCard.offsetTop + (firstCard.offsetHeight / 2);
      const lastCardCenter = lastCard.offsetTop + (lastCard.offsetHeight / 2);

      setTrackStyle({
        top: firstCardCenter,
        height: lastCardCenter - firstCardCenter
      });

      // Position dots
      const positions: number[] = [];
      stepCards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const cardCenter = htmlCard.offsetTop + (htmlCard.offsetHeight / 2);
        const relativePosition = ((cardCenter - firstCardCenter) / (lastCardCenter - firstCardCenter)) * 100;
        positions.push(relativePosition);
      });
      setDotPositions(positions);
    };

    // Initial position after render
    const timer = setTimeout(positionTimeline, 100);
    window.addEventListener('resize', positionTimeline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', positionTimeline);
    };
  }, []);

  // Scroll-based fill animation - directly manipulate DOM for smooth animation
  useEffect(() => {
    const updateProgress = () => {
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;

      const trackRect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const trackHeight = track.offsetHeight;

      const viewportCenter = windowHeight / 2;
      const trackTopRelativeToCenter = trackRect.top - viewportCenter;
      const trackBottomRelativeToCenter = trackRect.bottom - viewportCenter;

      let fillPercentage = 0;

      if (trackBottomRelativeToCenter < 0) {
        fillPercentage = 100;
      } else if (trackTopRelativeToCenter > 0) {
        fillPercentage = 0;
      } else {
        const scrolledDistance = -trackTopRelativeToCenter;
        fillPercentage = (scrolledDistance / trackHeight) * 100;
        fillPercentage = Math.max(0, Math.min(100, fillPercentage));
      }

      // Directly set style for immediate update (no React state delay)
      fill.style.height = `${fillPercentage}%`;
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackStyle]);

  return (
    <section className="how-it-works pt-16 md:pb-16 bg-gray-50 relative">
      <div className="container max-w-container mx-auto px-8">
        <header className="section-header text-center mb-24">
          <span className="label-system font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4 block">Process</span>
          <h2 className="display-md font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Three steps to your next paycheck</h2>
          <p className="display-subhead max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Most participants start working within weeks. Here's how:
          </p>
        </header>

        <div className="steps-grid relative flex flex-col gap-16 pl-8 md:pl-0" ref={containerRef}>
          {/* Progressive timeline */}
          <div
            ref={trackRef}
            className="timeline-track absolute left-[1.5rem] md:left-1/2 md:-translate-x-1/2 w-[2px] z-0 pointer-events-none"
            style={{
              top: `${trackStyle.top}px`,
              height: `${trackStyle.height}px`,
            }}
          >
            {/* Gray background line */}
            <div className="timeline-line-bg absolute inset-0 bg-gray-200"></div>
            {/* Red fill line that animates on scroll */}
            <div ref={fillRef} className="timeline-line-fill absolute left-0 top-0 w-full bg-aw-red" style={{ height: '0%' }}></div>
            {/* Dots positioned at each step */}
            {steps.map((step, index) => (
              <div key={index} className="timeline-dot absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-aw-red rounded-full z-[2]" style={{ top: `${dotPositions[index]}%` }} data-step={step.number}></div>
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
