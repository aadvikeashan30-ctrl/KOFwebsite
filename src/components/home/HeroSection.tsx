'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Droplets, Sparkles } from 'lucide-react';
import ProductImage from '@/components/products/ProductImage';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0 gradient-hero" />
      <ParticleBackground />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#14805A]/10 animate-morph" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#D4A017]/8 animate-morph" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-emerald-400/5 blur-3xl animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left - Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl rounded-full px-5 py-2.5 mb-8 border border-white/15"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
            <span className="text-sm font-medium text-[#D4A017]">AGMARK Certified | Since 1984</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] mb-8 tracking-tight font-[family-name:var(--font-poppins)]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="block text-white/95"
            >
              Pure Oil,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="block text-gradient-gold"
            >
              Pure Trust.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-light"
          >
            Karnataka&apos;s most trusted cooperative delivering premium
            AGMARK-certified edible oils from farm to family for 40+ years.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products" className="group btn-gold flex items-center gap-2 text-base">
              Explore Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/15 hover:border-white/30 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-500 hover:-translate-y-1">
              Our Legacy
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-4 gap-3 sm:gap-6 mt-14 pt-8 border-t border-white/10"
          >
            {[
              { value: 40, suffix: '+', label: 'Years' },
              { value: 6198, suffix: '+', label: 'MT Packed' },
              { value: 4, suffix: '', label: 'Districts' },
              { value: 140, suffix: '+', label: 'Outlets' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#D4A017] font-[family-name:var(--font-poppins)]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-1 font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-full aspect-square max-w-lg">
            {/* Glow ring */}
            <div className="absolute inset-8 rounded-full animate-glow opacity-50" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-[#D4A017]/15 via-transparent to-[#14805A]/10 animate-morph" />

            {/* Main product */}
            <div className="absolute inset-0 flex items-center justify-center animate-float">
              <ProductImage type="sunflower" className="w-56 h-72 drop-shadow-2xl" />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-0 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#D4A017]" />
                <span className="text-white font-bold text-sm">100% Pure</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 right-0 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#D4A017]" />
                <span className="text-white font-bold text-sm">AGMARK</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 right-2 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-emerald-400" />
                <span className="text-white font-bold text-sm">Double Filtered</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-2.5 bg-[#D4A017] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
