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
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    editAccountInfo: "Edit Account Info",
    editAccountDescription:
      "Make changes to your profile info. Click save when done.",
    saveChanges: "Save Changes",
    saving: "Saving...",
    fullName: "Full name",
    setNewPassword: "Set a new password",
    confirmPasswordMismatch: "Confirm Password does not match New Password",
    changePassword: "Change Password",
    changing: "Changing...",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    setPlayerScore: "Set Player Score",
    setPlayerScoreDescription:
      "Set the scores for win, loss, and draw outcomes.",
    winScore: "Win Score",
    lossScore: "Loss Score",
    drawScore: "Draw Score",
    saveScores: "Save Scores",
    saveScoresLoading: "Saving...",
  },
  de: {
    editAccountInfo: "Kontoinfo bearbeiten",
    editAccountDescription:
      "Ändere deine Profildaten und speichere anschließend.",
    saveChanges: "Änderungen speichern",
    saving: "Wird gespeichert...",
    fullName: "Vollständiger Name",
    setNewPassword: "Neues Passwort festlegen",
    confirmPasswordMismatch:
      "Bestätigung stimmt nicht mit dem neuen Passwort überein",
    changePassword: "Passwort ändern",
    changing: "Wird geändert...",
    newPassword: "Neues Passwort",
    confirmPassword: "Passwort bestätigen",
    setPlayerScore: "Spielerwertung festlegen",
    setPlayerScoreDescription:
      "Lege die Punkte für Sieg, Niederlage und Unentschieden fest.",
    winScore: "Sieg-Punkte",
    lossScore: "Niederlagen-Punkte",
    drawScore: "Unentschieden-Punkte",
    saveScores: "Punkte speichern",
    saveScoresLoading: "Wird gespeichert...",
  },
  fr: {
    editAccountInfo: "Modifier les informations du compte",
    editAccountDescription:
      "Modifiez les informations de votre profil puis enregistrez.",
    saveChanges: "Enregistrer les modifications",
    saving: "Enregistrement...",
    fullName: "Nom complet",
    setNewPassword: "Définir un nouveau mot de passe",
    confirmPasswordMismatch:
      "La confirmation ne correspond pas au nouveau mot de passe",
    changePassword: "Changer le mot de passe",
    changing: "Modification...",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    setPlayerScore: "Définir le score du joueur",
    setPlayerScoreDescription:
      "Définissez les scores pour victoire, défaite et nul.",
    winScore: "Score de victoire",
    lossScore: "Score de défaite",
    drawScore: "Score de nul",
    saveScores: "Enregistrer les scores",
    saveScoresLoading: "Enregistrement...",
  },
  es: {
    editAccountInfo: "Editar información de la cuenta",
    editAccountDescription:
      "Realiza cambios en tu perfil y guarda cuando termines.",
    saveChanges: "Guardar cambios",
    saving: "Guardando...",
    fullName: "Nombre completo",
    setNewPassword: "Establecer una nueva contraseña",
    confirmPasswordMismatch:
      "La confirmación no coincide con la nueva contraseña",
    changePassword: "Cambiar contraseña",
    changing: "Cambiando...",
    newPassword: "Nueva contraseña",
    confirmPassword: "Confirmar contraseña",
    setPlayerScore: "Establecer puntuación del jugador",
    setPlayerScoreDescription:
      "Define las puntuaciones para victoria, derrota y empate.",
    winScore: "Puntuación de victoria",
    lossScore: "Puntuación de derrota",
    drawScore: "Puntuación de empate",
    saveScores: "Guardar puntuaciones",
    saveScoresLoading: "Guardando...",
  },
} as const;

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
  const { i18n } = useTranslation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;
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
            {text.editAccountInfo}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs text-center">
            {text.editAccountDescription}
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
            <label className="text-muted-foreground text-xs">
              {text.fullName}
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border-white/10 text-primary"
              placeholder={text.fullName}
            />
          </div>
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? text.saving : text.saveChanges}
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
  const { i18n } = useTranslation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError(text.confirmPasswordMismatch);
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
            {text.setNewPassword}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <Input
            type="password"
            placeholder={text.newPassword}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
            className="bg-input border-white/10 text-primary"
          />
          <Input
            type="password"
            placeholder={text.confirmPassword}
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
          {isSaving ? text.changing : text.changePassword}
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
  const { i18n } = useTranslation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;
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
            {text.setPlayerScore}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs text-center">
            {text.setPlayerScoreDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">
              {text.winScore}
            </label>
            <Input
              type="number"
              placeholder="e.g., 5"
              value={winScore}
              onChange={(e) => setWinScore(e.target.value)}
              className="bg-input border-white/10 text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">
              {text.lossScore}
            </label>
            <Input
              type="number"
              placeholder="e.g., -2"
              value={lossScore}
              onChange={(e) => setLossScore(e.target.value)}
              className="bg-input border-white/10 text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">
              {text.drawScore}
            </label>
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
          {isSaving ? text.saveScoresLoading : text.saveScores}
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
