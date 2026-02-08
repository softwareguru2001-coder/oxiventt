export interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialProfiles?: string[];
}

export interface LocalBusinessSchemaProps extends OrganizationSchemaProps {
  businessType: string;
  priceRange?: string;
  openingHours?: any[];
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}

export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string[];
  sku?: string;
  brand?: string;
  category?: string;
  price?: number;
  currency?: string;
  availability?: string;
  specifications?: Record<string, any>;
}

export interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateOrganizationSchema(props: OrganizationSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: props.name,
    url: props.url,
    logo: props.logo,
    description: props.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: props.phone,
      contactType: 'customer service',
      email: props.email,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'gu'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    ...(props.socialProfiles && props.socialProfiles.length > 0
      ? { sameAs: props.socialProfiles }
      : {}),
  };
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps) {
  const orgSchema = generateOrganizationSchema(props);

  return {
    ...orgSchema,
    '@type': ['Organization', 'LocalBusiness', props.businessType],
    ...(props.priceRange ? { priceRange: props.priceRange } : {}),
    ...(props.openingHours && props.openingHours.length > 0
      ? { openingHoursSpecification: props.openingHours }
      : {}),
    ...(props.geoCoordinates
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: props.geoCoordinates.latitude,
            longitude: props.geoCoordinates.longitude,
          },
        }
      : {}),
  };
}

export function generateBreadcrumbSchema(props: BreadcrumbSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(props: ProductSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
    ...(props.image && props.image.length > 0 ? { image: props.image } : {}),
    ...(props.sku ? { sku: props.sku } : {}),
    ...(props.brand ? { brand: { '@type': 'Brand', name: props.brand } } : {}),
    ...(props.category ? { category: props.category } : {}),
    ...(props.price && props.currency
      ? {
          offers: {
            '@type': 'Offer',
            price: props.price,
            priceCurrency: props.currency,
            availability: props.availability || 'https://schema.org/InStock',
          },
        }
      : {}),
    ...(props.specifications
      ? {
          additionalProperty: Object.entries(props.specifications).map(
            ([name, value]) => ({
              '@type': 'PropertyValue',
              name,
              value,
            })
          ),
        }
      : {}),
  };
}

export function generateFAQSchema(props: FAQSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateWebSiteSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export const COMPANY_INFO = {
  name: 'OXIVENTT LLP',
  brandName: 'Oxiventt',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  email: 'info@oxiventt.com',
  phone: '+919099199000',
  gst: '24AAKFO0322P1Z6',
  address: {
    streetAddress: '202,203, Om textile park, v-1 Umbel-parb road',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    postalCode: '394325',
    addressCountry: 'IN',
  },
  geoCoordinates: {
    latitude: '21.2396',
    longitude: '72.8697',
  },
  description: 'Leading manufacturer of high-quality industrial fans, exhaust fans, and ventilation solutions in India. Specializing in axial fans, centrifugal fans, and custom ventilation systems for industrial, commercial, and residential applications.',
};
