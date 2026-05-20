'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Droplets, Users, TrendingUp, Award, Truck, Leaf, Heart, Star, MapPin, Phone, Sparkles, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';
import ProductImage from '@/components/products/ProductImage';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Premium */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 gradient-hero" />
        <ParticleBackground />
        
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/5 animate-spin" style={{animationDuration:'60s'}} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full border border-amber-400/10 animate-spin" style={{animationDuration:'45s', animationDirection:'reverse'}} />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-amber-400/5 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-white/20 shadow-lg">
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">AGMARK Certified | Est. 1984</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight">
              <span className="block text-white/90">Pure Oil,</span>
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">Pure Trust.</span>
            </h1>

            <p className="text-xl text-green-100/80 mb-10 max-w-lg leading-relaxed font-light">
              Karnataka&apos;s most trusted cooperative federation delivering premium 
              AGMARK-certified edible oils from farm to your family since 40+ years.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-1 flex items-center gap-2 text-lg">
                Explore Products <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="relative overflow-hidden bg-white/5 hover:bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                Our Story
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mt-14 pt-8 border-t border-white/10">
              {[
                { value: 40, suffix: '+', label: 'Years' },
                { value: 6198, suffix: '+', label: 'MT Packed' },
                { value: 4, suffix: '', label: 'Districts' },
                { value: 22, suffix: '+', label: 'Team' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl lg:text-3xl font-black text-amber-400">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-green-200/60 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Product Display */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square">
              {/* Glowing ring */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-amber-400/20 via-transparent to-green-400/10 animate-pulse" style={{animationDuration:'3s'}} />
              
              {/* Main product */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <ProductImage type="sunflower" className="w-64 h-80" />
              </div>

              {/* Floating badges */}
              <div className="absolute top-10 left-0 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-xl animate-bounce" style={{animationDuration:'3s'}}>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-amber-400" />
                  <span className="text-white font-bold text-sm">100% Pure</span>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-0 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-xl animate-bounce" style={{animationDuration:'4s', animationDelay:'1s'}}>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-amber-400" />
                  <span className="text-white font-bold text-sm">AGMARK Quality</span>
                </div>
              </div>

              <div className="absolute top-1/2 right-5 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-xl animate-bounce" style={{animationDuration:'3.5s', animationDelay:'0.5s'}}>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-red-400" />
                  <span className="text-white font-bold text-sm">Farm Fresh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-amber-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>


      {/* Brands Marquee */}
      <section className="py-6 bg-gradient-to-r from-green-900 via-green-800 to-green-900 border-y border-green-700/50 overflow-hidden">
        <div className="flex animate-marquee gap-16 items-center">
          {['SUNGOLD', 'SAFAL', 'AGMARK CERTIFIED', 'DOUBLE FILTERED', 'FARM FRESH', 'COOPERATIVE', 'SUNGOLD', 'SAFAL', 'AGMARK CERTIFIED', 'DOUBLE FILTERED'].map((text, i) => (
            <span key={i} className="text-green-200/40 font-black text-2xl whitespace-nowrap uppercase tracking-widest">
              {text} <span className="text-amber-400/60 mx-4">★</span>
            </span>
          ))}
        </div>
      </section>

      {/* Products Showcase - Premium Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 mb-4">
              <Droplets size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">Premium Products</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4">Our Oil Collection</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From sunflower fields to your kitchen - every drop is pure, certified, and crafted with care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => {
              const typeMap: Record<string, 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled'> = {
                'sungold-sunflower': 'sunflower',
                'safal-groundnut': 'groundnut',
                'safal-palmolein': 'palmolein',
                'safal-soyabean': 'soyabean',
                'safal-ricebran': 'ricebran',
                'deoiled-cake': 'deoiled',
              };
              return (
                <div key={product.id} className="group relative bg-white rounded-3xl shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-3">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-green-50/30 flex items-center justify-center overflow-hidden">
                    <ProductImage type={typeMap[product.id] || 'sunflower'} className="w-36 h-52 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {product.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                      ★ AGMARK
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                    {/* Features pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.features.map((f) => (
                        <span key={f} className="text-[11px] bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-2.5 py-1 rounded-full font-semibold border border-green-100">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Sizes */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                      <span className="text-xs text-gray-400 font-medium">SIZES:</span>
                      {product.sizes.map((s) => (
                        <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">{s}</span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">Price Range</p>
                        <p className="text-lg font-black text-green-700">{product.price_range}</p>
                      </div>
                      <a
                        href={`https://wa.me/916366975382?text=Hi, I want to order ${product.name}`}
                        target="_blank" rel="noopener noreferrer"
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-green-600/20 hover:shadow-green-500/30 flex items-center gap-1.5"
                      >
                        Order <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center gap-2 btn-primary text-lg px-10 py-4">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>


      {/* Why Choose Us - Glass Cards */}
      <section className="py-24 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">Why Millions Trust KOF</h2>
            <p className="text-lg text-green-200/70 max-w-2xl mx-auto">
              Four decades of unwavering commitment to quality, farmers, and families
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'AGMARK Certified', desc: 'Government-certified quality assurance on every bottle we produce', color: 'from-amber-400 to-orange-500' },
              { icon: Users, title: 'Farmer First', desc: 'Direct procurement from 100+ cooperative societies at fair prices', color: 'from-green-400 to-emerald-500' },
              { icon: Droplets, title: 'Double Filtered', desc: 'Advanced multi-stage refining for the purest, healthiest oil', color: 'from-blue-400 to-cyan-500' },
              { icon: Truck, title: '4 District Delivery', desc: 'Wide network across Chitradurga, Davangere, Shimoga & Haveri', color: 'from-purple-400 to-violet-500' },
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-green-200/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor Locator Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
                <MapPin size={16} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Find Nearest Distributor</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Available Within<br />
                <span className="text-gradient">50km Radius</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our distribution network covers 4 major districts in Karnataka. Find KOF products 
                at your nearest store, or contact us for direct delivery to your doorstep.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { district: 'Chitradurga', outlets: '50+' },
                  { district: 'Davangere', outlets: '35+' },
                  { district: 'Shimoga', outlets: '25+' },
                  { district: 'Haveri', outlets: '30+' },
                ].map((d) => (
                  <div key={d.district} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-bold text-gray-900">{d.district}</p>
                    <p className="text-sm text-gray-500">{d.outlets} retail outlets</p>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/916366975382?text=Hi, I want to find the nearest KOF distributor in my area" 
                 target="_blank" rel="noopener noreferrer"
                 className="btn-primary inline-flex items-center gap-2">
                <MapPin size={18} /> Find My Nearest Store
              </a>
            </div>

            {/* Map illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-100 shadow-xl">
                <svg viewBox="0 0 400 350" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Karnataka outline simplified */}
                  <path d="M120 50 L280 30 L350 100 L380 200 L340 300 L250 340 L150 320 L60 250 L40 150 Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                  {/* District markers */}
                  <circle cx="200" cy="180" r="60" fill="#16a34a" opacity="0.1" stroke="#16a34a" strokeWidth="1" strokeDasharray="4" />
                  <circle cx="200" cy="180" r="40" fill="#16a34a" opacity="0.15" />
                  {/* Chitradurga */}
                  <circle cx="200" cy="180" r="8" fill="#dc2626" />
                  <text x="200" y="200" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">Chitradurga</text>
                  {/* Davangere */}
                  <circle cx="160" cy="140" r="6" fill="#f59e0b" />
                  <text x="160" y="130" textAnchor="middle" fontSize="9" fill="#374151">Davangere</text>
                  {/* Shimoga */}
                  <circle cx="130" cy="190" r="6" fill="#f59e0b" />
                  <text x="130" y="210" textAnchor="middle" fontSize="9" fill="#374151">Shimoga</text>
                  {/* Haveri */}
                  <circle cx="240" cy="220" r="6" fill="#f59e0b" />
                  <text x="240" y="240" textAnchor="middle" fontSize="9" fill="#374151">Haveri</text>
                  {/* Radius text */}
                  <text x="270" y="160" fontSize="11" fill="#16a34a" fontWeight="bold">50km radius</text>
                  <path d="M200 180 L260 155" stroke="#16a34a" strokeWidth="1" strokeDasharray="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Rate/Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Today&apos;s Rates</h2>
            <p className="text-gray-500">Commercial & Retail pricing - Updated regularly</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Sunflower Oil', retail: '₹155/L', bulk: '₹145/L', tin: '₹7,250/tin' },
              { name: 'Groundnut Oil', retail: '₹190/L', bulk: '₹180/L', tin: '₹9,000/tin' },
              { name: 'Palmolein Oil', retail: '₹110/L', bulk: '₹100/L', tin: '₹5,000/tin' },
              { name: 'Soyabean Oil', retail: '₹140/L', bulk: '₹130/L', tin: '₹6,500/tin' },
              { name: 'Rice Bran Oil', retail: '₹165/L', bulk: '₹155/L', tin: '₹7,750/tin' },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-200 transition-all">
                <h4 className="font-bold text-gray-900 text-sm mb-3">{item.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Retail</span>
                    <span className="font-bold text-green-700">{item.retail}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bulk</span>
                    <span className="font-bold text-blue-700">{item.bulk}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                    <span className="text-gray-500">15L Tin</span>
                    <span className="font-bold text-amber-700">{item.tin}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">* Rates are indicative and may vary. Contact us for latest pricing.</p>
        </div>
      </section>

      {/* Donation / CSR Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-12">
                <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6">
                  <Heart size={16} className="text-green-700" />
                  <span className="text-sm font-semibold text-green-700">Support Farmers</span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Donation & Contribution</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Your contribution helps support oilseed farmers, fund research at our AATC center 
                  in Haveri, and strengthen cooperative societies at the village level.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Fund improved seed variety research',
                    'Support farmer training programs',
                    'Strengthen village-level cooperatives',
                    'Sponsor farmer welfare initiatives',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Leaf size={12} className="text-green-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/916366975382?text=Hi, I want to contribute/donate to KOF farmer welfare programs"
                   target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                  <Heart size={18} /> Contribute Now
                </a>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-10 lg:p-12 flex flex-col justify-center text-white">
                <div className="space-y-8">
                  <div>
                    <p className="text-4xl font-black">₹2.5Cr+</p>
                    <p className="text-green-200 text-sm mt-1">Distributed to farmer cooperatives</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black">500+</p>
                    <p className="text-green-200 text-sm mt-1">Farmers trained annually</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black">100+</p>
                    <p className="text-green-200 text-sm mt-1">Village cooperatives supported</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">What People Say</h2>
            <p className="text-gray-500">Trusted by thousands of families and businesses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Ramesh Kumar', role: 'Hotel Owner, Chitradurga', text: 'We have been using Sungold Sunflower Oil for our restaurant for 5 years. The oil quality is consistent and customers love the taste of food cooked in it.', stars: 5 },
              { name: 'Lakshmi Devi', role: 'Homemaker, Davangere', text: 'Safal Groundnut Oil reminds me of traditional cooking. The aroma is amazing and it is much healthier than other brands. My family loves it!', stars: 5 },
              { name: 'Suresh Gowda', role: 'Farmer, Haveri', text: 'KOF gives us the best price for our sunflower seeds. The cooperative model ensures we get fair rates and timely payments. Very happy!', stars: 5 },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({length: testimonial.stars}).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-green-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Order?</h2>
          <p className="text-green-100/80 mb-10 text-lg">
            Bulk orders, retail, or distributorship - we&apos;re just a WhatsApp message away
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/916366975382" target="_blank" rel="noopener noreferrer"
               className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-amber-500/25 hover:-translate-y-1 flex items-center gap-2 text-lg">
              <Phone size={20} /> WhatsApp Us
            </a>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border-2 border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-1">
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
