import React, { useReducer, useEffect, useMemo, useCallback, useState, useId } from 'react';
import { useLocale } from '../context/LocaleContext';
import { usePatient } from '../context/PatientContext';
import type { ScreenProps } from '../types';
import { BackButton, Button } from '../components/Button';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import { LabeledInput, LabeledSelect } from '../components/forms';
import InfoModal from '../components/InfoModal';
import PatientInfoDisplay from '../components/PatientInfoDisplay';
import { HeartPulseIcon, FilePenIcon, ChartLineIcon, CircleQuestionIcon, ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';

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

// Main Component
const BloodPressureCalculatorScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const { t, locale, localizeNumber } = useLocale();
    const { patientInfo } = usePatient();
    const [state, dispatch] = useReducer(bpReducer, createInitialState());
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        dispatch({ type: 'SET_INITIAL_DATA', payload: { species: patientInfo.species } });
    }, [patientInfo.species]);

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
    const speciesKey = patientInfo.species ? speciesKeyMap[patientInfo.species] : null;
    const isSupportedSpecies = speciesKey === 'cat' || speciesKey === 'dog';
    const hasWeight = patientInfo.weightInKg && patientInfo.weightInKg > 0;

    return (
        <>
            {!hasWeight && <MissingPatientWeightBanner />}
            <main className="container mx-auto p-4 md:p-6 space-y-6">
                 <div className="flex justify-between items-center mb-4">
                    <BackButton onClick={() => onNavigate('home')} />
                    <PatientInfoDisplay />
                </div>
                
                <header className="relative text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                        <HeartPulseIcon className="w-8 h-8 text-red-500" />
                        <h1 className="text-3xl md:text-4xl font-extrabold text-inherit">{t('bp.title')}</h1>
                    </div>
                     <div className="absolute top-1/2 -translate-y-1/2 end-0">
                        <Button variant="secondary" onClick={() => setIsInfoModalOpen(true)} className="!p-2.5 !rounded-full" aria-label={t('bp.about')}>
                            <CircleQuestionIcon className="w-5 h-5"/>
                        </Button>
                    </div>
                </header>

                <div className={`space-y-6 ${!hasWeight ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="text-center">
                        <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.15241" target="_blank" rel="noopener noreferrer" className="block text-sm text-inherit/70 hover:underline hover:text-[var(--primary-500)] transition-colors">
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

// Sub-components for the screen
const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/10 dark:border-white/10">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary-500)]/10 text-[var(--primary-500)]">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-inherit text-start">{title}</h2>
        </div>
        {children}
    </div>
);

const MeasurementDetails: React.FC<{ state: BpState, onFieldChange: (field: keyof BpState, value: any) => void, t: (key: string) => string }> = ({ state, onFieldChange, t }) => (
    <Section icon={<FilePenIcon className="text-2xl" />} title={t('bp.enterInformation')}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <LabeledSelect label={t('bp.patientPosition')} id="patientPosition" value={state.patientPosition} onChange={e => onFieldChange('patientPosition', e.target.value)}>
                {Object.entries({
                    'lateral': t('bp.positionOptions.lateral'), 
                    'sternal': t('bp.positionOptions.sternal'), 
                    'standing': t('bp.positionOptions.standing'),
                    'sitting': t('bp.positionOptions.sitting')
                }).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </LabeledSelect>
            <LabeledSelect label={t('bp.cuffPosition')} id="cuffPosition" value={state.cuffPosition} onChange={e => onFieldChange('cuffPosition', e.target.value)}>
                {Object.entries({
                    'rightFront': t('bp.cuffPositionOptions.rightFront'), 
                    'leftFront': t('bp.cuffPositionOptions.leftFront'), 
                    'rightRear': t('bp.cuffPositionOptions.rightRear'), 
                    'leftRear': t('bp.cuffPositionOptions.leftRear'), 
                    'tail': t('bp.cuffPositionOptions.tail')
                }).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </LabeledSelect>
            <LabeledSelect label={t('bp.cuffSize')} id="cuffSize" value={state.cuffSize} onChange={e => onFieldChange('cuffSize', e.target.value)}>
                {Array.from({ length: 25 }, (_, i) => 1 + i * 0.5).map(s => <option key={s} value={s}>{s}</option>)}
            </LabeledSelect>
            <LabeledInput label={t('bp.time')} id="time" type="time" value={state.time} onChange={e => onFieldChange('time', e.target.value)} />
            <LabeledSelect label={t('bp.stressLevel')} id="stressLevel" value={state.stressLevel} onChange={e => onFieldChange('stressLevel', e.target.value)}>
                {Object.entries({
                    'relaxed': t('bp.stressLevelOptions.relaxed'),
                    'tense': t('bp.stressLevelOptions.tense'),
                    'nervous': t('bp.stressLevelOptions.nervous'),
                    'veryNervous': t('bp.stressLevelOptions.veryNervous'),
                    'aggressive': t('bp.stressLevelOptions.aggressive')
                }).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </LabeledSelect>
            <LabeledSelect label={t('bp.measurementMethod')} id="measurementMethod" value={state.measurementMethod} onChange={e => onFieldChange('measurementMethod', e.target.value)}>
                {Object.entries({'doppler': t('bp.methodOptions.doppler'), 'oscillometric': t('bp.methodOptions.oscillometric')}).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </LabeledSelect>
            <LabeledInput label={t('bp.location')} id="location" value={state.location} onChange={e => onFieldChange('location', e.target.value)} />
            <LabeledInput label={t('bp.dvmTech')} id="dvmTech" value={state.dvmTech} onChange={e => onFieldChange('dvmTech', e.target.value)} />
        </div>
    </Section>
);

const PressureReadings: React.FC<{ pressures: string[], meanSbp: number | null, onPressureChange: (index: number, value: string) => void, t: (key:string)=>string, localizeNumber: (n: number | string) => string }> = ({ pressures, meanSbp, onPressureChange, t, localizeNumber }) => (
    <Section icon={<ChartLineIcon className="text-2xl" />} title={t('bp.data')}>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {pressures.map((p, i) => (
                <LabeledInput key={i} id={`pressure-${i}`} label={`${t('bp.pressure')} ${localizeNumber(i + 1)}`} type="number" pattern="\d*" value={p} onChange={e => onPressureChange(i, e.target.value)} />
            ))}
        </div>
        <div className="mt-6 text-center">
            <h4 className="font-semibold text-inherit/80">{t('bp.meanSystolic')}</h4>
            <p className="text-5xl font-bold text-inherit font-mono">{meanSbp ? localizeNumber(meanSbp) : '---'}</p>
        </div>
    </Section>
);

const RiskClassificationTable: React.FC<{ riskCategory: string | null, t: (key: string) => string }> = ({ riskCategory, t }) => {
    const { locale } = useLocale();
    const captionId = useId();
    const RISK_LEVELS = [
        { key: 'normotensive', sbp: '<150', risk: 'minimal' },
        { key: 'borderline', sbp: '150-159', risk: 'low' },
        { key: 'hypertensive', sbp: '160-179', risk: 'moderate' },
        { key: 'severelyHypertensive', sbp: '≥180', risk: 'high' },
    ];
    const RISK_LEVEL_STYLES: { [key: string]: string } = {
        normotensive: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200',
        borderline: 'bg-yellow-100 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-200',
        hypertensive: 'bg-orange-100 dark:bg-orange-800/50 text-orange-800 dark:text-orange-200',
        severelyHypertensive: 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200',
    };
    return (
        <Section icon={<i className="fa-solid fa-shield-halved text-2xl"></i>} title={t('bp.riskOfTod')}>
            <div className="overflow-x-auto">
                <table className="w-full text-center" aria-labelledby={captionId}>
                    <caption id={captionId} className="sr-only">{t('bp.riskOfTod')}</caption>
                    <thead>
                        <tr className="border-b border-black/10 dark:border-white/10">
                            <th scope="col" className="p-3 font-semibold text-sm">{t('bp.sbpMmHg')}</th>
                            <th scope="col" className="p-3 font-semibold text-sm">{t('bp.category')}</th>
                            <th scope="col" className="p-3 font-semibold text-sm">{t('bp.riskOfTod')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RISK_LEVELS.map(level => (
                            <tr key={level.key} className={`transition-all duration-300 ${riskCategory === level.key ? 'bg-sky-400/10 dark:bg-sky-500/10' : ''}`}>
                                <td className="p-2 relative">
                                    {riskCategory === level.key && (
                                        <div className={`absolute inset-y-0 ${locale === 'fa' ? 'right-0' : 'left-0'} flex items-center`}>
                                            {locale === 'fa' ? <ArrowLeftIcon className="text-xl text-sky-500" /> : <ArrowRightIcon className="text-xl text-sky-500" />}
                                        </div>
                                    )}
                                    <span className={`inline-block w-28 text-center px-3 py-1 font-bold text-base rounded-full ${RISK_LEVEL_STYLES[level.key] || ''}`}>
                                        {level.sbp}
                                    </span>
                                </td>
                                <td className="p-3">{t(`bp.${level.key}`)}</td>
                                <td className="p-3">{t(`bp.${level.risk}`)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="text-xs text-inherit/60 mt-4 text-center space-y-1">
                <p>{t('bp.sbpAbbr')}</p>
                <p>{t('bp.todAbbr')}</p>
            </div>
        </Section>
    );
};

export default BloodPressureCalculatorScreen;