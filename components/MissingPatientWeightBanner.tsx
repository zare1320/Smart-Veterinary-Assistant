import React from 'react';
import { useLocale } from '../context/LocaleContext';

const MissingPatientWeightBanner: React.FC = () => {
    const { t } = useLocale();
    return (
        <div className="bg-red-500 text-white text-center p-2 text-sm sticky top-0 z-20">
            {t('missingWeightWarning')}
        </div>
    );
};

export default MissingPatientWeightBanner;