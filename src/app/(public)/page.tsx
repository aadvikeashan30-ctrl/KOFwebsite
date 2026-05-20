import Link from 'next/link';
import { ArrowRight, Shield, Droplets, Users, TrendingUp, Award, Truck, Leaf, Heart, Star } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] gradient-hero overflow-hidden flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Award size={16} className="text-amber-400" />
              <span className="text-sm font-medium">AGMARK Certified | Est. 1984</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Pure Oil,
              <span className="block text-amber-400">Pure Trust</span>
            </h1>

            <p className="text-xl text-green-100 mb-8 max-w-lg leading-relaxed">
              Karnataka Co-operative Oilseeds Growers&apos; Federation empowering farmers 
              and delivering premium quality edible oils to families across Karnataka.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-secondary flex items-center gap-2 text-lg">
                Our Products <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold text-amber-400">40+</p>
                <p className="text-sm text-green-200">Years Legacy</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">4</p>
                <p className="text-sm text-green-200">Districts Covered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">6000+</p>
                <p className="text-sm text-green-200">MT Packed</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-amber-400/20 to-green-400/20 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-amber-400/30 to-green-400/30 flex items-center justify-center">
                  <div className="text-center">
                    <Droplets size={80} className="text-amber-400 mx-auto mb-4" />
                    <p className="text-white text-2xl font-bold">Sungold</p>
                    <p className="text-green-200">Premium Oils</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-10 -left-10 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
                <p className="text-amber-400 font-bold text-sm">100% Pure</p>
              </div>
              <div className="absolute bottom-10 -right-10 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
                <p className="text-amber-400 font-bold text-sm">Farm Fresh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose KOF?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by millions of families across Karnataka for pure, quality edible oils
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'AGMARK Certified', desc: 'Government certified quality assurance for every product', color: 'bg-green-100 text-green-700' },
              { icon: Users, title: 'Farmer Oriented', desc: 'Direct procurement from cooperative societies supporting farmers', color: 'bg-amber-100 text-amber-700' },
              { icon: Droplets, title: 'Double Filtered', desc: 'Advanced refining process for purest oil quality', color: 'bg-blue-100 text-blue-700' },
              { icon: Truck, title: '4 District Delivery', desc: 'Coverage across Chitradurga, Davangere, Shimoga & Haveri', color: 'bg-purple-100 text-purple-700' },
            ].map((feature, idx) => (
              <div key={idx} className="card p-8 text-center group hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h2>
              <p className="text-gray-600">Premium edible oils for every cooking need</p>
            </div>
            <Link href="/products" className="btn-primary flex items-center gap-2">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="card group">
                <div className="h-48 bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
                  <Droplets size={60} className="text-green-600/30 group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((f) => (
                      <span key={f} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-bold">{product.price_range}</span>
                    <span className="text-xs text-gray-500">
                      {product.sizes.join(' | ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6">
                <Leaf size={16} className="text-green-700" />
                <span className="text-sm font-medium text-green-700">Our Legacy</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Farmers<br />
                <span className="text-gradient">Since 1984</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Karnataka Co-operative Oilseeds Growers&apos; Federation was established to restructure 
                edible oil and oilseeds production and marketing in Karnataka, following the successful 
                Anand Model of Milk Co-operatives.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Today, KOF operates across multiple districts with a modern packing unit in Chitradurga, 
                processing over 6000 metric tons of various oils including groundnut, sunflower, palmolein, 
                soyabean, and rice bran oils.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Heart className="text-red-500" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">Farmer First</p>
                    <p className="text-sm text-gray-500">Direct procurement</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="text-amber-500" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">Quality Assured</p>
                    <p className="text-sm text-gray-500">AGMARK standard</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">Growing Strong</p>
                    <p className="text-sm text-gray-500">40+ years trusted</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">Co-operative</p>
                    <p className="text-sm text-gray-500">Farmer owned</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-green-700">22+</p>
                    <p className="text-sm text-gray-600 mt-1">Employees</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-amber-700">6</p>
                    <p className="text-sm text-gray-600 mt-1">Products</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-blue-700">4</p>
                    <p className="text-sm text-gray-600 mt-1">Districts</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-purple-700">50km</p>
                    <p className="text-sm text-gray-600 mt-1">Radius</p>
                  </div>
                </div>
                <div className="mt-6 bg-gradient-to-r from-green-700 to-emerald-600 rounded-xl p-6 text-white text-center">
                  <p className="font-bold text-lg">Serving Karnataka</p>
                  <p className="text-green-100 text-sm mt-1">Chitradurga | Davangere | Shimoga | Haveri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Contact us for bulk orders, distributorship inquiries, or product information
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/916366975382" target="_blank" rel="noopener noreferrer" 
               className="btn-secondary flex items-center gap-2">
              <MessageCircleIcon /> WhatsApp Us
            </a>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all">
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MessageCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  );
}
