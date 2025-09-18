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
        const value = identity.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^09\d{9}$/;

        if (emailRegex.test(value)) {
            setValidationError(null);
            onSubmit(value);
        } else if (phoneRegex.test(value)) {
            setValidationError(null);
            onSubmit(value);
        } else {
            if (value.includes('@')) {
                setValidationError(t('auth.error.invalidEmail'));
            } else if (/^\d+$/.test(value)) {
                setValidationError(t('auth.error.invalidPhone'));
            } else {
                setValidationError(t('auth.error.invalidIdentity'));
            }
            return;
        }
    };
    
    const displayError = error || validationError;
    const IconComponent = isPhoneInput && identity ? PhoneIcon : MailIcon;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <IconComponent className="absolute top-1/2 -translate-y-1/2 start-4 text-muted-foreground"/>
                <input
                    type={isPhoneInput ? "tel" : "email"}
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
                    required
                    className={`form-input w-full !py-3 !ps-12 !pe-4 !rounded-xl ${displayError ? '!border-red-500' : ''}`}
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