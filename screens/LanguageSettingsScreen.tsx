import React from 'react';
import { useLocale } from '../context/LocaleContext';
import type { ScreenProps } from '../types';
import { ArrowRightIcon, CheckIcon, ArrowLeftIcon } from '../components/Icons';

const LanguageSettingsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { locale, setLocale, t } = useLocale();

  const options: { key: 'fa' | 'en'; label: string }[] = [
    { key: 'fa', label: 'فارسی' },
    { key: 'en', label: 'English' },
  ];

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={() => onNavigate('settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold">{t('language')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => setLocale(option.key)}
              className="flex items-center justify-between w-full p-4"
            >
              <span className={`font-medium ${locale === option.key ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-slate-900 dark:text-slate-100'}`}>
                {option.label}
              </span>
              {locale === option.key && (
                <CheckIcon className="w-5 h-5 text-[var(--primary-600)] dark:text-[var(--primary-300)]" />
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LanguageSettingsScreen;
