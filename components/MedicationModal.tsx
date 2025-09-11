import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { LabeledInput, LabeledTextarea } from './forms';
import { Button } from './Button';
import { XMarkIcon, PillIcon } from './Icons';
import type { Medication } from '../types';

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { id?: number; name: string; formulation: string; instructions: string }) => void;
  editingMedication: Medication | null;
}

const MedicationModal: React.FC<MedicationModalProps> = ({ isOpen, onClose, onSave, editingMedication }) => {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [formulation, setFormulation] = useState('');
  const [instructions, setInstructions] = useState('');

  const isEditing = !!editingMedication;

  useEffect(() => {
    if (isOpen) {
      setName(editingMedication?.name || '');
      setFormulation(editingMedication?.formulation || '');
      setInstructions(editingMedication?.instructions || '');
    }
  }, [isOpen, editingMedication]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && formulation.trim() && instructions.trim()) {
      onSave({
        id: editingMedication?.id,
        name: name.trim(),
        formulation: formulation.trim(),
        instructions: instructions.trim(),
      });
    }
  };

  const isFormValid = name.trim() && formulation.trim() && instructions.trim();

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
            className="bg-card rounded-2xl shadow-xl w-full max-w-md"
            initial={{ y: "-50px", opacity: 0 }}
            animate={{ y: "0", opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            exit={{ y: "50px", opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="medication-modal-title"
          >
            <form onSubmit={handleSubmit}>
              <header className="flex justify-between items-center p-4 border-b border-border">
                <h2 id="medication-modal-title" className="text-lg font-bold text-heading">
                  {isEditing ? t('medicationModal.editTitle') : t('medicationModal.addTitle')}
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
                <LabeledInput 
                    label={t('medicationModal.nameLabel')}
                    id="medName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('medicationModal.namePlaceholder')}
                    required
                />
                <LabeledInput 
                    label={t('medicationModal.formulationLabel')}
                    id="medFormulation"
                    value={formulation}
                    onChange={(e) => setFormulation(e.target.value)}
                    placeholder={t('medicationModal.formulationPlaceholder')}
                    required
                />
                <LabeledTextarea
                    label={t('medicationModal.instructionsLabel')}
                    id="medInstructions"
                    rows={3}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder={t('medicationModal.instructionsPlaceholder')}
                    required
                />
              </main>
              <footer className="flex justify-end items-center gap-3 p-4 bg-muted/50 rounded-b-2xl">
                <Button type="button" variant="secondary" onClick={onClose}>
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={!isFormValid}>
                  {isEditing ? t('saveChanges') : t('medicationModal.add')}
                </Button>
              </footer>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MedicationModal;