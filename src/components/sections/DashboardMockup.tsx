import {
  Bell,
  Globe,
  LayoutDashboard,
  Package,
  Search,
  Send,
  ShoppingBag,
  Users,
  Wallet,
} from 'lucide-react';

const SALES_POINTS = [18, 26, 22, 34, 30, 42, 39, 52, 47, 61, 58, 72];

const RECENT_ORDERS = [
  { id: '#SV-2041', customer: 'Customer, Lagos', channel: 'WhatsApp', status: 'Paid', tone: 'success' },
  { id: '#SV-2040', customer: 'Customer, Abuja', channel: 'Instagram', status: 'Packed', tone: 'brand' },
  { id: '#SV-2039', customer: 'Wholesale buyer', channel: 'Website', status: 'Pending', tone: 'warning' },
] as const;

const INVENTORY = [
  { name: 'Linen shirts', level: 72 },
  { name: 'Skincare sets', level: 48 },
  { name: 'Wireless earbuds', level: 31 },
];

const PUBLISHING = [
  { label: 'Spring edit carousel', channels: 'Instagram, Facebook', when: 'Scheduled 6:00 PM' },
  { label: 'Restock announcement', channels: 'TikTok, WhatsApp', when: 'Draft ready' },
];

const SALES_PATH = (() => {
  const max = Math.max(...SALES_POINTS);
  const step = 320 / (SALES_POINTS.length - 1);
  return SALES_POINTS.map((value, index) => {
    const x = index * step;
    const y = 110 - (value / max) * 96;
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
})();

const SALES_AREA = `${SALES_PATH} L320,120 L0,120 Z`;

const TONE_CLASS = {
  success: 'bg-success-500/15 text-success-400',
  brand: 'bg-brand-500/15 text-brand-300',
  warning: 'bg-warning-500/15 text-warning-400',
} as const;

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: ShoppingBag, label: 'Orders' },
  { icon: Package, label: 'Inventory' },
  { icon: Users, label: 'Customers' },
  { icon: Send, label: 'Publishing' },
  { icon: Globe, label: 'Channels' },
];

export default function DashboardMockup() {
  return (
    <div
      role="img"
      aria-label="Conceptual preview of the SellVnd dashboard showing sales overview, orders, inventory, channels and publishing. The figures are illustrative, not live statistics."
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-navy-800/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-error-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-success-500/80" />
        <div className="ml-4 flex flex-1 items-center gap-2 rounded-md bg-navy-900/80 px-3 py-1.5 text-[11px] text-ink-400">
          <Search className="h-3 w-3" aria-hidden="true" />
          workspace.sellvnd.preview
        </div>
      </div>

      <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[168px_1fr]">
        <aside className="flex flex-col gap-1 border-r border-white/10 bg-navy-800/60 p-2 sm:p-3">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs ${
                active ? 'bg-brand-500/20 text-white' : 'text-ink-400'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden truncate sm:inline">{label}</span>
            </div>
          ))}
        </aside>

        <div className="space-y-3 p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-400">Business overview</p>
              <p className="text-sm font-semibold text-white">All channels, one view</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-warning-500/30 bg-warning-500/10 px-2.5 py-1 text-[10px] font-medium text-warning-400 sm:inline">
                Illustrative preview
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-ink-300">
                <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: 'Sales', value: '1.24M', icon: Wallet },
              { label: 'Total orders', value: '386', icon: ShoppingBag },
              { label: 'Customers', value: '1,052', icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3">
                <div className="flex items-center justify-between text-[10px] text-ink-400 sm:text-xs">
                  <span className="truncate">{stat.label}</span>
                  <stat.icon className="hidden h-3.5 w-3.5 sm:block" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-sm font-semibold text-white sm:text-lg">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 md:col-span-3">
              <p className="text-xs text-ink-300">Sales overview</p>
              <svg viewBox="0 0 320 120" className="mt-3 h-24 w-full" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#E1306C" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#E1306C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={SALES_AREA} fill="url(#salesFill)" />
                <path
                  d={SALES_PATH}
                  fill="none"
                  stroke="#25F4EE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={200}
                  strokeDasharray="200"
                  className="animate-pulse-line"
                />
              </svg>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 md:col-span-2">
              <p className="text-xs text-ink-300">Inventory health</p>
              <ul className="mt-3 space-y-3">
                {INVENTORY.map((item) => (
                  <li key={item.name}>
                    <div className="flex justify-between text-[11px] text-ink-300">
                      <span>{item.name}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400" style={{ width: `${item.level}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 md:col-span-3">
              <p className="text-xs text-ink-300">Recent orders</p>
              <ul className="mt-2 divide-y divide-white/5">
                {RECENT_ORDERS.map((order) => (
                  <li key={order.id} className="flex items-center justify-between gap-2 py-2 text-[11px]">
                    <div className="min-w-0">
                      <p className="font-medium text-white">{order.id}</p>
                      <p className="truncate text-ink-400">
                        {order.customer} via {order.channel}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${TONE_CLASS[order.tone]}`}>
                      {order.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 md:col-span-2">
              <p className="text-xs text-ink-300">Social publishing</p>
              <ul className="mt-2 space-y-2.5">
                {PUBLISHING.map((post) => (
                  <li key={post.label} className="rounded-lg bg-white/[0.04] p-2.5">
                    <p className="text-[11px] font-medium text-white">{post.label}</p>
                    <p className="mt-0.5 text-[10px] text-ink-400">{post.channels}</p>
                    <p className="mt-1 text-[10px] text-brand-300">{post.when}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
