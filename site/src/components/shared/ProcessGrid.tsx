interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessGridProps {
  label: string;
  headline: string;
  subhead: string;
  steps: ProcessStep[];
  id?: string;
}

export default function ProcessGrid({ label, headline, subhead, steps, id }: ProcessGridProps) {
  return (
    <section className="process-section py-32 bg-gray-50" id={id}>
      <div className="container max-w-container mx-auto px-8">
        <header className="section-header text-center mb-24">
          <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">{label}</div>
          <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">{headline}</h2>
          <p className="section-intro text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subhead}
          </p>
        </header>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <div key={index} className="process-card bg-white p-10 rounded border border-gray-200 relative">
              <div className="process-number font-mono text-4xl font-bold text-aw-red opacity-30 mb-4 leading-none">{step.number}</div>
              <h3 className="font-body text-lg font-semibold text-gray-900 mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
