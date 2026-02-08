import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const allItems = [
    { name: 'Home', url: baseUrl },
    ...items.map(item => ({
      ...item,
      url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  ];

  const schema = generateBreadcrumbSchema({ items: allItems });

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
