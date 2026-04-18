/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  CreatePlayerScoreRequest,
  MeResponse,
  PlayerScoreResponse,
  UpdatePlayerScoreRequest,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/types/SeetingsTypes";

const settingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<MeResponse, void>({
      query: () => ({
        url: "/api/auth/me/",
      }),
      providesTags: ["Settings", "Auth"],
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: ({ full_name, profile_image }) => {
        const formData = new FormData();
        formData.append("full_name", full_name);

        if (profile_image) {
          formData.append("profile_image", profile_image);
        }

        return {
          url: "/api/auth/update-profile/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Settings", "Auth"],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/change-password/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings", "Auth"],
    }),
    getPlayerScoreSetting: builder.query<PlayerScoreResponse, void>({
      query: () => ({
        url: "/api/admin/player-score-setting/",
      }),
      providesTags: ["Settings"],
    }),
    createPlayerScoreSetting: builder.mutation<
      PlayerScoreResponse,
      CreatePlayerScoreRequest
    >({
      query: (body) => ({
        url: "/api/admin/player-score-setting/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
    updatePlayerScoreSetting: builder.mutation<
      PlayerScoreResponse,
      UpdatePlayerScoreRequest
    >({
      query: (body) => ({
        url: "/api/admin/player-score-setting/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetPlayerScoreSettingQuery,
  useCreatePlayerScoreSettingMutation,
  useUpdatePlayerScoreSettingMutation,
} = settingsAPI;

export default settingsAPI;
