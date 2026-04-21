/** @format */
"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SessionInfoSheet from "./SessionInfoSheet";
import MatchResultModal from "./MatchResultModal";
import PlayerDetailsSheet from "./PlayerDetailsSheet";
import PlayerCard from "./PlayerCard";
import {
  useDisableMatchMutation,
  useEnableMatchMutation,
  useGetSessionManagementDetailQuery,
  useGetSessionManagementInfoQuery,
  useSubmitSessionScoreMutation,
} from "@/redux/features/sessionManagement/sessionManagementAPI";
import { toAbsoluteMediaUrl } from "@/lib/utils";
import type {
  SessionScoreResultData,
  SessionScoreValue,
  SessionTeamPlayer,
  SessionTeamScorePayload,
} from "@/types/SessionManagementTypes";

const parseSessionId = (value: string | undefined) => {
  if (!value) return null;
  const matched = value.match(/\d+/);
  if (!matched) return null;
  return Number(matched[0]);
};

const SessionDetail = () => {
  const router = useRouter();
  const params = useParams<{ "s-id": string }>();
  const sessionId = parseSessionId(params?.["s-id"]);

  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const [matchResultOpen, setMatchResultOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] =
    useState<SessionTeamPlayer | null>(null);
  const [latestScoreResult, setLatestScoreResult] =
    useState<SessionScoreResultData | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    data: detailResponse,
    isLoading: isLoadingDetail,
    isError: isDetailError,
    refetch: refetchDetail,
  } = useGetSessionManagementDetailQuery(
    { id: sessionId || "" },
    { skip: !sessionId },
  );

  const {
    data: infoResponse,
    isLoading: isLoadingInfo,
    refetch: refetchInfo,
  } = useGetSessionManagementInfoQuery(
    { id: sessionId || "" },
    { skip: !sessionId || !infoSheetOpen },
  );

  const [submitSessionScore, { isLoading: isSubmittingScore }] =
    useSubmitSessionScoreMutation();
  const [enableMatch, { isLoading: isEnablingMatch }] =
    useEnableMatchMutation();
  const [disableMatch, { isLoading: isDisablingMatch }] =
    useDisableMatchMutation();

  const detailData = detailResponse?.data;
  const infoData = infoResponse?.data;

  const leftTeamLogo = toAbsoluteMediaUrl(
    detailData?.scoreboard.left_team.logo,
  );
  const rightTeamLogo = toAbsoluteMediaUrl(
    detailData?.scoreboard.right_team.logo,
  );

  const teamAPlayers = useMemo(
    () => detailData?.team_a_players ?? [],
    [detailData],
  );
  const teamBPlayers = useMemo(
    () => detailData?.team_b_players ?? [],
    [detailData],
  );

  const handleTeamResultSubmit = async (payload: SessionTeamScorePayload) => {
    if (!sessionId) {
      return;
    }

    try {
      const response = await submitSessionScore({
        id: sessionId,
        payload,
      }).unwrap();

      setLatestScoreResult(response.data);
      setFeedback({ type: "success", message: response.message });
      setInfoSheetOpen(false);
      setMatchResultOpen(true);
      refetchDetail();
      refetchInfo();
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to submit final match result.",
      });
    }
  };

  const handlePlayerResultSubmit = async (
    bookingId: number,
    result: SessionScoreValue,
  ) => {
    if (!sessionId) {
      return;
    }

    try {
      const response = await submitSessionScore({
        id: sessionId,
        payload: {
          players: [
            {
              booking_id: bookingId,
              result,
            },
          ],
        },
      }).unwrap();

      setLatestScoreResult(response.data);
      setFeedback({ type: "success", message: response.message });
      setSelectedPlayer(null);
      refetchDetail();
      refetchInfo();
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to submit player result.",
      });
    }
  };

  const handleToggleMatchStatus = async () => {
    if (!sessionId || !infoData) {
      return;
    }

    try {
      if (infoData.raw.status === "disabled") {
        const response = await enableMatch({ id: sessionId }).unwrap();
        setFeedback({ type: "success", message: response.message });
      } else {
        const response = await disableMatch({ id: sessionId }).unwrap();
        setFeedback({ type: "success", message: response.message });
      }

      refetchDetail();
      refetchInfo();
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to update match status.",
      });
    }
  };

  if (!sessionId) {
    return (
      <div className="rounded-xl border border-white/5 bg-card p-6 text-sm text-muted-foreground">
        Invalid or missing session id.
      </div>
    );
  }

  if (isLoadingDetail && !detailData) {
    return (
      <div className="rounded-xl border border-white/5 bg-card p-6 text-sm text-muted-foreground">
        Loading session details...
      </div>
    );
  }

  if (isDetailError || !detailData) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
        Failed to load session details.
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
          View Session Info
        </Button>
      </div>

      {feedback ? (
        <div
          className={`rounded-lg border p-3 text-sm ${
            feedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      <div className="rounded-xl relative overflow-hidden">
        <div className="bg-card rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-center">
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
                  {detailData.session_summary.session_id}
                </span>
                <div className="w-px h-3 bg-white/30" />
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-bold tabular-nums">
                    {detailData.session_summary.match_clock_text}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-4 border-border/20 rounded-4xl shadow-4xl shadow-amber-700">
            <div className="grid grid-cols-5 items-center px-3 py-5 sm:px-6 sm:py-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-6 h-6 md:w-16 md:h-16 rounded-full overflow-hidden relative shrink-0 bg-muted">
                  {leftTeamLogo ? (
                    <Image
                      src={leftTeamLogo}
                      alt={detailData.scoreboard.left_team.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : null}
                </div>
                <div className="max-w-4 sm:max-w-6 md:max-w-none">
                  <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                    {detailData.scoreboard.left_team.name}
                  </p>
                </div>
              </div>
              <div className="absolute right-[80%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20"></div>

              <div className="text-center">
                <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                  {detailData.scoreboard.left_team.score}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  Score
                </p>
              </div>
              <div className="absolute right-[60%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20"></div>

              <div className="text-center">
                <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                  {detailData.scoreboard.middle.team_full_text}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  Team Full
                </p>
              </div>
              <div className="absolute right-[40%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20"></div>

              <div className="text-center">
                <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                  {detailData.scoreboard.right_team.score}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  Score
                </p>
              </div>
              <div className="absolute right-[20%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20"></div>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shrink-0 bg-muted">
                  {rightTeamLogo ? (
                    <Image
                      src={rightTeamLogo}
                      alt={detailData.scoreboard.right_team.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : null}
                </div>
                <div className="max-w-4 sm:max-w-6 md:max-w-none">
                  <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                    {detailData.scoreboard.right_team.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-5">
          {teamAPlayers.map((player) => (
            <PlayerCard
              key={player.booking_id}
              player={player}
              onViewDetails={(selected) => setSelectedPlayer(selected)}
            />
          ))}
        </div>

        <div className="space-y-5">
          {teamBPlayers.map((player) => (
            <PlayerCard
              key={player.booking_id}
              player={player}
              onViewDetails={(selected) => setSelectedPlayer(selected)}
            />
          ))}
        </div>
      </div>

      <SessionInfoSheet
        open={infoSheetOpen}
        onClose={() => setInfoSheetOpen(false)}
        infoData={infoData}
        onToggleMatchStatus={handleToggleMatchStatus}
        onSubmitResult={handleTeamResultSubmit}
        isTogglingStatus={isEnablingMatch || isDisablingMatch}
        isSubmittingResult={isSubmittingScore}
      />

      <MatchResultModal
        open={matchResultOpen}
        onClose={() => setMatchResultOpen(false)}
        result={latestScoreResult}
      />

      <PlayerDetailsSheet
        open={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        player={selectedPlayer}
        teamName={
          selectedPlayer?.team === "A"
            ? detailData.session.team_a_name
            : detailData.session.team_b_name
        }
        isSubmitting={isSubmittingScore}
        onSubmitPlayerResult={handlePlayerResultSubmit}
      />

      {isLoadingInfo && infoSheetOpen ? (
        <p className="text-xs text-muted-foreground">Loading session info...</p>
      ) : null}
    </div>
  );
};

export default SessionDetail;
