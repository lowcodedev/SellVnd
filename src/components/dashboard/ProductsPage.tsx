import { useEffect, useMemo, useState } from 'react';
import { Search, Pencil, Trash2, Package, Loader2, Plus, Inbox } from 'lucide-react';
import { fetchProducts, deleteProduct } from '@/lib/products';
import type { Product, ProductStatus } from '@/types/product';
import ConfirmDialog from '@/components/dashboard/ConfirmDialog';

interface ProductsPageProps {
  onEdit: (product: Product) => void;
  onAdd: () => void;
  refreshKey: number;
}

const STATUS_BADGE: Record<ProductStatus, string> = {
  active: 'bg-success-500/10 text-success-600',
  draft: 'bg-ink-100 text-ink-500',
  archived: 'bg-ink-100 text-ink-500',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

export default function ProductsPage({ onEdit, onAdd, refreshKey }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.sku?.toLowerCase().includes(q) ?? false) ||
          (p.category?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [products, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-ink-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, category..."
            className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-navy-900 transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProductStatus | 'all')}
            className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(225,48,108,0.5)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add product</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-400">
            <Inbox className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm font-semibold text-navy-900">
            {products.length === 0 ? 'No products yet' : 'No products match your filters'}
          </p>
          <p className="mt-1 text-sm text-ink-400">
            {products.length === 0 ? 'Start by adding your first product.' : 'Try a different search or status.'}
          </p>
          {products.length === 0 && (
            <button
              type="button"
              onClick={onAdd}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-500/20"
            >
              <Plus className="h-4 w-4" />
              Add product
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Product</th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500 sm:table-cell">SKU</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-500">Price</th>
                  <th className="hidden px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-500 lg:table-cell">Stock</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="group transition-colors hover:bg-ink-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="h-10 w-10 rounded-lg object-cover" loading="lazy" />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
                            <Package className="h-5 w-5" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-navy-900">{p.name}</p>
                          <p className="truncate text-xs text-ink-400">{p.category || 'Uncategorized'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3.5 text-sm text-ink-500 sm:table-cell">{p.sku || '—'}</td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-navy-900">{formatCurrency(Number(p.price))}</td>
                    <td className="hidden px-5 py-3.5 text-right text-sm text-ink-600 lg:table-cell">{p.stock_quantity}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(p)}
                          className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-brand-500/10 hover:text-brand-600"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-error-500/10 hover:text-error-600"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        busy={deleting}
      />
    </div>
  );
}
