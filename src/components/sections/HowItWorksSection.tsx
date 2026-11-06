import { useState } from 'react';
import DetailDialog, { type DetailItem } from '@/components/ui/DetailDialog';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { WORKFLOW_STEPS, type WorkflowStep } from '@/data/content';

function toDetailItem(step: WorkflowStep): DetailItem {
  return {
    eyebrow: `Step ${step.number}`,
    title: step.title,
    summary: step.description,
    details: step.details,
  };
}

export default function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : toDetailItem(WORKFLOW_STEPS[activeIndex]);

  return (
    <section id="how-it-works" className="bg-ink-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="How it works"
            title="Everything connected. Everything under control."
            description="Select a step to see what it involves."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          <div
            className="pointer-events-none absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-gradient-to-r from-brand-300 via-brand-400 to-accent-400 lg:block"
            aria-hidden="true"
          />
          {WORKFLOW_STEPS.map((step, index) => (
            <Reveal key={step.number} delay={(index % 4) as 0 | 1 | 2 | 3} className="h-full">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full cursor-pointer flex-col rounded-2xl border border-ink-200 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_40px_-26px_rgba(83,109,254,0.4)]"
              >
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-base font-semibold text-brand-700 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  {step.number}
                </span>
                <span className="mt-7 text-lg font-semibold leading-[1.2] text-navy-800">{step.title}</span>
                <span className="mt-3 text-sm leading-[1.5] text-ink-500">{step.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2.5">
                  Learn more
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <DetailDialog item={activeItem} onClose={() => setActiveIndex(null)} />
    </section>
  );
}
