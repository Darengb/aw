import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavScrollState } from '../../hooks/useNavScrollState';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollState = useNavScrollState();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navClasses = `navigation fixed top-0 left-0 right-0 bg-transparent z-[1000] transition-all duration-300 ${
    scrollState === 'in-hero' ? 'scrolled' : ''
  } ${scrollState === 'below-hero' ? 'below-hero' : ''}`;

  const navLinks = [
    { to: '/jobseekers', label: 'Jobseekers' },
    { to: '/employers', label: 'Employers' },
    { to: '/partners', label: 'Partners' },
    { to: '/news', label: 'News' },
    { to: '/events', label: 'Events' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-container mx-auto py-5 px-8 flex justify-between items-center">
          <Link to="/" className="nav-logo flex items-center gap-3 font-crimson text-2xl font-semibold tracking-tight text-white no-underline transition-opacity duration-200 hover:opacity-70">
            <img src="/images/aw-logo-simple.png" alt="AW" className="h-10 w-auto block" />
            <span>AMERICA WORKS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative font-body text-[0.9375rem] font-semibold tracking-[0.01em] text-white/80 no-underline transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a href="#contact" className="nav-cta px-7 py-3 bg-aw-blue text-white font-semibold rounded-md shadow-[0_2px_10px_rgba(50,59,151,0.2)] transition-all duration-300 hover:bg-aw-blue-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(50,59,151,0.3)]">Contact</a>
          </div>

          {/* Hamburger Button - Mobile Only */}
          <button
            className="mobile-menu-toggle md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={`hamburger-line w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`hamburger-line w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu fixed inset-0 z-[999] bg-gray-950 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-display text-4xl text-white no-underline transition-all duration-300 hover:text-aw-red ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            className={`mt-4 px-8 py-4 bg-aw-blue text-white font-semibold rounded-md text-lg transition-all duration-300 hover:bg-aw-blue-dark ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : '0ms' }}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
