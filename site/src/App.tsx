import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { ScrollProgressBar } from './components/layout/ScrollProgressBar'
import { GrainOverlay } from './components/ui/GrainOverlay'
import type { Theme } from './lib/types'

// Pages
import Home from './pages/Home'
import Jobseekers from './pages/Jobseekers'
import Employers from './pages/Employers'
import Partners from './pages/Partners'
import About from './pages/About'
import Events from './pages/Events'
import News from './pages/News'
import NotFound from './pages/NotFound'

// Theme configuration per route
const routeThemes: Record<string, Theme> = {
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

  return (
    <div className={`theme-${theme}`}>
      <ScrollProgressBar theme={theme} />
      <Nav theme={theme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobseekers" element={<Jobseekers />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <GrainOverlay />
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
