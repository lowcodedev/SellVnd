import { Menu, Plus } from 'lucide-react';
import { useRouter, type RouteState } from '@/hooks/useRouter';

interface TopbarProps {
  route: RouteState;
  onOpenSidebar: () => void;
  onQuickAdd: () => void;
}

const TITLES: Record<string, string> = {
  dashboard: 'Overview',
  products: 'Products',
  inventory: 'Inventory',
  settings: 'Settings',
};

const SUBTITLES: Record<string, string> = {
  dashboard: 'Your business at a glance',
  products: 'Manage your product catalog',
  inventory: 'Track and adjust stock levels',
  settings: 'Manage your business profile',
};

export default function Topbar({ route, onOpenSidebar, onQuickAdd }: TopbarProps) {
  const { navigate } = useRouter();
  const title = TITLES[route.path] ?? 'Overview';
  const subtitle = SUBTITLES[route.path] ?? '';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ink-200 bg-white/90 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="text-base font-bold tracking-tight text-navy-900 sm:text-lg">{title}</h1>
        <p className="hidden text-xs text-ink-400 sm:block">{subtitle}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          navigate('/products');
          onQuickAdd();
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(225,48,108,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(225,48,108,0.7)]"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Add product</span>
        <span className="sm:hidden">Add</span>
      </button>
    </header>
  );
}
