/** @format */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-root-bg relative overflow-hidden px-4">
      {/* Red gradient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-custom-red/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Tacplay-logo-2.png"
            alt="TacPlay"
            width={80}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Forgot your password?
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a verification code to
            reset it.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <Link href="/verify-otp">
            <button className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2">
              Send Code
            </button>
          </Link>
        </div>

        {/* Back to sign in */}
        <p className="text-sm text-center text-muted-foreground">
          Back to{" "}
          <Link
            href="/sign-in"
            className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
