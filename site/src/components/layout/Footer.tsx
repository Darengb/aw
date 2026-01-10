import { Link } from 'react-router-dom'

const footerSections = [
  {
    title: 'For Jobseekers',
    links: [
      { label: 'Find Jobs', href: '/jobseekers' },
      { label: 'Career Services', href: '/jobseekers#services' },
      { label: 'Success Stories', href: '/jobseekers#stories' },
      { label: 'Get Started', href: '/jobseekers#contact' },
    ],
  },
  {
    title: 'For Employers',
    links: [
      { label: 'Hiring Solutions', href: '/employers' },
      { label: 'Our Process', href: '/employers#process' },
      { label: 'Submit Job Order', href: '/employers#contact' },
      { label: 'FAQ', href: '/employers#faq' },
    ],
  },
  {
    title: 'For Partners',
    links: [
      { label: 'Partner With Us', href: '/partners' },
      { label: 'Our Services', href: '/partners#services' },
      { label: 'Programs', href: '/partners#programs' },
      { label: 'Contact', href: '/partners#contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4>{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} America Works of New York, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
