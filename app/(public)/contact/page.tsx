import { QuotationForm } from '@/components/forms/quotation-form';
import { Mail, Phone, MapPin, Clock, Building2, FileText } from 'lucide-react';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { COMPANY_INFO } from '@/lib/seo/schema';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'Contact Us - Get a Quote for Industrial Fans & Ventilation',
  description: 'Contact Oxiventt for industrial ventilation solutions. Get quotes, technical support, and expert consultation. Located in Surat, Gujarat. Call +91 90991 99000 or email info@oxiventt.com',
  keywords: [
    'contact Oxiventt',
    'industrial fans quote',
    'ventilation consultation',
    'Surat industrial fans',
    'exhaust fan supplier contact',
    'Gujarat ventilation company',
  ],
  openGraph: {
    title: 'Contact Oxiventt - Industrial Ventilation Experts',
    description: 'Get in touch with our team for quotations, technical support, and ventilation solutions.',
    type: 'website',
    url: `${baseUrl}/contact`,
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Oxiventt',
    description: 'Contact page for Oxiventt industrial ventilation solutions',
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_INFO.address.streetAddress,
        addressLocality: COMPANY_INFO.address.addressLocality,
        addressRegion: COMPANY_INFO.address.addressRegion,
        postalCode: COMPANY_INFO.address.postalCode,
        addressCountry: COMPANY_INFO.address.addressCountry,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <JsonLd data={contactPageSchema} />
      <div className="relative bg-gradient-to-br from-industrial-900 via-industrial-800 to-gray-900 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/50 to-transparent" />
        <div className="container mx-auto px-3 sm:px-4 md:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent px-4">Contact Us</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              Get in touch with our team for inquiries, quotations, or support
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-8 py-10 sm:py-12 md:py-16">
        <div className="mb-8">
          <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact' }]} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
          <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" itemScope itemType="https://schema.org/ContactPoint">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-industrial-900 mb-2 sm:mb-3">Email</h2>
            <a
              href="mailto:info@oxiventt.com"
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
              itemProp="email"
            >
              info@oxiventt.com
            </a>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" itemScope itemType="https://schema.org/ContactPoint">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-industrial-900 mb-2 sm:mb-3">Phone</h2>
            <a
              href="tel:+919099199000"
              className="text-green-600 hover:text-green-700 transition-colors font-medium"
              itemProp="telephone"
            >
              +91 90991 99000
            </a>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1" itemScope itemType="https://schema.org/PostalAddress">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-industrial-900 mb-2 sm:mb-3">Address</h2>
            <p className="text-gray-600 leading-relaxed">
              <span itemProp="streetAddress">202,203, Om textile park, v-1 Umbel-parb road</span><br />
              <span itemProp="addressLocality">Surat</span>, <span itemProp="addressRegion">Gujarat</span><br />
              <span itemProp="addressCountry">India</span> - <span itemProp="postalCode">394325</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl sm:rounded-2xl border border-blue-100/50 p-6 sm:p-8 mb-10 sm:mb-12 shadow-lg">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-industrial-900 mb-3 sm:mb-4">Business Hours</h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 min-w-[140px]">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 min-w-[140px]">Saturday:</span>
                  <span>9:00 AM - 2:00 PM</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 min-w-[140px]">Sunday:</span>
                  <span className="text-red-600 font-medium">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-2xl border border-gray-200/50 p-8 mb-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-2">Company Name</h2>
                <p className="text-xl text-gray-700 font-semibold">OXIVENTT LLP</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-2">GST Number</h2>
                <p className="text-xl text-gray-700 font-mono font-semibold">24AAKFO0322P1Z6</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/50 p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 mb-3">
              Request a Quote
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours
            </p>
          </div>
          <QuotationForm />
        </div>
      </div>
    </div>
  );
}
