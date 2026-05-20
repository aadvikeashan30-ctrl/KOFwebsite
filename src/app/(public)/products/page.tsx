'use client';

import { motion } from 'framer-motion';
import { Check, ShoppingCart, Star, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';
import Product3D from '@/components/products/Product3D';
import Link from 'next/link';

export default function ProductsPage() {
  const typeMap: Record<string, 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled'> = {
    'sungold-sunflower': 'sunflower',
    'safal-groundnut': 'groundnut',
    'safal-palmolein': 'palmolein',
    'safal-soyabean': 'soyabean',
    'safal-ricebran': 'ricebran',
    'deoiled-cake': 'deoiled',
  };

  const slugMap: Record<string, string> = {
    'sungold-sunflower': 'sungold-sunflower-oil',
    'safal-groundnut': 'safal-groundnut-oil',
    'safal-palmolein': 'safal-palmolein-oil',
    'safal-soyabean': 'safal-soyabean-oil',
    'safal-ricebran': 'safal-rice-bran-oil',
    'deoiled-cake': 'kof-deoiled-cake',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 bg-[var(--kof-gold)]/8 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl rounded-full px-5 py-2.5 mb-8 border border-white/15">
              <Sparkles size={14} className="text-[var(--kof-gold)]" />
              <span className="text-sm font-semibold text-[var(--kof-gold-light)]">AGMARK Certified Products</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-5 font-[family-name:var(--font-poppins)]">
              Our Products
            </h1>
            <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              Premium edible oils — double filtered, AGMARK certified, packed with modern technology at our Chitradurga unit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 lg:py-28 bg-[var(--kof-warm-gray)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
              >
                <div className="card-premium group h-full hover-tilt">
                  {/* Product Image Area */}
                  <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[var(--kof-cream)] via-white to-emerald-50/30 flex items-center justify-center overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #0E5A3A 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    
                    {/* 3D Product */}
                    <div className="relative z-[2] group-hover:scale-110 transition-transform duration-700 ease-out">
                      <Product3D type={typeMap[product.id] || 'sunflower'} className="w-32 h-48 sm:w-36 sm:h-52" />
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-[1] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 bg-[var(--kof-forest)] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                      {product.category}
                    </div>
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1 gradient-gold text-[var(--kof-charcoal)] text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                      <Star size={9} className="fill-current" /> AGMARK
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-bold text-lg sm:text-xl text-[var(--kof-charcoal)] mb-2 group-hover:text-[var(--kof-forest)] transition-colors font-[family-name:var(--font-poppins)]">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-2">{product.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-1.5">
                          <Check size={13} className="text-[var(--kof-forest)] flex-shrink-0" />
                          <span className="text-[11px] text-gray-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sizes */}
                    <div className="mb-5 pb-5 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-semibold mb-2 uppercase tracking-widest">Available Sizes</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <span key={size} className="text-[11px] bg-[var(--kof-forest)]/5 text-[var(--kof-forest)] px-2.5 py-1 rounded-lg font-semibold border border-[var(--kof-forest)]/10">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Price Range</p>
                        <p className="text-xl font-black text-[var(--kof-forest)] font-[family-name:var(--font-poppins)]">{product.price_range}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${slugMap[product.id] || product.id}`}
                          className="flex items-center gap-1 border-2 border-[var(--kof-forest)]/20 hover:border-[var(--kof-forest)] text-[var(--kof-forest)] text-xs font-bold px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-[var(--kof-forest)]/5"
                        >
                          Details
                        </Link>
                        <a
                          href={`https://wa.me/916366975382?text=Hi, I want to order ${product.name}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-[var(--kof-forest)] hover:bg-[var(--kof-forest-light)] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-[var(--kof-forest)]/20 hover:shadow-[var(--kof-forest)]/40 hover:-translate-y-0.5"
                        >
                          <ShoppingCart size={14} /> Order
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Orders */}
      <section className="py-20 lg:py-28 gradient-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--kof-gold)]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-5 font-[family-name:var(--font-poppins)]">
              Bulk Orders & <span className="text-gradient-gold">Distributorship</span>
            </h2>
            <p className="text-white/50 mb-12 text-lg max-w-3xl mx-auto leading-relaxed">
              Hotels, restaurants, retail stores — special pricing and exclusive territory partnerships available
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { title: 'Hotels & Restaurants', desc: 'Special HoReCa pricing, 50L tin bulk orders', icon: '🏨' },
              { title: 'Retail Stores', desc: 'Become an authorized KOF retailer in your area', icon: '🏪' },
              { title: 'Distributors', desc: 'District-level distribution with exclusive territory', icon: '🚚' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-premium rounded-2xl p-6 hover:bg-white/8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-white mb-1 font-[family-name:var(--font-poppins)]">{item.title}</p>
                <p className="text-sm text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="https://wa.me/916366975382?text=Hi, I am interested in bulk orders/distributorship"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-gold text-lg"
          >
            Enquire Now <ArrowRight size={18} />
          </motion.a>
        </div>
      </section>
    </>
  );
}
