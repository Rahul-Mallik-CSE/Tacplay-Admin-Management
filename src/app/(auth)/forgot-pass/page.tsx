/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setPendingVerification } from "@/redux/features/auth/authSlice";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Forgot your password?",
    description:
      "Enter your email and we'll send you a verification code to reset it.",
    emailAddress: "Email Address",
    emailPlaceholder: "Enter your email address",
    sendCode: "Send Code",
    sending: "Sending...",
    backTo: "Back to",
    signIn: "Sign In",
    required: "Email address is required",
    success: "OTP sent successfully",
    failed: "Failed to send OTP",
  },
  de: {
    title: "Passwort vergessen?",
    description:
      "Gib deine E-Mail ein und wir senden dir einen Bestätigungscode.",
    emailAddress: "E-Mail-Adresse",
    emailPlaceholder: "E-Mail-Adresse eingeben",
    sendCode: "Code senden",
    sending: "Wird gesendet...",
    backTo: "Zurück zu",
    signIn: "Anmelden",
    required: "E-Mail-Adresse ist erforderlich",
    success: "OTP erfolgreich gesendet",
    failed: "OTP konnte nicht gesendet werden",
  },
  fr: {
    title: "Mot de passe oublié ?",
    description:
      "Entrez votre e-mail et nous vous enverrons un code de vérification.",
    emailAddress: "Adresse e-mail",
    emailPlaceholder: "Entrez votre adresse e-mail",
    sendCode: "Envoyer le code",
    sending: "Envoi...",
    backTo: "Retour à",
    signIn: "Connexion",
    required: "L'adresse e-mail est requise",
    success: "OTP envoyé avec succès",
    failed: "Échec de l'envoi de l'OTP",
  },
  es: {
    title: "¿Olvidaste tu contraseña?",
    description:
      "Introduce tu correo y te enviaremos un código de verificación.",
    emailAddress: "Correo electrónico",
    emailPlaceholder: "Introduce tu correo electrónico",
    sendCode: "Enviar código",
    sending: "Enviando...",
    backTo: "Volver a",
    signIn: "Iniciar sesión",
    required: "El correo electrónico es obligatorio",
    success: "OTP enviado correctamente",
    failed: "No se pudo enviar el OTP",
  },
} as const;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(text.required);
      return;
    }

    try {
      const response = await forgotPassword({
        email_address: email.trim(),
      }).unwrap();

      dispatch(
        setPendingVerification({
          email: response.data.email_address,
          purpose: "forgot-password",
        }),
      );

      toast.success(getSuccessMessage(response, text.success));
      router.push("/verify-otp");
    } catch (error) {
      toast.error(getErrorMessage(error, text.failed));
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
            {text.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {text.description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {text.emailAddress}
            </label>
            <input
              type="email"
              placeholder={text.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
          >
            {isLoading ? text.sending : text.sendCode}
          </button>
        </form>

        {/* Back to sign in */}
        <p className="text-sm text-center text-muted-foreground">
          {text.backTo}{" "}
          <Link
            href="/sign-in"
            className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
          >
            {text.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
