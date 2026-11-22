import { supabase } from '@/lib/supabase';
import type { Product, ProductInput, ProductStats } from '@/types/product';

function normalize(input: ProductInput): Record<string, unknown> {
  return {
    name: input.name.trim(),
    description: input.description?.trim() || null,
    sku: input.sku?.trim() || null,
    price: Number(input.price),
    cost: input.cost != null ? Number(input.cost) : 0,
    stock_quantity: input.stock_quantity != null ? Number(input.stock_quantity) : 0,
    low_stock_threshold: input.low_stock_threshold != null ? Number(input.low_stock_threshold) : 10,
    category: input.category?.trim() || null,
    status: input.status ?? 'active',
    image_url: input.image_url?.trim() || null,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProductStats(): Promise<ProductStats> {
  const { data, error } = await supabase.from('products').select('status, price, cost, stock_quantity, low_stock_threshold');
  if (error) throw error;

  const rows = data ?? [];
  return {
    total: rows.length,
    active: rows.filter((r) => r.status === 'active').length,
    lowStock: rows.filter((r) => r.stock_quantity > 0 && r.stock_quantity <= r.low_stock_threshold).length,
    outOfStock: rows.filter((r) => r.stock_quantity === 0).length,
    inventoryValue: rows.reduce((sum, r) => sum + Number(r.cost) * r.stock_quantity, 0),
    totalUnits: rows.reduce((sum, r) => sum + r.stock_quantity, 0),
  };
}

export async function fetchLowStockProducts(limit = 5): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('stock_quantity', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchRecentProducts(limit = 5): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(normalize(input))
    .select('*')
    .single();
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(normalize(input))
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Product;
}

export async function updateStock(id: string, quantity: number): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update({ stock_quantity: quantity })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}
