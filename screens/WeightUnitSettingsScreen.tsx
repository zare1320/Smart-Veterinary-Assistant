import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../components/Icons';
import { useUserStore } from '../stores/useUserStore';
import type { WeightUnit } from '../types';

const WeightUnitSettingsScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const { user, updateSettings } = useUserStore();
  const selectedUnit = user?.settings?.weightUnit || 'kg';

  const handleSelectUnit = (unit: WeightUnit) => {
    updateSettings({ weightUnit: unit });
  };

  const options: { key: WeightUnit; label: string; description: string }[] = [
    { key: 'kg', label: t('weightUnits.kg.label'), description: t('weightUnits.kg.description') },
    { key: 'lb', label: t('weightUnits.lb.label'), description: t('weightUnits.lb.description') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <button onClick={() => navigate('/settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
          {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold text-heading">{t('defaultWeightUnit')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 max-w-2xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm divide-y divide-border">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSelectUnit(option.key)}
              className="flex items-center justify-between w-full p-4 text-start"
            >
              <div>
                <span className={`font-medium ${selectedUnit === option.key ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-foreground'}`}>
                  {option.label}
                </span>
                <p className="text-sm text-muted-foreground">{option.description}</p>
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