import React, { useState, useEffect } from 'react';
import { usePatientStore } from '../stores/usePatientStore';
import { useLocale } from '../context/LocaleContext';
import SegmentedControl from './SegmentedControl';
import type { Gender, AgeGroup } from '../types';
import { dataService } from '../services/dataService';
import BreedSelector from './BreedSelector';
import { useUserStore } from '../stores/useUserStore';
import { motion, AnimatePresence } from 'framer-motion';

const PatientInfoForm: React.FC = () => {
  const { species, weightInKg, gender, breed, ageGroup, clinicalSigns, updatePatientInfo } = usePatientStore();
  const { t } = useLocale();
  const { user } = useUserStore();
  const [breeds, setBreeds] = useState<any[]>([]);
  const [breedConfig, setBreedConfig] = useState({ key: undefined, placeholder: t('enterBreed') });

  const weightUnit = user?.settings?.weightUnit || 'kg';
  const [displayWeight, setDisplayWeight] = useState('');
  const [weightError, setWeightError] = useState<string | null>(null);
  const KG_TO_LB = 2.20462;

  useEffect(() => {
    if (weightInKg === null) {
        setDisplayWeight('');
    } else {
        if (weightUnit === 'lb') {
            setDisplayWeight(Number((weightInKg * KG_TO_LB).toFixed(2)).toString());
        } else {
            setDisplayWeight(Number(weightInKg.toFixed(4)).toString());
        }
    }
  }, [weightInKg, weightUnit]);

  useEffect(() => {
    const fetchBreeds = async () => {
      if (species) {
        const breedData = await dataService.getBreedsForSpecies(species, t);
        const config = dataService.getBreedDisplayInfo(species, t);
        setBreeds(breedData);
        setBreedConfig({ key: config.key as any, placeholder: config.placeholder });
      } else {
        setBreeds([]);
        setBreedConfig({ key: undefined, placeholder: t('enterBreed') });
      }
    };
    fetchBreeds();
  }, [species, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePatientInfo({ [e.target.name]: e.target.value });
  };

  const handleDisplayWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayWeight(value);
    
    const normalizedValue = value.replace(',', '.');
    const parsedValue = parseFloat(normalizedValue);

    if (value === '' || (isNaN(parsedValue) && value !== '-')) {
        updatePatientInfo({ weightInKg: null });
        setWeightError(null);
    } else if (parsedValue <= 0) {
        updatePatientInfo({ weightInKg: null });
        setWeightError(t('weightErrorInvalid'));
    } else if (!isNaN(parsedValue)) {
        const weightInKgValue = weightUnit === 'lb' ? parsedValue / KG_TO_LB : parsedValue;
        updatePatientInfo({ weightInKg: weightInKgValue });
        setWeightError(null);
    }
  };

  const genderOptions = [
    { value: 'Male' as Gender, label: t('male') },
    { value: 'Female' as Gender, label: t('female') },
    { value: 'Unknown' as Gender, label: t('unknown') },
  ];

  const ageGroupOptions = [
    { value: 'neonate' as AgeGroup, label: t('neonate') },
    { value: 'pediatric' as AgeGroup, label: t('pediatric') },
    { value: 'adult' as AgeGroup, label: t('adult') },
    { value: 'geriatric' as AgeGroup, label: t('geriatric') },
  ];
  
  const isWeightValid = displayWeight !== '' && !weightError;

  return (
    <div className="space-y-6">
      {/* Weight */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-card-foreground mb-1 text-start">
          {t('weight')} ({weightUnit})
        </label>
        <div className="relative">
          <input
            type="number"
            id="weight"
            name="weightInKg"
            value={displayWeight}
            onChange={handleDisplayWeightChange}
            placeholder={t('enterWeight')}
            className={`custom-form-input text-start ${weightError ? 'error' : isWeightValid ? 'success' : ''}`}
            step="0.01"
          />
        </div>
         <AnimatePresence>
          {weightError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-500 mt-1 text-start"
            >
              {weightError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2 text-start">{t('gender')}</label>
        <SegmentedControl
          options={genderOptions}
          value={gender}
          onChange={(value) => updatePatientInfo({ gender: value as Gender })}
        />
      </div>

      {/* Age Group */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2 text-start">{t('ageGroup')}</label>
        <SegmentedControl
          options={ageGroupOptions}
          value={ageGroup}
          onChange={(value) => updatePatientInfo({ ageGroup: value as AgeGroup })}
        />
      </div>
      
      {/* Breed */}
      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-card-foreground mb-1 text-start">
          {t('breedOptional')}
        </label>
        <BreedSelector
            breeds={breeds}
            value={breed}
            onChange={(breedName) => updatePatientInfo({ breed: breedName })}
            placeholder={breedConfig.placeholder}
            displayInfoKey={breedConfig.key}
        />
      </div>

      {/* Clinical Signs */}
      <div>
        <label htmlFor="clinicalSigns" className="block text-sm font-medium text-card-foreground mb-1 text-start">
          {t('clinicalSignsOptional')}
        </label>
        <textarea
          id="clinicalSigns"
          name="clinicalSigns"
          value={clinicalSigns}
          onChange={handleInputChange}
          rows={3}
          placeholder={t('enterClinicalSigns')}
          className="custom-form-input text-start"
        />
      </div>
    </div>
  );
};

export default PatientInfoForm;