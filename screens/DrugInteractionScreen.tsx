import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { BackButton } from '../components/Button';
import { FlaskIcon, SearchIcon, XMarkIcon, TriangleExclamationIcon } from '../components/Icons';
import { AnimatePresence, motion } from 'framer-motion';

// --- Mock Data (self-contained for this component) ---

interface InteractionDrug {
  id: string;
  name: string;
}

const allInteractionDrugs: InteractionDrug[] = [
  { id: 'meloxicam', name: 'Meloxicam' },
  { id: 'ketoconazole', name: 'Ketoconazole' },
  { id: 'cyclosporine', name: 'Cyclosporine' },
  { id: 'warfarin', name: 'Warfarin' },
  { id: 'amoxicillin', name: 'Amoxicillin' },
  { id: 'ivermectin', name: 'Ivermectin' },
];

type InteractionSeverity = 'Major' | 'Moderate' | 'Minor';

interface Interaction {
  drugs: [string, string]; // array of two drug IDs, sorted alphabetically for easy lookup
  severity: InteractionSeverity;
  summaryKey: string;
  detailKey: string;
}

const interactions: Interaction[] = [
  {
    drugs: ['ketoconazole', 'meloxicam'],
    severity: 'Moderate',
    summaryKey: 'interactions.meloxicamKetoconazole.summary',
    detailKey: 'interactions.meloxicamKetoconazole.detail',
  },
  {
    drugs: ['meloxicam', 'warfarin'],
    severity: 'Major',
    summaryKey: 'interactions.meloxicamWarfarin.summary',
    detailKey: 'interactions.meloxicamWarfarin.detail',
  },
  {
    drugs: ['cyclosporine', 'ketoconazole'],
    severity: 'Major',
    summaryKey: 'interactions.ketoconazoleCyclosporine.summary',
    detailKey: 'interactions.ketoconazoleCyclosporine.detail',
  },
];

// --- Sub-components ---

// FIX: Replaced inline animation props with variants to fix type errors.
const resultCardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const InteractionResultCard: React.FC<{ result: Interaction & { drugNames: [string, string] } }> = ({ result }) => {
    const { t } = useLocale();
    const severityStyles = {
        Major: 'border-red-500/50 bg-red-500/10 text-red-800 dark:text-red-200',
        Moderate: 'border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-200',
        Minor: 'border-sky-500/50 bg-sky-500/10 text-sky-800 dark:text-sky-200',
    };
    const severityTextStyles = {
        Major: 'text-red-600 dark:text-red-400',
        Moderate: 'text-amber-600 dark:text-amber-400',
        Minor: 'text-sky-600 dark:text-sky-400',
    }
    const severityLabel = t(`interactions.severity.${result.severity.toLowerCase()}`);

    return (
        <motion.div 
            className={`p-5 rounded-lg border ${severityStyles[result.severity]}`}
            variants={resultCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
        >
            <div className="flex items-center gap-3">
                <TriangleExclamationIcon className={`text-xl ${severityTextStyles[result.severity]}`} />
                <div>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${severityStyles[result.severity]}`}>{severityLabel}</span>
                    <h3 className="font-bold text-lg mt-1">{result.drugNames.join(' + ')}</h3>
                </div>
            </div>
            <p className="mt-2 text-sm font-semibold leading-relaxed">{t(result.summaryKey)}</p>
            <p className="mt-1 text-sm opacity-80 leading-relaxed">{t(result.detailKey)}</p>
        </motion.div>
    );
};

// --- Main Component ---

const searchResultsVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const selectedDrugVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};


const DrugInteractionScreen: React.FC = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState<InteractionDrug[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    const lowerCaseSearch = searchTerm.toLowerCase();
    return allInteractionDrugs.filter(drug => 
        !selectedDrugs.some(sd => sd.id === drug.id) &&
        drug.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, selectedDrugs]);

  const interactionResults = useMemo(() => {
    const results: (Interaction & {drugNames: [string, string]})[] = [];
    if (selectedDrugs.length < 2) return [];

    for (let i = 0; i < selectedDrugs.length; i++) {
        for (let j = i + 1; j < selectedDrugs.length; j++) {
            const drug1 = selectedDrugs[i];
            const drug2 = selectedDrugs[j];
            const drugPair = [drug1.id, drug2.id].sort() as [string, string];
            const interaction = interactions.find(inter => inter.drugs[0] === drugPair[0] && inter.drugs[1] === drugPair[1]);
            if (interaction) {
                results.push({ ...interaction, drugNames: [drug1.name, drug2.name] });
            }
        }
    }
    return results;
  }, [selectedDrugs]);

  const addDrug = (drug: InteractionDrug) => {
    setSelectedDrugs(prev => [...prev, drug]);
    setSearchTerm('');
    searchInputRef.current?.focus();
  };
  
  const removeDrug = (drugId: string) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== drugId));
  };
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <BackButton onClick={() => navigate('/my-drugs')} />
      </div>
      <header className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
            <FlaskIcon className="w-8 h-8 text-[var(--primary-500)]" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-heading">{t('interactions.title')}</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-sm text-center text-muted-foreground space-y-1">
            <p>{t('interactions.intro1')}</p>
            <p>{t('interactions.intro2')}</p>
        </div>
        
        {/* Search and Selected Drugs Section */}
        <div className="bg-card p-4 sm:p-6">
            <div className="relative">
                <SearchIcon className="search-input-icon" />
                <input
                    ref={searchInputRef}
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('interactions.searchPlaceholder')}
                    className="search-input"
                />
                 <AnimatePresence>
                    {searchResults.length > 0 && (
                        <motion.ul 
                            className="absolute top-full mt-2 w-full bg-card rounded-lg shadow-lg border-border z-10 max-h-60 overflow-y-auto"
                            variants={searchResultsVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {searchResults.map(drug => (
                                <li key={drug.id}>
                                    <button onClick={() => addDrug(drug)} className="w-full text-start px-4 py-2 hover:bg-muted transition-colors">
                                        {drug.name}
                                    </button>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
            <div className="mt-4">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2 text-start">{t('interactions.selectedDrugs')}</h2>
                <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                        {selectedDrugs.map(drug => (
                            <motion.div 
                                key={drug.id}
                                className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-semibold"
                                variants={selectedDrugVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                layout
                            >
                                <span>{drug.name}</span>
                                <button onClick={() => removeDrug(drug.id)} className="text-[var(--primary-500)] hover:text-red-500 dark:hover:text-red-400">
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {selectedDrugs.length < 2 && (
                    <p className="text-center text-sm text-muted-foreground mt-4">{t('interactions.noDrugsSelected')}</p>
                )}
            </div>
        </div>

        {/* Results Section */}
        {selectedDrugs.length >= 2 && (
             <div className="space-y-4">
                <h2 className="text-xl font-bold text-start text-heading">{t('interactions.resultsTitle')}</h2>
                {interactionResults.length > 0 ? (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {interactionResults.map(result => (
                                <InteractionResultCard key={result.drugs.join('-')} result={result} />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center p-6 bg-emerald-500/10 rounded-lg">
                        <p className="font-semibold text-emerald-800 dark:text-emerald-200">{t('interactions.noInteractions')}</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default DrugInteractionScreen;