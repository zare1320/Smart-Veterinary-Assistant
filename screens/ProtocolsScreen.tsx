import React, { useState } from 'react';
import { ArrowLeftIcon, SearchIcon, ArrowRightIcon } from '../components/Icons';
import type { Protocol, ScreenProps } from '../types';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { useLocale } from '../context/LocaleContext';
import { CanineVaccinationContent } from '../components/protocol-content/CanineVaccinationContent';

const commonProtocols: Protocol[] = [
  {
    title: 'Vaccination Protocol for Puppies',
    description: 'A comprehensive guide to the principles and schedules of modern canine vaccination for puppies.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLHKS_aeCW713LBzYhgOSJuYpqQd1P8XwEG0rDxJzzKLxbxeykbPbRuZ6NlP4Ibv3PfhKFcUTd0qzUHYHeZZtZjutQfLbMvP6FYpZ09ji3_xYAsATXVKjuZWdvzcTCn3Z_B8vQud2ezwQ4DUtUx9PtsLbuCqSVnRZw7DONWeLxzPBhrPdf0ny9d5cPt2ahTjDTd0rc9C7k7mKh5GuKlD1uKfATm3YmWKVXVsadoZZSVWOUGtGS04gOtnXuF9XRxU6DRilKPr3JvHZG',
    content: <CanineVaccinationContent />,
  },
  {
    title: 'Feline Leukemia Virus (FeLV) Treatment',
    description: 'Detailed protocol for managing FeLV in cats, including medication and supportive care.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6uaRRAb4kKLzvy8hiaaTVTQUCKCPxJhiwYhX12tARik-wZEPj24vHUfGnWcGCPfnc0Dw-jkFZ3M7wujAqgtqBjwoDn0vRHsgigWFFZU9_llLirlGDHEbXllSQmEj453YEsmiW5nG1hR6quMtRRdk0pvm1N-eJQvW1M96O9uq4cDF6rWG8k2hxrnvAwE37n0UlhMF_OVTyr5i6COdf1KPRsNfLUeO8CElRGLXMyd10JNboqjIyDOLlVHjsHsrvf6qSIGcIcz3gfwYB',
  },
];

const advancedProtocols: Protocol[] = [
    {
        title: 'Canine Parvovirus Treatment',
        description: 'Intensive care protocol for treating parvovirus in dogs, focusing on hydration and symptom management.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8TExjl_urm0kIsn-7swrx4WcVv5KXlMjnLbqbydSeL6sEQLbnw-oQ-TUXFAPgbsrRSPooLz_Tp9UGbbjucLabA6EyimhMKQ0yLUhWc1V-F8CaHjEZmnVDKq5NnxPpEEFxQld_Pq_qkuSZ4gnR-XgCm8w1M_ElDhqyMTnkPrZ-WSMXb3azcTUk9IZKMOXE69RzEd5rw21y9yCBWIsMfq3ZfAexk63PONVgBPdWPU6WJKo9TDH_Mw4JgAydmK91AEEpW-yAckpnxyd',
    },
    {
        title: 'Feline Upper Respiratory Infection (URI) Protocol',
        description: 'Treatment guidelines for managing URI in cats, including antibiotics and supportive care.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93d2X-FUi0XN_JehIrYi26AMh-ZXIOJ7NRy2h7nPGIt0zKdtsPuaY6F7Z00M6yY_jgUhLsI9yvqRDBnOnYkAvC4J0s-oymJXjnuar4OVGvseP8w7g0nME5TxeVQ1v32BKFbbWoH5pknQzaA1u4Zq71fkVHW4afoX-GOrO0sK84HfLnjQeD-FtvI2RFL2e-F_v3RTIpEBJvD2D6n8-vCGYgetRRotqSqMtaw-2gtcyzr3trr1eKSPHqf6wmL_O1OHnFNd9tH35O9z8',
    },
]

interface ProtocolsScreenProps extends ScreenProps {
  onSelectProtocol: (protocol: Protocol) => void;
}

const ProtocolCard: React.FC<{ protocol: Protocol; onSelect: () => void }> = ({ protocol, onSelect }) => (
    <button onClick={onSelect} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
        <div className="p-4 flex items-start gap-4 text-start">
            <div className="flex-1">
                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">{protocol.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal mt-1">{protocol.description}</p>
            </div>
            <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: `url("${protocol.imageUrl}")` }}></div>
        </div>
    </button>
);


const ProtocolsScreen: React.FC<ProtocolsScreenProps> = ({onNavigate, onSelectProtocol}) => {
    const [activeChip, setActiveChip] = useState('All');
    const { effectiveTheme, setThemeSetting } = useTheme();
    const { t, locale } = useLocale();

    const chips = [
        { key: 'All', label: t('chipAll') },
        { key: 'Canine', label: t('chipCanine') },
        { key: 'Feline', label: t('chipFeline') },
        { key: 'Exotic', label: t('chipExotic') },
    ];

    const chipBaseClasses = "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium transition-colors";
    const activeChipClasses = "bg-[var(--primary-500)] text-white font-semibold";
    const inactiveChipClasses = "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700";

    const toggleTheme = () => {
        setThemeSetting(effectiveTheme === 'dark' ? 'light' : 'dark');
    };

  return (
    <div className="text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => onNavigate('home')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em] text-center">{t('protocolsTitle')}</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle isDarkMode={effectiveTheme === 'dark'} onToggle={toggleTheme} />
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute start-4 text-slate-400 dark:text-slate-500 text-lg" />
            <input className="form-input w-full rounded-full border-none bg-slate-200 dark:bg-slate-800 py-3 ps-12 pe-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[var(--primary-500)]" placeholder={t('searchProtocols')} type="search" />
          </div>
        </div>
      </header>
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {chips.map(chip => (
                 <button key={chip.key} onClick={() => setActiveChip(chip.key)} className={`${chipBaseClasses} ${activeChip === chip.key ? activeChipClasses : inactiveChipClasses}`}>{chip.label}</button>
            ))}
        </div>
      </div>
      <main className="px-4 text-start">
        <section className="space-y-4">
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pt-4">{t('protocolsCommon')}</h2>
            {commonProtocols.map(p => <ProtocolCard key={p.title} protocol={p} onSelect={() => onSelectProtocol(p)} />)}
        </section>
        <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">{t('protocolsAdvanced')}</h2>
            {advancedProtocols.map(p => <ProtocolCard key={p.title} protocol={p} onSelect={() => onSelectProtocol(p)} />)}
        </section>
      </main>
    </div>
  );
};

export default ProtocolsScreen;