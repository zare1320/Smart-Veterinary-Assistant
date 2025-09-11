import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SyringeIcon, FluidIcon, HeartPulseIcon, BloodIcon, CakeIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { useLocale } from '../context/LocaleContext';

type SpecialKey = 'suggest-tool';

interface Tool {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string | SpecialKey | null;
}

const getTools = (t: (key: string) => string): Tool[] => [
    {
        title: t('drugDoseCalculator'),
        description: t('drugDoseDesc'),
        icon: <SyringeIcon className="text-2xl text-[var(--primary-500)]" />,
        path: '/calculators/drug-dose',
    },
    {
        title: t('fluidTherapyCalculator'),
        description: t('fluidTherapyDesc'),
        icon: <FluidIcon className="text-2xl text-[var(--primary-500)]" />,
        path: '/calculators/fluid-therapy',
    },
    {
        title: t('bloodPressureCalculator'),
        description: t('bloodPressureDesc'),
        icon: <HeartPulseIcon className="text-2xl text-red-500" />,
        path: '/calculators/blood-pressure',
    },
    {
        title: t('bloodTransfusionCalculator'),
        description: t('bloodTransfusionDesc'),
        icon: <BloodIcon className="text-2xl text-red-500" />,
        path: '/calculators/blood-transfusion',
    },
    {
        title: t('petAgeCalculator'),
        description: t('petAgeDesc'),
        icon: <CakeIcon className="text-2xl text-[var(--primary-500)]" />,
        path: '/calculators/pet-age',
    }
];

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => {
    const { locale } = useLocale();
    const isSuggestTool = tool.path === 'suggest-tool';
    const isDisabled = !tool.path;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="relative group bg-card rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-square disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-md disabled:hover:translate-y-0"
            aria-label={tool.title}
        >
            {!isSuggestTool && !isDisabled && (
                <div className="absolute top-4 end-4 text-muted-foreground/50 group-hover:text-[var(--primary-500)] transition-colors">
                    {locale === 'fa' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                </div>
            )}
            <div className="mb-2">{tool.icon}</div>
            <h3 className="font-bold text-sm text-heading">{tool.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
        </button>
    );
};


const VetTools: React.FC = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const tools = getTools(t);
  return (
    <section>
      <h2 className="text-xl font-bold text-start mb-4 text-heading">{t('tools')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map(tool => (
          <ToolCard 
            key={tool.title} 
            tool={tool} 
            onClick={() => {
                if (tool.path === 'suggest-tool') {
                    alert(t('feedbackPrompt'));
                } else if (tool.path) {
                    navigate(tool.path);
                }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default VetTools;