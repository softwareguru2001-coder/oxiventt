import Link from 'next/link';
import { Package, Users, Layers, Image as ImageIcon, TrendingUp, Clock, CheckCircle, PhoneCall } from 'lucide-react';
import { supabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = supabaseServerClient();

  const [
    { count: totalProducts },
    { count: totalLeads },
    { count: newLeads },
    { count: saleDoneLeads },
    { count: pendingLeads },
    { data: recentLeads },
    { count: totalCategories },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'sale_done'),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('leads').select('id, name, mobile, type, status, created_at, company').order('created_at', { ascending: false }).limit(6),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: 'Total Leads', value: totalLeads ?? 0, icon: Users, href: '/admin/leads', color: 'bg-blue-50 text-blue-700', iconBg: 'bg-blue-100' },
    { label: 'New Leads', value: newLeads ?? 0, icon: TrendingUp, href: '/admin/leads', color: 'bg-amber-50 text-amber-700', iconBg: 'bg-amber-100' },
    { label: 'Pending Follow-up', value: pendingLeads ?? 0, icon: Clock, href: '/admin/leads', color: 'bg-orange-50 text-orange-700', iconBg: 'bg-orange-100' },
    { label: 'Sales Done', value: saleDoneLeads ?? 0, icon: CheckCircle, href: '/admin/leads', color: 'bg-green-50 text-green-700', iconBg: 'bg-green-100' },
    { label: 'Total Products', value: totalProducts ?? 0, icon: Package, href: '/admin/products', color: 'bg-gray-50 text-gray-700', iconBg: 'bg-gray-100' },
    { label: 'Categories', value: totalCategories ?? 0, icon: Layers, href: '/admin/categories', color: 'bg-gray-50 text-gray-700', iconBg: 'bg-gray-100' },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    qualified: 'bg-cyan-100 text-cyan-700',
    pending: 'bg-orange-100 text-orange-700',
    sale_done: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
  };

  const typeColors: Record<string, string> = {
    quote: 'bg-blue-50 text-blue-600',
    brochure: 'bg-gray-100 text-gray-600',
    whatsapp: 'bg-green-50 text-green-600',
  };

  const quickLinks = [
    { href: '/admin/products/new', label: 'Add Product', icon: Package },
    { href: '/admin/categories/new', label: 'Add Category', icon: Layers },
    { href: '/admin/slides/new', label: 'Add Slide', icon: ImageIcon },
    { href: '/admin/leads', label: 'View All Leads', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(({ label, value, icon: Icon, href, color, iconBg }) => (
          <Link
            key={label}
            href={href}
            className={`${color} rounded-xl p-4 hover:shadow-md transition-shadow border border-current/10`}
          >
            <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center mb-3`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black leading-none mb-1">{value}</p>
            <p className="text-xs font-medium opacity-75">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-blue-600 hover:underline font-medium">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {(recentLeads ?? []).length === 0 && (
              <p className="text-sm text-gray-400 px-5 py-6 text-center">No leads yet.</p>
            )}
            {(recentLeads ?? []).map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{lead.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">{lead.mobile} {lead.company ? `· ${lead.company}` : ''}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[lead.type] || 'bg-gray-100 text-gray-600'}`}>
                    {lead.type}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                    {(lead.status || 'new').replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100 hover:border-blue-100"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Pipeline</p>
            <div className="space-y-2.5">
              {[
                { label: 'New', count: newLeads ?? 0, color: 'bg-blue-400' },
                { label: 'Pending', count: pendingLeads ?? 0, color: 'bg-orange-400' },
                { label: 'Sale Done', count: saleDoneLeads ?? 0, color: 'bg-green-400' },
              ].map(({ label, count, color }) => {
                const total = totalLeads || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-300">{label}</span>
                      <span className="font-bold text-white">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
