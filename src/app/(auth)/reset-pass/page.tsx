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
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Set a new password",
    description:
      "Make your secure password to keep your dashboard safe and accessible.",
    password: "Password",
    confirmPassword: "Confirm Password",
    passwordPlaceholder: "Enter new password",
    confirmPlaceholder: "Re-enter your password",
    changePassword: "Change Password",
    updating: "Updating...",
    signInPage: "Sign In Page?",
    required: "Both password fields are required",
    mismatch: "Passwords do not match",
    success: "Password reset successful",
    failed: "Failed to reset password",
  },
  de: {
    title: "Neues Passwort festlegen",
    description:
      "Lege ein sicheres Passwort fest, damit dein Dashboard geschützt bleibt.",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    passwordPlaceholder: "Neues Passwort eingeben",
    confirmPlaceholder: "Passwort erneut eingeben",
    changePassword: "Passwort ändern",
    updating: "Wird aktualisiert...",
    signInPage: "Anmeldeseite?",
    required: "Beide Passwortfelder sind erforderlich",
    mismatch: "Die Passwörter stimmen nicht überein",
    success: "Passwort erfolgreich zurückgesetzt",
    failed: "Passwort konnte nicht zurückgesetzt werden",
  },
  fr: {
    title: "Définir un nouveau mot de passe",
    description:
      "Choisissez un mot de passe sécurisé pour protéger votre tableau de bord.",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    passwordPlaceholder: "Entrez le nouveau mot de passe",
    confirmPlaceholder: "Saisissez à nouveau le mot de passe",
    changePassword: "Changer le mot de passe",
    updating: "Mise à jour...",
    signInPage: "Page de connexion ?",
    required: "Les deux champs de mot de passe sont requis",
    mismatch: "Les mots de passe ne correspondent pas",
    success: "Mot de passe réinitialisé avec succès",
    failed: "Échec de la réinitialisation du mot de passe",
  },
  es: {
    title: "Establece una nueva contraseña",
    description: "Crea una contraseña segura para mantener protegido tu panel.",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    passwordPlaceholder: "Introduce la nueva contraseña",
    confirmPlaceholder: "Vuelve a introducir la contraseña",
    changePassword: "Cambiar contraseña",
    updating: "Actualizando...",
    signInPage: "¿Página de inicio de sesión?",
    required: "Los dos campos de contraseña son obligatorios",
    mismatch: "Las contraseñas no coinciden",
    success: "Contraseña restablecida con éxito",
    failed: "No se pudo restablecer la contraseña",
  },
} as const;

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error(text.required);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(text.mismatch);
      return;
    }

    try {
      const response = await resetPassword({
        new_password: password,
        confirm_password: confirmPassword,
      }).unwrap();

      saveAuthTokens(response.data.tokens.access, response.data.tokens.refresh);
      dispatch(setAuthSession(response.data.user));

      toast.success(getSuccessMessage(response, text.success));
      router.push("/");
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
          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {text.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={text.passwordPlaceholder}
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
              {text.confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={text.confirmPlaceholder}
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
            {isLoading ? text.updating : text.changePassword}
          </button>
        </form>

        {/* Confirm & back */}
        <p className="text-sm text-center text-muted-foreground">
          Confirmed Password &amp; Go to the{" "}
          <Link
            href="/sign-in"
            className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
          >
            {text.signInPage}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
