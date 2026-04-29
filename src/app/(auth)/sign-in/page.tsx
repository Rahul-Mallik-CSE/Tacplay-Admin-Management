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
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    welcomeBack: "Welcome Back",
    description:
      "Manage your arena, sessions, bookings, and ranked match results.",
    emailAddress: "Email Address",
    password: "Password",
    forgotPassword: "Forgot Password?",
    emailPlaceholder: "Enter your email address",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    signingIn: "Signing In...",
    required: "Email and password are required",
    success: "Login successful",
    failed: "Login failed",
  },
  de: {
    welcomeBack: "Willkommen zurück",
    description:
      "Verwalte Arena, Sessions, Buchungen und Ergebnislisten an einem Ort.",
    emailAddress: "E-Mail-Adresse",
    password: "Passwort",
    forgotPassword: "Passwort vergessen?",
    emailPlaceholder: "E-Mail-Adresse eingeben",
    passwordPlaceholder: "Passwort eingeben",
    signIn: "Anmelden",
    signingIn: "Anmeldung läuft...",
    required: "E-Mail und Passwort sind erforderlich",
    success: "Anmeldung erfolgreich",
    failed: "Anmeldung fehlgeschlagen",
  },
  fr: {
    welcomeBack: "Bon retour",
    description:
      "Gérez votre arène, vos sessions, vos réservations et vos résultats de matchs.",
    emailAddress: "Adresse e-mail",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    emailPlaceholder: "Entrez votre adresse e-mail",
    passwordPlaceholder: "Entrez votre mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion...",
    required: "L'e-mail et le mot de passe sont requis",
    success: "Connexion réussie",
    failed: "Échec de la connexion",
  },
  es: {
    welcomeBack: "Bienvenido de nuevo",
    description:
      "Gestiona tu arena, sesiones, reservas y resultados de partidas.",
    emailAddress: "Correo electrónico",
    password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    emailPlaceholder: "Introduce tu correo electrónico",
    passwordPlaceholder: "Introduce tu contraseña",
    signIn: "Iniciar sesión",
    signingIn: "Iniciando sesión...",
    required: "El correo y la contraseña son obligatorios",
    success: "Inicio de sesión correcto",
    failed: "Error al iniciar sesión",
  },
} as const;

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error(text.required);
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

      toast.success(getSuccessMessage(response, text.success));

      const from =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("from")
          : null;

      router.push(from || "/");
    } catch (error) {
      toast.error(getErrorMessage(error, text.failed));
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
          {text.welcomeBack}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          {text.description}
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="w-full space-y-5">
          {/* Business Email */}
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

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-primary">
                {text.password}
              </label>
              <Link
                href="/forgot-pass"
                className="text-xs text-primary hover:text-custom-yellow transition-colors font-medium"
              >
                {text.forgotPassword}
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={text.passwordPlaceholder}
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
            {isLoading ? text.signingIn : text.signIn}
          </button>
        </form>
      </div>
    </AuthBanner>
  );
};

export default SignInPage;
