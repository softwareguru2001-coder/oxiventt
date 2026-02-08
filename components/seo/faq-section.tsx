'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { JsonLd } from './json-ld';
import { generateFAQSchema } from '@/lib/seo/schema';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions', className = '' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = generateFAQSchema({ questions: faqs });

  return (
    <>
      <JsonLd data={schema} />
      <section className={`bg-white rounded-2xl border border-gray-200/50 p-8 shadow-lg ${className}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 mb-8 text-center">
          {title}
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
