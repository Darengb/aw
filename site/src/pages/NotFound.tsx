import { Link } from 'react-router-dom'
import { Home, ArrowRight, Search, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <div className="theme-red min-h-screen bg-gray-50 flex flex-col">
      {/* Main 404 Content */}
      <main className="flex-grow flex items-center justify-center px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="font-display text-[12rem] md:text-[16rem] leading-none font-normal text-gray-100 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl md:text-8xl text-aw-red">
                Oops
              </span>
            </div>
          </div>

          {/* Message */}
          <h1 className="font-display text-3xl md:text-4xl font-normal text-gray-900 mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="primary" href="/" arrow>
              Go to Homepage
            </Button>
            <Button variant="outline" href="/jobseekers">
              Find a Job
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-6">
              <span className="text-aw-red">// </span>Popular Pages
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <QuickLink
                to="/jobseekers"
                icon={<Search className="w-5 h-5" />}
                label="Jobseekers"
                description="Find employment"
              />
              <QuickLink
                to="/employers"
                icon={<HelpCircle className="w-5 h-5" />}
                label="Employers"
                description="Hire talent"
              />
              <QuickLink
                to="/about"
                icon={<Home className="w-5 h-5" />}
                label="About Us"
                description="Our story"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Quick Link Component
interface QuickLinkProps {
  to: string
  icon: React.ReactNode
  label: string
  description: string
}

function QuickLink({ to, icon, label, description }: QuickLinkProps) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-aw-red group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="text-left">
        <div className="font-semibold text-gray-900 group-hover:text-aw-red transition-colors">
          {label}
        </div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}

export default NotFound
