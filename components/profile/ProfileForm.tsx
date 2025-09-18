import React, { useState, useMemo } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { useLocale } from '../../context/LocaleContext';
import type { UserProfile, UserRole } from '../../types';
import { LabeledInput, LabeledSelect } from '../forms';
import { Button } from '../Button';
import { UserIcon, UniversityIcon, IdCardIcon, MapPinIcon, AwardIcon } from '../Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../../locales/translations';

interface ProfileFormProps {
    onSave: () => void;
    onCancel: () => void;
}

// --- Helper Components (Moved outside ProfileForm) ---

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative">{children}</div>
);

const Icon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <div className="absolute top-[2.4rem] start-3.5 text-muted-foreground pointer-events-none">{icon}</div>
);

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onCancel }) => {
    const { user, updateProfile } = useUserStore();
    const { t, locale } = useLocale();
    const [profile, setProfile] = useState<UserProfile>(user!.profile);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    
    const provinceList = translations[locale].provinces as Record<string, string>;
    
    const errors = useMemo(() => {
        const err: { [key: string]: string | null } = {};
        const numericOnlyRegex = /^\d+$/;
        const licenseNumberRegex = /^\d{7}$/;

        if (!profile.fullName.trim()) {
            err.fullName = t('profile.error.required');
        } else if (profile.fullName.trim().split(/\s+/).length < 2) {
            err.fullName = t('profile.error.fullNameInvalid');
        }
        
        if (!profile.role) err.role = t('profile.error.required');

        if (profile.role === 'student') {
            if (!profile.university?.trim()) err.university = t('profile.error.required');
            if (profile.studentId && !numericOnlyRegex.test(profile.studentId)) {
                err.studentId = t('profile.error.invalidStudentId');
            }
        }
        
        if (profile.role === 'dvm') {
            if (!profile.licenseNumber?.trim()) {
                err.licenseNumber = t('profile.error.required');
            } else if (!licenseNumberRegex.test(profile.licenseNumber)) {
                err.licenseNumber = t('profile.error.invalidLicenseNumber');
            }
            if (!profile.province?.trim()) err.province = t('profile.error.required');
        }
        
        return err;
    }, [profile, t]);

    const isFormValid = Object.values(errors).every(error => error === null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'role') {
             setProfile({
                ...profile,
                role: value as UserRole,
                university: '', studentId: '', province: '', licenseNumber: ''
            });
            // Reset touched status for dependent fields
             setTouched(prev => ({ ...prev, university: false, licenseNumber: false, province: false }));
        } else {
            setProfile({ ...profile, [name]: value });
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ fullName: true, role: true, university: true, licenseNumber: true, province: true, studentId: true });
        if (isFormValid) {
            updateProfile(profile);
            onSave();
        }
    };
    
    const getFieldState = (fieldName: keyof UserProfile) => {
        if (!touched[fieldName]) return '';
        return errors[fieldName] ? 'error' : 'success';
    };

    const roleOptions = [
        { value: 'student', label: t('profile.form.role.student') },
        { value: 'dvm', label: t('profile.form.role.dvm') }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-heading text-start">{t('profile.form.title')}</h2>
            <p className="text-sm text-muted-foreground text-start">{t('profile.form.subtitle')}</p>
            
            <IconWrapper>
                <Icon icon={<UserIcon />} />
                <LabeledInput
                    label={t('profile.form.fullNameLabel')}
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t('profile.form.fullNamePlaceholder')}
                    required
                    className={`!ps-10 ${getFieldState('fullName')}`}
                />
                 <AnimatePresence>
                    {touched.fullName && errors.fullName && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.fullName}</motion.p>
                    )}
                 </AnimatePresence>
            </IconWrapper>
            
            <div>
                <LabeledSelect
                    label={t('profile.form.roleLabel')}
                    id="role"
                    name="role"
                    value={profile.role || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={getFieldState('role')}
                >
                    <option value="" disabled>{t('profile.form.rolePlaceholder')}</option>
                    {roleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </LabeledSelect>
                 <AnimatePresence>
                    {touched.role && errors.role && (
                       <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.role}</motion.p>
                    )}
                </AnimatePresence>
            </div>

            {profile.role === 'student' && (
                <>
                    <IconWrapper>
                        <Icon icon={<UniversityIcon />} />
                        <LabeledInput
                            label={t('profile.form.universityLabel')}
                            id="university"
                            name="university"
                            value={profile.university || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('profile.form.universityPlaceholder')}
                            required
                            className={`!ps-10 ${getFieldState('university')}`}
                        />
                         <AnimatePresence>
                            {touched.university && errors.university && (
                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.university}</motion.p>
                            )}
                        </AnimatePresence>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon icon={<IdCardIcon />} />
                        <LabeledInput
                            label={t('profile.form.studentIdLabel')}
                            id="studentId"
                            name="studentId"
                            value={profile.studentId || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('profile.form.studentIdPlaceholder')}
                            className={`!ps-10 ${getFieldState('studentId')}`}
                        />
                         <AnimatePresence>
                            {touched.studentId && errors.studentId && (
                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.studentId}</motion.p>
                            )}
                        </AnimatePresence>
                    </IconWrapper>
                </>
            )}

            {profile.role === 'dvm' && (
                <>
                    <div>
                        <LabeledSelect
                            label={t('profile.form.provinceLabel')}
                            id="province"
                            name="province"
                            value={profile.province || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={getFieldState('province')}
                        >
                            <option value="" disabled>{t('profile.form.provincePlaceholder')}</option>
                            {Object.entries(provinceList).map(([key, name]) => (
                                <option key={key} value={name}>{name}</option>
                            ))}
                        </LabeledSelect>
                        <AnimatePresence>
                            {touched.province && errors.province && (
                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.province}</motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <IconWrapper>
                        <Icon icon={<AwardIcon />} />
                        <LabeledInput
                            label={t('profile.form.licenseNumberLabel')}
                            id="licenseNumber"
                            name="licenseNumber"
                            value={profile.licenseNumber || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('profile.form.licenseNumberPlaceholder')}
                            required
                            className={`!ps-10 ${getFieldState('licenseNumber')}`}
                        />
                        <AnimatePresence>
                             {touched.licenseNumber && errors.licenseNumber && (
                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.licenseNumber}</motion.p>
                            )}
                        </AnimatePresence>
                    </IconWrapper>
                </>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel} className="w-full">
                    {t('profile.form.cancelButton')}
                </Button>
                <Button type="submit" variant="primary" className="w-full" disabled={!isFormValid}>
                    {t('profile.form.saveButton')}
                </Button>
            </div>
        </form>
    );
};