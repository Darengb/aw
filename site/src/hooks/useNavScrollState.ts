import { useState, useEffect } from 'react'
import type { NavState } from '../lib/types'

/**
 * Hook that returns the current navigation state based on scroll position
 * - 'top': At the very top of the page (transparent nav)
 * - 'in-hero': Scrolled but still within hero section (blur effect)
 * - 'below-hero': Scrolled past hero section (solid background, dark text)
 */
export function useNavScrollState(heroHeight: number = 100): NavState {
  const [state, setState] = useState<NavState>('top')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroThreshold = typeof heroHeight === 'number' ? heroHeight : window.innerHeight

      if (scrollY < 50) {
        setState('top')
      } else if (scrollY < heroThreshold - 100) {
        setState('in-hero')
      } else {
        setState('below-hero')
      }
    }

    // Set initial value
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [heroHeight])

  return state
}

export default useNavScrollState
