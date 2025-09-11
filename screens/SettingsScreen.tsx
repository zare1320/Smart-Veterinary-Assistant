import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ContrastIcon,
  DescriptionIcon,
  GlobeIcon,
  LogOutIcon,
  MailIcon,
  ScaleIcon,
  ShieldIcon,
  SyncIcon,
  InfoCircleIcon
} from '../components/Icons';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';
import { useUserStore } from '../stores/useUserStore';

// --- Self-contained Components for a Cleaner Structure (Moved outside SettingsScreen) ---

const SettingsHeader: React.FC = () => {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-center relative">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-heading">{t('navSettings')}</h1>
        </div>
    </header>
  );
};

const ProfileCard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const user = useUserStore(state => state.user);
    const { t } = useLocale();

    if (!user) return null;

    const initials = user.profile.fullName ? user.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : (user.id[0]).toUpperCase();
    const roleMap: {[key:string]: string} = {
        student: t('profile.form.role.student'),
        dvm: t('profile.form.role.dvm'),
    };

    return (
        <div className="bg-card rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-200)] to-[var(--primary-400)] dark:from-[var(--primary-800)] dark:to-[var(--primary-600)] flex items-center justify-center text-3xl font-bold text-[var(--primary-700)] dark:text-[var(--primary-200)]">
                    {initials}
                </div>
                <div className="flex-grow text-start">
                    <h2 className="text-xl font-bold text-heading">{user.profile.fullName || 'User'}</h2>
                    <p className="text-sm text-muted-foreground">{user.profile.role ? roleMap[user.profile.role] : 'No role set'}</p>
                </div>
            </div>
            <button 
                onClick={() => onNavigate('/profile')} 
                className="mt-4 w-full text-center py-2.5 px-4 rounded-lg bg-[var(--primary-500)] text-white font-semibold hover:bg-[var(--primary-600)] transition-colors text-sm shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,20%)]"
            >
                {t('profile.view.editButton')}
            </button>
        </div>
    );
}

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider text-start">{title}</h3>
        <div className="bg-card rounded-xl shadow-md overflow-hidden">
            {children}
        </div>
    </section>
);

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => {
  const id = React.useId();
  return (
    <div className="relative inline-block w-11 me-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id={`toggle-${id}`}
        checked={enabled}
        onChange={e => onChange(e.target.checked)}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        htmlFor={`toggle-${id}`}
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-700 cursor-pointer"
      ></label>
    </div>
  );
};


interface SettingsItemProps {
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  action?: React.ReactNode; 
  onClick?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description, action, onClick }) => {
    const Component = onClick ? 'button' : 'div';
    return (
        <Component
            onClick={onClick}
            className="flex items-center w-full p-4 text-start transition-colors hover:bg-secondary/50 disabled:hover:bg-transparent"
        >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-muted rounded-full text-[var(--primary-600)] dark:text-[var(--primary-300)]">
                {icon}
            </div>
            <div className="flex-grow mx-4">
                <p className="font-semibold text-card-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {action && <div className="flex-shrink-0 flex items-center gap-2 text-muted-foreground">{action}</div>}
        </Component>
    );
};

// --- Main Screen Component ---

const SettingsScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const { themeSetting } = useTheme();
  const logout = useUserStore(state => state.logout);
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const themeLabelMap = {
    light: t('themeLight'),
    dark: t('themeDark'),
    system: t('themeSystem'),
  };
  
  const languageLabelMap = {
      en: 'English',
      fa: 'فارسی',
  };

  const ArrowIcon = locale === 'fa' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div className="min-h-screen">
      <SettingsHeader />
      <main className="p-4 space-y-6 max-w-3xl mx-auto pb-8">
        <ProfileCard onNavigate={navigate} />

        <SettingsSection title={t('settingsGeneral')}>
          <SettingsItem 
            icon={<GlobeIcon />}
            title={t('language')}
            description={t('settings.languageDescription')}
            onClick={() => navigate('/settings/language')}
            action={<><span>{languageLabelMap[locale]}</span><ArrowIcon /></>}
          />
          <div className="border-t border-border/50 mx-4 my-0 h-px"></div>
          <SettingsItem 
            icon={<ContrastIcon />}
            title={t('theme')}
            description={t('settings.themeDescription')}
            onClick={() => navigate('/settings/theme')}
            action={<><span>{themeLabelMap[themeSetting]}</span><ArrowIcon /></>}
          />
        </SettingsSection>

        <SettingsSection title={t('settingsNotifications')}>
          <SettingsItem 
            icon={<BellIcon />}
            title={t('pushNotifications')}
            description={t('settings.pushNotificationsDescription')}
            action={<ToggleSwitch enabled={pushNotifications} onChange={setPushNotifications} />}
          />
          <div className="border-t border-border/50 mx-4 my-0 h-px"></div>
          <SettingsItem 
            icon={<MailIcon />}
            title={t('emailNotifications')}
            description={t('settings.emailNotificationsDescription')}
            action={<ToggleSwitch enabled={emailNotifications} onChange={setEmailNotifications} />}
          />
        </SettingsSection>

        <SettingsSection title={t('settingsDataPrivacy')}>
            <SettingsItem icon={<SyncIcon />} title={t('syncFrequency')} description={t('settings.syncDescription')} onClick={() => navigate('/settings/sync')} action={<><span>{t('automatic')}</span><ArrowIcon/></>} />
            <div className="border-t border-border/50 mx-4 my-0 h-px"></div>
            <SettingsItem icon={<ShieldIcon />} title={t('privacyPolicy')} description={t('settings.privacyDescription')} onClick={() => navigate('/settings/privacy-policy')} action={<ArrowIcon />} />
             <div className="border-t border-border/50 mx-4 my-0 h-px"></div>
            <SettingsItem icon={<DescriptionIcon />} title={t('termsOfService')} description={t('settings.termsDescription')} onClick={() => navigate('/settings/terms-of-service')} action={<ArrowIcon />} />
        </SettingsSection>

        <SettingsSection title={t('settingsCalculatorDefaults')}>
            <SettingsItem icon={<ScaleIcon />} title={t('defaultWeightUnit')} description={t('settings.weightUnitDescription')} onClick={() => navigate('/settings/weight-unit')} action={<><span>{t('kg')}</span><ArrowIcon/></>} />
        </SettingsSection>

        <SettingsSection title={t('settings.account')}>
          <SettingsItem 
            icon={<LogOutIcon />}
            title={t('settings.logout')}
            description={t('settings.logoutDescription')}
            onClick={logout}
          />
        </SettingsSection>

        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>{t('appName')} {t('settings.appVersion')} 1.2.0</p>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
