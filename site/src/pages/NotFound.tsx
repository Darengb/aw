import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="theme-red min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="font-display text-6xl text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-aw-red text-white rounded-lg hover:bg-aw-red-dark transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
