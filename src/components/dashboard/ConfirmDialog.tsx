import { Loader2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  busy = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="confirm-title" className="max-w-md">
      <div className="px-6 py-6">
        <h2 id="confirm-title" className="text-lg font-bold text-navy-900">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-[1.6] text-ink-500">{message}</p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-error-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-error-600 disabled:opacity-70"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
