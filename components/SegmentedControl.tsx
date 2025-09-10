import React from 'react';

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange }) => {
  return (
    <div className="flex w-full bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none ${
            value === option.value
              ? 'bg-white dark:bg-slate-900 text-[var(--primary-600)] dark:text-[var(--primary-300)] shadow'
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