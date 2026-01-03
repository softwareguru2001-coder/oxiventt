import { LeadsDashboard } from '@/components/admin/leads-dashboard';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  let leads: any[] = [];
  let products: any[] = [];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return <LeadsDashboard leads={leads} products={products} />;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const [leadsResponse, productsResponse] = await Promise.all([
      fetch(
        `${supabaseUrl}/functions/v1/admin-leads`,
        {
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: 'no-store',
        }
      ),
      supabase
        .from('products')
        .select('id, name')
        .order('name', { ascending: true }),
    ]);

    if (leadsResponse.ok) {
      const leadsData = await leadsResponse.json();
      leads = leadsData.data || [];
    } else {
      console.error('Failed to fetch leads:', leadsResponse.status);
    }

    if (productsResponse.error) {
      console.error('Failed to fetch products:', productsResponse.error);
    } else {
      products = productsResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return <LeadsDashboard leads={leads} products={products} />;
}
