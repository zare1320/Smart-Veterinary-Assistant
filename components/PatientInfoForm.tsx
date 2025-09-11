import React, { useState, useEffect } from 'react';
import { usePatientStore } from '../stores/usePatientStore';
import { useLocale } from '../context/LocaleContext';
import SegmentedControl from './SegmentedControl';
import type { Gender, AgeGroup } from '../types';
import { dataService } from '../services/dataService';
import BreedSelector from './BreedSelector';

const PatientInfoForm: React.FC = () => {
  const { species, weightInKg, gender, breed, ageGroup, clinicalSigns, updatePatientInfo } = usePatientStore();
  const { t } = useLocale();
  const [breeds, setBreeds] = useState<any[]>([]);
  const [breedConfig, setBreedConfig] = useState({ key: undefined, placeholder: t('enterBreed') });

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

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updatePatientInfo({ weightInKg: value === '' ? null : parseFloat(value) });
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

  return (
    <div className="space-y-6">
      {/* Weight */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-card-foreground mb-1 text-start">
          {t('weight')} ({t('kg')})
        </label>
        <div className="relative">
          <input
            type="number"
            id="weight"
            name="weightInKg"
            value={weightInKg ?? ''}
            onChange={handleWeightChange}
            placeholder={t('enterWeight')}
            className="custom-form-input text-start"
          />
        </div>
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

      {/* Age Group */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2 text-start">{t('ageGroup')}</label>
        <SegmentedControl
          options={ageGroupOptions}
          value={ageGroup}
          onChange={(value) => updatePatientInfo({ ageGroup: value as AgeGroup })}
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