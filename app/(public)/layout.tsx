'use client';

import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/ui/back-to-top';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || !isHomePage
            ? 'bg-white border-b border-gray-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px] sm:h-20">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="relative w-[110px] sm:w-[130px] lg:w-[145px] h-10 sm:h-11">
                <Image
                  src="/oxiventt.png"
                  alt="Oxiventt"
                  fill
                  className="object-contain object-left transition-all duration-500"
                  priority
                  sizes="145px"
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                const light = !scrolled && isHomePage;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      active
                        ? light ? 'text-white' : 'text-gray-900'
                        : light
                        ? 'text-white/75 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        className={`absolute bottom-0 left-5 right-5 h-px ${
                          light ? 'bg-white' : 'bg-gray-900'
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="tel:+919099199000"
                className={`hidden lg:flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  scrolled || !isHomePage
                    ? 'text-gray-500 hover:text-gray-900'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                +91 90991 99000
              </a>

              <Link
                href="/contact"
                className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  scrolled || !isHomePage
                    ? 'bg-gray-900 text-white hover:bg-gray-700'
                    : 'bg-white text-gray-900 hover:bg-white/90'
                }`}
              >
                Get Quote
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2.5 rounded-xl transition-colors ${
                  scrolled || !isHomePage
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-[68px] sm:top-20 inset-x-0 z-40 md:hidden bg-white border-b border-gray-100 shadow-2xl">
            <div className="max-w-7xl mx-auto px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-gray-50 text-gray-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a
                  href="tel:+919099199000"
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-600"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  +91 90991 99000
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
