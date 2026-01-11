interface ListItem {
  icon: string;
  text: string;
}

interface ListGridProps {
  items: ListItem[];
}

export default function ListGrid({ items }: ListGridProps) {
  return (
    <div className="list-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white p-6 rounded border border-gray-200"
        >
          <div className="list-icon text-aw-blue">
            <i data-lucide={item.icon} className="w-6 h-6"></i>
          </div>
          <p className="text-gray-900 font-medium">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
