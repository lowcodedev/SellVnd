import { CheckCircle2 } from 'lucide-react';
import DashboardMockup from '@/components/sections/DashboardMockup';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

const HIGHLIGHTS = [
  {
    title: 'One workspace for every operation',
    description: 'Products, stock, orders and customer records sit side by side instead of in separate tools.',
  },
  {
    title: 'Every channel in one connected view',
    description: 'Sales conversations and activity from different channels are designed to come together in one place.',
  },
  {
    title: 'Clarity on performance',
    description: 'A single overview of sales, orders and customer activity so decisions rest on one picture.',
  },
];

export default function SolutionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-brand-700 to-navy-900 py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            tone="dark"
            eyebrow="The solution"
            title="Meet your business's new command centre."
            description="SellVnd connects the moving parts of your business, giving you one place to manage, monitor and grow your commerce operations."
          />
        </Reveal>

        <Reveal delay={1} className="mt-14 lg:mt-16">
          <DashboardMockup />
          <p className="mt-4 text-center text-xs text-ink-400">
            Conceptual preview of the planned workspace. The figures shown are illustrative only.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-16">
          {HIGHLIGHTS.map((item, index) => (
            <Reveal key={item.title} delay={(index + 1) as 1 | 2 | 3}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.06] sm:p-7">
                <CheckCircle2 className="h-5 w-5 text-pop-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold leading-[1.2] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.5] text-ink-300">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
