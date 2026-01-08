import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: slides, error } = await (supabase as any)
      .from('hero_slides')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json(slides);
  } catch (error) {
    console.error('Failed to fetch slides:', error);
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError) {
      console.error('Admin check error:', adminError);
      return NextResponse.json({ error: 'Failed to verify admin status' }, { status: 500 });
    }

    if (!adminUser || (adminUser as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { title, subtitle, image_url, gradient, display_order, is_active } = body;

    const { data, error } = await (supabase as any)
      .from('hero_slides')
      .insert({
        title,
        subtitle,
        image_url,
        gradient,
        display_order,
        is_active,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Failed to create slide:', error);
    return NextResponse.json(
      { error: 'Failed to create slide', details: error.message },
      { status: 500 }
    );
  }
}
