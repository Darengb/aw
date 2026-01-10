import type { FeatureItem } from '../../lib/types'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface FeatureGridProps {
  items: FeatureItem[]
  columns?: 2 | 3
}

// Helper to get icon component from string name
function getIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  // Convert kebab-case to PascalCase
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  return icons[pascalName] || icons['Circle']
}

export function FeatureGrid({ items, columns = 2 }: FeatureGridProps) {
  return (
    <div
      className="grid gap-0 mt-16 border-t border-[var(--gray-200)]"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {items.map((item, index) => {
        const IconComponent = getIcon(item.icon)
        const isLastInRow = (index + 1) % columns === 0

        return (
          <div
            key={index}
            className={`
              group relative flex items-start gap-4 p-8 bg-transparent border-b border-[var(--gray-200)] transition-all duration-400
              hover:bg-[var(--gray-50)]
              ${!isLastInRow ? 'border-r border-r-[var(--gray-200)]' : ''}
            `}
          >
            {/* Top line animation on hover */}
            <div className="absolute top-0 left-0 w-0 h-0.5 bg-[var(--theme-color)] transition-[width] duration-500 group-hover:w-full" />

            <div className="w-10 h-10 flex items-center justify-center text-[var(--gray-500)] flex-shrink-0 transition-all duration-400 group-hover:text-[var(--theme-color)] group-hover:scale-110">
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-body text-[var(--text-lg)] font-semibold text-[var(--black)] mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[var(--text-base)] text-[var(--gray-600)] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FeatureGrid
