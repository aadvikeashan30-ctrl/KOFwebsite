'use client';

import { motion } from 'framer-motion';
import { Sprout, Factory, FlaskConical, Package, Truck, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Sprout, title: 'Seed Procurement', desc: 'Direct from farmer cooperatives at MSP rates', color: '#059669' },
  { icon: Factory, title: 'Oil Extraction', desc: 'Modern solvent extraction & cold pressing', color: '#0E5A3A' },
  { icon: FlaskConical, title: 'Quality Testing', desc: 'In-house lab ensures AGMARK standards', color: '#7c3aed' },
  { icon: Package, title: 'Packing', desc: 'Automated unit - sachets to 15L tins', color: '#D4A017' },
  { icon: Truck, title: 'Distribution', desc: '4 districts, 140+ outlets, 50km radius', color: '#2563eb' },
  { icon: CheckCircle, title: 'Your Kitchen', desc: 'Pure, certified oil for healthy cooking', color: '#dc2626' },
];

export default function ManufacturingSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-5 py-2 mb-6 border border-amber-100">
            <Factory size={14} className="text-[#D4A017]" />
            <span className="text-sm font-semibold text-[#D4A017]">Farm to Family</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--kof-charcoal)] mb-5 font-[family-name:var(--font-poppins)]">
            Manufacturing <span className="text-gradient-gold">Excellence</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our end-to-end process ensures quality at every step - from oilseed farms to your kitchen
          </p>
        </motion.div>

        {/* Process flow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="card-premium p-8 h-full hover-tilt">
                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs font-black text-gray-400">{String(idx + 1).padStart(2, '0')}</span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                  <step.icon size={26} style={{ color: step.color }} />
                </div>

                <h3 className="font-bold text-[var(--kof-charcoal)] text-lg mb-2 font-[family-name:var(--font-poppins)]">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

                {/* Connector arrow for non-last items */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300 z-10">
                    {idx % 3 !== 2 && <span className="text-xl">→</span>}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 mb-4">Want to see our factory in action?</p>
          <a href="https://wa.me/916366975382?text=Hi, I would like to visit the KOF factory"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2">
            Schedule Factory Visit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
