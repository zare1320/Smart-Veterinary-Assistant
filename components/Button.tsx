import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { useLocale } from '../context/LocaleContext';

interface BackButtonProps {
    onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    const { t, locale } = useLocale();
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label={t('back')}
        >
            {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            <span>{t('back')}</span>
        </button>
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
    const baseClasses = "px-4 py-2 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center";
    
    const variantClasses = {
        primary: 'bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)] focus:ring-[var(--primary-500)]',
        secondary: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 focus:ring-slate-500'
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};