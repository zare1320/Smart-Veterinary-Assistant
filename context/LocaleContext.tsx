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

  // FIX: Implemented nested key access for translations to resolve type errors and support nested translation objects. The previous implementation did not handle dot-notation keys (e.g., 'parent.child').
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let current: any = translations[locale];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key; // Not found, return the key as fallback
      }
    }
    // If the path leads to an object instead of a string, return the key.
    return typeof current === 'string' ? current : key;
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