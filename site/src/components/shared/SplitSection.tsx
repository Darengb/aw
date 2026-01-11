interface SplitSectionProps {
  label: string;
  headline: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  linkHref?: string;
  linkLabel?: string;
  reversed?: boolean;
  blue?: boolean;
  id?: string;
}

export default function SplitSection({
  label,
  headline,
  description,
  features,
  image,
  imageAlt,
  linkHref,
  linkLabel,
  reversed = false,
  blue = false,
  id
}: SplitSectionProps) {
  const sectionClasses = `split-section grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[75vh] relative ${reversed ? 'reverse' : ''} ${blue ? 'blue' : ''}`;
  const labelColor = blue ? 'text-aw-blue' : 'text-aw-red';

  return (
    <section className={sectionClasses} id={id}>
      <div className="split-image relative overflow-hidden bg-gray-100 h-full min-h-[400px] lg:min-h-full">
        <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover object-center" />
      </div>
      <div className="split-content">
        <div className="split-content-inner">
          <div className={`section-label font-mono text-xs font-bold uppercase tracking-[0.15em] ${labelColor} mb-4`}>{label}</div>
          <h2 className="split-headline font-display text-4xl font-normal leading-tight tracking-tight text-gray-900 mb-6">{headline}</h2>
          <p className="split-description text-lg text-gray-600 leading-relaxed mb-8">
            {description}
          </p>
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">{feature}</li>
            ))}
          </ul>
          {linkHref && linkLabel && (
            <a href={linkHref} className="btn-link inline-flex items-center gap-2">
              <span>{linkLabel}</span>
              <i data-lucide="arrow-right" style={{ width: '16px', height: '16px' }}></i>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
