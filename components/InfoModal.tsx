import React from 'react';
// FIX: Replaced framer-motion variants with inline animation props to fix type errors.
import { motion, AnimatePresence } from 'framer-motion';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 text-start"
            initial={{ y: "-50px", opacity: 0 }}
            animate={{ y: "0", opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            exit={{ y: "50px", opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            <div className="text-slate-600 dark:text-slate-300 space-y-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;