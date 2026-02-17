import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
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
    <html lang="en" itemScope itemType="https://schema.org/WebPage">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
