interface FeatureItem {
  icon: string;
  title?: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3;
  variant?: 'simple' | 'card';
}

export default function FeatureGrid({ items, columns = 2, variant = 'simple' }: FeatureGridProps) {
  if (variant === 'card') {
    return (
      <div className={`feature-grid grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="feature-item flex items-start gap-4 p-6 bg-white rounded-lg border border-gray-200"
          >
            <div className="feature-icon text-aw-blue">
              <i data-lucide={item.icon} className="w-6 h-6"></i>
            </div>
            <div className="feature-content">
              {item.title && (
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              )}
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-0">
      {items.map((item, index) => (
        <div
          key={index}
          className="feature-item flex items-start gap-4 py-4 border-t border-gray-200"
        >
          <div className="feature-icon text-aw-blue">
            <i data-lucide={item.icon} className="w-5 h-5"></i>
          </div>
          <div className="feature-content">
            {item.title && (
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            )}
            <p className={item.title ? "text-sm text-gray-600" : "text-gray-800"}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
