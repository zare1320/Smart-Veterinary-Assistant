import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { Button } from '../Button';

interface OtpViewProps {
  identity: string;
  onComplete: (otp: string) => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const OTP_LENGTH = 6;

const OtpView: React.FC<OtpViewProps> = ({ identity, onComplete, onBack, isLoading, error }) => {
  const { t } = useLocale();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isEmail = identity.includes('@');
  const titleKey = isEmail ? 'auth.otp.titleEmail' : 'auth.otp.titleSms';

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit
    const fullOtp = newOtp.join('');
    if (fullOtp.length === OTP_LENGTH) {
        onComplete(fullOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  return (
    <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">{t(titleKey)}</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
            {t('auth.otp.subtitle').replace('{identity}', identity)}
        </p>

        <div className="flex justify-center gap-2 mb-4" dir="ltr">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    // FIX: Wrapped the ref callback in curly braces to ensure it returns `void` and matches the expected Ref type.
                    ref={el => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold bg-slate-200 dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition text-slate-900 dark:text-slate-100 ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'}`}
                    disabled={isLoading}
                />
            ))}
        </div>
        
        {error && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>}
        
        {isLoading && <i className="fa-solid fa-spinner fa-spin text-2xl text-[var(--primary-500)]"></i>}

        <div className="text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('auth.otp.noCode')} </span>
            <button type="button" onClick={() => {}} className="font-semibold text-[var(--primary-600)] hover:underline">
                {t('auth.otp.resend')}
            </button>
        </div>
         <button type="button" onClick={onBack} className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:underline">
            {t('auth.otp.back')}
        </button>
    </div>
  );
};

export default OtpView;