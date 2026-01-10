import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '../../lib/types'

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
        >
          <button
            className="faq-question"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <ChevronDown className="faq-icon" size={20} />
          </button>
          <div className="faq-answer">
            <div className="faq-answer-content">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQAccordion
