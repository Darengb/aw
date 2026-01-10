import { Button } from '../ui/Button'
import type { CTAProps } from '../../lib/types'

export function CTASection({
  headline,
  description,
  primaryCta,
  secondaryCta,
  children,
}: CTAProps) {
  return (
    <section className="cta-section bg-gray-950 py-24 relative overflow-hidden">
      {/* Grid pattern overlay - defined in components.css */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-3xl mx-auto px-8 text-center">
        <h2 className="font-display text-display-md text-white mb-6">
          {headline}
        </h2>
        <p className="text-lg text-white/70 mb-10">{description}</p>

        {/* Custom children or default buttons */}
        {children ? (
          children
        ) : (
          <div className="flex gap-4 justify-center flex-wrap">
            {primaryCta && (
              <Button variant="white" href={primaryCta.href} arrow>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button variant="outline" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
