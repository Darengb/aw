'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="container max-w-container mx-auto px-8">
        <div className="footer-content grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16">
          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">America Works</h4>
            <p className="text-sm leading-relaxed text-gray-400">
              Technical excellence in workforce development.
              Proven results since 1984. Performance-based,
              people-focused, purpose-driven.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">Jobseekers</h4>
            <ul className="footer-links list-none">
              <li className="mb-3"><Link href="/jobseekers" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">How It Works</Link></li>
              <li className="mb-3"><Link href="/jobseekers" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Services</Link></li>
              <li className="mb-3"><Link href="/jobseekers" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Success Stories</Link></li>
              <li className="mb-3"><Link href="/jobseekers" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">Partners</h4>
            <ul className="footer-links list-none">
              <li className="mb-3"><Link href="/partners" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Why Choose Us</Link></li>
              <li className="mb-3"><Link href="/partners" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Performance Model</Link></li>
              <li className="mb-3"><Link href="/partners" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Case Studies</Link></li>
              <li className="mb-3"><Link href="/jobseekers-form" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-body text-sm font-semibold text-white mb-6 uppercase tracking-wide">Company</h4>
            <ul className="footer-links list-none">
              <li className="mb-3"><Link href="/about" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">About</Link></li>
              <li className="mb-3"><Link href="/contact" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Locations</Link></li>
              <li className="mb-3"><Link href="/jobseekers-form" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Contact</Link></li>
              <li className="mb-3"><Link href="/smspolicy" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">SMS Policy</Link></li>
              <li className="mb-3"><Link href="/opt-in" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">SMS Opt-In</Link></li>
              <li className="mb-3"><Link href="/nondiscrimsnap" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Nondiscrimination Statement</Link></li>
            </ul>
          </div>
        </div>

        <div id="network-of-companies" className="footer-network border-t border-gray-800 pt-8 pb-8 text-xs leading-relaxed text-gray-400 scroll-mt-24">
          <h4 className="font-body text-sm font-semibold text-white mb-3 uppercase tracking-wide"><span aria-hidden="true" className="mr-1">*</span>The America Works Network of Companies</h4>
          <p className="mb-4 max-w-4xl">
            &ldquo;America Works&rdquo; is a brand used by the network of separately incorporated companies below. Each entity listed is a separate legal entity solely responsible for its own acts, omissions, and liabilities. References on this site to &ldquo;America Works&rdquo; or the &ldquo;America Works network&rdquo; are for brand identification only and do not imply a single entity, agency, joint venture, or shared liability among the companies.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1 list-none text-gray-400">
            <li>America Works of New York, Inc.</li>
            <li>America Works of California, Inc.</li>
            <li>America Works of Maryland, Inc.</li>
            <li>America Works of Wisconsin, Inc.</li>
            <li>America Works of New Jersey, Inc.</li>
            <li>America Works of Pennsylvania, Inc.</li>
            <li>America Works of Tennessee, Inc.</li>
            <li>America Works of Washington, Inc.</li>
            <li>America Works of Louisiana, Inc.</li>
          </ul>
        </div>

        <div className="footer-bottom border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div>&copy; 2026. All rights reserved.</div>
          <div className="footer-credentials flex flex-col md:flex-row gap-8 md:gap-8 font-mono text-xs">
            <span>Est. 1984</span>
            <span>Federal Vendor</span>
            <span>Woman-Owned</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
