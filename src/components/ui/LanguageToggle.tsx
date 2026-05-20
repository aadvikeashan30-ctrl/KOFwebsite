'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('kof_locale') as Locale;
    if (saved && (saved === 'en' || saved === 'kn')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('kof_locale', l);
    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent('locale-change', { detail: l }));
  };

  return [locale, setLocale];
}

export default function LanguageToggle() {
  const [locale, setLocale] = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
        aria-label="Switch language"
      >
        <Globe size={13} />
        <span className="uppercase font-bold">{locale}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 w-36 z-50 overflow-hidden">
            <button
              onClick={() => { setLocale('en'); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2.5 ${locale === 'en' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="text-base">🇬🇧</span> English
              {locale === 'en' && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
            </button>
            <button
              onClick={() => { setLocale('kn'); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2.5 ${locale === 'kn' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="text-base">🇮🇳</span> ಕನ್ನಡ
              {locale === 'kn' && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
