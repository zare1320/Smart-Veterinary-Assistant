import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, SearchIcon, ArrowRightIcon, PlusIcon, FileMedicalIcon } from '../components/Icons';
import type { Protocol, ScreenProps } from '../types';
import { useLocale } from '../context/LocaleContext';
import { CanineVaccinationContent } from '../components/protocol-content/CanineVaccinationContent';
import { Button } from '../components/Button';

const CUSTOM_PROTOCOLS_KEY = 'vet_custom_protocols';

const commonProtocols: Protocol[] = [
  {
    id: 'canine-vaccination',
    category: 'Canine',
    title: 'Vaccination Protocol for Puppies',
    description: 'A comprehensive guide to the principles and schedules of modern canine vaccination for puppies.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLHKS_aeCW713LBzYhgOSJuYpqQd1P8XwEG0rDxJzzKLxbxeykbPbRuZ6NlP4Ibv3PfhKFcUTd0qzUHYHeZZtZjutQfLbMvP6FYpZ09ji3_xYAsATXVKjuZWdvzcTCn3Z_B8vQud2ezwQ4DUtUx9PtsLbuCqSVnRZw7DONWeLxzPBhrPdf0ny9d5cPt2ahTjDTd0rc9C7k7mKh5GuKlD1uKfATm3YmWKVXVsadoZZSVWOUGtGS04gOtnXuF9XRxU6DRilKPr3JvHZG',
    content: <CanineVaccinationContent />,
  },
  {
    id: 'feline-leukemia',
    category: 'Feline',
    title: 'Feline Leukemia Virus (FeLV) Treatment',
    description: 'Detailed protocol for managing FeLV in cats, including medication and supportive care.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6uaRRAb4kKLzvy8hiaaTVTQUCKCPxJhiwYhX12tARik-wZEPj24vHUfGnWcGCPfnc0Dw-jkFZ3M7wujAqgtqBjwoDn0vRHsgigWFFZU9_llLirlGDHEbXllSQmEj453YEsmiW5nG1hR6quMtRRdk0pvm1N-eJQvW1M96O9uq4cDF6rWG8k2hxrnvAwE37n0UlhMF_OVTyr5i6COdf1KPRsNfLUeO8CElRGLXMyd10JNboqjIyDOLlVHjsHsrvf6qSIGcIcz3gfwYB',
  },
];

const advancedProtocols: Protocol[] = [
    {
        id: 'canine-parvovirus',
        category: 'Canine',
        title: 'Canine Parvovirus Treatment',
        description: 'Intensive care protocol for treating parvovirus in dogs, focusing on hydration and symptom management.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8TExjl_urm0kIsn-7swrx4WcVv5KXlMjnLbqbydSeL6sEQLbnw-oQ-TUXFAPgbsrRSPooLz_Tp9UGbbjucLabA6EyimhMKQ0yLUhWc1V-F8CaHjEZmnVDKq5NnxPpEEFxQld_Pq_qkuSZ4gnR-XgCm8w1M_ElDhqyMTnkPrZ-WSMXb3azcTUk9IZKMOXE69RzEd5rw21y9yCBWIsMfq3ZfAexk63PONVgBPdWPU6WJKo9TDH_Mw4JgAydmK91AEEpW-yAckpnxyd',
    },
    {
        id: 'feline-uri',
        category: 'Feline',
        title: 'Feline Upper Respiratory Infection (URI) Protocol',
        description: 'Treatment guidelines for managing URI in cats, including antibiotics and supportive care.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93d2X-FUi0XN_JehIrYi26AMh-ZXIOJ7NRy2h7nPGIt0zKdtsPuaY6F7Z00M6yY_jgUhLsI9yvqRDBnOnYkAvC4J0s-oymJXjnuar4OVGvseP8w7g0nME5TxeVQ1v32BKFbbWoH5pknQzaA1u4Zq71fkVHW4afoX-GOrO0sK84HfLnjQeD-FtvI2RFL2e-F_v3RTIpEBJvD2D6n8-vCGYgetRRotqSqMtaw-2gtcyzr3trr1eKSPHqf6wmL_O1OHnFNd9tH35O9z8',
    },
]

interface ProtocolsScreenProps extends ScreenProps {
  onSelectProtocol: (protocol: Protocol) => void;
  onAddProtocol: (title: string) => void;
}

const ProtocolCard: React.FC<{ protocol: Protocol; onSelect: () => void }> = ({ protocol, onSelect }) => {
    const { t } = useLocale();
    const categoryLabel = protocol.category === 'Custom' ? t('custom') : t(`chip${protocol.category}`);
    return (
        <button onClick={onSelect} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
            <div className="p-4 flex items-start gap-4 text-start">
                <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${protocol.category === 'Custom' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{categoryLabel}</span>
                    <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight mt-2">{protocol.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal mt-1">{protocol.description}</p>
                </div>
                <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: `url("${protocol.imageUrl}")` }}></div>
            </div>
        </button>
    );
};


const ProtocolsScreen: React.FC<ProtocolsScreenProps> = ({onNavigate, onSelectProtocol, onAddProtocol}) => {
    const [activeChip, setActiveChip] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { t, locale } = useLocale();

    const allProtocols = useMemo(() => {
        const customProtocols: Protocol[] = JSON.parse(localStorage.getItem(CUSTOM_PROTOCOLS_KEY) || '[]');
        return [...commonProtocols, ...advancedProtocols, ...customProtocols];
    }, []);

    const filteredProtocols = useMemo(() => {
        return allProtocols.filter(p => {
            const matchesCategory = activeChip === 'All' || p.category === activeChip;
            const matchesSearch = searchQuery === '' || 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [allProtocols, activeChip, searchQuery]);
    

    const chips = [
        { key: 'All', label: t('chipAll') },
        { key: 'Canine', label: t('chipCanine') },
        { key: 'Feline', label: t('chipFeline') },
        { key: 'Exotic', label: t('chipExotic') },
        { key: 'Custom', label: t('custom') }
    ];

    const chipBaseClasses = "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium transition-colors";
    const activeChipClasses = "bg-[var(--primary-500)] text-white font-semibold";
    const inactiveChipClasses = "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700";

    const showNotFound = filteredProtocols.length === 0 && searchQuery !== '';

  return (
    <div className="text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => onNavigate('home')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em] text-center">{t('protocolsTitle')}</h1>
          <div className="w-10"></div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute start-4 text-slate-400 dark:text-slate-500 text-lg" />
            <input 
              className="form-input w-full rounded-full border-none bg-slate-200 dark:bg-slate-800 py-3 ps-12 pe-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[var(--primary-500)]" 
              placeholder={t('searchProtocols')} 
              type="search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
        {showNotFound ? (
            <div className="text-center py-16">
                 <FileMedicalIcon className="text-6xl text-slate-300 dark:text-slate-700 mx-auto" />
                 <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-slate-200">{t('protocolNotFound')}</h2>
                 <p className="mt-1 text-slate-500 dark:text-slate-400">"{searchQuery}"</p>
                 <Button onClick={() => onAddProtocol(searchQuery)} variant="primary" className="mt-6">
                    <PlusIcon className="me-2"/> {t('addProtocol')}
                 </Button>
            </div>
        ) : (
             <section className="space-y-4 pb-8">
                {filteredProtocols.length > 0 ? (
                  filteredProtocols.map(p => <ProtocolCard key={p.id} protocol={p} onSelect={() => onSelectProtocol(p)} />)
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-10">{t('protocolNotFound')}</p>
                )}
            </section>
        )}
      </main>
    </div>
  );
};

export default ProtocolsScreen;