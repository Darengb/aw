import type { PathCardProps } from '../../lib/types'
import * as LucideIcons from 'lucide-react'
import { ArrowRight } from 'lucide-react'

type IconName = keyof typeof LucideIcons

export function PathCard({ title, description, href, icon }: PathCardProps) {
  // Get the icon component from lucide-react
  const IconComponent = LucideIcons[icon as IconName] as React.ComponentType<{
    className?: string
    size?: number
  }>

  return (
    <a
      href={href}
      className="path-card block group will-change-transform"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
        {/* Content side */}
        <div className="path-content py-16 px-0 lg:pr-16 relative">
          {/* Path number/icon */}
          <div className="path-number font-mono text-xs font-medium uppercase tracking-[0.2em] text-black/35 mb-6">
            {IconComponent && <IconComponent className="inline-block mr-2 w-4 h-4" size={16} />}
            <span>Learn more</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-5xl font-normal leading-tight tracking-tight text-[#0a0a0a] mb-6">
            {title}
          </h2>

          {/* Description */}
          <p className="path-description text-black/65 mb-8 leading-relaxed text-lg max-w-[540px]">
            {description}
          </p>

          {/* CTA link */}
          <span className="inline-flex items-center gap-2 text-theme-color font-semibold text-sm group-hover:gap-3 transition-all duration-300">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Image placeholder side */}
        <div className="path-image relative h-full min-h-[400px] lg:min-h-[650px] overflow-hidden bg-gray-100 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-theme-color/35 to-white/20 mix-blend-multiply z-10 transition-opacity duration-800 group-hover:opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center">
            {IconComponent && (
              <IconComponent
                className="w-24 h-24 text-gray-300 opacity-50"
                size={96}
              />
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
