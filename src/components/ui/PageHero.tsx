'use client';

import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface PageHeroProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  subtitle: string;
}

export default function PageHero({ icon: Icon, badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-80 h-80 bg-[var(--kof-gold)]/8 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl rounded-full px-5 py-2.5 mb-8 border border-white/15">
            <Icon size={14} className="text-[var(--kof-gold)]" />
            <span className="text-sm font-semibold text-[var(--kof-gold-light)]">{badge}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-5 font-[family-name:var(--font-poppins)]">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
