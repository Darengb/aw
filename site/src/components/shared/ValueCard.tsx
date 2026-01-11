interface ValueCardProps {
  number: string;
  title: string;
  description: string;
  blue?: boolean;
}

export default function ValueCard({ number, title, description, blue = false }: ValueCardProps) {
  const numberColor = blue ? 'text-aw-blue' : 'text-aw-red';

  return (
    <div className="value-card bg-white p-10 rounded border border-gray-200 relative">
      <div className={`value-number font-mono text-4xl font-bold ${numberColor} opacity-30 mb-4 leading-none`}>{number}</div>
      <h3 className="font-body text-lg font-semibold text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
