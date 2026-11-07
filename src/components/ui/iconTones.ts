export const ICON_TONES = [
  'bg-brand-500 text-white shadow-[0_12px_24px_-12px_rgba(30,99,255,0.9)]',
  'bg-accent-500 text-navy-900 shadow-[0_12px_24px_-12px_rgba(0,198,245,0.9)]',
  'bg-pop-400 text-navy-900 shadow-[0_12px_24px_-12px_rgba(196,248,42,0.8)]',
  'bg-brand-700 text-accent-300 shadow-[0_12px_24px_-12px_rgba(14,61,180,0.9)]',
] as const;

export function iconToneClass(index: number) {
  return ICON_TONES[index % ICON_TONES.length];
}
