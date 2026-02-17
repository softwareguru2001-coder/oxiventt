import { supabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ProductsList } from '@/components/admin/products-list';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  let products: any[] = [];

  try {
    const supabase = supabaseServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    products = data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-sm mb-4">No products yet.</p>
          <Link href="/admin/products/new" className="text-blue-600 hover:underline text-sm font-medium">
            Create your first product
          </Link>
        </div>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
