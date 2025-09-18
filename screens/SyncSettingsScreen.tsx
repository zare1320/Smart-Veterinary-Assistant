import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon, SyncIcon, WifiIcon } from '../components/Icons';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

const SyncSettingsScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [wifiOnly, setWifiOnly] = useState(true);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000); // Simulate a sync process
  };

  const frequencyOptions = [
    { key: 'daily', label: t('sync.daily') },
    { key: 'weekly', label: t('sync.weekly') },
    { key: 'onOpen', label: t('sync.onOpen') },
  ];
  
  const activeIndex = frequencyOptions.findIndex(opt => opt.key === syncFrequency);

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <button onClick={() => navigate('/settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold text-heading">{t('sync.title')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">{t('sync.lastSync')}</p>
            <p className="text-lg font-semibold mt-1 text-heading">{new Date().toLocaleString(locale)}</p>
            <Button onClick={handleSyncNow} disabled={isSyncing} className="mt-4 w-full sm:w-auto">
                {isSyncing ? (
                    <><i className="fa-solid fa-spinner fa-spin me-2"></i> {t('sync.syncing')}</>
                ) : (
                    <><SyncIcon className="me-2"/> {t('sync.syncNow')}</>
                )}
            </Button>
        </div>
        
        <div className="bg-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-start text-heading">{t('sync.autoSync')}</h3>
             <div>
                <label htmlFor="syncFrequency" className="block text-sm font-medium text-foreground mb-1 text-start">
                    {t('sync.frequency')}
                </label>
                 <div className="relative flex w-full bg-muted p-1 rounded-lg">
                    {activeIndex !== -1 && (
                        // FIX: Replaced inline animation props with variants to fix type errors.
                        <motion.div
                            className="absolute top-1 bottom-1 left-0 h-auto bg-card shadow"
                            style={{ width: `calc(100% / ${frequencyOptions.length})`, borderRadius: '6px' }}
                            initial={false}
                            animate={{ x: `calc(${activeIndex * 100}%)` }}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                    )}
                    {frequencyOptions.map(option => (
                        <button key={option.key} onClick={() => setSyncFrequency(option.key)} className={`relative z-10 flex-1 py-2 px-2 sm:px-4 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none ${syncFrequency === option.key ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-muted-foreground hover:bg-secondary/50'}`}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

         <div className="bg-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-start text-heading">{t('sync.dataUsage')}</h3>
            <label className="flex items-center justify-between cursor-pointer">
                <div className="text-start">
                    <p className="font-medium text-foreground flex items-center gap-2"><WifiIcon /> {t('sync.wifiOnly')}</p>
                    <p className="text-xs text-muted-foreground">{t('sync.wifiOnlyDesc')}</p>
                </div>
                <div className="relative inline-block w-11 me-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" checked={wifiOnly} onChange={e => setWifiOnly(e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" id="wifi-toggle" />
                    <label htmlFor="wifi-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-700 cursor-pointer"></label>
                </div>
            </label>
        </div>
      </main>
    </div>
  );
};

export default SyncSettingsScreen;