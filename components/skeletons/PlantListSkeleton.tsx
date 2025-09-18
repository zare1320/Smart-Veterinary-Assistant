import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const PlantListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
    return (
        <div className="space-y-2">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-card p-4 rounded-lg flex justify-between items-start gap-4">
                    <div className="flex-grow space-y-2">
                        <SkeletonLoader className="h-5 w-1/2 rounded" />
                        <SkeletonLoader className="h-4 w-3/4 rounded" />
                        <SkeletonLoader className="h-4 w-full rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <SkeletonLoader className="w-6 h-6 rounded-full" />
                        <SkeletonLoader className="w-6 h-6 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};
