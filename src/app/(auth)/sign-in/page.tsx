/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { saveAuthTokens, getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useLoginAdminMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthSession } from "@/redux/features/auth/authSlice";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const response = await loginAdmin({
        email_address: email.trim(),
        password,
      }).unwrap();

      const access = response.data.tokens.access;
      const refresh = response.data.tokens.refresh;

      saveAuthTokens(access, refresh);
      dispatch(setAuthSession(response.data.user));

      toast.success(getSuccessMessage(response, "Login successful"));

      const from =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("from")
          : null;

      router.push(from || "/");
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"));
    }
  };

  return (
    <AuthBanner>
      <div className="flex flex-col items-center">
        <div className="h-12 mb-4">
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
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          Manage your arena, sessions, bookings, and ranked match results.
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="w-full space-y-5">
          {/* Business Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-primary">
                Password
              </label>
              <Link
                href="/forgot-pass"
                className="text-xs text-primary hover:text-custom-yellow transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
                autoComplete="current-password"
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

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </AuthBanner>
  );
};

export default SignInPage;
