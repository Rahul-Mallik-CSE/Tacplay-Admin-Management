/** @format */
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Player {
  id: number;
  name: string;
  win: number;
  loses: number;
  played: number;
  rank: number;
  score?: number;
  team: "A" | "B";
}

interface PlayerCardProps {
  player: Player;
  onViewDetails: (player: Player) => void;
}

const PlayerCard = ({ player, onViewDetails }: PlayerCardProps) => {
  const hasScore = player.score !== undefined;
  const isPositiveScore = hasScore && (player.score ?? 0) > 0;

  return (
    <div
      className={cn(
        "relative rounded-xl p-3 sm:p-4 overflow-visible",
        "bg-card",
        hasScore
          ? "border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
          : "border border-white/5",
      )}
    >
      {/* Crown with blurred circular background */}
      <div className="absolute -top-3 -left-3 z-10">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Blur glow circle */}
          <div
            className={cn(
              "absolute -inset-1 rounded-full blur-lg",
              hasScore ? "bg-amber-500/50" : "bg-red-600/50",
            )}
          />
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              hasScore ? "bg-amber-500/20" : "bg-red-600/20",
            )}
          />
          <span className="relative text-base leading-none">👑</span>
        </div>
      </div>

      {/* Card content */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0">
          <div
            className={cn(
              "w-full h-full flex items-center justify-center text-sm font-bold text-white",
              player.team === "A"
                ? "bg-linear-to-br from-red-700 to-red-950"
                : "bg-linear-to-br from-amber-600 to-red-900",
            )}
          >
            {player.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Top row — Name + View Details */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-primary text-sm font-semibold truncate">
              {player.name}
            </p>
            <Button
              size="sm"
              variant={hasScore ? "outline" : "default"}
              className={cn(
                "shrink-0 h-7 px-3 text-xs rounded-md font-medium cursor-pointer",
                hasScore
                  ? "border-emerald-400 text-emerald-400 bg-transparent hover:bg-emerald-400/10"
                  : "bg-custom-red hover:bg-custom-red/90 text-white",
              )}
              onClick={() => onViewDetails(player)}
            >
              View Details
            </Button>
          </div>

          {/* Bottom row — Stats (full width) */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs flex-wrap">
            <span className="text-muted-foreground">
              <span className="text-primary font-semibold">{player.win}</span>{" "}
              Win
            </span>
            <span className="text-muted-foreground">
              <span className="text-primary font-semibold">{player.loses}</span>{" "}
              Loses
            </span>
            {hasScore ? (
              <>
                <span className="text-muted-foreground">
                  <span className="text-primary font-semibold">
                    {player.rank}
                  </span>{" "}
                  Rank
                </span>
                <span
                  className={cn(
                    "font-bold",
                    isPositiveScore ? "text-emerald-400" : "text-red-400",
                  )}
                >
                  {isPositiveScore ? `+${player.score}` : player.score}
                  <span className="font-normal ml-1">Score</span>
                </span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">
                  <span className="text-primary font-semibold">
                    {player.played}
                  </span>{" "}
                  Played
                </span>
                <span className="text-muted-foreground">
                  <span className="text-primary font-semibold">
                    {player.rank}
                  </span>{" "}
                  Rank
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
