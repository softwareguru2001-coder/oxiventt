'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface SlideFormData {
  title: string;
  subtitle: string;
  image_url: string;
  gradient: string;
  display_order: number;
  is_active: boolean;
}

interface SlideFormProps {
  slideId?: string;
}

const gradientOptions = [
  { value: 'from-industrial-900/90 via-industrial-800/80 to-transparent', label: 'Industrial Dark' },
  { value: 'from-blue-900/90 via-blue-800/80 to-transparent', label: 'Blue Dark' },
  { value: 'from-slate-900/90 via-slate-800/80 to-transparent', label: 'Slate Dark' },
  { value: 'from-gray-900/90 via-gray-800/80 to-transparent', label: 'Gray Dark' },
  { value: 'from-cyan-900/90 via-cyan-800/80 to-transparent', label: 'Cyan Dark' },
  { value: 'from-teal-900/90 via-teal-800/80 to-transparent', label: 'Teal Dark' },
];

export function SlideForm({ slideId }: SlideFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SlideFormData>({
    title: '',
    subtitle: '',
    image_url: '',
    gradient: 'from-industrial-900/90 via-industrial-800/80 to-transparent',
    display_order: 1,
    is_active: true,
  });

  useEffect(() => {
    if (slideId) {
      fetchSlide();
    }
  }, [slideId]);

  const fetchSlide = async () => {
    try {
      const response = await fetch(`/api/admin/slides/${slideId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch slide:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = slideId ? `/api/admin/slides/${slideId}` : '/api/admin/slides';
      const method = slideId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/slides');
      } else {
        alert('Failed to save slide');
      }
    } catch (error) {
      console.error('Failed to save slide:', error);
      alert('Failed to save slide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/slides">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Slides
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {slideId ? 'Edit Slide' : 'Create New Slide'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://images.pexels.com/..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Use high-quality images (recommended: 1920x1080px)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gradient Overlay
            </label>
            <select
              value={formData.gradient}
              onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {gradientOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              min="1"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (visible on homepage)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="gap-2">
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Slide'}
            </Button>
            <Link href="/admin/slides">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
