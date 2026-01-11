import { HeroSlider } from '@/components/home/hero-slider';
import { StatsBar } from '@/components/home/stats-bar';
import { FeaturedProducts } from '@/components/home/featured-products';
import { ValuePropositions } from '@/components/home/value-propositions';
import { supabaseServerClient } from '@/lib/supabase/server';

export const revalidate = 0; // Always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let heroSlides: any[] = [];

  try {
    const supabase = supabaseServerClient();

    const [productsResult, slidesResult] = await Promise.all([
      (supabase as any)
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4),
      (supabase as any)
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
    ]);

    if (productsResult.error) {
      console.error('Products fetch error:', productsResult.error);
      throw productsResult.error;
    }
    if (slidesResult.error) {
      console.error('Slides fetch error:', slidesResult.error);
      throw slidesResult.error;
    }

    console.log('Fetched products:', productsResult.data?.length);

    featuredProducts = (productsResult.data || []).map((product: any) => ({
      ...product,
      available_sizes: product.sizes || [],
      brochure_url: product.brochure_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brochures/${product.brochure_path}`
        : null,
      short_description: product.description?.substring(0, 200) || '',
    }));

    heroSlides = slidesResult.data || [];

    console.log('Processed featured products:', featuredProducts.length);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <StatsBar />
      <FeaturedProducts products={featuredProducts} />
      <ValuePropositions />
    </>
  );
}
