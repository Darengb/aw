import type { EvidenceItem } from '../../lib/types'

interface EvidenceGridProps {
  items: EvidenceItem[]
}

export function EvidenceGrid({ items }: EvidenceGridProps) {
  return (
    <div className="evidence-grid grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[var(--gray-200)] mt-16">
      {items.map((item, index) => {
        const isLastInRow = (index + 1) % 2 === 0

        return (
          <div
            key={index}
            className={`
              evidence-card relative bg-transparent p-12 border-b border-[var(--gray-200)] transition-all duration-300
              hover:bg-[var(--gray-50)]
              ${!isLastInRow ? 'lg:border-r lg:border-r-[var(--gray-200)]' : ''}
            `}
          >
            {/* Counter number and top line animation handled by CSS */}

            <h3 className="text-xl font-medium text-[var(--black)] mb-8 mt-8 tracking-tight leading-snug">
              {item.title}
            </h3>

            <p className="text-[var(--gray-700)] leading-relaxed text-sm mb-8">
              {item.description}
            </p>

            {item.source && (
              <div className="pt-6 mt-6 border-t border-[var(--gray-300)] text-[var(--gray-600)] text-sm leading-relaxed">
                <strong className="text-[var(--theme-color)] font-semibold font-mono text-xs uppercase tracking-wide">
                  Why this matters:
                </strong>{' '}
                {item.source}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EvidenceGrid
