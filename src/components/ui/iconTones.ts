export const ICON_TONES = [
  'bg-brand-500 text-white shadow-[0_12px_24px_-12px_rgba(225,48,108,0.9)]',
  'bg-accent-500 text-navy-900 shadow-[0_12px_24px_-12px_rgba(37,244,238,0.9)]',
  'bg-pop-400 text-navy-900 shadow-[0_12px_24px_-12px_rgba(252,175,69,0.9)]',
  'bg-brand-700 text-accent-300 shadow-[0_12px_24px_-12px_rgba(131,58,180,0.9)]',
] as const;

export function iconToneClass(index: number) {
  return ICON_TONES[index % ICON_TONES.length];
}
