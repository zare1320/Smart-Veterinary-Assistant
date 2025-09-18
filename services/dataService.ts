import type { Species, Protocol, Drug, DrugCategory, MedicationProfile, Medication, Plant } from '../types';
import { getSpeciesList } from '../constants';
import { dogBreeds, catBreeds, birdBreeds, mammalBreeds, reptileBreeds, amphibianBreeds, fishBreeds } from './_breedDataSource';
import { allDrugs, drugCategories } from './_drugDataSource';
import { getDefaultProtocols } from './_protocolDataSource';
import { poisonousPlants } from './_plantDataSource';

// --- API Simulation ---
// A short delay to simulate network latency
const FAKE_DELAY = 200; 
const MOCK_API = <T>(data: T): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), FAKE_DELAY));

// --- Species and Breeds ---

const getSpecies = async (t: (key: string) => string): Promise<Species[]> => {
    return MOCK_API(getSpeciesList(t));
}

const getBreedsForSpecies = async (speciesName: string, t: (key: string) => string): Promise<any[]> => {
    const speciesMap: { [key: string]: any[] } = {
        [t('speciesDog')]: dogBreeds,
        [t('speciesCat')]: catBreeds,
        [t('speciesBird')]: birdBreeds,
        [t('speciesMammal')]: mammalBreeds,
        [t('speciesReptile')]: reptileBreeds,
        [t('speciesAmphibian')]: amphibianBreeds,
        [t('speciesFish')]: fishBreeds,
    };
    return MOCK_API(speciesMap[speciesName] || []);
};

const getBreedDisplayInfo = (speciesName: string, t: (key: string) => string): { key: string; placeholder: string } => {
    const infoMap: { [key: string]: { key: string; placeholder: string } } = {
        [t('speciesDog')]: { key: 'group', placeholder: t('placeholderGermanShepherd') },
        [t('speciesCat')]: { key: 'origin', placeholder: t('placeholderPersianCat') },
        [t('speciesBird')]: { key: 'family', placeholder: t('placeholderCockatiel') },
        [t('speciesMammal')]: { key: 'category', placeholder: t('placeholderHollandLop') },
        [t('speciesAmphibian')]: { key: 'category', placeholder: t('placeholderRedEyedTreeFrog') },
        [t('speciesFish')]: { key: 'category', placeholder: t('placeholderGoldfish') },
        [t('speciesReptile')]: { key: 'category', placeholder: t('placeholderBeardedDragon') },
    };
    return infoMap[speciesName] || { key: '', placeholder: t('enterBreed') };
}


// --- Protocols ---

const CUSTOM_PROTOCOLS_KEY = 'vet_custom_protocols';

const getCustomProtocols = async (): Promise<Protocol[]> => {
    const data = localStorage.getItem(CUSTOM_PROTOCOLS_KEY) || '[]';
    return MOCK_API(JSON.parse(data));
};

const saveCustomProtocol = async (protocol: Protocol): Promise<void> => {
    const protocols = await getCustomProtocols();
    const updatedProtocols = [...protocols, protocol];
    localStorage.setItem(CUSTOM_PROTOCOLS_KEY, JSON.stringify(updatedProtocols));
    return MOCK_API(undefined);
};

const getAllProtocols = async (t: (key: string) => string): Promise<Protocol[]> => {
    const defaultProtocols = getDefaultProtocols(t);
    const customProtocols = await getCustomProtocols();
    return [...defaultProtocols, ...customProtocols];
};

const getProtocolById = async (id: string, t: (key: string) => string): Promise<Protocol | undefined> => {
    const all = await getAllProtocols(t);
    return MOCK_API(all.find(p => p.id === id));
};


// --- Drugs ---

const getAllDrugs = async (): Promise<Drug[]> => {
    return MOCK_API(allDrugs);
}

const getDrugCategories = async (): Promise<DrugCategory[]> => {
    return MOCK_API(drugCategories);
}

// --- Poisonous Plants ---
const getPoisonousPlants = async (): Promise<Plant[]> => {
    return MOCK_API(poisonousPlants);
}

// FIX: Added missing data service functions for "My Meds" feature to resolve property-not-found errors.
// --- My Med List ---

const MEDICATION_PROFILES_KEY = 'vet_med_profiles';
const MEDICATIONS_KEY = 'vet_medications';

