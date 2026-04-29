/** @format */

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useResendForgotPasswordOtpMutation,
  useVerifyForgotPasswordOtpMutation,
} from "@/redux/features/auth/authAPI";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearPendingVerification,
  setAuthSession,
} from "@/redux/features/auth/authSlice";
import { getErrorMessage, getSuccessMessage, saveAuthTokens } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Verify your Code",
    description: (email: string) => `We sent a verification code to ${email}`,
    verifyCode: "Verify Code",
    verifying: "Verifying...",
    resend: "Resend",
    resending: "Resending...",
    submitEmailFirst: "Please submit your email first",
    otpRequired: "Please enter the 6-digit OTP",
    verified: "OTP verified",
    failed: "OTP verification failed",
    resent: "OTP resent successfully",
    resendFailed: "Failed to resend OTP",
    didntReceive: "Didn't receive the code?",
  },
  de: {
    title: "Code bestätigen",
    description: (email: string) => `Wir haben einen Code an ${email} gesendet`,
    verifyCode: "Code bestätigen",
    verifying: "Wird geprüft...",
    resend: "Erneut senden",
    resending: "Wird erneut gesendet...",
    submitEmailFirst: "Bitte zuerst deine E-Mail absenden",
    otpRequired: "Bitte den 6-stelligen OTP eingeben",
    verified: "OTP bestätigt",
    failed: "OTP-Bestätigung fehlgeschlagen",
    resent: "OTP erneut gesendet",
    resendFailed: "OTP konnte nicht erneut gesendet werden",
    didntReceive: "Code nicht erhalten?",
  },
  fr: {
    title: "Vérifiez votre code",
    description: (email: string) =>
      `Nous avons envoyé un code de vérification à ${email}`,
    verifyCode: "Vérifier le code",
    verifying: "Vérification...",
    resend: "Renvoyer",
    resending: "Renvoi...",
    submitEmailFirst: "Veuillez d'abord envoyer votre e-mail",
    otpRequired: "Veuillez saisir l'OTP à 6 chiffres",
    verified: "OTP vérifié",
    failed: "Échec de la vérification de l'OTP",
    resent: "OTP renvoyé avec succès",
    resendFailed: "Échec du renvoi de l'OTP",
    didntReceive: "Vous n'avez pas reçu le code ?",
  },
  es: {
    title: "Verifica tu código",
    description: (email: string) =>
      `Hemos enviado un código de verificación a ${email}`,
    verifyCode: "Verificar código",
    verifying: "Verificando...",
    resend: "Reenviar",
    resending: "Reenviando...",
    submitEmailFirst: "Primero envía tu correo electrónico",
    otpRequired: "Introduce el OTP de 6 dígitos",
    verified: "OTP verificado",
    failed: "No se pudo verificar el OTP",
    resent: "OTP reenviado correctamente",
    resendFailed: "No se pudo reenviar el OTP",
    didntReceive: "¿No recibiste el código?",
  },
} as const;

const VerifyOtpPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pendingEmail = useAppSelector((state) => state.auth.pendingEmail);
  const { i18n } = useTranslation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyForgotPasswordOtp, { isLoading: isVerifying }] =
    useVerifyForgotPasswordOtpMutation();
  const [resendForgotPasswordOtp, { isLoading: isResending }] =
    useResendForgotPasswordOtpMutation();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    if (!pendingEmail) {
      toast.error(text.submitEmailFirst);
      router.push("/forgot-pass");
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error(text.otpRequired);
      return;
    }

    try {
      const response = await verifyForgotPasswordOtp({
        email_address: pendingEmail,
        otp_code: otpCode,
      }).unwrap();

      saveAuthTokens(response.accessToken, response.refreshToken);
      dispatch(setAuthSession(response.user));
      dispatch(clearPendingVerification());

      toast.success(getSuccessMessage(response, text.verified));
      router.push("/reset-pass");
    } catch (error) {
      toast.error(getErrorMessage(error, text.failed));
    }
  };

  const handleResendOtp = async () => {
    if (!pendingEmail) {
      toast.error(text.submitEmailFirst);
      router.push("/forgot-pass");
      return;
    }

    try {
      const response = await resendForgotPasswordOtp({
        email_address: pendingEmail,
      }).unwrap();

      toast.success(getSuccessMessage(response, text.resent));
    } catch (error) {
      toast.error(getErrorMessage(error, text.resendFailed));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-root-bg relative overflow-hidden px-4">
      {/* Red gradient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-custom-red/20 rounded-full blur-[120px] pointer-events-none" />

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
            {text.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {text.description(pendingEmail || "your email")}
          </p>
        </div>

        {/* OTP Inputs */}
        <div
          className="flex justify-center gap-2 sm:gap-3"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-lg bg-input/30 border border-white/10 text-primary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 focus:border-custom-yellow/50 transition-colors"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleVerifyOtp}
          disabled={isVerifying}
          className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
        >
          {isVerifying ? text.verifying : text.verifyCode}
        </button>

        {/* Resend */}
        <p className="text-sm text-center text-muted-foreground">
          {text.didntReceive}{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="text-custom-yellow font-semibold hover:underline transition-colors"
          >
            {isResending ? text.resending : text.resend}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
