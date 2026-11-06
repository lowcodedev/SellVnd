import { useState } from 'react';
import DetailDialog, { type DetailItem } from '@/components/ui/DetailDialog';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { CAPABILITIES, type CapabilityCard } from '@/data/content';

function toDetailItem(capability: CapabilityCard): DetailItem {
  return {
    eyebrow: 'Planned capability',
    title: capability.title,
    summary: capability.description,
    details: capability.details,
    icon: capability.icon,
  };
}

export default function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : toDetailItem(CAPABILITIES[activeIndex]);

  return (
    <section id="features" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Core capabilities"
            title="Everything your commerce operation needs, planned as one platform."
            description="The capabilities below describe what SellVnd is being built to do. They are planned platform capabilities, not features that are live today."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CAPABILITIES.map((capability, index) => (
            <Reveal key={capability.title} delay={(index % 3) as 0 | 1 | 2} className="h-full">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_48px_-28px_rgba(16,20,38,0.35)] sm:p-8"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-500 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-brand-200 shadow-[0_10px_20px_-12px_rgba(16,20,38,0.6)]">
                  <capability.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-6 text-lg font-semibold leading-[1.2] text-navy-800">{capability.title}</span>
                <span className="mt-3 text-sm leading-[1.5] text-ink-500">{capability.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2.5">
                  View details
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
