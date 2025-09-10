import React, { useState } from 'react';
import type { ScreenProps } from '../types';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ContrastIcon,
  DeleteIcon,
  DescriptionIcon,
  GlobeIcon,
  MailIcon,
  ScaleIcon,
  ShieldIcon,
  SyncIcon,
} from '../components/Icons';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <div className="relative inline-block w-11 me-2 align-middle select-none transition duration-200 ease-in">
    <input
      type="checkbox"
      name="toggle"
      id={`toggle-${Math.random()}`}
      checked={enabled}
      onChange={onChange}
      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
    />
    <label
      htmlFor={`toggle-${Math.random()}`}
      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-700 cursor-pointer"
    ></label>
  </div>
);

// Settings Item Component
interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  isToggle?: boolean;
  toggleState?: boolean;
  onToggleChange?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, value, onClick, isToggle, toggleState, onToggleChange }) => {
  const { locale } = useLocale();
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-4"
      disabled={!onClick && !isToggle}
    >
      <div className="flex items-center gap-4">
        <div className="bg-[var(--primary-100)] dark:bg-[var(--primary-900)] text-[var(--primary-600)] dark:text-[var(--primary-300)] p-2 rounded-full">
          {icon}
        </div>
        <span className="font-medium text-slate-900 dark:text-slate-100 text-start">{label}</span>
      </div>
      {isToggle ? (
        <ToggleSwitch enabled={toggleState!} onChange={onToggleChange!} />
      ) : (
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          {value && <span>{value}</span>}
          {onClick && (
            locale === 'fa' ? (
                <ChevronLeftIcon className="text-slate-400 dark:text-slate-500" />
            ) : (
                <ChevronRightIcon className="text-slate-400 dark:text-slate-500" />
            )
          )}
        </div>
      )}
    </button>
  );
};

const SettingsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { themeSetting } = useTheme();
  const { t, locale } = useLocale();

  const themeLabelMap = {
    light: t('themeLight'),
    dark: t('themeDark'),
    system: t('themeSystem'),
  };

  const languageLabelMap = {
      en: 'English',
      fa: 'فارسی',
  }

  return (
    <div className="text-slate-900 dark:text-slate-100">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={() => onNavigate('home')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
        <h1 className="text-lg font-bold">{t('navSettings')}</h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4 space-y-8 text-start">
        {/* General Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 px-2">{t('settingsGeneral')}</h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
            <SettingsItem icon={<GlobeIcon />} label={t('language')} value={languageLabelMap[locale]} onClick={() => onNavigate('language-settings')} />
            <SettingsItem icon={<ContrastIcon />} label={t('theme')} value={themeLabelMap[themeSetting]} onClick={() => onNavigate('theme-settings')} />
          </div>
        </section>

        {/* Notifications Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 px-2">{t('settingsNotifications')}</h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
            <SettingsItem
              icon={<BellIcon />}
              label={t('pushNotifications')}
              isToggle
              toggleState={pushNotifications}
              onToggleChange={() => setPushNotifications(!pushNotifications)}
            />
            <SettingsItem
              icon={<MailIcon />}
              label={t('emailNotifications')}
              isToggle
              toggleState={emailNotifications}
              onToggleChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
        </section>

        {/* Data & Privacy Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 px-2">{t('settingsDataPrivacy')}</h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
            <SettingsItem icon={<SyncIcon />} label={t('syncFrequency')} value={t('automatic')} onClick={() => onNavigate('sync-settings')} />
            <SettingsItem icon={<DeleteIcon />} label={t('clearCache')} onClick={() => alert(t('cacheCleared'))} />
            <SettingsItem icon={<ShieldIcon />} label={t('privacyPolicy')} onClick={() => onNavigate('privacy-policy')} />
            <SettingsItem icon={<DescriptionIcon />} label={t('termsOfService')} onClick={() => onNavigate('terms-of-service')} />
          </div>
        </section>

        {/* Calculator Defaults Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 px-2">{t('settingsCalculatorDefaults')}</h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <SettingsItem icon={<ScaleIcon />} label={t('defaultWeightUnit')} value={t('kg')} onClick={() => onNavigate('weight-unit-settings')} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsScreen;