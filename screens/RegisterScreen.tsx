import React, { useReducer } from 'react';
import { useLocale } from '../context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PawIcon, GoogleIcon, GlobeIcon } from '../components/Icons';
import { authService } from '../services/authService';
import IdentityView from '../components/auth/IdentityView';
import OtpView from '../components/auth/OtpView';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

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
    const { effectiveTheme, setThemeSetting } = useTheme();

    const toggleLocale = () => {
        setLocale(locale === 'fa' ? 'en' : 'fa');
    };

    const handleThemeToggle = () => {
        const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
        setThemeSetting(newTheme);
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 relative">
            <div className="absolute top-4 end-4 flex items-center gap-2">
                <ThemeToggle 
                  isDarkMode={effectiveTheme === 'dark'}
                  onToggle={handleThemeToggle}
                />
                <button 
                    onClick={toggleLocale} 
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold bg-muted hover:bg-secondary transition-colors text-foreground"
                >
                    <GlobeIcon />
                    <span>{locale === 'fa' ? 'English' : 'فارسی'}</span>
                </button>
            </div>
            <div className="w-full max-w-sm mx-auto">
                <div className="flex flex-col items-center justify-center mb-8">
                    <PawIcon className="text-5xl text-[var(--primary-500)]" />
                    <h1 className="text-2xl font-bold mt-2 text-heading">{t('auth.welcomeTitle')}</h1>
                    <p className="text-muted-foreground text-center">{t('auth.welcomeSubtitle')}</p>
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
                    <hr className="flex-grow border-border"/>
                    <span className="mx-4 text-xs font-medium text-muted-foreground">{t('auth.or')}</span>
                    <hr className="flex-grow border-border"/>
                </div>

                <button onClick={handleGoogleSignIn} disabled={state.status === 'loading'} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-card border border-border rounded-xl font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50">
                    <GoogleIcon className="w-5 h-5"/>
                    {t('auth.continueWithGoogle')}
                </button>
            </div>
        </div>
    );
};

export default RegisterScreen;