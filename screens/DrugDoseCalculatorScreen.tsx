import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { usePatientStore } from '../stores/usePatientStore';
import type { Drug, DrugFormulation, DrugDosage, DrugCategory } from '../types';
import { dataService } from '../services/dataService';
import { PillIcon, SearchIcon } from '../components/Icons';
import { LabeledSelect } from '../components/forms';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '../components/Button';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import PatientInfoDisplay from '../components/PatientInfoDisplay';
import { DrugCategorySkeleton, DrugListSkeleton } from '../components/skeletons/DrugListSkeleton';
import { EmptyState } from '../components/EmptyState';

const speciesGroupMap: { [key: string]: string[] } = {
    dog: ['dog', 'dog_cat'],
    cat: ['cat', 'dog_cat'],
    bird: ['Birds', 'Raptors', 'Parrots', 'Pigeons', 'Waterfowl', 'Passerines'],
    mammal: ['Ferrets', 'Rabbits', 'Primates', 'Sugar gliders', 'Hedgehogs', 'Rats, Mice', 'Rodents', 'Contraindicated Rodents'],
    reptile: ['Reptiles', 'Chelonians'],
    fish: ['Fish'],
    amphibian: ['Amphibians'],
};

// Helper to format the drug formulation description
const formatFormulationDescription = (formulation: DrugFormulation, t: (key: string) => string, localizeNumber: (s: string | number) => string) => {
    const { strength, strengthUnit, volume, volumeUnit, form } = formulation;

    const formKey = `drugCalculator.simpleForm.${form === 'injectable' ? 'injection' : form}`;
    const translatedForm = t(formKey);
    
    let strengthDisplay = '';

    if (volume && volumeUnit) {
        // This is for concentrations like mg/5ml
        const unitPart = t(`units.${volumeUnit.toLowerCase()}`);
        const strengthUnitPart = t(`units.${strengthUnit.toLowerCase()}`);
        strengthDisplay = `${localizeNumber(strength)} ${strengthUnitPart}/${localizeNumber(volume)} ${unitPart}`;
    } else {
        // This is for simple units like mg for tablets, capsules, sachets
        const unitPart = t(`units.${strengthUnit.toLowerCase()}`);
        strengthDisplay = `${localizeNumber(strength)} ${unitPart}`;
    }
    
    return `${translatedForm} ${strengthDisplay}`;
};

