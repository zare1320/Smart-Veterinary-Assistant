import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useTheme } from '../../context/ThemeContext';
import type { User, NavItemKey } from '../../types';
import { Button } from '../Button';
import { ArrowLeftIcon, ArrowRightIcon, LogOutIcon, PencilIcon } from '../Icons';

interface ProfileViewProps {
    user: User;
    onEdit: () => void;
    onLogout: () => void;
    onNavigate: (screen: NavItemKey) => void;
}

const InfoRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="py-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    );
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit, onLogout, onNavigate }) => {
    const { t, locale } = useLocale();
    const { themeSetting } = useTheme();

    const initials = user.profile.fullName ? user.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : (user.email || user.phone || '?')[0].toUpperCase();

    const roleMap: {[key:string]: string} = {
        student: t('profile.role.student'),
        dvm: t('profile.role.dvm'),
    };

    return (
        <div>
            <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                <button onClick={() => onNavigate('settings')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
                </button>
                <h1 className="text-lg font-bold">{t('profile.view.title')}</h1>
                <div className="w-10"></div>
            </header>

            <main className="p-4 sm:p-6 max-w-2xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 text-center">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--primary-200)] to-[var(--primary-400)] dark:from-[var(--primary-800)] dark:to-[var(--primary-600)] flex items-center justify-center text-4xl font-bold text-[var(--primary-700)] dark:text-[var(--primary-200)]">
                            {initials}
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-4 text-slate-900 dark:text-slate-100">{user.profile.fullName}</h2>
                    <p className="text-slate-500 dark:text-slate-400">{user.email || user.phone}</p>

                    <div className="text-start mt-8 divide-y divide-slate-200 dark:divide-slate-700">
                        <InfoRow label={t('profile.form.roleLabel')} value={user.profile.role ? roleMap[user.profile.role] : ''} />
                        <InfoRow label={t('profile.form.universityLabel')} value={user.profile.university} />
                        <InfoRow label={t('profile.form.studentIdLabel')} value={user.profile.studentId} />
                        <InfoRow label={t('profile.form.provinceLabel')} value={user.profile.province} />
                        <InfoRow label={t('profile.form.licenseNumberLabel')} value={user.profile.licenseNumber} />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button onClick={onEdit} variant="primary" className="w-full">
                            <PencilIcon className="me-2"/> {t('profile.view.editButton')}
                        </Button>
                        <Button onClick={onLogout} variant="secondary" className="w-full">
                           <LogOutIcon className="me-2"/> {t('profile.view.logoutButton')}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileView;