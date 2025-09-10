import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { MailIcon, PhoneIcon } from '../Icons';
import { Button } from '../Button';

interface IdentityViewProps {
  onSubmit: (identity: string) => void;
  isLoading: boolean;
  error: string | null;
}

const IdentityView: React.FC<IdentityViewProps> = ({ onSubmit, isLoading, error }) => {
    const { t } = useLocale();
    const [identity, setIdentity] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    // Basic check for what the input looks like for UX purposes
    const isPhoneInput = /^\+?[0-9\s-]*$/.test(identity);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isEmail = identity.includes('@');
        const isPhone = /^\+?[0-9\s-]{7,}$/.test(identity); // A simple phone number validation

        if (!isEmail && !isPhone) {
            setValidationError(t('auth.error.invalidEmail'));
            return;
        }
        setValidationError(null);
        onSubmit(identity);
    };
    
    const displayError = error || validationError;
    const IconComponent = isPhoneInput && identity ? PhoneIcon : MailIcon;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <IconComponent className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400 dark:text-slate-500"/>
                <input
                    type={isPhoneInput ? "tel" : "email"}
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
                    required
                    className={`w-full py-3 ps-12 pe-4 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-500 ${displayError ? 'border-red-500' : ''}`}
                    aria-invalid={!!displayError}
                />
            </div>
            
            {displayError && <p className="text-sm text-red-600 dark:text-red-400">{displayError}</p>}
            
            <Button type="submit" variant="primary" className="w-full !py-3 !text-base !rounded-full" disabled={isLoading}>
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : t('auth.continue')}
            </Button>
        </form>
    );
};

export default IdentityView;