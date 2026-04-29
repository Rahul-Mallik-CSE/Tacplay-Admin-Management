/** @format */

"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import { i18n, LANGUAGE_STORAGE_KEY } from "@/lib/i18n/i18n";

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const syncLanguage = (language: string) => {
      document.documentElement.lang = language;
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    };

    syncLanguage(i18n.language);
    i18n.on("languageChanged", syncLanguage);

    return () => {
      i18n.off("languageChanged", syncLanguage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LanguageProvider;
