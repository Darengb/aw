import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { createIcons, icons } from 'lucide'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Jobseekers from './pages/Jobseekers'
import Employers from './pages/Employers'
import Partners from './pages/Partners'
import About from './pages/About'
import News from './pages/News'
import Events from './pages/Events'
import { useScrollProgress } from './hooks/useScrollProgress'

// Placeholder pages until they are built
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
    <h1 className="text-4xl font-display">{name} - Coming Soon</h1>
  </div>
)

// Theme configuration per route
const routeThemes: Record<string, 'red' | 'blue'> = {
  '/': 'red',
  '/jobseekers': 'red',
  '/about': 'red',
  '/employers': 'blue',
  '/partners': 'blue',
  '/events': 'blue',
  '/news': 'blue',
}

// Pages without a dark hero (nav should start with dark text)
const noHeroPages = ['/news', '/events']

function AppContent() {
  const location = useLocation()
  const theme = routeThemes[location.pathname] || 'red'
  const hasHero = !noHeroPages.includes(location.pathname)
  const scrollProgress = useScrollProgress()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
  }, [location.pathname])

  // Initialize Lucide icons after route changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      createIcons({ icons })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <div className={`theme-${theme}${hasHero ? '' : ' no-hero'}`}>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobseekers" element={<Jobseekers />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<PlaceholderPage name="404 - Not Found" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
