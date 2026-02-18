import { supabaseServerClient } from '@/lib/supabase/server';
import { SeoSettingsClient } from '@/components/admin/seo-settings-client';

export const dynamic = 'force-dynamic';

export default async function SeoSettingsPage() {
  let settings: Record<string, string> = {};
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const supabase = supabaseServerClient();

    const [settingsRes, productsRes, categoriesRes] = await Promise.all([
      supabase.from('seo_settings').select('key, value'),
      supabase.from('products').select('id, name, slug, meta_title, meta_description, meta_keywords').order('name'),
      supabase.from('categories').select('id, name, slug, meta_title, meta_description, meta_keywords').order('display_order'),
    ]);

    if (settingsRes.data) {
      settings = Object.fromEntries(settingsRes.data.map((s: any) => [s.key, s.value]));
    }
    products = productsRes.data || [];
    categories = categoriesRes.data || [];
  } catch (error) {
    console.error('Failed to fetch SEO data:', error);
  }

  return (
    <SeoSettingsClient
      initialSettings={settings}
      products={products}
      categories={categories}
    />
  );
}
