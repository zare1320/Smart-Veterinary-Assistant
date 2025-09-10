import React, { useReducer, useEffect, useMemo } from 'react';
import { usePatient } from '../context/PatientContext';
import { useLocale } from '../context/LocaleContext';
import type { ScreenProps } from '../types';
import { AnimalSpecies } from '../types';
import { ActionTypes, FluidCalculatorAction, FluidCalculatorState } from '../components/fluid/FluidCalculatorTypes';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import { BackButton } from '../components/Button';
import FluidInputCard from '../components/fluid/FluidInputCard';
import FluidResultsCard from '../components/fluid/FluidResultsCard';
import PatientInfoDisplay from '../components/PatientInfoDisplay';

const getInitialState = (patientWeight: number, patientSpecies: AnimalSpecies | null): FluidCalculatorState => ({
    weightKg: patientWeight,
    displaySpecies: patientSpecies,
    fluidVolumeMl: 1000,
    dripSet: 15,
    addDehydration: false,
    dehydrationPercent: 5,
    addOngoingLosses: false,
    ongoingLosses: 50,
    deficitTime: 24,
    fluidType: 'lrs',
    shockDosage: patientSpecies === AnimalSpecies.CAT ? 55 : 90,
    surgicalDosage: patientSpecies === AnimalSpecies.CAT ? 3 : 5,
});

function fluidCalculatorReducer(state: FluidCalculatorState, action: FluidCalculatorAction): FluidCalculatorState {
    switch (action.type) {
        case ActionTypes.SetInitialData:
            return getInitialState(action.payload.weightKg, action.payload.species);
        case ActionTypes.SetFluidVolumeMl:
            return { ...state, fluidVolumeMl: action.payload };
        case ActionTypes.SetDripSet:
            return { ...state, dripSet: action.payload };
        case ActionTypes.ToggleDehydration:
            return { ...state, addDehydration: action.payload };
        case ActionTypes.SetDehydrationPercent:
            return { ...state, dehydrationPercent: action.payload };
        case ActionTypes.ToggleOngoingLosses:
            return { ...state, addOngoingLosses: action.payload };
        case ActionTypes.SetOngoingLosses:
            return { ...state, ongoingLosses: action.payload };
        case ActionTypes.SetDeficitTime:
            return { ...state, deficitTime: action.payload };
        case ActionTypes.SetFluidType:
            return { ...state, fluidType: action.payload };
        case ActionTypes.SetShockDosage:
            return { ...state, shockDosage: action.payload };
        case ActionTypes.SetSurgicalDosage:
            return { ...state, surgicalDosage: action.payload };
        default:
            return state;
    }
}

const FluidTherapyCalculatorScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const { patientInfo } = usePatient();
    const { t } = useLocale();

    const getAnimalSpecies = (speciesName: string | null): AnimalSpecies | null => {
        if (!speciesName) return null;
        if (speciesName === t('speciesCat')) return AnimalSpecies.CAT;
        if (speciesName === t('speciesDog')) return AnimalSpecies.DOG;
        return AnimalSpecies.OTHER;
    };

    const patientSpecies = getAnimalSpecies(patientInfo.species);
    const patientWeight = patientInfo.weightInKg || 0;
    
    const [state, dispatch] = useReducer(fluidCalculatorReducer, getInitialState(patientWeight, patientSpecies));
    
    useEffect(() => {
        dispatch({
            type: ActionTypes.SetInitialData,
            payload: { weightKg: patientWeight, species: patientSpecies }
        });
    }, [patientWeight, patientSpecies, t]);

    const results = useMemo(() => {
        const { weightKg, displaySpecies, dehydrationPercent, addDehydration, ongoingLosses, addOngoingLosses, deficitTime, shockDosage, surgicalDosage } = state;
        
        if (weightKg <= 0) {
            return { maintenanceRateMlHour: 0, totalFluidRateMlHour: 0, shockVolume25: 0, shockVolumeTotal: 0, surgicalRateMlHour: 0 };
        }

        const factor = displaySpecies === AnimalSpecies.CAT ? 80 : 132;
        const maintenanceRateMlDay = factor * Math.pow(weightKg, 0.75);
        const maintenanceRateMlHour = maintenanceRateMlDay / 24;

        const dehydrationDeficitMl = addDehydration ? weightKg * ((dehydrationPercent || 0) / 100) * 1000 : 0;
        const dehydrationRateMlHour = (deficitTime && deficitTime > 0) ? dehydrationDeficitMl / deficitTime : 0;

        const ongoingLossesRateMlHour = (addOngoingLosses && deficitTime && deficitTime > 0) ? (ongoingLosses || 0) / deficitTime : 0;
        
        const totalFluidRateMlHour = maintenanceRateMlHour + dehydrationRateMlHour + ongoingLossesRateMlHour;

        const shockVolumeTotal = (shockDosage || 0) * weightKg;
        const shockVolume25 = shockVolumeTotal * 0.25;

        const surgicalRateMlHour = (surgicalDosage || 0) * weightKg;

        return { maintenanceRateMlHour, totalFluidRateMlHour, shockVolume25, shockVolumeTotal, surgicalRateMlHour };
    }, [state]);

    const hasWeight = patientWeight > 0;

    return (
        <>
            {!hasWeight && <MissingPatientWeightBanner />}
            <main className="container mx-auto p-4 md:p-6">
                 <header className="flex justify-between items-center mb-4">
                    <BackButton onClick={() => onNavigate('home')} />
                    <PatientInfoDisplay />
                </header>

                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-inherit">{t('calculatorFluidTherapyTitle')}</h2>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${!hasWeight ? 'opacity-50 pointer-events-none' : ''}`}>
                    <FluidInputCard 
                        state={state}
                        dispatch={dispatch}
                        onFluidTypeChange={(id) => console.log(id)}
                        onDehydrationInfoClick={() => {}}
                        onLossesInfoClick={() => {}}
                    />
                    <FluidResultsCard 
                        state={state}
                        dispatch={dispatch}
                        results={results}
                    />
                </div>
            </main>
        </>
    );
};

export default FluidTherapyCalculatorScreen;
