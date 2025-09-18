import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { usePatientStore } from '../stores/usePatientStore';
import MissingPatientWeightBanner from '../components/MissingPatientWeightBanner';
import { BackButton, Button } from '../components/Button';
import PatientInfoDisplay from '../components/PatientInfoDisplay';
import InfoModal from '../components/InfoModal';
import AccordionItem from '../components/AccordionItem';
import { LabeledSlider } from '../components/forms';
import { 
    BloodIcon, 
    CircleQuestionIcon, 
    PencilIcon,
    GaugeHighIcon,
    DesktopIcon,
    TriangleExclamationIcon,
} from '../components/Icons';

// --- Custom Hook for calculator logic ---
const useTransfusionCalculator = (patientWeight: number | null, patientSpecies: string | null) => {
  const [desiredPcv, setDesiredPcv] = useState(30);
  const [currentPcv, setCurrentPcv] = useState(15);
  const [donorPcv, setDonorPcv] = useState(45);
  const { t } = useLocale();

  const speciesKeyMap: { [key: string]: string } = {
      [t('speciesCat')]: 'cat',
      [t('speciesDog')]: 'dog',
  };
  const speciesKey = patientSpecies ? speciesKeyMap[patientSpecies] : null;

  const bloodVolumeConstant = useMemo(
    () => (speciesKey === 'dog' ? 90 : 60),
    [speciesKey]
  );

  const calculatedVolume = useMemo(() => {
    if (
      !patientWeight ||
      patientWeight <= 0 ||
      donorPcv <= 0 ||
      desiredPcv <= currentPcv
    ) {
      return null;
    }
    return (
      (patientWeight * bloodVolumeConstant * (desiredPcv - currentPcv)) /
      donorPcv
    );
  }, [patientWeight, desiredPcv, currentPcv, donorPcv, bloodVolumeConstant]);

  return {
    desiredPcv,
    setDesiredPcv,
    currentPcv,
    setCurrentPcv,
    donorPcv,
    setDonorPcv,
    calculatedVolume,
  };
};

// --- UI Components for Information Display ---

