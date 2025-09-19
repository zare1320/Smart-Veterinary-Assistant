import React from 'react';

// FIX: Export the Icon component to make it available for use in other components.
export const Icon: React.FC<{ className?: string; iconName: string }> = ({ className, iconName }) => (
  <i className={`fa-solid ${iconName} ${className}`} aria-hidden="true"></i>
);

export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" fill="currentColor">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2C322.3 121.4 286.7 96 248 96c-88.8 0-160.1 71.9-160.1 160.1s71.3 160.1 160.1 160.1c94.9 0 135.6-60.5 140.2-91.8H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
    </svg>
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
export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-phone" />;
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
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-plus" />;
export const EllipsisVerticalIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-ellipsis-vertical" />;
export const ExchangeIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-exchange-alt" />;
export const FileMedicalIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-file-medical" />;
export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-xmark" />;
export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-image" />;
export const UniversityIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-university" />;
export const IdCardIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-id-card" />;
export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-map-pin" />;
export const AwardIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-award" />;
export const FlaskIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-flask-vial" />;
export const PrintIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-print" />;
export const InfoCircleIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-circle-info" />;
export const WifiIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-wifi" />;
export const CaloriesIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-utensils" />;
export const SkullIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-skull-crossbones" />;
export const DogIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-dog" />;
export const CatIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-cat" />;
export const CookieBiteIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-cookie-bite" />;
export const CandyCaneIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-candy-cane" />;
export const LeafIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-leaf" />;
export const SmileIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-face-smile" />;
export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-up-right-from-square" />;
export const BabyCarriageIcon: React.FC<{ className?: string }> = ({ className }) => <Icon className={className} iconName="fa-baby-carriage" />;