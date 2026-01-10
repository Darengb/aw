import type { ScorecardItem } from '../../lib/types'

interface ScorecardGridProps {
  items: ScorecardItem[]
}

export function ScorecardGrid({ items }: ScorecardGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
      {items.map((item, index) => (
        <div
          key={index}
          className="scorecard-card relative bg-white border border-[var(--gray-200)] rounded p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--gray-300)]"
        >
          {/* Top line animation handled by CSS */}

          <h3 className="font-body text-lg font-semibold text-[var(--black)] mb-5 tracking-tight">
            {item.title}
          </h3>

          <ul className="list-none space-y-3">
            {item.items.map((listItem: string, listIndex: number) => (
              <li
                key={listIndex}
                className="relative pl-5 text-[var(--gray-700)] leading-relaxed text-sm before:content-[''] before:absolute before:left-0 before:top-[0.5rem] before:w-[3px] before:h-4 before:bg-[var(--theme-color)] before:rounded-sm"
              >
                {listItem}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ScorecardGrid
