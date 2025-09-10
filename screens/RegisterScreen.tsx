import React, { useReducer, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PawIcon, GoogleIcon, GlobeIcon } from '../components/Icons';
import { authService } from '../services/authService';
import IdentityView from '../components/auth/IdentityView';
import OtpView from '../components/auth/OtpView';

type View = 'identity' | 'otp';
type Status = 'idle' | 'loading' | 'error';

interface AuthState {
  view: View;
  status: Status;
  identity: string; // email
  error: string | null;
}

type AuthAction =
  | { type: 'SUBMIT_IDENTITY'; payload: string }
  | { type: 'SUBMIT_OTP' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; payload: string }
  | { type: 'BACK' };

const initialState: AuthState = {
  view: 'identity',
  status: 'idle',
  identity: '',
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SUBMIT_IDENTITY':
      return { ...state, status: 'loading', identity: action.payload, error: null };
    case 'SUBMIT_OTP':
      return { ...state, view: 'otp', status: 'idle' };
    case 'SUCCESS':
        return { ...initialState }; // Reset on success
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'BACK':
        return {...state, view: 'identity', status: 'idle', error: null}
    default:
      return state;
  }
}

interface RegisterScreenProps {
    onAuthSuccess: (identity: string) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onAuthSuccess }) => {
    const { t, locale, setLocale } = useLocale();
    const [state, dispatch] = useReducer(authReducer, initialState);

    const toggleLocale = () => {
        setLocale(locale === 'fa' ? 'en' : 'fa');
    };

    const handleIdentitySubmit = async (identity: string) => {
        dispatch({ type: 'SUBMIT_IDENTITY', payload: identity });
        try {
            await authService.sendOtp(identity);
            dispatch({ type: 'SUBMIT_OTP' });
        } catch (err: any) {
            dispatch({ type: 'ERROR', payload: err.message });
        }
    };

    const handleOtpComplete = async (otp: string) => {
        dispatch({ type: 'SUBMIT_IDENTITY', payload: state.identity }); // Re-use loading state
        try {
            const isValid = await authService.verifyOtp(state.identity, otp);
            if (isValid) {
                onAuthSuccess(state.identity);
                dispatch({ type: 'SUCCESS' });
            } else {
                throw new Error(t('auth.error.invalidCode'));
            }
        } catch (err: any) {
            dispatch({ type: 'ERROR', payload: err.message });
        }
    }
    
    const handleGoogleSignIn = async () => {
        dispatch({type: 'SUBMIT_IDENTITY', payload: 'google'});
        try {
            const result = await authService.signInWithGoogle();
            onAuthSuccess(result.email);
            dispatch({ type: 'SUCCESS' });
        } catch (err: any) {
            dispatch({ type: 'ERROR', payload: err.message });
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950 p-4 relative">
            <div className="absolute top-4 end-4">
                <button 
                    onClick={toggleLocale} 
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
                >
                    <GlobeIcon />
                    <span>{locale === 'fa' ? 'English' : 'فارسی'}</span>
                </button>
            </div>
            <div className="w-full max-w-sm mx-auto">
                <div className="flex flex-col items-center justify-center mb-8">
                    <PawIcon className="text-5xl text-[var(--primary-500)]" />
                    <h1 className="text-2xl font-bold mt-2 text-slate-800 dark:text-slate-100">{t('auth.welcomeTitle')}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-center">{t('auth.welcomeSubtitle')}</p>
                </div>

                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state.view}
                            initial={{ x: state.view === 'identity' ? 0 : 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                           {state.view === 'identity' ? (
                                <IdentityView 
                                    onSubmit={handleIdentitySubmit}
                                    isLoading={state.status === 'loading'}
                                    error={state.error}
                                />
                           ) : (
                                <OtpView 
                                    identity={state.identity}
                                    onComplete={handleOtpComplete}
                                    onBack={() => dispatch({type: 'BACK'})}
                                    isLoading={state.status === 'loading'}
                                    error={state.error}
                                />
                           )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                 <div className="flex items-center my-6">
                    <hr className="flex-grow border-slate-300 dark:border-slate-800"/>
                    <span className="mx-4 text-xs font-medium text-slate-400 dark:text-slate-500">{t('auth.or')}</span>
                    <hr className="flex-grow border-slate-300 dark:border-slate-800"/>
                </div>

                <button onClick={handleGoogleSignIn} disabled={state.status === 'loading'} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
                    <GoogleIcon className="w-5 h-5"/>
                    {t('auth.continueWithGoogle')}
                </button>
            </div>
        </div>
    );
};

export default RegisterScreen;