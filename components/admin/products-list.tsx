'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, Star, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  category: string;
  price: number | null;
  is_price_visible: boolean;
  featured: boolean;
  images: string[];
}

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
  const router = useRouter();
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Delete "${productName}"? This cannot be undone.`)) return;
    setDeletingProductId(productId);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Product deleted');
      router.refresh();
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Product</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">SKU</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Price</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Featured</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-300 text-[0.6rem] font-medium">No img</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {product.category || 'general'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{product.sku || '—'}</td>
                <td className="px-4 py-3">
                  {product.is_price_visible && product.price ? (
                    <span className="text-sm font-semibold text-gray-900">₹{Number(product.price).toLocaleString()}</span>
                  ) : (
                    <span className="text-xs text-gray-400">On request</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {product.featured ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      Featured
                    </span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View on site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deletingProductId === product.id}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
