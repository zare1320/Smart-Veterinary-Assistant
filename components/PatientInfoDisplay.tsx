import React from 'react';
import { usePatientStore } from '../stores/usePatientStore';
import { useLocale } from '../context/LocaleContext';
import { getSpeciesList } from '../constants';

const PatientInfoDisplay: React.FC = () => {
    const { species, weightInKg, breed } = usePatientStore(
        state => ({ species: state.species, weightInKg: state.weightInKg, breed: state.breed })
    );
    const { t, locale, localizeNumber } = useLocale();

    // Get the full species list to act as the single source of truth for images.
    const speciesList = getSpeciesList(t);

    const speciesName = species || '---';
    const weightDisplay = weightInKg ? `${localizeNumber(weightInKg.toFixed(2))} ${t('kg')}` : '---';

    // Find the selected species object from the master list.
    const selectedSpeciesObject = species 
        ? speciesList.find(s => s.name === species)
        : null;

    // Use the imageUrl from the found object, with a robust fallback.
    const imageSrc = selectedSpeciesObject 
        ? selectedSpeciesObject.imageUrl
        : 'https://i.postimg.cc/P5gLp2f0/default-pet.png'; // A generic default pet icon

    return (
        <div className="flex items-center gap-4 p-2 rounded-lg bg-muted/50">
            <img src={imageSrc} alt={speciesName} className="w-12 h-12 rounded-full object-cover" />
            <div className={locale === 'fa' ? 'text-right' : 'text-left'}>
                <h3 className="font-bold text-sm text-heading">
                    {speciesName}
                    {breed && <span className="font-normal text-xs text-foreground/80"> ({breed})</span>}
                </h3>
                <p className="text-sm font-mono text-foreground/80">{weightDisplay}</p>
            </div>
        </div>
    );
};

export default PatientInfoDisplay;
