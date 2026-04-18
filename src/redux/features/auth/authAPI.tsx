/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  OtpRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyForgotPasswordOtpResponse,
} from "@/types/AuthTypes";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/auth/admin-login/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/forgot-password/",
        method: "POST",
        body,
      }),
    }),
    resendForgotPasswordOtp: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/resend-forgot-password-otp/",
        method: "POST",
        body,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation<
      VerifyForgotPasswordOtpResponse,
      OtpRequest
    >({
      query: (body) => ({
        url: "/api/auth/verify-forgot-password-otp/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/reset-password/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/api/auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useForgotPasswordMutation,
  useResendForgotPasswordOtpMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authAPI;

export default authAPI;
