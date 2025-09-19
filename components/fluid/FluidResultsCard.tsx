import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { FluidResultsCardProps, ActionTypes } from './FluidCalculatorTypes';
import { AnimalSpecies } from '../../types';
import { Icon, Tooltip } from './FluidFormComponents';
import AnimatedCounter from '../AnimatedCounter';

const VET_CONSTANTS = {
  [AnimalSpecies.DOG]: {
    maintenanceFactor: 132,
    shockDoseRange: '80 - 90 ml/kg IV',
    surgicalDoseRange: '2 - 6 ml/kg/hr IV',
  },
  [AnimalSpecies.CAT]: {
    maintenanceFactor: 80,
    shockDoseRange: '50 - 60 ml/kg IV',
    surgicalDoseRange: '2 - 3 ml/kg/hr IV',
  },
  [AnimalSpecies.OTHER]: { // Defaulting to Dog values for 'other'
    maintenanceFactor: 132,
    shockDoseRange: '80 - 90 ml/kg IV',
    surgicalDoseRange: '2 - 6 ml/kg/hr IV',
  },
};

const SectionCard: React.FC<{ icon: React.ReactNode; title: string; tooltipContent?: React.ReactNode; children: React.ReactNode }> = ({ icon, title, tooltipContent, children }) => (
  <div className="bg-card/50 p-5 rounded-xl border border-border/50">
    <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-4">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-base font-bold text-heading text-start">{title}</h3>
      </div>
      {tooltipContent && <Tooltip content={tooltipContent} />}
    </div>
    {children}
  </div>
);

const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const ResultPill: React.FC<{ value: number; unit: string; label?: string; className?: string; precision?: number }> = ({ value, unit, label, className, precision = 1 }) => (
    <div className={clsx("flex flex-col items-center", className)}>
      {label && <span className="text-xs text-foreground/60 dark:text-foreground/60 mb-1.5 font-medium">{label}</span>}
      <div className="bg-sky-500/10 dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 font-bold rounded-full px-4 py-1.5 text-center w-full">
        <span className="text-lg">
            { isNaN(value) || !isFinite(value) ? '---' : <AnimatedCounter to={value} precision={precision} /> }
        </span>
        <span className="text-xs ms-1 opacity-80">{unit}</span>
      </div>
    </div>
);

const MaintenanceResults: React.FC<any> = ({ state, results, t, localizeNumber }) => {
  const speciesKey = state.displaySpecies || AnimalSpecies.OTHER;
  const constants = VET_CONSTANTS[speciesKey];
  const maintenanceRateMlDay = constants.maintenanceFactor * Math.pow(state.weightKg, 0.75);
  const SpeciesIcon = state.displaySpecies === AnimalSpecies.CAT ? "fa-cat" : "fa-dog";

  return (
    <SectionCard
      icon={<Icon name="fa-arrows-rotate" className="text-2xl text-sky-600 dark:text-sky-400" />}
      title={t('fluid.maintenance.title')}
      tooltipContent={<span className="font-mono" dir="ltr">{constants.maintenanceFactor} x (kg)<sup>0.75</sup></span>}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-lg">
          <span className="font-semibold flex items-center gap-2">
            <Icon name={SpeciesIcon} className="w-5 h-5" />
            {t('fluid.maintenance.dosageDaily')}
          </span>
          <span className="font-mono font-bold text-base">
            {localizeNumber(maintenanceRateMlDay.toFixed(0))} ml/day
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center">
          <ResultPill label="1X" value={results.maintenanceRateMlHour} unit="ml/hr" />
          <ResultPill label="1.5X" value={results.maintenanceRateMlHour * 1.5} unit="ml/hr" />
          <ResultPill label="2X" value={results.maintenanceRateMlHour * 2.0} unit="ml/hr" />
        </div>
        
        {(state.addDehydration || state.addOngoingLosses) && state.deficitTime ? (
           <div className="text-center border-t border-border/50 pt-4">
              <p className="text-sm font-semibold mb-2">{t('fluid.maintenance.initialRate')}</p>
              <div className="flex items-center justify-center gap-2">
                <ResultPill value={results.totalFluidRateMlHour} unit="ml/hr" className="w-32" />
                <span className="font-semibold text-sm text-muted-foreground">for {state.deficitTime}h</span>
              </div>
           </div>
        ) : null}
      </div>
    </SectionCard>
  );
};

const ShockTherapy: React.FC<any> = ({ state, results, handleNumberChange, t }) => {
  const speciesKey = state.displaySpecies || AnimalSpecies.OTHER;
  const constants = VET_CONSTANTS[speciesKey];
  
  return (
    <SectionCard
      icon={<Icon name="fa-bolt" className="text-2xl text-red-600 dark:text-red-400" />}
      title={t('fluid.shock.title')}
      tooltipContent={<span className="font-mono" dir="ltr">{constants.shockDoseRange}</span>}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="shock-dosage" className="text-sm font-semibold whitespace-nowrap">
            {t('fluid.shock.dosage')}
          </label>
          <input
            id="shock-dosage"
            type="number"
            value={state.shockDosage ?? ''}
            onChange={(e) => handleNumberChange(ActionTypes.SetShockDosage, e.target.value)}
            className="form-input text-center font-mono !py-1 w-24 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 text-center w-full md:w-auto">
          <ResultPill label="Bolus (15min)" value={results.shockVolume25} unit="ml" />
          <ResultPill label="Total" value={results.shockVolumeTotal} unit="ml" precision={0} />
        </div>
      </div>
    </SectionCard>
  );
};

const SurgicalFluids: React.FC<any> = ({ state, results, handleNumberChange, t }) => {
  const speciesKey = state.displaySpecies || AnimalSpecies.OTHER;
  const constants = VET_CONSTANTS[speciesKey];
  
  return (
    <SectionCard
      icon={<Icon name="fa-scissors" className="text-2xl text-indigo-600 dark:text-indigo-400" />}
      title={t('fluid.surgical.title')}
      tooltipContent={<span className="font-mono" dir="ltr">{constants.surgicalDoseRange}</span>}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex items-center gap-2">
          <label htmlFor="surgical-dosage" className="text-sm font-semibold whitespace-nowrap">
            {t('fluid.surgical.dosage')}
          </label>
          <input
            id="surgical-dosage"
            type="number"
            value={state.surgicalDosage ?? ''}
            onChange={(e) => handleNumberChange(ActionTypes.SetSurgicalDosage, e.target.value)}
            className="form-input text-center font-mono !py-1 w-24 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <ResultPill value={results.surgicalRateMlHour} unit="ml/hr" className="w-32"/>
      </div>
    </SectionCard>
  );
};

const FluidResultsCard: React.FC<FluidResultsCardProps> = ({ state, dispatch, results }) => {
    const { t, localizeNumber } = useLocale();

    const handleNumberChange = (actionType: ActionTypes, value: string) => {
        const num = value === '' ? null : parseFloat(value);
        if (num === null || !isNaN(num)) {
            dispatch({ type: actionType, payload: num } as any);
        }
    };
    
    const sharedProps = { state, results, handleNumberChange, t, localizeNumber };

    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-heading text-start">{t('fluid.resultsTitle')}</h3>
            <MaintenanceResults {...sharedProps} />
            <ShockTherapy {...sharedProps} />
            <SurgicalFluids {...sharedProps} />
        </div>
    );
};

export default FluidResultsCard;