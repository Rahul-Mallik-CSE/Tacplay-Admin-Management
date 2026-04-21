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
  SessionInfoData,
  SessionScoreValue,
  SessionTeamScorePayload,
} from "@/types/SessionManagementTypes";

interface SessionInfoSheetProps {
  open: boolean;
  onClose: () => void;
  infoData?: SessionInfoData;
  onToggleMatchStatus: () => void;
  onSubmitResult: (payload: SessionTeamScorePayload) => void;
  isTogglingStatus?: boolean;
  isSubmittingResult?: boolean;
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
  infoData,
  onToggleMatchStatus,
  onSubmitResult,
  isTogglingStatus = false,
  isSubmittingResult = false,
}: SessionInfoSheetProps) => {
  const [teamAResult, setTeamAResult] = useState<SessionScoreValue>("win");
  const [teamBResult, setTeamBResult] = useState<SessionScoreValue>("loss");
  const isDisabled = infoData?.raw.status === "disabled";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-l border-white/10 w-full sm:max-w-md overflow-y-auto p-2 sm:p-5"
      >
        <SheetHeader className="">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-primary text-lg font-bold">
              {infoData?.header.title || "Session Information's"}
            </SheetTitle>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-md font-medium">
              {infoData?.header.status_display || "-"}
            </span>
          </div>
          <SheetDescription className="text-muted-foreground text-xs">
            {infoData?.header.subtitle ||
              "View full booking information and transaction."}
          </SheetDescription>
        </SheetHeader>

        {/* Field Info */}
        <div className="space-y-0 ">
          <h3 className="text-primary font-semibold text-sm ">Field Info</h3>
          <InfoRow
            label="Field ID"
            value={infoData?.field_info.field_id || "-"}
          />
          <InfoRow
            label="Field Name"
            value={infoData?.field_info.field_name || "-"}
          />
          <InfoRow
            label="Location"
            value={infoData?.field_info.location || "-"}
          />
          <InfoRow
            label="Contact Number"
            value={infoData?.field_info.contact_number || "-"}
          />
        </div>

        <Separator className="bg-white/10" />

        {/* Session Info */}
        <div className="space-y-0">
          <h3 className="text-primary font-semibold text-sm ">Session Info</h3>
          <InfoRow
            label="Session ID"
            value={infoData?.session_info.session_id || "-"}
          />
          <InfoRow
            label="Session Name"
            value={infoData?.session_info.session_name || "-"}
          />
          <InfoRow
            label="Match Type"
            value={
              <span className="flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                {infoData?.session_info.match_type || "-"}
              </span>
            }
          />
          <InfoRow
            label="Session Date"
            value={infoData?.session_info.session_date || "-"}
          />
          <InfoRow label="Time" value={infoData?.session_info.time || "-"} />
          <InfoRow
            label="Session Type"
            value={infoData?.session_info.session_type || "-"}
          />
          <InfoRow
            label="Team"
            value={String(infoData?.session_info.team ?? "-")}
          />
          <InfoRow
            label="Player Per Team"
            value={infoData?.session_info.player_per_team || "-"}
          />
          <InfoRow
            label="Packages"
            value={infoData?.session_info.packages || "-"}
          />
        </div>

        <Separator className="bg-white/10 " />

        {/* Team Info */}
        <div className="space-y-0">
          <h3 className="text-primary font-semibold text-sm ">Team Info</h3>
          <InfoRow
            label="Team A Name"
            value={infoData?.team_info.team_a_name || "-"}
          />
          <InfoRow
            label="Team A Score"
            value={
              <span className="text-emerald-400">
                {infoData?.team_info.team_a_score || "-"}
              </span>
            }
          />
          <InfoRow
            label="Team B Name"
            value={infoData?.team_info.team_b_name || "-"}
          />
          <InfoRow
            label="Team B Score"
            value={infoData?.team_info.team_b_score || "-"}
          />
          <InfoRow
            label="Champion"
            value={infoData?.team_info.champion || "-"}
          />
        </div>

        <Separator className="bg-white/10 " />

        <div className="space-y-2">
          <h3 className="text-primary font-semibold text-sm">Final Result</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-xs">
                Team A Result
              </label>
              <Select
                value={teamAResult}
                onValueChange={(value) =>
                  setTeamAResult(value as SessionScoreValue)
                }
              >
                <SelectTrigger className="w-full bg-input border-white/10 text-primary">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="win">Win</SelectItem>
                  <SelectItem value="loss">Loss</SelectItem>
                  <SelectItem value="draw">Draw</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-muted-foreground text-xs">
                Team B Result
              </label>
              <Select
                value={teamBResult}
                onValueChange={(value) =>
                  setTeamBResult(value as SessionScoreValue)
                }
              >
                <SelectTrigger className="w-full bg-input border-white/10 text-primary">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="win">Win</SelectItem>
                  <SelectItem value="loss">Loss</SelectItem>
                  <SelectItem value="draw">Draw</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 border-yellow-300 text-primary bg-custom-yellow hover:bg-custom-yellow/90 text-sm"
            onClick={onToggleMatchStatus}
            disabled={isTogglingStatus}
          >
            {isTogglingStatus
              ? "Updating..."
              : isDisabled
                ? "Enable Match"
                : "Disable Match"}
          </Button>
          <Button
            className="flex-1 bg-custom-red hover:bg-custom-red/90 text-white text-sm"
            onClick={() =>
              onSubmitResult({
                team_a_result: teamAResult,
                team_b_result: teamBResult,
              })
            }
            disabled={isSubmittingResult}
          >
            {isSubmittingResult ? "Submitting..." : "Submit Final Result"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SessionInfoSheet;
