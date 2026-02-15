'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Award, ShieldCheck } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'All Products', href: '/products' },
    { name: 'Axial Fans', href: '/products?category=axial' },
    { name: 'Centrifugal Fans', href: '/products?category=centrifugal' },
    { name: 'Exhaust Systems', href: '/products?category=exhaust' },
  ],
  company: [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Contact Us', href: '/contact' },
  ],
  support: [
    { name: 'Get Quote', href: '/contact' },
    { name: 'WhatsApp', href: 'https://wa.me/919099199000' },
    { name: 'Email Us', href: 'mailto:info@oxiventt.com' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-40 h-14 sm:w-48 sm:h-16 mb-4 sm:mb-6 brightness-0 invert">
                <Image
                  src="/oxiventt.png"
                  alt="Oxiventt"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                Leading manufacturer of high-performance industrial ventilation solutions.
                Engineering excellence since 1999.
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span>202,203, Om textile park, v-1 Umbel-parb road, TA. Kamrej, Surat, Gujarat, India - 394325</span>
                </div>
                <a
                  href="tel:+919099199000"
                  className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>+91 90991 99000</span>
                </a>
                <a
                  href="mailto:info@oxiventt.com"
                  className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>info@oxiventt.com</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="font-semibold text-white/90">GST No:</span>
                  <span>24AAKFO0322P1Z6</span>
                </div>
              </div>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/90">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/90">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') || link.href.startsWith('mailto:') ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-6 mb-6"
          >
            <motion.button
              onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-md rounded-xl border-2 border-white/20 hover:border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg"
              aria-label="View ISO 27001 Certificate"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                <div className="w-[85%] h-[85%] rounded-full bg-white flex items-center justify-center">
                  <div className="text-center leading-none">
                    <div className="text-blue-800 text-xs sm:text-sm font-bold">ISO</div>
                    <div className="text-blue-800 text-[9px] sm:text-[11px] font-semibold">27001</div>
                  </div>
                </div>
              </div>
              <span className="text-sm sm:text-base text-white font-semibold tracking-wide">ISO 27001(ISMS)</span>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-md rounded-xl border-2 border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg"
              aria-label="Startup India Certificate"
            >
              <div className="h-10 sm:h-12 flex items-center justify-center">
                <img
                  src="/image copy copy copy copy copy.png"
                  alt="Startup India"
                  className="h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs sm:text-sm text-white/60 text-center mb-4"
          >
            Copyright © {currentYear} OXIVENTT LLP. All Rights Reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link
              href="/admin/login"
              className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-300"
            >
              Admin Login
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </footer>
  );
}
