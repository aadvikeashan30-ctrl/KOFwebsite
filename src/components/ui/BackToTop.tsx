'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-24 z-40 w-12 h-12 bg-[var(--kof-forest)] hover:bg-[var(--kof-forest-light)] text-white rounded-full shadow-xl shadow-[var(--kof-forest)]/30 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
      title="Back to top"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
