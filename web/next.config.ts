import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      { source: '/work-with-us', destination: '/employers', permanent: true },
      { source: '/cpnavigation', destination: '/jobseekers', permanent: true },
    ]
  },
}

export default nextConfig
