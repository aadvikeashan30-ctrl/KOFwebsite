'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { t, type Locale } from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
});

export function useTranslation() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
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
  };

  const translate = (key: string) => t(key, locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </LocaleContext.Provider>
  );
}
