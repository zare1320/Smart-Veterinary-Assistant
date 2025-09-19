import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { BackButton } from '../components/Button';
import { DogIcon, CatIcon, PawIcon, BabyCarriageIcon, CalculatorIcon } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { usePatientStore } from '../stores/usePatientStore';
import ModernDatePicker from '../components/ModernDatePicker';
import AnimatedCounter from '../components/AnimatedCounter';

const GESTATION_DATA = {
  canine: { min: 57, max: 65, avg: 63, parturitionAvg: 65 },
  feline: { min: 60, max: 67, avg: 64, parturitionAvg: 61 }
};

type Species = 'canine' | 'feline';
type CalculatorMode = 'conception' | 'ultrasound';

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// --- Reusable UI Components ---

const SpeciesToggle: React.FC<{ selected: Species; onSelect: (species: Species) => void }> = ({ selected, onSelect }) => {
    const { t } = useLocale();
    return (
        <div className="relative flex w-full max-w-xs mx-auto bg-muted p-1 rounded-full">
            <motion.div
                className="absolute top-1 bottom-1 h-auto bg-card shadow rounded-full"
                style={{ width: 'calc(50% - 4px)' }}
                initial={false}
                animate={{ x: selected === 'canine' ? '4px' : 'calc(100% + 4px)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
            <button
                onClick={() => onSelect('canine')}
                className={`relative z-10 flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${selected === 'canine' ? 'text-primary' : 'text-muted-foreground'}`}
            >
                <DogIcon /> {t('pregnancyCalculator.canine')}
            </button>
            <button
                onClick={() => onSelect('feline')}
                className={`relative z-10 flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${selected === 'feline' ? 'text-primary' : 'text-muted-foreground'}`}
            >
                <CatIcon /> {t('pregnancyCalculator.feline')}
            </button>
        </div>
    );
};

const DateResult: React.FC<{ label: string; date: Date | null, className?: string }> = ({ label, date, className }) => {
    const { locale } = useLocale();
    const formattedDate = date ? date.toLocaleDateString(locale, { month: 'short', day: 'numeric' }) : '–';
    const formattedDay = date ? date.toLocaleDateString(locale, { weekday: 'long' }) : '';
    return (
        <div className={`text-center ${className}`}>
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            <p className="font-bold text-xl text-heading">{formattedDate}</p>
            <p className="text-xs text-muted-foreground">{formattedDay}</p>
        </div>
    );
};

const CalculationRow: React.FC<{label: string, formula: string, value: string, onChange: (v: string) => void, age: number | null, daysLeft: number | null}> = ({ label, formula, value, onChange, age, daysLeft }) => {
    const { t, localizeNumber } = useLocale();
    return (
        <div className="bg-muted/50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
                <label className="font-bold text-sm text-heading">{label} (cm)</label>
                <span className="text-xs text-muted-foreground font-mono">{formula}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
                <input type="number" value={value} onChange={e => onChange(e.target.value)} className="form-input text-center" placeholder="cm" />
                <div className="text-center bg-card p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">{t('pregnancyCalculator.ultrasound.gestationalAge')}</div>
                    <div className="font-bold text-heading">{age !== null ? <AnimatedCounter to={age} precision={1} /> : '--'}</div>
                </div>
                 <div className="text-center bg-card p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">{t('pregnancyCalculator.ultrasound.daysToParturition')}</div>
                    <div className="font-bold text-heading">{daysLeft !== null ? <AnimatedCounter to={daysLeft} precision={1} /> : '--'}</div>
                </div>
            </div>
        </div>
    )
};


const PregnancyCalculatorScreen: React.FC = () => {
    const { t, locale, localizeNumber } = useLocale();
    const navigate = useNavigate();
    const { species: patientSpecies } = usePatientStore();
    
    // --- SHARED STATE ---
    const [species, setSpecies] = useState<Species>('canine');
    const [mode, setMode] = useState<CalculatorMode>('conception');
    
    // --- CONCEPTION MODE STATE ---
    const [conceptionDate, setConceptionDate] = useState<Date | null>(null);
    const [calendarType, setCalendarType] = useState<'gregorian' | 'jalali'>(locale === 'fa' ? 'jalali' : 'gregorian');

    // --- ULTRASOUND MODE STATE ---
    const [ultrasoundInputs, setUltrasoundInputs] = useState({ gsd: '', crl: '', bp: '', bd: '', hd: '' });

    const today = useMemo(() => new Date(), []);
    
    // --- EFFECTS ---
    useEffect(() => {
        const speciesKeyMap: { [key: string]: Species } = {
            [t('speciesCat')]: 'feline',
            [t('speciesDog')]: 'canine',
        };
        const selectedSpecies = patientSpecies ? speciesKeyMap[patientSpecies] : 'canine';
        if (selectedSpecies) {
            setSpecies(selectedSpecies);
        }
    }, [patientSpecies, t]);

    useEffect(() => {
        setCalendarType(locale === 'fa' ? 'jalali' : 'gregorian');
    }, [locale]);
    
    // --- MEMOIZED CALCULATIONS ---
    const conceptionCalculations = useMemo(() => {
        if (!conceptionDate) return null;

        const diffTime = today.getTime() - conceptionDate.getTime();
        const daysSinceConception = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
        
        const speciesData = GESTATION_DATA[species];
        const earlyDueDate = addDays(conceptionDate, speciesData.min);
        const lateDueDate = addDays(conceptionDate, speciesData.max);
        const likelyDueDate = addDays(conceptionDate, speciesData.avg);
        
        const progress = Math.min((daysSinceConception / speciesData.avg) * 100, 100);

        return { daysSinceConception, earlyDueDate, lateDueDate, likelyDueDate, progress };
    }, [conceptionDate, species, today]);

    const ultrasoundCalculations = useMemo(() => {
        const parse = (val: string) => val === '' ? NaN : parseFloat(val);
        const gsd = parse(ultrasoundInputs.gsd);
        const crl = parse(ultrasoundInputs.crl);
        const bp = parse(ultrasoundInputs.bp);
        const bd = parse(ultrasoundInputs.bd);
        const hd = parse(ultrasoundInputs.hd);
        
        const results: { [key: string]: { age: number | null; daysLeft: number | null }} = {};
        const dp = (age: number, parturitionDays: number) => Math.max(0, parturitionDays - age);

        if (species === 'canine') {
            const parturitionDays = GESTATION_DATA.canine.parturitionAvg;
            results.gsd = { age: !isNaN(gsd) ? (6 * gsd) + 20 : null, daysLeft: null };
            results.crl = { age: !isNaN(crl) ? (3 * crl) + 27 : null, daysLeft: null };
            results.bp = { age: !isNaN(bp) ? (15 * bp) + 20 : null, daysLeft: null };
            results.bd = { age: !isNaN(bd) ? (7 * bd) + 29 : null, daysLeft: null };
            results.hd_bd = { age: !isNaN(hd) && !isNaN(bd) ? (6 * hd) + (3 * bd) + 30 : null, daysLeft: null };
            Object.keys(results).forEach(k => {
                if(results[k].age !== null) results[k].daysLeft = dp(results[k].age!, parturitionDays);
            });
        } else { // Feline
            const parturitionDays = GESTATION_DATA.feline.parturitionAvg;
            results.bp = { age: !isNaN(bp) ? (25 * bp) + 3 : null, daysLeft: null };
            results.bd = { age: !isNaN(bd) ? (11 * bd) + 21 : null, daysLeft: null };
            Object.keys(results).forEach(k => {
                if(results[k].age !== null) results[k].daysLeft = dp(results[k].age!, parturitionDays);
            });
        }
        return results;
    }, [species, ultrasoundInputs]);

    const handleUltrasoundInputChange = (field: keyof typeof ultrasoundInputs, value: string) => {
        setUltrasoundInputs(prev => ({ ...prev, [field]: value }));
    };

    const infoPoints = ['infoPoint1', 'infoPoint2', 'infoPoint3', 'infoPoint4', 'infoPoint5', 'infoPoint6'];

    return (
        <div className="container mx-auto p-4 md:p-6 min-h-screen">
            <div className="flex items-center mb-4">
                <BackButton onClick={() => navigate('/')} />
            </div>
             <header className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-heading flex items-center justify-center gap-2">
                    <BabyCarriageIcon className="text-primary"/>
                    {t('pregnancyCalculator.title')}
                </h1>
            </header>
            
            <main className="max-w-2xl mx-auto space-y-6">
                <div className="bg-card p-3">
                    <div className="flex items-center bg-muted p-1 rounded-lg">
                        <button onClick={() => setMode('conception')} className={`flex-1 py-2 px-3 text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${mode === 'conception' ? 'bg-card shadow' : 'text-muted-foreground'}`}>{t('pregnancyCalculator.mode.conception')}</button>
                        <button onClick={() => setMode('ultrasound')} className={`flex-1 py-2 px-3 text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${mode === 'ultrasound' ? 'bg-card shadow' : 'text-muted-foreground'}`}>{t('pregnancyCalculator.mode.ultrasound')}</button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {mode === 'conception' ? (
                             <div className="bg-card p-6">
                                 <h2 className="text-center font-semibold text-muted-foreground mb-4">{t('pregnancyCalculator.selectSpecies')}</h2>
                                 <SpeciesToggle selected={species} onSelect={setSpecies} />
                                 <div className="space-y-4 mt-6">
                                    <div className="flex justify-between items-center text-sm font-semibold">
                                        <span className="text-muted-foreground">{t('pregnancyCalculator.todaysDate')}: <span className="font-bold text-foreground">{today.toLocaleDateString(locale)}</span></span>
                                        <span className="text-muted-foreground">{t('pregnancyCalculator.daysSinceConception')}: <span className="font-bold text-foreground">{conceptionCalculations ? conceptionCalculations.daysSinceConception : '-'}</span></span>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-border">
                                        <label className="block text-sm font-medium text-card-foreground mb-2 text-start">{t('pregnancyCalculator.chooseConceptionDate')}</label>
                                        <div className="flex items-center bg-muted/50 p-1 rounded-lg max-w-xs mx-auto">
                                            <button onClick={() => setCalendarType('gregorian')} className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition-all ${calendarType === 'gregorian' ? 'bg-card shadow' : 'text-muted-foreground hover:bg-card/50'}`}>{t('otherPage.ageCalculator.gregorian')}</button>
                                            <button onClick={() => setCalendarType('jalali')} className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition-all ${calendarType === 'jalali' ? 'bg-card shadow' : 'text-muted-foreground hover:bg-card/50'}`}>{t('otherPage.ageCalculator.jalali')}</button>
                                        </div>
                                        <ModernDatePicker value={conceptionDate} onChange={setConceptionDate} calendarType={calendarType}/>
                                    </div>
                                </div>
                                
                                <AnimatePresence>
                                    {conceptionCalculations && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 space-y-4">
                                            <div className="text-sm font-semibold text-muted-foreground text-center">{species === 'canine' ? t('pregnancyCalculator.canineGestation') : t('pregnancyCalculator.felineGestation')}</div>
                                            <div className="flex justify-between items-center px-2">
                                                <DateResult label={t('pregnancyCalculator.earlyDueDate')} date={conceptionCalculations.earlyDueDate} className="text-start"/>
                                                <DateResult label={t('pregnancyCalculator.lateDueDate')} date={conceptionCalculations.lateDueDate} className="text-end"/>
                                            </div>
                                            <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                                                 <motion.div className="absolute top-0 left-0 h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${conceptionCalculations.progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }}/>
                                            </div>
                                            <DateResult label={t('pregnancyCalculator.likelyDueDate')} date={conceptionCalculations.likelyDueDate} className="text-center text-lg"/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                             <div className="space-y-6">
                                <div className="bg-card p-6">
                                    <h2 className="text-center font-semibold text-muted-foreground mb-4">{t('pregnancyCalculator.selectSpecies')}</h2>
                                    <SpeciesToggle selected={species} onSelect={setSpecies} />
                                </div>
                                <div className="bg-card p-6 space-y-4">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-heading flex items-center justify-center gap-2"><CalculatorIcon />{t('pregnancyCalculator.ultrasound.title')}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{t('pregnancyCalculator.ultrasound.subtitle')}</p>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.div key={species} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                        {species === 'canine' ? (
                                            <div className="space-y-4 pt-4 border-t border-border">
                                                <h4 className="font-bold text-center text-muted-foreground">{t('pregnancyCalculator.ultrasound.dogsTitle')}</h4>
                                                <CalculationRow label="GSD" formula="(6 × GSD) + 20" value={ultrasoundInputs.gsd} onChange={v => handleUltrasoundInputChange('gsd', v)} age={ultrasoundCalculations.gsd?.age} daysLeft={ultrasoundCalculations.gsd?.daysLeft} />
                                                <CalculationRow label="CRL" formula="(3 × CRL) + 27" value={ultrasoundInputs.crl} onChange={v => handleUltrasoundInputChange('crl', v)} age={ultrasoundCalculations.crl?.age} daysLeft={ultrasoundCalculations.crl?.daysLeft} />
                                                <CalculationRow label="BP" formula="(15 × BP) + 20" value={ultrasoundInputs.bp} onChange={v => handleUltrasoundInputChange('bp', v)} age={ultrasoundCalculations.bp?.age} daysLeft={ultrasoundCalculations.bp?.daysLeft} />
                                                <CalculationRow label="BD" formula="(7 × BD) + 29" value={ultrasoundInputs.bd} onChange={v => handleUltrasoundInputChange('bd', v)} age={ultrasoundCalculations.bd?.age} daysLeft={ultrasoundCalculations.bd?.daysLeft} />
                                                <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                                                    <div className="flex justify-between items-center"><label className="font-bold text-sm text-heading">HD + BD (cm)</label><span className="text-xs text-muted-foreground font-mono">(6×HD)+(3×BD)+30</span></div>
                                                    <div className="grid grid-cols-3 gap-2 items-center">
                                                        <div className="flex gap-1"><input type="number" value={ultrasoundInputs.hd} onChange={e => handleUltrasoundInputChange('hd', e.target.value)} className="form-input text-center w-full" placeholder="HD" /><input type="number" value={ultrasoundInputs.bd} onChange={e => handleUltrasoundInputChange('bd', e.target.value)} className="form-input text-center w-full" placeholder="BD" /></div>
                                                        <div className="text-center bg-card p-2 rounded-md"><div className="text-xs text-muted-foreground">{t('pregnancyCalculator.ultrasound.gestationalAge')}</div><div className="font-bold text-heading">{ultrasoundCalculations.hd_bd?.age !== null ? <AnimatedCounter to={ultrasoundCalculations.hd_bd!.age} precision={1} /> : '--'}</div></div>
                                                        <div className="text-center bg-card p-2 rounded-md"><div className="text-xs text-muted-foreground">{t('pregnancyCalculator.ultrasound.daysToParturition')}</div><div className="font-bold text-heading">{ultrasoundCalculations.hd_bd?.daysLeft !== null ? <AnimatedCounter to={ultrasoundCalculations.hd_bd!.daysLeft} precision={1} /> : '--'}</div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 pt-4 border-t border-border">
                                                 <h4 className="font-bold text-center text-muted-foreground">{t('pregnancyCalculator.ultrasound.catsTitle')}</h4>
                                                 <CalculationRow label="BP" formula="(25 × BP) + 3" value={ultrasoundInputs.bp} onChange={v => handleUltrasoundInputChange('bp', v)} age={ultrasoundCalculations.bp?.age} daysLeft={ultrasoundCalculations.bp?.daysLeft} />
                                                 <CalculationRow label="BD" formula="(11 × BD) + 21" value={ultrasoundInputs.bd} onChange={v => handleUltrasoundInputChange('bd', v)} age={ultrasoundCalculations.bd?.age} daysLeft={ultrasoundCalculations.bd?.daysLeft} />
                                            </div>
                                        )}
                                        </motion.div>
                                    </AnimatePresence>
                                     <div className="pt-4 border-t border-border text-start">
                                        <h4 className="font-semibold text-heading mb-2">{t('pregnancyCalculator.ultrasound.abbreviations')}</h4>
                                        <ul className="text-xs text-muted-foreground space-y-1">
                                            {['GSD', 'CRL', 'BP', 'BD', 'HD'].map(key => <li key={key}>{t(`pregnancyCalculator.ultrasound.abbreviationsList.${key}`)}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="bg-card p-6 text-start">
                    <h3 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
                        <PawIcon/> {t('pregnancyCalculator.pregnancyInfoTitle')}
                    </h3>
                    <ul className="space-y-3 text-sm list-disc ps-5 text-foreground/90">
                        {infoPoints.map(key => <li key={key}>{t(`pregnancyCalculator.${key}`)}</li>)}
                    </ul>
                     <p className="text-xs text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: t('pregnancyCalculator.sourceWithLink', { link: `<a href="https://www.merckvetmanual.com/management-and-nutrition/management-of-reproduction-dogs-and-cats/pregnancy-determination-in-bitches-and-queens" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Merck Veterinary Manual</a>` }) }} />
                </div>
            </main>
        </div>
    );
};

export default PregnancyCalculatorScreen;
