# Production Deployment Guide

This guide covers everything needed to deploy the Industrial Fans application to production.

---

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Supabase Setup](#supabase-setup)
3. [Storage Configuration](#storage-configuration)
4. [Admin User Setup](#admin-user-setup)
5. [Deployment to Vercel](#deployment-to-vercel)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Backup Strategy](#backup-strategy)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Environment Variables

### Required Environment Variables

Create a `.env.local` file (for local development) or configure in your hosting platform:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration (REQUIRED)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Google Site Verification (OPTIONAL)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Node Environment
NODE_ENV=production
```

### How to Get Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### Security Notes

⚠️ **NEVER commit `.env.local` or `.env` to Git**
- Already in `.gitignore`
- Service role key must remain secret
- Only deploy anon key to client-side

---

## Supabase Setup

### 1. Database Migrations

All migrations are in `supabase/migrations/`. Apply them in order:

```bash
# Using Supabase CLI (recommended)
supabase db push

# Or use the Supabase Dashboard:
# SQL Editor → New Query → Paste migration content → Run
```

**Migration Order:**
1. `20251128184509_create_industrial_fan_schema.sql` - Initial schema
2. `20251128184546_setup_storage_policies.sql` - Storage policies
3. `20251128190158_create_complete_schema.sql` - Complete schema
4. `20251129184726_add_rls_policies.sql` - RLS policies
5. `add_rls_policies.sql` - Updated policies

### 2. Row Level Security (RLS) Policy Checklist

#### ✅ Products Table
```sql
-- Verify policies exist:
SELECT * FROM pg_policies WHERE tablename = 'products';

-- Expected policies:
✅ "Public can read products" - SELECT (public)
✅ "Admins can insert products" - INSERT (authenticated + admin check)
✅ "Admins can update products" - UPDATE (authenticated + admin check)
✅ "Admins can delete products" - DELETE (authenticated + admin check)
```

#### ✅ Leads Table
```sql
-- Verify policies exist:
SELECT * FROM pg_policies WHERE tablename = 'leads';

-- Expected policies:
✅ "Anyone can insert leads" - INSERT (public)
✅ "Admins can read leads" - SELECT (authenticated + admin check)
✅ "Admins can update leads" - UPDATE (authenticated + admin check)
✅ "Admins can delete leads" - DELETE (authenticated + admin check)
```

#### ✅ Admin Users Table
```sql
-- Verify policies exist:
SELECT * FROM pg_policies WHERE tablename = 'admin_users';

-- Expected policies:
✅ "Admins can read admin_users" - SELECT (authenticated + admin check)
✅ "Admins can insert admin_users" - INSERT (authenticated + admin check)
✅ "Admins can update admin_users" - UPDATE (authenticated + admin check)
✅ "Admins can delete admin_users" - DELETE (authenticated + admin check)
```

### 3. Verify Database Structure

```sql
-- Check all tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Expected tables:
-- ✅ products
-- ✅ leads
-- ✅ admin_users

-- Verify indexes
SELECT indexname FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY indexname;
```

---

## Storage Configuration

### 1. Create Storage Buckets

In Supabase Dashboard → Storage:

#### Product Images Bucket
```
Bucket Name: product-images
Public: YES
File size limit: 5 MB
Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
```

**Policies:**
```sql
-- Public read access
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Admin upload
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);

-- Admin update
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);

-- Admin delete
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);
```

#### Brochures Bucket
```
Bucket Name: brochures
Public: NO (private - uses signed URLs)
File size limit: 10 MB
Allowed MIME types: application/pdf
```

**Policies:**
```sql
-- No public access (uses signed URLs via Edge Function)
-- Admin upload
CREATE POLICY "Admins can upload brochures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'brochures' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);

-- Admin delete
CREATE POLICY "Admins can delete brochures"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'brochures' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);
```

### 2. Verify Storage Policies

```sql
-- Check storage policies
SELECT * FROM storage.policies ORDER BY name;

