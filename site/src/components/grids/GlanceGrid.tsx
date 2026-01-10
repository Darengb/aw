import type { GlanceItem } from '../../lib/types'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface GlanceGridProps {
  items: GlanceItem[]
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

export function GlanceGrid({ items }: GlanceGridProps) {
  return (
    <div className="glance-grid grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-[var(--gray-200)]">
      {items.map((item, index) => {
        const IconComponent = getIcon(item.icon)
        const isLastInRow = (index + 1) % 3 === 0

        return (
          <div
            key={index}
            className={`
              glance-item group relative flex items-start gap-5 p-10 pt-16 bg-transparent border-b border-[var(--gray-200)] transition-all duration-300
              hover:bg-[var(--gray-50)]
              ${!isLastInRow ? 'lg:border-r lg:border-r-[var(--gray-200)]' : ''}
            `}
          >
            {/* Counter number - handled by CSS counter */}
            {/* Top line animation - handled by CSS ::after */}

            <div className="glance-icon w-14 h-14 border border-[var(--gray-200)] rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-500 group-hover:border-[var(--theme-color)] group-hover:border-2 group-hover:scale-105">
              <IconComponent className="w-6 h-6 text-[var(--theme-color)]" />
            </div>
            <div className="flex-1">
              <p className="text-lg text-[var(--gray-700)] leading-relaxed">
                <strong className="text-[var(--black)] font-semibold block mb-1">
                  {item.title}
                </strong>
                {item.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GlanceGrid
