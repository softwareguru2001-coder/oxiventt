import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-18 md:h-22">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 md:w-13 md:h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl md:text-2xl">OX</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-industrial-900 to-industrial-700 bg-clip-text text-transparent leading-none">
                  Oxiventt
                </span>
                <span className="text-xs text-gray-500 font-medium mt-0.5">Excellence in Ventilation</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
              >
                Products
              </Link>
              <Link
                href="/contact"
                className="ml-2 px-7 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get Quote
              </Link>
            </nav>

            <MobileNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
