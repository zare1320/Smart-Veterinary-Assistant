import React from 'react';
import Header from '../components/Header';
import SpeciesSelector from '../components/SpeciesSelector';
import PatientInfoForm from '../components/PatientInfoForm';
import VetTools from '../components/VetTools';
import { getSpeciesList } from '../constants';
import { usePatient } from '../context/PatientContext';
import type { ScreenProps } from '../types';
import { useLocale } from '../context/LocaleContext';

const HomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { patientInfo, updatePatientInfo } = usePatient();
  const { t } = useLocale();
  const speciesList = getSpeciesList(t);

  const handleSelectSpecies = (speciesName: string) => {
    // If the same species is clicked, deselect it.
    if (patientInfo.species === speciesName) {
      updatePatientInfo({
        species: null,
        weightInKg: null,
        breed: '',
        gender: null,
        ageGroup: null,
        clinicalSigns: ''
      });
    } else {
      // Otherwise, select the new species and reset other fields.
      updatePatientInfo({
        species: speciesName,
        weightInKg: null,
        breed: '',
        gender: null,
        ageGroup: null,
        clinicalSigns: ''
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Header />
      <main className="p-4 space-y-6">
        {/* Main Interactive Patient Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-4 sm:p-6 transition-all duration-500">
            <h2 className="text-xl font-bold text-start mb-4 text-slate-900 dark:text-slate-100">{t('species')}</h2>
            <SpeciesSelector
              species={speciesList}
              selectedSpecies={patientInfo.species}
              onSelectSpecies={handleSelectSpecies}
            />

            {/* Animated prompt message */}
            <div
              className={`transition-all duration-300 ease-in-out text-center overflow-hidden ${
                !patientInfo.species
                  ? 'max-h-20 opacity-100 pt-6 pb-2'
                  : 'max-h-0 opacity-0 pt-0 pb-0'
              }`}
              aria-hidden={!!patientInfo.species}
            >
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                {t('selectSpeciesPrompt')}
              </p>
            </div>


            {/* The animated container for the form */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    patientInfo.species ? 'grid-rows-[1fr] opacity-100 pt-6' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    {/* Divider */}
                    <hr className="border-slate-200 dark:border-slate-700 mb-6"/>
                    <PatientInfoForm />
                </div>
            </div>
        </div>

        {/* VET TOOLS - also animated and dependent on species selection */}
        <div className={`transition-all duration-500 ease-in-out ${patientInfo.species ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <VetTools onNavigate={onNavigate} />
        </div>

      </main>
    </div>
  );
};

export default HomeScreen;