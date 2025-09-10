import React from 'react';
import { useLocale } from '../context/LocaleContext';

// --- LabeledSelect ---
interface LabeledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    error?: string;
    icon?: React.ReactNode;
}

export const LabeledSelect: React.FC<LabeledSelectProps> = ({ label, id, children, error, icon, className, ...props }) => {
    const hasError = !!error;
    const hasIcon = !!icon;
    return (
        <div className={hasError ? 'animate-shake' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
                {label}
            </label>
            <div className="relative">
                {hasIcon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                        {icon}
                    </div>
                )}
                <select 
                    id={id} 
                    {...props} 
                    className={`form-input w-full ${hasIcon ? '!ps-10' : ''} ${className} ${hasError ? '!border-red-500 !shadow-red-500/20 focus:!border-red-500 focus:!ring-red-500' : ''}`}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                >
                    {children}
                </select>
            </div>
            {hasError && <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400 mt-1 text-start">{error}</p>}
        </div>
    );
};

// --- LabeledInput ---
interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    unit?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, id, unit, className, error, icon, ...props }) => {
    const hasError = !!error;
    const hasIcon = !!icon;

    return (
        <div className={hasError ? 'animate-shake' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
                {label}
            </label>
            <div className="relative">
                {hasIcon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    {...props}
                    className={`form-input w-full ${hasIcon ? '!ps-10' : ''} ${className} ${hasError ? '!border-red-500 !shadow-red-500/20 focus:!border-red-500 focus:!ring-red-500' : ''}`}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                />
                {unit && (
                    <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-500 dark:text-slate-400 text-sm">
                        {unit}
                    </span>
                )}
            </div>
            {hasError && <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400 mt-1 text-start">{error}</p>}
        </div>
    );
};


// --- LabeledSlider ---
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

// --- LabeledTextarea ---
interface LabeledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export const LabeledTextarea: React.FC<LabeledTextareaProps> = ({ label, id, error, className, ...props }) => {
    const hasError = !!error;
    return (
        <div className={hasError ? 'animate-shake' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
                {label}
            </label>
            <textarea
                id={id}
                {...props}
                className={`form-input w-full ${className} ${hasError ? '!border-red-500 !shadow-red-500/20 focus:!border-red-500 focus:!ring-red-500' : ''}`}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${id}-error` : undefined}
            />
            {hasError && <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400 mt-1 text-start">{error}</p>}
        </div>
    );
};