'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Loader2, Plus, X, Upload, Trash2 } from 'lucide-react';
import { CategoryForm } from './category-form';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
}

interface ProductFormProps {
  product?: any;
  isEdit?: boolean;
}

export function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState(product?.name || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [category, setCategory] = useState(product?.category || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [isPriceVisible, setIsPriceVisible] = useState(product?.is_price_visible ?? true);
  const [featured, setFeatured] = useState(product?.featured || false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [specs, setSpecs] = useState<Record<string, any>>(product?.specs || {});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);
  const [newSize, setNewSize] = useState('');

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [brochurePath, setBrochurePath] = useState(product?.brochure_path || '');
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isEdit && name && !slug) {
      setSlug(generateSlug(name));
    }
  }, [name, slug, isEdit]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories?include_inactive=false', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
        if (data.categories.length > 0 && !category && !product?.category) {
          setCategory(data.categories[0].name);
        }
      } else {
        console.error('Failed to load categories:', response.status);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategoryCreated = (newCategory: Category) => {
    console.log('Category created successfully:', newCategory);
    const updatedCategories = [...categories, newCategory].sort((a, b) => a.display_order - b.display_order);
    console.log('Updated categories list:', updatedCategories);
    setCategories(updatedCategories);
    setCategory(newCategory.name);
    setShowCategoryModal(false);
  };

  const addSpec = () => {
    if (newSpecKey && newSpecValue) {
      setSpecs({ ...specs, [newSpecKey]: newSpecValue });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    setSpecs(newSpecs);
  };

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      setNewSize('');
    }
  };

  const removeSize = (size: string) => {
    setSizes(sizes.filter(s => s !== size));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleBrochureSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrochureFile(e.target.files[0]);
    }
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return images;

    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'product-images');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/upload-file`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        uploadedUrls.push(data.url);
      }
    }

    return [...images, ...uploadedUrls];
  };

  const uploadBrochure = async () => {
    if (!brochureFile) return brochurePath;

    const formData = new FormData();
    formData.append('file', brochureFile);
    formData.append('bucket', 'brochures');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/upload-file`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.path;
    }

    return brochurePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const uploadedImages = await uploadImages();
      const uploadedBrochurePath = await uploadBrochure();

      const productData = {
        name,
        slug,
        sku: sku || null,
        category,
        description: description || null,
        specs,
        sizes,
        price: price ? parseFloat(price) : null,
        is_price_visible: isPriceVisible,
        featured,
        images: uploadedImages,
        brochure_path: uploadedBrochurePath || null,
      };

      const endpoint = isEdit
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-products`
        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-products`;

      const response = await fetch(endpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(
          isEdit ? { id: product.id, ...productData } : productData
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-bold">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loadingCategories}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loadingCategories ? (
                  <option>Loading categories...</option>
                ) : categories.length === 0 ? (
                  <option value="">No categories available</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-6 pt-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPriceVisible}
                onChange={(e) => setIsPriceVisible(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Price Visible</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Featured</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-bold">Specifications</h2>

        <div className="space-y-3">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="text"
                value={key}
                disabled
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
              <input
                type="text"
                value={String(value)}
                disabled
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
              <button
                type="button"
                onClick={() => removeSpec(key)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              placeholder="Key"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              placeholder="Value"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addSpec}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-bold">Available Sizes</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {sizes.map((size) => (
            <div
              key={size}
              className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
            >
              <span>{size}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="e.g., 24 inches"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addSize}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-bold">Images</h2>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square">
                <img
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {imageFiles.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {imageFiles.length} file(s) selected
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-bold">Brochure</h2>

        {brochurePath && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <span className="text-sm text-green-700">Current brochure uploaded</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Upload Brochure PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleBrochureSelect}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {brochureFile && (
            <p className="text-sm text-gray-600 mt-2">{brochureFile.name}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>

      {isMounted && showCategoryModal && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Create New Category</h2>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <CategoryForm
              isModal={true}
              onSuccess={handleCategoryCreated}
              onCancel={() => setShowCategoryModal(false)}
            />
          </div>
        </div>,
        document.body
      )}
    </form>
  );
}
