import { useEffect, useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Boxes, ArrowRight, Plus, Loader2 } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';
import { fetchProductStats, fetchLowStockProducts, fetchRecentProducts } from '@/lib/products';
import type { Product, ProductStats } from '@/types/product';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

interface OverviewPageProps {
  onQuickAdd: () => void;
}

export default function OverviewPage({ onQuickAdd }: OverviewPageProps) {
  const { navigate } = useRouter();
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [recent, setRecent] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProductStats(), fetchLowStockProducts(5), fetchRecentProducts(5)])
      .then(([s, ls, r]) => {
        setStats(s);
        setLowStock(ls);
        setRecent(r);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-ink-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const cards = [
    {
      label: 'Total products',
      value: stats?.total ?? 0,
      icon: Package,
      tone: 'from-brand-500/10 to-brand-400/5',
      iconColor: 'text-brand-600',
    },
    {
      label: 'Inventory units',
      value: stats?.totalUnits ?? 0,
      icon: Boxes,
      tone: 'from-accent-500/10 to-accent-400/5',
      iconColor: 'text-accent-600',
    },
    {
      label: 'Inventory value',
      value: formatCurrency(stats?.inventoryValue ?? 0),
      icon: TrendingUp,
      tone: 'from-pop-400/10 to-pop-300/5',
      iconColor: 'text-pop-500',
    },
    {
      label: 'Low stock alerts',
      value: (stats?.lowStock ?? 0) + (stats?.outOfStock ?? 0),
      icon: AlertTriangle,
      tone: 'from-error-500/10 to-error-400/5',
      iconColor: 'text-error-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`rounded-2xl border border-ink-200 bg-gradient-to-br ${card.tone} p-5 transition-all duration-300 hover:border-ink-300`}
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ${card.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-navy-900">{card.value}</p>
              <p className="mt-1 text-sm text-ink-500">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Recent products"
          actionLabel="View all"
          onAction={() => navigate('/products')}
        >
          {recent.length === 0 ? (
            <EmptyState onAdd={onQuickAdd} />
          ) : (
            <ul className="divide-y divide-ink-100">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <ProductThumb product={p} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy-900">{p.name}</p>
                    <p className="text-xs text-ink-400">{p.category || 'Uncategorized'}</p>
                  </div>
                  <span className="text-sm font-semibold text-navy-900">{formatCurrency(Number(p.price))}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Low stock"
          actionLabel="Manage inventory"
          onAction={() => navigate('/inventory')}
        >
          {lowStock.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-ink-400">All products are well stocked.</p>
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {lowStock.map((p) => {
                const isOut = p.stock_quantity === 0;
                return (
                  <li key={p.id} className="flex items-center gap-3 py-3">
                    <ProductThumb product={p} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy-900">{p.name}</p>
                      <p className="text-xs text-ink-400">Alert at {p.low_stock_threshold}</p>
                    </div>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        isOut ? 'bg-error-500/10 text-error-600' : 'bg-warning-500/10 text-warning-500'
                      }`}
                    >
                      {isOut ? 'Out of stock' : `${p.stock_quantity} left`}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}

function Panel({
  title,
  actionLabel,
  onAction,
  children,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">{title}</h2>
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          {actionLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-ink-400">No products yet.</p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-500/20"
      >
        <Plus className="h-4 w-4" />
        Add your first product
      </button>
    </div>
  );
}

function ProductThumb({ product }: { product: Product }) {
  if (product.image_url) {
    return (
      <img
        src={product.image_url}
        alt=""
        className="h-10 w-10 shrink-0 rounded-lg object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
      <Package className="h-5 w-5" />
    </span>
  );
}
