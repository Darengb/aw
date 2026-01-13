import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { getNewsArticles } from '../utils/content';
import type { NewsArticle } from '../utils/content';
import CTASection from '../components/home/CTASection';

// NewsCard component
function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const isEven = index % 2 === 1;

  return (
    <article className="news-card group bg-white border border-gray-200 rounded p-8 relative flex flex-col transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)] hover:border-gray-300">
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${isEven ? 'bg-aw-blue' : 'bg-aw-red'} scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100`}
      />

      <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
        {article.source}
      </div>

      <h2 className="font-display text-[1.375rem] font-normal leading-[1.3] text-black mb-3 tracking-[-0.02em]">
        {article.title}
      </h2>

      <p className="text-[0.9375rem] text-gray-600 leading-relaxed mb-6 flex-grow">
        {article.excerpt}
      </p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 font-body text-sm font-semibold ${isEven ? 'text-aw-blue' : 'text-aw-red'} no-underline transition-all duration-300 hover:gap-3`}
      >
        <span>{article.linkText}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </article>
  );
}

export default function News() {
  const pageRef = useRef<HTMLDivElement>(null);
  const articles = getNewsArticles();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = pageRef.current?.querySelectorAll('.news-card');
    cards?.forEach((card) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">// In The News</div>
            <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight tracking-tight text-black mb-6">
              America Works in the Media
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Coverage, interviews, and articles featuring our work in workforce development and employment programs.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <NewsCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Want to learn more?"
        subhead="Get in touch to learn about our programs, partnerships, or media inquiries."
        primaryLink={{ href: "/about", label: "About America Works" }}
        secondaryLink={{ href: "/partners", label: "Partner With Us" }}
      />
    </div>
  );
}
