import React, { useCallback } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { LabeledSelect, LabeledInput } from '../forms';
import { ToggleSwitch, CustomSlider, FormSection } from './FluidFormComponents';
import { FluidInputCardProps, ActionTypes, DripSet } from './FluidCalculatorTypes';


const FLUID_TYPES_KEYS = [
    'lrs', 'normalSaline', 'normosolR', 'plasmalyteA', 'd5w', 'dextroseSaline', 
    'halfSaline', 'hetastarch', 'vetstarch', 'hypertonicSaline', 'wholeBlood', 'prbc', 'ffp'
];
const FLUID_VOLUMES = [20, 50, 100, 250, 500, 1000];
const DRIP_SETS: DripSet[] = [10, 15, 20, 60];

const FluidInputCard: React.FC<FluidInputCardProps> = ({ state, dispatch, onFluidTypeChange }) => {
    const { t } = useLocale();

    const handleDispatch = useCallback((type: ActionTypes, payload: any) => {
        dispatch({ type, payload } as any);
    }, [dispatch]);
    
    return (
        <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-heading mb-6 text-start">{t('fluid.planTitle')}</h3>
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* FIX: Added missing 'id' props to LabeledSelect components for accessibility. */}
                    <LabeledSelect id="fluid-type" label={t('fluid.fluidType')} value={state.fluidType} onChange={(e) => {
                        handleDispatch(ActionTypes.SetFluidType, e.target.value);
                        onFluidTypeChange(e.target.value);
                    }}>
                        {FLUID_TYPES_KEYS.map(ftKey => <option key={ftKey} value={ftKey}>{t(`fluid.types.${ftKey}`)}</option>)}
                    </LabeledSelect>
                    <LabeledSelect id="fluid-volume" label={t('fluid.fluidVolume')} value={String(state.fluidVolumeMl ?? '')} onChange={(e) => handleDispatch(ActionTypes.SetFluidVolumeMl, Number(e.target.value))}>
                        {FLUID_VOLUMES.map(v => <option key={v} value={v}>{v >= 1000 ? `${v/1000}L` : `${v}ml`}</option>)}
                    </LabeledSelect>
                    <LabeledSelect id="drip-set" label={t('fluid.dripSet')} value={state.dripSet} onChange={(e) => handleDispatch(ActionTypes.SetDripSet, Number(e.target.value) as DripSet)}>
                        {DRIP_SETS.map(ds => <option key={ds} value={ds}>{ds} gtt/ml {ds === 60 && ` ${t('fluid.types.buretrol')}`}</option>)}
                    </LabeledSelect>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-border/50">
                    <ToggleSwitch
                        label={t('fluid.dehydration.title')}
                        checked={state.addDehydration}
                        onChange={(e) => handleDispatch(ActionTypes.ToggleDehydration, e.target.checked)}
                    />
                    <ToggleSwitch
                        label={t('fluid.ongoingLosses.title')}
                        checked={state.addOngoingLosses}
                        onChange={(e) => handleDispatch(ActionTypes.ToggleOngoingLosses, e.target.checked)}
                    />
                </div>
                
                {state.addDehydration && (
                    <FormSection title={t('fluid.dehydration.title')} icon="fa-droplet">
                        <CustomSlider
                            min={0} max={15} step={1}
                            value={state.dehydrationPercent}
                            onChange={(e) => handleDispatch(ActionTypes.SetDehydrationPercent, Number(e.target.value))}
                            unit="%"
                        />
                    </FormSection>
                )}
                
                {state.addOngoingLosses && (
                     <FormSection title={t('fluid.ongoingLosses.title')} icon="fa-arrow-trend-down">
                        <CustomSlider
                            min={0} max={500} step={10}
                            value={state.ongoingLosses}
                            onChange={(e) => handleDispatch(ActionTypes.SetOngoingLosses, Number(e.target.value))}
                            unit="ml"
                        />
                    </FormSection>
                )}

                {(state.addDehydration || state.addOngoingLosses) && (
                    <FormSection title={t('fluid.replaceTimeTitle')} icon="fa-stopwatch">
                        <LabeledInput
                            // FIX: Added the missing 'id' property to satisfy component props.
                            id="deficit-time"
                            label={t('fluid.replaceTime')}
                            type="number"
                            value={state.deficitTime ?? ''}
                            onChange={(e) => handleDispatch(ActionTypes.SetDeficitTime, e.target.value === '' ? null : Number(e.target.value))}
                            min="1"
                            unit={t('fluid.volume.hours')}
                        />
                    </FormSection>
                )}
            </div>
        </div>
    );
};

export default FluidInputCard;