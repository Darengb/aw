import { Link } from 'react-router-dom';

interface PathCardProps {
  number: string;
  numberLabel: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  links: { href: string; label: string }[];
  reversed?: boolean;
  id?: string;
}

export default function PathCard({
  number,
  numberLabel,
  title,
  description,
  features,
  image,
  imageAlt,
  links,
  reversed = false,
  id
}: PathCardProps) {
  return (
    <article
      className="path-card grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[75vh] relative overflow-visible opacity-0"
      id={id}
    >
      <div className="path-image" data-number={number}>
        <img src={image} alt={imageAlt} loading="lazy" />
      </div>

      <div className={`path-content ${reversed ? 'lg:order-1' : ''}`}>
        <div className="path-number font-mono text-sm font-semibold tracking-wider text-aw-blue mb-4">{number} {numberLabel}</div>
        <h3 className="h2 font-display text-4xl font-normal leading-tight tracking-tight text-gray-900 mb-6">{title}</h3>

        <p className="path-description text-lg text-gray-600 leading-relaxed mb-8">
          {description}
        </p>

        <ul className="path-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        {links.length === 1 ? (
          <Link
            to={links[0].href}
            className="btn-link inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-gray-900 no-underline transition-all duration-200 hover:text-aw-blue"
          >
            {links[0].label}
          </Link>
        ) : (
          <div className="btn-group flex gap-6 flex-wrap">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="btn-link inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-gray-900 no-underline transition-all duration-200 hover:text-aw-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
