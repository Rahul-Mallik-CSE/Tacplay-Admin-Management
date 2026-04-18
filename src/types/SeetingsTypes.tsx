/** @format */

export type SettingsApiEnvelope<T> = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: T;
  requestId?: string;
};

export type SettingsUserProfile = {
  id: number;
  full_name: string;
  email_address: string;
  gender: string | null;
  location: string | null;
  profile_image: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  account_type: string;
};

export type MeResponse = SettingsApiEnvelope<{
  user: SettingsUserProfile;
}>;

export type UpdateProfileRequest = {
  full_name: string;
  profile_image?: File | null;
};

export type UpdateProfileResponse = SettingsApiEnvelope<{
  user: SettingsUserProfile;
}>;

export type ChangePasswordRequest = {
  new_password: string;
  confirm_password: string;
};

export type ChangePasswordResponse = SettingsApiEnvelope<{
  user: {
    id: number;
    email: string;
    full_name: string;
    profile_image: string | null;
    account_type: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}>;

export type PlayerScoreSetting = {
  exists: boolean;
  id: number;
  win_score: number;
  loss_score: number;
  draw_score: number;
  created_at: string;
  updated_at: string;
};

export type PlayerScoreResponse = SettingsApiEnvelope<PlayerScoreSetting>;

export type CreatePlayerScoreRequest = {
  win_score: number;
  loss_score: number;
  draw_score: number;
};

export type UpdatePlayerScoreRequest = Partial<CreatePlayerScoreRequest>;
