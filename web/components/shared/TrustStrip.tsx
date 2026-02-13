interface TrustItem {
  number: string;
  label: string;
}

interface TrustStripProps {
  items: TrustItem[];
}

export default function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="trust-strip py-16 bg-white border-b border-gray-200">
      <div className="trust-grid max-w-container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-gray-200">
        {items.map((item, index) => (
          <div
            key={index}
            className="trust-item p-8 border-r border-b border-gray-200 bg-transparent relative transition-all duration-400 hover:bg-gray-50 last:border-r-0 lg:[&:nth-child(4n)]:border-r-0"
          >
            <div className="trust-number font-display text-4xl font-normal text-aw-blue leading-none mb-2 tracking-tight">
              {item.number}
            </div>
            <div className="trust-label text-sm text-gray-600 leading-relaxed">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
