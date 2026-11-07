export type ButtonVariant = 'primary' | 'secondary' | 'ghost-light' | 'outline-dark';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out focus-visible:ring-offset-navy-900 disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-pop-400 text-navy-900 shadow-[0_10px_30px_-10px_rgba(252,175,69,0.7)] hover:-translate-y-0.5 hover:bg-pop-300 hover:shadow-[0_16px_36px_-12px_rgba(252,175,69,0.85)]',
  secondary:
    'border border-brand-500/30 bg-white text-brand-600 hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-50 hover:shadow-md',
  'ghost-light':
    'border border-white/25 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:border-accent-400 hover:bg-white/10',
  'outline-dark':
    'border border-ink-600 text-ink-50 hover:-translate-y-0.5 hover:border-accent-400 hover:bg-white/5',
};

export function buttonStyles(variant: ButtonVariant = 'primary', extra = '') {
  return `${BASE} ${VARIANTS[variant]} ${extra}`.trim();
}
