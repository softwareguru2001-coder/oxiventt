'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, Globe, FileText, Settings2, CheckCircle2,
  ExternalLink, ChevronRight, AlertCircle, Save, RefreshCw
} from 'lucide-react';

interface SeoItem {
  id: string;
  name: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
}

interface SeoSettingsClientProps {
  initialSettings: Record<string, string>;
  products: SeoItem[];
  categories: SeoItem[];
}

function SeoScoreBadge({ title, description, keywords }: { title: string | null; description: string | null; keywords: string[] | null }) {
  const hasTitle = !!title && title.length > 0 && title.length <= 60;
  const hasDesc = !!description && description.length >= 150 && description.length <= 160;
  const hasKw = !!keywords && keywords.length > 0;
  const score = [hasTitle, hasDesc, hasKw].filter(Boolean).length;

  const colors = ['bg-red-100 text-red-600', 'bg-amber-100 text-amber-600', 'bg-blue-100 text-blue-600', 'bg-emerald-100 text-emerald-700'];
  const labels = ['Not set', 'Partial', 'Good', 'Optimized'];

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colors[score]}`}>
      {score === 3 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {labels[score]}
    </span>
  );
}

export function SeoSettingsClient({ initialSettings, products, categories }: SeoSettingsClientProps) {
  const [activeTab, setActiveTab] = useState<'site' | 'products' | 'categories'>('site');
  const [settings, setSettings] = useState({
    robots_disallow: initialSettings.robots_disallow || '/admin/,/api/',
    sitemap_include_categories: initialSettings.sitemap_include_categories || 'true',
    default_meta_title_suffix: initialSettings.default_meta_title_suffix || ' | Oxiventt',
    site_name: initialSettings.site_name || 'Oxiventt',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      const response = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ settings }),
      });
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'site' as const, label: 'Site-wide SEO', icon: Globe },
    { id: 'products' as const, label: `Products (${products.length})`, icon: Search },
    { id: 'categories' as const, label: `Categories (${categories.length})`, icon: FileText },
  ];

  const optimizedProducts = products.filter(p => p.meta_title && p.meta_description && p.meta_keywords?.length);
  const optimizedCategories = categories.filter(c => c.meta_title && c.meta_description && c.meta_keywords?.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage metadata, sitemap, and robots.txt for all pages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Sitemap.xml
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Robots.txt
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{optimizedProducts.length}/{products.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Products optimized</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{optimizedCategories.length}/{categories.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Categories optimized</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{products.length + categories.length + 3}</p>
          <p className="text-sm text-gray-500 mt-0.5">Total pages in sitemap</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'site' && (
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    placeholder="e.g., Oxiventt"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Default Meta Title Suffix
                  </label>
                  <input
                    type="text"
                    value={settings.default_meta_title_suffix}
                    onChange={(e) => setSettings({ ...settings, default_meta_title_suffix: e.target.value })}
                    placeholder="e.g.,  | Oxiventt"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Appended to auto-generated titles when no custom title is set.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Robots.txt — Disallow Paths
                  </label>
                  <input
                    type="text"
                    value={settings.robots_disallow}
                    onChange={(e) => setSettings({ ...settings, robots_disallow: e.target.value })}
                    placeholder="/admin/,/api/"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Comma-separated paths to block from search engines. Changes apply on next robots.txt request.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Sitemap — Include Categories
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="include-categories"
                      type="checkbox"
                      checked={settings.sitemap_include_categories === 'true'}
                      onChange={(e) => setSettings({ ...settings, sitemap_include_categories: e.target.checked ? 'true' : 'false' })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="include-categories" className="text-sm text-gray-600">
                      Include category pages in sitemap.xml
                    </label>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">robots.txt preview</span>
                </div>
                <pre className="p-4 text-xs text-gray-600 font-mono leading-relaxed bg-white overflow-x-auto whitespace-pre-wrap">
{`User-agent: *
Allow: /
${settings.robots_disallow.split(',').filter(Boolean).map(p => `Disallow: ${p.trim()}`).join('\n')}

Sitemap: [your-site-url]/sitemap.xml`}
                </pre>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-1">
              {products.length === 0 ? (
                <p className="text-sm text-gray-500 py-8 text-center">No products found.</p>
              ) : (
                products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}`}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-400 truncate">/products/{product.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <SeoScoreBadge
                        title={product.meta_title}
                        description={product.meta_description}
                        keywords={product.meta_keywords}
                      />
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-1">
              {categories.length === 0 ? (
                <p className="text-sm text-gray-500 py-8 text-center">No categories found.</p>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/admin/categories/${category.id}`}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
                        <p className="text-xs text-gray-400 truncate">/products?category={category.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <SeoScoreBadge
                        title={category.meta_title}
                        description={category.meta_description}
                        keywords={category.meta_keywords}
                      />
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
