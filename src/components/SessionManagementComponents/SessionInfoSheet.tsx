/** @format */
"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SessionInfoSheetProps {
  open: boolean;
  onClose: () => void;
  onDisable: () => void;
  onSubmit: () => void;
}

const InfoRow = ({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}) => (
  <div className="flex items-start justify-between gap-4 py-1.5">
    <span className="text-muted-foreground text-sm shrink-0">{label}</span>
    <span className={`text-primary text-sm text-right ${valueClass ?? ""}`}>
      {value}
    </span>
  </div>
);

const SessionInfoSheet = ({
  open,
  onClose,
  onDisable,
  onSubmit,
}: SessionInfoSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-l border-white/10 w-full sm:max-w-md overflow-y-auto p-5"
      >
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-primary text-lg font-bold">
              Session Information&apos;s
            </SheetTitle>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-md font-medium">
              Complete
            </span>
          </div>
          <SheetDescription className="text-muted-foreground text-xs">
            View full booking information and transaction.
          </SheetDescription>
        </SheetHeader>

        {/* Field Info */}
        <div className="space-y-1 mb-4">
          <h3 className="text-primary font-semibold text-sm mb-2">
            Field Info
          </h3>
          <InfoRow label="Field ID" value="#CN 256" />
          <InfoRow label="Field Name" value="Imrul Hossain" />
          <InfoRow
            label="Location"
            value="Flat 4B, 27 Maple Grove, Birmingham, West Midlands, United State"
          />
          <InfoRow label="Contact Number" value="+26 256 2564" />
        </div>

        <Separator className="bg-white/10 my-3" />

        {/* Session Info */}
        <div className="space-y-1 mb-4">
          <h3 className="text-primary font-semibold text-sm mb-2">
            Session Info
          </h3>
          <InfoRow label="Session ID" value="#CN 256" />
          <InfoRow label="Session Name" value="Friday Night Colorball Match" />
          <InfoRow
            label="Match Type"
            value={
              <span className="flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                Ranked
              </span>
            }
          />
          <InfoRow label="Session Date" value="25 January, 2026" />
          <InfoRow label="Time" value="02:30 AM to 03:30 PM" />
          <InfoRow label="Session Type" value="Team" />
          <InfoRow label="Team" value="2" />
          <InfoRow label="Player Per Team" value="8/8" />
          <InfoRow label="Packages" value="Silver Premium" />
        </div>

        <Separator className="bg-white/10 my-3" />

        {/* Team Info */}
        <div className="space-y-1 mb-6">
          <h3 className="text-primary font-semibold text-sm mb-2">Team Info</h3>
          <InfoRow label="Team A Name" value="Red Bull Squad" />
          <InfoRow
            label="Team A Score"
            value={<span className="text-emerald-400">+59</span>}
          />
          <InfoRow label="Team B Name" value="Snack Green Squad" />
          <InfoRow label="Team B Score" value="—" />
          <InfoRow label="Champion" value="Team A - Red Bull Squad" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-custom-red text-custom-red hover:bg-custom-red/10 text-sm"
            onClick={onDisable}
          >
            Disable Match
          </Button>
          <Button
            className="flex-1 bg-custom-red hover:bg-custom-red/90 text-white text-sm"
            onClick={onSubmit}
          >
            Submit Final Result
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SessionInfoSheet;
