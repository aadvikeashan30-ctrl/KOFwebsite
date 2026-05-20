'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';
import { Camera, X, Filter } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  sort_order?: number;
  published?: number;
  created_at?: string;
}

const categories = ['All', 'Factory', 'Products', 'Events', 'Team', 'Infrastructure'];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery(activeCategory);
  }, [activeCategory]);

  const fetchGallery = async (category: string) => {
    setLoading(true);
    try {
      const url =
        category === 'All'
          ? '/api/public/gallery'
          : `/api/public/gallery?category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      const data = await res.json();
      setGalleryItems(data.gallery || []);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        icon={Camera}
        badge="Photo Gallery"
        title="Gallery"
        subtitle="A visual journey through our facilities, products, and community events"
      />

      <section className="py-20 bg-[var(--kof-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Filters */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={16} className="text-green-700" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Filter by Category
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-green-700 text-white shadow-lg shadow-green-700/25 scale-105'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Photo Count */}
            {!loading && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-sm text-gray-500 font-medium"
              >
                {galleryItems.length} photo{galleryItems.length !== 1 ? 's' : ''}
              </motion.p>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-2xl overflow-hidden bg-white border border-gray-100 animate-pulse"
                >
                  <div
                    className="bg-gray-200"
                    style={{ height: `${200 + (i % 3) * 80}px` }}
                  />
                  <div className="p-3">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Masonry Grid */}
          {!loading && galleryItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden card-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23e5e7eb"><rect width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-size="14">Image unavailable</text></svg>';
                      }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-white font-bold text-sm leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && galleryItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Camera size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-400">
                No gallery items available for this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Zoom Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
            >
              <X size={20} />
            </button>

            {/* Full Image */}
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedItem.image_url}
                alt={selectedItem.title}
                className="w-full h-auto object-cover rounded-t-3xl max-h-[60vh]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%23e5e7eb"><rect width="800" height="600"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-size="18">Image unavailable</text></svg>';
                }}
              />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                {selectedItem.title}
              </h2>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {selectedItem.category}
              </span>
              {selectedItem.description && (
                <p className="text-gray-600 leading-relaxed">
                  {selectedItem.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
