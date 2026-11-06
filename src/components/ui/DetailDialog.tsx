import { Check, X, type LucideIcon } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { buttonStyles } from '@/components/ui/buttonStyles';
import type { DetailContent } from '@/data/content';

export interface DetailItem {
  eyebrow: string;
  title: string;
  summary: string;
  details: DetailContent;
  icon?: LucideIcon;
}

interface DetailDialogProps {
  item: DetailItem | null;
  onClose: () => void;
}

const TITLE_ID = 'detail-dialog-title';

export default function DetailDialog({ item, onClose }: DetailDialogProps) {
  return (
    <Modal isOpen={item !== null} onClose={onClose} labelledBy={TITLE_ID}>
      {item && (
        <div className="relative p-7 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-navy-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-start gap-4 pr-12">
            {item.icon && (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-brand-200">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{item.eyebrow}</p>
              <h3 id={TITLE_ID} className="mt-2 text-2xl font-semibold leading-[1.2] text-navy-800 sm:text-3xl">
                {item.title}
              </h3>
            </div>
          </div>

          <p className="mt-6 text-base leading-[1.5] text-ink-600">{item.summary}</p>
          <p className="mt-4 text-base leading-[1.5] text-ink-600">{item.details.intro}</p>

          <div className="mt-8 rounded-2xl bg-ink-50 p-6">
            <h4 className="text-sm font-semibold text-navy-800">What it covers</h4>
            <ul className="mt-4 space-y-3">
              {item.details.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-[1.5] text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-700">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {item.details.audience && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-navy-800">Who it is for</h4>
              <p className="mt-2 text-sm leading-[1.5] text-ink-600">{item.details.audience}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 border-t border-ink-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-[1.5] text-ink-500">
              SellVnd is in development. This describes planned functionality.
            </p>
            <a
              href="#early-access"
              onClick={onClose}
              className={buttonStyles('primary', 'shrink-0')}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
}
