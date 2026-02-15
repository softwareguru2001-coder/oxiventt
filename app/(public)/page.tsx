import { HeroSlider } from '@/components/home/hero-slider';
import { StatsBar } from '@/components/home/stats-bar';
import { FeaturedProducts } from '@/components/home/featured-products';
import { ValuePropositions } from '@/components/home/value-propositions';
import { Certifications } from '@/components/home/certifications';
import { FAQSection } from '@/components/seo/faq-section';
import { JsonLd } from '@/components/seo/json-ld';
import { supabasePublicClient } from '@/lib/supabase/server';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  COMPANY_INFO
} from '@/lib/seo/schema';
import { Metadata } from 'next';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'High-Quality Industrial Fans & Ventilation Solutions | Oxiventt',
  description: 'Leading manufacturer of industrial fans, exhaust fans, and ventilation systems in India. Custom axial fans, centrifugal fans, and complete air circulation solutions for industrial, commercial, and residential applications.',
  keywords: [
    'industrial fans',
    'exhaust fans India',
    'ventilation solutions',
    'axial fans manufacturer',
    'centrifugal fans',
    'industrial ventilation',
    'air circulation systems',
    'Gujarat industrial fans',
    'commercial exhaust fans',
    'HVAC ventilation',
    'Oxiventt fans',
    'Surat industrial fans'
  ],
  openGraph: {
    title: 'Oxiventt - Premium Industrial Fans & Ventilation Solutions',
    description: 'Leading manufacturer of high-quality industrial fans, exhaust fans, and ventilation solutions in India. Custom solutions for every application.',
    type: 'website',
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Oxiventt Industrial Fans and Ventilation Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxiventt - Premium Industrial Fans & Ventilation Solutions',
    description: 'Leading manufacturer of high-quality industrial fans and ventilation solutions in India.',
    images: [`${baseUrl}/og-default.jpg`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let heroSlides: any[] = [];

  try {
    const supabase = supabasePublicClient();

    const [productsResult, slidesResult] = await Promise.all([
      (supabase as any)
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4),
      (supabase as any)
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
    ]);

    if (productsResult.error) {
      console.error('Products fetch error:', productsResult.error);
      throw productsResult.error;
    }
    if (slidesResult.error) {
      console.error('Slides fetch error:', slidesResult.error);
      throw slidesResult.error;
    }

    console.log('Fetched products:', productsResult.data?.length);

    featuredProducts = (productsResult.data || []).map((product: any) => ({
      ...product,
      available_sizes: product.sizes || [],
      brochure_url: product.brochure_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brochures/${product.brochure_path}`
        : null,
      short_description: product.description?.substring(0, 200) || '',
    }));

    heroSlides = slidesResult.data || [];

    console.log('Processed featured products:', featuredProducts.length);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  const organizationSchema = generateOrganizationSchema({
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.url,
    logo: `${COMPANY_INFO.url}/oxiventt.png`,
    description: COMPANY_INFO.description,
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.phone,
    address: COMPANY_INFO.address,
  });

  const localBusinessSchema = generateLocalBusinessSchema({
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.url,
    logo: `${COMPANY_INFO.url}/oxiventt.png`,
    description: COMPANY_INFO.description,
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.phone,
    address: COMPANY_INFO.address,
    businessType: 'Store',
    priceRange: '₹₹',
    openingHours: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    geoCoordinates: COMPANY_INFO.geoCoordinates,
  });

  const websiteSchema = generateWebSiteSchema(COMPANY_INFO.url, COMPANY_INFO.brandName);

  const faqs = [
    {
      question: 'What types of industrial fans does Oxiventt manufacture?',
      answer: 'Oxiventt manufactures a comprehensive range of industrial fans including axial fans, centrifugal fans, exhaust fans, and custom ventilation solutions. Our products are available in various sizes and specifications to meet diverse industrial, commercial, and residential needs.',
    },
    {
      question: 'Can I customize the specifications of the fans?',
      answer: 'Yes, we offer complete customization options for all our products. You can specify the size, power requirements, airflow capacity, and other technical specifications. Contact our team for a detailed consultation and custom quotation.',
    },
    {
      question: 'What is the delivery time for orders?',
      answer: 'Standard products are typically delivered within 7-14 business days. Custom orders may take 3-4 weeks depending on specifications. We will provide an accurate timeline when you place your order.',
    },
    {
      question: 'Do you provide installation and maintenance services?',
      answer: 'Yes, we provide complete installation guidance and support. For maintenance, we offer comprehensive service packages and can provide on-site support based on your location and requirements.',
    },
    {
      question: 'What industries do you serve?',
      answer: 'We serve a wide range of industries including manufacturing, textile, chemical, pharmaceutical, food processing, warehousing, agriculture, and commercial buildings. Our ventilation solutions are designed to meet specific industry standards and requirements.',
    },
    {
      question: 'How do I request a quotation?',
      answer: 'You can request a quotation by filling out the contact form on our website, calling us at +91 90991 99000, or emailing us at info@oxiventt.com. Please provide details about your requirements, and our team will respond within 24 hours.',
    },
  ];

  return (
    <>
      <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />
      <HeroSlider slides={heroSlides} />
      <StatsBar />
      <FeaturedProducts products={featuredProducts} />
      <ValuePropositions />
      <Certifications />
      <div className="container mx-auto px-3 sm:px-4 md:px-8 py-12 md:py-16">
        <FAQSection faqs={faqs} />
      </div>
    </>
  );
}
