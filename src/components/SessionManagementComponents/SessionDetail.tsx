/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SessionInfoSheet from "./SessionInfoSheet";
import MatchResultModal from "./MatchResultModal";
import PlayerDetailsSheet from "./PlayerDetailsSheet";

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

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 254,
    score: undefined,
    team: "A",
  },
  {
    id: 2,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 195,
    score: 20,
    team: "A",
  },
  {
    id: 3,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 254,
    score: undefined,
    team: "A",
  },
  {
    id: 4,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 254,
    score: undefined,
    team: "A",
  },
  {
    id: 5,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 195,
    score: 20,
    team: "B",
  },
  {
    id: 6,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 195,
    score: -20,
    team: "B",
  },
  {
    id: 7,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 195,
    score: 20,
    team: "B",
  },
  {
    id: 8,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 195,
    rank: 254,
    score: undefined,
    team: "B",
  },
];

const PlayerCard = ({
  player,
  onViewDetails,
  highlightScore,
}: {
  player: Player;
  onViewDetails: (p: Player) => void;
  highlightScore?: boolean;
}) => (
  <div
    className={cn(
      "bg-card rounded-xl p-3 border flex items-center gap-3",
      highlightScore ? "border-chart-4/40" : "border-white/5",
    )}
  >
    {/* Avatar */}
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-muted overflow-hidden shrink-0">
      <div
        className={cn(
          "w-full h-full flex items-center justify-center text-xs font-bold text-white",
          player.team === "A"
            ? "bg-linear-to-br from-custom-red to-chart-1"
            : "bg-linear-to-br from-chart-4 to-secondary",
        )}
      >
        {player.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="text-primary text-xs sm:text-sm font-semibold truncate">
        {player.name}
      </p>
      <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
        <span>
          <span className="text-primary font-medium">{player.win}</span> Win
        </span>
        <span>
          <span className="text-primary font-medium">{player.loses}</span> Loses
        </span>
        <span>
          <span className="text-primary font-medium">{player.played}</span>{" "}
          Played
        </span>
        <span>
          <span className="text-primary font-medium">{player.rank}</span> Rank
        </span>
        {player.score !== undefined && (
          <span
            className={cn(
              "font-bold",
              player.score > 0 ? "text-emerald-400" : "text-red-400",
            )}
          >
            {player.score > 0 ? `+${player.score}` : player.score} Score
          </span>
        )}
      </div>
    </div>

    {/* Button */}
    <Button
      size="sm"
      className="bg-custom-red hover:bg-custom-red/90 text-white text-xs shrink-0 h-7 px-2.5"
      onClick={() => onViewDetails(player)}
    >
      View Details
    </Button>
  </div>
);

const SessionDetail = () => {
  const router = useRouter();
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const [matchResultOpen, setMatchResultOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const teamAPlayers = mockPlayers.filter((p) => p.team === "A");
  const teamBPlayers = mockPlayers.filter((p) => p.team === "B");

  const handleSubmitResult = () => {
    setInfoSheetOpen(false);
    setMatchResultOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Back + Title + CTA */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-primary text-xl sm:text-2xl font-bold">
            Sessions Details
          </h1>
        </div>
        <Button
          className="bg-custom-red hover:bg-custom-red/90 text-white gap-2 text-xs sm:text-sm"
          onClick={() => setInfoSheetOpen(true)}
        >
          👁️ View Session Info
        </Button>
      </div>

      {/* Match Header Card */}
      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        {/* Match ID + Timer */}
        <div className="flex items-center justify-center gap-4 py-3 border-b border-white/5">
          <span className="text-muted-foreground text-sm">#CN 256</span>
          <div className="flex items-center gap-1.5 bg-custom-red/10 border border-custom-red/30 rounded-full px-3 py-1">
            <Clock className="w-3.5 h-3.5 text-custom-red" />
            <span className="text-white text-sm font-bold tabular-nums">
              50:25
            </span>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-3 items-center gap-2 p-4 sm:p-6">
          {/* Team A */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-xl">
              🐍
            </div>
            <p className="text-primary text-xs sm:text-sm font-semibold">
              Snake Green Squad
            </p>
          </div>

          {/* Center */}
          <div className="text-center space-y-1">
            <p className="text-primary text-4xl sm:text-5xl font-black">254</p>
            <p className="text-muted-foreground text-xs">Score</p>
            <div className="my-2">
              <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs px-2 py-0.5 rounded-full">
                8 / 8 Team Full
              </span>
            </div>
            <p className="text-muted-foreground text-xs">Score</p>
            <p className="text-primary text-4xl sm:text-5xl font-black">254</p>
          </div>

          {/* Team B */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto text-xl">
              🐂
            </div>
            <p className="text-primary text-xs sm:text-sm font-semibold">
              Red Bull Squad
            </p>
          </div>
        </div>
      </div>

      {/* Player Cards - Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Team A */}
        <div className="space-y-3">
          {teamAPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onViewDetails={(p) => setSelectedPlayer(p)}
              highlightScore={player.score !== undefined && player.score > 0}
            />
          ))}
        </div>

        {/* Team B */}
        <div className="space-y-3">
          {teamBPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onViewDetails={(p) => setSelectedPlayer(p)}
              highlightScore={player.score !== undefined && player.score > 0}
            />
          ))}
        </div>
      </div>

      {/* Sheets & Modal */}
      <SessionInfoSheet
        open={infoSheetOpen}
        onClose={() => setInfoSheetOpen(false)}
        onDisable={() => setInfoSheetOpen(false)}
        onSubmit={handleSubmitResult}
      />
      <MatchResultModal
        open={matchResultOpen}
        onClose={() => setMatchResultOpen(false)}
      />
      <PlayerDetailsSheet
        open={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        playerName={selectedPlayer?.name}
        teamName={
          selectedPlayer?.team === "A" ? "Green Snack Squad" : "Red Bull Squad"
        }
      />
    </div>
  );
};

export default SessionDetail;
