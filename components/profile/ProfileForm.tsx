import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useLocale } from '../../context/LocaleContext';
import type { UserProfile, UserRole } from '../../types';
import { LabeledInput, LabeledSelect } from '../forms';
import { Button } from '../Button';
import { UserIcon, UniversityIcon, IdCardIcon, MapPinIcon, AwardIcon } from '../Icons';

interface ProfileFormProps {
    onSave: () => void;
    onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onCancel }) => {
    const { user, updateProfile } = useUser();
    const { t } = useLocale();
    const [profile, setProfile] = useState<UserProfile>(user!.profile);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!profile.fullName.trim()) newErrors.fullName = t('profile.error.required');
        if (!profile.role) newErrors.role = t('profile.error.required');
        if (profile.role === 'student' && !profile.university?.trim()) newErrors.university = t('profile.error.required');
        if (profile.role === 'dvm' && !profile.licenseNumber?.trim()) newErrors.licenseNumber = t('profile.error.required');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            updateProfile(profile);
            onSave();
        }
    };

    const roleOptions = [
        { value: 'student', label: t('profile.form.role.student') },
        { value: 'dvm', label: t('profile.form.role.dvm') }
    ];

    const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className="relative">{children}</div>
    );
    const Icon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
        <div className="absolute top-[2.4rem] start-3.5 text-muted-foreground pointer-events-none">{icon}</div>
    );

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
                    placeholder={t('profile.form.fullNamePlaceholder')}
                    required
                    className="!ps-10"
                />
                {errors.fullName && <p className="text-sm text-red-500 mt-1 text-start">{errors.fullName}</p>}
            </IconWrapper>
            
            <LabeledSelect
                label={t('profile.form.roleLabel')}
                id="role"
                name="role"
                value={profile.role || ''}
                onChange={(e) => setProfile({ ...profile, role: e.target.value as UserRole, university: '', studentId: '', province: '', licenseNumber: '' })}
                required
            >
                <option value="" disabled>{t('profile.form.rolePlaceholder')}</option>
                {roleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </LabeledSelect>
            {errors.role && <p className="text-sm text-red-500 mt-1 text-start">{errors.role}</p>}

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
                            placeholder={t('profile.form.universityPlaceholder')}
                            required
                            className="!ps-10"
                        />
                         {errors.university && <p className="text-sm text-red-500 mt-1 text-start">{errors.university}</p>}
                    </IconWrapper>
                    <IconWrapper>
                        <Icon icon={<IdCardIcon />} />
                        <LabeledInput
                            label={t('profile.form.studentIdLabel')}
                            id="studentId"
                            name="studentId"
                            value={profile.studentId || ''}
                            onChange={handleChange}
                            placeholder={t('profile.form.studentIdPlaceholder')}
                            className="!ps-10"
                        />
                    </IconWrapper>
                </>
            )}

            {profile.role === 'dvm' && (
                <>
                    <IconWrapper>
                        <Icon icon={<MapPinIcon />} />
                        <LabeledInput
                            label={t('profile.form.provinceLabel')}
                            id="province"
                            name="province"
                            value={profile.province || ''}
                            onChange={handleChange}
                            placeholder={t('profile.form.provincePlaceholder')}
                            className="!ps-10"
                        />
                    </IconWrapper>
                    <IconWrapper>
                        <Icon icon={<AwardIcon />} />
                        <LabeledInput
                            label={t('profile.form.licenseNumberLabel')}
                            id="licenseNumber"
                            name="licenseNumber"
                            value={profile.licenseNumber || ''}
                            onChange={handleChange}
                            placeholder={t('profile.form.licenseNumberPlaceholder')}
                            required
                            className="!ps-10"
                        />
                         {errors.licenseNumber && <p className="text-sm text-red-500 mt-1 text-start">{errors.licenseNumber}</p>}
                    </IconWrapper>
                </>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel} className="w-full">
                    {t('profile.form.cancelButton')}
                </Button>
                <Button type="submit" variant="primary" className="w-full">
                    {t('profile.form.saveButton')}
                </Button>
            </div>
        </form>
    );
};