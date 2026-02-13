interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface StepsGridProps {
  items: StepItem[];
}

export default function StepsGrid({ items }: StepsGridProps) {
  return (
    <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <div key={index} className="step-item">
          <div className="step-number font-display text-6xl font-bold text-gray-200 mb-4">{item.number}</div>
          <h3 className="font-display text-xl text-gray-900 mb-3">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
