/** @format */

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FieldOwnerDetailSkeleton = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 sm:w-16 sm:h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-44" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-3 sm:p-4 border border-white/5 space-y-2"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-9 w-full sm:w-60" />
        </div>

        <div className="rounded-xl border border-white/5 overflow-hidden">
          <div className="bg-muted/50 border-b border-white/5 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-20" />
              ))}
            </div>
          </div>

          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
              >
                {Array.from({ length: 6 }).map((__, colIndex) => (
                  <Skeleton
                    key={`${rowIndex}-${colIndex}`}
                    className="h-8 w-full"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldOwnerDetailSkeleton;
