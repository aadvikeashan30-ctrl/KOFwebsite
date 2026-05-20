'use client';

import { motion } from 'framer-motion';
import { Smartphone, Download, QrCode, ShoppingCart, Bell, Heart, Headphones, MapPin } from 'lucide-react';

const appFeatures = [
  { icon: ShoppingCart, title: 'Easy Ordering', desc: 'Browse and order products in just a few taps' },
  { icon: MapPin, title: 'Product Tracking', desc: 'Track your orders from warehouse to doorstep' },
  { icon: Bell, title: 'Live Notifications', desc: 'Get alerts on deals, order status & new products' },
  { icon: Heart, title: 'Nutritional Info', desc: 'Detailed nutrition facts for all our edible oils' },
  { icon: Headphones, title: 'Customer Support', desc: '24/7 in-app chat support for all your queries' },
];

export default function AppSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Dark forest green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d2a] via-[#0E5A3A] to-[#064e2b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,160,23,0.08),transparent_60%)]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#D4A017]/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl rounded-full px-5 py-2.5 mb-8 border border-white/15">
              <Smartphone size={14} className="text-[#D4A017]" />
              <span className="text-sm font-medium text-[#D4A017]">Mobile App</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 font-[family-name:var(--font-poppins)] leading-tight">
              KOF at Your <span className="text-gradient-gold">Fingertips</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
              Order premium edible oils, track deliveries, and access exclusive deals — all from your smartphone.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-10">
              {appFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors duration-300">
                    <feature.icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                    <p className="text-white/50 text-xs">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#"
                className="relative group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4A017] to-[#b8860b] hover:from-[#e6b422] hover:to-[#D4A017] text-white font-semibold px-6 py-3.5 rounded-2xl transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-[#D4A017]/20"
              >
                <Download size={18} />
                <span>Download for Android</span>
                <span className="absolute -top-2 -right-2 bg-white text-[#0E5A3A] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                  Coming Soon
                </span>
              </a>
              <a
                href="#"
                className="relative group inline-flex items-center gap-2.5 bg-white/8 hover:bg-white/12 backdrop-blur-xl border border-white/15 hover:border-white/30 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <Download size={18} />
                <span>Download for iOS</span>
                <span className="absolute -top-2 -right-2 bg-white text-[#0E5A3A] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                  Coming Soon
                </span>
              </a>
            </div>

            {/* QR Code section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <QrCode size={32} className="text-white/70" />
              </div>
              <div>
                <p className="text-white/80 font-semibold text-sm">Scan to Download</p>
                <p className="text-white/40 text-xs">QR code available when app launches</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow effects behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-[#D4A017]/20 blur-3xl rounded-full scale-110" />

              {/* Phone frame SVG */}
              <div className="relative w-[280px] sm:w-[320px] mx-auto">
                <svg
                  viewBox="0 0 320 640"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-2xl"
                >
                  {/* Phone body */}
                  <rect x="16" y="16" width="288" height="608" rx="44" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
                  {/* Screen bezel */}
                  <rect x="24" y="56" width="272" height="528" rx="8" fill="url(#screenGradient)" />
                  {/* Notch */}
                  <rect x="120" y="24" width="80" height="24" rx="12" fill="#000" />
                  {/* Home indicator */}
                  <rect x="128" y="600" width="64" height="4" rx="2" fill="#555" />

                  {/* Screen content - App mockup */}
                  <rect x="40" y="80" width="240" height="40" rx="8" fill="rgba(255,255,255,0.1)" />
                  <text x="70" y="106" fill="rgba(255,255,255,0.8)" fontSize="14" fontWeight="bold">KOF Store</text>
                  <circle cx="260" cy="100" r="12" fill="rgba(212,160,23,0.3)" />

                  {/* Product cards */}
                  <rect x="40" y="140" width="110" height="130" rx="12" fill="rgba(255,255,255,0.08)" />
                  <rect x="50" y="150" width="90" height="70" rx="8" fill="rgba(14,90,58,0.3)" />
                  <rect x="50" y="230" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
                  <rect x="50" y="244" width="40" height="8" rx="4" fill="rgba(212,160,23,0.5)" />

                  <rect x="170" y="140" width="110" height="130" rx="12" fill="rgba(255,255,255,0.08)" />
                  <rect x="180" y="150" width="90" height="70" rx="8" fill="rgba(14,90,58,0.3)" />
                  <rect x="180" y="230" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
                  <rect x="180" y="244" width="40" height="8" rx="4" fill="rgba(212,160,23,0.5)" />

                  {/* Categories */}
                  <rect x="40" y="290" width="240" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
                  <rect x="40" y="310" width="60" height="24" rx="12" fill="rgba(16,185,129,0.3)" />
                  <rect x="110" y="310" width="60" height="24" rx="12" fill="rgba(255,255,255,0.08)" />
                  <rect x="180" y="310" width="60" height="24" rx="12" fill="rgba(255,255,255,0.08)" />

                  {/* More products */}
                  <rect x="40" y="354" width="110" height="130" rx="12" fill="rgba(255,255,255,0.08)" />
                  <rect x="50" y="364" width="90" height="70" rx="8" fill="rgba(212,160,23,0.15)" />
                  <rect x="50" y="444" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
                  <rect x="50" y="458" width="40" height="8" rx="4" fill="rgba(212,160,23,0.5)" />

                  <rect x="170" y="354" width="110" height="130" rx="12" fill="rgba(255,255,255,0.08)" />
                  <rect x="180" y="364" width="90" height="70" rx="8" fill="rgba(212,160,23,0.15)" />
                  <rect x="180" y="444" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
                  <rect x="180" y="458" width="40" height="8" rx="4" fill="rgba(212,160,23,0.5)" />

                  {/* Bottom nav */}
                  <rect x="24" y="530" width="272" height="54" rx="0" fill="rgba(0,0,0,0.5)" />
                  <circle cx="80" cy="557" r="10" fill="rgba(16,185,129,0.4)" />
                  <circle cx="140" cy="557" r="10" fill="rgba(255,255,255,0.1)" />
                  <circle cx="200" cy="557" r="10" fill="rgba(255,255,255,0.1)" />
                  <circle cx="260" cy="557" r="10" fill="rgba(255,255,255,0.1)" />

                  <defs>
                    <linearGradient id="screenGradient" x1="24" y1="56" x2="296" y2="584" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0a3d2a" />
                      <stop offset="50%" stopColor="#0E5A3A" />
                      <stop offset="100%" stopColor="#064e2b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating badges around phone */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-xl rounded-2xl px-3 py-2 border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-1.5">
                    <ShoppingCart size={12} className="text-[#D4A017]" />
                    <span className="text-white text-xs font-semibold">Quick Order</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/3 -right-8 bg-white/10 backdrop-blur-xl rounded-2xl px-3 py-2 border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-1.5">
                    <Bell size={12} className="text-emerald-400" />
                    <span className="text-white text-xs font-semibold">New Deal!</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-20 -left-6 bg-white/10 backdrop-blur-xl rounded-2xl px-3 py-2 border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-emerald-400" />
                    <span className="text-white text-xs font-semibold">Tracking</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
