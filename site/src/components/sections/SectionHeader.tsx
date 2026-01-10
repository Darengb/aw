import type { SectionHeaderProps } from '../../lib/types'

export function SectionHeader({
  label,
  headline,
  intro,
  centered = false,
}: SectionHeaderProps) {
  return (
    <header className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <div className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-4">
          <span className="text-[var(--theme-color)]">// </span>
          {label}
        </div>
      )}
      <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">
        {headline}
      </h2>
      {intro && (
        <p className={`text-xl text-gray-600 leading-relaxed ${centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
          {intro}
        </p>
      )}
    </header>
  )
}
