import type { RoleItemProps } from '../../lib/types'
import * as LucideIcons from 'lucide-react'

type IconName = keyof typeof LucideIcons

export function RoleItem({ icon, label }: RoleItemProps) {
  // Get the icon component from lucide-react
  const IconComponent = LucideIcons[icon as IconName] as React.ComponentType<{
    className?: string
    size?: number
  }>

  return (
    <div className="role-item flex items-center gap-4 bg-white p-6 rounded border border-gray-200 transition-all duration-300 hover:border-theme-color hover:shadow-md">
      {IconComponent && (
        <IconComponent className="text-theme-color w-6 h-6 flex-shrink-0" size={24} />
      )}
      <span className="text-gray-900 font-medium">{label}</span>
    </div>
  )
}
