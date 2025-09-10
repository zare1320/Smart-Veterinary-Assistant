import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import type { ScreenProps } from '../types';
import { ArrowLeftIcon, ArrowRightIcon, SyncIcon, WifiIcon } from '../components/Icons';
import { Button } from '../components/Button';

const SyncSettingsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { t, locale } = useLocale();
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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={() => onNavigate('settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold">{t('sync.title')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('sync.lastSync')}</p>
            <p className="text-lg font-semibold mt-1 text-slate-800 dark:text-slate-200">{new Date().toLocaleString(locale)}</p>
            <Button onClick={handleSyncNow} disabled={isSyncing} className="mt-4 w-full sm:w-auto">
                {isSyncing ? (
                    <><i className="fa-solid fa-spinner fa-spin me-2"></i> {t('sync.syncing')}</>
                ) : (
                    <><SyncIcon className="me-2"/> {t('sync.syncNow')}</>
                )}
            </Button>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-start text-slate-900 dark:text-slate-100">{t('sync.autoSync')}</h3>
             <div>
                <label htmlFor="syncFrequency" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
                    {t('sync.frequency')}
                </label>
                <div className="flex w-full bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
                    {frequencyOptions.map(option => (
                        <button key={option.key} onClick={() => setSyncFrequency(option.key)} className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none ${syncFrequency === option.key ? 'bg-white dark:bg-slate-900 text-[var(--primary-600)] dark:text-[var(--primary-300)] shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'}`}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-start text-slate-900 dark:text-slate-100">{t('sync.dataUsage')}</h3>
            <label className="flex items-center justify-between cursor-pointer">
                <div className="text-start">
                    <p className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"><WifiIcon /> {t('sync.wifiOnly')}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('sync.wifiOnlyDesc')}</p>
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
