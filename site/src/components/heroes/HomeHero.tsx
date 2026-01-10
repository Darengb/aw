import type { HeroProps } from '../../lib/types'
import { Button } from '../ui/Button'
import '../../styles/components.css'

// Metric data for the dashboard
interface DashboardMetric {
  value: string
  symbol?: string
  symbolPosition?: 'left' | 'right'
  label: string
  featured?: boolean
  tag?: string
}

interface HomeHeroProps extends HeroProps {
  metrics?: DashboardMetric[]
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
}

const defaultMetrics: DashboardMetric[] = [
  {
    value: '4,000,000',
    symbol: '+',
    symbolPosition: 'right',
    label: 'Placed in Jobs',
    featured: true,
    tag: 'EST. 1984',
  },
  {
    value: '4',
    symbol: '~',
    symbolPosition: 'left',
    label: 'Weeks to Place',
  },
  {
    value: '60%',
    symbol: '>',
    symbolPosition: 'left',
    label: 'Retention Rate',
  },
  {
    value: '11',
    symbol: '+',
    symbolPosition: 'right',
    label: 'States Covered',
  },
  {
    value: '40',
    symbol: '+',
    symbolPosition: 'right',
    label: 'Years Operating',
  },
]

function MetricCardDash({ metric }: { metric: DashboardMetric }) {
  const baseClasses = `metric-card-dash bg-transparent border-none rounded-xl px-12 py-6 relative
    transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]
    flex flex-col items-center text-center justify-center
    shadow-glass hover:-translate-y-[3px] hover:shadow-glass-hover`

  const featuredClasses = metric.featured
    ? 'col-span-2 min-h-[150px]'
    : 'min-h-[130px]'

  return (
    <div className={`${baseClasses} ${featuredClasses}`}>
      {/* Corner brackets */}
      <div className="card-corner tl" />
      <div className="card-corner tr" />
      <div className="card-corner bl" />
      <div className="card-corner br" />

      {/* Tag (for featured card) */}
      {metric.tag && (
        <div className="metric-header mb-2">
          <span className="metric-tag font-dashboard text-metric-tag uppercase text-white/90 px-3 py-1.5 bg-white/5 rounded-md inline-block">
            {metric.tag}
          </span>
        </div>
      )}

      {/* Metric value */}
      <div
        className={`metric-stat font-display ${metric.featured ? 'text-metric-hero' : 'text-metric'}
          text-white my-3 mb-2 inline-block relative
          [text-shadow:0_2px_20px_rgba(255,255,255,0.5)] tabular-nums`}
      >
        {metric.symbolPosition === 'left' && (
          <span className="metric-symbol">{metric.symbol}</span>
        )}
        <span data-stat-target={metric.value.replace(/[^0-9]/g, '')}>
          {metric.value}
        </span>
        {metric.symbolPosition === 'right' && (
          <span className="metric-symbol metric-symbol-right">{metric.symbol}</span>
        )}
      </div>

      {/* Label */}
      <div className="metric-label-dash font-body text-metric-label text-white/70 mt-2">
        {metric.label}
      </div>
    </div>
  )
}

export function HomeHero({
  title,
  backgroundVideo,
  metrics = defaultMetrics,
  primaryCta,
  secondaryCta,
  children,
}: HomeHeroProps) {
  // Parse title into lines if it contains line breaks
  const titleLines = title.split('\n')

  return (
    <section className="hero min-h-screen flex items-center relative bg-transparent overflow-hidden isolate">
      {/* Video Background */}
      {backgroundVideo && (
        <div className="hero-video-background absolute inset-0 -z-20 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 opacity-100 object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Grid Overlay */}
      <div className="grid-overlay absolute inset-0 bg-black/20 -z-10 opacity-100" />

      {/* Hero Container - Two Column Layout */}
      <div className="hero-container max-w-container mx-auto px-8 relative grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-24 items-center">
        {/* Left Column - Hero Content */}
        <div className="hero-content relative">
          {/* Headline */}
          <h1 className="hero-headline font-display text-[4rem] md:text-[7rem] font-normal leading-[1.05] tracking-[-0.02em] mb-8 md:mb-14 text-white">
            {titleLines.map((line, index) => {
              // Check if line has accent marker
              const hasAccent = line.includes('*')
              const cleanLine = line.replace(/\*/g, '')

              return (
                <span
                  key={index}
                  className={`block font-normal ${index === 0 ? '' : 'text-white/85 relative'}`}
                >
                  {hasAccent ? (
                    <span className="accent relative text-white">{cleanLine}</span>
                  ) : (
                    cleanLine
                  )}
                </span>
              )
            })}
          </h1>

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="hero-ctas flex gap-5">
              {primaryCta && (
                <Button variant="primary" href={primaryCta.href}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="secondary" href={secondaryCta.href}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {/* Custom children content */}
          {children}
        </div>

        {/* Right Column - Dashboard */}
        <aside className="federal-monitor bg-transparent border-none overflow-visible relative">
          {/* Dashboard Grid */}
          <div className="dashboard-grid p-0 grid grid-cols-2 gap-4 relative">
            {metrics.map((metric, index) => (
              <MetricCardDash key={index} metric={metric} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
