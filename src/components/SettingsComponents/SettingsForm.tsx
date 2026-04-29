/** @format */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, Pencil, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordPayload,
  EditProfilePayload,
  PlayerScorePayload,
  SettingsModals,
  SettingsStep,
} from "./SettingsModals";
import {
  useChangePasswordMutation,
  useCreatePlayerScoreSettingMutation,
  useGetMyProfileQuery,
  useGetPlayerScoreSettingQuery,
  useUpdatePlayerScoreSettingMutation,
  useUpdateProfileMutation,
} from "@/redux/features/settings/settingsAPI";
import { toAbsoluteMediaUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { getErrorMessage, getSuccessMessage, saveAuthTokens } from "@/lib/auth";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthSession } from "@/redux/features/auth/authSlice";
import { SettingsFormSkeleton } from "./SettingFormSkeleton";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Settings",
    edit: "Edit",
    fullName: "Full name",
    changePassword: "Change password",
    setPlayerScore: "Set player Score",
    profileUpdated: "Profile updated successfully",
    failedProfileUpdate: "Failed to update profile",
    passwordChanged: "Password changed successfully",
    failedPasswordChange: "Failed to change password",
    noScoreChanges: "No score changes to save",
    scoreUpdated: "Player score updated",
    scoreCreated: "Player score created",
    failedScoreSave: "Failed to save player score",
  },
  de: {
    title: "Einstellungen",
    edit: "Bearbeiten",
    fullName: "Vollständiger Name",
    changePassword: "Passwort ändern",
    setPlayerScore: "Spielerwertung festlegen",
    profileUpdated: "Profil erfolgreich aktualisiert",
    failedProfileUpdate: "Profil konnte nicht aktualisiert werden",
    passwordChanged: "Passwort erfolgreich geändert",
    failedPasswordChange: "Passwort konnte nicht geändert werden",
    noScoreChanges: "Keine Änderungen zum Speichern",
    scoreUpdated: "Spielerwertung aktualisiert",
    scoreCreated: "Spielerwertung erstellt",
    failedScoreSave: "Spielerwertung konnte nicht gespeichert werden",
  },
  fr: {
    title: "Paramètres",
    edit: "Modifier",
    fullName: "Nom complet",
    changePassword: "Changer le mot de passe",
    setPlayerScore: "Définir le score du joueur",
    profileUpdated: "Profil mis à jour avec succès",
    failedProfileUpdate: "Échec de la mise à jour du profil",
    passwordChanged: "Mot de passe modifié avec succès",
    failedPasswordChange: "Échec du changement de mot de passe",
    noScoreChanges: "Aucune modification à enregistrer",
    scoreUpdated: "Score du joueur mis à jour",
    scoreCreated: "Score du joueur créé",
    failedScoreSave: "Échec de l'enregistrement du score du joueur",
  },
  es: {
    title: "Ajustes",
    edit: "Editar",
    fullName: "Nombre completo",
    changePassword: "Cambiar contraseña",
    setPlayerScore: "Establecer puntuación del jugador",
    profileUpdated: "Perfil actualizado correctamente",
    failedProfileUpdate: "No se pudo actualizar el perfil",
    passwordChanged: "Contraseña cambiada correctamente",
    failedPasswordChange: "No se pudo cambiar la contraseña",
    noScoreChanges: "No hay cambios de puntuación para guardar",
    scoreUpdated: "Puntuación del jugador actualizada",
    scoreCreated: "Puntuación del jugador creada",
    failedScoreSave: "No se pudo guardar la puntuación del jugador",
  },
} as const;

