/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthSession } from "@/redux/features/auth/authSlice";
import { getErrorMessage, getSuccessMessage, saveAuthTokens } from "@/lib/auth";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Both password fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({
        new_password: password,
        confirm_password: confirmPassword,
      }).unwrap();

      saveAuthTokens(response.data.tokens.access, response.data.tokens.refresh);
      dispatch(setAuthSession(response.data.user));

      toast.success(getSuccessMessage(response, "Password reset successful"));
      router.push("/");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to reset password"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-root-bg relative overflow-hidden px-4">
      {/* Red gradient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-custom-red/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-6">
        <div className="h-6 flex items-center justify-center">
          {/* Logo */}
          <Image
            src="/Tacplay-logo-2.png"
            alt="TacPlay"
            width={200}
            height={200}
            className="object-contain h-12 "
            priority
          />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Set a new password
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Make your secure password to keep your dashboard safe and
            accessible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showConfirmPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Change Password Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>

        {/* Confirm & back */}
        <p className="text-sm text-center text-muted-foreground">
          Confirmed Password &amp; Go to the{" "}
          <Link
            href="/sign-in"
            className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
          >
            Sign In Page?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
