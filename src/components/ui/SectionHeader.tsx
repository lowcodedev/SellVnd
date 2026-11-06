interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
}: SectionHeaderProps) {
  const isDark = tone === 'dark';
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${
            isDark ? 'text-brand-300' : 'text-brand-600'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl ${
          isDark ? 'text-white' : 'text-navy-800'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-[1.5] sm:text-lg ${
            isDark ? 'text-ink-300' : 'text-ink-500'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
