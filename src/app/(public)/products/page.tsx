'use client';

import { Check, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';
import Product3D from '@/components/products/Product3D';

export default function ProductsPage() {
  const typeMap: Record<string, 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled'> = {
    'sungold-sunflower': 'sunflower',
    'safal-groundnut': 'groundnut',
    'safal-palmolein': 'palmolein',
    'safal-soyabean': 'soyabean',
    'safal-ricebran': 'ricebran',
    'deoiled-cake': 'deoiled',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">AGMARK Certified Products</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">Our Products</h1>
          <p className="text-xl text-green-100/80 max-w-3xl mx-auto">
            Premium quality edible oils - double filtered, AGMARK certified, 
            packed with modern technology at our Chitradurga unit
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-3">
                {/* Product Image */}
                <div className="relative h-72 bg-gradient-to-br from-gray-50 via-green-50/20 to-amber-50/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Product3D type={typeMap[product.id] || 'sunflower'} className="w-40 h-56 group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.category}
                  </div>
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                    <Star size={10} className="fill-white" /> AGMARK
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="font-black text-xl text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-600 flex-shrink-0" />
                        <span className="text-xs text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sizes */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wider">Available Sizes</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span key={size} className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-semibold border border-gray-200">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Price Range</p>
                      <p className="text-xl font-black text-green-700">{product.price_range}</p>
                    </div>
                    <a
                      href={`https://wa.me/916366975382?text=Hi, I want to enquire about ${product.name}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-green-600/20"
                    >
                      <ShoppingCart size={16} /> Order Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Orders */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Bulk Orders & Distributorship</h2>
          <p className="text-green-100/70 mb-10 text-lg max-w-3xl mx-auto">
            Looking for bulk orders for hotels, restaurants, or retail? Want to become a KOF distributor? 
            Contact us for special pricing and partnership opportunities.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'Hotels & Restaurants', desc: 'Special HoReCa pricing, 50L tin bulk orders', icon: '🏨' },
              { title: 'Retail Stores', desc: 'Become an authorized KOF retailer in your area', icon: '🏪' },
              { title: 'Distributors', desc: 'District-level distribution with exclusive territory', icon: '🚚' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-white mb-1">{item.title}</p>
                <p className="text-sm text-green-200/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <a href="https://wa.me/916366975382?text=Hi, I am interested in bulk orders/distributorship"
             target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:-translate-y-1 text-lg">
            Enquire Now →
          </a>
        </div>
      </section>
    </>
  );
}
