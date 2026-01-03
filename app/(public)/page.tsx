import { HeroSlider } from '@/components/home/hero-slider';
import { StatsBar } from '@/components/home/stats-bar';
import { FeaturedProducts } from '@/components/home/featured-products';
import { ValuePropositions } from '@/components/home/value-propositions';
import { supabaseServerClient } from '@/lib/supabase/server';

export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: any[] = [];

  try {
    const supabase = supabaseServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;

    featuredProducts = (data || []).map((product) => ({
      ...product,
      available_sizes: product.sizes || [],
      brochure_url: product.brochure_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brochures/${product.brochure_path}`
        : null,
      short_description: product.description?.substring(0, 200) || '',
    }));
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
  }

  return (
    <>
      <HeroSlider />
      <StatsBar />
      <FeaturedProducts products={featuredProducts} />
      <ValuePropositions />
    </>
  );
}
