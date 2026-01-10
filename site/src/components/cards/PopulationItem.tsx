import type { PopulationItemProps } from '../../lib/types'
import * as LucideIcons from 'lucide-react'

type IconName = keyof typeof LucideIcons

export function PopulationItem({ icon, title, description }: PopulationItemProps) {
  // Get the icon component from lucide-react
  const IconComponent = LucideIcons[icon as IconName] as React.ComponentType<{
    className?: string
    size?: number
  }>

  return (
    <div className="population-item bg-white border border-gray-200 p-8 rounded-lg relative group transition-all duration-400 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1">
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-theme-color transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

      {/* Icon */}
      <div className="mb-4">
        {IconComponent && (
          <IconComponent
            className="w-10 h-10 text-theme-color opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            size={40}
          />
        )}
      </div>

      {/* Title */}
      <h3 className="font-body text-lg font-semibold text-gray-900 mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
