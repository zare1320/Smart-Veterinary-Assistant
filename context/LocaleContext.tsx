import React, { createContext, useState, useContext, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { translations } from '../locales/translations';

const LOCALE_STORAGE_KEY = 'vet_app_locale';

type Locale = 'en' | 'fa';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
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

  // FIX: Updated the translation function `t` to support an optional `options` object for placeholder replacements (e.g., { value: 'someValue' }). This resolves errors where `t` was called with more than one argument.
  const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let current: any = translations[locale];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key; // Not found, return the key as fallback
      }
    }
    
    let result = typeof current === 'string' ? current : key;

    if (options && typeof result === 'string') {
      for (const optionKey in options) {
        result = result.replace(new RegExp(`\\{${optionKey}\\}`, 'g'), String(options[optionKey]));
      }
    }

    return result;
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
