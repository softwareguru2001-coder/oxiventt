'use client';

import { useState, useEffect } from 'react';
import { CategoryForm } from '@/components/admin/category-form';
import { Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/admin/categories/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }

        const data = await response.json();
        setCategory(data.category);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load category');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="max-w-2xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Category not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
        <p className="text-gray-600 mt-1">Update category information</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
