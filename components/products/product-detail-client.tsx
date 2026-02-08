'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  ChevronRight,
  Package,
  Ruler,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { ProductGallery } from './product-gallery';
import { BrochureModal } from './brochure-modal';
import { ProductCard } from './product-card';
import { QuotationForm } from '@/components/forms/quotation-form';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  category: string;
  short_description?: string;
  description?: string;
  price?: number;
  is_price_visible: boolean;
  images: string[];
  video_url?: string;
  brochure_url?: string;
  specifications?: Record<string, any>;
  available_sizes?: string[];
}

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.available_sizes?.[0] || null
  );
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<{
    url: string;
    productId: string;
    productName: string;
  } | null>(null);

  const handleBrochureClick = (productId: string, productName: string) => {
    const relatedProduct = relatedProducts.find((p) => p.id === productId);
    if (relatedProduct?.brochure_url) {
      setSelectedBrochure({
        url: relatedProduct.brochure_url,
        productId,
        productName,
      });
      setIsBrochureModalOpen(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description || product.name,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="relative bg-gradient-to-br from-slate-900 via-industrial-900 to-slate-950 text-white py-4 sm:py-6 md:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl" />
        <div className="container mx-auto px-3 sm:px-4 md:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 mb-0">
            <Link href="/" className="hover:text-white transition-colors font-medium hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <Link href="/products" className="hover:text-white transition-colors font-medium hover:underline">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-white transition-colors font-medium hover:underline"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-slate-50 to-white"
            >
              <ProductGallery
                images={product.images}
                videoUrl={product.video_url}
                productName={product.name}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 md:p-10 lg:p-12 space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full mb-6 shadow-md border-2 border-blue-100 uppercase tracking-wider">
                    {product.category}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-industrial-900 mb-4 sm:mb-5 leading-[1.15]"
                >
                  {product.name}
                </motion.h1>

                {product.sku && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold">SKU: {product.sku}</span>
                  </motion.div>
                )}
              </div>

              {product.short_description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative"
                >
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed pl-4">
                    {product.short_description}
                  </p>
                </motion.div>
              )}

              {product.available_sizes && product.available_sizes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                      <Ruler className="w-4 h-4 text-blue-700" />
                    </div>
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                      Available Sizes
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.available_sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`group relative px-6 py-3.5 rounded-xl border-2 font-bold transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-transparent bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl scale-105'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:shadow-lg hover:scale-105'
                        }`}
                      >
                        <span className="relative z-10">{size}</span>
                        {selectedSize === size && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {product.is_price_visible && product.price && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl" />
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-2 border-blue-100 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-300/20 to-transparent rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Starting from</p>
                      <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">Exclusive of taxes</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-3 pt-2"
              >
                <WhatsAppButton
                  productId={product.id}
                  productName={product.name}
                  sku={product.sku || undefined}
                  variant="primary"
                />

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="group w-full relative flex items-center justify-center gap-3 px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    Request Custom Quote
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  {product.brochure_url && (
                    <button
                      onClick={() => setIsBrochureModalOpen(true)}
                      className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Brochure
                    </button>
                  )}

                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {product.description && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl border-2 border-gray-100 p-8 md:p-12 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-industrial-900">
                      Product Description
                    </h2>
                  </div>
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl border-2 border-gray-100 p-8 md:p-12 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-industrial-900">
                    Technical Specifications
                  </h2>
                </div>
                <div className="overflow-hidden rounded-2xl border-2 border-gray-100">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr
                          key={key}
                          className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="py-5 px-6 text-sm font-bold text-gray-900 w-1/3">
                            {key}
                          </td>
                          <td className="py-5 px-6 text-sm text-gray-600 font-medium">
                            {typeof value === 'object'
                              ? JSON.stringify(value)
                              : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 text-blue-700 text-xs font-bold mb-4 shadow-md uppercase tracking-wider"
              >
                You May Also Like
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 mb-3">
                Related Products
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore similar solutions from our extensive product range
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onBrochureClick={handleBrochureClick}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {(product.brochure_url || selectedBrochure) && (
        <BrochureModal
          isOpen={isBrochureModalOpen}
          onClose={() => {
            setIsBrochureModalOpen(false);
            setSelectedBrochure(null);
          }}
          brochureUrl={selectedBrochure?.url || product.brochure_url || ''}
          productId={selectedBrochure?.productId || product.id}
          productName={selectedBrochure?.productName || product.name}
        />
      )}

      {isQuoteModalOpen && (
        <QuotationForm
          prefilledProductName={product.name}
          isModal={true}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}
    </div>
  );
}
