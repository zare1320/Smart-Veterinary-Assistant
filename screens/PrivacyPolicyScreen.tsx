import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';

const PrivacyPolicyScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  
  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-2 text-heading">{title}</h2>
      <div className="space-y-3 text-foreground text-justify leading-relaxed">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
       <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <button onClick={() => navigate('/settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold text-heading">{t('privacyPolicy')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 sm:p-6 max-w-3xl mx-auto text-start">
        <p className="text-sm text-muted-foreground mb-6">{t('privacy.lastUpdated')}</p>
        
        <Section title={t('privacy.introduction.title')}>
            <p>{t('privacy.introduction.p1')}</p>
        </Section>
        <Section title={t('privacy.informationWeCollect.title')}>
            <p>{t('privacy.informationWeCollect.p1')}</p>
            <ul className="list-disc ps-5 space-y-1">
                <li><span className="font-semibold">{t('privacy.informationWeCollect.l1.title')}</span>: {t('privacy.informationWeCollect.l1.desc')}</li>
                <li><span className="font-semibold">{t('privacy.informationWeCollect.l2.title')}</span>: {t('privacy.informationWeCollect.l2.desc')}</li>
                <li><span className="font-semibold">{t('privacy.informationWeCollect.l3.title')}</span>: {t('privacy.informationWeCollect.l3.desc')}</li>
            </ul>
        </Section>
         <Section title={t('privacy.howWeUse.title')}>
            <p>{t('privacy.howWeUse.p1')}</p>
             <ul className="list-disc ps-5 space-y-1">
                <li>{t('privacy.howWeUse.l1')}</li>
                <li>{t('privacy.howWeUse.l2')}</li>
                <li>{t('privacy.howWeUse.l3')}</li>
            </ul>
        </Section>
        <Section title={t('privacy.dataSecurity.title')}>
            <p>{t('privacy.dataSecurity.p1')}</p>
        </Section>
        <Section title={t('privacy.contact.title')}>
            <p>{t('privacy.contact.p1')}</p>
        </Section>
      </main>
    </div>
  );
};

export default PrivacyPolicyScreen;