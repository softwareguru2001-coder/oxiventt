# SEO Action Checklist

This checklist contains manual steps you need to take to complete the SEO optimization process.

## Immediate Actions Required

### 1. Create Open Graph Default Image
- [ ] Create an image file named `og-default.jpg`
- [ ] Dimensions: 1200 x 630 pixels
- [ ] Include: Company logo, tagline, and key visual
- [ ] Place in `/public/og-default.jpg`
- [ ] Keep file size under 300KB

**Why**: This image appears when your website is shared on social media platforms (Facebook, LinkedIn, Twitter, etc.)

---

### 2. Set Up Google Tools

#### Google Search Console
- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Add your website property
- [ ] Verify ownership (DNS or HTML file method)
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Monitor for any crawl errors

#### Google Analytics 4
- [ ] Create GA4 property at [analytics.google.com](https://analytics.google.com)
- [ ] Get your Measurement ID (G-XXXXXXXXXX)
- [ ] Add tracking code to your website
- [ ] Set up conversion goals (form submissions, quote requests)
- [ ] Enable enhanced measurement

#### Google My Business
- [ ] Create listing at [business.google.com](https://business.google.com)
- [ ] Enter business information:
  - Name: OXIVENTT LLP
  - Address: 202,203, Om textile park, v-1 Umbel-parb road, Surat, Gujarat - 394325
  - Phone: +91 90991 99000
  - Website: Your domain
  - Category: Industrial Equipment Supplier
  - Business Hours: Mon-Fri 9AM-6PM, Sat 9AM-2PM
- [ ] Verify your business (postcard or phone)
- [ ] Add photos of products and premises
- [ ] Add product listings

---

### 3. Verify Structured Data

- [ ] Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test your homepage: `https://yourdomain.com`
- [ ] Test a product page: `https://yourdomain.com/products/[product-slug]`
- [ ] Test contact page: `https://yourdomain.com/contact`
- [ ] Fix any errors reported

---

### 4. Update Environment Variables

Add this to your `.env` file (if you get Google verification code):
```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

---

### 5. Social Media Profiles (Optional but Recommended)

If you have social media profiles, add them to your website:

1. Create profiles on:
   - [ ] Facebook Business Page
   - [ ] LinkedIn Company Page
   - [ ] Instagram Business Account
   - [ ] YouTube Channel (for product videos)

2. Update the schema in `/lib/seo/schema.ts`:
```typescript
// Add to COMPANY_INFO object
socialProfiles: [
  'https://www.facebook.com/yourpage',
  'https://www.linkedin.com/company/yourcompany',
  'https://www.instagram.com/yourprofile',
]
```

---

## Short-term Actions (Within 2 Weeks)

### 6. Content Creation

- [ ] Write unique descriptions for all products (minimum 300 words each)
- [ ] Create company "About Us" page
- [ ] Add customer testimonials/reviews
- [ ] Create case studies of successful installations
- [ ] Write blog posts about:
  - Industrial ventilation best practices
  - Fan selection guide
  - Maintenance tips
  - Energy efficiency in ventilation

### 7. Image Optimization

- [ ] Add descriptive alt text to all product images
- [ ] Ensure all images are compressed
- [ ] Use WebP format where possible
- [ ] Add proper image dimensions
- [ ] Create image sitemaps for product photos

### 8. Local SEO

- [ ] Get listed in:
  - IndiaMART
  - TradeIndia
  - ExportersIndia
  - JustDial
  - Sulekha
- [ ] Ensure NAP (Name, Address, Phone) is consistent everywhere
- [ ] Add business to local Gujarat business directories

---

## Monthly Ongoing Tasks

### 9. Content Marketing

- [ ] Publish 2-4 blog posts per month
- [ ] Update product information regularly
- [ ] Add new FAQs based on customer questions
- [ ] Create downloadable resources (catalogs, guides)
- [ ] Share content on social media

### 10. Link Building

- [ ] Reach out to industry websites for guest posts
- [ ] Get listed in relevant directories
- [ ] Partner with complementary businesses
- [ ] Participate in industry forums
- [ ] Create shareable content (infographics, guides)

### 11. Performance Monitoring

- [ ] Check Google Search Console weekly
- [ ] Review analytics monthly
- [ ] Monitor keyword rankings
- [ ] Track conversion rates
- [ ] Analyze top performing pages
- [ ] Review and fix any technical errors

---

## Advanced Optimizations (Optional)

### 12. Technical Enhancements

- [ ] Set up Cloudflare or CDN for faster global access
- [ ] Implement security headers
- [ ] Add PWA functionality
- [ ] Create AMP versions of key pages
- [ ] Implement advanced caching strategies

### 13. Video Content

- [ ] Create product demonstration videos
- [ ] Add installation guide videos
- [ ] Upload to YouTube with proper optimization
- [ ] Embed videos on product pages
- [ ] Add VideoObject schema markup

### 14. Review System

- [ ] Implement customer review functionality
- [ ] Add Review schema markup
- [ ] Display reviews on product pages
- [ ] Encourage satisfied customers to leave reviews
- [ ] Respond to all reviews professionally

### 15. International SEO (If Expanding)

- [ ] Add hreflang tags for different regions
- [ ] Create region-specific content
- [ ] Translate to other Indian languages if needed
- [ ] Set up international targeting in Search Console

---

## Quick Wins Checklist

Do these RIGHT NOW for immediate impact:

- [x] ✅ Structured data implemented (Already done!)
- [x] ✅ Meta descriptions optimized (Already done!)
- [x] ✅ Title tags optimized (Already done!)
- [x] ✅ Breadcrumbs added (Already done!)
- [x] ✅ FAQ section created (Already done!)
- [ ] Create og-default.jpg image
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google My Business listing
- [ ] Add Google Analytics tracking
- [ ] Check for broken links
- [ ] Test mobile usability
- [ ] Verify all contact information is accurate
- [ ] Ensure HTTPS is working properly

---

## Measurement & Success Metrics

Track these metrics monthly:

### Organic Traffic
- Total organic sessions
- New vs returning users
- Pages per session
- Average session duration
- Bounce rate

### Rankings
- Track positions for:
  - Industrial fans
  - Exhaust fans
  - [Your city] industrial fans
  - [Your state] ventilation
  - Custom fan manufacturer

### Conversions
- Quote request submissions
- WhatsApp message clicks
- Phone call clicks
- Brochure downloads
- Email inquiries

### Technical Health
- Page load speed
- Mobile usability score
- Core Web Vitals metrics
- Indexed pages count
- Crawl errors

---

## Support Resources

### SEO Testing Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### Analytics & Monitoring
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Google My Business](https://business.google.com)

### Learning Resources
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

## Need Help?

If you need assistance with any of these tasks:
1. Google Search Console setup
2. Schema markup validation
3. Content strategy
4. Technical SEO issues
5. Performance optimization

Feel free to reach out for guidance or clarification on any item in this checklist.

---

**Remember**: SEO is a marathon, not a sprint. Consistent effort over 3-6 months will yield significant results. Focus on quality content, technical excellence, and user experience.
