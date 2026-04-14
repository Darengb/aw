'use client'

import { useEffect, useRef } from 'react';

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
    image: '/images/photoshoot/DSC3109.jpg',
    imageAlt: 'One-on-one meeting with career specialist'
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
    image: '/images/photoshoot/DSC2753.jpg',
    imageAlt: 'Professional woman thriving in her career'
  }
];

export default function HomeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!container || !track || !fill) return;

    const stepCards = container.querySelectorAll<HTMLElement>('.step-card[data-step]');
    const dots = dotRefs.current;
    if (stepCards.length === 0) return;

    // Intersection observer for step card fade-in
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
    stepCards.forEach((card) => observer.observe(card));

    // Position timeline track and dots
    function positionDots() {
      if (stepCards.length === 0 || !track || !fill) return;

      const isMobile = window.innerWidth <= 1024;
      const firstCard = stepCards[0];
      const lastCard = stepCards[stepCards.length - 1];

      let firstCardCenter: number;
      let lastCardCenter: number;

      if (isMobile) {
        const firstContent = firstCard.querySelector('.step-content') as HTMLElement;
        const lastContent = lastCard.querySelector('.step-content') as HTMLElement;
        firstCardCenter = firstContent.offsetTop + firstCard.offsetTop + 40;
        lastCardCenter = lastContent.offsetTop + lastCard.offsetTop + 40;
      } else {
        firstCardCenter = firstCard.offsetTop + (firstCard.offsetHeight / 2);
        lastCardCenter = lastCard.offsetTop + (lastCard.offsetHeight / 2);
      }

      track.style.top = `${firstCardCenter}px`;
      track.style.height = `${lastCardCenter - firstCardCenter}px`;
      track.style.bottom = 'auto';

      const trackTop = firstCardCenter;
      stepCards.forEach((card, index) => {
        const dot = dots[index];
        if (!dot) return;
        let cardCenter: number;
        if (isMobile) {
          const content = card.querySelector('.step-content') as HTMLElement;
          cardCenter = card.offsetTop + content.offsetTop + 40;
        } else {
          cardCenter = card.offsetTop + (card.offsetHeight / 2);
        }
        dot.style.top = `${cardCenter - trackTop}px`;
      });
    }

    // Scroll-based fill
    function updateProgress() {
      if (!track || !fill) return;
      const trackRect = track.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const trackHeight = track.offsetHeight;

      const trackTopRelativeToCenter = trackRect.top - viewportCenter;
      const trackBottomRelativeToCenter = trackRect.bottom - viewportCenter;

      let fillPct = 0;
      if (trackBottomRelativeToCenter < 0) {
        fillPct = 100;
      } else if (trackTopRelativeToCenter > 0) {
        fillPct = 0;
      } else {
        fillPct = (-trackTopRelativeToCenter / trackHeight) * 100;
        fillPct = Math.max(0, Math.min(100, fillPct));
      }
      fill.style.height = `${fillPct}%`;
    }

    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }

    const timer = setTimeout(positionDots, 100);
    window.addEventListener('resize', positionDots, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', positionDots);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="how-it-works pt-16 md:pb-16 bg-gray-50 relative">
      <div className="container max-w-container mx-auto px-8">
        <header className="section-header text-center mb-24">
          <span className="label-system font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4 block">Process</span>
          <h2 className="display-md font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">Three steps to your next paycheck</h2>
          <p className="display-subhead max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Most participants start working within weeks. Here&rsquo;s how:
          </p>
        </header>

        <div className="steps-grid relative flex flex-col gap-16" ref={containerRef}>
          {/* Progressive timeline */}
          <div ref={trackRef} className="timeline-track">
            <div className="timeline-line-bg"></div>
            <div ref={fillRef} className="timeline-line-fill"></div>
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { dotRefs.current[index] = el; }}
                className="timeline-dot"
                data-step={step.number}
              ></div>
            ))}
          </div>

          {steps.map((step, index) => (
            <article
              key={index}
              className={`step-card grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center relative ${index < steps.length - 1 ? 'mb-8 lg:mb-32' : 'mb-0'}`}
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
          <a href="/jobseekers" className="btn-primary"><span>Join millions who found their path</span></a>
        </div>
      </div>
    </section>
  );
}
