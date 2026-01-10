import type { TestimonialProps } from '../../lib/types'

export function TestimonialCard({ quote, author, source }: TestimonialProps) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">{quote}</p>
      <p className="testimonial-author">
        — {author}
        {source && <span className="ml-1 text-gray-500">({source})</span>}
      </p>
    </div>
  )
}
