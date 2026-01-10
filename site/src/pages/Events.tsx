import { useState } from 'react'
import { MapPin, Clock, ChevronDown } from 'lucide-react'
import { CTASection } from '../components/sections/CTASection'
import { SectionHeader } from '../components/sections/SectionHeader'
import { getEvents } from '../lib/content'
import type { EventData } from '../lib/content'

type FilterCategory = 'all' | 'job-fair' | 'workshop'

export function Events() {
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const allEvents = getEvents()

  const filteredEvents = filter === 'all'
    ? allEvents
    : allEvents.filter(event => event.category === filter)

  const toggleEvent = (slug: string) => {
    setExpandedEvent(expandedEvent === slug ? null : slug)
  }

  return (
    <div className="theme-red">
      {/* Page Header - simpler header style for Events */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
              <span className="text-aw-red">// </span>Upcoming Events
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
              Connect. Learn. <span className="italic">Get Hired.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Job fairs, career workshops, and hiring events across the country. Find opportunities
              to advance your career and connect with employers who are ready to hire.
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
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-3">
                <span className="text-aw-red">// </span>Calendar
              </div>
              <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-black">
                Upcoming Events
              </h2>
            </div>
            <div className="flex gap-4">
              <FilterButton
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                All Events
              </FilterButton>
              <FilterButton
                active={filter === 'job-fair'}
                onClick={() => setFilter('job-fair')}
              >
                Job Fairs
              </FilterButton>
              <FilterButton
                active={filter === 'workshop'}
                onClick={() => setFilter('workshop')}
              >
                Workshops
              </FilterButton>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.slug}
                event={event}
                index={index}
                isExpanded={expandedEvent === event.slug}
                onToggle={() => toggleEvent(event.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              label="Stay Updated"
              headline="Never miss an opportunity."
              intro="Subscribe to get notified about upcoming job fairs, workshops, and hiring events in your area."
              centered
            />
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mt-10">
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
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Can't find an event near you?"
        description="Reach out to us directly. We can connect you with opportunities and services regardless of location."
        primaryCta={{ label: 'Start Your Journey', href: '/jobseekers' }}
        secondaryCta={{ label: 'Find a Location', href: '#contact' }}
      />
    </div>
  )
}

// Filter Button Component
interface FilterButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded transition-all ${
        active
          ? 'bg-black text-white'
          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
      }`}
    >
      {children}
    </button>
  )
}

// Event Card Component
interface EventCardProps {
  event: EventData
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function EventCard({ event, index, isExpanded, onToggle }: EventCardProps) {
  const isEven = index % 2 === 1

  return (
    <div
      className={`event-card bg-white border border-gray-200 rounded overflow-hidden transition-all duration-400 relative group hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300`}
    >
      {/* Top accent bar on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${
          isEven ? 'bg-aw-blue' : 'bg-aw-red'
        } transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100`}
      />

      {/* Date Block */}
      <div className="bg-gray-50 p-6 text-center border-b border-gray-200 transition-colors group-hover:bg-gray-100">
        {event.featured && (
          <div className={`inline-block px-2 py-0.5 ${isEven ? 'bg-aw-blue' : 'bg-aw-red'} text-white text-[0.6rem] font-mono font-semibold uppercase tracking-wider rounded mb-2`}>
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
        <h3 className="font-display text-2xl font-normal leading-tight text-black mb-3 tracking-tight">
          {event.title}
        </h3>
        <p className="text-[0.9375rem] text-gray-600 leading-relaxed mb-5">
          {event.description}
        </p>

        {/* Meta Info */}
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
        {event.details && event.details.length > 0 && (
          <button
            onClick={onToggle}
            className={`flex items-center justify-between w-full mt-5 text-sm font-semibold ${
              isEven ? 'text-aw-blue' : 'text-aw-red'
            } hover:opacity-80 transition-colors`}
          >
            <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        {/* Expandable Details */}
        {event.details && event.details.length > 0 && (
          <div
            className={`overflow-hidden transition-all duration-400 ${
              isExpanded ? 'max-h-[300px]' : 'max-h-0'
            }`}
          >
            <div className="pt-5 mt-5 border-t border-gray-200">
              <ul className="space-y-2">
                {event.details.map((detail, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-sm text-gray-700"
                  >
                    <span
                      className={`absolute left-0 top-2 w-1 h-1 rounded-full ${
                        isEven ? 'bg-aw-blue' : 'bg-aw-red'
                      }`}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
