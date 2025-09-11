import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SearchIcon, ArrowRightIcon, PlusIcon, FileMedicalIcon } from '../components/Icons';
import type { Protocol } from '../types';
import { useLocale } from '../context/LocaleContext';
import { CanineVaccinationContent } from '../components/protocol-content/CanineVaccinationContent';
import { Button } from '../components/Button';

const CUSTOM_PROTOCOLS_KEY = 'vet_custom_protocols';

const getProtocols = (t: (key: string) => string): Protocol[] => [
  {
    id: 'canine-vaccination',
    category: 'Canine',
    title: t('protocols.canineVaccination.title'),
    description: t('protocols.canineVaccination.description'),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLHKS_aeCW713LBzYhgOSJuYpqQd1P8XwEG0rDxJzzKLxbxeykbPbRuZ6NlP4Ibv3PfhKFcUTd0qzUHYHeZZtZjutQfLbMvP6FYpZ09ji3_xYAsATXVKjuZWdvzcTCn3Z_B8vQud2ezwQ4DUtUx9PtsLbuCqSVnRZw7DONWeLxzPBhrPdf0ny9d5cPt2ahTjDTd0rc9C7k7mKh5GuKlD1uKfATm3YmWKVXVsadoZZSVWOUGtGS04gOtnXuF9XRxU6DRilKPr3JvHZG',
    content: <CanineVaccinationContent />,
  },
  {
    id: 'feline-leukemia',
    category: 'Feline',
    title: t('protocols.felineLeukemia.title'),
    description: t('protocols.felineLeukemia.description'),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6uaRRAb4kKLzvy8hiaaTVTQUCKCPxJhiwYhX12tARik-wZEPj24vHUfGnWcGCPfnc0Dw-jkFZ3M7wujAqgtqBjwoDn0vRHsgigWFFZU9_llLirlGDHEbXllSQmEj453YEsmiW5nG1hR6quMtRRdk0pvm1N-eJQvW1M96O9uq4cDF6rWG8k2hxrnvAwE37n0UlhMF_OVTyr5i6COdf1KPRsNfLUeO8CElRGLXMyd10JNboqjIyDOLlVHjsHsrvf6qSIGcIcz3gfwYB',
  },
    {
        id: 'canine-parvovirus',
        category: 'Canine',
        title: t('protocols.canineParvovirus.title'),
        description: t('protocols.canineParvovirus.description'),
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8TExjl_urm0kIsn-7swrx4WcVv5KXlMjnLbqbydSeL6sEQLbnw-oQ-TUXFAPgbsrRSPooLz_Tp9UGbbjucLabA6EyimhMKQ0yLUhWc1V-F8CaHjEZmnVDKq5NnxPpEEFxQld_Pq_qkuSZ4gnR-XgCm8w1M_ElDhqyMTnkPrZ-WSMXb3azcTUk9IZKMOXE69RzEd5rw21y9yCBWIsMfq3ZfAexk63PONVgBPdWPU6WJKo9TDH_Mw4JgAydmK91AEEpW-yAckpnxyd',
    },
    {
        id: 'feline-uri',
        category: 'Feline',
        title: t('protocols.felineURI.title'),
        description: t('protocols.felineURI.description'),
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93d2X-FUi0XN_JehIrYi26AMh-ZXIOJ7NRy2h7nPGIt0zKdtsPuaY6F7Z00M6yY_jgUhLsI9yvqRDBnOnYkAvC4J0s-oymJXjnuar4OVGvseP8w7g0nME5TxeVQ1v32BKFbbWoH5pknQzaA1u4Zq71fkVHW4afoX-GOrO0sK84HfLnjQeD-FtvI2RFL2e-F_v3RTIpEBJvD2D6n8-vCGYgetRRotqSqMtaw-2gtcyzr3trr1eKSPHqf6wmL_O1OHnFNd9tH35O9z8',
    },
];

const ProtocolCard: React.FC<{ protocol: Protocol; onSelect: () => void }> = ({ protocol, onSelect }) => {
    const { t } = useLocale();
    const categoryLabel = protocol.category === 'Custom' ? t('custom') : t(`chip${protocol.category}`);
    return (
        <button onClick={onSelect} className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
            <div className="p-4 flex items-start gap-4 text-start">
                <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${protocol.category === 'Custom' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' : 'bg-muted text-muted-foreground'}`}>{categoryLabel}</span>
                    <h3 className="text-heading text-lg font-bold leading-tight mt-2">{protocol.title}</h3>
                    <p className="text-muted-foreground text-sm font-normal leading-normal mt-1">{protocol.description}</p>
                </div>
                <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: `url("${protocol.imageUrl}")` }}></div>
            </div>
        </button>
    );
};


const ProtocolsScreen: React.FC = () => {
    const [activeChip, setActiveChip] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { t, locale } = useLocale();
    const navigate = useNavigate();
    const protocols = getProtocols(t);

    const allProtocols = useMemo(() => {
        const customProtocols: Protocol[] = JSON.parse(localStorage.getItem(CUSTOM_PROTOCOLS_KEY) || '[]');
        return [...protocols, ...customProtocols];
    }, [protocols]);

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
    const inactiveChipClasses = "bg-muted text-muted-foreground hover:bg-secondary";

    const showNotFound = filteredProtocols.length === 0 && searchQuery !== '';

    const handleAddProtocol = (title: string) => {
      navigate('/add-protocol', { state: { initialTitle: title } });
    };

  return (
    <div className="text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => navigate('/')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em] text-center text-heading">{t('protocolsTitle')}</h1>
          <div className="w-10"></div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute start-4 text-muted-foreground text-lg" />
            <input 
              className="form-input w-full rounded-full border-none bg-muted py-3 ps-12 pe-4 focus:ring-2 focus:ring-[var(--ring)]" 
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
                 <FileMedicalIcon className="text-6xl text-muted-foreground/30 mx-auto" />
                 <h2 className="mt-4 text-xl font-bold text-heading">{t('protocolNotFound')}</h2>
                 <p className="mt-1 text-muted-foreground">"{searchQuery}"</p>
                 <Button onClick={() => handleAddProtocol(searchQuery)} variant="primary" className="mt-6">
                    <PlusIcon className="me-2"/> {t('addProtocol')}
                 </Button>
            </div>
        ) : (
             <section className="space-y-4 pb-8">
                {filteredProtocols.length > 0 ? (
                  filteredProtocols.map(p => <ProtocolCard key={p.id} protocol={p} onSelect={() => navigate(`/protocols/${p.id}`)} />)
                ) : (
                  <p className="text-center text-muted-foreground py-10">{t('protocolNotFound')}</p>
                )}
            </section>
        )}
      </main>
    </div>
  );
};

export default ProtocolsScreen;