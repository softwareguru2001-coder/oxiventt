'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { BrochureModal } from '@/components/products/brochure-modal';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  category: string;
  short_description?: string;
  price?: number;
  is_price_visible: boolean;
  images: string[];
  featured: boolean;
  available_sizes?: string[];
  brochure_url?: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  console.log('FeaturedProducts received:', products?.length, 'products');
  const displayProducts = products.slice(0, 4);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<{
    url: string;
    productId: string;
    productName: string;
  } | null>(null);

  const handleBrochureClick = (productId: string, productName: string) => {
    const product = displayProducts.find((p) => p.id === productId);
    if (product?.brochure_url) {
      setSelectedBrochure({
        url: product.brochure_url,
        productId,
        productName,
      });
      setIsBrochureModalOpen(true);
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yLTJ2Mmg0di0yaC00em0tNCAwYC0ydjJoMnYtMnptLTQgMGgtMnYyaDJ2LTJ6bS00IDBoLTJ2MmgydC0yem0tNC0ydjRoMnYtNGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-lg"
          >
            <span className="flex w-2 h-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-500"></span>
            </span>
            Featured Products
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-industrial-900 via-industrial-800 to-industrial-900 bg-clip-text text-transparent">
              Premium Industrial
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our top-performing ventilation systems engineered for excellence and built to withstand the most demanding industrial environments
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              ISO Certified
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              Energy Efficient
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <span className="text-lg">🛡️</span>
              </div>
              10+ Year Warranty
            </div>
          </motion.div>
        </motion.div>

        {displayProducts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {displayProducts.map((product, index) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} onBrochureClick={handleBrochureClick} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No featured products available at the moment.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-3xl border-2 border-blue-100/50 p-10 md:p-12 shadow-2xl backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-industrial-900 mb-3">
                  Explore Our Complete Range
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Browse through our extensive catalog of industrial ventilation solutions tailored to your specific needs
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View All Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-blue-600 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {selectedBrochure && (
        <BrochureModal
          isOpen={isBrochureModalOpen}
          onClose={() => {
            setIsBrochureModalOpen(false);
            setSelectedBrochure(null);
          }}
          brochureUrl={selectedBrochure.url}
          productId={selectedBrochure.productId}
          productName={selectedBrochure.productName}
        />
      )}
    </section>
  );
}
