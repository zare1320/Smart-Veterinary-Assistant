import React from 'react';
import { motion } from 'framer-motion';

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange }) => {
  const activeIndex = value ? options.findIndex(opt => opt.value === value) : -1;

  return (
    <div className="relative flex w-full bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
      {/* Active background indicator */}
      {activeIndex !== -1 && (
          // FIX: Replaced inline animation props with variants to fix type errors.
          <motion.div
            className="absolute top-1 bottom-1 left-0 h-auto bg-white dark:bg-slate-900 rounded-md shadow"
            style={{ width: `calc(100% / ${options.length})` }}
            initial={false}
            animate={{ x: `calc(${activeIndex * 100}%)` }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
      )}
      
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none ${
            value === option.value
              ? 'text-[var(--primary-600)] dark:text-[var(--primary-300)]'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;