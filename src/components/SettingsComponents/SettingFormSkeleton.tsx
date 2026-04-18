/** @format */

import { Skeleton } from "../ui/skeleton";

export const SettingsFormSkeleton = () => {
  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      <div className="bg-card rounded-xl border border-white/5 p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="h-3 w-14" />
          </div>

          <div className="flex-1 space-y-3">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
};
