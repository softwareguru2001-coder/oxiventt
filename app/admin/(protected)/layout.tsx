import Link from 'next/link';
import { LogOut, LayoutDashboard, Package, Users, Image } from 'lucide-react';
import { SignOutButton } from '@/components/auth/sign-out-button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-slate-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold hover:text-slate-200 transition-colors">
                Admin Panel
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm hover:text-slate-200 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-2 text-sm hover:text-slate-200 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Products
                </Link>
                <Link
                  href="/admin/slides"
                  className="flex items-center gap-2 text-sm hover:text-slate-200 transition-colors"
                >
                  <Image className="w-4 h-4" />
                  Hero Slides
                </Link>
                <Link
                  href="/admin/leads"
                  className="flex items-center gap-2 text-sm hover:text-slate-200 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Leads
                </Link>
              </nav>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
