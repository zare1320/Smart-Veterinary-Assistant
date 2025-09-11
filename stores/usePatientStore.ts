import { create } from 'zustand';
import type { PatientInfo } from '../types';

interface PatientState extends PatientInfo {
  updatePatientInfo: (updates: Partial<PatientInfo>) => void;
  resetPatientInfo: () => void;
}

const initialState: PatientInfo = {
  species: null,
  weightInKg: null,
  breed: '',
  gender: null,
  ageGroup: null,
  clinicalSigns: '',
};

export const usePatientStore = create<PatientState>((set) => ({
  ...initialState,
  updatePatientInfo: (updates) => set((state) => ({ ...state, ...updates })),
  resetPatientInfo: () => set(initialState),
}));
