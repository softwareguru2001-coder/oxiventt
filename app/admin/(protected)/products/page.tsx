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
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-white">
          <p className="text-gray-600 mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-blue-600 hover:underline"
          >
            Create your first product
          </Link>
        </div>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
