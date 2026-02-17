'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Download, X, Trash2,
  Phone, Mail, Building2, MapPin, MessageSquare, Calendar, FileText,
  CheckCircle2, Clock, AlertCircle, XCircle, Zap, Search,
  SlidersHorizontal, Edit3
} from 'lucide-react';
import { toast } from 'sonner';
import { format, isToday, isBefore, parseISO } from 'date-fns';

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
  status?: string;
  notes?: string | null;
  next_call_date?: string | null;
  assigned_to?: string | null;
  products?: { name: string } | null;
}

interface LeadsDashboardProps {
  leads: Lead[];
  products: Array<{ id: string; name: string }>;
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-cyan-100 text-cyan-700 border-cyan-200', dot: 'bg-cyan-500' },
  { value: 'pending', label: 'Pending', color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  { value: 'sale_done', label: 'Sale Done', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
];

const TYPE_COLORS: Record<string, string> = {
  quote: 'bg-blue-50 text-blue-600 border-blue-100',
  brochure: 'bg-gray-100 text-gray-600 border-gray-200',
  whatsapp: 'bg-green-50 text-green-600 border-green-100',
};

function getStatusConfig(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

function LeadDetailDrawer({
  lead,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Lead>) => void;
}) {
  const [notes, setNotes] = useState(lead.notes || '');
  const [nextCallDate, setNextCallDate] = useState(lead.next_call_date || '');
  const [status, setStatus] = useState(lead.status || 'new');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes, next_call_date: nextCallDate || null, status }),
      });
      if (!res.ok) throw new Error('Failed to save');
      onUpdate(lead.id, { notes, next_call_date: nextCallDate || null, status });
      toast.success('Lead updated');
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-gray-900">Lead Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 flex-1">
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-gray-900 text-base">{lead.name || 'Unknown'}</p>
                {lead.company && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    {lead.company}
                  </p>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium border ${TYPE_COLORS[lead.type] || 'bg-gray-100 text-gray-600'}`}>
                {lead.type}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-gray-200">
              <a href={`tel:${lead.mobile}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {lead.mobile}
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors truncate">
                  <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  {lead.email}
                </a>
              )}
              {lead.city && (
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {lead.city}
                </p>
              )}
            </div>
          </div>

          {lead.products?.name && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-blue-700">Enquiry about</p>
                <p className="text-sm text-blue-900 font-medium">{lead.products.name}</p>
              </div>
            </div>
          )}

          {lead.message && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message</p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">{lead.message}</p>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Pipeline Status</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
                    status === opt.value
                      ? `${opt.color} shadow-sm`
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${status === opt.value ? opt.dot : 'bg-gray-300'}`} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              <Calendar className="w-3.5 h-3.5 inline mr-1" />
              Next Call Date
            </label>
            <input
              type="date"
              value={nextCallDate}
              onChange={(e) => setNextCallDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
              Internal Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes, follow-up details, requirements..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="text-xs text-gray-400 pt-1">
            Received: {format(new Date(lead.created_at), 'MMM d, yyyy · h:mm a')}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function LeadsDashboard({ leads: initialLeads, products }: LeadsDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleLeadUpdate = useCallback((id: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    setSelectedLead((prev) => (prev?.id === id ? { ...prev, ...updates } : prev));
  }, []);

  const handleDelete = async (leadId: string) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    setDeletingLeadId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
      toast.success('Lead deleted');
    } catch {
      toast.error('Failed to delete lead');
    } finally {
      setDeletingLeadId(null);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      handleLeadUpdate(leadId, { status: newStatus });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (typeFilter !== 'all' && lead.type !== typeFilter) return false;
      if (statusFilter !== 'all' && (lead.status || 'new') !== statusFilter) return false;
      if (productFilter !== 'all' && lead.product_id !== productFilter) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (
          !lead.name?.toLowerCase().includes(q) &&
          !lead.mobile.includes(q) &&
          !lead.email?.toLowerCase().includes(q) &&
          !lead.company?.toLowerCase().includes(q) &&
          !lead.city?.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [leads, typeFilter, statusFilter, productFilter, searchTerm]);

  const hasActiveFilters = typeFilter !== 'all' || statusFilter !== 'all' || productFilter !== 'all' || searchTerm !== '';

  const pipelineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => { const s = l.status || 'new'; counts[s] = (counts[s] || 0) + 1; });
    return counts;
  }, [leads]);

  const overdueCount = useMemo(() =>
    leads.filter((l) => l.next_call_date && isBefore(parseISO(l.next_call_date), new Date()) && l.status !== 'sale_done' && l.status !== 'lost').length,
    [leads]
  );
  const todayCount = useMemo(() =>
    leads.filter((l) => l.next_call_date && isToday(parseISO(l.next_call_date))).length,
    [leads]
  );

  const exportToCSV = () => {
    const headers = ['Date', 'Status', 'Type', 'Name', 'Company', 'Mobile', 'Email', 'City', 'Product', 'Message', 'Next Call', 'Notes'];
    const rows = filteredLeads.map((l) => [
      format(new Date(l.created_at), 'MMM d, yyyy'),
      l.status || 'new', l.type, l.name || '', l.company || '',
      l.mobile, l.email || '', l.city || '', l.products?.name || '',
      (l.message || '').replace(/"/g, '""'), l.next_call_date || '',
      (l.notes || '').replace(/"/g, '""'),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads & CRM</h1>
          <p className="text-sm text-gray-500 mt-0.5">{leads.length} total leads</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(statusFilter === opt.value ? 'all' : opt.value)}
            className={`rounded-xl p-3 text-left border transition-all ${
              statusFilter === opt.value ? `${opt.color} shadow-sm` : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <p className="text-xl font-black leading-none mb-1">{pipelineCounts[opt.value] || 0}</p>
            <p className="text-[0.65rem] font-semibold leading-tight">{opt.label}</p>
          </button>
        ))}
      </div>

      {(overdueCount > 0 || todayCount > 0) && (
        <div className="flex flex-wrap gap-3">
          {overdueCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
              <AlertCircle className="w-4 h-4" />
              {overdueCount} overdue follow-up{overdueCount > 1 ? 's' : ''}
            </div>
          )}
          {todayCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 font-medium">
              <Clock className="w-4 h-4" />
              {todayCount} follow-up{todayCount > 1 ? 's' : ''} today
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex-1 min-w-48 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, mobile, email..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
              showFilters || hasActiveFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
          </button>
          {hasActiveFilters && (
            <button
              onClick={() => { setTypeFilter('all'); setStatusFilter('all'); setProductFilter('all'); setSearchTerm(''); }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <span className="text-sm text-gray-400 ml-auto">{filteredLeads.length} of {leads.length}</span>
        </div>

        {showFilters && (
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="quote">Quote</option>
              <option value="brochure">Brochure</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Products</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        )}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 text-center py-16">
          <p className="text-gray-400 text-sm">{hasActiveFilters ? 'No leads match your filters.' : 'No leads yet.'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Date', 'Lead', 'Contact', 'Product', 'Status', 'Next Call', 'Notes', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => {
                  const statusCfg = getStatusConfig(lead.status || 'new');
                  const isOverdue = lead.next_call_date && isBefore(parseISO(lead.next_call_date), new Date()) && lead.status !== 'sale_done' && lead.status !== 'lost';
                  const isCallToday = lead.next_call_date && isToday(parseISO(lead.next_call_date));
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {format(new Date(lead.created_at), 'MMM d')}
                        <br />
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[0.6rem] font-medium border mt-1 ${TYPE_COLORS[lead.type] || 'bg-gray-100 text-gray-600'}`}>
                          {lead.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 min-w-[120px]">
                        <p className="font-semibold text-gray-900">{lead.name || 'Unknown'}</p>
                        {lead.company && <p className="text-xs text-gray-400">{lead.company}</p>}
                        {lead.city && <p className="text-xs text-gray-400">{lead.city}</p>}
                      </td>
                      <td className="px-4 py-3 min-w-[130px]">
                        <a href={`tel:${lead.mobile}`} className="text-gray-700 hover:text-blue-600 font-mono text-xs block">{lead.mobile}</a>
                        {lead.email && <a href={`mailto:${lead.email}`} className="text-gray-400 hover:text-blue-600 text-xs block truncate max-w-[130px]">{lead.email}</a>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{lead.products?.name || '-'}</td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusCfg.color}`}
                        >
                          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {lead.next_call_date ? (
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${isOverdue ? 'bg-red-100 text-red-700' : isCallToday ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                            {format(parseISO(lead.next_call_date), 'MMM d')}
                          </span>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3 max-w-[140px]">
                        {lead.notes ? <p className="text-xs text-gray-500 truncate">{lead.notes}</p> : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setSelectedLead(lead)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            disabled={deletingLeadId === lead.id}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleLeadUpdate}
        />
      )}
    </div>
  );
}
