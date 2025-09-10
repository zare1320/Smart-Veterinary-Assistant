import React from 'react';
import type { Species } from '../types';

interface SpeciesSelectorProps {
  species: Species[];
  selectedSpecies: string | null;
  onSelectSpecies: (speciesName: string) => void;
}

const SpeciesSelector: React.FC<SpeciesSelectorProps> = ({ species, selectedSpecies, onSelectSpecies }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-center">
      {species.map((s) => (
        <div
          key={s.name}
          onClick={() => onSelectSpecies(s.name)}
          className="flex flex-col items-center space-y-3 cursor-pointer group"
        >
          <div className={`species-card ${selectedSpecies === s.name ? 'selected' : ''}`}>
            {s.imageUrl && <img src={s.imageUrl} alt={s.name} />}
          </div>
          <span className={`text-sm font-medium transition-colors ${selectedSpecies === s.name ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-slate-700 dark:text-slate-300'}`}>{s.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SpeciesSelector;