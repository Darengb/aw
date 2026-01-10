import type { ProcessGridProps } from '../../lib/types'

export function ProcessGrid({ items, variant = 'cards' }: ProcessGridProps) {
  if (variant === 'minimal') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <div className="font-mono text-5xl font-bold text-[var(--theme-color)] opacity-20 mb-4 leading-none">
              {item.number}
            </div>
            <h3 className="font-body text-lg font-semibold text-gray-900 mb-2 tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    )
  }

  // Default: cards variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="process-card bg-white p-10 rounded border border-gray-200 relative group transition-all duration-400 hover:translate-y-[-4px] hover:shadow-xl hover:border-gray-300"
        >
          {/* Top-line hover effect */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--theme-color)] transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

          <div className="font-mono text-4xl font-bold text-[var(--theme-color)] opacity-30 mb-4 leading-none">
            {item.number}
          </div>
          <h3 className="font-body text-lg font-semibold text-gray-900 mb-3 tracking-tight">
            {item.title}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
