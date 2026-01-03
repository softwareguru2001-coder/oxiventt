'use client';

import { useState, useMemo } from 'react';
import { Download, Filter, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Lead {
  id: string;
  type: string;
  name: string | null;
  company: string | null;
  mobile: string;
  email: string | null;
  city: string | null;
  message: string | null;
  created_at: string;
  product_id: string | null;
  products?: { name: string } | null;
}

interface LeadsDashboardProps {
  leads: Lead[];
  products: Array<{ id: string; name: string }>;
}

export function LeadsDashboard({ leads, products }: LeadsDashboardProps) {
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    setDeletingLeadId(leadId);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      toast.success('Lead deleted successfully');
      router.refresh();
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
    } finally {
      setDeletingLeadId(null);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesType = typeFilter === 'all' || lead.type === typeFilter;
      const matchesProduct =
        productFilter === 'all' || lead.product_id === productFilter;
      const matchesSearch =
        searchTerm === '' ||
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.mobile.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesProduct && matchesSearch;
    });
  }, [leads, typeFilter, productFilter, searchTerm]);

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Type',
      'Name',
      'Company',
      'Mobile',
      'Email',
      'City',
      'Product',
      'Message',
    ];

    const rows = filteredLeads.map((lead) => [
      new Date(lead.created_at).toLocaleDateString(),
      lead.type,
      lead.name || '',
      lead.company || '',
      lead.mobile,
      lead.email || '',
      lead.city || '',
      lead.products?.name || '',
      (lead.message || '').replace(/"/g, '""'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `leads-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setProductFilter('all');
    setSearchTerm('');
  };

  const hasActiveFilters =
    typeFilter !== 'all' || productFilter !== 'all' || searchTerm !== '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leads</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name, mobile, email, company..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="brochure">Brochure</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="quote">Quote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Product</label>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-white">
          <p className="text-gray-600">
            {hasActiveFilters ? 'No leads match your filters' : 'No leads yet'}
          </p>
        </div>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">Date</th>
                  <th className="text-left p-4 font-semibold text-sm">Type</th>
                  <th className="text-left p-4 font-semibold text-sm">Name</th>
                  <th className="text-left p-4 font-semibold text-sm">Company</th>
                  <th className="text-left p-4 font-semibold text-sm">Mobile</th>
                  <th className="text-left p-4 font-semibold text-sm">Email</th>
                  <th className="text-left p-4 font-semibold text-sm">City</th>
                  <th className="text-left p-4 font-semibold text-sm">Product</th>
                  <th className="text-left p-4 font-semibold text-sm">Message</th>
                  <th className="text-left p-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          lead.type === 'brochure'
                            ? 'bg-blue-100 text-blue-700'
                            : lead.type === 'whatsapp'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {lead.type}
                      </span>
                    </td>
                    <td className="p-4">{lead.name || '-'}</td>
                    <td className="p-4">{lead.company || '-'}</td>
                    <td className="p-4 font-mono text-sm">{lead.mobile}</td>
                    <td className="p-4 text-sm">{lead.email || '-'}</td>
                    <td className="p-4">{lead.city || '-'}</td>
                    <td className="p-4 text-sm">
                      {lead.products?.name || '-'}
                    </td>
                    <td className="p-4 text-sm max-w-xs truncate">
                      {lead.message || '-'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        disabled={deletingLeadId === lead.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
