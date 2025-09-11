import type { DrugCategory, Drug } from '../types';

export const drugCategories: DrugCategory[] = [
    { id: 'antibiotic', name: { en: 'Antibiotics', fa: 'آنتی‌بیوتیک‌ها' } },
    { id: 'nsaid', name: { en: 'NSAIDs', fa: 'ضدالتهاب غیراستروئیدی' } },
    { id: 'antiparasitic', name: { en: 'Antiparasitics', fa: 'ضدانگل‌ها' } },
];

export const allDrugs: Drug[] = [
    {
        id: 'amox',
        categoryId: 'antibiotic',
        name: { en: 'Amoxicillin', fa: 'آموکسی‌سیلین' },
        brandNames: ['Amoxil', 'Clavamox'],
        formulations: [
            { id: 'amox_tab_250', form: 'tablet', strength: 250, strengthUnit: 'mg' },
            { id: 'amox_susp_250_5', form: 'suspension', strength: 250, strengthUnit: 'mg', volume: 5, volumeUnit: 'ml' },
        ],
        dosages: [
            { species: 'dog_cat', doseRange: { min: 10, max: 20 }, unit: 'mg/kg', route: 'PO' },
            { species: 'Rabbits', doseRange: { min: 15, max: 30 }, unit: 'mg/kg', route: 'PO', note: 'drugNotes.amoxRabbitWarning' },
        ]
    },
    {
        id: 'melox',
        categoryId: 'nsaid',
        name: { en: 'Meloxicam', fa: 'ملوکسیکام' },
        brandNames: ['Metacam', 'Loxicom'],
        formulations: [
            { id: 'melox_inj_5', form: 'injectable', strength: 5, strengthUnit: 'mg', volume: 1, volumeUnit: 'ml' },
            { id: 'melox_susp_1.5', form: 'suspension', strength: 1.5, strengthUnit: 'mg', volume: 1, volumeUnit: 'ml' },
        ],
        dosages: [
            { species: 'dog', doseRange: { min: 0.1, max: 0.2 }, unit: 'mg/kg', route: 'PO, SC' },
            { species: 'cat', doseRange: { min: 0.05, max: 0.1 }, unit: 'mg/kg', route: 'PO, SC' },
            { species: 'Reptiles', doseRange: { min: 0.1, max: 0.2 }, unit: 'mg/kg', route: 'IM' },
        ]
    },
    {
        id: 'iver',
        categoryId: 'antiparasitic',
        name: { en: 'Ivermectin', fa: 'ایورمکتین' },
        brandNames: ['Ivomec', 'Heartgard'],
        formulations: [
            { id: 'iver_inj_1', form: 'injectable', strength: 10, strengthUnit: 'mg', volume: 1, volumeUnit: 'ml' }, // 1% solution
        ],
        dosages: [
            { species: 'Raptors', doseRange: { min: 0.2, max: 0.4 }, unit: 'mg/kg', route: 'IM' },
            { species: 'Contraindicated Rodents', doseRange: { min: 0, max: 0 }, unit: 'mg/kg', route: 'SC', note: 'drugNotes.ivermectinContraindication' },
            { species: 'Chelonians', doseRange: { min: 0, max: 0 }, unit: 'mg/kg', route: 'IM', note: 'drugNotes.ivermectinContraindication' },
        ]
    }
];
