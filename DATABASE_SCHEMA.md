# Database Schema Documentation

## Overview

Complete Supabase database schema for the Industrial Fan Manufacturer Website with Row Level Security (RLS) policies and storage buckets.

---

## Tables

### 1. products

Stores all product information including specifications, pricing, and media.

```sql
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sku text,
  category text NOT NULL DEFAULT 'general',
  description text,
  specs jsonb DEFAULT '{}'::jsonb,
  sizes jsonb DEFAULT '{}'::jsonb,
  price numeric(10,2),
  is_price_visible boolean DEFAULT true,
  featured boolean DEFAULT false,
  images text[] DEFAULT ARRAY[]::text[],
  brochure_path text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` - Unique product identifier (UUID)
- `name` - Product name (required)
- `slug` - URL-friendly identifier (required, unique)
- `sku` - Stock Keeping Unit (optional)
- `category` - Product category (required, default: 'general')
- `description` - Full product description (optional)
- `specs` - Technical specifications as JSON object
- `sizes` - Available sizes as JSON object
- `price` - Product price (numeric with 2 decimal places)
- `is_price_visible` - Whether to show price (default: true)
- `featured` - Display on homepage (default: false)
- `images` - Array of public image URLs from Supabase Storage
- `brochure_path` - Storage path to PDF brochure (optional)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp (auto-updated)

**Indexes:**
- `idx_products_slug` - Fast slug lookups
- `idx_products_category` - Category filtering
- `idx_products_featured` - Featured products queries
- `idx_products_created_at` - Chronological sorting

**RLS Policies:**
- ✅ Public SELECT (anyone can view products)
- 🔒 Admin-only INSERT, UPDATE, DELETE

---

### 2. leads

Captures customer inquiries from various sources.

```sql
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL CHECK (type IN ('brochure', 'quote', 'whatsapp')),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  name text,
  company text,
  mobile text NOT NULL,
  email text,
  city text,
  message text,
  utm jsonb,
  created_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` - Unique lead identifier (UUID)
- `type` - Lead source: 'brochure', 'quote', or 'whatsapp' (required)
- `product_id` - Related product reference (optional, FK to products)
- `name` - Contact person name (optional)
- `company` - Company name (optional)
- `mobile` - Mobile phone number (required)
- `email` - Email address (optional)
- `city` - City location (optional)
- `message` - Inquiry message (optional)
- `utm` - UTM tracking parameters as JSON (optional)
- `created_at` - Creation timestamp

**Indexes:**
- `idx_leads_type` - Filter by lead source
- `idx_leads_product_id` - Related product lookups
- `idx_leads_created_at` - Chronological sorting
- `idx_leads_mobile` - Mobile number searches

**RLS Policies:**
- ✅ Public INSERT (anyone can create leads)
- 🔒 Admin-only SELECT, UPDATE

---

### 3. admin_users

Links authentication users to admin role.

```sql
CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` - References auth.users.id (UUID)
- `role` - User role (default: 'admin')
- `created_at` - Creation timestamp

**RLS Policies:**
- 🔒 Self-read only (users can view their own admin record)
- 🔒 Admin-only INSERT

---

## Storage Buckets

### 1. product-images

Stores product gallery images.

**Configuration:**
- Public: Yes (public read access)
- Max file size: 5MB (5,242,880 bytes)
- Allowed types: image/jpeg, image/png, image/webp, image/jpg

**RLS Policies:**
- ✅ Public SELECT (anyone can view images)
- 🔒 Admin-only INSERT, UPDATE, DELETE

**Usage:**
```typescript
// Upload image
const { data, error } = await supabase.storage
  .from('product-images')
  .upload('filename.jpg', file);

// Get public URL
const { data } = supabase.storage
  .from('product-images')
  .getPublicUrl('filename.jpg');
```

---

### 2. brochures

Stores PDF brochures.

**Configuration:**
- Public: Yes (public read access)
- Max file size: 10MB (10,485,760 bytes)
- Allowed types: application/pdf

**RLS Policies:**
- ✅ Public SELECT (anyone can download brochures)
- 🔒 Admin-only INSERT, UPDATE, DELETE

**Usage:**
```typescript
// Upload brochure
const { data, error } = await supabase.storage
  .from('brochures')
  .upload('brochure.pdf', file);

// Get public URL
const { data } = supabase.storage
  .from('brochures')
  .getPublicUrl('brochure.pdf');
```

---

## Security Summary

### Row Level Security (RLS)

All tables have RLS enabled with the following access patterns:

