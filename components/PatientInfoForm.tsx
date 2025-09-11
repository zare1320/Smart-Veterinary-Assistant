import React from 'react';
import { usePatient } from '../context/PatientContext';
import { useLocale } from '../context/LocaleContext';
import SegmentedControl from './SegmentedControl';
import type { Gender, AgeGroup } from '../types';
import { dogBreeds, catBreeds, birdBreeds, amphibianBreeds, fishBreeds, mammalBreeds, reptileBreeds } from '../constants';
import BreedSelector from './BreedSelector';

const PatientInfoForm: React.FC = () => {
  const { patientInfo, updatePatientInfo } = usePatient();
  const { t } = useLocale();

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

  const getBreedData = () => {
    const species = patientInfo.species;
    if (species === t('speciesDog')) return { breeds: dogBreeds, key: 'group', placeholder: t('placeholderGermanShepherd') };
    if (species === t('speciesCat')) return { breeds: catBreeds, key: 'origin', placeholder: t('placeholderPersianCat') };
    if (species === t('speciesBird')) return { breeds: birdBreeds, key: 'family', placeholder: t('placeholderCockatiel') };
    if (species === t('speciesMammal')) return { breeds: mammalBreeds, key: 'category', placeholder: t('placeholderHollandLop') };
    if (species === t('speciesAmphibian')) return { breeds: amphibianBreeds, key: 'category', placeholder: t('placeholderRedEyedTreeFrog') };
    if (species === t('speciesFish')) return { breeds: fishBreeds, key: 'category', placeholder: t('placeholderGoldfish') };
    if (species === t('speciesReptile')) return { breeds: reptileBreeds, key: 'category', placeholder: t('placeholderBeardedDragon') };
    return { breeds: [], key: undefined, placeholder: t('enterBreed') };
  };
  
  const { breeds, key: displayInfoKey, placeholder } = getBreedData();

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
            value={patientInfo.weightInKg ?? ''}
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
          value={patientInfo.gender}
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
            value={patientInfo.breed}
            onChange={(breedName) => updatePatientInfo({ breed: breedName })}
            placeholder={placeholder}
            displayInfoKey={displayInfoKey}
        />
      </div>

      {/* Age Group */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2 text-start">{t('ageGroup')}</label>
        <SegmentedControl
          options={ageGroupOptions}
          value={patientInfo.ageGroup}
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
          value={patientInfo.clinicalSigns}
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