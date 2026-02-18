import { MetadataRoute } from 'next';
import { supabaseServerClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  let productUrls: MetadataRoute.Sitemap = [];
  let categoryUrls: MetadataRoute.Sitemap = [];
  let includeCategories = true;

  try {
    const supabase = supabaseServerClient();

    const supabaseAny = supabase as any;
    const [productsRes, categoriesRes, settingsRes] = await Promise.all([
      supabase.from('products').select('slug, updated_at').order('updated_at', { ascending: false }),
      supabase.from('categories').select('slug, updated_at').eq('is_active', true).order('display_order'),
      supabaseAny.from('seo_settings').select('key, value').eq('key', 'sitemap_include_categories').maybeSingle(),
    ]);

    if ((settingsRes.data as any)?.value === 'false') {
      includeCategories = false;
    }

    productUrls = (productsRes.data || []).map((product: any) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    if (includeCategories) {
      categoryUrls = (categoriesRes.data || []).map((category: any) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: new Date(category.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.warn('Unable to fetch data for sitemap, returning static routes only');
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...categoryUrls,
    ...productUrls,
  ];
}