const TransfusionRateInfo: React.FC = () => {
    const { t } = useLocale();
    const rates = [
        { label: t('transfusion.rate.startLabel'), value: t('transfusion.rate.startValue') },
        { label: t('transfusion.rate.dogsLabel'), value: t('transfusion.rate.dogsValue') },
        { label: t('transfusion.rate.catsLabel'), value: t('transfusion.rate.catsValue') },
    ];
    return (
        <div className="glass-card p-6">
            <h4 className="text-xl font-bold text-inherit mb-4 flex items-center gap-2 text-start">
                <GaugeHighIcon className="text-2xl text-inherit/80" />
                {t('transfusion.rate.title')}
            </h4>
            <div className="space-y-3">
                {rates.map((rate, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center text-start">
                        <span className="font-semibold text-sm text-foreground/80">{rate.label}</span>
                        <span className="font-mono font-bold text-base text-heading">{rate.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MonitoringInfo: React.FC = () => {
    const { t } = useLocale();
    const steps = [
        { title: t('transfusion.monitoring.step1.title'), text: t('transfusion.monitoring.step1.text'), icon: <i className="fa-solid fa-clipboard-list"></i> },
        { title: t('transfusion.monitoring.step2.title'), text: t('transfusion.monitoring.step2.text'), icon: <i className="fa-solid fa-clock"></i> },
        { title: t('transfusion.monitoring.step3.title'), text: t('transfusion.monitoring.step3.text'), icon: <i className="fa-solid fa-forward"></i> },
        { title: t('transfusion.monitoring.step4.title'), text: t('transfusion.monitoring.step4.text'), icon: <i className="fa-solid fa-hand"></i>, isAlert: true },
    ];
    return (
        <div className="glass-card p-6">
            <h4 className="text-xl font-bold text-inherit mb-4 flex items-center gap-2 text-start">
                <DesktopIcon className="text-2xl text-inherit/80" />
                {t('transfusion.monitoring.title')}
            </h4>
            <div className="relative">
                <div className="absolute left-4 rtl:left-auto rtl:right-4 top-4 bottom-4 w-0.5 bg-border"></div>
                {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-4 mb-4 last:mb-0">
                        <div className={`z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${step.isAlert ? 'bg-red-500 text-white' : 'bg-[var(--primary-500)] text-white'}`}>
                            {step.icon}
                        </div>
                        <div className="text-start">
                            <h5 className="font-bold">{step.title}</h5>
                            <p className="text-sm text-inherit/80">{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReactionsInfo: React.FC = () => {
    const { t } = useLocale();
    return (
         <div className="glass-card p-6">
            <h4 className="text-xl font-bold text-inherit mb-4 flex items-center gap-2 text-start">
                <TriangleExclamationIcon className="text-2xl text-inherit/80" />
                {t('transfusion.reactions.title')}
            </h4>
            <div className="space-y-4">
                {/* Hemolytic Reaction Card */}
                <div className="border border-red-500/30 bg-red-500/10 p-4 rounded-lg">
                    <h5 className="font-bold text-red-800 dark:text-red-300">{t('transfusion.reactions.immuneHemolytic.title')}</h5>
                    <p className="text-sm text-red-700 dark:text-red-300/90 mt-1">{t('transfusion.reactions.immuneHemolytic.summary')}</p>
                    <div className="mt-2 pt-2 border-t border-red-500/20">
                         <h6 className="text-sm font-semibold text-red-800 dark:text-red-300">{t('transfusion.reactions.immuneHemolytic.signsTitle')}</h6>
                         <p className="text-xs text-red-700 dark:text-red-300/90 leading-relaxed">{t('transfusion.reactions.immuneHemolytic.signs')}</p>
                    </div>
                </div>
                 {/* Non-Hemolytic Reaction Card */}
                <div className="border border-amber-500/30 bg-amber-500/10 p-4 rounded-lg">
                    <h5 className="font-bold text-amber-800 dark:text-amber-300">{t('transfusion.reactions.immuneNonHemolytic.title')}</h5>
                    <p className="text-sm text-amber-700 dark:text-amber-300/90 mt-1">{t('transfusion.reactions.immuneNonHemolytic.summary')}</p>
                    <div className="mt-2 pt-2 border-t border-amber-500/20">
                         <h6 className="text-sm font-semibold text-amber-800 dark:text-amber-300">{t('transfusion.reactions.immuneNonHemolytic.signsTitle')}</h6>
                         <p className="text-xs text-amber-700 dark:text-amber-300/90 leading-relaxed">{t('transfusion.reactions.immuneNonHemolytic.signs')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const BloodTransfusionCalculatorScreen: React.FC = () => {
  const { t, localizeNumber } = useLocale();
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { species, weightInKg } = usePatientStore(state => ({ species: state.species, weightInKg: state.weightInKg }));
  const hasWeight = weightInKg && weightInKg > 0;

  const {
    desiredPcv,
    setDesiredPcv,
    currentPcv,
    setCurrentPcv,
    donorPcv,
    setDonorPcv,
    calculatedVolume,
  } = useTransfusionCalculator(weightInKg, species);

  const speciesKeyMap: { [key: string]: string } = {
    [t('speciesCat')]: 'cat',
    [t('speciesDog')]: 'dog',
  };
  const speciesKey = species ? speciesKeyMap[species] : null;
  const isSupportedSpecies = speciesKey === 'dog' || speciesKey === 'cat';

  const handleOpenInfoModal = useCallback(() => setIsInfoModalOpen(true), []);
  const handleCloseInfoModal = useCallback(() => setIsInfoModalOpen(false), []);

  return (
    <>
      {!hasWeight && <MissingPatientWeightBanner />}
      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
            <BackButton onClick={() => navigate('/')} />
            <PatientInfoDisplay />
        </div>
        <header className="relative text-center mb-6">
            <div className="flex items-center justify-center gap-2">
                <BloodIcon className="w-8 h-8 text-red-500" />
                <h1 className="text-3xl md:text-4xl font-extrabold text-heading">{t('transfusion.title')}</h1>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 end-0">
                <Button variant="secondary" onClick={handleOpenInfoModal} className="!p-2.5 !rounded-full" aria-label={t('bp.about')}>
                    <CircleQuestionIcon className="w-5 h-5"/>
                </Button>
            </div>
        </header>

        <div className={`flex flex-col gap-8 ${!hasWeight ? 'opacity-50 pointer-events-none' : ''}`}>
          {isSupportedSpecies ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="glass-card p-6 space-y-6">
                    <LabeledSlider id="desiredPcv" label={t('transfusion.desiredPcv')} value={desiredPcv} onChange={setDesiredPcv} min={10} max={70} icon={<PencilIcon />} unit="%" />
                    <LabeledSlider id="currentPcv" label={t('transfusion.currentPcv')} value={currentPcv} onChange={setCurrentPcv} min={5} max={50} icon={<PencilIcon />} unit="%" />
                    <LabeledSlider id="donorPcv" label={t('transfusion.donorPcv')} value={donorPcv} onChange={setDonorPcv} min={30} max={80} icon={<PencilIcon />} unit="%" />
                  </div>
                  <div className="bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl p-6 text-white shadow-lg shadow-red-500/30">
                    <div className="flex items-center justify-center gap-4">
                      <BloodIcon className="text-5xl" />
                      <div>
                        <p className="text-lg opacity-80">{t('transfusion.bloodVolumeNeeded')}</p>
                        <p>
                          <span className="text-5xl sm:text-6xl font-mono font-bold tracking-tighter">
                            {calculatedVolume !== null ? localizeNumber(calculatedVolume.toFixed(1)) : '---'}
                          </span>
                          <span className="text-xl sm:text-2xl opacity-80 ms-2">ml</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                    <TransfusionRateInfo />
                    <MonitoringInfo />
                    <ReactionsInfo />
                </div>
              </div>
          ) : (
            <div className="text-center p-6 bg-yellow-400/20 rounded-lg border border-yellow-400/30 dark:border-yellow-300/30">
                <p className="text-yellow-800 dark:text-yellow-200">{t('errors.unsupportedSpecies')}</p>
            </div>
          )}
        </div>

        <InfoModal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} title={t('transfusion.infoModal.title')}>
          <div className="space-y-0 divide-y divide-border">
            <AccordionItem title={t('transfusion.infoModal.aboutTitle')}>
              <div className="bg-muted p-4 rounded-lg font-mono text-center text-sm" dir="ltr">
                <p>{t('transfusion.infoModal.formula')}</p>
                <p className="mt-2 text-xs font-sans">
                  {t('transfusion.infoModal.formulaN')}
                </p>
              </div>
            </AccordionItem>
            <AccordionItem title={t('transfusion.infoModal.processingTitle')}>
               <p>{t('transfusion.infoModal.contentComingSoon')}</p>
            </AccordionItem>
            <AccordionItem title={t('transfusion.infoModal.crossmatchTitle')} defaultOpen={true}>
              <h5 className="font-bold">{t('transfusion.infoModal.canineTitle')}</h5>
              <ul>
                <li>{t('transfusion.infoModal.caninePoint1')}</li>
                <li>{t('transfusion.infoModal.caninePoint2')}</li>
                <li>{t('transfusion.infoModal.caninePoint3')}</li>
                <li>{t('transfusion.infoModal.caninePoint4')}</li>
                <li>{t('transfusion.infoModal.caninePoint5')}</li>
                <li>{t('transfusion.infoModal.caninePoint6')}</li>
                <li>{t('transfusion.infoModal.caninePoint7')}</li>
                <li>{t('transfusion.infoModal.caninePoint8')}</li>
              </ul>
              <h5 className="font-bold mt-4">{t('transfusion.infoModal.felineTitle')}</h5>
               <ul>
                <li>{t('transfusion.infoModal.felinePoint1')}</li>
                <li>{t('transfusion.infoModal.felinePoint2')}</li>
                <li>{t('transfusion.infoModal.felinePoint3')}</li>
                <li>{t('transfusion.infoModal.felinePoint4')}</li>
                <li>{t('transfusion.infoModal.felinePoint5')}</li>
                <li dangerouslySetInnerHTML={{ __html: t('transfusion.infoModal.felinePoint6') }}></li>
              </ul>
            </AccordionItem>
          </div>
        </InfoModal>
      </main>
    </>
  );
};

export default BloodTransfusionCalculatorScreen;