import React, { useReducer, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { usePatientStore } from '../stores/usePatientStore';
import { CircleQuestionIcon, PawIcon, UserIcon } from '../components/Icons';
import InfoModal from '../components/InfoModal';
import { BackButton } from '../components/Button';
import PatientInfoDisplay from '../components/PatientInfoDisplay';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import { motion } from 'framer-motion';

// --- TYPE DEFINITIONS ---
type AnimalType = 'canine' | 'feline';
type CalculatorState = {
    bcs: number;
    animalType: AnimalType;
    criteriaKey: string;
    foodCalories: string;
};
type CalculatorAction =
    | { type: 'SET_ANIMAL_TYPE'; payload: AnimalType }
    | { type: 'SET_CRITERIA'; payload: string }
    | { type: 'SET_BCS'; payload: number }
    | { type: 'SET_FOOD_CALORIES'; payload: string };

// --- CONSTANTS ---
const MER_FACTORS: Record<string, number> = {
    neuteredAdultCanine: 1.6, intactAdultCanine: 1.8, inactiveObeseCanine: 1.4, weightLossCanine: 1.0, weightGainCanine: 1.7, puppy0_4Canine: 3.0, puppy4_12Canine: 2.0,
    neuteredAdultFeline: 1.2, intactAdultFeline: 1.4, inactiveObeseFeline: 1.0, weightLossFeline: 0.8, weightGainFeline: 1.8, kittenFeline: 2.5,
};
const CANINE_CRITERIA = ['neuteredAdultCanine', 'intactAdultCanine', 'inactiveObeseCanine', 'weightLossCanine', 'weightGainCanine', 'puppy0_4Canine', 'puppy4_12Canine'];
const FELINE_CRITERIA = ['neuteredAdultFeline', 'intactAdultFeline', 'inactiveObeseFeline', 'weightLossFeline', 'weightGainFeline', 'kittenFeline'];

// --- REDUCER ---
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
    switch (action.type) {
        case 'SET_ANIMAL_TYPE': {
            const isCanine = action.payload === 'canine';
            return { ...state, animalType: action.payload, criteriaKey: isCanine ? CANINE_CRITERIA[0] : FELINE_CRITERIA[0] };
        }
        case 'SET_CRITERIA': return { ...state, criteriaKey: action.payload };
        case 'SET_BCS': return { ...state, bcs: action.payload };
        case 'SET_FOOD_CALORIES': return { ...state, foodCalories: action.payload };
        default: return state;
    }
}

const initialState: CalculatorState = {
    bcs: 5,
    animalType: 'canine',
    criteriaKey: 'neuteredAdultCanine',
    foodCalories: '',
};

// --- HELPER & UI COMPONENTS ---
const ResultCard: React.FC<{ label: string; value: string; unit: string; icon: React.ReactNode; }> = ({ label, value, unit, icon }) => (
    <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg text-xl">
            {icon}
        </div>
        <div className="text-start flex-grow">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p>
                <span className="font-bold text-xl text-heading">{value}</span>
                <span className="text-sm text-muted-foreground ms-1">{unit}</span>
            </p>
        </div>
    </div>
);


