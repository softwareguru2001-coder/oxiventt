'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LayoutDashboard, Package, Layers, Image as ImageIcon, Users, Search } from 'lucide-react';
import { SignOutButton } from '@/components/auth/sign-out-button';

interface NavLink {
  href: string;
  label: string;
  iconName: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Package,
  Layers,
  ImageIcon,
  Users,
  Search,
};

export function AdminMobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-64 bg-gray-900 text-white flex flex-col h-full ml-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-sm font-semibold text-gray-300">Menu</span>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-3 space-y-0.5">
              {navLinks.map(({ href, label, iconName }) => {
                const Icon = iconMap[iconName];
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-white/10">
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
