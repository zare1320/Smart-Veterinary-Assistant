// FIX: Created the ProfileForm component which was missing.
import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import type { User, UserProfile, NavItemKey } from '../../types';
import { Button } from '../Button';
import { LabeledInput, LabeledSelect } from '../forms';
import { ArrowLeftIcon, ArrowRightIcon, AwardIcon, IdCardIcon, MailIcon, MapPinIcon, PhoneIcon, UniversityIcon, UserIcon } from '../Icons';

interface ProfileFormProps {
    user: User;
    onSave: (data: UserProfile) => void;
    onCancel: () => void;
    onNavigate: (screen: NavItemKey) => void;
}

type FormErrors = {
    [key in keyof UserProfile]?: string;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave, onCancel, onNavigate }) => {
    const { t, locale } = useLocale();
    const [formData, setFormData] = useState<UserProfile>(user.profile);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof UserProfile]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = t('profile.error.required');
        if (!formData.role) newErrors.role = t('profile.error.required');

        if (formData.role === 'student') {
            if (!formData.university?.trim()) newErrors.university = t('profile.error.required');
            if (!formData.studentId?.trim()) newErrors.studentId = t('profile.error.required');
        }
        if (formData.role === 'dvm') {
            if (!formData.province?.trim()) newErrors.province = t('profile.error.required');
            if (!formData.licenseNumber?.trim()) newErrors.licenseNumber = t('profile.error.required');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };
    
    const roleOptions = [
        { value: '', label: t('profile.form.rolePlaceholder'), disabled: true },
        { value: 'student', label: t('profile.form.role.student') },
        { value: 'dvm', label: t('profile.form.role.dvm') },
    ];
    
    const IdentityIcon = user.email ? MailIcon : PhoneIcon;

    return (
        <div>
            <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                {user.isProfileComplete ? (
                    <button onClick={onCancel} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        {locale === 'fa' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
                    </button>
                ) : <div className="w-10"></div>}
                <h1 className="text-lg font-bold">{t('profile.form.title')}</h1>
                <div className="w-10"></div>
            </header>

            <main className="p-4 sm:p-6 max-w-2xl mx-auto">
                {!user.isProfileComplete && (
                     <p className="text-center text-slate-500 dark:text-slate-400 mb-6">{t('profile.form.subtitle')}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 text-start">
                                {t('profile.form.identityLabel')}
                            </label>
                            <div className="relative">
                                <IdentityIcon className="absolute top-1/2 -translate-y-1/2 start-3.5 text-slate-400 dark:text-slate-500"/>
                                <input 
                                    type="text" 
                                    value={user.email || user.phone || ''}
                                    readOnly
                                    className="form-input w-full !ps-10 bg-slate-100 dark:bg-slate-700/50 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <LabeledInput
                            label={t('profile.form.fullNameLabel')}
                            id="fullName"
                            name="fullName"
                            icon={<UserIcon />}
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            placeholder={t('profile.form.fullNamePlaceholder')}
                        />
                        <LabeledSelect
                            label={t('profile.form.roleLabel')}
                            id="role"
                            name="role"
                            icon={<AwardIcon />}
                            value={formData.role}
                            onChange={handleChange}
                            error={errors.role}
                        >
                            {roleOptions.map(opt => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
                        </LabeledSelect>
                        
                        {formData.role === 'student' && (
                            <>
                                <LabeledInput
                                    label={t('profile.form.universityLabel')}
                                    id="university"
                                    name="university"
                                    icon={<UniversityIcon />}
                                    value={formData.university || ''}
                                    onChange={handleChange}
                                    error={errors.university}
                                    placeholder={t('profile.form.universityPlaceholder')}
                                />
                                <LabeledInput
                                    label={t('profile.form.studentIdLabel')}
                                    id="studentId"
                                    name="studentId"
                                    icon={<IdCardIcon />}
                                    value={formData.studentId || ''}
                                    onChange={handleChange}
                                    error={errors.studentId}
                                    placeholder={t('profile.form.studentIdPlaceholder')}
                                />
                            </>
                        )}

                        {formData.role === 'dvm' && (
                            <>
                                <LabeledInput
                                    label={t('profile.form.provinceLabel')}
                                    id="province"
                                    name="province"
                                    icon={<MapPinIcon />}
                                    value={formData.province || ''}
                                    onChange={handleChange}
                                    error={errors.province}
                                    placeholder={t('profile.form.provincePlaceholder')}
                                />
                                <LabeledInput
                                    label={t('profile.form.licenseNumberLabel')}
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    icon={<IdCardIcon />}
                                    value={formData.licenseNumber || ''}
                                    onChange={handleChange}
                                    error={errors.licenseNumber}
                                    placeholder={t('profile.form.licenseNumberPlaceholder')}
                                />
                            </>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {user.isProfileComplete && (
                            <Button type="button" onClick={onCancel} variant="secondary" className="w-full">
                                {t('profile.form.cancelButton')}
                            </Button>
                        )}
                        <Button type="submit" variant="primary" className="w-full">
                            {t('profile.form.saveButton')}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ProfileForm;