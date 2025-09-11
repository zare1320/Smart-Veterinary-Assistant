import React from 'react';
// FIX: Added explicit Transition type to transition object to fix framer-motion easing type error. The 'ease' property must be a specific literal type, not a generic string.
import { motion, Transition } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  containerClassName?: string;
}

// FIX: Replaced inline animation props with variants to fix type errors.
const skeletonVariants = {
  animate: {
    opacity: [0.7, 1, 0.7],
  },
};

const transition: Transition = {
  duration: 1.5,
  repeat: Infinity,
  ease: "easeInOut",
};


const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <motion.div
        className={`bg-muted ${className}`}
        variants={skeletonVariants}
        initial={{ opacity: 0.7 }}
        animate="animate"
        transition={transition}
    />
);


export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className, count = 1, containerClassName }) => {
    const skeletons = Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={className} />
    ));

    return <div className={containerClassName}>{skeletons}</div>;
};