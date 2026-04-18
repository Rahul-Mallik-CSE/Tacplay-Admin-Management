/** @format */
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { toAbsoluteMediaUrl } from "@/lib/utils";

type SettingsStep = "edit" | "password" | "setScore" | null;

type EditProfilePayload = {
  fullName: string;
  profileImageFile: File | null;
};

type ChangePasswordPayload = {
  newPassword: string;
  confirmPassword: string;
};

type PlayerScorePayload = {
  winScore: number;
  lossScore: number;
  drawScore: number;
};

interface SettingsModalsProps {
  step: SettingsStep;
  onClose: () => void;
  onEditSave: (payload: EditProfilePayload) => Promise<void>;
  onPasswordChange: (payload: ChangePasswordPayload) => Promise<void>;
  onSetScoreSave: (payload: PlayerScorePayload) => Promise<void>;
  profileName?: string;
  profileImage?: string | null;
  scoreDefaults?: {
    winScore: number;
    lossScore: number;
    drawScore: number;
  };
  isUpdatingProfile?: boolean;
  isChangingPassword?: boolean;
  isSavingScore?: boolean;
}

const getInitials = (name: string) => {
  const chunks = name.trim().split(" ").filter(Boolean).slice(0, 2);

  if (chunks.length === 0) {
    return "U";
  }

  return chunks.map((chunk) => chunk[0]?.toUpperCase() || "").join("");
};

const EditModal = ({
  open,
  onClose,
  onSave,
  initialName,
  initialProfileImage,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (payload: EditProfilePayload) => Promise<void>;
  initialName: string;
  initialProfileImage?: string | null;
  isSaving: boolean;
}) => {
  const [name, setName] = useState(initialName);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  const initialImageUrl = useMemo(
    () => toAbsoluteMediaUrl(initialProfileImage),
    [initialProfileImage],
  );

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);

    if (!file) {
      setPreviewDataUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewDataUrl(
        typeof reader.result === "string" ? reader.result : null,
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    await onSave({
      fullName: name,
      profileImageFile: selectedFile,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-bold text-center">
            Edit Account Info
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs text-center">
            Make changes to your profile info. Click save when done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center my-4">
          <div className="relative">
            <label
              htmlFor="settings-profile-image"
              className="w-16 h-16 rounded-full bg-linear-to-br from-chart-1 to-secondary flex items-center justify-center text-white text-xl font-bold overflow-hidden cursor-pointer relative"
            >
              {previewDataUrl || initialImageUrl ? (
                <Image
                  src={previewDataUrl || initialImageUrl || ""}
                  alt="Profile"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                getInitials(name || "User")
              )}
            </label>
            <input
              id="settings-profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="settings-profile-image"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-custom-red flex items-center justify-center cursor-pointer"
            >
              <Camera className="w-3 h-3 text-white" />
            </label>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Full name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border-white/10 text-primary"
              placeholder="Full name"
            />
          </div>
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const NewPasswordModal = ({
  open,
  onClose,
  onSave,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (payload: ChangePasswordPayload) => Promise<void>;
  isSaving: boolean;
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Confirm Password does not match New Password");
      return;
    }

    setError("");
    await onSave({ newPassword, confirmPassword });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full rounded-2xl p-6">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-custom-red/20 border-4 border-custom-red/40 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-custom-red" />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-bold text-center">
            Set a new password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
            className="bg-input border-white/10 text-primary"
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            className={`bg-input text-primary ${
              error ? "border-custom-red" : "border-white/10"
            }`}
          />
          {error && <p className="text-custom-red text-xs">{error}</p>}
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? "Changing..." : "Change Password"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const SetScoreModal = ({
  open,
  onClose,
  onSave,
  defaults,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (payload: PlayerScorePayload) => Promise<void>;
  defaults: {
    winScore: number;
    lossScore: number;
    drawScore: number;
  };
  isSaving: boolean;
}) => {
  const [winScore, setWinScore] = useState(String(defaults.winScore));
  const [lossScore, setLossScore] = useState(String(defaults.lossScore));
  const [drawScore, setDrawScore] = useState(String(defaults.drawScore));

  const handleSubmit = async () => {
    await onSave({
      winScore: Number.parseInt(winScore || "0", 10),
      lossScore: Number.parseInt(lossScore || "0", 10),
      drawScore: Number.parseInt(drawScore || "0", 10),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-bold text-center">
            Set Player Score
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs text-center">
            Set the scores for win, loss, and draw outcomes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Win Score</label>
            <Input
              type="number"
              placeholder="e.g., 5"
              value={winScore}
              onChange={(e) => setWinScore(e.target.value)}
              className="bg-input border-white/10 text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Loss Score</label>
            <Input
              type="number"
              placeholder="e.g., -2"
              value={lossScore}
              onChange={(e) => setLossScore(e.target.value)}
              className="bg-input border-white/10 text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Draw Score</label>
            <Input
              type="number"
              placeholder="e.g., 1"
              value={drawScore}
              onChange={(e) => setDrawScore(e.target.value)}
              className="bg-input border-white/10 text-primary"
            />
          </div>
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Scores"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const SettingsModals = ({
  step,
  onClose,
  onEditSave,
  onPasswordChange,
  onSetScoreSave,
  profileName = "User",
  profileImage,
  scoreDefaults = { winScore: 0, lossScore: 0, drawScore: 0 },
  isUpdatingProfile = false,
  isChangingPassword = false,
  isSavingScore = false,
}: SettingsModalsProps) => {
  return (
    <>
      {step === "edit" ? (
        <EditModal
          key={`edit-${profileName}-${profileImage || "none"}`}
          open
          onClose={onClose}
          onSave={onEditSave}
          initialName={profileName}
          initialProfileImage={profileImage}
          isSaving={isUpdatingProfile}
        />
      ) : null}

      {step === "password" ? (
        <NewPasswordModal
          key="password"
          open
          onClose={onClose}
          onSave={onPasswordChange}
          isSaving={isChangingPassword}
        />
      ) : null}

      {step === "setScore" ? (
        <SetScoreModal
          key={`score-${scoreDefaults.winScore}-${scoreDefaults.lossScore}-${scoreDefaults.drawScore}`}
          open
          onClose={onClose}
          onSave={onSetScoreSave}
          defaults={scoreDefaults}
          isSaving={isSavingScore}
        />
      ) : null}
    </>
  );
};

export { SettingsModals };
export type {
  SettingsStep,
  EditProfilePayload,
  ChangePasswordPayload,
  PlayerScorePayload,
};
