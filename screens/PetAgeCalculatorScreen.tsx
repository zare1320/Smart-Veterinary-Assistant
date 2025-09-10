import React, { useState, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { Icon } from '../components/Icons';
import InfoModal from '../components/InfoModal';
import { BackButton } from '../components/Button';
import type { ScreenProps } from '../types';
import ModernDatePicker from '../components/ModernDatePicker';

// A new, visually prominent component for displaying calculation results
const CalculationResultCard: React.FC<{ title: string; result: string | null; iconName: string }> = ({ title, result, iconName }) => (
    <div className="bg-gradient-to-br from-[#2DD4BF] to-[#29a594] dark:from-[#2DD4BF] dark:to-[#23b3a0] rounded-2xl p-6 text-white shadow-lg shadow-[#2DD4BF]/30 dark:shadow-[#2DD4BF]/20 h-full flex flex-col justify-center items-center text-center">
        <Icon iconName={iconName} className="text-4xl mb-2 opacity-80" />
        <p className="text-lg opacity-80">{title}</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight h-16">
            {result || '—'}
        </p>
    </div>
);


const CurrentAgeCalculator: React.FC = () => {
    const { t, localizeNumber, locale } = useLocale();
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [calculatedAge, setCalculatedAge] = useState<string | null>(null);
    const [calendarType, setCalendarType] = useState<'gregorian' | 'jalali'>(locale === 'fa' ? 'jalali' : 'gregorian');

    useEffect(() => {
        setCalendarType(locale === 'fa' ? 'jalali' : 'gregorian');
    }, [locale]);

    useEffect(() => {
        if (!birthDate) {
            setCalculatedAge(null);
            return;
        }

        const dob = birthDate;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dob.setHours(0, 0, 0, 0);

        if (dob > today) {
            setCalculatedAge(null);
            return;
        }

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const parts = [];
        if (years > 0) parts.push(`${localizeNumber(years)} ${t('otherPage.ageCalculator.units.years')}`);
        if (months > 0) parts.push(`${localizeNumber(months)} ${t('otherPage.ageCalculator.units.months')}`);
        if (days > 0 && years < 1) parts.push(`${localizeNumber(days)} ${t('otherPage.ageCalculator.units.days')}`);
        if(parts.length === 0 && dob.getTime() === today.getTime()){
             parts.push(`0 ${t('otherPage.ageCalculator.units.days')}`)
        }
        
        setCalculatedAge(parts.join(' '));

    }, [birthDate, t, localizeNumber]);

    return (
        <div className="glass-card p-6 md:p-8">
            <h3 className="text-2xl font-bold text-inherit mb-4 flex items-center gap-2 text-start">
                <Icon iconName="fa-cake-candles" className="text-3xl text-inherit/80" />
                {t('otherPage.ageCalculator.currentAgeTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-inherit mb-2 text-start">{t('otherPage.ageCalculator.calendarType')}</label>
                        <div className="flex items-center bg-black/10 dark:bg-black/20 p-1 rounded-lg">
                            <button onClick={() => setCalendarType('gregorian')} className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition-all ${calendarType === 'gregorian' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-black/20'}`}>{t('otherPage.ageCalculator.gregorian')}</button>
                            <button onClick={() => setCalendarType('jalali')} className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition-all ${calendarType === 'jalali' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-black/20'}`}>{t('otherPage.ageCalculator.jalali')}</button>
                        </div>
                    </div>
                    <ModernDatePicker
                        value={birthDate}
                        onChange={setBirthDate}
                        calendarType={calendarType}
                    />
                </div>
                <CalculationResultCard 
                    title={t('otherPage.ageCalculator.currentAgeResult')}
                    result={calculatedAge}
                    iconName="fa-cake-candles"
                />
            </div>
        </div>
    );
};

const HumanYearsCalculator: React.FC = () => {
    const { t, localizeNumber } = useLocale();

    const [calculationMethod, setCalculationMethod] = useState<'formula' | 'table'>('formula');
    const [dogAgeFormula, setDogAgeFormula] = useState('');
    const [humanAgeFormula, setHumanAgeFormula] = useState<string | null>(null);
    const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
    
    const [petAgeTable, setPetAgeTable] = useState('');
    const [species, setSpecies] = useState<'feline' | 'canine'>('feline');
    const [weightRange, setWeightRange] = useState('0-20');
    const [humanAgeTable, setHumanAgeTable] = useState<string | null>(null);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    const agingTableData = [
        { pet: 1, feline: 7, canine: { '0-20': 7, '20-50': 7, '50-90': 8, '>90': 9 } },
        { pet: 2, feline: 13, canine: { '0-20': 13, '20-50': 14, '50-90': 16, '>90': 18 } },
        { pet: 3, feline: 20, canine: { '0-20': 20, '20-50': 21, '50-90': 24, '>90': 26 } },
        { pet: 4, feline: 26, canine: { '0-20': 26, '20-50': 27, '50-90': 31, '>90': 34 } },
        { pet: 5, feline: 33, canine: { '0-20': 33, '20-50': 34, '50-90': 38, '>90': 41 } },
        { pet: 6, feline: 40, canine: { '0-20': 40, '20-50': 42, '50-90': 45, '>90': 49 } },
        { pet: 7, feline: 44, canine: { '0-20': 44, '20-50': 47, '50-90': 50, '>90': 56 } },
        { pet: 8, feline: 48, canine: { '0-20': 48, '20-50': 51, '50-90': 55, '>90': 64 } },
        { pet: 9, feline: 52, canine: { '0-20': 52, '20-50': 56, '50-90': 61, '>90': 71 } },
        { pet: 10, feline: 56, canine: { '0-20': 56, '20-50': 60, '50-90': 66, '>90': 78 } },
        { pet: 11, feline: 60, canine: { '0-20': 60, '20-50': 65, '50-90': 72, '>90': 86 } },
        { pet: 12, feline: 64, canine: { '0-20': 64, '20-50': 69, '50-90': 77, '>90': 93 } },
        { pet: 13, feline: 68, canine: { '0-20': 68, '20-50': 74, '50-90': 82, '>90': 101 } },
        { pet: 14, feline: 72, canine: { '0-20': 72, '20-50': 78, '50-90': 88, '>90': 108 } },
        { pet: 15, feline: 76, canine: { '0-20': 76, '20-50': 83, '50-90': 93, '>90': 115 } },
        { pet: 16, feline: 80, canine: { '0-20': 80, '20-50': 87, '50-90': 99, '>90': 123 } },
        { pet: 17, feline: 84, canine: { '0-20': 84, '20-50': 92, '50-90': 104, '>90': null } },
        { pet: 18, feline: 88, canine: { '0-20': 88, '20-50': 96, '50-90': 109, '>90': null } },
        { pet: 19, feline: 92, canine: { '0-20': 92, '20-50': 101, '50-90': 115, '>90': null } },
        { pet: 20, feline: 96, canine: { '0-20': 96, '20-50': 105, '50-90': 120, '>90': null } },
    ];
    
    useEffect(() => {
        const age = parseFloat(dogAgeFormula);
        if (age > 0) {
            const humanAge = 16 * Math.log(age) + 31;
            setHumanAgeFormula(localizeNumber(humanAge.toFixed(1)));
        } else {
            setHumanAgeFormula(null);
        }
    }, [dogAgeFormula, localizeNumber]);

    useEffect(() => {
        const age = Math.floor(parseFloat(petAgeTable));
        if (age > 0) {
            const row = agingTableData.find(r => r.pet === age);
            if(row) {
                const result = species === 'feline' ? row.feline : row.canine[weightRange as keyof typeof row.canine];
                setHumanAgeTable(result ? localizeNumber(String(result)) : null);
            } else {
                 setHumanAgeTable(null);
            }
        } else {
            setHumanAgeTable(null);
        }
    }, [petAgeTable, species, weightRange, localizeNumber, agingTableData]);

    const activeResult = calculationMethod === 'formula' ? humanAgeFormula : humanAgeTable;

    const weightRangeOptions = {
        '0-20': t('otherPage.ageCalculator.weightRanges.0-20'),
        '20-50': t('otherPage.ageCalculator.weightRanges.20-50'),
        '50-90': t('otherPage.ageCalculator.weightRanges.50-90'),
        '>90': t('otherPage.ageCalculator.weightRanges.>90'),
    };

    return (
        <div className="glass-card p-6 md:p-8">
            <h3 className="text-2xl font-bold text-inherit mb-2 flex items-center gap-2 text-start">
                <Icon iconName="fa-users" className="text-3xl text-inherit/80" />
                {t('otherPage.ageCalculator.humanYearsTitle')}
            </h3>
            
            <div className="mb-6">
                <label className="block text-sm font-medium text-inherit mb-2 text-start">{t('otherPage.ageCalculator.calculationMethod')}</label>
                <div className="flex items-center bg-black/10 dark:bg-black/20 p-1 rounded-lg">
                    <button onClick={() => setCalculationMethod('formula')} className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition-all ${calculationMethod === 'formula' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-black/20'}`}>{t('otherPage.ageCalculator.formula')}</button>
                    <button onClick={() => setCalculationMethod('table')} className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition-all ${calculationMethod === 'table' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-black/20'}`}>{t('otherPage.ageCalculator.table')}</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                {calculationMethod === 'formula' ? (
                    <div>
                         <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-inherit text-start">{t('otherPage.ageCalculator.dogFormulaTitle')}</h4>
                            <button onClick={() => setIsFormulaModalOpen(true)} aria-label={t('moreInfo')} className="text-inherit/60 hover:text-inherit transition-colors"><Icon iconName="fa-circle-question" className="w-5 h-5" /></button>
                        </div>
                        <label htmlFor="dog-age-formula" className="block text-sm font-medium text-inherit mb-2 text-start">{t('otherPage.ageCalculator.enterDogAge')}</label>
                        <input id="dog-age-formula" type="number" value={dogAgeFormula} onChange={(e) => setDogAgeFormula(e.target.value)} className="form-input" placeholder="e.g., 1.5" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="pet-age-table" className="block text-sm font-medium text-inherit mb-2 text-start">{t('otherPage.ageCalculator.petAgeLabel')}</label>
                            <input id="pet-age-table" type="number" value={petAgeTable} onChange={(e) => setPetAgeTable(e.target.value)} className="form-input" placeholder="e.g., 5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-inherit mb-2 text-start">{t('otherPage.ageCalculator.speciesLabel')}</label>
                            <select value={species} onChange={(e) => setSpecies(e.target.value as any)} className="form-input">
                                <option value="feline">{t('animalSpecies.CAT')}</option>
                                <option value="canine">{t('animalSpecies.DOG')}</option>
                            </select>
                        </div>
                        {species === 'canine' && (
                            <div>
                                <label className="block text-sm font-medium text-inherit mb-2 text-start">{t('otherPage.ageCalculator.dogWeightLabel')}</label>
                                <select value={weightRange} onChange={(e) => setWeightRange(e.target.value)} className="form-input">
                                    {Object.entries(weightRangeOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button onClick={() => setIsTableModalOpen(true)} className="text-xs font-semibold text-inherit/70 hover:underline text-start">{t('otherPage.ageCalculator.viewTableButton')}</button>
                    </div>
                )}

                <CalculationResultCard 
                    title={t('otherPage.ageCalculator.ageInHumanYears')}
                    result={activeResult}
                    iconName="fa-paw"
                />
            </div>

            <InfoModal isOpen={isTableModalOpen} onClose={() => setIsTableModalOpen(false)} title={t('otherPage.ageCalculator.traditionalTableTitle')}>
                 <div className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
                    <table className="w-full text-center">
                        <thead className="bg-black/5 dark:bg-black/20">
                            <tr>
                                <th rowSpan={2} className="p-3 text-sm font-semibold tracking-wide border-b border-e border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.tableHeaders.petYears')}</th>
                                <th rowSpan={2} className="p-3 text-sm font-semibold tracking-wide border-b border-e border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.tableHeaders.feline')}</th>
                                <th colSpan={4} className="p-3 text-sm font-semibold tracking-wide border-b border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.tableHeaders.canine')}</th>
                            </tr>
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide border-b border-e border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.weightRanges.0-20')}</th>
                                <th className="p-3 text-sm font-semibold tracking-wide border-b border-e border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.weightRanges.20-50')}</th>
                                <th className="p-3 text-sm font-semibold tracking-wide border-b border-e border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.weightRanges.50-90')}</th>
                                <th className="p-3 text-sm font-semibold tracking-wide border-b border-black/10 dark:border-white/10">{t('otherPage.ageCalculator.weightRanges.>90')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agingTableData.map(row => (
                                <tr key={row.pet} className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5">
                                    <td className="p-2 font-mono font-bold border-e border-black/10 dark:border-white/10">{localizeNumber(row.pet)}</td>
                                    <td className="p-2 font-mono border-e border-black/10 dark:border-white/10">{localizeNumber(row.feline)}</td>
                                    <td className="p-2 font-mono border-e border-black/10 dark:border-white/10">{localizeNumber(row.canine['0-20'])}</td>
                                    <td className="p-2 font-mono border-e border-black/10 dark:border-white/10">{localizeNumber(row.canine['20-50'])}</td>
                                    <td className="p-2 font-mono border-e border-black/10 dark:border-white/10">{localizeNumber(row.canine['50-90'])}</td>
                                    <td className="p-2 font-mono">{row.canine['>90'] ? localizeNumber(row.canine['>90']) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </InfoModal>
            <InfoModal isOpen={isFormulaModalOpen} onClose={() => setIsFormulaModalOpen(false)} title={t('otherPage.ageCalculator.formulaModalTitle')}>
                <div className="space-y-4">
                    <p className="text-inherit leading-relaxed">{t('otherPage.ageCalculator.dogFormulaDesc')}</p>
                    <p className="text-sm text-inherit/70">*{t('otherPage.ageCalculator.reference')} <a href="https://www.cell.com/cell-systems/fulltext/S2405-4712(20)30239-2" target="_blank" rel="noopener noreferrer" className="text-inherit hover:underline">{t('otherPage.ageCalculator.referenceLinkText')}</a></p>
                </div>
            </InfoModal>
        </div>
    );
};


const PetAgeCalculatorScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const { t } = useLocale();
    return (
        <main className="container mx-auto p-4 md:p-6">
            <div className="mb-6">
                <BackButton onClick={() => onNavigate('home')} />
            </div>
            <div className="text-center py-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-inherit">{t('otherPage.ageCalculator.pageTitle')}</h2>
            </div>
            <div className="flex flex-col gap-8">
                <CurrentAgeCalculator />
                <HumanYearsCalculator />
            </div>
        </main>
    );
};

export default PetAgeCalculatorScreen;
