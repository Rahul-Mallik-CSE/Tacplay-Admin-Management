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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  SessionScoreValue,
  SessionTeamPlayer,
} from "@/types/SessionManagementTypes";

interface PlayerDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  player: SessionTeamPlayer | null;
  teamName?: string;
  isSubmitting?: boolean;
  onSubmitPlayerResult: (bookingId: number, result: SessionScoreValue) => void;
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
  player,
  teamName,
  isSubmitting = false,
  onSubmitPlayerResult,
}: PlayerDetailsSheetProps) => {
  const [result, setResult] = useState<SessionScoreValue>("draw");

  const handleScoreSubmit = () => {
    if (!player) {
      return;
    }

    onSubmitPlayerResult(player.booking_id, result);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-l border-white/10 w-full sm:max-w-md overflow-y-auto p-5"
      >
        <SheetHeader className="">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-primary text-base font-bold">
              Player Details & Result Management
            </SheetTitle>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-md font-medium">
              {player?.result ? player.result.toUpperCase() : "PENDING"}
            </span>
          </div>
          <SheetDescription className="text-muted-foreground text-xs">
            Update individual player result for this session.
          </SheetDescription>
        </SheetHeader>

        {/* Player Info */}
        <div className="space-y-0 ">
          <h3 className="text-primary font-semibold text-sm ">Player Info</h3>
          <InfoRow label="Team name" value={teamName || "-"} />
          <InfoRow label="Player ID" value={String(player?.player_id ?? "-")} />
          <InfoRow
            label="Booking ID"
            value={String(player?.booking_id ?? "-")}
          />
          <InfoRow label="Player Name" value={player?.player_name || "-"} />
          <InfoRow label="Current Result" value={player?.result || "-"} />
        </div>

        <Separator className="bg-white/10 " />

        {/* Player Stats */}
        <div className="space-y-0 ">
          <h3 className="text-primary font-semibold text-sm ">Player Stats</h3>
          <InfoRow label="Win" value={String(player?.card_stats.win ?? 0)} />
          <InfoRow label="Loss" value={String(player?.card_stats.loss ?? 0)} />
          <InfoRow label="Draw" value={String(player?.card_stats.draw ?? 0)} />
          <InfoRow
            label="Played"
            value={String(player?.card_stats.played ?? 0)}
          />
          <InfoRow label="Rank" value={String(player?.card_stats.rank ?? 0)} />
          <InfoRow
            label="Current Score"
            value={
              typeof player?.awarded_score === "number"
                ? String(player.awarded_score)
                : "-"
            }
          />
        </div>

        <Separator className="bg-white/10 " />

        {/* Score Management */}
        <div className="space-y-0">
          <h3 className="text-primary font-semibold text-sm">
            Result Management
          </h3>
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs">
              Player Result
            </label>
            <Select
              value={result}
              onValueChange={(value) => setResult(value as SessionScoreValue)}
            >
              <SelectTrigger className="w-full bg-input border-white/10 text-primary">
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="win">Win</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
                <SelectItem value="draw">Draw</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleScoreSubmit}
          disabled={!player || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Result"}
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default PlayerDetailsSheet;
