import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  start?: number
  end: number
  duration?: number
  delay?: number
  decimals?: number
  suffix?: string
  prefix?: string
  enabled?: boolean
}

/**
 * Hook that animates a number counting up from start to end
 * Used for animated metric counters and statistics
 */
export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
  enabled = true,
}: UseCountUpOptions): string {
  const [count, setCount] = useState(enabled ? start : start)
  const countRef = useRef(start)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const timeoutId = setTimeout(() => {
      startTimeRef.current = null

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp
        }

        const elapsed = timestamp - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation (ease-out-cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)

        const currentValue = start + (end - start) * easeOutCubic
        countRef.current = currentValue
        setCount(currentValue)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [start, end, duration, delay, enabled])

  // Format the number with decimals
  const formattedCount = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toString()

  return `${prefix}${formattedCount}${suffix}`
}

/**
 * Hook variant that returns the raw number value for more control
 */
export function useCountUpValue({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  enabled = true,
}: Omit<UseCountUpOptions, 'decimals' | 'suffix' | 'prefix'>): number {
  const [count, setCount] = useState(enabled ? start : start)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const timeoutId = setTimeout(() => {
      startTimeRef.current = null

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp
        }

        const elapsed = timestamp - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)

        // Easing function (ease-out-cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)

        const currentValue = start + (end - start) * easeOutCubic
        setCount(currentValue)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [start, end, duration, delay, enabled])

  return count
}

export default useCountUp
