import { ArrowRight } from 'lucide-react';
import DashboardMockup from '@/components/sections/DashboardMockup';
import { buttonStyles } from '@/components/ui/buttonStyles';

export default function HeroSection() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-navy-800 pb-20 pt-14 text-white sm:pt-20 lg:pb-28 lg:pt-24"
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-accent-500/20 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-pop-400" aria-hidden="true" />
            The operating system for modern commerce
          </p>

          <h1
            className="animate-fade-up mt-7 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            Your entire business.{' '}
            <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-accent-300 bg-clip-text text-transparent">
              One powerful system.
            </span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-[1.5] text-ink-300 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            Sell everywhere. Manage everything. Grow without the chaos. SellVnd brings your products,
            customers, orders, conversations and social commerce operations together in one intelligent
            workspace.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <a href="#early-access" className={buttonStyles('primary', 'w-full sm:w-auto')}>
              Get Early Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#features" className={buttonStyles('ghost-light', 'w-full sm:w-auto')}>
              Explore the Platform
            </a>
          </div>

          <p
            className="animate-fade-up mt-6 text-sm text-ink-400"
            style={{ animationDelay: '320ms' }}
          >
            Building for the next generation of commerce.
          </p>
        </div>

        <div className="animate-fade-up relative mx-auto mt-16 max-w-5xl lg:mt-20" style={{ animationDelay: '400ms' }}>
          <div className="absolute -inset-x-6 -bottom-6 top-12 rounded-[32px] bg-gradient-to-b from-brand-500/20 to-transparent blur-2xl" aria-hidden="true" />
          <div className="animate-float-slow relative">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
