'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2 } from 'lucide-react';
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

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    setDeletingProductId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully');
      router.refresh();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-sm">Image</th>
              <th className="text-left p-4 font-semibold text-sm">Name</th>
              <th className="text-left p-4 font-semibold text-sm">SKU</th>
              <th className="text-left p-4 font-semibold text-sm">Category</th>
              <th className="text-left p-4 font-semibold text-sm">Price</th>
              <th className="text-left p-4 font-semibold text-sm">Featured</th>
              <th className="text-left p-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.slug}</p>
                  </div>
                </td>
                <td className="p-4 text-sm font-mono">
                  {product.sku || '-'}
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                    {product.category || 'general'}
                  </span>
                </td>
                <td className="p-4">
                  {product.is_price_visible && product.price
                    ? `₹${Number(product.price).toLocaleString()}`
                    : '-'}
                </td>
                <td className="p-4">
                  {product.featured ? (
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">No</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      disabled={deletingProductId === product.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
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
