export type ButtonVariant = 'primary' | 'secondary' | 'ghost-light' | 'outline-dark';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:ring-offset-navy-900 disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-white shadow-[0_10px_30px_-10px_rgba(30,99,255,0.7)] hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_16px_36px_-12px_rgba(30,99,255,0.8)]',
  secondary:
    'border border-navy-800/15 bg-white text-navy-800 hover:-translate-y-0.5 hover:border-navy-800/30 hover:shadow-md',
  'ghost-light':
    'border border-white/20 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10',
  'outline-dark':
    'border border-ink-600 text-ink-50 hover:-translate-y-0.5 hover:border-ink-400 hover:bg-white/5',
};

export function buttonStyles(variant: ButtonVariant = 'primary', extra = '') {
  return `${BASE} ${VARIANTS[variant]} ${extra}`.trim();
}
