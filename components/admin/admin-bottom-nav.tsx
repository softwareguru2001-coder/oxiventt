'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Users, Layers, Search, MoreHorizontal,
  Image as ImageIcon, X
} from 'lucide-react';
import { useState } from 'react';
import { SignOutButton } from '@/components/auth/sign-out-button';

const primaryTabs = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/more', label: 'More', icon: MoreHorizontal, isMore: true },
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

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-gray-900 border-t border-white/10 safe-area-bottom">
        <div className="flex items-stretch h-16">
          {primaryTabs.map(({ href, label, icon: Icon, exact, isMore }) => {
            const active = isMore ? false : isActive(href, exact);
            return (
              <button
                key={href}
                onClick={() => {
                  if (isMore) {
                    setShowMore(true);
                  }
                }}
                className="flex-1"
              >
                {isMore ? (
                  <span className={`flex flex-col items-center justify-center gap-1 h-full w-full transition-colors text-gray-500 hover:text-white`}>
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">{label}</span>
                  </span>
                ) : (
                  <Link
                    href={href}
                    className={`flex flex-col items-center justify-center gap-1 h-full w-full transition-colors ${
                      active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <div className={`relative flex items-center justify-center w-8 h-7 rounded-xl transition-all ${active ? 'bg-white/15' : ''}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-medium transition-colors ${active ? 'text-white' : ''}`}>{label}</span>
                  </Link>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {showMore && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMore(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-gray-900 rounded-t-2xl border-t border-white/10 pb-safe">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-sm font-semibold text-gray-300">More</span>
              <button onClick={() => setShowMore(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
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
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-white/10 mt-2">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
