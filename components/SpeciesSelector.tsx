import React from 'react';
import type { Species } from '../types';
import { motion } from 'framer-motion';

interface SpeciesSelectorProps {
  species: Species[];
  selectedSpecies: string | null;
  onSelectSpecies: (speciesName: string) => void;
}

// FIX: Replaced inline animation props with variants to fix type errors.
const speciesItemVariants = {
  hover: { scale: 1.1, y: -5 },
  tap: { scale: 0.95 },
};

const SpeciesSelector: React.FC<SpeciesSelectorProps> = ({ species, selectedSpecies, onSelectSpecies }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-center">
      {species.map((s) => (
        <motion.div
          key={s.name}
          onClick={() => onSelectSpecies(s.name)}
          className="flex flex-col items-center space-y-3 cursor-pointer group"
          variants={speciesItemVariants}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className={`species-card ${selectedSpecies === s.name ? 'selected' : ''}`}>
            {s.imageUrl && <img src={s.imageUrl} alt={s.name} />}
          </div>
          <span className={`text-sm font-medium transition-colors ${selectedSpecies === s.name ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]' : 'text-muted-foreground'}`}>{s.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SpeciesSelector;