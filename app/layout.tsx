import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PwaRegister } from '@/components/pwa-register';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Oxiventt - High Quality Ventilation Solutions',
    template: '%s | Oxiventt',
  },
  description: 'Leading manufacturer of high-quality industrial fans, exhaust fans, and ventilation solutions. Customizable products with various sizes and specifications.',
  keywords: ['industrial fans', 'exhaust fans', 'ventilation', 'axial fans', 'centrifugal fans', 'air circulation', 'Oxiventt'],
  authors: [{ name: 'Oxiventt' }],
  creator: 'Oxiventt',
  publisher: 'Oxiventt',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Oxiventt - High Quality Ventilation Solutions',
    description: 'Leading manufacturer of high-quality industrial fans, exhaust fans, and ventilation solutions.',
    siteName: 'Oxiventt',
    images: [
      {
        url: `${baseUrl}/oxiventt.png`,
        width: 1200,
        height: 630,
        alt: 'Oxiventt - Industrial Fans & Ventilation Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxiventt - High Quality Ventilation Solutions',
    description: 'Leading manufacturer of high-quality industrial fans, exhaust fans, and ventilation solutions.',
    images: [`${baseUrl}/oxiventt.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
  },
  icons: {
    icon: '/oxiventt.png',
    apple: '/oxiventt.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/WebPage" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Oxiventt" />
        <link rel="apple-touch-icon" href="/oxiventt.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <PwaRegister />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
