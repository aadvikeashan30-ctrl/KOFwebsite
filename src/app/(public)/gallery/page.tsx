'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { Camera, X, Droplets, Factory, Sprout, Truck, Users, Award } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Sungold Sunflower Oil Packing', category: 'Products', icon: Droplets, color: 'from-amber-400 to-yellow-500', desc: 'Our flagship AGMARK certified sunflower oil in various pack sizes' },
  { id: 2, title: 'Modern Oil Packing Unit', category: 'Factory', icon: Factory, color: 'from-blue-500 to-indigo-600', desc: 'State-of-the-art automated packing machines at Chitradurga unit' },
  { id: 3, title: 'Sunflower Seed Procurement', category: 'Procurement', icon: Sprout, color: 'from-green-500 to-emerald-600', desc: 'Direct procurement from farmer cooperatives at APMC yards' },
  { id: 4, title: 'Safal Groundnut Oil Range', category: 'Products', icon: Droplets, color: 'from-orange-500 to-red-600', desc: 'Premium cold-pressed groundnut oil with traditional taste' },
  { id: 5, title: 'Distribution Fleet', category: 'Distribution', icon: Truck, color: 'from-purple-500 to-violet-600', desc: 'Our delivery fleet covering 4 districts within 50km radius' },
  { id: 6, title: 'Quality Testing Lab', category: 'Factory', icon: Award, color: 'from-teal-500 to-cyan-600', desc: 'In-house quality laboratory ensuring AGMARK standards' },
  { id: 7, title: 'Farmer Training Program', category: 'Activities', icon: Users, color: 'from-lime-500 to-green-600', desc: 'Regular training sessions at AATC Haveri for oilseed farmers' },
  { id: 8, title: 'Oil Extraction Plant', category: 'Factory', icon: Factory, color: 'from-gray-600 to-gray-800', desc: 'Solvent extraction plant processing sunflower and groundnut seeds' },
  { id: 9, title: 'Board Meeting 2026', category: 'Management', icon: Users, color: 'from-green-700 to-emerald-800', desc: 'Annual board meeting discussing procurement strategies and growth' },
  { id: 10, title: 'Retail Store Display', category: 'Marketing', icon: Award, color: 'from-pink-500 to-rose-600', desc: 'KOF branded shelving at partner retail stores' },
  { id: 11, title: 'Safal Rice Bran Oil', category: 'Products', icon: Droplets, color: 'from-violet-500 to-purple-600', desc: 'Heart-healthy rice bran oil rich in Oryzanol' },
  { id: 12, title: 'De-oiled Cake Storage', category: 'Factory', icon: Factory, color: 'from-amber-700 to-orange-800', desc: 'High-protein DOC storage for cattle feed distribution' },
];

const categories = ['All', 'Products', 'Factory', 'Procurement', 'Distribution', 'Activities', 'Marketing', 'Management'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(i => i.category === filter);
  const selectedItem = galleryItems.find(i => i.id === selected);

  return (
    <>
      <PageHero icon={Camera} badge="Photo Gallery" title="Gallery" subtitle="A visual journey through our facilities, products, and farmer programs" />

      <section className="py-20 bg-[var(--kof-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat ? 'bg-green-700 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id} onClick={() => setSelected(item.id)}
                className="group cursor-pointer relative aspect-square rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                  <item.icon size={40} className="mb-3 group-hover:scale-125 transition-transform duration-300" />
                  <h3 className="font-bold text-sm leading-tight">{item.title}</h3>
                  <p className="text-xs text-white/70 mt-1">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
            <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${selectedItem.color} flex items-center justify-center mb-6`}>
              <selectedItem.icon size={80} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">{selectedItem.title}</h2>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{selectedItem.category}</span>
            <p className="text-gray-600 mt-3 leading-relaxed">{selectedItem.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}
