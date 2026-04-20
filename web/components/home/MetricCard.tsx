interface MetricCardProps {
  tag?: string;
  value: string;
  suffix?: string;
  symbol?: string;
  symbolPosition?: 'left' | 'right';
  label: string;
  isHero?: boolean;
}

export default function MetricCard({
  tag,
  value,
  suffix,
  symbol,
  symbolPosition = 'right',
  label,
  isHero = false
}: MetricCardProps) {
  const baseClasses = "metric-card-dash bg-transparent border-none rounded-xl relative transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center text-center justify-center shadow-glass hover:-translate-y-[3px] hover:shadow-glass-hover backdrop-blur-[12px]";
  const heroClasses = isHero
    ? "hero-metric col-span-2 min-h-[120px] lg:min-h-[150px] px-5 py-6 lg:px-12 lg:py-6"
    : "min-h-[100px] lg:min-h-[130px] px-4 py-5 lg:px-12 lg:py-6";

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
      <div className={`metric-stat font-display ${isHero ? 'text-[3.5rem] lg:text-metric-hero' : 'text-[2.5rem] lg:text-metric'} text-white my-3 mb-2 inline-block relative [text-shadow:0_2px_20px_rgba(255,255,255,0.5)] tabular-nums`}>
        {symbol && symbolPosition === 'left' && (
          <span className="metric-symbol">{symbol}</span>
        )}
        <span data-stat-target={value.replace(/,/g, '')}>{value}</span>
        {suffix && <span className="metric-suffix">{suffix}</span>}
        {symbol && symbolPosition === 'right' && (
          <span className="metric-symbol metric-symbol-right">{symbol}</span>
        )}
      </div>
      <div className="metric-label-dash font-body text-metric-label text-white/70 mt-2">{label}</div>
    </div>
  );
}
