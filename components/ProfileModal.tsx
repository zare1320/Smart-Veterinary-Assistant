import React, { useState, useEffect } from 'react';
// FIX: Added explicit Variants type to modalVariants object to fix framer-motion transition type error. The 'type' property of a transition must be a specific literal type, not a generic string.
import { motion, AnimatePresence, Variants } from 'framer-motion';
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

// FIX: Replaced inline animation props with variants to fix type errors.
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { y: "-50px", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { y: "50px", opacity: 0 },
};

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
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-2xl shadow-xl w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
          >
            <form onSubmit={handleSubmit}>
              <header className="flex justify-between items-center p-4 border-b border-border">
                <h2 id="profile-modal-title" className="text-lg font-bold text-heading">
                  {isEditing ? t('profileModal.editTitle') : t('profileModal.title')}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={t('cancel')}
                >
                  <XMarkIcon className="text-xl" />
                </button>
              </header>
              <main className="p-6 space-y-4">
                 <div className="relative">
                    <UserIcon className="absolute top-[2.4rem] start-3.5 text-muted-foreground pointer-events-none" />
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
                    <ImageIcon className="absolute top-[2.4rem] start-3.5 text-muted-foreground pointer-events-none" />
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
              <footer className="flex justify-end items-center gap-3 p-4 bg-muted/50 rounded-b-2xl">
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