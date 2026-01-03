import { FileQuestion, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-8 md:p-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="w-12 h-12 text-blue-600" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              Browse Products
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
