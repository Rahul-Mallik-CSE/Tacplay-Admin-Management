/** @format */

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const OverviewSkeleton = () => {
  return (
    <div className="w-full p-3 md:p-4 space-y-6">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <div className="flex justify-end">
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-4 border border-white/5 flex items-start justify-between gap-3"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
          <div className="flex justify-between gap-3 mb-2 md:mb-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-28" />
            </div>
          </div>

          <div className="flex justify-between gap-3 mb-4 md:mb-8">
            <Skeleton className="h-9 w-44" />
            <div className="hidden sm:flex items-center gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="w-full h-52 sm:h-80 md:h-96 rounded-lg border border-white/5 bg-muted/30 p-3">
            <div className="h-full w-full flex items-end gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${35 + ((index * 17) % 55)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
