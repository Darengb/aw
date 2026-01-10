import type { ValueCardProps } from '../../lib/types'

export function ValueCard({ number, title, description }: ValueCardProps) {
  return (
    <div className="value-card bg-white p-10 rounded border border-gray-200 relative group">
      {/* Top line animation on hover */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-theme-color group-hover:w-full transition-all duration-500 ease-out" />

      <div className="font-mono text-4xl font-bold text-theme-color opacity-30 mb-4 leading-none">
        {number}
      </div>

      <h3 className="font-body text-lg font-semibold text-gray-900 mb-3 tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
