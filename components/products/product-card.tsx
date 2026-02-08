'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Download } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description?: string;
  price?: number;
  is_price_visible: boolean;
  images: string[];
  available_sizes?: string[];
  brochure_url?: string;
}

interface ProductCardProps {
  product: Product;
  onBrochureClick?: (productId: string, productName: string) => void;
}

export function ProductCard({ product, onBrochureClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name}. Can you provide more details?`
    );
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleBrochureClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBrochureClick && product.brochure_url) {
      onBrochureClick(product.id, product.name);
    }
  };

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        onMouseEnter={() => {
          setIsHovered(true);
          if (hasMultipleImages) {
            setCurrentImageIndex(1);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
        }}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-3xl bg-white border border-gray-200/50 transition-all duration-500 hover:shadow-premium hover:border-blue-300/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
          {product.images && product.images.length > 0 && product.images[0] ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <Image
                  src={product.images[currentImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-inner">
                  <span className="text-4xl">🌀</span>
                </div>
                <p className="text-sm font-semibold text-gray-400">No Image Available</p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.button
            onClick={handleWhatsApp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-3 sm:p-4 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 hover:shadow-2xl transition-all duration-300 z-10"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {product.brochure_url && (
            <motion.button
              onClick={handleBrochureClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 z-10 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold border border-blue-100"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Brochure
            </motion.button>
          )}

          {product.available_sizes && product.available_sizes.length > 0 && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-gray-100">
              <span className="text-xs font-bold text-gray-700">
                {product.available_sizes.length} Sizes
              </span>
            </div>
          )}
        </div>

        <div className="relative p-4 sm:p-6 md:p-7">
          <div className="mb-3 sm:mb-4">
            <span className="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg mb-2 sm:mb-3 border border-blue-100">
              {product.category || 'General'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-industrial-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </div>

          {product.short_description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-4 sm:mb-5 leading-relaxed">
              {product.short_description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-gray-100">
            {product.is_price_visible && product.price ? (
              <div>
                <p className="text-xs text-gray-500 mb-0.5 sm:mb-1 font-medium">Starting from</p>
                <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-industrial-900 to-industrial-700 bg-clip-text text-transparent">
                  ₹{Number(product.price).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-xs sm:text-sm font-bold text-gray-700">Contact for pricing</p>
            )}

            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 sm:gap-2 text-blue-600 font-bold text-xs sm:text-sm"
            >
              View
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-blue-500/30 transition-all duration-500" />
      </motion.div>
    </Link>
  );
}
