interface MatrixItem {
  title: string;
  programTypes: string;
  whatWeDo: string;
  impact: string;
  fullWidth?: boolean;
}

interface MatrixGridProps {
  items: MatrixItem[];
}

export default function MatrixGrid({ items }: MatrixGridProps) {
  return (
    <div className="matrix-grid grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-gray-200 mt-16">
      {items.map((item, index) => (
        <div
          key={index}
          className={`matrix-item relative p-10 border-r border-b border-gray-200 bg-transparent hover:bg-gray-50 transition-all duration-300 ${item.fullWidth ? 'lg:col-span-2' : 'lg:odd:border-r lg:even:border-r-0'}`}
        >
          <h3 className="font-display text-2xl font-normal text-black mb-5 tracking-tight">{item.title}</h3>
          <div className="flex flex-wrap gap-8 mb-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wide text-gray-500 font-semibold">Program Types</span>
              <span className="text-sm text-gray-800 font-medium">{item.programTypes}</span>
            </div>
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            <strong className="text-black font-semibold">What we do:</strong> {item.whatWeDo}<br /><br />
            <strong className="text-black font-semibold">Impact:</strong> {item.impact}
          </p>
        </div>
      ))}
    </div>
  );
}
