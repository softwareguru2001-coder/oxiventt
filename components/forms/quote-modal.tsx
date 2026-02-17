'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, Phone, Mail } from 'lucide-react';

interface QuoteModalContextValue {
  openQuoteModal: (productName?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

interface Product {
  id: string;
  name: string;
}

function QuoteModalForm({
  prefilledProduct,
  onClose,
}: {
  prefilledProduct?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [productName, setProductName] = useState(prefilledProduct || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-products`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch {
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: name || null,
            phone,
            email: email || null,
            product_name: productName || null,
            message: message || null,
            source: 'quote_modal',
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Modal header */}
      <div className="bg-slate-900 px-6 py-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Request a Quote</h2>
          {prefilledProduct ? (
            <p className="text-sm text-slate-400 mt-0.5">For: {prefilledProduct}</p>
          ) : (
            <p className="text-sm text-slate-400 mt-0.5">Get a custom quote within 24 hours</p>
          )}
        </div>
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal body */}
      <div className="bg-white px-6 py-6">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Request Submitted!</h3>
            <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="qm-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Name
              </label>
              <input
                id="qm-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="qm-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+91</span>
                <input
                  id="qm-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="XXXXX XXXXX"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-shadow"
                />
              </div>
            </div>

            <div>
              <label htmlFor="qm-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                id="qm-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-shadow"
              />
            </div>

            {!prefilledProduct && (
              <div>
                <label htmlFor="qm-product" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Product
                </label>
                <select
                  id="qm-product"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  onFocus={() => { if (products.length === 0 && !loadingProducts) fetchProducts(); }}
                  disabled={isSubmitting || loadingProducts}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-shadow appearance-none bg-white"
                >
                  <option value="">Select a product (optional)</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="qm-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Message
              </label>
              <textarea
                id="qm-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your requirements..."
                rows={3}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 resize-none transition-shadow"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !phone}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              We typically respond within 24 hours
            </p>
          </form>
        )}
      </div>
    </>
  );
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState<string | undefined>(undefined);

  const openQuoteModal = useCallback((productName?: string) => {
    setPrefilledProduct(productName);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setPrefilledProduct(undefined), 300);
  }, []);

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={closeQuoteModal}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={closeQuoteModal}
              role="dialog"
              aria-modal="true"
              aria-label="Request a Quote"
            >
              <div
                className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <QuoteModalForm
                  prefilledProduct={prefilledProduct}
                  onClose={closeQuoteModal}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </QuoteModalContext.Provider>
  );
}
