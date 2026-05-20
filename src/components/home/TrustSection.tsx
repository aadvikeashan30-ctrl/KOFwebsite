'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Droplets, Truck, Award, Factory, Leaf, Heart } from 'lucide-react';

const features = [
  { icon: Shield, title: 'AGMARK Certified', desc: 'Government-certified quality on every bottle we produce', gradient: 'from-amber-400 to-orange-500' },
  { icon: Users, title: 'Farmer First', desc: 'Direct procurement from 100+ cooperative societies', gradient: 'from-emerald-400 to-green-600' },
  { icon: Droplets, title: 'Double Filtered', desc: 'Advanced multi-stage refining for purest quality', gradient: 'from-blue-400 to-indigo-500' },
  { icon: Truck, title: '4 District Reach', desc: 'Chitradurga, Davangere, Shimoga & Haveri coverage', gradient: 'from-purple-400 to-violet-500' },
];

const stats = [
  { icon: Award, value: '1984', label: 'Established', desc: 'Four decades of trust' },
  { icon: Factory, value: '6,198', label: 'MT Packed', desc: 'Metric tons processed' },
  { icon: Leaf, value: '100+', label: 'Cooperatives', desc: 'Farmer societies served' },
  { icon: Heart, value: '50km', label: 'Radius', desc: 'Delivery coverage area' },
];

export default function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--kof-warm-gray)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-50 to-transparent rounded-full opacity-60 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-50 to-transparent rounded-full opacity-60 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#0E5A3A]/5 rounded-full px-5 py-2 mb-6 border border-[#0E5A3A]/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0E5A3A]" />
            <span className="text-sm font-semibold text-[#0E5A3A]">Why Choose KOF</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--kof-charcoal)] mb-5 font-[family-name:var(--font-poppins)]">
            Trusted by <span className="text-gradient-forest">Millions</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Four decades of unwavering commitment to quality, farmers, and Karnataka families
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="card-premium p-8 text-center group hover-tilt"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-[var(--kof-charcoal)] text-lg mb-2 font-[family-name:var(--font-poppins)]">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="gradient-forest rounded-3xl p-10 lg:p-14 shadow-2xl shadow-[#0E5A3A]/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={22} className="text-[#D4A017]" />
                </div>
                <p className="text-3xl lg:text-4xl font-black text-white font-[family-name:var(--font-poppins)]">{stat.value}</p>
                <p className="text-sm font-semibold text-white/80 mt-1">{stat.label}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