| Table | Public Access | Admin Access |
|-------|---------------|--------------|
| products | SELECT | ALL (INSERT, UPDATE, DELETE) |
| leads | INSERT | ALL (SELECT, UPDATE) |
| admin_users | None | SELECT (self only), INSERT |
| storage.objects (product-images) | SELECT | ALL |
| storage.objects (brochures) | SELECT | ALL |

### Admin Check Function

All admin-only policies use this check:
```sql
EXISTS (
  SELECT 1 FROM admin_users
  WHERE admin_users.id = auth.uid()
)
```

---

## Initial Setup

### Create First Admin User

1. **Sign up user via Supabase Dashboard:**
   ```
   Authentication → Users → Add User
   ```

2. **Add to admin_users table:**
   ```sql
   INSERT INTO admin_users (id, role)
   VALUES ('USER_ID_FROM_AUTH', 'admin');
   ```

### Insert Sample Product

```sql
INSERT INTO products (
  name,
  slug,
  sku,
  category,
  description,
  specs,
  price,
  featured,
  images
) VALUES (
  'Industrial Axial Fan - 24 inch',
  'industrial-axial-fan-24',
  'IAF-24-001',
  'axial',
  'High-performance 24-inch axial fan suitable for industrial ventilation.',
  '{"power": "5 HP", "voltage": "380V", "rpm": "1450"}',
  15000.00,
  true,
  ARRAY['https://example.com/image1.jpg']
);
```

### Insert Sample Lead

```sql
INSERT INTO leads (
  type,
  product_id,
  name,
  company,
  mobile,
  email,
  city,
  message
) VALUES (
  'quote',
  'PRODUCT_UUID_HERE',
  'John Doe',
  'ABC Manufacturing',
  '+919876543210',
  'john@example.com',
  'Mumbai',
  'Interested in bulk purchase'
);
```

---

## Query Examples

### Fetch Featured Products
```sql
SELECT * FROM products
WHERE featured = true
ORDER BY created_at DESC
LIMIT 4;
```

### Fetch Products by Category
```sql
SELECT * FROM products
WHERE category = 'axial'
ORDER BY name;
```

### Fetch Recent Leads
```sql
SELECT
  l.*,
  p.name as product_name
FROM leads l
LEFT JOIN products p ON l.product_id = p.id
ORDER BY l.created_at DESC;
```

### Count Leads by Type
```sql
SELECT
  type,
  COUNT(*) as count
FROM leads
GROUP BY type;
```

---

## Maintenance

### Update Product Updated_At Automatically

A trigger is configured to automatically update `updated_at`:

```sql
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Clean Old Leads (Optional)

```sql
-- Delete leads older than 1 year
DELETE FROM leads
WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## TypeScript Types

The generated TypeScript types are in `lib/supabase/types.ts`:

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  category: string;
  description: string | null;
  specs: Json;
  sizes: Json;
  price: number | null;
  is_price_visible: boolean;
  featured: boolean;
  images: string[];
  brochure_path: string | null;
  created_at: string;
  updated_at: string;
}

interface Lead {
  id: string;
  type: 'brochure' | 'quote' | 'whatsapp';
  product_id: string | null;
  name: string | null;
  company: string | null;
  mobile: string;
  email: string | null;
  city: string | null;
  message: string | null;
  utm: Json | null;
  created_at: string;
}
```

---

## Notes

- **UUID Generation**: Uses `uuid_generate_v4()` from uuid-ossp extension
- **Timestamps**: All timestamps use `timestamptz` (timezone-aware)
- **Foreign Keys**: `leads.product_id` has ON DELETE SET NULL
- **Constraints**: `leads.type` has CHECK constraint for valid values
- **Case Sensitivity**: Text fields are case-sensitive by default
- **JSONB**: specs, sizes, and utm use JSONB for efficient querying

---

## Troubleshooting

### RLS Policy Issues

If admin users can't access data:
```sql
-- Check if user is in admin_users table
SELECT * FROM admin_users WHERE id = 'USER_UUID';

-- Check current user
SELECT auth.uid();
```

### Storage Access Issues

If uploads fail:
```sql
-- Check storage policies
SELECT * FROM storage.policies WHERE bucket_id = 'product-images';
```

---

## Migration Applied

✅ Migration: `create_complete_schema`
✅ Tables: products, leads, admin_users
✅ Storage: product-images, brochures
✅ RLS: All policies enabled
✅ Indexes: Performance optimized
✅ Triggers: Auto-update timestamps
