import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { BackButton, Button } from '../components/Button';
import { CookieBiteIcon, ScaleIcon, LeafIcon, CandyCaneIcon, SkullIcon, TriangleExclamationIcon, DogIcon, CatIcon, CircleQuestionIcon, InfoCircleIcon, SearchIcon, SmileIcon, ExternalLinkIcon } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { usePatientStore } from '../stores/usePatientStore';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import PatientInfoDisplay from '../components/PatientInfoDisplay';
import InfoModal from '../components/InfoModal';
import AccordionItem from '../components/AccordionItem';
import type { Plant } from '../types';
import { dataService } from '../services/dataService';
import { PlantListSkeleton } from '../components/skeletons/PlantListSkeleton';

// --- TYPE DEFINITIONS ---
type ToxinTab = 'chocolate' | 'rodenticides' | 'xylitol' | 'plants';
type ComponentSpecies = 'dog' | 'cat';
type ToxicityLevel = 'safe' | 'mild' | 'moderate' | 'severe';

interface ChocolateType {
    id: string;
    nameKey: string;
    imageUrl: string;
    theobromine: number; // mg/g
    caffeine: number;    // mg/g
}

interface RodenticideType {
    id: string;
    nameKey: string;
    concentration: number; // e.g., 0.00025 for 0.025%
    categoryKey: string;
}

interface ToxicityResult {
    dose: number;
    level: ToxicityLevel;
    notesKey: string;
}

// --- DATA ---
const CHOCOLATE_TYPES: ChocolateType[] = [
    { id: 'white', nameKey: 'toxicity.chocolate.types.white', imageUrl: 'https://i.postimg.cc/44N0JpLp/white-chocolate.jpg', theobromine: 0.01, caffeine: 0.01 },
    { id: 'milk', nameKey: 'toxicity.chocolate.types.milk', imageUrl: 'https://i.postimg.cc/13YqK5b0/milk-chocolate.jpg', theobromine: 2, caffeine: 0.2 },
    { id: 'dark', nameKey: 'toxicity.chocolate.types.dark', imageUrl: 'https://i.postimg.cc/J0vHq92n/dark-chocolate.jpg', theobromine: 5.5, caffeine: 0.8 },
    { id: 'semisweet', nameKey: 'toxicity.chocolate.types.semisweet', imageUrl: 'https://i.postimg.cc/pT3Y3gfr/semisweet-chocolate.jpg', theobromine: 9, caffeine: 1 },
    { id: 'bakers', nameKey: 'toxicity.chocolate.types.bakers', imageUrl: 'https://i.postimg.cc/k47tVqjP/baking-chocolate.jpg', theobromine: 16, caffeine: 1.5 },
    { id: 'dry_cocoa', nameKey: 'toxicity.chocolate.types.dry_cocoa', imageUrl: 'https://i.postimg.cc/y8B65V7T/cocoa-powder.jpg', theobromine: 26, caffeine: 2.3 },
    { id: 'instant_cocoa', nameKey: 'toxicity.chocolate.types.instant_cocoa', imageUrl: 'https://i.postimg.cc/y8B65V7T/cocoa-powder.jpg', theobromine: 1.5, caffeine: 0.15 },
    { id: 'cocoa_beans', nameKey: 'toxicity.chocolate.types.cocoa_beans', imageUrl: 'https://i.postimg.cc/k5zN3KqD/cocoa-beans.jpg', theobromine: 20, caffeine: 2 },
    { id: 'coffee_beans', nameKey: 'toxicity.chocolate.types.coffee_beans', imageUrl: 'https://i.postimg.cc/50tZ7qgR/coffee-beans.jpg', theobromine: 1, caffeine: 15 },
    { id: 'cocoa_hulls', nameKey: 'toxicity.chocolate.types.cocoa_hulls', imageUrl: 'https://i.postimg.cc/8P2G9jC4/cocoa-mulch.jpg', theobromine: 6, caffeine: 0.5 },
];

