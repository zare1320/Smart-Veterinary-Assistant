import React from 'react';
import { useLocale } from '../context/LocaleContext';
import type { ScreenProps } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';

const TermsOfServiceScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { t, locale } = useLocale();

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h2>
      <div className="space-y-3 text-slate-700 dark:text-slate-300 text-justify leading-relaxed">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
       <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={() => onNavigate('settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold">{t('termsOfService')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 sm:p-6 max-w-3xl mx-auto text-start">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t('terms.lastUpdated')}</p>

        <Section title={t('terms.acceptance.title')}>
          <p>{t('terms.acceptance.p1')}</p>
        </Section>
        <Section title={t('terms.useOfService.title')}>
          <p>{t('terms.useOfService.p1')}</p>
          <p>{t('terms.useOfService.p2')}</p>
        </Section>
        <Section title={t('terms.disclaimer.title')}>
          <p>{t('terms.disclaimer.p1')}</p>
        </Section>
        <Section title={t('terms.governingLaw.title')}>
          <p>{t('terms.governingLaw.p1')}</p>
        </Section>
      </main>
    </div>
  );
};

export default TermsOfServiceScreen;
