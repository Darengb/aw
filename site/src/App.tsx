import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

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

  return (
    <div className={`theme-${theme}`}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" />

      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobseekers" element={<PlaceholderPage name="Jobseekers" />} />
          <Route path="/employers" element={<PlaceholderPage name="Employers" />} />
          <Route path="/partners" element={<PlaceholderPage name="Partners" />} />
          <Route path="/about" element={<PlaceholderPage name="About" />} />
          <Route path="/events" element={<PlaceholderPage name="Events" />} />
          <Route path="/news" element={<PlaceholderPage name="News" />} />
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
