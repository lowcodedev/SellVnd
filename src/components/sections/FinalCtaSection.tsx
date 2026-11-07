import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { buttonStyles } from '@/components/ui/buttonStyles';

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 py-20 text-white sm:py-24 lg:py-28">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/40 blur-[120px]" />

      <Reveal className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
          Your business deserves a better way to sell.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.5] text-brand-50 sm:text-lg">
          Be part of the next generation of social commerce.
        </p>
        <div className="mt-10">
          <a href="#early-access" className={buttonStyles('primary')}>
            Join the Early Access List
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
