import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

function AppContent() {
  const location = useLocation()
  const theme = routeThemes[location.pathname] || 'red'
  const scrollProgress = useScrollProgress()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className={`theme-${theme}`}>
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
