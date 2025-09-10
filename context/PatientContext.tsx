import React, { createContext, useState, useContext, useMemo, ReactNode, useCallback } from 'react';
import type { PatientInfo } from '../types';

interface PatientContextType {
  patientInfo: PatientInfo;
  updatePatientInfo: (updates: Partial<PatientInfo>) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const initialPatientState: PatientInfo = {
  species: null,
  weightInKg: null,
  breed: '',
  gender: null,
  ageGroup: null,
  clinicalSigns: '',
};

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientState);

  const updatePatientInfo = useCallback((updates: Partial<PatientInfo>) => {
    setPatientInfo(prev => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(() => ({ patientInfo, updatePatientInfo }), [patientInfo, updatePatientInfo]);

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
