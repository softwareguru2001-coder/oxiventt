'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Upload, X, ImageIcon, Link as LinkIcon } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string>('');
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

  useEffect(() => {
    if (formData.image_url) {
      setImagePreview(formData.image_url);
    }
  }, [formData.image_url]);

  const fetchSlide = async () => {
    try {
      const response = await fetch(`/api/admin/slides/${slideId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        if (data.image_url) setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Failed to fetch slide:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('bucket', 'slide-images');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/upload-file`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: fd,
        }
      );

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image_url: data.url }));
      setImagePreview(data.url);
    } catch {
      alert('Image upload failed. Please try again or use a URL.');
      setImagePreview(formData.image_url);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setImagePreview('');
    setFormData((prev) => ({ ...prev, image_url: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
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
        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to save slide';
        alert(`Failed to save slide: ${errorMessage}`);
      }
    } catch {
      alert('Failed to save slide. Please check the console for details.');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setUploadMode('upload')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  uploadMode === 'upload'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  uploadMode === 'url'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Use URL
              </button>
            </div>

            {uploadMode === 'upload' ? (
              <div>
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-blue-400 hover:bg-blue-50/30 transition-colors disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP — recommended 1920×1080px</p>
                    </div>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <div className="relative w-full h-48">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {uploading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="text-white text-sm font-medium flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Uploading...
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-200">
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {uploading ? 'Uploading...' : formData.image_url ? 'Uploaded successfully' : 'Processing...'}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="text-xs text-blue-600 hover:underline font-medium disabled:opacity-50"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={clearImage}
                          disabled={uploading}
                          className="text-xs text-red-500 hover:underline font-medium disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

            ) : (
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://images.pexels.com/..."
                  required={uploadMode === 'url'}
                />
                <p className="text-xs text-gray-400">Use high-quality images (recommended: 1920×1080px)</p>
                {imagePreview && (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <div className="relative w-full h-40">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImagePreview('')}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Overlay</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
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
            <Button type="submit" disabled={loading || uploading} className="gap-2">
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
