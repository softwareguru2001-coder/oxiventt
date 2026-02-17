import { QuotationForm } from '@/components/forms/quotation-form';
import { CertificationCards } from '@/components/ui/certification-cards';
import { Mail, Phone, MapPin, Clock, Building2, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { COMPANY_INFO } from '@/lib/seo/schema';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'Request a Quote - Industrial Fans & Ventilation | Oxiventt',
  description: 'Get a custom quote for industrial fans and ventilation solutions from Oxiventt. Fast response within 24 hours. Located in Surat, Gujarat. Call +91 90991 99000.',
  keywords: [
    'contact Oxiventt',
    'industrial fans quote',
    'ventilation consultation',
    'Surat industrial fans',
    'exhaust fan supplier contact',
    'Gujarat ventilation company',
  ],
  openGraph: {
    title: 'Request a Quote - Oxiventt Industrial Ventilation',
    description: 'Get in touch with our team for quotations, technical support, and ventilation solutions.',
    type: 'website',
    url: `${baseUrl}/contact`,
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

const benefits = [
  'Response within 24 hours',
  'Custom sizing available',
  'Bulk order discounts',
  'Expert technical guidance',
];

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
    <div className="min-h-screen bg-white">
      <JsonLd data={contactPageSchema} />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA0IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full filter blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/90 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Fast Response Guaranteed
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Request a Quote
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
              Tell us about your ventilation needs and get a customised quote from our experts within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 md:py-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact' }]} />
        </div>

        {/* Main layout: form + contact sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16" id="quote">
          {/* Quote Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Get Your Custom Quote
                  </h2>
                  <p className="text-gray-500">
                    Fill in the form below. Our team will respond within 24 hours.
                  </p>
                </div>
                <QuotationForm />
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-5">
                <a
                  href="tel:+919099199000"
                  className="flex items-start gap-4 group"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="w-11 h-11 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">Call us</p>
                    <p className="font-semibold text-white group-hover:text-green-300 transition-colors" itemProp="telephone">+91 90991 99000</p>
                  </div>
                </a>

                <a
                  href="mailto:info@oxiventt.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">Email us</p>
                    <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">info@oxiventt.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div itemScope itemType="https://schema.org/PostalAddress">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      <span itemProp="streetAddress">202,203, Om textile park,<br />v-1 Umbel-parb road</span><br />
                      <span itemProp="addressLocality">Surat</span>, <span itemProp="addressRegion">Gujarat</span> - <span itemProp="postalCode">394325</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Mon - Fri</span>
                  <span className="text-gray-500">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Saturday</span>
                  <span className="text-gray-500">9:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-7 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Company</p>
                    <p className="font-bold text-gray-900">OXIVENTT LLP</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">GST Number</p>
                    <p className="font-mono font-bold text-gray-900">24AAKFO0322P1Z6</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border border-blue-100 p-7">
              <p className="text-sm font-bold text-blue-900 mb-1">Prefer WhatsApp?</p>
              <p className="text-sm text-blue-700/70 mb-4">Chat directly with our team for fast replies.</p>
              <a
                href="https://wa.me/919099199000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Open WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <CertificationCards />
      </div>
    </div>
  );
}
