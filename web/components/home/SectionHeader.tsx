interface SectionHeaderProps {
  label: string;
  headline: string;
  subhead?: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ label, headline, subhead, children }: SectionHeaderProps) {
  return (
    <header className="section-header text-center mb-24">
      <span className="label-system font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4 block">{label}</span>
      <h2 className="display-md font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">{headline}</h2>
      {subhead && (
        <p className="display-subhead max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed mb-8">
          {subhead}
        </p>
      )}
      {children}
    </header>
  );
}
