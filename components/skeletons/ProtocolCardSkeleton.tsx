import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const ProtocolCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                 <div key={i} className="bg-card rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                    <div className="flex-1 space-y-2">
                        <SkeletonLoader className="h-5 w-20 rounded-full" />
                        <SkeletonLoader className="h-6 w-3/4 mt-1 rounded" />
                        <SkeletonLoader className="h-4 w-full rounded" />
                        <SkeletonLoader className="h-4 w-5/6 rounded" />
                    </div>
                    <SkeletonLoader className="w-24 h-24 rounded-lg flex-shrink-0" />
                </div>
            ))}
        </div>
    );
};
