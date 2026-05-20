'use client';

import PageHero from '@/components/ui/PageHero';
import { TrendingUp, Target, Globe, Megaphone, BarChart3, Users, Smartphone, Store } from 'lucide-react';

export default function MarketingPage() {
  return (
    <>
      <PageHero icon={TrendingUp} badge="Sales & Distribution" title="Marketing" subtitle="Strategic marketing approach covering digital, retail, and wholesale channels" />

      {/* Marketing Strategy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Our Marketing Strategy</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Multi-channel approach to reach every household in the region</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Store, title: 'Retail Network', desc: '140+ retail outlets across 4 districts with branded shelving and displays', color: 'from-green-500 to-emerald-600' },
              { icon: Smartphone, title: 'Digital Marketing', desc: 'Active presence on Instagram, Facebook with 1 post/video per month', color: 'from-blue-500 to-indigo-600' },
              { icon: Users, title: 'Distributor Model', desc: 'District-wise exclusive distributors with 50km radius territory', color: 'from-amber-500 to-orange-600' },
              { icon: Megaphone, title: 'Promotions', desc: 'Festival offers, bulk discounts, loyalty programs for regular buyers', color: 'from-purple-500 to-violet-600' },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-3xl border border-gray-100 hover:border-green-200 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon size={26} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Channels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">Sales Channels</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                <Store size={32} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retail (B2C)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" /> Kirana stores and supermarkets</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" /> Self-branded KOF outlets</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" /> Sachets (500ml) to tin (15L) range</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" /> WhatsApp direct ordering</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                <BarChart3 size={32} className="text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wholesale (B2B)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" /> Hotels, restaurants, canteens (HoReCa)</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" /> Sweet shops and bakeries</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" /> Bulk tin (50L) orders</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" /> Government supply tenders</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Globe size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Online & Digital</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" /> Price comparison with Flipkart/Amazon</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" /> WhatsApp Business ordering</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" /> Instagram shop & reels marketing</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" /> Google Maps business listing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Distributor */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Become a KOF Distributor</h2>
          <p className="text-green-100/70 mb-10 text-lg">Exclusive territory, competitive margins, and strong brand recognition</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { stat: '20-25%', label: 'Distributor Margin' },
              { stat: '50km', label: 'Exclusive Territory' },
              { stat: '₹2L', label: 'Min Investment' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <p className="text-3xl font-black text-amber-400">{item.stat}</p>
                <p className="text-sm text-green-200/70 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <a href="https://wa.me/916366975382?text=Hi, I am interested in becoming a KOF distributor. Please share details."
             target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-lg">
            <Target size={20} /> Apply for Distributorship
          </a>
        </div>
      </section>
    </>
  );
}
