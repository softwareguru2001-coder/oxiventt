import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import Link from 'next/link';
import Image from 'next/image';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="relative w-28 h-10 md:w-40 md:h-14 transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/oxiventt.png"
                  alt="Oxiventt - Industrial Airflow"
                  fill
                  className="object-contain object-left"
                  priority
                />
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