const SettingsForm = () => {
  const [modalStep, setModalStep] = useState<SettingsStep>(null);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  const {
    data: myProfileResponse,
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
  } = useGetMyProfileQuery();
  const {
    data: scoreResponse,
    isLoading: isScoreLoading,
    isFetching: isScoreFetching,
  } = useGetPlayerScoreSettingQuery();

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [createScore, { isLoading: isCreatingScore }] =
    useCreatePlayerScoreSettingMutation();
  const [updateScore, { isLoading: isUpdatingScore }] =
    useUpdatePlayerScoreSettingMutation();

  const profileUser = myProfileResponse?.data.user;
  const profileName = profileUser?.full_name?.trim() || "User";
  const profileEmail = profileUser?.email_address?.trim() || "No email";
  const profileImage = toAbsoluteMediaUrl(profileUser?.profile_image);

  const isInitialLoading =
    (!myProfileResponse && (isProfileLoading || isProfileFetching)) ||
    (!scoreResponse && (isScoreLoading || isScoreFetching));

  const getInitials = (name: string) => {
    const chunks = name.split(" ").filter(Boolean).slice(0, 2);
    if (chunks.length === 0) return "U";
    return chunks.map((chunk) => chunk[0]?.toUpperCase() || "").join("");
  };

  const handleEditSave = async (payload: EditProfilePayload) => {
    if (!payload.fullName.trim()) {
      toast.error(text.fullName);
      return;
    }

    try {
      const response = await updateProfile({
        full_name: payload.fullName.trim(),
        profile_image: payload.profileImageFile,
      }).unwrap();

      const updatedUser = response.data.user;

      dispatch(
        setAuthSession({
          id: updatedUser.id,
          email: updatedUser.email_address,
          full_name: updatedUser.full_name,
          profile_image: updatedUser.profile_image,
          account_type: updatedUser.account_type,
        }),
      );

      toast.success(getSuccessMessage(response, text.profileUpdated));
      setModalStep(null);
    } catch (error) {
      toast.error(getErrorMessage(error, text.failedProfileUpdate));
    }
  };

  const handlePasswordChange = async (payload: ChangePasswordPayload) => {
    if (!payload.newPassword || !payload.confirmPassword) {
      toast.error(text.changePassword);
      return;
    }

    try {
      const response = await changePassword({
        new_password: payload.newPassword,
        confirm_password: payload.confirmPassword,
      }).unwrap();

      saveAuthTokens(response.data.tokens.access, response.data.tokens.refresh);
      dispatch(
        setAuthSession({
          id: response.data.user.id,
          email: response.data.user.email,
          full_name: response.data.user.full_name,
          profile_image: response.data.user.profile_image,
          account_type: response.data.user.account_type,
        }),
      );

      toast.success(getSuccessMessage(response, text.passwordChanged));
      setModalStep(null);
    } catch (error) {
      toast.error(getErrorMessage(error, text.failedPasswordChange));
    }
  };

  const handleSetScoreSave = async (payload: PlayerScorePayload) => {
    const scoreData = scoreResponse?.data;

    try {
      if (scoreData?.exists) {
        const patchPayload: {
          win_score?: number;
          loss_score?: number;
          draw_score?: number;
        } = {};

        if (payload.winScore !== scoreData.win_score) {
          patchPayload.win_score = payload.winScore;
        }
        if (payload.lossScore !== scoreData.loss_score) {
          patchPayload.loss_score = payload.lossScore;
        }
        if (payload.drawScore !== scoreData.draw_score) {
          patchPayload.draw_score = payload.drawScore;
        }

        if (Object.keys(patchPayload).length === 0) {
          toast.info(text.noScoreChanges);
          setModalStep(null);
          return;
        }

        const response = await updateScore(patchPayload).unwrap();
        toast.success(getSuccessMessage(response, text.scoreUpdated));
      } else {
        const response = await createScore({
          win_score: payload.winScore,
          loss_score: payload.lossScore,
          draw_score: payload.drawScore,
        }).unwrap();

        toast.success(getSuccessMessage(response, text.scoreCreated));
      }

      setModalStep(null);
    } catch (error) {
      toast.error(getErrorMessage(error, text.failedScoreSave));
    }
  };

  if (isInitialLoading) {
    return <SettingsFormSkeleton />;
  }

  return (
    <div className="">
      <div className="max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-primary text-xl sm:text-2xl font-bold">
            {text.title}
          </h1>
          <Button
            size="sm"
            className="bg-custom-red hover:bg-custom-red/90 text-white gap-1.5 text-xs"
            onClick={() => setModalStep("edit")}
          >
            <Pencil className="w-3.5 h-3.5" />
            {text.edit}
          </Button>
        </div>

        {/* Profile Section */}
        <div className="bg-card rounded-xl border border-white/5 p-5 sm:p-6 space-y-5">
          {/* Avatar + Fields */}
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-chart-1 to-secondary flex items-center justify-center text-white text-xl font-bold overflow-hidden relative">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={profileName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : profileEmail === "No email" ? (
                  <User className="w-8 h-8 text-white" />
                ) : (
                  getInitials(profileName)
                )}
              </div>
              <p className="text-muted-foreground text-xs">{profileName}</p>
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-3">
              <div>
                <Input
                  value={profileName}
                  readOnly
                  className="bg-input border-white/10 text-primary cursor-default"
                />
              </div>
              <div>
                <Input
                  value={profileEmail}
                  readOnly
                  type="email"
                  className="bg-input border-white/10 text-primary cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Change Password Row */}
          <button
            onClick={() => setModalStep("password")}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <span className="text-primary text-sm font-medium">
              {text.changePassword}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Set Score */}
          <button
            onClick={() => setModalStep("setScore")}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <span className="text-primary text-sm font-medium">
              {text.setPlayerScore}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <SettingsModals
        step={modalStep}
        onClose={() => setModalStep(null)}
        onEditSave={handleEditSave}
        onPasswordChange={handlePasswordChange}
        onSetScoreSave={handleSetScoreSave}
        profileName={profileName}
        profileImage={profileUser?.profile_image}
        scoreDefaults={{
          winScore: scoreResponse?.data.win_score ?? 0,
          lossScore: scoreResponse?.data.loss_score ?? 0,
          drawScore: scoreResponse?.data.draw_score ?? 0,
        }}
        isUpdatingProfile={isUpdatingProfile}
        isChangingPassword={isChangingPassword}
        isSavingScore={isCreatingScore || isUpdatingScore}
      />
    </div>
  );
};

export default SettingsForm;
