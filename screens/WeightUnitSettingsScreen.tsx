import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import type { ScreenProps } from '../types';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../components/Icons';

type WeightUnit = 'kg' | 'lb';

const WeightUnitSettingsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { t, locale } = useLocale();
  // In a real app, this state would come from a global context (like User settings).
  const [selectedUnit, setSelectedUnit] = useState<WeightUnit>('kg');

  const options: { key: WeightUnit; label: string; description: string }[] = [
    { key: 'kg', label: t('weightUnits.kg.label'), description: t('weightUnits.kg.description') },
    { key: 'lb', label: t('weightUnits.lb.label'), description: t('weightUnits.lb.description') },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={() => onNavigate('settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold">{t('defaultWeightUnit')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => setSelectedUnit(option.key)}
              className="flex items-center justify-between w-full p-4 text-start"
            >
              <div>
                <span className={`font-medium ${selectedUnit === option.key ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-slate-900 dark:text-slate-100'}`}>
                  {option.label}
                </span>
                <p className="text-sm text-slate-500 dark:text-slate-400">{option.description}</p>
              </div>
              {selectedUnit === option.key && (
                <CheckIcon className="w-5 h-5 text-[var(--primary-600)] dark:text-[var(--primary-300)] flex-shrink-0 ms-4" />
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WeightUnitSettingsScreen;