const getDefaultProfiles = (t: (key: string) => string): MedicationProfile[] => [
    { id: 1, name: t('myMedList.maxGoldenRetriever'), imageUrl: 'https://i.postimg.cc/4x28nG8x/dog-2.png' },
    { id: 2, name: t('myMedList.lunaPersianCat'), imageUrl: 'https://i.postimg.cc/VNSKChTB/cat-2.png' },
];

const getDefaultMedications = (t: (key: string) => string): Medication[] => [
    { id: 1, profileId: 1, name: 'Meloxicam', formulation: t('myMedList.meloxicamSuspension'), instructions: t('myMedList.meloxicamInstructions') },
    { id: 2, profileId: 2, name: 'Clavamox', formulation: t('myMedList.clavamoxTablets'), instructions: t('myMedList.clavamoxInstructions') },
];

const getProfiles = async (t: (key: string) => string): Promise<MedicationProfile[]> => {
    const stored = localStorage.getItem(MEDICATION_PROFILES_KEY);
    if (stored) {
        return MOCK_API(JSON.parse(stored));
    }
    const defaults = getDefaultProfiles(t);
    localStorage.setItem(MEDICATION_PROFILES_KEY, JSON.stringify(defaults));
    return MOCK_API(defaults);
};

const getMedications = async (t: (key: string) => string): Promise<Medication[]> => {
    const stored = localStorage.getItem(MEDICATIONS_KEY);
    if (stored) {
        return MOCK_API(JSON.parse(stored));
    }
    const defaults = getDefaultMedications(t);
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(defaults));
    return MOCK_API(defaults);
};

const saveProfile = async (data: { id?: number; name: string; imageUrl: string }, t: (key: string) => string): Promise<MedicationProfile[]> => {
    let profiles = JSON.parse(localStorage.getItem(MEDICATION_PROFILES_KEY) || '[]') as MedicationProfile[];
    const defaultImageUrl = 'https://i.postimg.cc/P5gLp2f0/default-pet.png';
    
    if (data.id) { // Update
        profiles = profiles.map(p => p.id === data.id ? { ...p, ...data, imageUrl: data.imageUrl || p.imageUrl || defaultImageUrl } : p);
    } else { // Create
        const newProfile: MedicationProfile = {
            id: Date.now(),
            name: data.name,
            imageUrl: data.imageUrl || defaultImageUrl,
        };
        profiles.push(newProfile);
    }
    localStorage.setItem(MEDICATION_PROFILES_KEY, JSON.stringify(profiles));
    return MOCK_API(profiles);
};

const deleteProfile = async (profileId: number, t: (key: string) => string): Promise<{ profiles: MedicationProfile[], medications: Medication[] }> => {
    let profiles = JSON.parse(localStorage.getItem(MEDICATION_PROFILES_KEY) || '[]') as MedicationProfile[];
    let medications = JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || '[]') as Medication[];
    
    const newProfiles = profiles.filter(p => p.id !== profileId);
    const newMedications = medications.filter(m => m.profileId !== profileId);
    
    localStorage.setItem(MEDICATION_PROFILES_KEY, JSON.stringify(newProfiles));
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(newMedications));
    
    return MOCK_API({ profiles: newProfiles, medications: newMedications });
};

const saveMedication = async (data: { id?: number; profileId: number; name: string; formulation: string; instructions: string }, t: (key: string) => string): Promise<Medication[]> => {
    let medications = JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || '[]') as Medication[];
    
    if (data.id) { // Update
        medications = medications.map(m => m.id === data.id ? { ...m, ...data } : m);
    } else { // Create
        const newMed: Medication = {
            id: Date.now(),
            profileId: data.profileId,
            name: data.name,
            formulation: data.formulation,
            instructions: data.instructions,
        };
        medications.push(newMed);
    }
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(medications));
    return MOCK_API(medications);
};

const deleteMedication = async (medicationId: number, t: (key: string) => string): Promise<Medication[]> => {
    let medications = JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || '[]') as Medication[];
    const newMedications = medications.filter(m => m.id !== medicationId);
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(newMedications));
    return MOCK_API(newMedications);
};

// FIX: Export a single dataService object containing all data-fetching functions. This resolves import errors in multiple components that were trying to import 'dataService' as a named export when it didn't exist.
export const dataService = {
    getSpecies,
    getBreedsForSpecies,
    getBreedDisplayInfo,
    getCustomProtocols,
    saveCustomProtocol,
    getAllProtocols,
    getProtocolById,
    getAllDrugs,
    getDrugCategories,
    getPoisonousPlants,
    getProfiles,
    getMedications,
    saveProfile,
    deleteProfile,
    saveMedication,
    deleteMedication,
};