import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import Reveal from '@/components/ui/Reveal';

const BENEFITS = [
  'Be among the first to hear how SellVnd is progressing',
  'Receive relevant updates on early access and product development',
  'Help shape the platform with your business context',
];

export default function WaitlistSection() {
  return (
    <section id="early-access" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-brand-500/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent-500/20 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Early access</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
            Be among the first to experience SellVnd.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-[1.5] text-ink-300 sm:text-lg">
            We're building a better way to run and grow a business. Join the early-access list and be part of the
            journey from the beginning.
          </p>

          <ul className="mt-10 space-y-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm leading-[1.5] text-ink-100">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-3xl border border-white/10 bg-white p-6 text-navy-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10">
            <WaitlistForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
