import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, labelledBy, children, className = '' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={`m-auto w-[calc(100%-2.5rem)] max-w-2xl rounded-3xl border border-ink-200 bg-white p-0 text-navy-800 shadow-[0_40px_100px_-20px_rgba(11,13,20,0.6)] backdrop:bg-navy-900/70 backdrop:backdrop-blur-sm ${className}`}
    >
      {isOpen && children}
    </dialog>
  );
}
