import React from 'react';
import { AnimalSpecies } from '../../types';

export type DripSet = 10 | 15 | 20 | 60; // gtt/ml
export type DeficitTime = number;

export interface FluidCalculatorState {
  weightKg: number;
  displaySpecies: AnimalSpecies | null;
  
  fluidVolumeMl: number | null;
  dripSet: DripSet;
  
  addDehydration: boolean;
  dehydrationPercent: number | null;
  
  addOngoingLosses: boolean;
  ongoingLosses: number | null;
  
  deficitTime: DeficitTime | null;
  fluidType: string;

  shockDosage: number | null;
  surgicalDosage: number | null;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum ActionTypes {
  SetInitialData = 'SET_INITIAL_DATA',
  SetFluidVolumeMl = 'SET_FLUID_VOLUME_ML',
  SetDripSet = 'SET_DRIP_SET',
  ToggleDehydration = 'TOGGLE_DEHYDRATION',
  SetDehydrationPercent = 'SET_DEHYDRATION_PERCENT',
  ToggleOngoingLosses = 'TOGGLE_ONGOING_LOSSES',
  SetOngoingLosses = 'SET_ONGOING_LOSSES',
  SetDeficitTime = 'SET_DEFICIT_TIME',
  SetFluidType = 'SET_FLUID_TYPE',
  SetShockDosage = 'SET_SHOCK_DOSAGE',
  SetSurgicalDosage = 'SET_SURGICAL_DOSAGE',
}

type FluidCalculatorPayload = {
  [ActionTypes.SetInitialData]: { weightKg: number; species: AnimalSpecies | null };
  [ActionTypes.SetFluidVolumeMl]: number | null;
  [ActionTypes.SetDripSet]: DripSet;
  [ActionTypes.ToggleDehydration]: boolean;
  [ActionTypes.SetDehydrationPercent]: number | null;
  [ActionTypes.ToggleOngoingLosses]: boolean;
  [ActionTypes.SetOngoingLosses]: number | null;
  [ActionTypes.SetDeficitTime]: number | null;
  [ActionTypes.SetFluidType]: string;
  [ActionTypes.SetShockDosage]: number | null;
  [ActionTypes.SetSurgicalDosage]: number | null;
};

export type FluidCalculatorAction = ActionMap<FluidCalculatorPayload>[keyof ActionMap<FluidCalculatorPayload>];

export interface FluidInputCardProps {
  state: FluidCalculatorState;
  dispatch: React.Dispatch<FluidCalculatorAction>;
  onFluidTypeChange: (fluidId: string) => void;
  onDehydrationInfoClick: () => void;
  onLossesInfoClick: () => void;
}

export interface FluidCalculationResults {
  maintenanceRateMlHour: number;
  totalFluidRateMlHour: number;
  shockVolume25: number;
  shockVolumeTotal: number;
  surgicalRateMlHour: number;
}

export interface FluidResultsCardProps {
  state: FluidCalculatorState;
  dispatch: React.Dispatch<FluidCalculatorAction>;
  results: FluidCalculationResults;
}
