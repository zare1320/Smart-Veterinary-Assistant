import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const ProtocolDetailSkeleton: React.FC = () => {
    return (
        <div>
             <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
                <div className="flex items-center p-4 justify-between border-b border-border">
                  <SkeletonLoader className="w-10 h-10 rounded-full" />
                  <SkeletonLoader className="h-6 w-40 rounded" />
                  <div className="w-10"></div>
                </div>
            </header>
            <main className="max-w-3xl mx-auto p-4 sm:p-6">
                <SkeletonLoader className="w-full h-48 rounded-2xl mb-6" />
                <SkeletonLoader className="h-10 w-3/4 rounded mb-2" />
                <SkeletonLoader className="h-5 w-full rounded mb-6" />
                <div className="space-y-3">
                    <SkeletonLoader className="h-4 w-full rounded" />
                    <SkeletonLoader className="h-4 w-full rounded" />
                    <SkeletonLoader className="h-4 w-5/6 rounded" />
                    <div className="h-6"></div>
                    <SkeletonLoader className="h-4 w-1/2 rounded" />
                    <SkeletonLoader className="h-4 w-full rounded" />
                    <SkeletonLoader className="h-4 w-full rounded" />
                    <SkeletonLoader className="h-4 w-3/4 rounded" />
                </div>
            </main>
        </div>
    );
};
