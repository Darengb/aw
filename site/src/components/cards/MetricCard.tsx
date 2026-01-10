import { useEffect, useState, useRef, useCallback } from 'react'
import type { MetricCardProps } from '../../lib/types'
import { TrendingUp } from 'lucide-react'

export function MetricCard({ value, label, status = 'active', animated = false }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value)
  const cardRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  // Parse numeric value for animation
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value
  const suffix = typeof value === 'string' ? value.replace(/[0-9.-]/g, '') : ''

  const animateValue = useCallback(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(numericValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, stepDuration)
  }, [numericValue])

  useEffect(() => {
    if (!animated || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animateValue()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [animated, animateValue])

  const statusStyles = {
    active: 'border-accent-cyan/30',
    pending: 'border-yellow-400/30',
    complete: 'border-accent-green/30',
  }

  const formatDisplayValue = () => {
    if (animated) {
      return typeof displayValue === 'number'
        ? displayValue.toLocaleString() + suffix
        : displayValue
    }
    return value
  }

  return (
    <div
      ref={cardRef}
      className={`metric-card-dash relative bg-white/5 border ${statusStyles[status]} rounded-lg p-6 lg:p-8 text-center transition-all duration-400 hover:bg-white/10 hover:shadow-glass-hover`}
    >
      {/* Status indicator */}
      {status === 'active' && (
        <div className="metric-header mb-2">
          <span className="metric-tag font-mono text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white/90 py-1.5 px-3 bg-white/5 rounded-md inline-block">
            Active
          </span>
        </div>
      )}

      {/* Value */}
      <div className="metric-stat font-display text-5xl lg:text-6xl text-white leading-none font-light tracking-tight my-3 text-shadow-metric">
        {formatDisplayValue()}
      </div>

      {/* Label */}
      <div className="metric-label-dash font-body text-sm text-white/70 font-medium mt-2 tracking-wide">
        {label}
      </div>

      {/* Trend indicator */}
      <div className="metric-trend mt-3 pt-3 border-t border-white/10 font-mono text-xs text-white/60 flex items-center justify-center gap-1.5 tracking-wide">
        <TrendingUp className="trend-icon w-4 h-4 text-accent-cyan filter drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" />
        <span>YTD Progress</span>
      </div>
    </div>
  )
}
