import { QuotationForm } from '@/components/forms/quotation-form';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team for inquiries, quotations, or support. We are here to help you find the perfect ventilation solution.',
  openGraph: {
    title: 'Contact Us - Oxiventt',
    description: 'Get in touch with our team for inquiries, quotations, or support.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="relative bg-gradient-to-br from-industrial-900 via-industrial-800 to-gray-900 text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/50 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team for inquiries, quotations, or support
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <div className="group bg-white rounded-2xl border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-industrial-900 mb-3">Email</h2>
            <a
              href="mailto:info@oxiventt.com"
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              info@oxiventt.com
            </a>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-industrial-900 mb-3">Phone</h2>
            <a
              href="tel:+919099199000"
              className="text-green-600 hover:text-green-700 transition-colors font-medium"
            >
              +91 90991 99000
            </a>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-industrial-900 mb-3">Address</h2>
            <p className="text-gray-600 leading-relaxed">
              202,203, Om Textile Park<br />
              Surat-394101, Gujarat<br />
              India
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl border border-blue-100/50 p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-4">Business Hours</h2>
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
