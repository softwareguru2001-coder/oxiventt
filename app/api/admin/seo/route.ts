import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseServerClient();
    const { data, error } = await supabase.from('seo_settings').select('key, value');
    if (error) throw error;
    const settings = Object.fromEntries((data || []).map((s: any) => [s.key, s.value]));
    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseServerClient();
    const body = await request.json();
    const { settings } = body as { settings: Record<string, string> };

    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value }));

    const { error } = await (supabase as any)
      .from('seo_settings')
      .upsert(upserts, { onConflict: 'key' });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
