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
        url: `${baseUrl}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Oxiventt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxiventt - High Quality Ventilation Solutions',
    description: 'Leading manufacturer of high-quality industrial fans, exhaust fans, and ventilation solutions.',
    images: [`${baseUrl}/og-default.jpg`],
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
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔧</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
