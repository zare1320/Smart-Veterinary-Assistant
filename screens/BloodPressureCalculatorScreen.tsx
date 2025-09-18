import React, { useReducer, useEffect, useMemo, useCallback, useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { usePatientStore } from '../stores/usePatientStore';
import { BackButton, Button } from '../components/Button';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import { LabeledInput, LabeledSelect } from '../components/forms';
import InfoModal from '../components/InfoModal';
import PatientInfoDisplay from '../components/PatientInfoDisplay';
import { HeartPulseIcon, FilePenIcon, ChartLineIcon, CircleQuestionIcon } from '../components/Icons';

// Constants
const NUM_PRESSURE_READINGS = 10;
const SBP_THRESHOLDS = {
  BORDERLINE: 150,
  HYPERTENSIVE: 160,
  SEVERELY_HYPERTENSIVE: 180,
};

// State Management
interface BpState {
  species: string | null;
  patientPosition: string;
  cuffPosition: string;
  cuffSize: string;
  time: string;
  stressLevel: string;
  location: string;
  dvmTech: string;
  measurementMethod: string;
  pressures: string[];
}

type BpAction =
  | { type: 'SET_FIELD'; field: keyof BpState; value: any }
  | { type: 'SET_PRESSURE'; index: number; value: string }
  | { type: 'SET_INITIAL_DATA'; payload: { species: string | null } };

const createInitialState = (): BpState => ({
  species: null,
  patientPosition: 'lateral',
  cuffPosition: 'rightFront',
  cuffSize: '3',
  time: '',
  stressLevel: 'relaxed',
  location: '',
  dvmTech: '',
  measurementMethod: 'doppler',
  pressures: Array(NUM_PRESSURE_READINGS).fill(''),
});

function bpReducer(state: BpState, action: BpAction): BpState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_PRESSURE': {
      const newPressures = [...state.pressures];
      newPressures[action.index] = action.value;
      return { ...state, pressures: newPressures };
    }
    case 'SET_INITIAL_DATA':
        return { ...createInitialState(), species: action.payload.species };
    default:
      return state;
  }
}

// Sub-components for the screen
const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
            {/* FIX: Corrected incomplete className and provided a consistent style. */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary-500)]/10 text-[var(--primary-500)]">
                {icon}
            </div>
            <h2 className="text-lg font-bold text-heading">{title}</h2>
        </div>
        {children}
    </div>
);

