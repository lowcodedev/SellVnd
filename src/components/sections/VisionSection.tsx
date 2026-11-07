import ChannelIcon from '@/components/ui/ChannelIcon';
import { Layers } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { iconToneClass } from '@/components/ui/iconTones';
import SectionHeader from '@/components/ui/SectionHeader';
import { SOCIAL_CHANNELS } from '@/data/content';

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-brand-700 to-navy-900 py-20 text-white sm:py-24 lg:py-28">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            tone="dark"
            eyebrow="Product vision"
            title="One business. Every channel. One system."
            description="We believe businesses should spend less time managing tools and more time growing. SellVnd is being built to make that possible."
          />
        </Reveal>

        <Reveal delay={1} className="mx-auto mt-14 max-w-4xl lg:mt-16">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {SOCIAL_CHANNELS.map((channel, index) => (
              <li
                key={channel}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-white/[0.07]"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconToneClass(index)}`}>
                  <ChannelIcon channel={channel} className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-ink-100">{channel}</span>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto flex h-16 justify-center" aria-hidden="true">
            <svg className="h-full w-px overflow-visible" viewBox="0 0 2 64" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="64" stroke="#25F4EE" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="4 6" />
            </svg>
          </div>

          <div className="relative mx-auto flex max-w-md flex-col items-center rounded-3xl border border-brand-400/30 bg-gradient-to-b from-brand-500/20 to-navy-900/60 p-8 text-center shadow-[0_30px_60px_-30px_rgba(225,48,108,0.6)]">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 ring-1 ring-brand-400/40">
              <Layers className="h-7 w-7 text-brand-300" aria-hidden="true" />
            </span>
            <p className="mt-5 text-xl font-semibold text-white">SellVnd</p>
            <p className="mt-2 text-sm leading-[1.5] text-ink-300">
              Products, inventory, orders, conversations and publishing in one system.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
