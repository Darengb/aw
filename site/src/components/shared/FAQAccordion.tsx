import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  label: string;
  headline: string;
  items: FAQItem[];
  id?: string;
}

export default function FAQAccordion({ label, headline, items, id }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-32 bg-gray-50" id={id}>
      <div className="container max-w-container mx-auto px-8">
        <header className="section-header text-center mb-24">
          <div className="section-label font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-4">{label}</div>
          <h2 className="font-display text-display-md font-normal leading-tight tracking-tight text-gray-900 mb-6">{headline}</h2>
        </header>

        <div className="faq-container max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}
              >
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
