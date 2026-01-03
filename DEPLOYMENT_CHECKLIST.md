# Deployment Checklist

Use this checklist to ensure a smooth production deployment.

---

## Pre-Deployment

### 1. Code Preparation
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] Build passes: `npm run build`
- [ ] TypeScript checks pass: `npm run typecheck`
- [ ] All environment variables documented
- [ ] .env.example created (if needed)
- [ ] Git repository clean and committed

### 2. Database Setup
- [ ] Supabase project created
- [ ] All migrations applied in order
- [ ] RLS enabled on all tables
- [ ] RLS policies verified
- [ ] Indexes created
- [ ] At least one admin user created

### 3. Storage Setup
- [ ] `product-images` bucket created (public)
- [ ] `brochures` bucket created (private)
- [ ] Storage policies applied
- [ ] Test image upload works
- [ ] Test brochure signed URL works

### 4. Edge Functions
- [ ] All Edge Functions deployed
- [ ] CORS headers configured
- [ ] Test each function:
  - [ ] `/products-create` (admin only)
  - [ ] `/products-update` (admin only)
  - [ ] `/products-delete` (admin only)
  - [ ] `/leads-quote` (public)
  - [ ] `/leads-whatsapp` (public)
  - [ ] `/gated-brochure` (public)

---

## Vercel Deployment

### 1. Environment Variables in Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional)
- [ ] `NODE_ENV=production`

### 2. Build Configuration
- [ ] Framework preset: Next.js
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Node version: 18.x or 20.x

### 3. Deploy
- [ ] Initial deployment successful
- [ ] No build errors
- [ ] Preview deployment tested
- [ ] Production deployment verified

### 4. Domain Configuration (if applicable)
- [ ] Custom domain added
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] `NEXT_PUBLIC_SITE_URL` updated to custom domain

---

## Post-Deployment Verification

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] Hero slider works
- [ ] Products page displays products
- [ ] Product detail pages load
- [ ] Product images display
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Pagination works
- [ ] Contact form submits
- [ ] WhatsApp button opens correctly
- [ ] Brochure download works (generates signed URL)
- [ ] Admin login works
- [ ] Admin dashboard accessible
- [ ] Admin can create products
- [ ] Admin can edit products
- [ ] Admin can delete products
- [ ] Admin can view leads
- [ ] Sign out works

