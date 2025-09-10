import React from 'react';

// FIX: Export the Icon component to make it available for use in other components.
export const Icon: React.FC<{ className?: string; iconName: string }> = ({ className, iconName }) => (
  <i className={`fa-solid ${iconName} ${className}`} aria-hidden="true"></i>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-globe" />;
export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-moon" />;
export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-house" />;
export const DescriptionIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-file-lines" />;
export const PillIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-pills" />;
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-gear" />;
export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-arrow-left" />;
export const TranslateIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-language" />;
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-magnifying-glass" />;
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-chevron-down" />;
export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-chevron-right" />;
export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-arrow-right" />;
export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-chevron-left" />;
export const SunIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-sun" />;
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-user" />;
export const BellIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-bell" />;
export const LogOutIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-right-from-bracket" />;
export const ContrastIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-circle-half-stroke" />;
export const MailIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-envelope" />;
export const SyncIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-sync" />;
export const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-trash" />;
export const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-shield-halved" />;
export const ScaleIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-weight-scale" />;
export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-check" />;
export const SyringeIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-syringe" />;
export const FluidIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-hand-holding-droplet" />;
export const BloodIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-droplet" />;
export const EllipsisIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-ellipsis" />;
export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-lightbulb" />;
export const HeartPulseIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-heart-pulse" />;
export const FilePenIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-file-pen" />;
export const ChartLineIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-chart-line" />;
export const CircleQuestionIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-circle-question" />;
export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-pencil" />;
export const GaugeHighIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-gauge-high" />;
export const DesktopIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-desktop" />;
export const TriangleExclamationIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-triangle-exclamation" />;
export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-calculator" />;
export const TableIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-table" />;
export const CakeIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-cake-candles" />;
export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-users" />;
export const PawIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-paw" />;