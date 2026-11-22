import { useEffect, useState } from 'react';
import { Search, Minus, Plus, Package, Loader2, AlertTriangle, XCircle } from 'lucide-react';
import { fetchProducts, updateStock } from '@/lib/products';
import type { Product } from '@/types/product';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.sku?.toLowerCase().includes(q) ?? false) ||
      (p.category?.toLowerCase().includes(q) ?? false)
    );
  });

  const adjustStock = async (product: Product, delta: number) => {
    const newQty = Math.max(0, product.stock_quantity + delta);
    setUpdating(product.id);
    try {
      const updated = await updateStock(product.id, newQty);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
    } finally {
      setUpdating(null);
    }
  };

  const setStock = async (product: Product, value: number) => {
    const newQty = Math.max(0, value);
    setUpdating(product.id);
    try {
      const updated = await updateStock(product.id, newQty);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-ink-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const lowCount = products.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;
  const outCount = products.filter((p) => p.stock_quantity === 0).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryChip label="Total SKUs" value={products.length} icon={Package} tone="text-brand-600 bg-brand-500/5" />
        <SummaryChip label="Low stock" value={lowCount} icon={AlertTriangle} tone="text-warning-500 bg-warning-500/5" />
        <SummaryChip label="Out of stock" value={outCount} icon={XCircle} tone="text-error-600 bg-error-500/5" />
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-navy-900 transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center text-sm text-ink-400">
          No products to display.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const isOut = p.stock_quantity === 0;
            const isLow = p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold;
            return (
              <div
                key={p.id}
                className={`rounded-2xl border bg-white p-5 transition-all duration-300 hover:shadow-[0_12px_28px_-16px_rgba(0,0,0,0.15)] ${
                  isOut ? 'border-error-500/30' : isLow ? 'border-warning-500/30' : 'border-ink-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" loading="lazy" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
                      <Package className="h-6 w-6" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy-900">{p.name}</p>
                    <p className="text-xs text-ink-400">{p.sku || 'No SKU'}</p>
                  </div>
                  {isOut && <span className="rounded-lg bg-error-500/10 px-2 py-0.5 text-xs font-semibold text-error-600">Out</span>}
                  {!isOut && isLow && <span className="rounded-lg bg-warning-500/10 px-2 py-0.5 text-xs font-semibold text-warning-500">Low</span>}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => adjustStock(p, -1)}
                    disabled={updating === p.id || p.stock_quantity === 0}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:bg-ink-100 disabled:opacity-40"
                    aria-label="Decrease stock"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={p.stock_quantity}
                    onChange={(e) => setStock(p, parseInt(e.target.value, 10) || 0)}
                    disabled={updating === p.id}
                    className="w-16 rounded-lg border border-ink-200 py-2 text-center text-sm font-bold text-navy-900 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => adjustStock(p, 1)}
                    disabled={updating === p.id}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:bg-ink-100 disabled:opacity-40"
                    aria-label="Increase stock"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="ml-auto text-xs text-ink-400">
                    Alert at {p.low_stock_threshold}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SummaryChip({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-4">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xl font-bold text-navy-900">{value}</p>
        <p className="text-xs text-ink-400">{label}</p>
      </div>
    </div>
  );
}
