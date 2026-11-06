import { Globe, Store } from 'lucide-react';

export type ChannelName = 'WhatsApp' | 'Instagram' | 'Facebook' | 'TikTok' | 'Website' | 'Physical store';

interface ChannelIconProps {
  channel: ChannelName;
  className?: string;
}

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export default function ChannelIcon({ channel, className = 'h-5 w-5' }: ChannelIconProps) {
  switch (channel) {
    case 'WhatsApp':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...STROKE_PROPS}>
          <path d="M3.5 20.5l1.2-3.9A8.5 8.5 0 1 1 8 19.3z" />
          <path d="M9 8.6c.2 1.7 1.5 3.7 3.3 4.7l1.2-1.2c.2-.2.5-.2.7-.1l1.7.7c.3.1.4.4.4.7v.9c0 .4-.3.7-.7.8-.8.2-2.2.1-3.9-.9-1.8-1-3-2.7-3.6-4.1-.3-.7-.4-1.3-.3-1.8.1-.4.4-.7.8-.7h.9" />
        </svg>
      );
    case 'Instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...STROKE_PROPS}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case 'Facebook':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...STROKE_PROPS}>
          <circle cx="12" cy="12" r="9" />
          <path d="M13.2 20.5v-6.2h2.1l.3-2.5h-2.4V10.2c0-.7.2-1.2 1.2-1.2h1.3V6.8c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H9.3v2.5h2.2v6.2" />
        </svg>
      );
    case 'TikTok':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...STROKE_PROPS}>
          <path d="M14 3v11.3a3.4 3.4 0 1 1-3.4-3.4" />
          <path d="M14 3c.3 2.6 2 4.4 4.8 4.7v3c-1.7 0-3.3-.5-4.8-1.5" />
        </svg>
      );
    case 'Website':
      return <Globe className={className} strokeWidth={1.8} aria-hidden="true" />;
    case 'Physical store':
      return <Store className={className} strokeWidth={1.8} aria-hidden="true" />;
  }
}
