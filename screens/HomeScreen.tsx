import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SpeciesSelector from '../components/SpeciesSelector';
import PatientInfoForm from '../components/PatientInfoForm';
import VetTools from '../components/VetTools';
import { usePatientStore } from '../stores/usePatientStore';
import { useLocale } from '../context/LocaleContext';
import { dataService } from '../services/dataService';
import type { Species } from '../types';
import { SpeciesSelectorSkeleton } from '../components/skeletons/SpeciesSelectorSkeleton';

const HomeScreen: React.FC = () => {
  const { species, updatePatientInfo, resetPatientInfo } = usePatientStore();
  const { t } = useLocale();
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecies = async () => {
      setIsLoading(true);
      const data = await dataService.getSpecies(t);
      setSpeciesList(data);
      setIsLoading(false);
    };
    fetchSpecies();
  }, [t]);

  const handleSelectSpecies = (speciesName: string) => {
    // If the same species is clicked, deselect it.
    if (species === speciesName) {
      resetPatientInfo();
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
        <div className="bg-card p-4 sm:p-6 transition-all duration-500">
            <h2 className="text-xl font-bold text-start mb-4 text-heading">{t('species')}</h2>
            {isLoading ? (
                <SpeciesSelectorSkeleton />
            ) : (
                <SpeciesSelector
                  species={speciesList}
                  selectedSpecies={species}
                  onSelectSpecies={handleSelectSpecies}
                />
            )}

            {/* Animated prompt message */}
            <div
              className={`transition-all duration-300 ease-in-out text-center overflow-hidden ${
                !species && !isLoading
                  ? 'max-h-20 opacity-100 pt-6 pb-2'
                  : 'max-h-0 opacity-0 pt-0 pb-0'
              }`}
              aria-hidden={!!species || isLoading}
            >
              <p className="text-muted-foreground font-medium text-lg">
                {t('selectSpeciesPrompt')}
              </p>
            </div>


            {/* The animated container for the form */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    species ? 'grid-rows-[1fr] opacity-100 pt-6' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    {/* Divider */}
                    <hr className="border-border mb-6"/>
                    <PatientInfoForm />
                </div>
            </div>
        </div>

        {/* VET TOOLS - also animated and dependent on species selection */}
        <div className={`transition-all duration-500 ease-in-out ${species ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <VetTools />
        </div>

      </main>
    </div>
  );
};

export default HomeScreen;