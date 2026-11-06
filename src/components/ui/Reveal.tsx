import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  className?: string;
}

const DELAY_CLASS = {
  0: '',
  1: 'reveal-delay-1',
  2: 'reveal-delay-2',
  3: 'reveal-delay-3',
} as const;

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${DELAY_CLASS[delay]} ${isInView ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
