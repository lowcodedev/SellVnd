import { ArrowLeft } from 'lucide-react';
import type { LegalDocument } from '@/data/legal';

interface LegalPageProps {
  document: LegalDocument;
}

const LEGAL_UPDATED = '6 November 2026';

export default function LegalPage({ document: legal }: LegalPageProps) {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <a
          href="#overview"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to SellVnd
        </a>

        <header className="mt-8 border-b border-ink-200 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Legal</p>
          <h1 className="mt-3 text-3xl font-semibold leading-[1.2] tracking-tight text-navy-800 sm:text-5xl">
            {legal.title}
          </h1>
          <p className="mt-4 text-sm text-ink-500">Last updated {LEGAL_UPDATED}</p>
          <p className="mt-6 text-base leading-[1.5] text-ink-600">{legal.intro}</p>
          <p className="mt-4 rounded-xl border border-warning-500/30 bg-warning-500/10 px-4 py-3 text-sm leading-[1.5] text-ink-700">
            This is a working draft for SellVnd's early-access stage. It should be reviewed by a qualified legal
            professional before the platform launches.
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {legal.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold leading-[1.2] text-navy-800">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-[1.5] text-ink-600">
                  {paragraph}
                </p>
              ))}
              {section.points && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-[1.5] text-ink-600 marker:text-brand-500">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
