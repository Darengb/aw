import { ExternalLink } from 'lucide-react'
import { CTASection } from '../components/sections/CTASection'
import { getNews, getNewsLinkLabel } from '../lib/content'
import type { NewsData } from '../lib/content'

export function News() {
  const allNews = getNews()

  return (
    <div className="theme-red">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
              <span className="text-aw-red">// </span>In The News
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
              America Works in the Media
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Coverage, interviews, and articles featuring our work in workforce development
              and employment programs.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((item, index) => (
              <NewsCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Want to learn more?"
        description="Get in touch to learn about our programs, partnerships, or media inquiries."
        primaryCta={{ label: 'About America Works', href: '/about' }}
        secondaryCta={{ label: 'Partner With Us', href: '/partners' }}
      />
    </div>
  )
}

// News Card Component
interface NewsCardProps {
  item: NewsData
  index: number
}

function NewsCard({ item, index }: NewsCardProps) {
  const isEven = index % 2 === 1
  const linkLabel = getNewsLinkLabel(item.type)

  return (
    <article
      className="news-card bg-white border border-gray-200 rounded p-8 transition-all duration-400 relative flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
    >
      {/* Top accent bar on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${
          isEven ? 'bg-aw-blue' : 'bg-aw-red'
        } transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100`}
      />

      {/* Source */}
      <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
        {item.source}
      </div>

      {/* Title */}
      <h2 className="font-display text-[1.375rem] font-normal leading-tight text-black mb-3 tracking-tight">
        {item.title}
      </h2>

      {/* Excerpt */}
      <p className="text-[0.9375rem] text-gray-600 leading-relaxed mb-6 flex-grow">
        {item.excerpt}
      </p>

      {/* Link */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          isEven ? 'text-aw-blue' : 'text-aw-red'
        } hover:gap-3 transition-all`}
      >
        <span>{linkLabel}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </article>
  )
}

export default News
