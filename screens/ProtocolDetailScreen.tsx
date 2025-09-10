import React from 'react';
import type { Protocol, NavItemKey } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';
import { useLocale } from '../context/LocaleContext';

interface ProtocolDetailProps {
    protocol: Protocol;
    onNavigate: (screen: NavItemKey) => void;
}

const ProtocolDetailScreen: React.FC<ProtocolDetailProps> = ({ protocol, onNavigate }) => {
    const { locale, t } = useLocale();

    if (!protocol) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Protocol not found.</p>
                <button onClick={() => onNavigate('protocols')}>Go Back</button>
            </div>
        );
    }

    return (
        <div>
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="flex items-center p-4 justify-between border-b border-slate-200 dark:border-slate-800">
                    <button 
                        onClick={() => onNavigate('protocols')} 
                        className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        aria-label={t('back')}
                    >
                        {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
                    </button>
                    <h1 className="text-lg font-bold text-center truncate px-2 text-slate-900 dark:text-slate-100">{protocol.title}</h1>
                    <div className="w-10 flex-shrink-0"></div>
                </div>
            </header>
            <main className="p-4 text-start">
                {protocol.content || <p className="text-slate-500">No detailed content available for this protocol.</p>}
            </main>
        </div>
    );
};

export default ProtocolDetailScreen;