// FIX: Added the missing MeasurementDetails component.
const MeasurementDetails: React.FC<{ state: BpState; onFieldChange: (field: keyof BpState, value: any) => void; t: (key: string) => string }> = ({ state, onFieldChange, t }) => {
  const idPrefix = useId();
  const positionOptions = ['lateral', 'sternal', 'standing', 'sitting'];
  const cuffPositionOptions = ['rightFront', 'leftFront', 'rightRear', 'leftRear', 'tail'];
  const stressLevelOptions = ['relaxed', 'tense', 'nervous', 'veryNervous', 'aggressive'];
  const methodOptions = ['doppler', 'oscillometric'];

  return (
    <Section icon={<FilePenIcon />} title={t('bp.enterInformation')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <LabeledSelect label={t('bp.patientPosition')} id={`${idPrefix}-patientPosition`} value={state.patientPosition} onChange={(e) => onFieldChange('patientPosition', e.target.value)}>
            {positionOptions.map(key => <option key={key} value={key}>{t(`bp.positionOptions.${key}`)}</option>)}
        </LabeledSelect>
        <LabeledSelect label={t('bp.cuffPosition')} id={`${idPrefix}-cuffPosition`} value={state.cuffPosition} onChange={(e) => onFieldChange('cuffPosition', e.target.value)}>
            {cuffPositionOptions.map(key => <option key={key} value={key}>{t(`bp.cuffPositionOptions.${key}`)}</option>)}
        </LabeledSelect>
        <LabeledInput label={t('bp.cuffSize')} id={`${idPrefix}-cuffSize`} type="number" value={state.cuffSize} onChange={(e) => onFieldChange('cuffSize', e.target.value)} unit="cm" />
        <LabeledInput label={t('bp.time')} id={`${idPrefix}-time`} type="time" value={state.time} onChange={(e) => onFieldChange('time', e.target.value)} />
        <LabeledSelect label={t('bp.stressLevel')} id={`${idPrefix}-stressLevel`} value={state.stressLevel} onChange={(e) => onFieldChange('stressLevel', e.target.value)}>
            {stressLevelOptions.map(key => <option key={key} value={key}>{t(`bp.stressLevelOptions.${key}`)}</option>)}
        </LabeledSelect>
        <LabeledSelect label={t('bp.measurementMethod')} id={`${idPrefix}-measurementMethod`} value={state.measurementMethod} onChange={(e) => onFieldChange('measurementMethod', e.target.value)}>
            {methodOptions.map(key => <option key={key} value={key}>{t(`bp.methodOptions.${key}`)}</option>)}
        </LabeledSelect>
        <LabeledInput label={t('bp.location')} id={`${idPrefix}-location`} value={state.location} onChange={(e) => onFieldChange('location', e.target.value)} />
        <LabeledInput label={t('bp.dvmTech')} id={`${idPrefix}-dvmTech`} value={state.dvmTech} onChange={(e) => onFieldChange('dvmTech', e.target.value)} />
      </div>
    </Section>
  );
};

// FIX: Added the missing PressureReadings component.
const PressureReadings: React.FC<{
  pressures: string[];
  meanSbp: number | null;
  onPressureChange: (index: number, value: string) => void;
  t: (key: string) => string;
  localizeNumber: (num: string | number) => string;
}> = ({ pressures, meanSbp, onPressureChange, t, localizeNumber }) => {
  const idPrefix = useId();
  return (
    <Section icon={<ChartLineIcon />} title={t('bp.data')}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {pressures.map((p, i) => (
          <LabeledInput
            key={i}
            label={`#${localizeNumber(i + 1)}`}
            id={`${idPrefix}-pressure-${i}`}
            type="number"
            value={p}
            onChange={(e) => onPressureChange(i, e.target.value)}
            className="text-center"
          />
        ))}
      </div>
      <div className="mt-6 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl p-4 text-white shadow-lg shadow-sky-500/30 text-center">
          <p className="text-sm opacity-80">{t('bp.meanSystolic')}</p>
          <p className="text-3xl font-bold font-mono">{meanSbp !== null ? localizeNumber(meanSbp) : '---'} <span className="text-lg opacity-80">mmHg</span></p>
      </div>
    </Section>
  );
};

// FIX: Added the missing RiskClassificationTable component.
const RiskClassificationTable: React.FC<{ riskCategory: string | null; t: (key: string) => string; }> = ({ riskCategory, t }) => {
  const categories = [
    { key: 'normotensive', riskKey: 'minimal' },
    { key: 'borderline', riskKey: 'low' },
    { key: 'hypertensive', riskKey: 'moderate' },
    { key: 'severelyHypertensive', riskKey: 'high' },
  ];

  const categoryStyles = {
    minimal: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
    low: 'bg-yellow-500/10 text-yellow-800 dark:text-yellow-300',
    moderate: 'bg-orange-500/10 text-orange-800 dark:text-orange-300',
    high: 'bg-red-500/10 text-red-800 dark:text-red-300',
  };

  return (
    <Section icon={<HeartPulseIcon />} title={t('bp.riskOfTod')}>
        <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm text-start">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="p-3 font-semibold">{t('bp.sbpMmHg')}</th>
                        <th className="p-3 font-semibold">{t('bp.category')}</th>
                        <th className="p-3 font-semibold">{t('bp.riskOfTod')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {categories.map(({ key, riskKey }) => (
                        <tr key={key} className={riskCategory === key ? 'bg-secondary ring-2 ring-[var(--primary-500)]' : ''}>
                            <td className="p-3 font-mono">{
                                key === 'normotensive' ? '<150' :
                                key === 'borderline' ? '150-159' :
                                key === 'hypertensive' ? '160-179' :
                                '≥180'
                            }</td>
                            <td className="p-3 font-semibold">{t(`bp.${key}`)}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded-full font-semibold text-xs ${categoryStyles[riskKey as keyof typeof categoryStyles]}`}>
                                    {t(`bp.${riskKey}`)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-start">
            <p>{t('bp.sbpAbbr')}</p>
            <p>{t('bp.todAbbr')}</p>
        </div>
    </Section>
  );
};

// Main Component
const BloodPressureCalculatorScreen: React.FC = () => {
    const { t, localizeNumber } = useLocale();
    const navigate = useNavigate();
    const { species, weightInKg } = usePatientStore(state => ({ species: state.species, weightInKg: state.weightInKg }));
    const [state, dispatch] = useReducer(bpReducer, createInitialState());
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        dispatch({ type: 'SET_INITIAL_DATA', payload: { species: species } });
    }, [species]);

    const { meanSbp, riskCategory } = useMemo(() => {
        const validPressures = state.pressures.map(p => parseFloat(p)).filter(p => !isNaN(p) && p > 0);
        if (validPressures.length === 0) return { meanSbp: null, riskCategory: null };

        const readingsToAverage = validPressures.length > 5 
          ? [...validPressures].sort((a,b) => a - b).slice(1, -1)
          : validPressures;

        if (readingsToAverage.length === 0) return { meanSbp: null, riskCategory: null };

        const sum = readingsToAverage.reduce((acc, val) => acc + val, 0);
        const mean = Math.round(sum / readingsToAverage.length);

        let category = 'normotensive';
        if (mean >= SBP_THRESHOLDS.SEVERELY_HYPERTENSIVE) category = 'severelyHypertensive';
        else if (mean >= SBP_THRESHOLDS.HYPERTENSIVE) category = 'hypertensive';
        else if (mean >= SBP_THRESHOLDS.BORDERLINE) category = 'borderline';
        
        return { meanSbp: mean, riskCategory: category };
    }, [state.pressures]);

    const handleFieldChange = useCallback((field: keyof BpState, value: any) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    const handlePressureChange = useCallback((index: number, value: string) => {
        dispatch({ type: 'SET_PRESSURE', index, value });
    }, []);

    const speciesKeyMap: { [key: string]: string } = {
        [t('speciesCat')]: 'cat',
        [t('speciesDog')]: 'dog',
    };
    const speciesKey = species ? speciesKeyMap[species] : null;
    const isSupportedSpecies = speciesKey === 'cat' || speciesKey === 'dog';
    const hasWeight = weightInKg && weightInKg > 0;

    return (
        <>
            {!hasWeight && <MissingPatientWeightBanner />}
            <main className="container mx-auto p-4 md:p-6 space-y-6">
                 <div className="flex justify-between items-center mb-4">
                    <BackButton onClick={() => navigate('/')} />
                    <PatientInfoDisplay />
                </div>
                
                <header className="relative text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                        <HeartPulseIcon className="w-8 h-8 text-red-500" />
                        <h1 className="text-3xl md:text-4xl font-extrabold text-heading">{t('bp.title')}</h1>
                    </div>
                     <div className="absolute top-1/2 -translate-y-1/2 end-0">
                        <Button variant="secondary" onClick={() => setIsInfoModalOpen(true)} className="!p-2.5 !rounded-full" aria-label={t('bp.about')}>
                            <CircleQuestionIcon className="w-5 h-5"/>
                        </Button>
                    </div>
                </header>

                <div className={`space-y-6 ${!hasWeight ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="text-center">
                        <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.15241" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:underline hover:text-[var(--primary-500)] transition-colors">
                            {t('bp.guidelines')}
                        </a>
                    </div>

                    {isSupportedSpecies ? (
                        <div className="space-y-6">
                            <MeasurementDetails state={state} onFieldChange={handleFieldChange} t={t} />
                            <PressureReadings pressures={state.pressures} meanSbp={meanSbp} onPressureChange={handlePressureChange} t={t} localizeNumber={localizeNumber} />
                            <RiskClassificationTable riskCategory={riskCategory} t={t} />
                        </div>
                    ) : (
                        <div className="text-center p-6 bg-yellow-400/20 rounded-lg border border-yellow-400/30 dark:border-[#ffd700]/30">
                            <p className="text-yellow-800 dark:text-yellow-200">{t('bp.unsupportedSpecies')}</p>
                        </div>
                    )}
                </div>

                <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} title={t('bp.infoModal.title')}>
                    <p>{t('bp.infoModal.p1')}</p>
                    <p>{t('bp.infoModal.p2')}</p>
                    <p>{t('bp.infoModal.p3')}</p>
                </InfoModal>
            </main>
        </>
    );
};

export default BloodPressureCalculatorScreen;