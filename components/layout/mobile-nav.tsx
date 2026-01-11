'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Package, Phone, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">OX</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      Oxiventt
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-8">
                  <ul className="space-y-2 px-4">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                          >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-base font-medium">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="p-6 border-t border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Get Quote
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
