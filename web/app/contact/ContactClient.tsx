'use client'

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Printer, Mail, Navigation, ChevronDown, Clock } from 'lucide-react';
import Link from 'next/link';
import type { OfficeLocation } from '@/utils/content-shared';

function OfficeCard({ office, index, isVisible }: { office: OfficeLocation; index: number; isVisible: boolean }) {
  const isEven = index % 2 === 1;
  const accentColor = isEven ? 'aw-blue' : 'aw-red';
  const mapSrc = `https://maps.google.com/maps?q=${office.lat},${office.lng}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${office.address}, ${office.city}, ${office.stateCode} ${office.zip}`
  )}`;

  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  // Only mount the iframe when the card scrolls into view
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`office-card group bg-white border border-gray-200 rounded overflow-hidden relative hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)] hover:border-gray-300 ${isVisible ? 'is-visible' : ''}`} data-slug={office.slug}>
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-${accentColor} scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100 z-10`}
      />

      {/* Map embed — deferred until card is near viewport */}
      <div ref={mapRef} className="relative h-48 overflow-hidden bg-gray-100">
        {showMap ? (
          <iframe
            src={mapSrc}
            className="office-map w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${office.title}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <MapPin className="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className={`font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] mb-2 ${isEven ? 'text-aw-blue' : 'text-aw-red'}`}>
          {office.stateCode}
        </div>

        <h3 className="font-display text-xl font-normal leading-tight text-black mb-3 tracking-[-0.02em]">
          {office.title}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 text-[0.8125rem] text-gray-600 mb-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span>{office.address}, {office.city}, {office.stateCode} {office.zip}</span>
        </div>

        {/* Phone */}
        {office.phone && (
          <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600 mb-2">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a href={`tel:${office.phone.replace(/[^\d+]/g, '')}`} className="hover:text-black transition-colors no-underline text-gray-600">{office.phone}</a>
          </div>
        )}

        {/* Fax */}
        {office.fax && (
          <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600 mb-2">
            <Printer className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>Fax: {office.fax}</span>
          </div>
        )}

        {/* Email */}
        <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600 mb-2">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <a href={`mailto:${office.email}`} className="hover:text-black transition-colors no-underline text-gray-600">{office.email}</a>
        </div>

        {/* Hours */}
        {office.hours && (
          <div className="flex items-start gap-2 text-[0.8125rem] text-gray-600 mb-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="whitespace-pre-line">{office.hours}</span>
          </div>
        )}

        {/* Notes */}
        {office.notes && (
          <div className={`mt-3 px-3 py-1.5 text-xs font-semibold rounded ${isEven ? 'bg-aw-blue/10 text-aw-blue' : 'bg-aw-red/10 text-aw-red'}`}>
            {office.notes}
          </div>
        )}

        {/* Get Directions link */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 mt-5 pt-4 border-t border-gray-200 font-body text-sm font-semibold no-underline transition-colors duration-200 ${isEven ? 'text-aw-blue hover:text-aw-blue-dark' : 'text-aw-red hover:text-aw-red-dark'}`}
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
}

export default function ContactClient({ offices }: { offices: OfficeLocation[] }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const states = Array.from(new Set(offices.map(o => o.state))).sort();

  const filteredOffices = activeState === 'all'
    ? offices
    : offices.filter(o => o.state === activeState);

  const stateLabel = activeState === 'all' ? 'All States' : activeState;

  // IntersectionObserver for card fade-in — re-triggers on filter change
  useEffect(() => {
    setVisibleCards(new Set());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const slug = (entry.target as HTMLElement).dataset.slug;
            if (slug) {
              setTimeout(() => {
                setVisibleCards(prev => new Set(prev).add(slug));
              }, index * 80);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = pageRef.current?.querySelectorAll('.office-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [activeState]);

  return (
    <div ref={pageRef}>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// Our Offices</div>
            <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
              Find an office <span className="italic">near you.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              America Works operates {offices.length} offices across {states.length} states. Visit us for career services, employer partnerships, and workforce solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          {/* Section Header with Filter */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-3">// Locations</div>
              <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-black">
                Office Directory
              </h2>
            </div>

            {/* State Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:border-gray-400 transition-all min-w-[200px] justify-between"
              >
                <span>{stateLabel}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[200px] max-h-80 overflow-y-auto">
                  <button
                    onClick={() => { setActiveState('all'); setDropdownOpen(false); }}
                    className={`block w-full text-left px-5 py-2.5 text-sm transition-colors ${activeState === 'all' ? 'bg-gray-100 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    All States ({offices.length})
                  </button>
                  {states.map(state => {
                    const count = offices.filter(o => o.state === state).length;
                    return (
                      <button
                        key={state}
                        onClick={() => { setActiveState(state); setDropdownOpen(false); }}
                        className={`block w-full text-left px-5 py-2.5 text-sm transition-colors ${activeState === state ? 'bg-gray-100 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {state} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Office Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffices.map((office, index) => (
              <OfficeCard key={office.slug} office={office} index={index} isVisible={visibleCards.has(office.slug)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="max-w-container mx-auto px-8 relative z-10">
          <h2 className="font-display text-display-md font-normal mb-6 tracking-tight">Ready to get started?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Whether you&rsquo;re looking for work, hiring talent, or building workforce programs — we&rsquo;re here to help.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link
              href="/jobseekers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-950 font-semibold rounded transition-all hover:shadow-lg hover:-translate-y-0.5 no-underline"
            >
              <span>Find Work</span>
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold border-2 border-white/50 rounded transition-all hover:bg-white/10 hover:border-white no-underline"
            >
              <span>Partner With Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
