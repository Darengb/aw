import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer bg-gray-950 text-gray-500 pt-16 pb-8">
      <div className="container max-w-container mx-auto px-8">
        <div className="footer-content grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16">
          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">America Works</h4>
            <p className="text-sm leading-relaxed text-gray-500">
              Technical excellence in workforce development.
              Proven results since 1984. Performance-based,
              people-focused, purpose-driven.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">Jobseekers</h4>
            <ul className="footer-links list-none">
              <li className="mb-3"><Link to="/jobseekers" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">How It Works</Link></li>
              <li className="mb-3"><Link to="/jobseekers" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Services</Link></li>
              <li className="mb-3"><Link to="/jobseekers" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Success Stories</Link></li>
              <li className="mb-3"><Link to="/jobseekers" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">Partners</h4>
            <ul className="footer-links list-none">
              <li className="mb-3"><Link to="/partners" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Why Choose Us</Link></li>
              <li className="mb-3"><Link to="/partners" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Performance Model</Link></li>
              <li className="mb-3"><Link to="/partners" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Case Studies</Link></li>
              <li className="mb-3"><a href="#contact" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">Company</h4>
            <ul className="footer-links list-none">
              <li className="mb-3"><Link to="/about" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">About</Link></li>
              <li className="mb-3"><a href="#contact" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Locations</a></li>
              <li className="mb-3"><a href="#contact" className="text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div>&copy; 2024 America Works. All rights reserved.</div>
          <div className="footer-credentials flex flex-col md:flex-row gap-8 md:gap-8 font-mono text-xs">
            <span className="opacity-70">Est. 1984</span>
            <span className="opacity-70">Federal Vendor</span>
            <span className="opacity-70">Woman-Owned</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
