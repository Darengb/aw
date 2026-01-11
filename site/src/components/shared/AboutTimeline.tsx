import { useEffect, useRef } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AboutTimelineProps {
  items: TimelineItem[];
}

export default function AboutTimeline({ items }: AboutTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    const items = containerRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section py-32 bg-white relative overflow-hidden" id="timeline">
      <div className="container max-w-container mx-auto px-8">
        <header className="section-header text-center mb-20">
          <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">History</div>
          <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900">40 Years of Work-First Leadership</h2>
        </header>

        <div className="timeline-container relative mt-20 py-32" ref={containerRef}>
          <div className="timeline-track relative">
            {/* Horizontal timeline line for desktop */}
            <div className="timeline-line hidden lg:block absolute left-0 right-0 top-1/2 h-[3px] bg-gray-200 -translate-y-1/2 z-[1]">
              <div className="timeline-progress absolute top-0 left-0 h-full bg-aw-red w-0 transition-all duration-2500 ease-out shadow-[0_0_20px_rgba(236,20,12,0.3)]" />
            </div>

            {/* Vertical timeline line for mobile */}
            <div className="timeline-line lg:hidden absolute left-8 top-0 bottom-0 w-[3px] bg-gray-200 z-[1]">
              <div className="timeline-progress absolute top-0 left-0 w-full bg-aw-red h-0 transition-all duration-2500 ease-out shadow-[0_0_20px_rgba(236,20,12,0.3)]" />
            </div>

            <div className="timeline-items grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-4 relative z-[2]">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item relative opacity-0 transition-all duration-800 ease-out flex flex-col items-center px-4 lg:pl-8 ${
                    index % 2 === 0 ? 'lg:-mt-48' : 'lg:mt-48'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] bg-aw-red rounded-full z-[3] transition-all duration-400 shadow-[0_0_0_0_rgba(236,20,12,0.3)]"
                    style={{ [index % 2 === 0 ? 'bottom' : 'top']: '-3rem' }}
                  />

                  {/* Connecting line */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gray-200 z-[2]"
                    style={{ [index % 2 === 0 ? 'bottom' : 'top']: '-3rem' }}
                  />

                  <div className="font-mono text-sm font-bold text-aw-red text-center mb-4 tracking-wide uppercase">{item.year}</div>
                  <div className="timeline-content p-6 bg-white border border-gray-200 rounded-lg transition-all duration-400 shadow-sm hover:bg-gray-50 hover:shadow-xl hover:border-aw-red hover:-translate-y-1.5">
                    <div className="font-body text-lg font-semibold text-black mb-3 leading-snug text-center">{item.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed text-center">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