const RODENTICIDE_TYPES: RodenticideType[] = [
    { id: 'bromethalin_001', nameKey: 'toxicity.rodenticides.types.bromethalin_001', concentration: 0.0001, categoryKey: 'toxicity.rodenticides.categories.bromethalin' },
    { id: 'bromethalin_0025', nameKey: 'toxicity.rodenticides.types.bromethalin_0025', concentration: 0.00025, categoryKey: 'toxicity.rodenticides.categories.bromethalin' },
    { id: 'cholecalciferol', nameKey: 'toxicity.rodenticides.types.cholecalciferol', concentration: 0.00075, categoryKey: 'toxicity.rodenticides.categories.vitamin_d3' },
    { id: 'difethialone_00025', nameKey: 'toxicity.rodenticides.types.difethialone_00025', concentration: 0.000025, categoryKey: 'toxicity.rodenticides.categories.second_gen' },
    { id: 'brodifacoum_0005', nameKey: 'toxicity.rodenticides.types.brodifacoum_0005', concentration: 0.00005, categoryKey: 'toxicity.rodenticides.categories.second_gen' },
    { id: 'bromadiolone_0005', nameKey: 'toxicity.rodenticides.types.bromadiolone_0005', concentration: 0.00005, categoryKey: 'toxicity.rodenticides.categories.second_gen' },
    { id: 'diphacinone_0005', nameKey: 'toxicity.rodenticides.types.diphacinone_0005', concentration: 0.00005, categoryKey: 'toxicity.rodenticides.categories.second_gen' },
    { id: 'chlorphacinone_0005', nameKey: 'toxicity.rodenticides.types.chlorphacinone_0005', concentration: 0.00005, categoryKey: 'toxicity.rodenticides.categories.second_gen' },
    { id: 'warfarin_0025', nameKey: 'toxicity.rodenticides.types.warfarin_0025', concentration: 0.00025, categoryKey: 'toxicity.rodenticides.categories.first_gen' },
];


