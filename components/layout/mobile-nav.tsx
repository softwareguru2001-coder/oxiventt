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
        className="md:hidden p-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md relative z-50"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden"
              style={{ zIndex: 99998 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl md:hidden overflow-y-auto border-l-8 border-blue-600"
              style={{ zIndex: 99999 }}
            >
              <div className="flex flex-col h-full bg-white">
                <div className="flex items-center justify-between px-5 py-4 border-b-2 border-gray-300 bg-white flex-shrink-0">
                  <div className="relative w-24 h-9">
                    <Image
                      src="/oxiventt.png"
                      alt="Oxiventt"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-white">
                  <div className="px-5 py-4 bg-red-500 text-white text-center">
                    <p className="text-lg font-bold">MOBILE MENU</p>
                  </div>
                  <ul className="space-y-4 px-5 py-6 bg-gray-50">
                    {mainMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block w-full px-6 py-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-bold text-lg shadow-md"
                          >
                            <div className="flex items-center gap-4">
                              <Icon className="w-7 h-7" />
                              <span>{item.label}</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      <button
                        onClick={() => setProductsExpanded(!productsExpanded)}
                        className="w-full px-6 py-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-bold text-lg shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Package className="w-7 h-7" />
                            <span>Products</span>
                          </div>
                          {productsExpanded ? (
                            <ChevronUp className="w-6 h-6" />
                          ) : (
                            <ChevronDown className="w-6 h-6" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {productsExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mt-3 space-y-2"
                          >
                            <li>
                              <Link
                                href="/products"
                                onClick={() => setIsOpen(false)}
                                className="block w-full px-6 py-4 rounded-lg bg-gray-200 text-gray-900 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-bold text-base"
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
                                    className="block w-full px-6 py-4 rounded-lg bg-gray-200 text-gray-900 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-bold text-base"
                                  >
                                    <div className="flex items-center gap-3">
                                      <CategoryIcon className="w-6 h-6" />
                                      <span>{category.label}</span>
                                    </div>
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
                              className="block w-full px-6 py-5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200 font-bold text-lg shadow-md"
                            >
                              <div className="flex items-center gap-4">
                                <Icon className="w-7 h-7" />
                                <span>{item.label}</span>
                              </div>
                            </a>
                          </li>
                        );
                      }
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block w-full px-6 py-5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-all duration-200 font-bold text-lg shadow-md"
                          >
                            <div className="flex items-center gap-4">
                              <Icon className="w-7 h-7" />
                              <span>{item.label}</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="px-5 mt-8 pt-6 border-t-2 border-gray-300">
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      Quick Contact
                    </p>
                    <div className="space-y-3">
                      <a
                        href="tel:+919099199000"
                        className="flex items-center gap-3 text-base text-gray-900 hover:text-blue-600 transition-colors font-semibold"
                      >
                        <Phone className="w-5 h-5 flex-shrink-0" />
                        <span>+91 90991 99000</span>
                      </a>
                      <a
                        href="mailto:info@oxiventt.com"
                        className="flex items-center gap-3 text-base text-gray-900 hover:text-blue-600 transition-colors font-semibold"
                      >
                        <Mail className="w-5 h-5 flex-shrink-0" />
                        <span>info@oxiventt.com</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-5 bg-gray-100 border-t-2 border-gray-300 mt-8">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 w-full px-6 py-5 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg"
                    >
                      <Phone className="w-6 h-6" />
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
