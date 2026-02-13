'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import ChatWidget from '../chat/ChatWidget'

// Theme configuration per route
const routeThemes: Record<string, 'red' | 'blue'> = {
  '/': 'red',
  '/jobseekers': 'red',
  '/about': 'red',
  '/contact': 'red',
  '/jobseekers-form': 'red',
  '/employers-form': 'blue',
  '/employers': 'blue',
  '/partners': 'blue',
  '/partners-form': 'blue',
  '/events': 'blue',
  '/news': 'blue',
}

// Pages without a dark hero (nav should start with dark text)
const noHeroPages = ['/news', '/events', '/contact', '/jobseekers-form', '/employers-form', '/partners-form']

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const theme = routeThemes[pathname] || 'red'
  const hasHero = !noHeroPages.includes(pathname)
  const barRef = useRef<HTMLDivElement>(null)

  // Scroll progress bar via ref + direct DOM (no re-renders)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Global IntersectionObserver for scroll-triggered visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const selectors = [
      '.section-header',
      '.path-card',
      '.population-item',
      '.value-prop',
      '.testimonial-card',
      '.metric-card',
      '.step-card'
    ]

    const observeElements = () => {
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => observer.observe(el))
      })
    }

    // Observe after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [pathname])

  return (
    <div className={`theme-${theme}${hasHero ? '' : ' no-hero'}`}>
      {/* Scroll Progress Bar */}
      <div
        ref={barRef}
        className="scroll-progress-bar"
        style={{ transform: 'scaleX(0)' }}
      />

      <Nav />

      <main>
        {children}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
