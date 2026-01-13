import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEvents, parseEventContent } from '../utils/content';
import type { EventItem } from '../utils/content';

type FilterCategory = 'all' | 'job-fair' | 'workshop';

// EventCard component
function EventCard({
  event,
  index,
  isExpanded,
  onToggle
}: {
  event: EventItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEven = index % 2 === 1;
  const { intro, bullets } = parseEventContent(event.content);

  return (
    <div
      className={`event-card group bg-white border border-gray-200 rounded overflow-hidden relative transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)] hover:border-gray-300 ${isExpanded ? 'expanded' : ''}`}
      data-category={event.category}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${isEven ? 'bg-aw-blue' : 'bg-aw-red'} scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100`}
      />

      {/* Date Block */}
      <div className="bg-gray-50 p-6 text-center border-b border-gray-200 transition-colors duration-300 group-hover:bg-gray-100">
        {event.featured && (
          <div className="inline-block px-2 py-0.5 bg-aw-red text-white text-[0.6rem] font-mono font-semibold uppercase tracking-wider rounded mb-2">
            Featured
          </div>
        )}
        <div className={`font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] ${isEven ? 'text-aw-blue' : 'text-aw-red'}`}>
          {event.month}
        </div>
        <div className="font-display text-5xl font-normal leading-none text-black my-1">
          {event.day}
        </div>
        <div className="font-mono text-xs text-gray-500">
          {event.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
          {event.type}
        </div>

        <h3 className="font-display text-2xl font-normal leading-[1.25] text-black mb-3 tracking-[-0.02em]">
          {event.title}
        </h3>

        <p className="text-[0.9375rem] text-gray-600 leading-relaxed mb-5">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-2 pt-5 border-t border-gray-200">
          <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={`flex items-center justify-between w-full mt-5 p-0 bg-transparent border-none font-body text-sm font-semibold ${isEven ? 'text-aw-blue hover:text-aw-blue-dark' : 'text-aw-red hover:text-aw-red-dark'} cursor-pointer transition-colors duration-200`}
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expandable Details */}
        <div
          className={`overflow-hidden transition-all duration-400 ${isExpanded ? 'max-h-[300px]' : 'max-h-0'}`}
        >
          <div className="pt-5 border-t border-gray-200 mt-5">
            {intro && (
              <p className="text-[0.9375rem] text-gray-600 leading-relaxed mb-4">
                {intro}
              </p>
            )}
            {bullets.length > 0 && (
              <ul className="list-none p-0 m-0">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-sm text-gray-700 mb-2 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full"
                    style={{
                      '--before-bg': isEven ? '#323b97' : '#ec140c'
                    } as React.CSSProperties}
                  >
                    <span
                      className="before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full"
                      style={{ position: 'relative' }}
                    >
                      <span
                        className="absolute left-0 top-[6px] w-1 h-1 rounded-full"
                        style={{ backgroundColor: isEven ? '#323b97' : '#ec140c' }}
                      />
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const allEvents = getEvents();

  const filteredEvents = activeFilter === 'all'
    ? allEvents
    : allEvents.filter(event => event.category === activeFilter);

  const handleToggle = (slug: string) => {
    setExpandedCard(expandedCard === slug ? null : slug);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = pageRef.current?.querySelectorAll('.event-card');
    cards?.forEach((card) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  const filterTabs: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'All Events' },
    { key: 'job-fair', label: 'Job Fairs' },
    { key: 'workshop', label: 'Workshops' },
  ];

  return (
    <div ref={pageRef}>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// Upcoming Events</div>
            <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
              Connect. Learn. <span className="italic">Get Hired.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Job fairs, career workshops, and hiring events across the country. Find opportunities to advance your career and connect with employers who are ready to hire.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          {/* Section Header with Filters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-3">// Calendar</div>
              <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-black">Upcoming Events</h2>
            </div>
            <div className="flex gap-4">
              {filterTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveFilter(tab.key);
                    setExpandedCard(null);
                  }}
                  className={`px-4 py-2 text-sm font-semibold rounded transition-all ${
                    activeFilter === tab.key
                      ? 'bg-black text-white border border-black'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.slug}
                event={event}
                index={index}
                isExpanded={expandedCard === event.slug}
                onToggle={() => handleToggle(event.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// Stay Updated</div>
            <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-black mb-6">Never miss an opportunity.</h2>
            <p className="text-xl text-gray-600 mb-10">
              Subscribe to get notified about upcoming job fairs, workshops, and hiring events in your area.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-gray-50 border border-gray-300 rounded text-base focus:outline-none focus:border-aw-red focus:ring-2 focus:ring-aw-red/20 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-aw-red text-white font-semibold rounded transition-all hover:bg-aw-red-dark hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-950 text-white text-center relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="max-w-container mx-auto px-8 relative z-10">
          <h2 className="font-display text-display-md font-normal mb-6 tracking-tight">Can't find an event near you?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Reach out to us directly. We can connect you with opportunities and services regardless of location.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link
              to="/jobseekers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-950 font-semibold rounded transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold border-2 border-white/50 rounded transition-all hover:bg-white/10 hover:border-white"
            >
              <span>Find a Location</span>
              <MapPin className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
