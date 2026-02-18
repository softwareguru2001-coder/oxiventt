import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Package, Users, Image as ImageIcon, Layers, ExternalLink, Search } from 'lucide-react';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { AdminBottomNav } from '@/components/admin/admin-bottom-nav';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, iconName: 'LayoutDashboard' },
  { href: '/admin/products', label: 'Products', icon: Package, iconName: 'Package' },
  { href: '/admin/categories', label: 'Categories', icon: Layers, iconName: 'Layers' },
  { href: '/admin/slides', label: 'Hero Slides', icon: ImageIcon, iconName: 'ImageIcon' },
  { href: '/admin/leads', label: 'Leads / CRM', icon: Users, iconName: 'Users' },
  { href: '/admin/seo', label: 'SEO Settings', icon: Search, iconName: 'Search' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="manifest" href="/admin-manifest.json" />
      <meta name="theme-color" content="#111827" />
      <div className="min-h-screen bg-gray-50 flex">
        <aside className="hidden lg:flex flex-col w-60 bg-gray-900 text-white fixed inset-y-0 left-0 z-50">
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
            <div className="relative w-28 h-9 brightness-0 invert">
              <Image src="/oxiventt.png" alt="Oxiventt" fill className="object-contain" />
            </div>
            <span className="text-[0.65rem] font-semibold text-gray-400 uppercase tracking-widest border-l border-white/20 pl-3">
              Admin
            </span>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors group"
              >
                <Icon className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-white transition-colors" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-3 py-4 border-t border-white/10 space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Site
            </Link>
            <SignOutButton />
          </div>
        </aside>

        <div className="lg:pl-60 flex-1 flex flex-col min-h-screen">
          <header className="lg:hidden bg-gray-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
            <div className="relative w-24 h-8 brightness-0 invert">
              <Image src="/oxiventt.png" alt="Oxiventt" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-7 max-w-screen-xl mx-auto w-full pb-20 lg:pb-7">
            {children}
          </main>
        </div>
      </div>

      <AdminBottomNav />
    </>
  );
}
