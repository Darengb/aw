import type { HeroProps } from '../../lib/types'
import { Button } from '../ui/Button'
import '../../styles/components.css'

interface PageHeroProps extends HeroProps {
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
}

export function PageHero({
  title,
  subtitle,
  label,
  backgroundImage,
  theme = 'red',
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  return (
    <section className="hero">
      {/* Background Image */}
      {backgroundImage && (
        <div className="hero-image-bg">
          <img src={backgroundImage} alt="" aria-hidden="true" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className={`hero-overlay theme-${theme}`} />

      {/* Grid Overlay */}
      <div className="grid-overlay" />

      {/* Hero Content */}
      <div className="hero-container">
        <div className="hero-content">
          {/* Eyebrow / Label */}
          {label && (
            <div className="hero-eyebrow">
              <span className="badge">{label}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="hero-headline">{title}</h1>

          {/* Subheadline */}
          {subtitle && <p className="hero-subheadline">{subtitle}</p>}

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="hero-ctas">
              {primaryCta && (
                <Button variant="primary" href={primaryCta.href} arrow>
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

          {/* Custom children content */}
          {children}
        </div>
      </div>
    </section>
  )
}
