import React from 'react';
import { usePatient } from '../context/PatientContext';
import { useLocale } from '../context/LocaleContext';

const PatientInfoDisplay: React.FC = () => {
    const { patientInfo } = usePatient();
    const { t, locale, localizeNumber } = useLocale();

    const speciesName = patientInfo.species || '---';
    const weightDisplay = patientInfo.weightInKg ? `${localizeNumber(patientInfo.weightInKg.toFixed(2))} ${t('kg')}` : '---';

    const speciesKeyMap: { [key: string]: string } = {
        [t('speciesCat')]: 'cat',
        [t('speciesDog')]: 'dog',
        [t('speciesBird')]: 'bird',
        [t('speciesMammal')]: 'mammal',
        [t('speciesReptile')]: 'reptile',
        [t('speciesFish')]: 'fish',
        [t('speciesAmphibian')]: 'amphibian',
    };
    const speciesKey = patientInfo.species ? speciesKeyMap[patientInfo.species] : null;

    const imageSrc = speciesKey === 'dog' 
        ? 'https://i.postimg.cc/4x28nG8x/dog-2.png'
        : speciesKey === 'cat'
        ? 'https://i.postimg.cc/VNSKChTB/cat-2.png'
        : speciesKey === 'bird'
        ? 'https://i.postimg.cc/4NZbVR5Z/birds-2.png'
        : speciesKey === 'mammal'
        ? 'https://i.postimg.cc/pLLfcQ46/rabbit-2.png'
        : speciesKey === 'reptile'
        ? "https://i.postimg.cc/FFDvR7CW/ey-J3-Ijox-NTAs-Imgi-Oj-E1-MCwi-Zml0-Ijoi-Y29ud-GFpbi-Is-Im-Zt-Ijoid2-Vic-CIs-In-Mi-Oi-Jj-Yz-Mw-ODE0-Ym-Mx-NDZm-ZTEx-ZGJk-Y2-U3-MDQ0.webp"
        : 'https://i.postimg.cc/4x28nG8x/dog-2.png';


    return (
        <div className="flex items-center gap-4 p-2 rounded-lg bg-black/5 dark:bg-white/5">
            <img src={imageSrc} alt={speciesName} className="w-12 h-12 rounded-full object-cover" />
            <div className={locale === 'fa' ? 'text-right' : 'text-left'}>
                <h3 className="font-bold text-sm">
                    {speciesName}
                    {patientInfo.breed && <span className="font-normal text-xs text-inherit/80"> ({patientInfo.breed})</span>}
                </h3>
                <p className="text-sm font-mono text-inherit/80">{weightDisplay}</p>
            </div>
        </div>
    );
};

export default PatientInfoDisplay;
