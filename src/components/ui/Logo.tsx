import { Waypoints } from 'lucide-react';

interface LogoProps {
  className?: string;
  tone?: 'light' | 'dark';
}

export default function Logo({ className = '', tone = 'light' }: LogoProps) {
  const wordColor = tone === 'light' ? 'text-white' : 'text-navy-800';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-accent-400 via-brand-500 to-brand-700 shadow-[0_8px_22px_-8px_rgba(30,99,255,0.95)] ring-1 ring-inset ring-white/25">
        <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white/20 blur-sm" aria-hidden="true" />
        <Waypoints className="relative h-[18px] w-[18px] text-white" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className={`text-lg font-semibold tracking-[-0.02em] ${wordColor}`}>
        Sell<span className="text-accent-400">Vnd</span>
      </span>
    </span>
  );
}
