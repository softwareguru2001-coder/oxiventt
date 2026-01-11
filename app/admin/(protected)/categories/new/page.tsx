import { CategoryForm } from '@/components/admin/category-form';

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Category</h1>
        <p className="text-gray-600 mt-1">Add a new product category</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <CategoryForm />
      </div>
    </div>
  );
}
