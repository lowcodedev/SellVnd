export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  sku: string | null;
  price: number;
  cost: number;
  stock_quantity: number;
  low_stock_threshold: number;
  category: string | null;
  status: ProductStatus;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  description?: string | null;
  sku?: string | null;
  price: number;
  cost?: number;
  stock_quantity?: number;
  low_stock_threshold?: number;
  category?: string | null;
  status?: ProductStatus;
  image_url?: string | null;
}

export interface ProductStats {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
  inventoryValue: number;
  totalUnits: number;
}
