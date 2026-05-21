'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Droplets, Sparkles } from 'lucide-react';
import Product3D from '@/components/products/Product3D';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useTranslation } from '@/components/providers/LocaleProvider';

const PRODUCTS_3D: Array<{ type: 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran'; name: string; color: string }> = [
  { type: 'sunflower', name: 'Sungold', color: '#f59e0b' },
  { type: 'groundnut', name: 'Safal Groundnut', color: '#c2410c' },
  { type: 'palmolein', name: 'Safal Palmolein', color: '#059669' },
  { type: 'soyabean', name: 'Safal Soyabean', color: '#65a30d' },
  { type: 'ricebran', name: 'Safal Rice Bran', color: '#7c3aed' },
];

export default function Hero3DSection() {
  const [activeProduct, setActiveProduct] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 20 });

  // Auto-rotate products every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % PRODUCTS_3D.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center perspective-1000">
      {/* Animated gradient background with depth */}
      <div className="absolute inset-0 gradient-hero" />

      {/* 3D layered orbs - parallax depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#14805A]/15 blur-3xl"
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D4A017]/15 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-400/10 blur-3xl"
        />

        {/* Floating 3D particles - fixed positions to avoid hydration mismatch */}
        {[
          { left: 15, top: 25, dur: 9, x: 20 },
          { left: 35, top: 45, dur: 11, x: -15 },
          { left: 55, top: 30, dur: 10, x: 10 },
          { left: 75, top: 55, dur: 12, x: -20 },
          { left: 25, top: 65, dur: 8, x: 15 },
          { left: 85, top: 35, dur: 13, x: -10 },
          { left: 45, top: 70, dur: 9, x: 25 },
          { left: 65, top: 22, dur: 11, x: -18 },
          { left: 20, top: 50, dur: 10, x: 12 },
          { left: 90, top: 40, dur: 14, x: -22 },
          { left: 40, top: 75, dur: 8, x: 18 },
          { left: 70, top: 28, dur: 12, x: -12 },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [0, -100, 0],
              x: [0, p.x, 0],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
            className="absolute w-2 h-2 rounded-full bg-[#D4A017]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              boxShadow: '0 0 10px #D4A017, 0 0 20px #D4A017',
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        style={{ perspective: '1500px' }}
      >
        {/* Left - Content with 3D depth */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white relative z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Badge with 3D float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, z: 30 }}
            className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl rounded-full px-5 py-2.5 mb-8 border border-white/15"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
            <span className="text-sm font-medium text-[#D4A017]">{t('hero.badge')}</span>
          </motion.div>

          {/* Headline with layered 3D */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] mb-8 tracking-tight font-[family-name:var(--font-poppins)]">
            <motion.span
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block text-white/95"
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom' }}
            >
              {t('hero.title1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block text-gradient-gold"
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom' }}
            >
              {t('hero.title2')}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-light"
            style={{ transform: 'translateZ(20px)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products">
              <motion.span
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group btn-gold flex items-center gap-2 text-base"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {t('hero.cta1')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
            <Link href="/about">
              <motion.span
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/15 hover:border-white/30 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-500"
              >
                {t('hero.cta2')}
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats with 3D pop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-4 gap-3 sm:gap-6 mt-14 pt-8 border-t border-white/10"
          >
            {[
              { value: 40, suffix: '+', label: t('hero.stat.years') },
              { value: 6198, suffix: '+', label: t('hero.stat.packed') },
              { value: 4, suffix: '', label: t('hero.stat.districts') },
              { value: 140, suffix: '+', label: t('hero.stat.outlets') },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, z: 30 }}
                className="text-center cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="text-2xl sm:text-3xl font-black text-[#D4A017] font-[family-name:var(--font-poppins)]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-1 font-medium uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - 3D Product Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center relative h-[600px]"
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          {/* 3D Stage with mouse-tracking rotation */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Glow rings - layered depth */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: 'translateZ(-100px)' }}
            >
              <div className="w-96 h-96 rounded-full border-2 border-[#D4A017]/20 border-dashed" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: 'translateZ(-50px)' }}
            >
              <div className="w-[500px] h-[500px] rounded-full border border-emerald-400/15 border-dotted" />
            </motion.div>

            {/* Main central glow */}
            <div
              className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#D4A017]/20 via-transparent to-[#14805A]/20 blur-2xl"
              style={{ transform: 'translateZ(-30px)' }}
            />

            {/* Active product - center */}
            {PRODUCTS_3D.map((product, idx) => (
              <motion.div
                key={product.type}
                initial={false}
                animate={{
                  opacity: idx === activeProduct ? 1 : 0,
                  scale: idx === activeProduct ? 1 : 0.6,
                  rotateY: idx === activeProduct ? 0 : 90,
                  z: idx === activeProduct ? 50 : -200,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotateY: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Product3D type={product.type} className="w-64 h-80 drop-shadow-2xl" />
                </motion.div>
              </motion.div>
            ))}

            {/* Product carousel indicators */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {PRODUCTS_3D.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProduct(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeProduct ? 'w-8 bg-[#D4A017]' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Show product ${idx + 1}`}
                />
              ))}
            </div>

            {/* Active product name */}
            <motion.div
              key={`name-${activeProduct}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
              style={{ transform: 'translateZ(60px)' }}
            >
              <p className="text-white font-bold text-xl font-[family-name:var(--font-poppins)]">
                {PRODUCTS_3D[activeProduct].name}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Premium Oil</p>
            </motion.div>

            {/* Floating 3D feature badges */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateZ: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 left-0 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
              style={{ transform: 'translateZ(80px)' }}
            >
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#D4A017]" />
                <span className="text-white font-bold text-sm">100% Pure</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateZ: [0, -5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-32 right-0 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
              style={{ transform: 'translateZ(80px)' }}
            >
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#D4A017]" />
                <span className="text-white font-bold text-sm">AGMARK</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 3, 0],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-4 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
              style={{ transform: 'translateZ(100px)' }}
            >
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-emerald-400" />
                <span className="text-white font-bold text-sm">Double Filtered</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateZ: [0, -3, 0],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute top-32 -right-8 glass-premium rounded-2xl px-4 py-3 shadow-2xl"
              style={{ transform: 'translateZ(60px)' }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#D4A017]" />
                <span className="text-white font-bold text-sm">Since 1984</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with 3D bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-2.5 bg-[#D4A017] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
