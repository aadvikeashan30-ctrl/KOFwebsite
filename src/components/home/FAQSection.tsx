'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  sort_order?: number;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const res = await fetch('/api/public/faqs');
        const data = await res.json();
        setFaqs((data.faqs || []).slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-emerald-50 to-transparent rounded-full opacity-60 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-green-50 to-transparent rounded-full opacity-60 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0E5A3A]/5 rounded-full px-5 py-2 mb-6 border border-[#0E5A3A]/10">
            <HelpCircle size={14} className="text-[#0E5A3A]" />
            <span className="text-sm font-semibold text-[#0E5A3A]">Got Questions?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--kof-charcoal)] mb-5 font-[family-name:var(--font-poppins)]">
            Frequently Asked <span className="text-gradient-forest">Questions</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our products, ordering, and services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="card-premium p-6 sm:p-8 lg:p-10"
        >
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="h-14 bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No FAQs available at the moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group transition-colors duration-300 hover:bg-gray-50/50 rounded-xl px-4 -mx-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#0E5A3A]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0E5A3A]/10 transition-colors duration-300">
                        <span className="text-xs font-bold text-[#0E5A3A]">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-semibold text-[var(--kof-charcoal)] text-base sm:text-lg font-[family-name:var(--font-poppins)] truncate">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openIndex === idx
                        ? 'bg-[#0E5A3A] text-white rotate-180'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-[#0E5A3A]/10 group-hover:text-[#0E5A3A]'
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-15 pr-4 ml-11">
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom help text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-sm">
            Still have questions?{' '}
            <a
              href="https://wa.me/916366975382"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A3A] font-semibold hover:underline"
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
