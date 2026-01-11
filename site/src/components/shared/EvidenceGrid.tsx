interface EvidenceItem {
  title: string;
  bullets: string[];
  whyMatters: string;
}

interface EvidenceGridProps {
  items: EvidenceItem[];
}

export default function EvidenceGrid({ items }: EvidenceGridProps) {
  return (
    <div className="evidence-grid grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-gray-200 mt-16">
      {items.map((item, index) => (
        <div
          key={index}
          className="evidence-card relative bg-transparent border-r border-b border-gray-200 p-12 hover:bg-gray-50 transition-all duration-300 lg:odd:border-r lg:even:border-r-0"
        >
          <h3 className="text-xl font-medium text-black mb-8 mt-8 tracking-tight leading-snug">{item.title}</h3>
          <ul className="list-none mb-8 space-y-2">
            {item.bullets.map((bullet, bulletIndex) => (
              <li key={bulletIndex} className="text-gray-700 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: bullet }} />
            ))}
          </ul>
          <div className="pt-6 mt-6 border-t border-gray-300 text-gray-600 text-sm leading-relaxed">
            <strong className="text-aw-blue font-semibold font-mono text-xs uppercase tracking-wide">Why this matters:</strong> <span dangerouslySetInnerHTML={{ __html: item.whyMatters }} />
          </div>
        </div>
      ))}
    </div>
  );
}
