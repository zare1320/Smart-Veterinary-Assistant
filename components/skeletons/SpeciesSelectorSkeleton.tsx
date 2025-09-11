import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const SpeciesSelectorSkeleton: React.FC = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-center">
        {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
                <SkeletonLoader className="w-24 h-24 rounded-full" />
                <SkeletonLoader className="h-4 w-16 rounded" />
            </div>
        ))}
    </div>
);
