import React from 'react';

// 1. تعریف نوع‌های داده برای دسته‌بندی و ایمنی
export type BirdCategory = 'Parrot' | 'Bird of Prey' | 'Songbird' | 'Dove & Pigeon' | 'Other';

export interface LocalizedString {
  en: string;
  fa: string;
}

export interface Bird {
  /** یک شناسه منحصر به فرد برای هر نژاد */
  id: number;
  /** نام اصلی و رایج پرنده */
  name: LocalizedString;
  /** دسته‌بندی کلی پرنده */
  category: BirdCategory;
  /** خانواده یا گروه جزئی‌تر (اختیاری) */
  family?: string;
  /** نام علمی (اختیاری) */
  scientificName?: string;
}

export type NavItemKey =
  | 'home'
  | 'protocols'
  | 'my-drugs'
  | 'settings'
  | 'profile'
  | 'language-settings'
  | 'theme-settings'
  | 'sync-settings'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'weight-unit-settings'
  | 'drug-dose-calculator'
  | 'fluid-therapy-calculator'
  | 'blood-pressure-calculator'
  | 'blood-transfusion-calculator'
  | 'pet-age-calculator'
  | 'protocol-detail'
  | 'add-protocol'
  | 'drug-interaction-checker'
  | 'medication-report';

export type Gender = 'Male' | 'Female' | 'Unknown';
export type AgeGroup = 'neonate' | 'pediatric' | 'adult' | 'geriatric';

export interface PatientInfo {
  species: string | null;
  weightInKg: number | null;
  breed: string;
  gender: Gender | null;
  ageGroup: AgeGroup | null;
  clinicalSigns: string;
}

export interface Species {
  name: string;
  imageUrl: string;
}

export interface NavItem {
  key: NavItemKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

export interface Protocol {
    id: string; // Unique identifier (e.g., 'canine-vaccination')
    category: 'Canine' | 'Feline' | 'Exotic' | 'Custom';
    title: string;
    description: string;
    imageUrl: string;
    content?: React.ReactNode | string;
}

export type DogGroup = 'Herding' | 'Hound' | 'Non-Sporting' | 'Sporting' | 'Terrier' | 'Toy' | 'Working';
export type DogSize = 'Toy' | 'Small' | 'Medium' | 'Large' | 'Giant';

export interface DogBreed {
  /** یک شناسه منحصر به فرد برای هر نژاد */
  id: number;
  /** نام نژاد */
  name: LocalizedString;
  /** گروه رسمی نژاد (بسیار مفید برای فیلتر کردن) */
  group: DogGroup;
  /** اندازه تقریبی نژاد */
  size: DogSize;
  /** آرایه‌ای از ویژگی‌های خلقی و رفتاری */
  temperament: string[];
  /** کشور یا منطقه خاستگاه */
  origin: string;
}

export type CoatType = 'Shorthair' | 'Longhair' | 'Hairless' | 'Rex';

export interface CatBreed {
  /** یک شناسه منحصر به فرد برای هر نژاد */
  id: number;
  /** نام نژاد */
  name: LocalizedString;
  /** کشور یا منطقه خاستگاه */
  origin: string;
  /** نوع پوشش بدن */
  coat: CoatType;
  /** آرایه‌ای از ویژگی‌های خلقی و رفتاری */
  temperament: string[];
}

export type AmphibianCategory = 'Frog' | 'Salamander' | 'Caecilian';

export interface Amphibian {
  /** A unique identifier for each breed, useful for keys in lists. */
  id: number;
  /** The primary common name of the amphibian. */
  name: LocalizedString;
  /** An array of alternative or common nicknames. */
  commonNames?: string[];
  /** The category the amphibian belongs to. */
  category: AmphibianCategory;
}

export type FishCategory = 'Goldfish & Carp' | 'Betta' | 'Livebearer' | 'Cichlid' | 'Tetra' | 'Danio';

export interface Fish {
  /** A unique identifier for the fish. */
  id: number;
  /** The primary common name. */
  name: LocalizedString;
  /** An array of alternative or common nicknames. */
  commonNames?: string[];
  /** The category the fish belongs to. */
  category: FishCategory;
  /** The scientific name of the species. */
  scientificName?: string;
}

export type MammalCategory = 'Rabbit' | 'Ferret' | 'Hedgehog' | 'Sugar Glider' | 'Hamster' | 'Rat' | 'Mouse' | 'Guinea Pig' | 'Chinchilla' | 'Gerbil' | 'Degu' | 'Other';

export interface Mammal {
  id: number;
  name: LocalizedString;
  category: MammalCategory;
  scientificName?: string;
  commonNames?: string[];
}
export type ReptileCategory = 'Lizard' | 'Snake' | 'Turtle & Tortoise';

export interface Reptile {
  /** A unique identifier for the reptile. */
  id: number;
  /** The primary common name. */
  name: LocalizedString;
  /** An array of alternative or common nicknames. */
  commonNames?: string[];
  /** The category the reptile belongs to. */
  category: ReptileCategory;
  /** The scientific name of the species. */
  scientificName?: string;
}

// Drug Calculator Types
export interface DrugCategory {
    id: string;
    name: {
        en: string;
        fa: string;
    };
}

export type DrugForm = 'tablet' | 'capsule' | 'sachet' | 'suspension' | 'injectable';
export type Route = 'PO' | 'IM' | 'IV' | 'SC' | 'PO/FEED' | 'PO/WATER';

export interface DrugFormulation {
    id: string;
    form: DrugForm;
    strength: number; // e.g., 250
    strengthUnit: 'mg' | 'g' | 'mcg';
    volume?: number; // e.g., 5 for 250mg/5ml
    volumeUnit?: 'ml';
}

export interface DrugDosage {
    species: string; // Can be specific like 'dog', or a group like 'Raptors'
    doseRange: {
        min: number;
        max: number;
    };
    unit: string; // e.g., 'mg/kg'
    route?: Route | string;
    frequency?: string; // e.g., 'SID', 'BID'
    note?: string; // Translation key
}

export interface Drug {
    id: string;
    categoryId: string;
    name: {
        en: string;
        fa: string;
    };
    brandNames: string[];
    formulations: DrugFormulation[];
    dosages: DrugDosage[];
}

// Fluid Therapy Calculator Types
export enum AnimalSpecies {
  DOG = 'dog',
  CAT = 'cat',
  OTHER = 'other'
}

// My Med List Types
export interface MedicationProfile {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Medication {
  id: number;
  profileId: number;
  name: string;
  formulation: string;
  instructions: string;
}

// --- User Authentication and Profile Types ---
export type UserRole = 'student' | 'dvm';
export type WeightUnit = 'kg' | 'lb';

export interface UserSettings {
    weightUnit: WeightUnit;
}

export interface UserProfile {
    fullName: string;
    role: UserRole | '';
    university?: string;
    studentId?: string;
    province?: string;
    licenseNumber?: string;
}

export interface User {
    id: string; // This can be email or phone number
    email?: string;
    phone?: string;
    isProfileComplete: boolean;
    profile: UserProfile;
    settings: UserSettings;
}