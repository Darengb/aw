import type { ProgramItem } from '../../lib/types'

interface ProgramGridProps {
  items: ProgramItem[]
  className?: string
}

export function ProgramGrid({ items, className = '' }: ProgramGridProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-4 border-b border-gray-200 last:border-b-0"
        >
          <div className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            {item.label}
          </div>
          <div className="text-gray-600 leading-relaxed">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProgramGrid
