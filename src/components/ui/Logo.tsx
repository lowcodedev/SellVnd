import { Waypoints } from 'lucide-react';

interface LogoProps {
  className?: string;
  tone?: 'light' | 'dark';
}

export default function Logo({ className = '', tone = 'light' }: LogoProps) {
  const wordColor = tone === 'light' ? 'text-white' : 'text-navy-800';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-brand-300 via-brand-500 to-accent-500 shadow-[0_8px_20px_-8px_rgba(83,109,254,0.9)] ring-1 ring-inset ring-white/25">
        <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white/20 blur-sm" aria-hidden="true" />
        <Waypoints className="relative h-[18px] w-[18px] text-white" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className={`text-lg font-semibold tracking-[-0.02em] ${wordColor}`}>
        Sell<span className="text-brand-300">Vnd</span>
      </span>
    </span>
  );
}
