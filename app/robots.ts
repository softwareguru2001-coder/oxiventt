import { MetadataRoute } from 'next';
import { supabaseServerClient } from '@/lib/supabase/server';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  let disallowPaths = ['/admin/', '/api/'];

  try {
    const supabase = supabaseServerClient();
    const { data } = await (supabase as any)
      .from('seo_settings')
      .select('value')
      .eq('key', 'robots_disallow')
      .maybeSingle();

    if (data?.value) {
      disallowPaths = (data.value as string).split(',').map((p: string) => p.trim()).filter(Boolean);
    }
  } catch {
    // fall back to defaults
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