const TOXICITY_LEVELS: Record<string, Record<ToxicityLevel, { minDose: number; notesKey: string; color: string; gaugeColor: string }>> = {
    chocolate: {
        safe: { minDose: 0, notesKey: 'toxicity.chocolate.results.symptoms.safe', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', gaugeColor: 'var(--primary-500)' },
        mild: { minDose: 20, notesKey: 'toxicity.chocolate.results.symptoms.mild', color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30', gaugeColor: '#f59e0b' },
        moderate: { minDose: 40, notesKey: 'toxicity.chocolate.results.symptoms.moderate', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30', gaugeColor: '#f97316' },
        severe: { minDose: 60, notesKey: 'toxicity.chocolate.results.symptoms.severe', color: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30', gaugeColor: '#ef4444' },
    },
    rodenticide: {
        safe: { minDose: 0, notesKey: 'toxicity.rodenticides.results.notes.safe', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', gaugeColor: 'var(--primary-500)' },
        mild: { minDose: 0.01, notesKey: 'toxicity.rodenticides.results.notes.mild', color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30', gaugeColor: '#f59e0b' },
        moderate: { minDose: 0.5, notesKey: 'toxicity.rodenticides.results.notes.moderate', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30', gaugeColor: '#f97316' },
        severe: { minDose: 2.5, notesKey: 'toxicity.rodenticides.results.notes.severe', color: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30', gaugeColor: '#ef4444' },
    }
};

// --- UI SUB-COMPONENTS ---
const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; className?: string; step: number; infoAction?: () => void; }> = ({ title, children, icon, className, step, infoAction }) => (
    <div className={`bg-card p-4 sm:p-6 text-start ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold text-lg">{step}</div>
            <h2 className="text-lg font-bold text-heading flex-grow">{title}</h2>
            {infoAction && (
                <button onClick={infoAction} aria-label={`More info about ${title}`}>
                    <InfoCircleIcon className="text-muted-foreground text-xl" />
                </button>
            )}
        </div>
        {children}
    </div>
);


const ToxicityCalculatorScreen: React.FC = () => {
    const { t, localizeNumber } = useLocale();
    const navigate = useNavigate();
    const { species: patientSpecies, weightInKg: patientWeight } = usePatientStore();

    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState<ToxinTab>('xylitol');
    const hasWeight = patientWeight && patientWeight > 0;

    const [isRodenticideInfoModalOpen, setIsRodenticideInfoModalOpen] = useState(false);
    const [isChocolateInfoModalOpen, setIsChocolateInfoModalOpen] = useState(false);
    const [isXylitolInfoModalOpen, setIsXylitolInfoModalOpen] = useState(false);

    // Chocolate state
    const [chocolateTypeId, setChocolateTypeId] = useState(CHOCOLATE_TYPES[1].id);
    const [chocolateAmountGrams, setChocolateAmountGrams] = useState('');
    const [displayChocolateAmountOz, setDisplayChocolateAmountOz] = useState('');
    const [chocolateResult, setChocolateResult] = useState<ToxicityResult | null>(null);
    // Rodenticide state
    const [rodenticideTypeId, setRodenticideTypeId] = useState(RODENTICIDE_TYPES[0].id);
    const [rodenticideAmountGrams, setRodenticideAmountGrams] = useState('');
    const [displayRodenticideAmountOz, setDisplayRodenticideAmountOz] = useState('');
    const [rodenticideResult, setRodenticideResult] = useState<ToxicityResult | null>(null);
     // Xylitol state
    const [mgPerServing, setMgPerServing] = useState('');
    const [gramsPerServing, setGramsPerServing] = useState('');
    const [servings, setServings] = useState('');
    const [xylitolResult, setXylitolResult] = useState<{ dose: number; level: 'safe' | 'hypoglycemia' | 'liver_failure' } | null>(null);
    // Plants state
    const [allPlants, setAllPlants] = useState<Plant[]>([]);
    const [plantSearchQuery, setPlantSearchQuery] = useState('');
    const [isPlantsLoading, setIsPlantsLoading] = useState(true);
    
    useEffect(() => {
        if (activeTab === 'plants' && allPlants.length === 0) {
            setIsPlantsLoading(true);
            dataService.getPoisonousPlants().then(data => {
                setAllPlants(data);
                setIsPlantsLoading(false);
            });
        }
    }, [activeTab, allPlants.length]);


    // --- DERIVED VALUES ---
    const speciesKeyMap = useMemo(() => ({ [t('speciesCat')]: 'cat', [t('speciesDog')]: 'dog' }), [t]);
    const componentSpecies = useMemo(() => patientSpecies ? speciesKeyMap[patientSpecies] as ComponentSpecies : null, [patientSpecies, speciesKeyMap]);
    const G_TO_OZ = 0.035274;

    const groupedRodenticides = useMemo(() => {
        const groups: { [key: string]: RodenticideType[] } = {};
        RODENTICIDE_TYPES.forEach(item => {
            const category = item.categoryKey || 'uncategorized';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
        });
        return Object.entries(groups);
    }, []);

    const filteredPlants = useMemo(() => {
        if (!plantSearchQuery) return allPlants;
        const query = plantSearchQuery.toLowerCase();
        return allPlants.filter(plant =>
            plant.name.toLowerCase().includes(query) ||
            plant.commonNames.some(name => name.toLowerCase().includes(query)) ||
            plant.scientificName.toLowerCase().includes(query)
        );
    }, [allPlants, plantSearchQuery]);

    // --- HANDLERS for synced inputs ---
    const handleAmountChange = (val: string, unit: 'g' | 'oz', setterGrams: React.Dispatch<React.SetStateAction<string>>, setterOz: React.Dispatch<React.SetStateAction<string>>) => {
        const numVal = parseFloat(val);
        if (unit === 'g') {
            setterGrams(val);
            setterOz(isNaN(numVal) ? '' : (numVal * G_TO_OZ).toFixed(2));
        } else {
            setterOz(val);
            setterGrams(isNaN(numVal) ? '' : (numVal / G_TO_OZ).toFixed(1));
        }
    };
    
    // --- CALCULATION LOGIC ---
    useEffect(() => {
        // Chocolate Calculation
        const chocAmount = parseFloat(chocolateAmountGrams);
        const chocolate = CHOCOLATE_TYPES.find(c => c.id === chocolateTypeId);
        if (!patientWeight || patientWeight <= 0 || !chocAmount || chocAmount <= 0 || !chocolate) {
            setChocolateResult(null);
        } else {
            const totalMethylxanthines = (chocAmount * chocolate.theobromine) + (chocAmount * chocolate.caffeine);
            const dose = totalMethylxanthines / patientWeight;
            let level: ToxicityLevel = 'safe';
            if (dose >= TOXICITY_LEVELS.chocolate.severe.minDose) level = 'severe';
            else if (dose >= TOXICITY_LEVELS.chocolate.moderate.minDose) level = 'moderate';
            else if (dose >= TOXICITY_LEVELS.chocolate.mild.minDose) level = 'mild';
            setChocolateResult({ dose, level, notesKey: TOXICITY_LEVELS.chocolate[level].notesKey });
        }
    }, [patientWeight, chocolateAmountGrams, chocolateTypeId]);

    useEffect(() => {
        // Rodenticide Calculation
        const rodentAmount = parseFloat(rodenticideAmountGrams);
        const rodenticide = RODENTICIDE_TYPES.find(r => r.id === rodenticideTypeId);
        if (!patientWeight || patientWeight <= 0 || !rodentAmount || rodentAmount <= 0 || !rodenticide) {
            setRodenticideResult(null);
        } else {
            const totalToxinMg = rodentAmount * 1000 * rodenticide.concentration;
            const dose = totalToxinMg / patientWeight;
            // Note: Rodenticide thresholds are more complex in reality. This is a simplified model.
            let level: ToxicityLevel = 'safe';
            if (dose >= TOXICITY_LEVELS.rodenticide.severe.minDose) level = 'severe';
            else if (dose >= TOXICITY_LEVELS.rodenticide.moderate.minDose) level = 'moderate';
            else if (dose >= TOXICITY_LEVELS.rodenticide.mild.minDose) level = 'mild';
            setRodenticideResult({ dose, level, notesKey: TOXICITY_LEVELS.rodenticide[level].notesKey });
        }
    }, [patientWeight, rodenticideAmountGrams, rodenticideTypeId]);

    useEffect(() => {
        // Xylitol Calculation
        const weight = patientWeight;
        const mg = parseFloat(mgPerServing);
        const numServings = parseFloat(servings);
    
        if (weight && weight > 0 && mg > 0 && numServings > 0) {
            const totalMg = mg * numServings;
            const dose = totalMg / weight; // mg/kg
            const doseGrams = dose / 1000; // g/kg
    
            let level: 'safe' | 'hypoglycemia' | 'liver_failure' = 'safe';
            if (doseGrams > 0.5) {
                level = 'liver_failure';
            } else if (doseGrams > 0.1) {
                level = 'hypoglycemia';
            }
            setXylitolResult({ dose, level });
        } else {
            setXylitolResult(null);
        }
    }, [patientWeight, mgPerServing, servings]);


    const TABS = [
        { id: 'chocolate', labelKey: 'toxicity.tabs.chocolate', icon: <CookieBiteIcon className="text-xl" /> },
        { id: 'rodenticides', labelKey: 'toxicity.tabs.rodenticides', icon: <SkullIcon className="text-xl" /> },
        { id: 'xylitol', labelKey: 'toxicity.tabs.xylitol', icon: <CandyCaneIcon className="text-xl" /> },
        { id: 'plants', labelKey: 'toxicity.tabs.plants', icon: <LeafIcon className="text-xl" /> },
    ];
    
    // --- RENDER FUNCTIONS ---
    const renderChocolateTab = () => {
        const selectedChocolate = CHOCOLATE_TYPES.find(c => c.id === chocolateTypeId);
        return (
            <div className="space-y-6">
                 <Section icon={<CookieBiteIcon />} title={t('toxicity.chocolate.section2Title')} step={1}>
                    <label className="block text-sm font-medium mb-1 text-start">{t('toxicity.chocolate.chocolate')}</label>
                    <select value={chocolateTypeId} onChange={e => setChocolateTypeId(e.target.value)} className="form-input w-full">
                        {CHOCOLATE_TYPES.map(choc => <option key={choc.id} value={choc.id}>{t(choc.nameKey)}</option>)}
                    </select>
                </Section>
                 <Section icon={<ScaleIcon />} title={t('toxicity.chocolate.section3Title')} step={2}>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" value={displayChocolateAmountOz} onChange={e => handleAmountChange(e.target.value, 'oz', setChocolateAmountGrams, setDisplayChocolateAmountOz)} className="form-input w-full" placeholder={t('toxicity.chocolate.ouncesIngested')} />
                        <input type="number" value={chocolateAmountGrams} onChange={e => handleAmountChange(e.target.value, 'g', setChocolateAmountGrams, setDisplayChocolateAmountOz)} className="form-input w-full" placeholder={t('toxicity.chocolate.gramsIngested')} />
                    </div>
                </Section>
                <div className="bg-card p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-heading mb-4 text-start flex items-center gap-2"><TriangleExclamationIcon/> {t('toxicity.chocolate.section4Title')}</h2>
                    {chocolateResult ? (
                        <div className="space-y-4">
                            {selectedChocolate && <img src={selectedChocolate.imageUrl} alt={t(selectedChocolate.nameKey)} className="w-full h-32 object-cover rounded-lg shadow-inner" />}
                            <div className={`p-4 rounded-lg border text-start ${TOXICITY_LEVELS.chocolate[chocolateResult.level].color}`}>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg uppercase">{t(`toxicity.chocolate.results.level.${chocolateResult.level}`)}</span>
                                    <span className="font-mono font-bold text-lg">{localizeNumber(chocolateResult.dose.toFixed(1))} mg/kg</span>
                                </div>
                                <p className="text-sm mt-2">{t(chocolateResult.notesKey)}</p>
                            </div>
                            {componentSpecies === 'cat' && chocolateResult.level !== 'safe' && <p className="text-xs text-center text-muted-foreground">{t('toxicity.chocolate.results.catWarning')}</p>}
                        </div>
                    ) : ( <p className="text-center py-8 text-muted-foreground">{t('toxicity.chocolate.results.prompt')}</p> )}
                </div>
            </div>
        )
    };

    const renderRodenticideTab = () => {
        const selectedRodenticide = RODENTICIDE_TYPES.find(c => c.id === rodenticideTypeId);
        const levelData = rodenticideResult ? TOXICITY_LEVELS.rodenticide[rodenticideResult.level] : TOXICITY_LEVELS.rodenticide.safe;
        const gaugePercentage = rodenticideResult ? Math.min(rodenticideResult.dose / TOXICITY_LEVELS.rodenticide.severe.minDose * 100, 100) : 0;
        const SpeciesIcon = componentSpecies === 'cat' ? CatIcon : DogIcon;

        return (
            <div className="space-y-6">
                 <Section icon={<SkullIcon />} title={t('toxicity.rodenticides.typeIngested')} step={1}>
                         <label className="block text-sm font-medium mb-1 text-start">{t('toxicity.rodenticides.rodenticide')}</label>
                        <select value={rodenticideTypeId} onChange={e => setRodenticideTypeId(e.target.value)} className="form-input w-full">
                             {groupedRodenticides.map(([categoryKey, items]) => (
                                <optgroup key={categoryKey} label={t(categoryKey)}>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>{t(item.nameKey)}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </Section>
                 <Section icon={<ScaleIcon />} title={t('toxicity.rodenticides.volumeIngested')} step={2}>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" value={displayRodenticideAmountOz} onChange={e => handleAmountChange(e.target.value, 'oz', setRodenticideAmountGrams, setDisplayRodenticideAmountOz)} className="form-input w-full" placeholder={t('toxicity.chocolate.ouncesIngested')} />
                        <input type="number" value={rodenticideAmountGrams} onChange={e => handleAmountChange(e.target.value, 'g', setRodenticideAmountGrams, setDisplayRodenticideAmountOz)} className="form-input w-full" placeholder={t('toxicity.chocolate.gramsIngested')} />
                    </div>
                </Section>
                <div className="bg-card p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-heading mb-4 text-start flex items-center gap-2"><TriangleExclamationIcon/> {t('toxicity.chocolate.section4Title')}</h2>
                    {rodenticideResult ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-muted"></div>
                                <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${levelData.gaugeColor} ${gaugePercentage}%, transparent 0)` }}></div>
                                <div className="absolute inset-2 rounded-full bg-card"></div>
                                <div className="relative text-center">
                                    <SpeciesIcon className="text-2xl text-muted-foreground mb-1"/>
                                    <p className="text-3xl font-mono font-bold text-heading">{localizeNumber(rodenticideResult.dose.toFixed(3))}</p>
                                    <p className="text-sm text-muted-foreground">mg/kg</p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold">{selectedRodenticide ? t(selectedRodenticide.nameKey) : ''}</p>
                             <div className={`p-4 rounded-lg border text-start w-full ${levelData.color}`}>
                                <p>{t(rodenticideResult.notesKey)}</p>
                            </div>
                        </div>
                    ) : ( <p className="text-center py-8 text-muted-foreground">{t('toxicity.chocolate.results.prompt')}</p> )}
                </div>
            </div>
        )
    };

    const renderXylitolTab = () => (
        <div className="space-y-6">
            <AccordionItem title={t('toxicity.xylitol.aboutTitle')} defaultOpen={true}>
                <p className="text-sm text-muted-foreground">{t('toxicity.xylitol.aboutContent')}</p>
            </AccordionItem>

            <Section icon={<CandyCaneIcon />} step={1} title={t('toxicity.xylitol.section1Title')} infoAction={() => setIsXylitolInfoModalOpen(true)}>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium mb-1">{t('toxicity.xylitol.mgPerServing')}</label>
                        <input type="number" value={mgPerServing} onChange={e => {
                            setMgPerServing(e.target.value);
                            const grams = parseFloat(e.target.value) / 1000;
                            setGramsPerServing(isNaN(grams) ? '' : grams.toString());
                        }} className="form-input w-full" placeholder="mgs"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">{t('toxicity.xylitol.gramsPerServing')}</label>
                        <input type="number" value={gramsPerServing} onChange={e => {
                            setGramsPerServing(e.target.value);
                            const mg = parseFloat(e.target.value) * 1000;
                            setMgPerServing(isNaN(mg) ? '' : mg.toString());
                        }} className="form-input w-full" placeholder="grams"/>
                    </div>
                </div>
            </Section>
            
            <Section icon={<CookieBiteIcon />} step={2} title={t('toxicity.xylitol.section2Title')}>
                <label className="block text-sm font-medium mb-1">{t('toxicity.xylitol.servingsIngested')}</label>
                <input type="number" value={servings} onChange={e => setServings(e.target.value)} className="form-input w-full" placeholder="Units"/>
            </Section>
            
            <div className="bg-card p-4 sm:p-6 text-start">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold text-lg">3</div>
                    <h2 className="text-lg font-bold text-heading">{t('toxicity.xylitol.section3Title')}</h2>
                </div>
                {xylitolResult ? (
                    <div className="text-center space-y-4">
                        <p className="text-5xl font-mono font-bold text-heading">{localizeNumber(xylitolResult.dose.toFixed(1))}<span className="text-lg text-muted-foreground ms-1">mg/kg</span></p>
                        <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-bold text-heading mb-2">{t('toxicity.xylitol.resultsTitle')}</h4>
                            {xylitolResult.level === 'safe' && <p className="text-sm text-muted-foreground">{t('toxicity.chocolate.results.symptoms.safe')}</p>}
                            {xylitolResult.level === 'hypoglycemia' && <p className="text-sm text-orange-600 dark:text-orange-400">{t('toxicity.xylitol.riskHypoglycemia')}</p>}
                            {xylitolResult.level === 'liver_failure' && <p className="text-sm text-red-600 dark:text-red-400">{t('toxicity.xylitol.riskLiverFailure')}</p>}
                        </div>
                         <div className="text-center">
                            <h5 className="font-semibold text-muted-foreground text-sm">{t('toxicity.xylitol.signsTitle')}</h5>
                            <p className="text-sm">{t('toxicity.xylitol.signsContent')}</p>
                        </div>
                    </div>
                ) : (
                     <p className="text-center py-8 text-muted-foreground">{t('toxicity.chocolate.results.prompt')}</p>
                )}
            </div>
        </div>
    );

    const renderPlantsTab = () => (
        <div className="space-y-4">
            <div className="relative">
                <SearchIcon className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="search"
                    value={plantSearchQuery}
                    onChange={e => setPlantSearchQuery(e.target.value)}
                    placeholder={t('toxicity.plants.searchPlaceholder')}
                    className="form-input w-full !rounded-full !ps-12 !py-3 bg-card"
                />
            </div>
    
            <div className="text-sm text-start text-muted-foreground p-2">
                <p className="font-bold text-center mb-2 text-heading">{t('toxicity.plants.legendTitle')}</p>
                <p dangerouslySetInnerHTML={{ __html: t('toxicity.plants.intro', {
                    toxicIcon: `<i class="fa-solid fa-skull-crossbones text-red-500"></i>`,
                    nonToxicIcon: `<i class="fa-solid fa-face-smile text-emerald-500"></i>`,
                    dogIcon: `<i class="fa-solid fa-dog"></i>`,
                    catIcon: `<i class="fa-solid fa-cat"></i>`,
                })}} />
            </div>
            <hr className="border-border"/>
            
            {isPlantsLoading ? (
                <PlantListSkeleton />
            ) : (
                <div className="space-y-2">
                    {filteredPlants.map(plant => (
                        <div key={plant.id} className="bg-card p-4">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-grow">
                                    <a href={plant.aspcaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-bold text-red-600 dark:text-red-400 hover:underline">
                                        {plant.name}
                                        <ExternalLinkIcon className="w-4 h-4" />
                                    </a>
                                    {plant.commonNames.length > 0 && <p className="text-sm text-muted-foreground"><span className="font-semibold">{t('toxicity.plants.commonNames')}:</span> {plant.commonNames.join(', ')}</p>}
                                    <p className="text-sm text-muted-foreground"><span className="font-semibold">{t('toxicity.plants.scientificName')}:</span> {plant.scientificName} {plant.family && <> <span className="font-semibold">{t('toxicity.plants.family')}:</span> {plant.family}</>}</p>
                                </div>
                                <div className="flex items-center gap-2 text-xl flex-shrink-0">
                                    {plant.isNonToxic ? <SmileIcon className="text-emerald-500" /> : <SkullIcon className="text-red-500" />}
                                    {plant.isToxicToDogs && <DogIcon />}
                                    {plant.isToxicToCats && <CatIcon />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <>
        {!hasWeight && activeTab !== 'plants' && <MissingPatientWeightBanner />}
        <div className="min-h-screen">
            <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex justify-between items-center p-4">
                    <BackButton onClick={() => navigate('/')} />
                    {activeTab !== 'plants' && <PatientInfoDisplay />}
                </div>
                <div className="flex justify-around border-b border-border">
                    {TABS.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id as ToxinTab)} className={`flex-1 p-3 text-sm font-semibold border-b-2 transition-colors flex flex-col items-center gap-1 ${isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted'}`}>
                               <motion.div animate={isActive ? { rotate: [0, 10, -8, 6, 0], scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5 }}>
                                {tab.icon}
                               </motion.div>
                               <span>{t(tab.labelKey)}</span>
                            </button>
                        )
                    })}
                </div>
            </header>
            
            <main className={`p-4 max-w-xl mx-auto ${!hasWeight && activeTab !== 'plants' ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-center gap-2 relative mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-heading">
                        {t(`toxicity.tabs.${activeTab}`)}
                    </h1>
                     {activeTab === 'rodenticides' && (
                        <div className="absolute top-1/2 -translate-y-1/2 end-0">
                            <Button variant="secondary" onClick={() => setIsRodenticideInfoModalOpen(true)} className="!p-2.5 !rounded-full" aria-label={t('moreInfo')}>
                                <CircleQuestionIcon className="w-5 h-5"/>
                            </Button>
                        </div>
                    )}
                     {activeTab === 'chocolate' && (
                        <div className="absolute top-1/2 -translate-y-1/2 end-0">
                            <Button variant="secondary" onClick={() => setIsChocolateInfoModalOpen(true)} className="!p-2.5 !rounded-full" aria-label={t('moreInfo')}>
                                <CircleQuestionIcon className="w-5 h-5"/>
                            </Button>
                        </div>
                    )}
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'chocolate' ? renderChocolateTab() :
                         activeTab === 'rodenticides' ? renderRodenticideTab() :
                         activeTab === 'xylitol' ? renderXylitolTab() :
                         activeTab === 'plants' ? renderPlantsTab() :
                         (
                            <div className="text-center py-20 bg-card">
                                <p className="text-muted-foreground">{t('comingSoon')}</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
        <InfoModal
            isOpen={isRodenticideInfoModalOpen}
            onClose={() => setIsRodenticideInfoModalOpen(false)}
            title={t('toxicity.rodenticides.infoModal.title')}
        >
            <div className="text-start space-y-4">
                <p className="text-sm">{t('toxicity.rodenticides.infoModal.intro1')}</p>
                <p className="text-sm">{t('toxicity.rodenticides.infoModal.intro2')}</p>
                <div className="space-y-0 divide-y divide-border border-t border-border pt-2">
                    <AccordionItem title={t('toxicity.rodenticides.infoModal.anticoagulants.title')}>
                        <div className="space-y-3">
                            <p>{t('toxicity.rodenticides.infoModal.anticoagulants.main')}</p>
                            <div><strong>{t('toxicity.rodenticides.infoModal.anticoagulants.signsTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.anticoagulants.signsContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.anticoagulants.treatmentTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.anticoagulants.treatmentContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.anticoagulants.threatTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.anticoagulants.threatContent')}</p></div>
                        </div>
                    </AccordionItem>
                    <AccordionItem title={t('toxicity.rodenticides.infoModal.cholecalciferol.title')}>
                         <div className="space-y-3">
                            <p>{t('toxicity.rodenticides.infoModal.cholecalciferol.main')}</p>
                            <div><strong>{t('toxicity.rodenticides.infoModal.cholecalciferol.mechanismTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.cholecalciferol.mechanismContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.cholecalciferol.signsTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.cholecalciferol.signsContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.cholecalciferol.treatmentTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.cholecalciferol.treatmentContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.cholecalciferol.threatTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.cholecalciferol.threatContent')}</p></div>
                        </div>
                    </AccordionItem>
                    <AccordionItem title={t('toxicity.rodenticides.infoModal.bromethalin.title')}>
                         <div className="space-y-3">
                            <p>{t('toxicity.rodenticides.infoModal.bromethalin.main')}</p>
                            <div><strong>{t('toxicity.rodenticides.infoModal.bromethalin.mechanismTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.bromethalin.mechanismContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.bromethalin.signsTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.bromethalin.signsContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.bromethalin.treatmentTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.bromethalin.treatmentContent')}</p></div>
                            <div><strong>{t('toxicity.rodenticides.infoModal.bromethalin.threatTitle')}</strong><p>{t('toxicity.rodenticides.infoModal.bromethalin.threatContent')}</p></div>
                        </div>
                    </AccordionItem>
                </div>
            </div>
        </InfoModal>
        <InfoModal
            isOpen={isChocolateInfoModalOpen}
            onClose={() => setIsChocolateInfoModalOpen(false)}
            title={t('toxicity.chocolate.infoModal.title')}
        >
            <div className="space-y-0 divide-y divide-border">
                <AccordionItem title={t('toxicity.chocolate.infoModal.incidence.title')}>
                    <ul className="list-disc ps-5 space-y-2">
                        <li>{t('toxicity.chocolate.infoModal.incidence.p1')}</li>
                        <li>{t('toxicity.chocolate.infoModal.incidence.p2')}</li>
                        <li>{t('toxicity.chocolate.infoModal.incidence.p3')}</li>
                        <li>{t('toxicity.chocolate.infoModal.incidence.p4')}</li>
                        <li>{t('toxicity.chocolate.infoModal.incidence.p5')}</li>
                        <li>{t('toxicity.chocolate.infoModal.incidence.p6')}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t('toxicity.chocolate.infoModal.methylxanthines.title')}>
                    <div className="space-y-3">
                        <p>{t('toxicity.chocolate.infoModal.methylxanthines.p1')}</p>
                        <p>{t('toxicity.chocolate.infoModal.methylxanthines.p2')}</p>
                        <p>{t('toxicity.chocolate.infoModal.methylxanthines.p3')}</p>
                        <p>{t('toxicity.chocolate.infoModal.methylxanthines.p4')}</p>
                    </div>
                </AccordionItem>
                <AccordionItem title={t('toxicity.chocolate.infoModal.toxicDoses.title')}>
                     <ul className="list-disc ps-5 space-y-2">
                        <li>{t('toxicity.chocolate.infoModal.toxicDoses.p1')}</li>
                        <li>{t('toxicity.chocolate.infoModal.toxicDoses.p2')}</li>
                        <li>{t('toxicity.chocolate.infoModal.toxicDoses.p3')}</li>
                        <li>{t('toxicity.chocolate.infoModal.toxicDoses.p4')}</li>
                    </ul>
                </AccordionItem>
                 <AccordionItem title={t('toxicity.chocolate.infoModal.signs.title')}>
                    <div className="space-y-3">
                        <p>{t('toxicity.chocolate.infoModal.signs.p1')}</p>
                        <ul className="list-disc ps-5 grid grid-cols-2 gap-x-4 gap-y-1">
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.vomiting')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.diarrhea')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.temp')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.reflex')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.rigidity')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.breathing')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.heartRate')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.bloodPressure')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.seizures')}</li>
                            <li>{t('toxicity.chocolate.infoModal.signs.symptoms.advanced')}</li>
                        </ul>
                    </div>
                </AccordionItem>
                <AccordionItem title={t('toxicity.chocolate.infoModal.cats.title')}>
                    <p>{t('toxicity.chocolate.infoModal.cats.p1')}</p>
                </AccordionItem>
                 <AccordionItem title={t('toxicity.chocolate.infoModal.diagnosis.title')}>
                    <p>{t('toxicity.chocolate.infoModal.diagnosis.p1')}</p>
                </AccordionItem>
                <AccordionItem title={t('toxicity.chocolate.infoModal.treatment.title')}>
                    <p>{t('toxicity.chocolate.infoModal.treatment.p1')}</p>
                </AccordionItem>
                 <AccordionItem title={t('toxicity.chocolate.infoModal.prevention.title')}>
                    <p>{t('toxicity.chocolate.infoModal.prevention.p1')}</p>
                </AccordionItem>
                 <AccordionItem title={t('toxicity.chocolate.infoModal.conclusion.title')}>
                    <p>{t('toxicity.chocolate.infoModal.conclusion.p1')}</p>
                </AccordionItem>
                 <AccordionItem title={t('toxicity.chocolate.infoModal.references.title')}>
                    <p className="text-xs italic">{t('toxicity.chocolate.infoModal.references.p1')}</p>
                </AccordionItem>
            </div>
        </InfoModal>
        <InfoModal
            isOpen={isXylitolInfoModalOpen}
            onClose={() => setIsXylitolInfoModalOpen(false)}
            title={t('toxicity.xylitol.infoModal.title')}
        >
            <div className="space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-2">
                <p>{t('toxicity.xylitol.infoModal.p1')}</p>
                <div>
                    <h4 className="font-bold text-heading mb-2">{t('toxicity.xylitol.infoModal.l1Title')}</h4>
                    <p className="text-muted-foreground">{t('toxicity.xylitol.infoModal.l1Content')}</p>
                    <img src="https://i.postimg.cc/Pq5jJ02M/xylitol-label-1.png" alt="Nutrition label with Xylitol" className="mt-2 rounded-lg border border-border w-full max-w-sm mx-auto"/>
                </div>
                 <div>
                    <h4 className="font-bold text-heading mb-2">{t('toxicity.xylitol.infoModal.l2Title')}</h4>
                    <p className="text-muted-foreground">{t('toxicity.xylitol.infoModal.l2Content1')}</p>
                    <p className="text-muted-foreground">{t('toxicity.xylitol.infoModal.l2Content2')}</p>
                    <p className="text-muted-foreground">{t('toxicity.xylitol.infoModal.l2Content3')}</p>
                    <img src="https://i.postimg.cc/63sMywD7/xylitol-label-2.png" alt="Nutrition label with Sugar Alcohols" className="mt-2 rounded-lg border border-border w-full max-w-sm mx-auto"/>
                </div>
            </div>
             <div className="mt-4 text-end">
                <Button variant="primary" onClick={() => setIsXylitolInfoModalOpen(false)}>
                    {t('toxicity.xylitol.infoModal.close')}
                </Button>
            </div>
        </InfoModal>
        </>
    );
};

export default ToxicityCalculatorScreen;