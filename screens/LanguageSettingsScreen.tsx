import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { ArrowRightIcon, CheckIcon, ArrowLeftIcon } from '../components/Icons';
import { motion } from 'framer-motion';

// FIX: Replaced inline animation props with variants to fix type errors.
const buttonVariants = {
  tap: { scale: 0.98 },
};

const LanguageSettingsScreen: React.FC = () => {
  const { locale, setLocale, t } = useLocale();
  const navigate = useNavigate();

  const options: { key: 'fa' | 'en'; label: string }[] = [
    { key: 'fa', label: 'فارسی' },
    { key: 'en', label: 'English' },
  ];

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <button onClick={() => navigate('/settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold text-heading">{t('language')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4">
        <div className="bg-card rounded-lg shadow-sm divide-y divide-border">
          {options.map((option) => (
            <motion.button
              key={option.key}
              onClick={() => setLocale(option.key)}
              className="flex items-center justify-between w-full p-4 hover:bg-muted transition-colors"
              variants={buttonVariants}
              whileTap="tap"
            >
              <span className={`font-medium ${locale === option.key ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-foreground'}`}>
                {option.label}
              </span>
              {locale === option.key && (
                <CheckIcon className="w-5 h-5 text-[var(--primary-600)] dark:text-[var(--primary-300)]" />
              )}
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LanguageSettingsScreen;