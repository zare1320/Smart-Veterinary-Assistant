import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';

const THEME_STORAGE_KEY = 'vet_app_theme';

type ThemeSetting = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

interface ThemeContextType {
  themeSetting: ThemeSetting;
  effectiveTheme: EffectiveTheme;
  setThemeSetting: (theme: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialThemeSetting = (): ThemeSetting => {
  if (typeof window === 'undefined') {
    return 'system';
  }
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
    return storedTheme;
  }
  return 'system'; // Default to system preference
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>(getInitialThemeSetting);
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>('dark');

  const setThemeSetting = useCallback((setting: ThemeSetting) => {
    localStorage.setItem(THEME_STORAGE_KEY, setting);
    setThemeSettingState(setting);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = () => {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeSetting | null;
      
      let newTheme: EffectiveTheme;

      if (storedTheme === 'light' || storedTheme === 'dark') {
        newTheme = storedTheme;
      } else { // 'system' or null
        newTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      root.style.colorScheme = newTheme;
      setEffectiveTheme(newTheme);
    };
    
    applyTheme();
    
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [themeSetting]);

  const value = useMemo(() => ({ themeSetting, effectiveTheme, setThemeSetting }), [themeSetting, effectiveTheme, setThemeSetting]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};