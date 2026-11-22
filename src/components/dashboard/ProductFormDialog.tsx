import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { createProduct, updateProduct } from '@/lib/products';
import type { Product, ProductInput, ProductStatus } from '@/types/product';

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  product: Product | null;
}

const EMPTY: ProductInput = {
  name: '',
  description: '',
  sku: '',
  price: 0,
  cost: 0,
  stock_quantity: 0,
  low_stock_threshold: 10,
  category: '',
  status: 'active',
  image_url: '',
};

export default function ProductFormDialog({ isOpen, onClose, onSaved, product }: ProductFormDialogProps) {
  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setForm(
        product
          ? {
              name: product.name,
              description: product.description ?? '',
              sku: product.sku ?? '',
              price: product.price,
              cost: product.cost,
              stock_quantity: product.stock_quantity,
              low_stock_threshold: product.low_stock_threshold,
              category: product.category ?? '',
              status: product.status,
              image_url: product.image_url ?? '',
            }
          : EMPTY,
      );
    }
  }, [isOpen, product]);

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (product) await updateProduct(product.id, form);
      else await createProduct(form);
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save product.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="product-form-title" className="max-w-lg">
      <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
        <h2 id="product-form-title" className="text-lg font-bold text-navy-900">
          {product ? 'Edit product' : 'Add product'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
        <FormField label="Product name" required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
            maxLength={200}
            placeholder="e.g. Handmade candle"
            className={inputClass}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="SKU">
            <input
              type="text"
              value={form.sku ?? ''}
              onChange={(e) => set('sku', e.target.value)}
              maxLength={100}
              placeholder="Optional"
              className={inputClass}
            />
          </FormField>
          <FormField label="Category">
            <input
              type="text"
              value={form.category ?? ''}
              onChange={(e) => set('category', e.target.value)}
              maxLength={100}
              placeholder="Optional"
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Selling price" hint="Currency">
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
              required
              className={inputClass}
            />
          </FormField>
          <FormField label="Cost" hint="For margin tracking">
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.cost ?? 0}
              onChange={(e) => set('cost', parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Stock quantity">
            <input
              type="number"
              min="0"
              value={form.stock_quantity ?? 0}
              onChange={(e) => set('stock_quantity', parseInt(e.target.value, 10) || 0)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Low-stock alert at">
            <input
              type="number"
              min="0"
              value={form.low_stock_threshold ?? 10}
              onChange={(e) => set('low_stock_threshold', parseInt(e.target.value, 10) || 0)}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Image URL">
          <input
            type="url"
            value={form.image_url ?? ''}
            onChange={(e) => set('image_url', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={form.description ?? ''}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
            placeholder="Optional product details"
            className={`${inputClass} resize-none`}
          />
        </FormField>

        <FormField label="Status">
          <select
            value={form.status ?? 'active'}
            onChange={(e) => set('status', e.target.value as ProductStatus)}
            className={inputClass}
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </FormField>

        {error && (
          <div className="rounded-xl border border-error-500/30 bg-error-500/5 px-4 py-3 text-sm font-medium text-error-600">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-ink-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(225,48,108,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {product ? 'Save changes' : 'Create product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-navy-900 transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none';

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-ink-700">
        {label}
        {required && <span className="text-brand-500">*</span>}
        {hint && <span className="text-xs font-normal text-ink-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
