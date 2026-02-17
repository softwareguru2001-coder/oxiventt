'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

const products = [
  { name: 'All Products', href: '/products' },
  { name: 'Axial Fans', href: '/products?category=axial' },
  { name: 'Centrifugal Fans', href: '/products?category=centrifugal' },
  { name: 'Exhaust Systems', href: '/products?category=exhaust' },
];

const company = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Contact Us', href: '/contact' },
];

const support = [
  { name: 'Get Quote', href: '/contact' },
  { name: 'WhatsApp Us', href: 'https://wa.me/919099199000', external: true },
  { name: 'Email Us', href: 'mailto:info@oxiventt.com', external: true },
];

const social = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      {/* Top divider with blue accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 border-b border-white/6">

          {/* Brand column */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <div className="inline-block bg-white rounded-xl px-3 py-2">
                <Image
                  src="/oxiventt.png"
                  alt="Oxiventt"
                  width={200}
                  height={60}
                  className="object-contain h-14 w-auto"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Leading manufacturer of high-performance industrial ventilation solutions.
              Engineering excellence since 1999.
            </p>

            <div className="space-y-3 text-sm text-gray-400 mb-7">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">202-203, Om Textile Park, V-1 Umbel-Parb Road,<br />TA. Kamrej, Surat, Gujarat — 394325</span>
              </div>
              <a href="tel:+919099199000" className="flex items-center gap-3 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-gray-600 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                +91 90991 99000
              </a>
              <a href="mailto:info@oxiventt.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-gray-600 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                info@oxiventt.com
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <span className="font-semibold text-gray-400">GST</span>
                <span>24AAKFO0322P1Z6</span>
              </div>
            </div>

            <div className="flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-5">Products</h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Certifications */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-5">Support</h4>
            <ul className="space-y-3 mb-8">
              {support.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-4">Certifications</h4>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center flex-shrink-0 group-hover:border-white/25 transition-colors">
                  <span className="text-[0.58rem] font-black text-gray-300 leading-tight text-center">ISO<br/>27001</span>
                </div>
                <span>ISO 27001 (ISMS)</span>
              </button>
              <div className="inline-flex items-center gap-3 text-sm text-gray-400">
                <div className="w-9 h-9 rounded-lg bg-white flex-shrink-0 flex items-center justify-center p-1.5">
                  <img
                    src="/image copy copy copy copy copy.png"
                    alt="Startup India"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>Startup India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            Copyright &copy; {year} OXIVENTT LLP. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-700">Made in India</span>
            <Link href="/admin/login" className="text-xs text-gray-700 hover:text-gray-400 transition-colors duration-200">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
