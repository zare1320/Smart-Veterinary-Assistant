import React, { useState } from 'react';
import type { NavItemKey, MedicationProfile, Medication } from '../types';
import { useLocale } from '../context/LocaleContext';
import { useUser } from '../context/UserContext';
import { Button } from '../components/Button';
import { ArrowLeftIcon, ArrowRightIcon, PawIcon, PrintIcon } from '../components/Icons';

interface MedicationReportScreenProps {
  reportData: {
    profile: MedicationProfile;
    medications: Medication[];
  };
  onNavigate: (screen: NavItemKey) => void;
}

const MedicationReportScreen: React.FC<MedicationReportScreenProps> = ({ reportData, onNavigate }) => {
  const { t, locale } = useLocale();
  const { user } = useUser();
  const [notes, setNotes] = useState('');

  if (!reportData || !user) {
    // Should not happen with correct navigation flow
    return (
      <div className="p-4">
        Error: Missing report data. <button onClick={() => onNavigate('my-drugs')}>Go Back</button>
      </div>
    );
  }
  
  const { profile, medications } = reportData;
  const today = new Date().toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };
  
  const roleMap: {[key:string]: string} = {
      student: t('profile.role.student'),
      dvm: t('profile.role.dvm'),
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm print:hidden">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => onNavigate('my-drugs')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em] text-center">{t('medicationReport.title')}</h1>
          <div className="w-10">
            <Button onClick={handlePrint} variant="primary" className="!p-2.5">
              <PrintIcon />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-8">
        {/* The Printable Report Area */}
        <div id="printable-report" className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg text-slate-900 font-sans">
          {/* Report Header */}
          <div className="flex justify-between items-start pb-4 border-b">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-slate-800">{t('medicationReport.prescription')}</h2>
              <p className="text-sm text-slate-500">{t('medicationReport.issuedOn')}: {today}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg">{user.profile.fullName}</h3>
              <p className="text-sm text-slate-600">{user.profile.role ? roleMap[user.profile.role] : ''}</p>
              {user.profile.licenseNumber && <p className="text-sm text-slate-600">License #: {user.profile.licenseNumber}</p>}
              <p className="text-sm text-slate-600">{user.id}</p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mt-8 pb-4 border-b">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">{t('medicationReport.patientInfo')}</h3>
            <div className="flex items-center gap-4">
                <img src={profile.imageUrl} alt={profile.name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                    <p className="font-bold text-xl">{profile.name}</p>
                </div>
            </div>
          </div>
          
          {/* Medications */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">{t('medicationReport.medications')}</h3>
            <div className="space-y-6">
                {medications.map(med => (
                    <div key={med.id} className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <p className="font-bold">{med.name}</p>
                            <p className="text-sm text-slate-600">{med.formulation}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-slate-800 whitespace-pre-wrap">{med.instructions}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mt-10">
             <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">{t('medicationReport.additionalNotes')}</h3>
             <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('medicationReport.notesPlaceholder')}
                rows={4}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition print-no-border"
             />
          </div>

          {/* Signature */}
          <div className="mt-16 pt-8">
            <div className="border-t-2 border-slate-800 w-64"></div>
            <p className="mt-2 font-semibold">{t('medicationReport.signature')}</p>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-16 pt-6 border-t border-slate-200">
             <p className="text-xs text-slate-500 text-center">{t('medicationReport.disclaimer')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicationReportScreen;