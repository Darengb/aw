import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import type { TimelineItem } from '../../lib/types'

interface TimelineItemComponentProps {
  item: TimelineItem
  index: number
  isLeft: boolean
}

function TimelineItemComponent({ item, isLeft }: TimelineItemComponentProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: '-50px 0px',
  })

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8"
    >
      {/* Left Content */}
      <div
        className={`${isLeft ? 'text-right pr-4 md:pr-8' : ''}`}
        style={{
          opacity: isVisible && isLeft ? 1 : isLeft ? 0 : 1,
          transform: isVisible ? 'translateX(0)' : isLeft ? 'translateX(-30px)' : 'translateX(0)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          transitionDelay: '0.1s',
        }}
      >
        {isLeft && (
          <div className="space-y-2">
            <div className="font-display text-3xl font-semibold text-[var(--aw-red)]">
              {item.year}
            </div>
            <div className="font-semibold text-gray-900">
              {item.title}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </div>
          </div>
        )}
      </div>

      {/* Center Line with Dot */}
      <div className="relative flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full bg-[var(--aw-red)] border-4 border-white shadow-lg z-10 transition-all duration-500"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transitionDelay: '0.2s',
          }}
        />
        {/* Vertical Line Segment */}
        <div
          className="w-0.5 flex-1 bg-gray-200 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.3s',
          }}
        />
      </div>

      {/* Right Content */}
      <div
        className={`${!isLeft ? 'pl-4 md:pl-8' : ''}`}
        style={{
          opacity: isVisible && !isLeft ? 1 : !isLeft ? 0 : 1,
          transform: isVisible ? 'translateX(0)' : !isLeft ? 'translateX(30px)' : 'translateX(0)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          transitionDelay: '0.1s',
        }}
      >
        {!isLeft && (
          <div className="space-y-2">
            <div className="font-display text-3xl font-semibold text-[var(--aw-red)]">
              {item.year}
            </div>
            <div className="font-semibold text-gray-900">
              {item.title}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface AboutTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function AboutTimeline({ items, className = '' }: AboutTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

      {/* Timeline Items */}
      <div className="relative space-y-12">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={index}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  )
}

export default AboutTimeline
