import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Medication, MedicationProfile } from '../types';
import { useLocale } from '../context/LocaleContext';
import { PillIcon, PlusIcon, ChevronRightIcon, EllipsisVerticalIcon, PawIcon, ExchangeIcon, BellIcon, FileMedicalIcon, PencilIcon, DeleteIcon } from '../components/Icons';
import { Button } from '../components/Button';
import ProfileModal from '../components/ProfileModal';
import MedicationModal from '../components/MedicationModal';

const MyDrugsScreen: React.FC = () => {
    const { t } = useLocale();
    const navigate = useNavigate();

    // Mock Data converted to state
    const [profiles, setProfiles] = useState<MedicationProfile[]>([
        { id: 1, name: t('myMedList.maxGoldenRetriever'), imageUrl: 'https://i.postimg.cc/4x28nG8x/dog-2.png' },
        { id: 2, name: t('myMedList.lunaPersianCat'), imageUrl: 'https://i.postimg.cc/VNSKChTB/cat-2.png' },
    ]);

    const [medications, setMedications] = useState<Medication[]>([
        { id: 1, profileId: 1, name: 'Meloxicam', formulation: t('myMedList.meloxicamSuspension'), instructions: t('myMedList.meloxicamInstructions') },
        { id: 2, profileId: 1, name: 'Clavamox', formulation: t('myMedList.clavamoxTablets'), instructions: t('myMedList.clavamoxInstructions') },
        { id: 3, profileId: 2, name: 'Amoxicillin', formulation: '250mg Tablet', instructions: '1 tablet BID for 7 days' },
    ]);
    
    const [activeProfileId, setActiveProfileId] = useState<number | null>(profiles.length > 0 ? profiles[0].id : null);

    // Modal States
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState<MedicationProfile | null>(null);
    const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
    const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
    
    // Action Menu State
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

     // Close menu on outside click
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
    const handleSaveProfile = (data: { id?: number; name: string; imageUrl: string }) => {
        if (data.id) { // Editing
            setProfiles(profiles.map(p => p.id === data.id ? { ...p, name: data.name, imageUrl: data.imageUrl || p.imageUrl } : p));
        } else { // Creating
            const newProfile: MedicationProfile = {
                id: Date.now(),
                name: data.name,
                imageUrl: data.imageUrl || 'https://i.postimg.cc/P5gLp2f0/default-pet.png',
            };
            setProfiles([...profiles, newProfile]);
            setActiveProfileId(newProfile.id);
        }
        setIsProfileModalOpen(false);
        setEditingProfile(null);
    };

    const handleDeleteProfile = (profileId: number) => {
        if (window.confirm(t('myMedList.deleteProfileConfirm'))) {
            const newProfiles = profiles.filter(p => p.id !== profileId);
            setProfiles(newProfiles);
            setMedications(medications.filter(m => m.profileId !== profileId));
            if (activeProfileId === profileId) {
                setActiveProfileId(newProfiles.length > 0 ? newProfiles[0].id : null);
            }
        }
        setOpenMenuId(null);
    };
    
    // Medication CRUD Handlers
    const handleSaveMedication = (data: { id?: number; name: string; formulation: string; instructions: string }) => {
        if (data.id) { // Editing
            setMedications(medications.map(m => m.id === data.id ? { ...m, ...data } : m));
        } else { // Creating
            const newMedication: Medication = {
                id: Date.now(),
                profileId: activeProfileId!,
                name: data.name,
                formulation: data.formulation,
                instructions: data.instructions,
            };
            setMedications([...medications, newMedication]);
        }
        setIsMedicationModalOpen(false);
        setEditingMedication(null);
    };

    const handleDeleteMedication = (medicationId: number) => {
        if (window.confirm(t('myMedList.deleteMedConfirm'))) {
            setMedications(medications.filter(m => m.id !== medicationId));
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
                        {profiles.map(profile => (
                            <div key={profile.id} className="relative shrink-0">
                                <button
                                    onClick={() => setActiveProfileId(profile.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 w-full ${activeProfileId === profile.id ? 'bg-card shadow-lg scale-105' : 'bg-muted/60 hover:bg-muted'}`}
                                >
                                    <img src={profile.imageUrl} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="text-start">
                                        <p className="text-xs text-muted-foreground">{t('myMedList.profileFor')}</p>
                                        <p className="font-bold text-sm text-heading">{profile.name}</p>
                                    </div>
                                    <div className="w-4"></div>
                                </button>
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
                        ))}
                    </div>
                </section>
                
                {/* Medication List */}
                <section>
                    {activeMedications.length > 0 ? (
                        <div className="space-y-3">
                            {activeMedications.map(med => (
                                <div key={med.id} className="bg-card p-4 rounded-lg shadow-sm flex items-center gap-4">
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
                                </div>
                            ))}
                            <div className="pt-4">
                               <Button onClick={() => openMedicationModal(null)} variant="primary" className="w-full !rounded-lg">
                                    <PlusIcon className="me-2" /> {t('myMedList.addMedication')}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center bg-card rounded-lg p-8 shadow-sm">
                            <div className="mx-auto bg-muted w-16 h-16 flex items-center justify-center rounded-full">
                                <PawIcon className="text-3xl text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-heading">{t('myMedList.noMedications')}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{t('myMedList.getStarted')}</p>
                            <Button onClick={() => openMedicationModal(null)} variant="primary" className="mt-4">
                                <PlusIcon className="me-2" /> {t('myMedList.addMedication')}
                            </Button>
                        </div>
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
                                 <button 
                                    key={tool.title} 
                                    className="w-full text-start bg-card p-4 rounded-lg shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    onClick={() => {
                                        if (tool.path === '/medication-report' && activeProfile) {
                                            navigate(tool.path, { state: { profile: activeProfile, medications: activeMedications } });
                                        } else if (tool.path) {
                                            navigate(tool.path)
                                        }
                                    }}
                                    disabled={!tool.path || isReportDisabled}
                                >
                                    <div className={`flex-shrink-0 ${tool.color}`}>
                                        {tool.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-heading">{tool.title}</h3>
                                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                                    </div>
                                    <ChevronRightIcon className="text-muted-foreground"/>
                                </button>
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