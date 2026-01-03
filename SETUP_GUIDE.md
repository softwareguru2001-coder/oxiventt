# Industrial Fan Manufacturer Website - Setup Guide

## Overview

This is a production-ready industrial fan manufacturer website built with:
- **Next.js 13** (App Router) + TypeScript + TailwindCSS
- **Supabase** for database, authentication, storage, and Edge Functions
- Fully responsive, WCAG AA accessible, SEO optimized

## Features Implemented

### Public-Facing Features
- ✅ Hero slider with animated transitions
- ✅ Featured products section
- ✅ Product catalog with filtering
- ✅ Product detail pages with 4-image gallery
- ✅ WhatsApp inquiry integration (creates lead before redirect)
- ✅ Brochure download with lead capture modal
- ✅ Quote/contact form
- ✅ About page
- ✅ SEO metadata and schema.org structured data

### Admin Features
- ✅ Secure admin authentication (email/password)
- ✅ Product CRUD operations
- ✅ Image upload to Supabase Storage (max 4 per product)
- ✅ PDF brochure upload to Supabase Storage
- ✅ Leads management with status tracking
- ✅ CSV export for leads
- ✅ Row Level Security (RLS) policies

### Technical Implementation
- ✅ Supabase Edge Functions for CRUD operations
- ✅ RLS policies (public read for products, admin-only write)
- ✅ Supabase Storage with public/private buckets
- ✅ Client-side and server-side rendering
- ✅ TypeScript types for type safety

## Database Schema

### Tables

1. **products**
   - Product information, images, specifications, features
   - Public read access, admin-only write

2. **leads**
   - Customer inquiries from forms, WhatsApp, brochure downloads
   - Public insert, admin-only read

3. **admin_users**
   - Links to auth.users with role="admin"
   - Admin-only access

### Storage Buckets

1. **product-images** - Product gallery images (max 5MB each)
2. **brochures** - PDF brochures (max 10MB each)

## Supabase Edge Functions

1. **get-products** - Public endpoint to fetch products
2. **create-lead** - Public endpoint to create leads
3. **admin-products** - Protected CRUD for products
4. **admin-leads** - Protected endpoint for leads management

## Getting Started

### 1. Environment Variables

Your `.env` file is already configured with:
```
NEXT_PUBLIC_SUPABASE_URL=https://rvkytgsnccefvnjreffj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Create First Admin User

To access the admin panel, you need to create an admin user:

1. Sign up a user via Supabase Dashboard:
   - Go to Authentication > Users
   - Click "Add user"
   - Create user with email/password

2. Add user to admin_users table:
   ```sql
   INSERT INTO admin_users (id, role)
   VALUES ('USER_ID_FROM_AUTH_USERS', 'admin');
   ```

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 4. Access Admin Panel

1. Navigate to: http://localhost:3000/admin/login
2. Login with the admin credentials you created
3. Manage products and leads

## Key Pages

- **/** - Homepage with hero slider and featured products
- **/products** - Product catalog
- **/products/[slug]** - Product detail page
- **/about** - About page
- **/contact** - Contact/quote form
- **/admin** - Admin dashboard
- **/admin/login** - Admin login
- **/admin/products** - Product management
- **/admin/leads** - Leads management

## WhatsApp Integration

The WhatsApp button:
1. Creates a lead entry automatically
2. Pre-fills message with product info
3. Redirects to WhatsApp with phone number: +1234567890

To update the phone number, search for `wa.me/1234567890` in:
- `app/products/[slug]/product-detail-client.tsx`

## Customization

### Update Company Information

Edit contact details in:
- `components/layout/header.tsx` (phone number in header)
- `components/layout/footer.tsx` (address, phone, email)
- `app/contact/page.tsx` (contact info cards)

### Update Hero Slider

Edit slides in:
- `components/home/hero-slider.tsx` (slides array)

### Update Value Propositions

Edit values in:
- `components/home/value-propositions.tsx` (values array)

### Add/Modify Categories

Update categories in product forms or add category filtering logic.

## Production Deployment

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

### Environment Variables for Production

Ensure these are set in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Security Best Practices

1. **Row Level Security (RLS)** - All tables have RLS enabled
2. **Admin-only writes** - Only authenticated admins can modify products
3. **Public reads** - Products are publicly accessible
4. **Secure storage** - Images and brochures use Supabase Storage with RLS
5. **Edge Functions** - Admin endpoints verify JWT tokens

## Support & Maintenance

### Adding Products
1. Login to admin panel
2. Navigate to Products > Add Product
3. Fill in details, upload images/brochure
4. Mark as featured (optional)
5. Save

### Managing Leads
1. Login to admin panel
2. Navigate to Leads
3. Update status (New → Contacted → Qualified → Closed)
4. Export to CSV for external processing

## Troubleshooting

### Admin Login Issues
- Ensure user exists in auth.users
- Verify user is in admin_users table
- Check RLS policies are enabled

### Image Upload Issues
- Verify storage buckets exist
- Check RLS policies on storage.objects
- Ensure file size limits are respected

### Edge Function Errors
- Check Supabase logs in dashboard
- Verify JWT token is being sent
- Ensure CORS headers are properly configured

## Project Structure

```
project/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   ├── products/            # Product pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components
│   ├── product/            # Product components
│   └── ui/                 # shadcn/ui components
├── lib/                     # Utilities
│   ├── supabase/           # Supabase client & auth
│   ├── api.ts              # API functions
│   └── utils.ts            # Helper functions
├── supabase/               # Supabase artifacts
│   └── functions/          # Edge Functions
└── public/                 # Static assets

```

## License

Proprietary - All rights reserved
