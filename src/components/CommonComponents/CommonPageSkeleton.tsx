/** @format */

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type CommonPageSkeletonProps = {
  titleWidthClass?: string;
  searchWidthClass?: string;
  rows?: number;
  columns?: number;
};

const CommonPageSkeleton = ({
  titleWidthClass = "w-44",
  searchWidthClass = "w-full sm:w-60",
  rows = 8,
  columns = 6,
}: CommonPageSkeletonProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Skeleton className={`h-8 ${titleWidthClass}`} />
        <Skeleton className={`h-9 ${searchWidthClass}`} />
      </div>

      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="bg-muted/50 border-b border-white/5 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton key={`header-${index}`} className="h-4 w-20" />
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {Array.from({ length: columns }).map((__, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-8 w-full"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-44" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
};

export default CommonPageSkeleton;
