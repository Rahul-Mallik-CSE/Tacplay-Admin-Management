/** @format */
"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface PlayerDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  playerName?: string;
  teamName?: string;
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

const PlayerDetailsSheet = ({
  open,
  onClose,
  playerName = "Elon Rektler",
  teamName = "Green Snack Squad",
}: PlayerDetailsSheetProps) => {
  const [score, setScore] = useState("50");

  const handleScoreSubmit = () => {
    console.log("Score submitted:", score);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-l border-white/10 w-full sm:max-w-md overflow-y-auto p-5"
      >
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-primary text-lg font-bold">
              Player Details & Score Management
            </SheetTitle>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-md font-medium">
              Check-In
            </span>
          </div>
          <SheetDescription className="text-muted-foreground text-xs">
            View full booking information and transaction.
          </SheetDescription>
        </SheetHeader>

        {/* Player Info */}
        <div className="space-y-1 mb-4">
          <h3 className="text-primary font-semibold text-sm mb-2">
            Player Info
          </h3>
          <InfoRow label="Team name" value={teamName} />
          <InfoRow label="Player ID" value="#CN 256" />
          <InfoRow label="Player Name" value={playerName} />
          <InfoRow label="Email" value="name@gmail.com" />
          <InfoRow label="Contact Number" value="+26 256 2564" />
        </div>

        <Separator className="bg-white/10 my-3" />

        {/* Booking Info */}
        <div className="space-y-1 mb-4">
          <h3 className="text-primary font-semibold text-sm mb-2">
            Booking Info
          </h3>
          <InfoRow label="Booking ID" value="#CNH 565" />
          <InfoRow label="Transaction ID" value="#CNH 565" />
          <InfoRow label="Amount" value="$25.25" />
          <InfoRow
            label="Platform Fee (Free User)"
            value="$05.25"
            valueClass="text-chart-4"
          />
          <InfoRow label="Net Profit" value="$24.05" />
          <InfoRow label="Payment Method" value="PayPal" />
          <InfoRow label="Date & Time" value="02:30 AM, 25 Jan 2026" />
          <InfoRow
            label="Payment Status"
            value={
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs px-2 py-0.5 rounded">
                Paid
              </span>
            }
          />
        </div>

        <Separator className="bg-white/10 my-3" />

        {/* Score Management */}
        <div className="space-y-3 mb-4">
          <h3 className="text-primary font-semibold text-sm">
            Score Management
          </h3>
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs">Match Score</label>
            <Input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="bg-input border-white/10 text-primary"
              placeholder="Enter score"
            />
          </div>
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleScoreSubmit}
        >
          Score Submit
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default PlayerDetailsSheet;
