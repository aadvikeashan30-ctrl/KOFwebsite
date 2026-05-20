'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, X, Trash2, Edit2, Upload, Check } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  sort_order: number;
  published: boolean;
  created_at?: string;
}

const CATEGORIES = ['Factory', 'Products', 'Events', 'Team', 'Infrastructure'];

const defaultForm = {
  title: '',
  category: 'Factory',
  description: '',
  image_url: '',
  sort_order: 0,
  published: true,
};

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setItems(data.items || data.gallery || []);
    } catch {
      showToast('Failed to fetch gallery items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const openAddModal = () => {
    setEditingItem(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      image_url: item.image_url || '',
      sort_order: item.sort_order || 0,
      published: item.published ?? true,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const res = await fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...form }),
        });
        if (res.ok) {
          showToast('Gallery item updated successfully!', 'success');
        } else {
          throw new Error('Failed to update');
        }
      } else {
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          showToast('Gallery item created successfully!', 'success');
        } else {
          throw new Error('Failed to create');
        }
      }
      setShowModal(false);
      setForm(defaultForm);
      setEditingItem(null);
      fetchData();
    } catch {
      showToast(editingItem ? 'Failed to update item' : 'Failed to create item', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Gallery item deleted successfully!', 'success');
        fetchData();
      } else {
        throw new Error('Failed to delete');
      }
    } catch {
      showToast('Failed to delete item', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'gallery');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, image_url: data.url || data.image_url || '' });
        showToast('Image uploaded successfully!', 'success');
      } else {
        throw new Error('Upload failed');
      }
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const categoryColor = (category: string) => {
    switch (category) {
      case 'Factory': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Products': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Events': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Team': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Infrastructure': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl border shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
          toast.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {toast.type === 'success' ? <Check size={18} /> : <X size={18} />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
          <p className="text-gray-400 mt-1">Manage photos and images for the public gallery</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add New Photo
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
          <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No gallery items yet</p>
          <p className="text-gray-500 text-sm mt-1">Click &quot;Add New Photo&quot; to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all group">
              {/* Image Thumbnail */}
              <div className="relative aspect-square bg-gray-800">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-600" />
                  </div>
                )}
                {!item.published && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium">
                    Draft
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm truncate">{item.title}</h3>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm p-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Photo</h3>
              <p className="text-gray-400 text-sm mt-2">Are you sure you want to delete this photo? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Photo' : 'Add New Photo'}
              </h2>
              <button
                onClick={() => { setShowModal(false); setEditingItem(null); }}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="Photo title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                  placeholder="Optional description..."
                />
              </div>

              {/* Image URL & Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image</label>
                <div className="flex gap-2">
                  <input
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Image URL or upload a file"
                  />
                  <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-800 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <Upload size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                {form.image_url && (
                  <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={form.image_url}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-gray-300">Published</label>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, published: !form.published })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-emerald-500' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${form.published ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingItem(null); }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingItem ? 'Update Photo' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
