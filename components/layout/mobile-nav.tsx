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
        className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors z-50"
        aria-label="Open menu"
      >
        <Menu className="w-7 h-7 text-gray-900" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[9999] md:hidden overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
                  <div className="relative w-24 h-9 flex-shrink-0">
                    <Image
                      src="/oxiventt.png"
                      alt="Oxiventt"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 bg-white">
                  <ul className="space-y-1 px-4">
                    {mainMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                          >
                            <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-base font-medium">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      <button
                        onClick={() => setProductsExpanded(!productsExpanded)}
                        className="flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-base font-medium">Products</span>
                        </div>
                        {productsExpanded ? (
                          <ChevronUp className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 flex-shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {productsExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mt-1 space-y-1"
                          >
                            <li>
                              <Link
                                href="/products"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 pl-12 pr-4 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm"
                              >
                                All Products
                              </Link>
                            </li>
                            {productCategories.map((category) => {
                              const CategoryIcon = category.icon;
                              return (
                                <li key={category.href}>
                                  <Link
                                    href={category.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 pl-12 pr-4 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm"
                                  >
                                    <CategoryIcon className="w-4 h-4 flex-shrink-0" />
                                    {category.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>

                    {additionalLinks.map((item) => {
                      const Icon = item.icon;
                      if (item.external) {
                        return (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                            >
                              <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                              <span className="text-base font-medium">{item.label}</span>
                            </a>
                          </li>
                        );
                      }
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                          >
                            <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-base font-medium">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="px-4 mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                      Quick Contact
                    </p>
                    <div className="space-y-3 px-4">
                      <a
                        href="tel:+919099199000"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>+91 90991 99000</span>
                      </a>
                      <a
                        href="mailto:info@oxiventt.com"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span>info@oxiventt.com</span>
                      </a>
                    </div>
                  </div>
                </nav>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 flex-shrink-0">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    <Phone className="w-5 h-5" />
                    Request a Quote Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
