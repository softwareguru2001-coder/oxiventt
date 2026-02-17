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

export function FeaturedProducts({ products }: FeaturedProductsProps) {
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
      setSelectedBrochure({ url: product.brochure_url, productId, productName });
      setIsBrochureModalOpen(true);
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
              Featured Products
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight tracking-tight">
              Our Top-Performing<br className="hidden sm:block" /> Ventilation Systems
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="h-full"
              >
                <ProductCard product={product} onBrochureClick={handleBrochureClick} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No featured products available.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-7 px-7 sm:px-9 bg-white rounded-2xl border border-gray-200"
        >
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-0.5">
              Looking for a custom solution?
            </h3>
            <p className="text-sm text-gray-500">
              Browse our full catalog or contact us for tailored specifications
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors"
            >
              All Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:border-gray-400 transition-colors"
            >
              Get Custom Quote
            </Link>
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
