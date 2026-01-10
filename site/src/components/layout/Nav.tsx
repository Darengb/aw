import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useNavScrollState } from '../../hooks/useNavScrollState'
import type { Theme } from '../../lib/types'

interface NavProps {
  theme?: Theme
}

const navLinks = [
  { label: 'Jobseekers', href: '/jobseekers' },
  { label: 'Employers', href: '/employers' },
  { label: 'Partners', href: '/partners' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
]

export function Nav({ theme = 'red' }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navState = useNavScrollState(window.innerHeight)
  const location = useLocation()

  const navClasses = [
    'navigation',
    navState === 'in-hero' ? 'scrolled' : '',
    navState === 'below-hero' ? 'below-hero' : '',
  ].filter(Boolean).join(' ')

  // Home page uses blue CTA, others use theme color
  const ctaColorClass = location.pathname === '/'
    ? 'bg-aw-blue hover:bg-aw-blue-dark'
    : theme === 'blue'
      ? 'bg-aw-blue hover:bg-aw-blue-dark'
      : 'bg-aw-red hover:bg-aw-red-dark'

  return (
    <nav className={navClasses}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="/images/aw-logo-simple.png"
            alt="America Works"
            className="nav-logo-img"
          />
          <span>America Works</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={location.pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className={`nav-cta ${ctaColorClass}`}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-white py-2 px-4 hover:bg-gray-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`nav-cta ${ctaColorClass} text-center`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
