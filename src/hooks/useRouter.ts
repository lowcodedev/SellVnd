import { useCallback, useEffect, useState } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
}

const ROOT_PREFIX = '/app';

function parseRoute(): RouteState {
  const path = window.location.pathname;
  if (!path.startsWith(ROOT_PREFIX)) return { path: '/', params: {} };

  const tail = path.slice(ROOT_PREFIX.length) || '/';
  const segments = tail.split('/').filter(Boolean);

  if (segments.length === 0) return { path: 'dashboard', params: {} };
  if (segments[0] === 'products') return { path: 'products', params: {} };
  if (segments[0] === 'inventory') return { path: 'inventory', params: {} };
  if (segments[0] === 'settings') return { path: 'settings', params: {} };

  return { path: 'dashboard', params: {} };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseRoute);

  useEffect(() => {
    const handler = () => setRoute(parseRoute());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = to.startsWith(ROOT_PREFIX) ? to : `${ROOT_PREFIX}${to === '/' ? '' : to}`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
      setRoute(parseRoute());
    }
  }, []);

  return { route, navigate };
}

export function isAppRoute(): boolean {
  return window.location.pathname.startsWith(ROOT_PREFIX);
}
