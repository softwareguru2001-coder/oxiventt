'use client';

import { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';

interface WhatsAppButtonProps {
  productId?: string;
  productName: string;
  sku?: string;
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

export function WhatsAppButton({
  productId,
  productName,
  sku,
  variant = 'primary',
  className = '',
}: WhatsAppButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);

    try {
      if (productId) {
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-lead`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              product_id: productId,
              product_name: productName,
              source: 'whatsapp',
            }),
          }
        );
      }
    } catch (error) {
      console.error('Failed to log WhatsApp lead:', error);
    }

    const skuText = sku ? ` (SKU: ${sku})` : '';
    const message = `Hi, I am interested in ${productName}${skuText}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  const variants = {
    primary: 'w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
    compact: 'flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const iconSizes = {
    primary: 'w-6 h-6',
    secondary: 'w-5 h-5',
    compact: 'w-4 h-4',
  };

  const buttonText = {
    primary: isSubmitting ? 'Processing...' : 'Inquire on WhatsApp',
    secondary: isSubmitting ? 'Processing...' : 'WhatsApp',
    compact: isSubmitting ? 'Wait...' : 'Chat',
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className={`${variants[variant]} ${className}`}
      aria-label={`Contact via WhatsApp about ${productName}`}
    >
      {isSubmitting ? (
        <Loader2 className={`${iconSizes[variant]} animate-spin`} />
      ) : (
        <MessageCircle className={iconSizes[variant]} />
      )}
      {buttonText[variant]}
    </button>
  );
}
