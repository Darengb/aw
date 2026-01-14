import { useState, useEffect } from 'react'
import type { NavState } from '../lib/types'

/**
 * Hook that returns the current navigation state based on scroll position
 * - 'top': At the very top of the page (transparent nav)
 * - 'in-hero': Scrolled but still within hero section (blur effect)
 * - 'below-hero': Scrolled past hero section (solid background, dark text)
 */
export function useNavScrollState(): NavState {
  const [state, setState] = useState<NavState>('top')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Get actual hero element height
      const hero = document.querySelector('.hero') as HTMLElement | null
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight

      if (scrollY === 0) {
        // Step 1: At very top - transparent, no blur
        setState('top')
      } else if (scrollY > 0 && scrollY < heroHeight - 100) {
        // Step 2: In hero - blur with white text
        setState('in-hero')
      } else {
        // Step 3: Below hero - blur with dark text
        setState('below-hero')
      }
    }

    // Set initial value
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return state
}

export default useNavScrollState
