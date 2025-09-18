import React from 'react';
// FIX: Replaced framer-motion variants with inline animation props to fix type errors.
// FIX: Added explicit Variants type to modalVariants object to fix framer-motion transition type error. The 'type' property of a transition must be a specific literal type, not a generic string.
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
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

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-2xl shadow-xl w-full max-w-2xl p-6 text-start"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-heading">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            <div className="text-foreground/90 space-y-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;