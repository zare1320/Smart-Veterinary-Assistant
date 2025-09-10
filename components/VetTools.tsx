import React from 'react';
import { SyringeIcon, FluidIcon, HeartPulseIcon, BloodIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';
import type { NavItemKey } from '../types';
import { useLocale } from '../context/LocaleContext';

type SpecialKey = 'suggest-tool';

interface Tool {
    title: string;
    description: string;
    icon: React.ReactNode;
    navKey: NavItemKey | SpecialKey | null;
}

const getTools = (t: (key: string) => string): Tool[] => [
    {
        title: t('drugDoseCalculator'),
        description: t('drugDoseDesc'),
        icon: <SyringeIcon className="text-2xl text-[var(--primary-500)]" />,
        navKey: 'drug-dose-calculator',
    },
    {
        title: t('fluidTherapyCalculator'),
        description: t('fluidTherapyDesc'),
        icon: <FluidIcon className="text-2xl text-[var(--primary-500)]" />,
        navKey: 'fluid-therapy-calculator',
    },
    {
        title: t('bloodPressureCalculator'),
        description: t('bloodPressureDesc'),
        icon: <HeartPulseIcon className="text-2xl text-red-500" />,
        navKey: 'blood-pressure-calculator',
    },
    {
        title: t('bloodTransfusionCalculator'),
        description: t('bloodTransfusionDesc'),
        icon: <BloodIcon className="text-2xl text-red-500" />,
        navKey: 'blood-transfusion-calculator',
    }
];

interface VetToolsProps {
    onNavigate: (screen: NavItemKey) => void;
}

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => {
    const { locale } = useLocale();
    const isSuggestTool = tool.navKey === 'suggest-tool';
    const isDisabled = !tool.navKey;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="relative group bg-white dark:bg-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-square disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-md disabled:hover:translate-y-0"
            aria-label={tool.title}
        >
            {!isSuggestTool && !isDisabled && (
                <div className="absolute top-4 end-4 text-slate-300 dark:text-slate-600 group-hover:text-[var(--primary-500)] transition-colors">
                    {locale === 'fa' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                </div>
            )}
            <div className="mb-2">{tool.icon}</div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{tool.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.description}</p>
        </button>
    );
};


const VetTools: React.FC<VetToolsProps> = ({ onNavigate }) => {
  const { t } = useLocale();
  const tools = getTools(t);
  return (
    <section>
      <h2 className="text-xl font-bold text-start mb-4 text-slate-900 dark:text-slate-100">{t('tools')}</h2>
      <div className="grid grid-cols-2 gap-4">
        {tools.map(tool => (
          <ToolCard 
            key={tool.title} 
            tool={tool} 
            onClick={() => {
                if (tool.navKey === 'suggest-tool') {
                    alert(t('feedbackPrompt'));
                } else if (tool.navKey) {
                    onNavigate(tool.navKey as NavItemKey);
                }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default VetTools;