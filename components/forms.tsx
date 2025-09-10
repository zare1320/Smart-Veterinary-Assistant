import React from 'react';
import { useLocale } from '../context/LocaleContext';

interface LabeledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
}

export const LabeledSelect: React.FC<LabeledSelectProps> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
            {label}
        </label>
        <select id={id} {...props} className="form-input w-full">
            {children}
        </select>
    </div>
);

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    unit?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, id, unit, ...props }) => (
    <div className="flex-grow">
        <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
            {label}
        </label>
        <div className="relative">
            <input
                id={id}
                {...props}
                className="form-input w-full"
            />
            {unit && (
                <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-500 dark:text-slate-400 text-sm">
                    {unit}
                </span>
            )}
        </div>
    </div>
);

export const LabeledSlider: React.FC<{
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    icon: React.ReactNode;
    unit: string;
}> = ({ id, label, value, onChange, min, max, icon, unit }) => {
    const { localizeNumber } = useLocale();
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2 text-start flex items-center gap-2">
                {icon} {label}
            </label>
            <div className="flex items-center gap-4">
                <input
                    id={id}
                    type="range"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    min={min}
                    max={max}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--primary-500)]"
                />
                <div className="font-mono text-center bg-slate-100 dark:bg-slate-700 rounded-md px-3 py-1 w-24">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{localizeNumber(value)}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{unit}</span>
                </div>
            </div>
        </div>
    );
};