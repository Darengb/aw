import type { MatrixItem } from '../../lib/types'

interface MatrixGridProps {
  items: MatrixItem[]
}

export function MatrixGrid({ items }: MatrixGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[var(--gray-200)] mt-16">
      {items.map((item, index) => {
        const isLastInRow = (index + 1) % 2 === 0
        const isFullWidth = index === items.length - 1 && items.length % 2 !== 0

        return (
          <div
            key={index}
            className={`
              matrix-item relative p-10 border-b border-[var(--gray-200)] bg-transparent transition-all duration-300
              hover:bg-[var(--gray-50)]
              ${!isLastInRow && !isFullWidth ? 'lg:border-r lg:border-r-[var(--gray-200)]' : ''}
              ${isFullWidth ? 'lg:col-span-2' : ''}
            `}
          >
            {/* Top line animation handled by CSS */}

            <h3 className="font-display text-2xl font-normal text-[var(--black)] mb-5 tracking-tight">
              {item.title}
            </h3>

            <div
              className="text-base text-[var(--gray-700)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MatrixGrid
