import { supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = supabaseServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching category:', error);
      return NextResponse.json(
        { error: 'Failed to fetch category' },
        { status: 500 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Unexpected error in GET /api/admin/categories/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = supabaseServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { data: existingCategory } = await supabase
      .from('categories')
      .select('*')
      .eq('id', params.id)
      .maybeSingle() as { data: Category | null };

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, description, display_order, is_active } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    if (slug !== existingCategory.slug) {
      const { data: duplicateCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', slug)
        .neq('id', params.id)
        .maybeSingle();

      if (duplicateCategory) {
        return NextResponse.json(
          { error: 'A category with this name already exists' },
          { status: 409 }
        );
      }
    }

    const categoryData = {
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      display_order: typeof display_order === 'number' ? display_order : existingCategory.display_order,
      is_active: typeof is_active === 'boolean' ? is_active : existingCategory.is_active,
    };

    const { data: category, error } = await supabase
      .from('categories')
      // @ts-ignore - categories table not in Database types yet
      .update(categoryData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Unexpected error in PUT /api/admin/categories/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = supabaseServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { data: category } = (await supabase
      .from('categories')
      .select('name')
      .eq('id', params.id)
      .maybeSingle()) as { data: { name: string } | null };

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const { data: productsUsingCategory, error: productsError } = await supabase
      .from('products')
      .select('id')
      .eq('category', category.name)
      .limit(1);

    if (productsError) {
      console.error('Error checking for products:', productsError);
    }

    const hasProducts = productsUsingCategory && productsUsingCategory.length > 0;

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting category:', error);
      return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      warning: hasProducts ? 'This category was assigned to some products. Those products will retain the category name.' : null
    });
  } catch (error) {
    console.error('Unexpected error in DELETE /api/admin/categories/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
