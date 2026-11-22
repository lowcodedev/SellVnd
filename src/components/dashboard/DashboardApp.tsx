import { useCallback, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import OverviewPage from '@/components/dashboard/OverviewPage';
import ProductsPage from '@/components/dashboard/ProductsPage';
import InventoryPage from '@/components/dashboard/InventoryPage';
import SettingsPage from '@/components/dashboard/SettingsPage';
import ProductFormDialog from '@/components/dashboard/ProductFormDialog';
import { useRouter } from '@/hooks/useRouter';
import type { Product } from '@/types/product';

export default function DashboardApp() {
  const { route } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openAdd = useCallback(() => {
    setEditingProduct(null);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  }, []);

  const handleSaved = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-ink-50">
      <Sidebar route={route} mobileOpen={sidebarOpen} onCloseMobile={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Topbar route={route} onOpenSidebar={() => setSidebarOpen(true)} onQuickAdd={openAdd} />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {route.path === 'dashboard' && <OverviewPage onQuickAdd={openAdd} />}
          {route.path === 'products' && (
            <ProductsPage onEdit={openEdit} onAdd={openAdd} refreshKey={refreshKey} />
          )}
          {route.path === 'inventory' && <InventoryPage />}
          {route.path === 'settings' && <SettingsPage />}
        </main>
      </div>

      <ProductFormDialog
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={handleSaved}
        product={editingProduct}
      />
    </div>
  );
}