### SEO Verification
- [ ] `/sitemap.xml` accessible and valid
- [ ] `/robots.txt` accessible
- [ ] Meta tags present on homepage
- [ ] Meta tags present on product pages
- [ ] OpenGraph images loading
- [ ] Twitter cards working
- [ ] JSON-LD schema valid ([validator](https://validator.schema.org/))
- [ ] Canonical URLs correct
- [ ] Page titles unique per page

### Performance Tests
- [ ] Lighthouse audit run
  - [ ] Performance score > 85
  - [ ] SEO score > 95
  - [ ] Accessibility score > 90
  - [ ] Best Practices score > 95
- [ ] Images loading correctly
- [ ] Hero images preloaded
- [ ] No console errors
- [ ] No 404 errors in Network tab
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds

### Security Tests
- [ ] Admin routes require authentication
- [ ] Non-admin cannot access admin routes
- [ ] Test RLS with different users:
  - [ ] Unauthenticated user can view products
  - [ ] Unauthenticated user can submit leads
  - [ ] Unauthenticated user CANNOT view leads
  - [ ] Unauthenticated user CANNOT edit products
  - [ ] Admin can view all leads
  - [ ] Admin can edit products
- [ ] Service role key not exposed in client
- [ ] No sensitive data in error messages
- [ ] CORS working for Edge Functions

### Database Verification
```sql
-- Run these queries in Supabase SQL Editor:

-- 1. Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('products', 'leads', 'admin_users');
-- Expected: All show rowsecurity = true

-- 2. Count policies
SELECT COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public';
-- Expected: At least 12 policies

-- 3. Verify admin users
SELECT id, email, role, created_at
FROM admin_users;
-- Expected: At least 1 admin user

-- 4. Check products
SELECT COUNT(*) as product_count FROM products;
-- Expected: Your product count

-- 5. Check leads
SELECT COUNT(*) as lead_count FROM leads;
-- Expected: 0 or more
```

---

## Google Search Console Setup

### 1. Verify Ownership
- [ ] Add site to Google Search Console
- [ ] Verify using meta tag method
- [ ] Or verify using DNS TXT record

### 2. Submit Sitemap
- [ ] Submit `https://yourdomain.com/sitemap.xml`
- [ ] Verify sitemap processes successfully
- [ ] Check for any errors

### 3. Configure Settings
- [ ] Set preferred domain (www vs non-www)
- [ ] Enable email notifications for critical issues
- [ ] Set up International Targeting (if applicable)

---

## Monitoring Setup

### Vercel Monitoring
- [ ] Enable Vercel Analytics
- [ ] Enable Speed Insights
- [ ] Set up error alerts
- [ ] Configure notification email

### Supabase Monitoring
- [ ] Review database metrics
- [ ] Set up usage alerts
- [ ] Configure backup notifications
- [ ] Check API usage limits

### Custom Monitoring (Optional)
- [ ] Set up Sentry for error tracking
- [ ] Configure Plausible/Google Analytics
- [ ] Set up uptime monitoring (UptimeRobot, etc.)

---

## Backup Verification

### Initial Backup
- [ ] Manual database backup taken
- [ ] Backup file downloaded and stored safely
- [ ] Storage buckets backed up
- [ ] .env variables documented securely

### Automated Backups
- [ ] Supabase daily backups confirmed (check dashboard)
- [ ] Set up weekly manual backup schedule
- [ ] Document backup restoration procedure
- [ ] Test restore on staging environment (if available)

---

## Documentation

### Internal Documentation
- [ ] README.md updated
- [ ] PRODUCTION.md reviewed
- [ ] DEPLOYMENT_CHECKLIST.md (this file) completed
- [ ] Environment variables documented
- [ ] Admin credentials stored securely (password manager)

### Client Handover (if applicable)
- [ ] Admin access credentials provided
- [ ] Supabase dashboard access shared
- [ ] Vercel dashboard access shared
- [ ] Documentation provided
- [ ] Training session scheduled/completed

---

## Final Checks

### Before Going Live
- [ ] All checklist items above completed
- [ ] Stakeholders notified of deployment
- [ ] Rollback plan documented
- [ ] Support contact information ready
- [ ] Monitoring dashboards accessible

### Go Live
- [ ] Switch DNS to production (if applicable)
- [ ] Verify site loads on custom domain
- [ ] Test all critical paths one final time
- [ ] Monitor logs for first 30 minutes
- [ ] Announce launch

### Post-Launch (First 24 Hours)
- [ ] Monitor error logs
- [ ] Check analytics for traffic
- [ ] Verify forms/leads coming through
- [ ] Review performance metrics
- [ ] Address any critical issues immediately

### Post-Launch (First Week)
- [ ] Daily monitoring of error rates
- [ ] Review user feedback
- [ ] Check SEO indexing progress
- [ ] Optimize based on real-world performance data
- [ ] Document any issues and solutions

---

## Rollback Plan

If critical issues occur:

1. **Immediate Actions:**
   - Check Vercel deployment logs
   - Review Supabase logs
   - Check error tracking (if set up)

2. **Rollback Options:**
   - Vercel: Revert to previous deployment (Deployments → Previous → Promote to Production)
   - Database: Restore from backup (Supabase Dashboard → Backups → Restore)

3. **Communication:**
   - Notify stakeholders
   - Post status update (if applicable)
   - Document incident for post-mortem

---

## Success Criteria

✅ Deployment is successful when:

- All checklist items marked as complete
- No critical errors in logs
- All functionality tests passing
- Performance metrics meet targets
- Security tests passing
- SEO verification complete
- Monitoring active
- Backups configured
- Documentation complete

**Deployment Date:** _____________

**Deployed By:** _____________

**Production URL:** _____________

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

## Support & Escalation

**Critical Issues:**
- Check Vercel status: https://www.vercel-status.com/
- Check Supabase status: https://status.supabase.com/
- Review deployment logs
- Contact development team

**Non-Critical Issues:**
- Document in issue tracker
- Schedule for next maintenance window
- Update documentation

---

**🎉 Congratulations on your successful deployment!**
