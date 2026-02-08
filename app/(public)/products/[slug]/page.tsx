import { supabasePublicClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from '@/components/products/product-detail-client';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const supabase = supabasePublicClient();
    let { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('slug', decodedSlug)
      .maybeSingle();

    if (!product && decodedSlug !== slug) {
      const result = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      product = result.data;
    }

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    const productData = product as any;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    const title = `${productData.name} - Industrial Fan | Oxiventt`;
    const description = productData.description
      ? productData.description.substring(0, 155)
      : `High-quality ${productData.name} for industrial ventilation. Available in various sizes and specifications. Contact us for custom solutions and quotations.`;
    const image = productData.images && productData.images.length > 0
      ? productData.images[0]
      : `${baseUrl}/og-default.jpg`;

    const keywords = [
      productData.name,
      `${productData.name} specifications`,
      productData.category,
      'industrial fan',
      'exhaust fan',
      'ventilation solution',
      'India',
    ];

    return {
      title,
      description,
      keywords,
      openGraph: {
        title: `${productData.name} - Premium Industrial Ventilation`,
        description,
        type: 'website',
        url: `${baseUrl}/products/${slug}`,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${productData.name} - Industrial Ventilation Solution`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      alternates: {
        canonical: `${baseUrl}/products/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product - Oxiventt',
      description: 'View product details',
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const supabase = supabasePublicClient();

    let { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', decodedSlug)
      .maybeSingle();

    if (!product && decodedSlug !== slug) {
      const result = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      product = result.data;
      error = result.error;
    }

    if (error || !product) {
      console.error('Product not found for slug:', decodedSlug, 'Error:', error);
      notFound();
    }

    const productData = {
      ...(product as any),
      specifications: (product as any).specs || {},
      available_sizes: (product as any).sizes || [],
      brochure_url: (product as any).brochure_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brochures/${(product as any).brochure_path}`
        : null,
      short_description: (product as any).description?.substring(0, 200) || '',
    } as any;

    const { data: relatedProductsData } = await supabase
      .from('products')
      .select('*')
      .eq('category', productData.category)
      .neq('id', productData.id)
      .limit(4);

    const relatedProducts = (relatedProductsData || []).map((p: any) => ({
      ...p,
      available_sizes: p.sizes || [],
      brochure_url: p.brochure_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brochures/${p.brochure_path}`
        : null,
      short_description: p.description?.substring(0, 200) || '',
    }));

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productData.name,
      description: productData.short_description || productData.name,
      category: productData.category,
      sku: productData.sku,
      ...(productData.images && productData.images.length > 0
        ? {
            image: productData.images,
          }
        : {}),
      ...(productData.is_price_visible && productData.price
        ? {
            offers: {
              '@type': 'Offer',
              price: productData.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          }
        : {}),
      ...(productData.specifications
        ? {
            additionalProperty: Object.entries(productData.specifications).map(
              ([name, value]) => ({
                '@type': 'PropertyValue',
                name,
                value,
              })
            ),
          }
        : {}),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductDetailClient
          product={productData}
          relatedProducts={relatedProducts || []}
        />
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
