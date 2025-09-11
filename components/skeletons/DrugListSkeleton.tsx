import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const DrugListSkeleton: React.FC = () => {
    return (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-full p-3 rounded-lg bg-muted/50">
                    <SkeletonLoader className="h-5 w-1/2 rounded" />
                    <SkeletonLoader className="h-3 w-3/4 mt-2 rounded" />
                </div>
            ))}
        </div>
    );
};

export const DrugCategorySkeleton: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <SkeletonLoader className="h-8 w-16 rounded-full" />
            <SkeletonLoader className="h-8 w-24 rounded-full" />
            <SkeletonLoader className="h-8 w-20 rounded-full" />
            <SkeletonLoader className="h-8 w-28 rounded-full" />
        </div>
    );
};
