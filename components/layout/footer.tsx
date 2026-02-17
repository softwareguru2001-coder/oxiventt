'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 border-b border-white/8">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/oxiventt.png"
                alt="Oxiventt"
                width={140}
                height={44}
                className="object-contain brightness-0 invert w-[120px] h-auto"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Leading manufacturer of high-performance industrial ventilation solutions.
              Engineering excellence since 1999.
            </p>

            <div className="space-y-3 text-sm text-gray-400 mb-7">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>202-203, Om Textile Park, V-1 Umbel-Parb Road, TA. Kamrej, Surat, Gujarat — 394325</span>
              </div>
              <a href="tel:+919099199000" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                +91 90991 99000
              </a>
              <a href="mailto:info@oxiventt.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                info@oxiventt.com
              </a>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <span className="font-medium text-gray-400">GST:</span>
                24AAKFO0322P1Z6
              </div>
            </div>

            <div className="flex gap-2.5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.14em] mb-5">Products</h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.14em] mb-5">Company</h4>
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

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.14em] mb-5">Support</h4>
            <ul className="space-y-3">
              {support.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.14em] mb-4">Certifications</h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
                  className="inline-flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[0.6rem] font-black text-gray-300 leading-none text-center">ISO<br/>27001</span>
                  </div>
                  ISO 27001 (ISMS)
                </button>
                <div className="inline-flex items-center gap-2.5 text-sm text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-white flex-shrink-0 flex items-center justify-center p-1">
                    <img
                      src="/image copy copy copy copy copy.png"
                      alt="Startup India"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  Startup India
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            Copyright &copy; {year} OXIVENTT LLP. All Rights Reserved.
          </p>
          <Link href="/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
