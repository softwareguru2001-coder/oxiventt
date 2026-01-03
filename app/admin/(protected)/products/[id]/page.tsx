import { supabaseServerClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/product-form';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const supabase = supabaseServerClient();
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (error || !product) {
      console.error('Product not found:', params.id, error);
      notFound();
    }

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
        <ProductForm product={product} isEdit={true} />
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
