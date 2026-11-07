import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { PROBLEM_CARDS } from '@/data/content';

export default function ProblemSection() {
  return (
    <section className="bg-ink-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="The challenge"
            title="Running a business shouldn't mean managing a dozen different tools."
            description="Your customers are everywhere. But your business operations are scattered."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PROBLEM_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={(index % 4) as 0 | 1 | 2 | 3}>
              <article className="group h-full rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,20,38,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_40px_-24px_rgba(30,99,255,0.4)] sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold leading-[1.2] text-navy-800">{card.title}</h3>
                <p className="mt-3 text-sm leading-[1.5] text-ink-500">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
