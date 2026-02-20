'use client';

import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/ui/back-to-top';
import { QuoteModalProvider, useQuoteModal } from '@/components/forms/quote-modal';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
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

  return (
    <>
      <div className="fixed top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 z-[60]" />

      <header className="fixed top-1.5 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div
          className={`max-w-6xl mx-auto transition-all duration-300 ${
            mounted && scrolled
              ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5'
              : 'bg-white/90 backdrop-blur-sm'
          } rounded-full border border-gray-200/60`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/oxiventt.png"
                alt="Oxiventt"
                width={160}
                height={48}
                className="h-9 sm:h-10 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                      active
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                      active ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => openQuoteModal()}
                className="hidden sm:inline-flex items-center px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
              >
                Get Quote
              </button>
              <a
                href="tel:+919099199000"
                className="hidden lg:inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors border border-gray-200/80"
              >
                Talk to Sales
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
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
          <div className="fixed top-20 inset-x-4 z-50 md:hidden">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    <ChevronRight className={`w-4 h-4 ${
                      pathname === link.href ? 'text-orange-500' : 'text-gray-400'
                    }`} />
                  </Link>
                ))}
              </div>
              <div className="p-4 pt-2 border-t border-gray-100 space-y-3">
                <a
                  href="tel:+919099199000"
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 90991 99000
                </a>
                <button
                  onClick={() => { setMobileOpen(false); openQuoteModal(); }}
                  className="flex items-center justify-center w-full py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-2xl hover:bg-gray-800 transition-colors"
                >
                  Get a Quote
                </button>
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
    <QuoteModalProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </QuoteModalProvider>
  );
}
