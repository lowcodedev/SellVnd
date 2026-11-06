import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { FAQS } from '@/data/content';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="FAQ"
              title="Questions, answered honestly."
              description="SellVnd is still being built. Here is what we can confirm today."
            />
          </Reveal>

          <Reveal delay={1}>
            <div className="divide-y divide-ink-200 border-y border-ink-200">
              {FAQS.map((item, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;

                return (
                  <div key={item.question}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-navy-800 transition-colors hover:text-brand-600 sm:py-6"
                      >
                        {item.question}
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-brand-600' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pr-10 text-sm leading-[1.5] text-ink-500 sm:text-base">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
