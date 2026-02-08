'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);

  const mainMenuItems = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
  ];

  const productCategories = [
    { href: '/products?category=axial', label: 'Axial Fans' },
    { href: '/products?category=centrifugal', label: 'Centrifugal Fans' },
    { href: '/products?category=exhaust', label: 'Exhaust Systems' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
        aria-label="Open menu"
      >
        Menu
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 md:hidden z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl md:hidden z-[9999] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="relative w-24 h-8">
                  <Image
                    src="/oxiventt.png"
                    alt="Oxiventt"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Content - Scrollable with fixed height */}
              <div className="h-[calc(100%-64px-80px)] overflow-y-auto">
                <nav className="py-2">
                  {/* Main Menu Items */}
                  {mainMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 text-[15px] text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Products Dropdown */}
                  <div className="border-b border-gray-100">
                    <button
                      onClick={() => setProductsExpanded(!productsExpanded)}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    >
                      <span>Products</span>
                      {productsExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {productsExpanded && (
                      <div className="bg-gray-50">
                        <Link
                          href="/products"
                          onClick={() => setIsOpen(false)}
                          className="block px-8 py-2.5 text-[14px] text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          All Products
                        </Link>
                        {productCategories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-8 py-2.5 text-[14px] text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Link */}
                  <a
                    href="https://wa.me/919099199000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3.5 text-[15px] text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    WhatsApp Support
                  </a>
                </nav>

                {/* Contact Section */}
                <div className="mt-4 px-5 py-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Contact
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+919099199000"
                      className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>+91 90991 99000</span>
                    </a>
                    <a
                      href="mailto:info@oxiventt.com"
                      className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>info@oxiventt.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom CTA - Fixed at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-200 bg-gray-50">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 text-[15px] font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
