import { useNavScrollState } from '../../hooks/useNavScrollState'
import type { NavLink } from '../../lib/types'

interface SecondaryNavProps {
  links: NavLink[]
}

export function SecondaryNav({ links }: SecondaryNavProps) {
  const navState = useNavScrollState(window.innerHeight)

  // Only show when scrolled past hero
  if (navState !== 'below-hero') {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an anchor link, handle smooth scrolling
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const navHeight = 120 // Account for fixed nav
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <nav className="fixed top-[72px] left-0 right-0 z-[999] bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-container mx-auto px-8">
        <div className="flex items-center gap-8 py-3 overflow-x-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default SecondaryNav