-- Verify buckets
SELECT * FROM storage.buckets;
```

---

## Admin User Setup

### Method 1: Using Supabase Dashboard (Recommended)

#### Step 1: Create Auth User
1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter email and password
4. Click **Create user**
5. Copy the User ID (UUID)

#### Step 2: Add to Admin Users Table
1. Go to **Table Editor** → **admin_users**
2. Click **Insert** → **Insert row**
3. Fill in:
   - `id`: Paste the User ID from Step 1
   - `email`: Same email as auth user
   - `role`: `admin`
   - `created_at`: Leave as default (now)
4. Click **Save**

### Method 2: Using SQL

```sql
-- Step 1: Create auth user (replace with your email/password)
-- This must be done via Supabase Dashboard or API

-- Step 2: Add to admin_users table
INSERT INTO admin_users (id, email, role)
VALUES (
  'USER_UUID_FROM_AUTH_USERS',
  'admin@yourdomain.com',
  'admin'
);
```

### Method 3: Programmatic (After First Admin Exists)

```typescript
// Use the admin panel once first admin is set up
// Navigate to: /admin/users (if you create this feature)
// Or use the Edge Function (if implemented)
```

### Verify Admin User

```sql
-- Check admin user exists
SELECT au.*, u.email
FROM admin_users au
LEFT JOIN auth.users u ON u.id = au.id
WHERE au.role = 'admin';
```

---

## Deployment to Vercel

### Prerequisites

- Vercel account
- GitHub/GitLab repository (recommended)
- Supabase project configured
- Environment variables ready

### Step 1: Prepare Repository

```bash
# Ensure .gitignore is correct
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your Git repository
4. Select the repository

### Step 3: Configure Build Settings

Vercel should auto-detect Next.js. Verify:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next (default)
Install Command: npm install
Node Version: 18.x or 20.x
```

### Step 4: Add Environment Variables

In Vercel Project Settings → Environment Variables:

**Production Environment:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code (optional)
NODE_ENV=production
```

**Preview Environment:**
```
(Same as production, or use separate Supabase project for staging)
```

### Step 5: Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Visit your deployment URL

### Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as shown
4. Update `NEXT_PUBLIC_SITE_URL` to match

---

## Post-Deployment Checklist

### ✅ Functionality Tests

- [ ] Homepage loads correctly
- [ ] Products page displays products
- [ ] Product detail pages work
- [ ] Contact form submits leads
- [ ] WhatsApp button works
- [ ] Brochure download creates lead and generates signed URL
- [ ] Admin login works
- [ ] Admin can create/edit/delete products
- [ ] Admin can view leads
- [ ] Search and filters work
- [ ] Pagination works

### ✅ SEO Verification

- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
- [ ] Meta tags present on all pages
- [ ] OpenGraph images showing correctly
- [ ] JSON-LD schema validates (use [Schema.org validator](https://validator.schema.org/))
- [ ] Google Search Console configured
- [ ] Submit sitemap to Google Search Console

### ✅ Performance Tests

- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Images loading correctly
- [ ] Hero images preloaded
- [ ] Page load time < 3s
- [ ] Time to Interactive < 5s

### ✅ Security Tests

- [ ] Admin routes require authentication
- [ ] Non-admin users cannot access admin panel
- [ ] RLS policies working (test with different users)
- [ ] Storage buckets have correct permissions
- [ ] Service role key not exposed in client
- [ ] CORS configured correctly for Edge Functions

### ✅ Database Verification

```sql
-- Verify RLS is enabled on all tables
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('products', 'leads', 'admin_users');
-- All should show: rowsecurity = true

-- Verify policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check for any public tables (should be NONE except products SELECT)
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = false;
```

---

## Backup Strategy

### 1. Supabase Automatic Backups

**Free Tier:**
- Daily backups (last 7 days)
- Point-in-Time Recovery: Not available

**Pro Tier ($25/month):**
- Daily backups (last 30 days)
- Point-in-Time Recovery: Yes

**Recommended:** Upgrade to Pro for production

### 2. Manual Database Backups

#### Using Supabase Dashboard
1. Go to **Database** → **Backups**
2. Click **Create backup**
3. Download backup file

#### Using pg_dump
```bash
# Set connection string
export DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Full backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Schema only
pg_dump --schema-only $DATABASE_URL > schema_$(date +%Y%m%d).sql

# Data only
pg_dump --data-only $DATABASE_URL > data_$(date +%Y%m%d).sql
```

### 3. Storage Bucket Backups

```bash
# Using Supabase CLI
supabase storage download --bucket product-images --prefix "" --destination ./backups/images/

supabase storage download --bucket brochures --prefix "" --destination ./backups/brochures/
```

### 4. Automated Backup Script

Create `scripts/backup.sh`:

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="./backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Database backup
echo "Backing up database..."
pg_dump $DATABASE_URL > $BACKUP_DIR/database.sql

# Storage backups
echo "Backing up storage..."
supabase storage download --bucket product-images --prefix "" --destination $BACKUP_DIR/images/
supabase storage download --bucket brochures --prefix "" --destination $BACKUP_DIR/brochures/

# Compress
echo "Compressing..."
tar -czf backups_$(date +%Y%m%d).tar.gz $BACKUP_DIR

echo "Backup complete: backups_$(date +%Y%m%d).tar.gz"
```

### 5. Backup Schedule (Recommended)

- **Daily:** Automated Supabase backups (Pro tier)
- **Weekly:** Manual full backup with pg_dump
- **Monthly:** Download and archive to external storage (AWS S3, Google Drive, etc.)
- **Before major changes:** Always backup database and storage

### 6. Restore Procedure

#### Database Restore
```bash
# From SQL dump
psql $DATABASE_URL < backup_20231129.sql

# Or using Supabase Dashboard:
# Database → Backups → Restore
```

#### Storage Restore
```bash
# Upload files back to buckets
supabase storage upload --bucket product-images --source ./backups/images/
supabase storage upload --bucket brochures --source ./backups/brochures/
```

---

## Monitoring & Maintenance

### 1. Supabase Dashboard Monitoring

Check regularly:
- **Database** → **Usage** - Database size, active connections
- **Storage** → **Usage** - Storage usage
- **Auth** → **Users** - Active users, sign-ups
- **Logs** - Error logs, query performance

### 2. Vercel Analytics

Enable in Vercel Dashboard:
- **Analytics** - Page views, Web Vitals
- **Speed Insights** - Real user metrics
- **Logs** - Function logs, build logs

### 3. Set Up Alerts

**Supabase:**
- Database size approaching limit
- High error rate
- Slow query performance

**Vercel:**
- Build failures
- Function errors
- High response times

### 4. Regular Maintenance Tasks

**Weekly:**
- [ ] Review error logs
- [ ] Check database performance
- [ ] Review new leads
- [ ] Monitor storage usage

**Monthly:**
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review and clean up old leads
- [ ] Check backup integrity
- [ ] Review analytics and optimize

**Quarterly:**
- [ ] Database optimization (vacuum, analyze)
- [ ] Security audit
- [ ] Performance optimization
- [ ] Update documentation

---

## Troubleshooting

### Common Issues

#### 1. "Failed to fetch" errors in production
**Cause:** Incorrect Supabase URL or CORS issues
**Fix:** Verify environment variables and Supabase URL

#### 2. Admin login not working
**Cause:** User not in admin_users table
**Fix:** Follow [Admin User Setup](#admin-user-setup)

#### 3. Images not loading
**Cause:** Storage bucket policies incorrect
**Fix:** Verify storage policies in [Storage Configuration](#storage-configuration)

#### 4. Sitemap not generating
**Cause:** Database connection issue
**Fix:** Check Supabase credentials and database connection

#### 5. Build fails on Vercel
**Cause:** Missing environment variables
**Fix:** Add all required env vars in Vercel dashboard

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Supabase Support
- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

### Emergency Contacts
- Database issues: Check Supabase status page
- Hosting issues: Check Vercel status page
- Critical bugs: Contact development team

---

## Success Criteria

Your production deployment is successful when:

✅ All environment variables configured
✅ Database migrations applied
✅ RLS policies active and tested
✅ Storage buckets configured with policies
✅ At least one admin user created
✅ Deployed to Vercel successfully
✅ Custom domain configured (if applicable)
✅ All functionality tests passing
✅ SEO verification complete
✅ Performance tests passing
✅ Backup strategy implemented
✅ Monitoring enabled

**Congratulations! Your application is production-ready! 🚀**
