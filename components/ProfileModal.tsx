import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { LabeledInput } from './forms';
import { Button } from './Button';
import { XMarkIcon, UserIcon, ImageIcon } from './Icons';
import type { MedicationProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { id?: number; name: string; imageUrl: string }) => void;
  editingProfile: MedicationProfile | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, editingProfile }) => {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isEditing = !!editingProfile;

  useEffect(() => {
    if (isOpen) {
      setName(editingProfile?.name || '');
      setImageUrl(editingProfile?.imageUrl || '');
    }
  }, [isOpen, editingProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({
        id: editingProfile?.id,
        name: name.trim(),
        imageUrl: imageUrl.trim(),
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // FIX: Replaced framer-motion variants with inline animation props to fix type errors.
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md"
            initial={{ y: "-50px", opacity: 0 }}
            animate={{ y: "0", opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            exit={{ y: "50px", opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
          >
            <form onSubmit={handleSubmit}>
              <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 id="profile-modal-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {isEditing ? t('profileModal.editTitle') : t('profileModal.title')}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  aria-label={t('cancel')}
                >
                  <XMarkIcon className="text-xl" />
                </button>
              </header>
              <main className="p-6 space-y-4">
                 <div className="relative">
                    <UserIcon className="absolute top-[2.4rem] start-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    <LabeledInput 
                        label={t('profileModal.nameLabel')}
                        id="profileName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('profileModal.namePlaceholder')}
                        required
                        className="!ps-10"
                    />
                 </div>
                 <div className="relative">
                    <ImageIcon className="absolute top-[2.4rem] start-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    <LabeledInput 
                        label={t('profileModal.imageUrlLabel')}
                        id="profileImageUrl"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder={t('profileModal.imageUrlPlaceholder')}
                        className="!ps-10"
                    />
                 </div>
              </main>
              <footer className="flex justify-end items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-b-2xl">
                <Button type="button" variant="secondary" onClick={onClose}>
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={!name.trim()}>
                  {isEditing ? t('saveChanges') : t('profileModal.create')}
                </Button>
              </footer>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;