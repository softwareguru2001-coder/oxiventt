'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Users, Layers, Search, MoreHorizontal,
  Image as ImageIcon, X, ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { SignOutButton } from '@/components/auth/sign-out-button';

const primaryTabs = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/seo', label: 'SEO', icon: Search },
];

const moreItems = [
  { href: '/admin/categories', label: 'Categories', icon: Layers },
  { href: '/admin/slides', label: 'Hero Slides', icon: ImageIcon },
];

export function AdminBottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const isMoreActive = moreItems.some(item => isActive(item.href));

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-gray-900 border-t border-white/10 safe-area-bottom">
        <div className="flex items-stretch h-16">
          {primaryTabs.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-white' : 'text-gray-500 active:text-gray-300'
                }`}
              >
                <div className={`relative flex items-center justify-center w-8 h-7 rounded-xl transition-all ${active ? 'bg-white/15' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setShowMore(true)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              isMoreActive ? 'text-white' : 'text-gray-500 active:text-gray-300'
            }`}
          >
            <div className={`relative flex items-center justify-center w-8 h-7 rounded-xl transition-all ${isMoreActive ? 'bg-white/15' : ''}`}>
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {showMore && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMore(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-gray-900 rounded-t-2xl border-t border-white/10 pb-safe animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mt-3 mb-1" />
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-sm font-semibold text-gray-300">More</span>
              <button
                onClick={() => setShowMore(false)}
                className="p-2 -mr-2 rounded-lg active:bg-white/10 text-gray-400"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              {moreItems.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setShowMore(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-gray-300 active:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/"
                target="_blank"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-300 active:bg-white/10"
              >
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
                View Site
              </Link>
              <div className="pt-3 border-t border-white/10 mt-2">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
