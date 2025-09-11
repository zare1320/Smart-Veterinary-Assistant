import React from 'react';
import { useLocale } from '../../context/LocaleContext';

// 1. Icon Component
const iconMap = {
    'fa-droplet': 'fa-droplet',
    'fa-arrow-trend-down': 'fa-arrow-trend-down',
    'fa-stopwatch': 'fa-stopwatch',
    'fa-arrows-rotate': 'fa-arrows-rotate',
    'fa-bolt': 'fa-bolt',
    'fa-scissors': 'fa-scissors',
    'fa-circle-info': 'fa-circle-info',
    'fa-cat': 'fa-cat',
    'fa-dog': 'fa-dog',
    'fa-question': 'fa-question',
};

type IconName = keyof typeof iconMap;

export const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className }) => (
    <i className={`fa-solid ${iconMap[name] || 'fa-question'} ${className}`} aria-hidden="true"></i>
);

// 2. Form Section Component
interface FormSectionProps {
    title: string;
    icon: IconName;
    infoAction?: () => void;
    children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, icon, infoAction, children }) => (
    <div className="border-t border-border/50 pt-4">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <Icon name={icon} className="text-lg text-[var(--primary-500)]" />
                <h4 className="font-semibold text-foreground">{title}</h4>
            </div>
            {infoAction && (
                <button onClick={infoAction} aria-label={`More info about ${title}`}>
                    <Icon name="fa-circle-info" className="text-muted-foreground" />
                </button>
            )}
        </div>
        {children}
    </div>
);

// 3. Toggle Switch Component
interface ToggleSwitchProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer">
        <span className="font-medium text-foreground">{label}</span>
        <div className="relative inline-block w-11 me-2 align-middle select-none transition duration-200 ease-in">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-slate-700 cursor-pointer"></label>
        </div>
    </label>
);

// 4. Custom Slider Component
interface CustomSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    unit: string;
    value: number | null;
}
export const CustomSlider: React.FC<CustomSliderProps> = ({ unit, value, ...props }) => {
    const { localizeNumber } = useLocale();
    const displayValue = value ?? 0;
    return (
        <div className="flex items-center gap-4">
            <input
                type="range"
                value={displayValue}
                {...props}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="font-mono text-center bg-muted rounded-md px-3 py-1 w-24">
                <span className="font-bold text-heading">{localizeNumber(displayValue)}</span>
                <span className="text-sm text-muted-foreground ml-1">{unit}</span>
            </div>
        </div>
    );
};

// 5. Tooltip Component
export const Tooltip: React.FC<{ content: React.ReactNode }> = ({ content }) => (
    <div className="relative group flex items-center">
        <Icon name="fa-circle-info" className="w-5 h-5 text-inherit/50 cursor-pointer" />
        <div className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 w-max max-w-xs p-2 text-xs text-primary-foreground bg-heading rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-10 whitespace-nowrap">
            {content}
            <div className="absolute top-full start-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-heading"></div>
        </div>
    </div>
);

// 6. Result Pill Component
const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
export const ResultPill: React.FC<{ value: string; unit: string; label?: string; className?: string }> = ({ value, unit, label, className }) => (
  <div className={clsx("flex flex-col items-center", className)}>
    {label && <span className="text-xs text-foreground/60 dark:text-foreground/60 mb-1.5 font-medium">{label}</span>}
    <div className="bg-sky-500/10 dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 font-bold rounded-full px-4 py-1.5 text-center w-full">
      <span className="text-lg">{value}</span>
      <span className="text-xs ml-1 opacity-80">{unit}</span>
    </div>
  </div>
);