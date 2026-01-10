import type { ValuePropProps } from '../../lib/types'

export function ValueProp({ number, title, description }: ValuePropProps) {
  return (
    <div className="value-prop bg-white border border-gray-200 p-10 lg:p-16 relative group transition-all duration-500 hover:bg-gray-50">
      {/* Top line animation on hover */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-theme-color group-hover:w-full transition-all duration-600 ease-out" />

      {/* Large number */}
      <div className="font-mono text-6xl lg:text-7xl font-bold text-theme-color/20 mb-6 leading-none tracking-tight">
        {number}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl lg:text-3xl font-normal text-gray-900 mb-4 tracking-tight leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg">
        {description}
      </p>
    </div>
  )
}
