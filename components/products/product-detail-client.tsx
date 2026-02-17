'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Share2,
  ChevronRight,
  Package,
  Ruler,
  FileText,
  CheckCircle,
  Phone,
  MessageSquare,
  Star,
  Shield,
  Truck,
  Award,
  Play,
  X,
  ChevronLeft,
  ZoomIn,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BrochureModal } from './brochure-modal';
import { ProductCard } from './product-card';
import { QuotationForm } from '@/components/forms/quotation-form';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { useQuoteModal } from '@/components/forms/quote-modal';

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

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  return null;
}

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}

function ProductMediaGallery({
  images,
  videoUrl,
  productName,
}: {
  images: string[];
  videoUrl?: string;
  productName: string;
}) {
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;
  const videoThumb = videoUrl ? getYouTubeThumbnail(videoUrl) : null;

  const allItems: Array<{ type: 'image' | 'video'; src: string; thumb: string }> = [];
  if (embedUrl && videoThumb) {
    allItems.push({ type: 'video', src: embedUrl, thumb: videoThumb });
  }
  images.forEach((img) => allItems.push({ type: 'image', src: img, thumb: img }));

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = allItems[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + allItems.length) % allItems.length);
  const next = () => setActiveIdx((i) => (i + 1) % allItems.length);

  if (allItems.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-400">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative group">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
          <AnimatePresence mode="wait">
            {current.type === 'video' ? (
              <motion.div
                key={`video-${activeIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <iframe
                  src={current.src}
                  title={`${productName} video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            ) : (
              <motion.div
                key={`img-${activeIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={current.src}
                  alt={`${productName} - image ${activeIdx + 1}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 text-white p-1.5 rounded-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {allItems.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {allItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                activeIdx === idx ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={item.thumb}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && current.type === 'image' && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-3xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt={productName}
              width={900}
              height={700}
              className="object-contain max-h-[85vh] w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const TABS = ['Overview', 'Specifications', 'Video'] as const;
type Tab = (typeof TABS)[number];

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
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const { openQuoteModal } = useQuoteModal();

  const hasVideo = !!product.video_url && !!getYouTubeEmbedUrl(product.video_url);
  const embedUrl = hasVideo ? getYouTubeEmbedUrl(product.video_url!) : null;

  const visibleTabs = TABS.filter((t) => {
    if (t === 'Specifications') return product.specifications && Object.keys(product.specifications).length > 0;
    if (t === 'Video') return hasVideo;
    return true;
  });

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
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const specs = product.specifications || {};
  const specEntries = Object.entries(specs);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: 'Products', url: '/products' },
              { name: product.name, url: `/products/${product.slug}` },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* LEFT: Gallery */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm sticky top-24">
              <ProductMediaGallery
                images={product.images}
                videoUrl={product.video_url}
                productName={product.name}
              />

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                {product.brochure_url && (
                  <button
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-blue-200 rounded-lg text-sm text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Brochure
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 uppercase tracking-wide">
                  {product.category}
                </span>
                {product.sku && (
                  <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded border">
                    SKU: {product.sku}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">5.0 · Verified Product</span>
                <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 font-medium">
                  In Stock
                </span>
              </div>

              {product.short_description && (
                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {product.short_description}
                </p>
              )}
            </div>

            {specEntries.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Key Specifications</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {specEntries.slice(0, 6).map(([key, value], i) => (
                    <div key={key} className={`flex px-6 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <span className="w-44 text-gray-500 font-medium flex-shrink-0">{key}</span>
                      <span className="text-gray-800 font-semibold">{String(value)}</span>
                    </div>
                  ))}
                  {specEntries.length > 6 && (
                    <button
                      onClick={() => setActiveTab('Specifications')}
                      className="w-full px-6 py-3 text-sm text-blue-600 hover:bg-blue-50 font-medium text-left flex items-center gap-1"
                    >
                      View all {specEntries.length} specifications
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {product.available_sizes && product.available_sizes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Available Sizes</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.available_sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              {product.is_price_visible && product.price ? (
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting From</p>
                  <p className="text-3xl font-black text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Exclusive of GST · Price may vary by size</p>
                </div>
              ) : (
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Price on Request</p>
                  <p className="text-xs text-gray-400">Contact us for the best quote tailored to your requirements</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => openQuoteModal(product.name)}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                >
                  <FileText className="w-5 h-5" />
                  Request a Quote
                </button>

                <WhatsAppButton
                  productId={product.id}
                  productName={product.name}
                  sku={product.sku || undefined}
                  variant="primary"
                />

                <a
                  href="tel:+919099199000"
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-6 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-sm rounded-xl transition-colors hover:bg-gray-50"
                >
                  <Phone className="w-4 h-4" />
                  +91 90991 99000
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Why Choose Oxiventt</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, label: 'ISO 27001 Certified', sub: 'Quality assured' },
                  { icon: Award, label: 'Startup India', sub: 'Recognised brand' },
                  { icon: Truck, label: 'Pan India Delivery', sub: 'All major cities' },
                  { icon: CheckCircle, label: 'Since 1999', sub: '25+ years experience' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        {visibleTabs.length > 0 && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 flex overflow-x-auto">
              {visibleTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'Overview' && product.description && (
                <div
                  className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {activeTab === 'Overview' && !product.description && (
                <p className="text-gray-400 text-sm">No description available for this product.</p>
              )}

              {activeTab === 'Specifications' && specEntries.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                      {specEntries.map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="py-3.5 px-5 font-semibold text-gray-700 w-1/3">{key}</td>
                          <td className="py-3.5 px-5 text-gray-600">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Video' && embedUrl && (
                <div className="aspect-video rounded-xl overflow-hidden bg-black max-w-3xl mx-auto">
                  <iframe
                    src={embedUrl}
                    title={`${product.name} - Product Video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
              <Link href="/products" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <ProductCard
                  key={rp.id}
                  product={rp}
                  onBrochureClick={handleBrochureClick}
                />
              ))}
            </div>
          </div>
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
