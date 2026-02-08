'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Home, Package, Phone, ChevronDown, ChevronUp, Fan, Wind, Factory, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);

  const mainMenuItems = [
    { href: '/', label: 'Home', icon: Home },
  ];

  const productCategories = [
    { href: '/products?category=axial', label: 'Axial Fans', icon: Fan },
    { href: '/products?category=centrifugal', label: 'Centrifugal Fans', icon: Wind },
    { href: '/products?category=exhaust', label: 'Exhaust Systems', icon: Factory },
  ];

  const additionalLinks = [
    { href: '/contact', label: 'Get Quote', icon: Phone },
    { href: 'https://wa.me/919099199000', label: 'WhatsApp Support', icon: MessageCircle, external: true },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2.5 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors relative z-50"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              style={{ zIndex: 99998 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl md:hidden overflow-y-auto"
              style={{ zIndex: 99999 }}
            >
              <div className="flex flex-col h-full bg-white">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white flex-shrink-0">
                  <div className="relative w-28 h-10">
                    <Image
                      src="/oxiventt.png"
                      alt="Oxiventt"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 hover:bg-gray-50 rounded transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-white">
                  <nav className="py-2">
                    <ul>
                      {mainMenuItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-6 py-4 text-[15px] text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}

                      <li className="border-b border-gray-100">
                        <button
                          onClick={() => setProductsExpanded(!productsExpanded)}
                          className="w-full flex items-center justify-between px-6 py-4 text-[15px] text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        >
                          <span>Products</span>
                          {productsExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        <AnimatePresence>
                          {productsExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-gray-50"
                            >
                              <li>
                                <Link
                                  href="/products"
                                  onClick={() => setIsOpen(false)}
                                  className="block px-10 py-3 text-[14px] text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                  All Products
                                </Link>
                              </li>
                              {productCategories.map((category) => (
                                <li key={category.href}>
                                  <Link
                                    href={category.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-10 py-3 text-[14px] text-gray-600 hover:text-blue-600 transition-colors"
                                  >
                                    {category.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>

                      {additionalLinks.map((item) => {
                        if (item.external) {
                          return (
                            <li key={item.href}>
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-6 py-4 text-[15px] text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                              >
                                {item.label}
                              </a>
                            </li>
                          );
                        }
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-6 py-4 text-[15px] text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-6 px-6 pt-6 pb-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Contact Us
                      </p>
                      <div className="space-y-2">
                        <a
                          href="tel:+919099199000"
                          className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-blue-600 transition-colors py-1"
                        >
                          <Phone className="w-4 h-4" />
                          <span>+91 90991 99000</span>
                        </a>
                        <a
                          href="mailto:info@oxiventt.com"
                          className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-blue-600 transition-colors py-1"
                        >
                          <Mail className="w-4 h-4" />
                          <span>info@oxiventt.com</span>
                        </a>
                      </div>
                    </div>

                    <div className="px-6 py-6 border-t border-gray-200">
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center px-6 py-3.5 text-[15px] font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        Request Quote
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
