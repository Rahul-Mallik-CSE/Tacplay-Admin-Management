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

const SettingsForm = () => {
  const [modalStep, setModalStep] = useState<SettingsStep>(null);
  const dispatch = useAppDispatch();

  const { data: myProfileResponse } = useGetMyProfileQuery();
  const { data: scoreResponse } = useGetPlayerScoreSettingQuery();

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

  const getInitials = (name: string) => {
    const chunks = name.split(" ").filter(Boolean).slice(0, 2);
    if (chunks.length === 0) return "U";
    return chunks.map((chunk) => chunk[0]?.toUpperCase() || "").join("");
  };

  const handleEditSave = async (payload: EditProfilePayload) => {
    if (!payload.fullName.trim()) {
      toast.error("Full name is required");
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

      toast.success(
        getSuccessMessage(response, "Profile updated successfully"),
      );
      setModalStep(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update profile"));
    }
  };

  const handlePasswordChange = async (payload: ChangePasswordPayload) => {
    if (!payload.newPassword || !payload.confirmPassword) {
      toast.error("Both password fields are required");
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

      toast.success(
        getSuccessMessage(response, "Password changed successfully"),
      );
      setModalStep(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to change password"));
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
          toast.info("No score changes to save");
          setModalStep(null);
          return;
        }

        const response = await updateScore(patchPayload).unwrap();
        toast.success(getSuccessMessage(response, "Player score updated"));
      } else {
        const response = await createScore({
          win_score: payload.winScore,
          loss_score: payload.lossScore,
          draw_score: payload.drawScore,
        }).unwrap();

        toast.success(getSuccessMessage(response, "Player score created"));
      }

      setModalStep(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save player score"));
    }
  };

  return (
    <div className="">
      <div className="max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-primary text-xl sm:text-2xl font-bold">
            Settings
          </h1>
          <Button
            size="sm"
            className="bg-custom-red hover:bg-custom-red/90 text-white gap-1.5 text-xs"
            onClick={() => setModalStep("edit")}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
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
              Change password
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Set Score */}
          <button
            onClick={() => setModalStep("setScore")}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <span className="text-primary text-sm font-medium">
              Set player Score
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
