import type { TrustItem } from '../../lib/types'

interface TrustStripProps {
  items: TrustItem[]
}

export function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="py-16 bg-white border-b border-[var(--gray-200)]">
      <div
        className="max-w-[var(--container-xl)] mx-auto px-8 grid gap-0 border-t border-[var(--gray-200)]"
        style={{
          gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`
              group relative p-8 bg-transparent border-b border-[var(--gray-200)] transition-all duration-400
              hover:bg-[var(--gray-50)]
              ${index % 4 !== 3 ? 'border-r border-r-[var(--gray-200)]' : ''}
              max-lg:${index % 2 !== 1 ? 'border-r' : 'border-r-0'}
              max-md:border-r-0
            `}
          >
            {/* Top line animation on hover */}
            <div className="absolute top-0 left-0 w-0 h-0.5 bg-[var(--theme-color)] transition-[width] duration-500 group-hover:w-full" />

            <div className="font-display text-[2.5rem] font-normal text-[var(--theme-color)] leading-none mb-2 tracking-tight">
              {item.number}
            </div>
            <div className="text-[var(--text-sm)] text-[var(--gray-600)] leading-relaxed">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustStrip
