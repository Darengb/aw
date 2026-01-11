interface GlanceItem {
  icon: string;
  boldText: string;
  regularText: string;
}

interface GlanceGridProps {
  items: GlanceItem[];
}

export default function GlanceGrid({ items }: GlanceGridProps) {
  return (
    <div className="glance-grid grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-gray-200">
      {items.map((item, index) => (
        <div
          key={index}
          className="glance-item relative flex items-start gap-5 p-10 pt-16 border-r border-b border-gray-200 bg-transparent hover:bg-gray-50 transition-all duration-300 lg:last:border-r-0"
        >
          <div className="glance-icon w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-500 hover:border-aw-red hover:border-2 hover:scale-105">
            <i data-lucide={item.icon} className="w-6 h-6 text-aw-red"></i>
          </div>
          <div className="glance-content flex-1">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-black font-semibold block mb-1">{item.boldText}</strong>
              {item.regularText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
