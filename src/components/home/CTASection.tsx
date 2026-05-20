'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, ArrowRight, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#D4A017]/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 font-[family-name:var(--font-poppins)]">
            Ready to Order?
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Bulk orders, retail, or distributorship — we&apos;re just a WhatsApp message away
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/916366975382" target="_blank" rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2 text-lg">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
            <Link href="/contact" className="bg-white/8 hover:bg-white/12 backdrop-blur-xl border border-white/15 hover:border-white/30 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-2">
              Contact Form <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
