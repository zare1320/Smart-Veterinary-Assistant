import React, { useState, useEffect, useRef } from 'react';
// FIX: Replaced framer-motion variants with inline animation props to fix type errors.
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from './Icons';
import { useLocale } from '../context/LocaleContext';
import type { LocalizedString } from '../types';

interface Breed {
  id: number;
  name: LocalizedString;
  [key: string]: any; // for other properties like group, origin, etc.
}

interface BreedSelectorProps {
  breeds: Breed[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  displayInfoKey?: string;
}

const BreedSelector: React.FC<BreedSelectorProps> = ({ breeds, value, onChange, placeholder, displayInfoKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useLocale();

  // Sync internal filter state with value prop from parent
  useEffect(() => {
    setFilter(value);
  }, [value]);

  const filteredBreeds = breeds.filter(breed => {
      const searchTerm = filter.toLowerCase();
      return breed.name.en.toLowerCase().includes(searchTerm) ||
             breed.name.fa.toLowerCase().includes(searchTerm);
    }
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (breed: Breed) => {
    onChange(breed.name[locale]);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFilter(newValue);
    onChange(newValue); // Update parent form state while typing
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={filter}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="custom-form-input text-slate-900 dark:text-slate-100 text-start pr-10"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400"
          aria-label="Toggle breed list"
        >
          <ChevronDownIcon className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-h-60 overflow-y-auto"
            role="listbox"
          >
            {filteredBreeds.length > 0 ? (
              filteredBreeds.map(breed => (
                <li key={breed.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(breed)}
                    className="w-full text-start px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    role="option"
                    aria-selected={value === breed.name[locale]}
                  >
                    <span className="font-medium text-slate-900 dark:text-slate-100">{breed.name[locale]}</span>
                    {displayInfoKey && breed[displayInfoKey] && (
                      <span className="text-sm text-slate-500 dark:text-slate-400 block">
                        {String(breed[displayInfoKey])}
                      </span>
                    )}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-slate-500 dark:text-slate-400">
                {t('noBreedsFound')}
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BreedSelector;