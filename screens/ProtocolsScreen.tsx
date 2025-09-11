import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SearchIcon, ArrowRightIcon, PlusIcon, FileMedicalIcon } from '../components/Icons';
import type { Protocol } from '../types';
import { useLocale } from '../context/LocaleContext';
import { Button } from '../components/Button';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'framer-motion';
import { ProtocolCardSkeleton } from '../components/skeletons/ProtocolCardSkeleton';
import { EmptyState } from '../components/EmptyState';

// FIX: Replaced inline animation props with variants to fix type errors.
const cardContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const cardButtonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const ProtocolCard: React.FC<{ protocol: Protocol; onSelect: () => void }> = ({ protocol, onSelect }) => {
    const { t } = useLocale();
    const categoryLabel = protocol.category === 'Custom' ? t('custom') : t(`chip${protocol.category}`);
    return (
        <motion.div layout variants={cardContainerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.button 
                onClick={onSelect} 
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full"
                variants={cardButtonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                <div className="p-4 flex items-start gap-4 text-start">
                    <div className="flex-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${protocol.category === 'Custom' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' : 'bg-muted text-muted-foreground'}`}>{categoryLabel}</span>
                        <h3 className="text-heading text-lg font-bold leading-tight mt-2">{protocol.title}</h3>
                        <p className="text-muted-foreground text-sm font-normal leading-normal mt-1">{protocol.description}</p>
                    </div>
                    <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: `url("${protocol.imageUrl}")` }}></div>
                </div>
            </motion.button>
        </motion.div>
    );
};


const ProtocolsScreen: React.FC = () => {
    const [allProtocols, setAllProtocols] = useState<Protocol[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeChip, setActiveChip] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { t, locale } = useLocale();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtocols = async () => {
            setIsLoading(true);
            const protocols = await dataService.getAllProtocols(t);
            setAllProtocols(protocols);
            setIsLoading(false);
        };
        fetchProtocols();
    }, [t]);

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

    const handleAddProtocol = (title: string = '') => {
      navigate('/add-protocol', { state: { initialTitle: title } });
    };

    // FIX: Replaced inline animation props with variants to fix type errors.
    const chipButtonVariants = {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
    };
    
    const renderContent = () => {
        if (isLoading) {
            return <ProtocolCardSkeleton />;
        }
        
        const hasProtocols = allProtocols.length > 0;
        const noResultsForSearch = hasProtocols && filteredProtocols.length === 0 && searchQuery !== '';

        if (noResultsForSearch) {
             return (
                <EmptyState 
                    icon={<FileMedicalIcon className="text-6xl" />}
                    title={t('protocolNotFound')}
                    message={`"${searchQuery}"`}
                    action={{
                        text: t('addProtocol'),
                        onClick: () => handleAddProtocol(searchQuery),
                        icon: <PlusIcon className="me-2"/>
                    }}
                />
             );
        }

        if (filteredProtocols.length > 0) {
            return (
                 <section className="space-y-4 pb-8">
                     <AnimatePresence>
                        {filteredProtocols.map(p => <ProtocolCard key={p.id} protocol={p} onSelect={() => navigate(`/protocols/${p.id}`)} />)}
                     </AnimatePresence>
                </section>
            );
        }
        
        return (
            <EmptyState 
                icon={<FileMedicalIcon className="text-6xl" />}
                title="No Protocols Found"
                message="You haven't added any custom protocols yet. Get started by adding one."
                action={{
                    text: t('addProtocol'),
                    onClick: () => handleAddProtocol(),
                    icon: <PlusIcon className="me-2"/>
                }}
            />
        );
    }

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
                 <motion.button 
                    key={chip.key} 
                    onClick={() => setActiveChip(chip.key)} 
                    className={`${chipBaseClasses} ${activeChip === chip.key ? activeChipClasses : inactiveChipClasses}`}
                    variants={chipButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                 >
                    {chip.label}
                 </motion.button>
            ))}
        </div>
      </div>
      <main className="px-4 text-start">
        {renderContent()}
      </main>
    </div>
  );
};

export default ProtocolsScreen;