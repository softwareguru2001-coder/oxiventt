'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp, Search, X, Plus } from 'lucide-react';

interface SeoFieldsPanelProps {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onMetaKeywordsChange: (value: string[]) => void;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

export function SeoFieldsPanel({
  metaTitle,
  metaDescription,
  metaKeywords,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onMetaKeywordsChange,
  titlePlaceholder = 'Custom meta title (leave blank to auto-generate)',
  descriptionPlaceholder = 'Custom meta description (150–160 characters recommended)',
}: SeoFieldsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');

  const titleLen = metaTitle.length;
  const descLen = metaDescription.length;

  const titleColor =
    titleLen === 0 ? 'text-gray-400' :
    titleLen <= 60 ? 'text-emerald-600' :
    'text-red-500';

  const descColor =
    descLen === 0 ? 'text-gray-400' :
    descLen >= 150 && descLen <= 160 ? 'text-emerald-600' :
    descLen > 160 ? 'text-red-500' :
    'text-amber-500';

  const addKeyword = (raw: string) => {
    const kw = raw.trim().toLowerCase();
    if (kw && !metaKeywords.includes(kw)) {
      onMetaKeywordsChange([...metaKeywords, kw]);
    }
    setKeywordInput('');
  };

  const removeKeyword = (kw: string) => {
    onMetaKeywordsChange(metaKeywords.filter((k) => k !== kw));
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword(keywordInput);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <Search className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-gray-800 text-sm">SEO Settings</span>
          {(metaTitle || metaDescription || metaKeywords.length > 0) && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              Configured
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="p-5 space-y-5 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              These fields override the auto-generated SEO metadata for this page. Leave blank to use the default generated values.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <span className={`text-xs font-mono ${titleColor}`}>
                {titleLen}/60
              </span>
            </div>
            <Input
              type="text"
              value={metaTitle}
              onChange={(e) => onMetaTitleChange(e.target.value)}
              placeholder={titlePlaceholder}
              maxLength={70}
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Keep under 60 characters for best display in search results.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <span className={`text-xs font-mono ${descColor}`}>
                {descLen}/160
              </span>
            </div>
            <Textarea
              value={metaDescription}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              placeholder={descriptionPlaceholder}
              rows={3}
              maxLength={200}
              className="text-sm resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Ideal length is 150–160 characters. Shown in Google search snippets.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meta Tags / Keywords
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {metaKeywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {kw}
                  <button
                    type="button"
                    onClick={() => removeKeyword(kw)}
                    className="hover:text-blue-900 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder="Add keyword and press Enter or comma"
                className="text-sm flex-1"
              />
              <button
                type="button"
                onClick={() => addKeyword(keywordInput)}
                disabled={!keywordInput.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Press Enter or comma to add. These help search engines understand the topic.
            </p>
          </div>

          {(metaTitle || metaDescription) && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Search Preview</p>
              </div>
              <div className="p-3 space-y-0.5">
                <p className="text-blue-600 text-sm font-medium truncate">
                  {metaTitle || 'Page Title'}
                </p>
                <p className="text-green-700 text-xs truncate">
                  https://yoursite.com/page-url
                </p>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                  {metaDescription || 'Meta description will appear here...'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
