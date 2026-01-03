/*
  # Add Performance Indexes

  1. Performance Optimizations
    - Add index on products.featured for homepage queries
    - Add index on products.slug for product detail page lookups
    - Add index on products.category for filtering
    - Add index on products.created_at for sorting
    - Add index on leads.created_at for admin dashboard
    - Add composite index on products(featured, created_at) for featured product queries

  2. Benefits
    - Faster homepage load (featured products query)
    - Faster product detail page loads
    - Faster category filtering
    - Faster admin dashboard queries
    - Reduced database CPU usage at scale

  3. Notes
    - All indexes use IF NOT EXISTS to be safely rerunnable
    - Indexes are critical for Indian 3G/4G network performance
    - Small table overhead, massive query speed improvement
*/

-- Index for featured products homepage query (most critical)
CREATE INDEX IF NOT EXISTS idx_products_featured_created 
  ON products(featured, created_at DESC) 
  WHERE featured = true;

-- Index for product slug lookups (detail pages)
CREATE INDEX IF NOT EXISTS idx_products_slug 
  ON products(slug);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category 
  ON products(category);

-- Index for general sorting by creation date
CREATE INDEX IF NOT EXISTS idx_products_created_at 
  ON products(created_at DESC);

-- Index for admin lead dashboard queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at 
  ON leads(created_at DESC);

-- Index for lead type filtering in admin
CREATE INDEX IF NOT EXISTS idx_leads_type 
  ON leads(type);

-- Index for lead product lookups
CREATE INDEX IF NOT EXISTS idx_leads_product_id 
  ON leads(product_id) 
  WHERE product_id IS NOT NULL;
