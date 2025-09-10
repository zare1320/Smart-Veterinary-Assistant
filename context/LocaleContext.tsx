import React, { createContext, useState, useContext, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { translations } from '../locales/translations';

const LOCALE_STORAGE_KEY = 'vet_app_locale';

type Locale = 'en' | 'fa';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  localizeNumber: (num: string | number) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'fa';
  }
  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (storedLocale === 'en' || storedLocale === 'fa') {
    return storedLocale;
  }
  // Default to Persian if no preference is stored
  return 'fa';
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = useCallback((key: string): string => {
    return translations[locale][key] || key;
  }, [locale]);
  
  const localizeNumber = useCallback((num: string | number): string => {
    if (locale === 'fa') {
      return String(num).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
    }
    return String(num);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t, localizeNumber }), [locale, setLocale, t, localizeNumber]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};