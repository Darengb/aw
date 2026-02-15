import { ArrowRight, ChevronDown } from 'lucide-react'

interface PageHeroProps {
  label: string;
  headline: string;
  subheadline: string;
  image: string;
  imageAlt: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

export default function PageHero({
  label,
  headline,
  subheadline,
  image,
  imageAlt,
  primaryCta,
  secondaryCta
}: PageHeroProps) {
  return (
    <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-image-bg absolute inset-0 z-0">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover object-center" />
      </div>
      <div className="hero-overlay absolute inset-0 z-[1]"></div>
      <div className="hero-container max-w-container mx-auto px-8 relative z-[2]">
        <div className="hero-content max-w-4xl">
          <div className="hero-label font-mono text-xs uppercase tracking-[0.15em] text-white/80 mb-6">// {label}</div>
          <h1 className="hero-headline font-display text-6xl md:text-7xl font-normal leading-tight tracking-tight text-white mb-8">{headline}</h1>
          <p className="hero-subheadline text-xl text-white/90 leading-relaxed mb-10 max-w-3xl">
            {subheadline}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="hero-ctas flex flex-wrap gap-5">
              {primaryCta && (
                <a href={primaryCta.href} className="btn-primary inline-flex items-center gap-2">
                  <span>{primaryCta.label}</span>
                  <ArrowRight size={18} />
                </a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn-secondary text-white inline-flex items-center gap-2">
                  <span>{secondaryCta.label}</span>
                  <ChevronDown size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
