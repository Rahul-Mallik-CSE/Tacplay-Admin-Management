/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SessionInfoSheet from "./SessionInfoSheet";
import MatchResultModal from "./MatchResultModal";
import PlayerDetailsSheet from "./PlayerDetailsSheet";
import PlayerCard from "./PlayerCard";

interface Player {
  id: number;
  name: string;
  win: number;
  loses: number;
  played: number;
  rank: number;
  score?: number;
  image: string;
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
    image: "/left-player.jpg",
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
    image: "/left-player.jpg",
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
    image: "/left-player.jpg",
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
    image: "/left-player.jpg",
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
    image: "/right-player.jpg",
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
    image: "/right-player.jpg",
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
    image: "/right-player.jpg",
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
    image: "/right-player.jpg",
    team: "B",
  },
];

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
    <div className=" space-y-6">
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
      <div className="rounded-xl relative overflow-hidden">
        <div className="bg-card rounded-xl relative overflow-hidden">
          {/* Match ID + Timer — skewed red box */}
          <div className="flex items-center justify-center ">
            <div
              className="bg-custom-red px-8 py-2"
              style={{
                transform: "skewX(-20deg)",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
                boxShadow: "0 4px 12px rgba(152, 0, 9, 0.5)",
              }}
            >
              <div
                className="flex items-center gap-3"
                style={{ transform: "skewX(20deg)" }}
              >
                <span className="text-white text-xs font-semibold">
                  #CN 256
                </span>
                <div className="w-px h-3 bg-white/30" />
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-bold tabular-nums">
                    50:25
                  </span>
                  <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-red-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="relative border-4 border-border/20 rounded-4xl shadow-4xl shadow-amber-700">
            {/* Scoreboard content */}
            <div className="grid grid-cols-5 items-center px-3 py-5 sm:px-6 sm:py-8">
              {/* Team A Logo + Name */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-6  h-6 md:w-16 md:h-16 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src="/green-team.png"
                    alt="Snake Green Squad"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="max-w-4 sm:max-w-6 md:max-w-none">
                  <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                    Snake Green Squad
                  </p>
                </div>
              </div>
              <div className="absolute right-[80%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>

              {/* Team A Score */}
              <div className="text-center">
                <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                  254
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  Score
                </p>
              </div>
              <div className="absolute right-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>

              {/* Center - Team Full */}
              <div className="text-center">
                <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                  8 / 8
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  Team Full
                </p>
              </div>
              <div className="absolute right-[40%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>

              {/* Team B Score */}
              <div className="text-center">
                <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                  254
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  Score
                </p>
              </div>
              <div className="absolute right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>
              {/* Team B Logo + Name */}
              <div className="flex flex-col items-center gap-2 text-center ">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src="/red-team.png"
                    alt="Red Bull Squad"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="max-w-4 sm:max-w-6 md:max-w-none">
                  <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                    Red Bull Squad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Cards - Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Team A */}
        <div className="space-y-5">
          {teamAPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onViewDetails={(p) => setSelectedPlayer(p)}
            />
          ))}
        </div>

        {/* Team B */}
        <div className="space-y-5">
          {teamBPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onViewDetails={(p) => setSelectedPlayer(p)}
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
