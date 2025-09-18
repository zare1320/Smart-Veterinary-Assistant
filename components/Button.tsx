import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { useLocale } from '../context/LocaleContext';
// FIX: Updated ButtonProps to extend from framer-motion's HTMLMotionProps to resolve type conflicts between React's button attributes and motion props, particularly with event handlers like onAnimationStart.
import { motion, HTMLMotionProps } from 'framer-motion';

interface BackButtonProps {
    onClick: () => void;
}

// FIX: Replaced inline animation props with variants to fix type errors.
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    const { t, locale } = useLocale();
    return (
        <motion.button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:bg-muted transition-colors"
            aria-label={t('back')}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
        >
            {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            <span>{t('back')}</span>
        </motion.button>
    );
};

// FIX: Changed ButtonProps to extend HTMLMotionProps<'button'> to correctly include props like `children` and `className`, fixing numerous type errors.
interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
    const baseClasses = "px-4 py-2 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center";
    
    const variantClasses = {
        primary: 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] focus:ring-[var(--accent)] shadow-lg shadow-[color:var(--accent)]/30',
        secondary: 'bg-muted text-foreground hover:bg-secondary focus:ring-ring'
    };

    return (
        <motion.button 
            className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            {...props}
        >
            {children}
        </motion.button>
    );
};