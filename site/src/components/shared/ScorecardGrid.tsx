interface ScorecardItem {
  title: string;
  bullets: string[];
}

interface ScorecardGridProps {
  items: ScorecardItem[];
}

export default function ScorecardGrid({ items }: ScorecardGridProps) {
  return (
    <div className="scorecard-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
      {items.map((item, index) => (
        <div
          key={index}
          className="scorecard-card relative bg-white border border-gray-200 rounded p-10 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
        >
          <h3 className="font-body text-lg font-semibold text-black mb-5 tracking-tight">{item.title}</h3>
          <ul className="list-none space-y-3">
            {item.bullets.map((bullet, bulletIndex) => (
              <li key={bulletIndex} className="relative pl-5 text-gray-700 leading-relaxed text-sm">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
