import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Medication, MedicationProfile } from '../types';
import { useLocale } from '../context/LocaleContext';
import { PillIcon, PlusIcon, ChevronRightIcon, EllipsisVerticalIcon, PawIcon, ExchangeIcon, BellIcon, FileMedicalIcon, PencilIcon, DeleteIcon } from '../components/Icons';
import { Button } from '../components/Button';
import ProfileModal from '../components/ProfileModal';
import MedicationModal from '../components/MedicationModal';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileChipSkeleton, MedicationItemSkeleton } from '../components/skeletons/MyDrugsSkeletons';
import { EmptyState } from '../components/EmptyState';
import toast from 'react-hot-toast';

// FIX: Replaced inline animation props with variants to fix type errors.
const profileButtonVariants = {
  active: { scale: 1.05 },
  inactive: { scale: 1 },
  hoverActive: { scale: 1.08 },
  hoverInactive: { scale: 1.03 },
  tap: { scale: 0.98 },
};

const medicationItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const toolButtonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};


const MyDrugsScreen: React.FC = () => {
    const { t } = useLocale();
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState<MedicationProfile[]>([]);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [activeProfileId, setActiveProfileId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal States
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState<MedicationProfile | null>(null);
    const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
    const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
    
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [profilesData, medicationsData] = await Promise.all([
                dataService.getProfiles(t),
                // FIX: Passed the translation function `t` to `getMedications` to ensure consistent data fetching and initialization logic.
                dataService.getMedications(t)
            ]);
            setProfiles(profilesData);
            setMedications(medicationsData);
            if (profilesData.length > 0 && !activeProfileId) {
                setActiveProfileId(profilesData[0].id);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [t]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openMenuId && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    const activeProfile = useMemo(() => {
        return profiles.find(p => p.id === activeProfileId) || null;
    }, [activeProfileId, profiles]);

    const activeMedications = useMemo(() => {
        return medications.filter(med => med.profileId === activeProfileId);
    }, [activeProfileId, medications]);

    // Profile CRUD Handlers
    const handleSaveProfile = async (data: { id?: number; name: string; imageUrl: string }) => {
        // FIX: Corrected call to `saveProfile` by adding the missing `t` argument, as required by the data service implementation.
        const updatedProfiles = await dataService.saveProfile(data, t);
        setProfiles(updatedProfiles);
        
        if (!data.id) {
            const newProfile = updatedProfiles[updatedProfiles.length -1];
            setActiveProfileId(newProfile.id);
        }
        
        setIsProfileModalOpen(false);
        setEditingProfile(null);
        toast.success(data.id ? t('toast.profile.updated') : t('toast.profile.created'));
    };

    const handleDeleteProfile = async (profileId: number) => {
        if (window.confirm(t('myMedList.deleteProfileConfirm'))) {
            // FIX: Corrected call to `deleteProfile` by adding the missing `t` argument, as required by the data service implementation.
            const { profiles: newProfiles, medications: newMedications } = await dataService.deleteProfile(profileId, t);
            setProfiles(newProfiles);
            setMedications(newMedications);
            if (activeProfileId === profileId) {
                setActiveProfileId(newProfiles.length > 0 ? newProfiles[0].id : null);
            }
            toast.success(t('toast.profile.deleted'));
        }
        setOpenMenuId(null);
    };
    
    // Medication CRUD Handlers
    const handleSaveMedication = async (data: { id?: number; name: string; formulation: string; instructions: string }) => {
        if(activeProfileId) {
            // FIX: Corrected call to `saveMedication` by adding the missing `t` argument, as required by the data service implementation.
            const updatedMeds = await dataService.saveMedication({ ...data, profileId: activeProfileId }, t);
            setMedications(updatedMeds);
        }
        setIsMedicationModalOpen(false);
        setEditingMedication(null);
        toast.success(data.id ? t('toast.medication.updated') : t('toast.medication.added'));
    };

    const handleDeleteMedication = async (medicationId: number) => {
        if (window.confirm(t('myMedList.deleteMedConfirm'))) {
            // FIX: Corrected call to `deleteMedication` by adding the missing `t` argument, as required by the data service implementation.
            const updatedMeds = await dataService.deleteMedication(medicationId, t);
            setMedications(updatedMeds);
            toast.success(t('toast.medication.deleted'));
        }
        setOpenMenuId(null);
    };
    
    // UI Helpers
    const openProfileModal = (profile: MedicationProfile | null) => {
        setEditingProfile(profile);
        setIsProfileModalOpen(true);
        setOpenMenuId(null);
    };
    const openMedicationModal = (med: Medication | null) => {
        setEditingMedication(med);
        setIsMedicationModalOpen(true);
        setOpenMenuId(null);
    };

    const featureTools = [
        { key: 'interactions', title: t('myMedList.featureInteractionsTitle'), description: t('myMedList.featureInteractionsDesc'), icon: <ExchangeIcon className="text-2xl" />, color: 'text-blue-500', path: '/drug-interaction-checker' },
        { key: 'alerts', title: t('myMedList.featureAlertsTitle'), description: t('myMedList.featureAlertsDesc'), icon: <BellIcon className="text-2xl" />, color: 'text-amber-500', path: null },
        { key: 'reports', title: t('myMedList.featureReportsTitle'), description: t('myMedList.featureReportsDesc'), icon: <FileMedicalIcon className="text-2xl" />, color: 'text-emerald-500', path: '/medication-report' }
    ];

    return (
        <div className="min-h-screen">
             <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
                <div className="flex items-center p-4 justify-between">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-heading">{t('myMedList.title')}</h1>
                    <button 
                        onClick={() => openProfileModal(null)}
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)] transition-colors shadow-md"
                        aria-label={t('profileModal.title')}
                    >
                        <PlusIcon className="text-xl" />
                    </button>
                </div>
            </header>
            
            <main className="p-4 space-y-8">
                {/* Profile Selector */}
                <section>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                        {isLoading ? (
                            <ProfileChipSkeleton />
                        ) : (
                            profiles.map(profile => (
                                <div key={profile.id} className="relative shrink-0">
                                    <motion.button
                                        onClick={() => setActiveProfileId(profile.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 w-full ${activeProfileId === profile.id ? 'bg-card shadow-lg' : 'bg-muted/60 hover:bg-muted'}`}
                                        variants={profileButtonVariants}
                                        animate={activeProfileId === profile.id ? 'active' : 'inactive'}
                                        whileHover={activeProfileId === profile.id ? 'hoverActive' : 'hoverInactive'}
                                        whileTap="tap"
                                    >
                                        <img src={profile.imageUrl} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div className="text-start">
                                            <p className="text-xs text-muted-foreground">{t('myMedList.profileFor')}</p>
                                            <p className="font-bold text-sm text-heading">{profile.name}</p>
                                        </div>
                                        <div className="w-4"></div>
                                    </motion.button>
                                    <div ref={openMenuId === `profile-${profile.id}` ? menuRef : null} className="absolute top-2 end-2">
                                        <button onClick={() => setOpenMenuId(openMenuId === `profile-${profile.id}` ? null : `profile-${profile.id}`)} className="p-1 rounded-full text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10">
                                            <EllipsisVerticalIcon />
                                        </button>
                                        {openMenuId === `profile-${profile.id}` && (
                                            <div className="absolute end-0 mt-2 w-32 bg-popover rounded-lg shadow-xl z-20 text-start">
                                                <button onClick={() => openProfileModal(profile)} className="w-full text-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted flex items-center gap-2 rounded-t-lg"><PencilIcon/> {t('edit')}</button>
                                                <button onClick={() => handleDeleteProfile(profile.id)} className="w-full text-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-muted flex items-center gap-2 rounded-b-lg"><DeleteIcon/> {t('delete')}</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
                
                {/* Medication List */}
                <section>
                    {isLoading ? (
                        <MedicationItemSkeleton />
                    ) : activeProfileId && activeMedications.length > 0 ? (
                        <div className="space-y-3">
                            <AnimatePresence>
                                {activeMedications.map(med => (
                                    <motion.div 
                                        key={med.id} 
                                        layout
                                        variants={medicationItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="bg-card p-4 rounded-lg shadow-sm flex items-center gap-4"
                                    >
                                        <div className="flex-shrink-0 bg-secondary text-secondary-foreground p-3 rounded-full">
                                            <PillIcon className="text-2xl"/>
                                        </div>
                                        <div className="flex-1 text-start">
                                            <h3 className="font-bold text-heading">{med.name}</h3>
                                            <p className="text-sm text-foreground">{med.formulation}</p>
                                            <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{med.instructions}</p>
                                        </div>
                                        <div ref={openMenuId === `med-${med.id}` ? menuRef : null} className="relative">
                                            <button onClick={() => setOpenMenuId(openMenuId === `med-${med.id}` ? null : `med-${med.id}`)} className="text-muted-foreground hover:text-foreground">
                                                <EllipsisVerticalIcon />
                                            </button>
                                            {openMenuId === `med-${med.id}` && (
                                                <div className="absolute end-0 mt-2 w-32 bg-popover rounded-lg shadow-xl z-20 text-start">
                                                    <button onClick={() => openMedicationModal(med)} className="w-full text-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted flex items-center gap-2 rounded-t-lg"><PencilIcon/> {t('edit')}</button>
                                                    <button onClick={() => handleDeleteMedication(med.id)} className="w-full text-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-muted flex items-center gap-2 rounded-b-lg"><DeleteIcon/> {t('delete')}</button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div className="pt-4">
                               <Button onClick={() => openMedicationModal(null)} variant="primary" className="w-full !rounded-lg">
                                    <PlusIcon className="me-2" /> {t('myMedList.addMedication')}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <EmptyState 
                            icon={<PawIcon className="text-4xl" />}
                            title={activeProfileId ? t('myMedList.noMedications') : 'Create or select a profile'}
                            message={activeProfileId ? t('myMedList.getStarted') : 'Add a pet profile to start managing medications.'}
                            action={{
                                text: activeProfileId ? t('myMedList.addMedication') : 'Add Profile',
                                onClick: () => activeProfileId ? openMedicationModal(null) : openProfileModal(null),
                                icon: <PlusIcon className="me-2" />
                            }}
                        />
                    )}
                </section>

                 {/* Feature Showcase */}
                <section>
                    <h2 className="text-xl font-bold text-start mb-4 text-heading">{t('myMedList.yourTools')}</h2>
                    <div className="space-y-3">
                        {featureTools.map(tool => {
                            const isReportTool = tool.key === 'reports';
                            const isReportDisabled = isReportTool && (!activeProfile || activeMedications.length === 0);
                            
                             return (
                                 <motion.button 
                                    key={tool.title} 
                                    className="w-full text-start bg-card p-4 rounded-lg shadow-sm flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        if (tool.path === '/medication-report' && activeProfile) {
                                            navigate(tool.path, { state: { profile: activeProfile, medications: activeMedications } });
                                        } else if (tool.path) {
                                            navigate(tool.path)
                                        }
                                    }}
                                    disabled={!tool.path || isReportDisabled}
                                    variants={toolButtonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <div className={`flex-shrink-0 ${tool.color}`}>
                                        {tool.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-heading">{tool.title}</h3>
                                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                                    </div>
                                    <ChevronRightIcon className="text-muted-foreground"/>
                                </motion.button>
                             );
                        })}
                    </div>
                </section>
            </main>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onSave={handleSaveProfile}
                editingProfile={editingProfile}
            />
            <MedicationModal
                isOpen={isMedicationModalOpen}
                onClose={() => setIsMedicationModalOpen(false)}
                onSave={handleSaveMedication}
                editingMedication={editingMedication}
            />
        </div>
    );
};

export default MyDrugsScreen;