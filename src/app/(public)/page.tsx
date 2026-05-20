'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import ManufacturingSection from '@/components/home/ManufacturingSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';
import AppSection from '@/components/home/AppSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';
import ProductImage from '@/components/products/ProductImage';
import { ChevronRight, Star, MapPin, Phone, Heart, Leaf } from 'lucide-react';

interface PriceData {
  product_id: string;
  product_name: string;
  retail_price: number;
  bulk_price: number;
  tin_price: number;
}

export default function HomePage() {
  const [prices, setPrices] = useState<PriceData[]>([]);

  useEffect(() => {
    fetch('/api/public/pricing')
      .then(r => r.json())
      .then(data => setPrices(data.prices || []))
      .catch(() => {});
  }, []);

  const getLivePrice = (productId: string): string => {
    const priceData = prices.find(p => p.product_id === productId);
    if (priceData) return `₹${priceData.retail_price}/L`;
    return '';
  };

  const typeMap: Record<string, 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled'> = {
    'sungold-sunflower': 'sunflower', 'safal-groundnut': 'groundnut', 'safal-palmolein': 'palmolein',
    'safal-soyabean': 'soyabean', 'safal-ricebran': 'ricebran', 'deoiled-cake': 'deoiled',
  };

  return (
    <>
      <HeroSection />

      {/* Brand Marquee */}
      <div className="py-5 bg-[var(--kof-forest-deep)] border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee gap-16 items-center">
          {['SUNGOLD', 'SAFAL', 'AGMARK CERTIFIED', 'DOUBLE FILTERED', 'FARM FRESH', 'SINCE 1984', 'SUNGOLD', 'SAFAL', 'AGMARK CERTIFIED', 'DOUBLE FILTERED'].map((text, i) => (
            <span key={i} className="text-white/20 font-black text-xl whitespace-nowrap uppercase tracking-[0.2em] font-[family-name:var(--font-poppins)]">
              {text} <span className="text-[#D4A017]/40 mx-6">✦</span>
            </span>
          ))}
        </div>
      </div>

      <TrustSection />

      {/* Products Section */}
      <section className="py-24 lg:py-32 bg-[var(--kof-cream)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#0E5A3A]/5 rounded-full px-5 py-2 mb-6 border border-[#0E5A3A]/10">
              <span className="text-sm font-semibold text-[#0E5A3A]">Premium Products</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--kof-charcoal)] mb-5 font-[family-name:var(--font-poppins)]">
              Our Oil <span className="text-gradient-forest">Collection</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Every drop is pure, certified, and crafted with four decades of expertise
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
              >
                <div className="card-premium group h-full">
                  <div className="relative h-56 bg-gradient-to-br from-gray-50 to-emerald-50/30 flex items-center justify-center overflow-hidden">
                    <ProductImage type={typeMap[product.id] || 'sunflower'} className="w-32 h-44 group-hover:scale-115 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-[#0E5A3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{product.category}</div>
                    <div className="absolute top-3 right-3 bg-[#D4A017] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star size={8} className="fill-white" /> AGMARK
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[var(--kof-charcoal)] text-lg mb-1.5 group-hover:text-[#0E5A3A] transition-colors font-[family-name:var(--font-poppins)]">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-lg font-black text-[#0E5A3A]">{getLivePrice(product.id) || 'Contact Us'}</span>
                      <a href={`https://wa.me/916366975382?text=Hi, I want to order ${product.name}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-[#0E5A3A] hover:bg-[#14805A] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-lg shadow-[#0E5A3A]/20">
                        Order <ChevronRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ManufacturingSection />

      {/* Testimonials */}
      <section className="py-24 bg-[var(--kof-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--kof-charcoal)] mb-4 font-[family-name:var(--font-poppins)]">
              Voices of <span className="text-gradient-gold">Trust</span>
            </h2>
            <p className="text-gray-500 text-lg">What our partners and customers say</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Ramesh Kumar', role: 'Hotel Owner, Chitradurga', text: 'Sungold oil quality is unmatched. Our customers love the taste, and the bulk pricing is very competitive.', stars: 5 },
              { name: 'Lakshmi Devi', role: 'Homemaker, Davangere', text: 'Safal Groundnut Oil brings back the traditional cooking aroma. My family refuses to use any other brand now.', stars: 5 },
              { name: 'Suresh Gowda', role: 'Farmer, Haveri', text: 'KOF gives the best MSP for our sunflower seeds. Timely payments and transparent weighing. Very satisfied.', stars: 5 },
            ].map((t, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="card-premium p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#D4A017] fill-[#D4A017]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E5A3A] to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--kof-charcoal)] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-5 py-2 mb-6 border border-blue-100">
                <MapPin size={14} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Distribution Network</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[var(--kof-charcoal)] mb-6 font-[family-name:var(--font-poppins)]">
                Available in <span className="text-gradient-forest">Your Area</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-lg">
                Our distribution network covers 4 major districts with 140+ retail outlets. Contact us for nearest store or home delivery.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Chitradurga (50+)', 'Davangere (35+)', 'Shimoga (25+)', 'Haveri (30+)'].map((d) => (
                  <div key={d} className="card-premium p-4 text-center">
                    <p className="font-semibold text-[var(--kof-charcoal)] text-sm">{d.split(' (')[0]}</p>
                    <p className="text-xs text-gray-400">{d.match(/\((.+)\)/)?.[1]} outlets</p>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/916366975382?text=Hi, I want to find the nearest KOF store"
                target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <MapPin size={16} /> Find Nearest Store
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="card-premium p-8 bg-gradient-to-br from-emerald-50 to-green-50">
                <svg viewBox="0 0 400 350" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M120 50 L280 30 L350 100 L380 200 L340 300 L250 340 L150 320 L60 250 L40 150 Z" fill="#dcfce7" stroke="#0E5A3A" strokeWidth="2" />
                  <circle cx="200" cy="180" r="60" fill="#0E5A3A" opacity="0.08" stroke="#0E5A3A" strokeWidth="1" strokeDasharray="4" />
                  <circle cx="200" cy="180" r="40" fill="#0E5A3A" opacity="0.12" />
                  <circle cx="200" cy="180" r="8" fill="#dc2626" />
                  <text x="200" y="200" textAnchor="middle" fontSize="10" fill="#1a1a1a" fontWeight="bold">Chitradurga</text>
                  <circle cx="160" cy="140" r="6" fill="#D4A017" />
                  <text x="160" y="130" textAnchor="middle" fontSize="9" fill="#1a1a1a">Davangere</text>
                  <circle cx="130" cy="190" r="6" fill="#D4A017" />
                  <text x="130" y="210" textAnchor="middle" fontSize="9" fill="#1a1a1a">Shimoga</text>
                  <circle cx="240" cy="220" r="6" fill="#D4A017" />
                  <text x="240" y="240" textAnchor="middle" fontSize="9" fill="#1a1a1a">Haveri</text>
                  <text x="280" y="155" fontSize="11" fill="#0E5A3A" fontWeight="bold">50km radius</text>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation/CSR */}
      <section className="py-24 bg-[var(--kof-cream)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="card-premium overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-12">
                <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6 border border-emerald-100">
                  <Heart size={14} className="text-[#0E5A3A]" />
                  <span className="text-sm font-semibold text-[#0E5A3A]">Farmer Welfare</span>
                </div>
                <h2 className="text-3xl font-black text-[var(--kof-charcoal)] mb-4 font-[family-name:var(--font-poppins)]">Support Our Farmers</h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Your contribution helps fund oilseed research, farmer training, and cooperative strengthening at the village level.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Improved seed variety research', 'Farmer training programs', 'Village cooperative strengthening', 'Farmer welfare initiatives'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <Leaf size={14} className="text-[#0E5A3A] flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/916366975382?text=Hi, I want to contribute to KOF farmer welfare"
                  target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                  <Heart size={16} /> Contribute
                </a>
              </div>
              <div className="gradient-forest p-10 lg:p-12 flex flex-col justify-center text-white">
                <div className="space-y-8">
                  {[
                    { val: '₹2.5Cr+', label: 'Distributed to cooperatives' },
                    { val: '500+', label: 'Farmers trained annually' },
                    { val: '100+', label: 'Village cooperatives supported' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl font-black font-[family-name:var(--font-poppins)]">{s.val}</p>
                      <p className="text-white/60 text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />

      <FAQSection />
      <AppSection />
    </>
  );
}
