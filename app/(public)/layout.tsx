'use client';

import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/ui/back-to-top';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
  const light = !scrolled && isHomePage;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || !isHomePage
            ? 'bg-white/98 backdrop-blur-md border-b border-gray-200/80 shadow-sm'
            : 'bg-transparent border-b border-white/10'
        }`}
      >
        {/* Top utility bar — only on scroll/non-home */}
        <div
          className={`hidden lg:block transition-all duration-500 overflow-hidden ${
            scrolled || !isHomePage ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gray-950 text-gray-400 text-xs">
            <div className="max-w-7xl mx-auto px-10 flex items-center justify-between h-9">
              <span className="tracking-wide">ISO 27001 Certified · Startup India Recognised · Est. 1999</span>
              <div className="flex items-center gap-5">
                <a href="mailto:info@oxiventt.com" className="hover:text-white transition-colors">info@oxiventt.com</a>
                <a href="tel:+919099199000" className="hover:text-white transition-colors">+91 90991 99000</a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px] sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className={`relative transition-all duration-500 ${
                light
                  ? 'bg-white rounded-xl px-3 py-2 shadow-lg shadow-black/20'
                  : ''
              }`}>
                <Image
                  src="/oxiventt.png"
                  alt="Oxiventt"
                  width={130}
                  height={44}
                  className={`object-contain transition-all duration-300 ${
                    light ? 'h-9 w-auto' : 'h-9 w-auto'
                  }`}
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-200 ${
                      active
                        ? light
                          ? 'text-white bg-white/15'
                          : 'text-gray-900 bg-gray-100'
                        : light
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+919099199000"
                className={`hidden lg:flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  light ? 'text-white/75 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                +91 90991 99000
              </a>

              <Link
                href="/contact"
                className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  light
                    ? 'bg-white text-gray-900 hover:bg-gray-50 shadow-lg shadow-black/20'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
              >
                Get Quote
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2.5 rounded-lg transition-colors ${
                  light
                    ? 'text-white hover:bg-white/15'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
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
                      ? 'bg-gray-900 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2.5">
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
