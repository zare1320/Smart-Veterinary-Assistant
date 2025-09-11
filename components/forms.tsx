import React from 'react';
import { useLocale } from '../context/LocaleContext';

// LabeledInput Component
interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  unit?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, id, unit, className, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-card-foreground mb-1 text-start">
      {label}
    </label>
    <div className="relative">
      <input id={id} {...props} className={`custom-form-input text-start ${unit ? 'pr-12' : ''} ${className || ''}`} />
      {unit && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">{unit}</span>}
    </div>
  </div>
);

// LabeledSelect Component
interface LabeledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
}

export const LabeledSelect: React.FC<LabeledSelectProps> = ({ label, id, children, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-card-foreground mb-1 text-start">
      {label}
    </label>
    <select id={id} {...props} className="custom-form-input">
      {children}
    </select>
  </div>
);

// LabeledTextarea Component
interface LabeledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

export const LabeledTextarea: React.FC<LabeledTextareaProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-card-foreground mb-1 text-start">
      {label}
    </label>
    <textarea id={id} {...props} className="custom-form-input text-start" />
  </div>
);

// LabeledSlider Component
interface LabeledSliderProps {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    icon: React.ReactNode;
    unit: string;
}

export const LabeledSlider: React.FC<LabeledSliderProps> = ({ id, label, value, onChange, min, max, step = 1, icon, unit }) => {
    const { localizeNumber } = useLocale();

    return (
        <div>
            <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2 text-start">
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
                    step={step}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="font-mono text-center bg-muted rounded-md px-3 py-1 w-28">
                    <span className="font-bold text-heading">{localizeNumber(value)}</span>
                    <span className="text-sm text-muted-foreground ml-1">{unit}</span>
                </div>
            </div>
        </div>
    );
};
