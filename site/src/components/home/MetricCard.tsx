interface MetricCardProps {
  tag?: string;
  value: string;
  symbol?: string;
  symbolPosition?: 'left' | 'right';
  label: string;
  isHero?: boolean;
}

export default function MetricCard({
  tag,
  value,
  symbol,
  symbolPosition = 'right',
  label,
  isHero = false
}: MetricCardProps) {
  const baseClasses = "metric-card-dash bg-transparent border-none rounded-xl px-12 py-6 relative transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center text-center justify-center shadow-glass hover:-translate-y-[3px] hover:shadow-glass-hover";
  const heroClasses = isHero ? "hero-metric col-span-2 min-h-[150px]" : "min-h-[130px]";

  return (
    <div className={`${baseClasses} ${heroClasses}`}>
      <div className="card-corner tl"></div>
      <div className="card-corner tr"></div>
      <div className="card-corner bl"></div>
      <div className="card-corner br"></div>
      {tag && (
        <div className="metric-header mb-2">
          <span className="metric-tag font-dashboard text-metric-tag uppercase text-white/90 px-3 py-1.5 bg-white/5 rounded-md inline-block">{tag}</span>
        </div>
      )}
      <div className={`metric-stat font-display ${isHero ? 'text-metric-hero' : 'text-metric'} text-white my-3 mb-2 inline-block relative [text-shadow:0_2px_20px_rgba(255,255,255,0.5)] tabular-nums`}>
        {symbol && symbolPosition === 'left' && (
          <span className="metric-symbol">{symbol}</span>
        )}
        <span data-stat-target={value.replace(/,/g, '')}>{value}</span>
        {symbol && symbolPosition === 'right' && (
          <span className="metric-symbol metric-symbol-right">{symbol}</span>
        )}
      </div>
      <div className="metric-label-dash font-body text-metric-label text-white/70 mt-2">{label}</div>
    </div>
  );
}
