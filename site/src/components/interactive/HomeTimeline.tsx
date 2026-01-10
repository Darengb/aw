import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import type { TimelineItem } from '../../lib/types'

interface HomeTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function HomeTimeline({ items, className = '' }: HomeTimelineProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Horizontal Timeline Container */}
      <div className="relative pt-8 pb-4">
        {/* Background Line (gray) */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full" />

        {/* Animated Fill Line (red) */}
        <div
          className="absolute top-8 left-0 h-1 bg-[var(--aw-red)] rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? '100%' : '0%',
            transitionDelay: '0.2s',
          }}
        />

        {/* Timeline Items */}
        <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease, transform 0.5s ease`,
                transitionDelay: `${0.3 + index * 0.15}s`,
              }}
            >
              {/* Dot */}
              <div
                className="w-4 h-4 rounded-full bg-[var(--aw-red)] border-4 border-white shadow-md z-10 transition-transform duration-300 hover:scale-125"
              />

              {/* Content Below */}
              <div className="mt-6 text-center px-2">
                <div className="font-display text-2xl font-semibold text-gray-900 mb-1">
                  {item.year}
                </div>
                <div className="font-semibold text-sm text-gray-900 mb-1">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeTimeline
