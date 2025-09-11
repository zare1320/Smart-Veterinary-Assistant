import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  containerClassName?: string;
}

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <motion.div
        className={`bg-muted ${className}`}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
);


export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className, count = 1, containerClassName }) => {
    const skeletons = Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={className} />
    ));

    return <div className={containerClassName}>{skeletons}</div>;
};
