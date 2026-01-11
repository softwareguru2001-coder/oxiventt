import { supabaseServerClient } from '@/lib/supabase/server';
import { ProductsClient } from '@/components/products/products-client';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our comprehensive range of industrial fans, exhaust fans, and ventilation solutions. Find the perfect fan for your industrial, commercial, or residential needs.',
  openGraph: {
    title: 'Oxiventt - Ventilation Solutions',
    description: 'Browse our comprehensive range of industrial fans, exhaust fans, and ventilation solutions.',
  },
};

interface SearchParams {
  category?: string;
  q?: string;
  sort?: string;
  page?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const category = searchParams.category || '';
  const search = searchParams.q || '';
  const sort = searchParams.sort || 'newest';
  const page = parseInt(searchParams.page || '1', 10);
  const perPage = 12;

  let products: any[] = [];
  let totalCount = 0;
  let categories: string[] = [];

  try {
    const supabase = supabaseServerClient();

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error('Error fetching products:', error);
    } else if (data) {
      products = data.map((product: any) => ({
        ...product,
        available_sizes: product.sizes || [],
        brochure_url: product.brochure_path
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brochures/${product.brochure_path}`
          : null,
        short_description: product.description?.substring(0, 200) || '',
      }));
      totalCount = products.length;
      categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean) as string[];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  const totalPages = Math.ceil(totalCount / perPage);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: (page - 1) * perPage + index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.short_description || product.name,
        category: product.category,
        ...(product.is_price_visible && product.price
          ? {
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'INR',
              },
            }
          : {}),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsClient
          products={products}
          categories={categories}
          currentCategory={category}
          currentSearch={search}
          currentSort={sort}
          currentPage={page}
          totalPages={totalPages}
          totalCount={totalCount}
        />
      </Suspense>
    </>
  );
}
