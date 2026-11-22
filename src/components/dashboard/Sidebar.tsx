import { LayoutDashboard, Package, Boxes, Settings, LogOut, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, type RouteState } from '@/hooks/useRouter';

interface SidebarProps {
  route: RouteState;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV = [
  { path: 'dashboard', label: 'Overview', icon: LayoutDashboard, href: '/' },
  { path: 'products', label: 'Products', icon: Package, href: '/products' },
  { path: 'inventory', label: 'Inventory', icon: Boxes, href: '/inventory' },
  { path: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar({ route, mobileOpen, onCloseMobile }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const { navigate } = useRouter();

  const handleNav = (href: string) => {
    navigate(href);
    onCloseMobile();
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink-200 px-5">
          <button type="button" onClick={() => handleNav('/')} className="transition-opacity hover:opacity-90">
            <Logo tone="dark" />
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const isActive = route.path === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.href)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500/10 to-brand-400/5 text-brand-700'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] ${isActive ? 'text-brand-600' : 'text-ink-400'}`}
                  aria-hidden="true"
                />
                {item.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-ink-200 p-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
              {(profile?.full_name || profile?.business_name || 'M').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy-900">
                {profile?.business_name || 'Your business'}
              </p>
              <p className="truncate text-xs text-ink-400">{profile?.full_name || 'Merchant'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:bg-error-500/5 hover:text-error-600"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
