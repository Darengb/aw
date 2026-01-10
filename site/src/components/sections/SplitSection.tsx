import type { SplitSectionProps } from '../../lib/types'

export function SplitSection({
  reverse = false,
  blue = false,
  altBg = false,
  image,
  imageAlt = '',
  children,
}: SplitSectionProps) {
  const bgClass = altBg ? 'bg-gray-50' : 'bg-white'
  const overlayColor = blue
    ? 'bg-gradient-to-br from-aw-blue/25 to-white/10'
    : 'bg-gradient-to-br from-aw-red/25 to-white/10'

  return (
    <section
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[75vh] relative group ${bgClass}`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden bg-gray-100 h-full min-h-[400px] lg:min-h-full ${
          reverse ? 'lg:order-2' : ''
        }`}
      >
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Theme color overlay */}
        <div
          className={`absolute inset-0 ${overlayColor} opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
        />
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24 ${
          reverse ? 'lg:order-1' : ''
        }`}
      >
        <div className="max-w-[550px]">{children}</div>
      </div>
    </section>
  )
}

// Sub-component for split section label
export function SplitLabel({
  children,
  blue = false,
}: {
  children: React.ReactNode
  blue?: boolean
}) {
  const colorClass = blue ? 'text-aw-blue' : 'text-aw-red'

  return (
    <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">
      <span className={colorClass}>// </span>
      {children}
    </div>
  )
}

// Sub-component for split section headline
export function SplitHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-4xl font-normal leading-tight tracking-tight text-gray-900 mb-6">
      {children}
    </h2>
  )
}

// Sub-component for split section description
export function SplitDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg text-gray-600 leading-relaxed mb-8">{children}</p>
  )
}
