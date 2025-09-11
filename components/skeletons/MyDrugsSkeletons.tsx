import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const ProfileChipSkeleton: React.FC<{ count?: number }> = ({ count = 2 }) => (
    <div className="flex gap-3">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/60 shrink-0">
                <SkeletonLoader className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                    <SkeletonLoader className="h-3 w-16 rounded" />
                    <SkeletonLoader className="h-4 w-24 rounded" />
                </div>
            </div>
        ))}
    </div>
);

export const MedicationItemSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
    <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-card p-4 rounded-lg shadow-sm flex items-center gap-4">
                <SkeletonLoader className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <SkeletonLoader className="h-5 w-1/3 rounded" />
                    <SkeletonLoader className="h-4 w-1/2 rounded" />
                    <SkeletonLoader className="h-3 w-full rounded" />
                </div>
            </div>
        ))}
    </div>
);