const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; className?: string; }> = ({ title, children, icon, className }) => (
    <div className={`bg-card p-4 sm:p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">{icon}</div>
            <h2 className="text-lg font-bold text-heading">{title}</h2>
        </div>
        {children}
    </div>
);


// --- MAIN SCREEN COMPONENT ---
const CaloriesCalculatorScreen: React.FC = () => {
    const { t, localizeNumber, locale } = useLocale();
    const navigate = useNavigate();
    const { species: patientSpecies, weightInKg: patientWeight } = usePatientStore();
    const [isBcsModalOpen, setIsBcsModalOpen] = useState(false);

    const [state, dispatch] = useReducer(calculatorReducer, initialState);
    
    useEffect(() => {
        const speciesKeyMap: { [key: string]: AnimalType } = {
            [t('speciesCat')]: 'feline',
            [t('speciesDog')]: 'canine',
        };
        const animalType = patientSpecies ? speciesKeyMap[patientSpecies] : null;

        if (animalType) {
            dispatch({ type: 'SET_ANIMAL_TYPE', payload: animalType });
        }
    }, [patientSpecies, t]);

    const speciesKeyMap: { [key: string]: AnimalType } = useMemo(() => ({
        [t('speciesCat')]: 'feline',
        [t('speciesDog')]: 'canine',
    }), [t]);

    const isSupportedSpecies = patientSpecies ? !!speciesKeyMap[patientSpecies] : true;
    const hasWeight = patientWeight && patientWeight > 0;

    const idealWeightKg = useMemo(() => {
        if (!patientWeight || patientWeight <= 0) return null;
        const idealBcs = 5;
        const bcsDifference = state.bcs - idealBcs;
        const weightAdjustmentFactor = 1 - (bcsDifference * 0.125); // Approx 12.5% per BCS point
        const calculatedIdeal = patientWeight * weightAdjustmentFactor;
        return Math.max(0.1, calculatedIdeal); // Ensure it doesn't go to zero or negative
    }, [patientWeight, state.bcs]);

    const weightForRer = useMemo(() => {
        const isWeightManagementPlan = state.criteriaKey.toLowerCase().includes('loss') || state.criteriaKey.toLowerCase().includes('gain');
        if (isWeightManagementPlan && idealWeightKg) {
            return idealWeightKg;
        }
        return patientWeight || 0;
    }, [state.criteriaKey, idealWeightKg, patientWeight]);

    const calculations = useMemo(() => {
        if (weightForRer <= 0) return { rer: 0, mer: 0 };
        const rer = 70 * Math.pow(weightForRer, 0.75);
        const factor = MER_FACTORS[state.criteriaKey] || 1;
        const mer = rer * factor;
        return { rer, mer };
    }, [weightForRer, state.criteriaKey]);

    const { rer, mer } = calculations;
    
    const foodAmount = useMemo(() => {
        const foodCal = parseFloat(state.foodCalories);
        return !isNaN(foodCal) && foodCal > 0 && mer > 0 ? (mer / foodCal) : 0;
    }, [mer, state.foodCalories]);

    const criteriaOptions = state.animalType === 'canine' ? CANINE_CRITERIA : FELINE_CRITERIA;

    return (
        <>
            {!hasWeight && <MissingPatientWeightBanner />}
            <div className="container mx-auto p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <BackButton onClick={() => navigate('/')} />
                    <PatientInfoDisplay />
                </div>
                <header className="text-center mb-6">
                     <h1 className="text-3xl md:text-4xl font-extrabold text-heading flex items-center justify-center gap-2">
                        <i className="fa-solid fa-utensils text-primary"></i>
                        {t('caloriesCalculator.title')}
                    </h1>
                </header>
                
                <main className={`grid grid-cols-1 lg:grid-cols-5 gap-6 ${!hasWeight ? 'opacity-50 pointer-events-none' : ''}`}>
                    
                    {/* --- LEFT SIDE (INPUTS) --- */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Pet Criteria */}
                        <Section icon={<UserIcon />} title={t('caloriesCalculator.petCriteria')}>
                            <div className="flex bg-muted p-1 rounded-lg mb-4">
                                <button onClick={() => dispatch({ type: 'SET_ANIMAL_TYPE', payload: 'canine' })} className={`flex-1 py-2 rounded-md font-semibold transition-colors ${state.animalType === 'canine' ? 'bg-card shadow' : 'hover:bg-card/50'}`}>{t('caloriesCalculator.canine')}</button>
                                <button onClick={() => dispatch({ type: 'SET_ANIMAL_TYPE', payload: 'feline' })} className={`flex-1 py-2 rounded-md font-semibold transition-colors ${state.animalType === 'feline' ? 'bg-card shadow' : 'hover:bg-card/50'}`}>{t('caloriesCalculator.feline')}</button>
                            </div>
                             <select value={state.criteriaKey} onChange={e => dispatch({ type: 'SET_CRITERIA', payload: e.target.value})} className="form-input w-full">
                                {criteriaOptions.map(key => <option key={key} value={key}>{t(`caloriesCalculator.criteria.${key}`)}</option>)}
                            </select>
                        </Section>
                        
                        {/* Weight and BCS */}
                        <Section icon={<i className="fa-solid fa-weight-scale"></i>} title={t('caloriesCalculator.weightAndBcs')}>
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-card-foreground text-start">{t('caloriesCalculator.bcs')}</label>
                                    <span className="font-mono font-semibold text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-md">{t('caloriesCalculator.bcsValue', { value: state.bcs })}</span>
                                </div>
                                <input type="range" min="1" max="9" step="1" value={state.bcs} onChange={e => dispatch({ type: 'SET_BCS', payload: Number(e.target.value)})} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"/>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                                    <span>{t('caloriesCalculator.bcsLabels.thin')}</span>
                                    <span>{t('caloriesCalculator.bcsLabels.ideal')}</span>
                                    <span>{t('caloriesCalculator.bcsLabels.heavy')}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                                <div>
                                    <span className="text-sm font-semibold">{t('caloriesCalculator.idealWeight')}</span>
                                    <p className="text-xs text-muted-foreground">{t('caloriesCalculator.bcsDesc')}</p>
                                </div>
                                <span className="text-xl font-bold text-heading">{idealWeightKg ? `${localizeNumber(idealWeightKg.toFixed(1))} kg` : '---'}</span>
                            </div>
                             <button onClick={() => setIsBcsModalOpen(true)} className="text-xs font-semibold text-muted-foreground hover:text-primary mt-3">{t('caloriesCalculator.bcsCharts')}</button>
                        </Section>

                         {/* Feeding Plan */}
                        <Section icon={<i className="fa-solid fa-bowl-food"></i>} title={t('caloriesCalculator.feedingPlan')}>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1 text-start">{t('caloriesCalculator.kcalPerUnit')}</label>
                                <input type="number" placeholder={t('caloriesCalculator.enterCaloriesPlaceholder')} value={state.foodCalories} onChange={e => dispatch({type: 'SET_FOOD_CALORIES', payload: e.target.value})} className="form-input w-full"/>
                            </div>
                        </Section>
                    </div>

                    {/* --- RIGHT SIDE (RESULTS) --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-card p-4 sm:p-6 sticky top-24">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary"><i className="fa-solid fa-chart-line"></i></div>
                                <h2 className="text-lg font-bold text-heading">{t('caloriesCalculator.results')}</h2>
                            </div>
                            <div className="space-y-3">
                                <ResultCard label={t('caloriesCalculator.rer')} value={localizeNumber(rer.toFixed(0))} unit="kcal/day" icon={<i className="fa-solid fa-moon"></i>} />
                                <ResultCard label={t('caloriesCalculator.mer')} value={localizeNumber(mer.toFixed(0))} unit="kcal/day" icon={<i className="fa-solid fa-sun"></i>} />
                                <ResultCard label={t('caloriesCalculator.foodAmount')} value={foodAmount > 0 ? localizeNumber(foodAmount.toFixed(1)) : '---'} unit="cups/day" icon={<i className="fa-solid fa-calculator"></i>} />
                                <ResultCard label={t('caloriesCalculator.dailyH2O')} value={localizeNumber(mer.toFixed(0))} unit="mL/day" icon={<i className="fa-solid fa-tint"></i>} />
                            </div>
                             <p className="text-xs text-muted-foreground text-center mt-4">{t('caloriesCalculator.merEstimates')}</p>
                        </div>
                    </div>

                </main>
            </div>
            <InfoModal
                isOpen={isBcsModalOpen}
                onClose={() => setIsBcsModalOpen(false)}
                title={state.animalType === 'canine' ? t('caloriesCalculator.bcsChartTitleCanine') : t('caloriesCalculator.bcsChartTitleFeline')}
            >
                <img 
                    src={state.animalType === 'canine' 
                        ? 'https://i.postimg.cc/8cmc71fP/purina-bcs-dog.jpg' 
                        : 'https://i.postimg.cc/W3663Y22/purina-bcs-cat.jpg'
                    } 
                    alt={t('caloriesCalculator.bcsChartAltText')} 
                    className="w-full h-auto rounded-md"
                />
            </InfoModal>
        </>
    );
};

export default CaloriesCalculatorScreen;