/** @format */

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type AuthUser = {
  id?: number;
  email: string;
  full_name: string;
  profile_image?: string | null;
  account_type?: string;
  role?: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: T;
  requestId?: string;
};

export type LoginRequest = {
  email_address: string;
  password: string;
};

export type LoginResponse = ApiEnvelope<{
  user: AuthUser;
  tokens: AuthTokens;
}>;

export type ForgotPasswordRequest = {
  email_address: string;
};

export type ForgotPasswordResponse = ApiEnvelope<{
  email_address: string;
  account_type: string;
}>;

export type OtpRequest = {
  email_address: string;
  otp_code: string;
};

export type VerifyForgotPasswordOtpResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type ResetPasswordRequest = {
  new_password: string;
  confirm_password: string;
};

export type ResetPasswordResponse = ApiEnvelope<{
  user: AuthUser;
  tokens: AuthTokens;
}>;

export type LogoutResponse = {
  success: boolean;
  message: string;
};