const CalculatorPanel: React.FC<{ drug: Drug; weightKg: number; speciesKey: string | null }> = ({ drug, weightKg, speciesKey }) => {
    const { t, locale, localizeNumber } = useLocale();

    // State
    const [selectedFormulationId, setSelectedFormulationId] = useState<string>('');
    const [dosePerKg, setDosePerKg] = useState<number>(0);

    // Derived State
    const selectedFormulation = useMemo(() => {
        return drug.formulations.find(f => f.id === selectedFormulationId);
    }, [drug.formulations, selectedFormulationId]);

    const relevantDosage = useMemo(() => {
        if (!speciesKey || !selectedFormulation) return null;

        const speciesInGroup = speciesGroupMap[speciesKey];
        if (!speciesInGroup) return null;

        const formType = selectedFormulation.form;
        const isOral = formType === 'tablet' || formType === 'suspension' || formType === 'capsule' || formType === 'sachet';
        const isInjectable = formType === 'injectable';
        
        const filterByRoute = (d: DrugDosage) => {
            if (!d.route) return false;
            const route = d.route.toUpperCase();
            const routeMatch = (isOral && route.includes('PO')) || 
                               (isInjectable && (route.includes('IM') || route.includes('IV') || route.includes('SC')));
            const isSpecialOral = isOral && (route.includes('FEED') || route.includes('WATER'));
            return routeMatch || isSpecialOral;
        };

        const dosagesForFormulation = drug.dosages.filter(filterByRoute);

        const exactMatch = dosagesForFormulation.find(d => d.species.toLowerCase() === speciesKey.toLowerCase());
        if (exactMatch) return exactMatch;

        const groupMatch = dosagesForFormulation.find(d => speciesInGroup.some(s => d.species.toLowerCase().includes(s.toLowerCase())));
        return groupMatch || null;

    }, [drug.dosages, speciesKey, selectedFormulation]);

    // Effects
    useEffect(() => {
        if (drug) {
            setSelectedFormulationId(drug.formulations[0]?.id || '');
        }
    }, [drug]);
    
    useEffect(() => {
        if (relevantDosage?.doseRange) {
            setDosePerKg(relevantDosage.doseRange.min);
        } else {
            setDosePerKg(0);
        }
    }, [relevantDosage]);

    const { totalDoseMg, amountToAdminister } = useMemo(() => {
        if (!weightKg || !dosePerKg || !selectedFormulation) {
            return { totalDoseMg: null, amountToAdminister: null };
        }
        
        const totalDose = dosePerKg * weightKg;
        
        let amount: number | null = null;
        let unit = '';

        if (selectedFormulation.form === 'tablet' || selectedFormulation.form === 'capsule' || selectedFormulation.form === 'sachet') {
            amount = totalDose / selectedFormulation.strength;
            if (selectedFormulation.form === 'tablet') unit = t('units.tablet');
            else if (selectedFormulation.form === 'capsule') unit = t('units.capsule');
            else unit = t('units.sachet');
        } else if (selectedFormulation.form === 'suspension' || selectedFormulation.form === 'injectable') {
            const concentration = selectedFormulation.strength / (selectedFormulation.volume || 1);
            if (concentration > 0) {
                amount = totalDose / concentration;
                unit = t('units.ml');
            }
        }

        return {
            totalDoseMg: localizeNumber(totalDose.toFixed(2)),
            amountToAdminister: amount ? `${localizeNumber(amount.toFixed(2))} ${unit}` : null
        };
    }, [weightKg, dosePerKg, selectedFormulation, t, localizeNumber]);

    return (
        <div className="p-6 space-y-6 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-heading text-start">{drug.name[locale as keyof typeof drug.name]}</h3>
            
            <div className="flex-grow space-y-4">
                <LabeledSelect label={t('drugCalculator.formulation')} id="formulation" value={selectedFormulationId} onChange={e => setSelectedFormulationId(e.target.value)}>
                    {drug.formulations.map(f => <option key={f.id} value={f.id}>{formatFormulationDescription(f, t, localizeNumber)}</option>)}
                </LabeledSelect>
                
                {relevantDosage ? (
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="w-full sm:w-auto flex-grow">
                                <input
                                    id="dosePerKg"
                                    type="number"
                                    value={String(dosePerKg)}
                                    onChange={(e) => setDosePerKg(Number(e.target.value))}
                                    min={relevantDosage.doseRange?.min}
                                    max={relevantDosage.doseRange?.max}
                                    step="0.1"
                                    className="form-input text-center w-full"
                                    aria-label={t('drugCalculator.dosePerKg')}
                                />
                            </div>
                            <div className="flex items-center gap-2 justify-end shrink-0 text-end">
                                <label htmlFor="dosePerKg" className="block text-sm font-medium text-foreground/80 whitespace-nowrap">
                                    {t('drugCalculator.rangeRoute')}
                                </label>
                                <div className="text-xs text-foreground/70 whitespace-nowrap" dir="ltr">
                                     ({localizeNumber(relevantDosage.doseRange?.min || 0)} - {localizeNumber(relevantDosage.doseRange?.max || 0)}) {relevantDosage.unit} {relevantDosage.route && `(${relevantDosage.route})`}
                                </div>
                            </div>
                        </div>

                        {relevantDosage.note && (
                            <p className="text-sm text-foreground/70 p-2 bg-black/5 dark:bg-white/5 rounded-md text-start whitespace-pre-wrap">
                                {t(relevantDosage.note)}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="text-center p-4 bg-yellow-400/10 rounded-lg text-yellow-800 dark:text-yellow-200">
                        {t('drugCalculator.noDoseForSpecies')}
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl p-4 text-white shadow-lg shadow-sky-500/30 text-center">
                    <p className="text-sm opacity-80">{t('drugCalculator.amountToAdminister')}</p>
                    <p className="text-3xl font-bold font-mono">{amountToAdminister || '---'}</p>
                </div>
                 <div className="bg-gradient-to-br from-[#2DD4BF] to-[#29a594] rounded-2xl p-4 text-white shadow-lg shadow-[#2DD4BF]/30 text-center">
                    <p className="text-sm opacity-80">{t('drugCalculator.totalDose')}</p>
                    <p className="text-3xl font-bold font-mono">{totalDoseMg || '---'} <span className="text-lg opacity-80">mg</span></p>
                </div>
            </div>
        </div>
    );
};

const DrugDoseCalculatorScreen: React.FC = () => {
    const { t, locale } = useLocale();
    const navigate = useNavigate();
    const { species, weightInKg } = usePatientStore(state => ({ species: state.species, weightInKg: state.weightInKg }));
    const [allDrugs, setAllDrugs] = useState<Drug[]>([]);
    const [drugCategories, setDrugCategories] = useState<DrugCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategoryId, setActiveCategoryId] = useState('all');
    const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [drugs, categories] = await Promise.all([
                dataService.getAllDrugs(),
                dataService.getDrugCategories()
            ]);
            setAllDrugs(drugs);
            setDrugCategories(categories);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const speciesKeyMap: { [key: string]: string } = {
        [t('speciesCat')]: 'cat',
        [t('speciesDog')]: 'dog',
        [t('speciesBird')]: 'bird',
        [t('speciesMammal')]: 'mammal',
        [t('speciesReptile')]: 'reptile',
        [t('speciesFish')]: 'fish',
        [t('speciesAmphibian')]: 'amphibian',
    };
    const patientSpeciesKey = species ? speciesKeyMap[species] : null;

    const filteredDrugs = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return allDrugs.filter(drug => {
            const inCategory = activeCategoryId === 'all' || drug.categoryId === activeCategoryId;
            const matchesSearch = query === '' ||
                drug.name.en.toLowerCase().includes(query) ||
                drug.name.fa.toLowerCase().includes(query) ||
                drug.brandNames.some(b => b.toLowerCase().includes(query));
            return inCategory && matchesSearch;
        });
    }, [searchQuery, activeCategoryId, locale, allDrugs]);
    
    const selectedDrug = useMemo(() => {
        return allDrugs.find(d => d.id === selectedDrugId) || null;
    }, [selectedDrugId, allDrugs]);
    
    const hasWeight = weightInKg && weightInKg > 0;

    return (
        <>
            {!hasWeight && <MissingPatientWeightBanner />}
            <div className="container mx-auto p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <BackButton onClick={() => navigate('/')} />
                    <PatientInfoDisplay />
                </div>
                <header className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-heading">{t('drugCalculator.title')}</h2>
                </header>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${!hasWeight ? 'opacity-50 pointer-events-none' : ''}`}>
                    {/* Left Panel: Drug List */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="search-input-container">
                            <SearchIcon className="search-input-icon" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('drugCalculator.searchPlaceholder')}
                                className="search-input"
                            />
                        </div>
                        {isLoading ? (
                            <DrugCategorySkeleton />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => setActiveCategoryId('all')} className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${activeCategoryId === 'all' ? 'bg-[var(--primary-500)] text-white' : 'bg-muted hover:bg-secondary'}`}>{t('drugCalculator.allCategories')}</button>
                                {drugCategories.map(cat => (
                                    <button key={cat.id} onClick={() => setActiveCategoryId(cat.id)} className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${activeCategoryId === cat.id ? 'bg-[var(--primary-500)] text-white' : 'bg-muted hover:bg-secondary'}`}>{cat.name[locale as keyof typeof cat.name]}</button>
                                ))}
                            </div>
                        )}
                        {isLoading ? (
                            <DrugListSkeleton />
                        ) : (
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                               <AnimatePresence>
                               {filteredDrugs.length > 0 ? filteredDrugs.map(drug => (
                                   <motion.div
                                        key={drug.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                   >
                                       <div
                                            onClick={() => setSelectedDrugId(drug.id)}
                                            className={`w-full text-start p-3 rounded-lg transition-all duration-200 cursor-pointer border ${selectedDrugId === drug.id ? 'bg-secondary border-[var(--primary-500)]' : 'bg-muted/50 border-transparent hover:border-border'}`}
                                       >
                                           <h4 className="font-bold text-foreground">{drug.name[locale as keyof typeof drug.name]}</h4>
                                           <p className="text-xs text-muted-foreground" dir="ltr">{drug.brandNames.join(', ')}</p>
                                       </div>
                                   </motion.div>
                               )) : (
                                   <EmptyState icon={<PillIcon className="text-4xl" />} title={t('drugCalculator.notFound')} message="Try adjusting your search or category filters." />
                               )}
                               </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Calculator */}
                    <div className="md:col-span-2 glass-card min-h-[400px]">
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDrugId || 'prompt'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                {selectedDrug ? (
                                    <CalculatorPanel drug={selectedDrug} weightKg={weightInKg || 0} speciesKey={patientSpeciesKey} />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                        <PillIcon className="text-6xl text-foreground/20" />
                                        <p className="mt-4 text-lg font-medium text-muted-foreground">{t('drugCalculator.selectDrugPrompt')}</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrugDoseCalculatorScreen;
