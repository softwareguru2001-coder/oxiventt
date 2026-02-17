'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Download, FileText } from 'lucide-react';
import { useState } from 'react';
import { useQuoteModal } from '@/components/forms/quote-modal';

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
  const { openQuoteModal } = useQuoteModal();

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

  const handleGetQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuoteModal(product.name);
  };

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <motion.div
        onMouseEnter={() => {
          setIsHovered(true);
          if (hasMultipleImages) setCurrentImageIndex(1);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
        }}
        className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {product.images && product.images.length > 0 && product.images[0] ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[currentImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  quality={80}
                  className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-300 text-sm font-medium">No Image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.available_sizes && product.available_sizes.length > 0 && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg">
              <span className="text-xs font-semibold text-gray-700">
                {product.available_sizes.length} Sizes
              </span>
            </div>
          )}

          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-250 translate-y-1 group-hover:translate-y-0">
            {product.brochure_url && (
              <button
                onClick={handleBrochureClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-gray-800 text-xs font-semibold shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Brochure
              </button>
            )}
            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-lg bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-5">
          <span className="text-[0.67rem] font-bold text-gray-400 uppercase tracking-widest mb-2">
            {product.category || 'General'}
          </span>

          <h3 className="text-[0.95rem] font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug line-clamp-2 mb-2.5">
            {product.name}
          </h3>

          {product.short_description && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-1">
              {product.short_description}
            </p>
          )}

          <div className="pt-4 border-t border-gray-100 mt-auto space-y-3">
            <div className="flex items-center justify-between">
              {product.is_price_visible && product.price ? (
                <div>
                  <p className="text-[0.62rem] text-gray-400 uppercase tracking-wider mb-0.5">From</p>
                  <p className="text-base font-bold text-gray-900">
                    ₹{Number(product.price).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">Contact for price</p>
              )}

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 group-hover:text-gray-900 group-hover:gap-2 transition-all duration-200">
                View details
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <button
              onClick={handleGetQuote}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-blue-600/20"
            >
              <FileText className="w-3.5 h-3.5" />
              Get Quote
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
